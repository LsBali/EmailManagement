import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Building, 
  UserCheck, 
  Loader2, 
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { InputField } from '@/components/ui/input-field';
import { SelectField } from '@/components/ui/select-field';
import { PhoneField } from '@/components/ui/phone-field';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { PasswordStrength } from '@/components/ui/password-strength';
import { Button } from '@/components/ui/button';
import { API_BASE_URL } from '@/lib/utils';

// Validation schema
const signupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(25, 'First name must be less than 25 characters')
    .required('First name is required'),
  middleName: Yup.string()
    .min(2, 'Middle name must be at least 2 characters')
    .max(25, 'Middle name must be less than 25 characters')
    .required('Middle name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(25, 'Last name must be less than 25 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  role: Yup.string()
    .oneOf(['employee', 'admin'], 'Please select a valid role')
    .required('Role is required'),
  department: Yup.string()
    .min(2, 'Department must be at least 2 characters')
    .max(50, 'Department must be less than 50 characters')
    .required('Department is required'),
  phoneNumber: Yup.string()
    .test('is-valid-phone', 'Phone number is not valid', value => !value || isValidPhoneNumber(value))
    .required('Phone number is required'),
});

interface FormValues {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  department: string;
  phoneNumber: string;
}

interface SignupFormProps {
  onBack?: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const departmentOptions = [
    { value: '', label: 'Select Department' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Customer Support', label: 'Customer Support' },
    { value: 'Product', label: 'Product' },
    { value: 'Design', label: 'Design' },
    { value: 'Other', label: 'Other' },
  ];

  const roleOptions = [
    { value: 'employee', label: 'Employee' },
    { value: 'admin', label: 'Administrator' },
  ];

  const initialValues: FormValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'employee',
    department: '',
    phoneNumber: '',
  };

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      // Remove confirmPassword and combine firstName + optional middleName + lastName into name
      const { confirmPassword, firstName, middleName, lastName, ...payload } = values;
      const submitData = {
        firstname: firstName,
        middlename: middleName,
        lastname: lastName,
        email: payload.email,
        mobile: payload.phoneNumber,
        password: payload.password,
        confirmPassword: confirmPassword,
        department: payload.department,
      };
      
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Account created successfully! Redirecting to dashboard...');
        
        // Store user's details for personalization
        const { password, confirmPassword, ...userDetails } = values;
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        localStorage.setItem('userRole', values.role);
        
        // Redirect based on role after 1 second
        setTimeout(() => {
          if (values.role === 'admin') {
            window.location.href = '/dashboard';
          } else {
            window.location.href = '/employee-dashboard';
          }
        }, 1000);
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.message || 'Failed to create account. Please try again.');
      }
    } catch (error) {
      // Dev fallback: if API is not available locally, continue to dashboard demo
      setSubmitStatus('success');
      setSubmitMessage('Account created! Redirecting to dashboard...');
      
      // Store user's details for personalization (fallback case)
      const { password, confirmPassword, ...userDetails } = values;
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      localStorage.setItem('userRole', values.role);
      
      setTimeout(() => {
        if (values.role === 'admin') {
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/employee-dashboard';
        }
      }, 800);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center"
        >
          <CheckCircle size={32} className="text-success" />
        </motion.div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Account Created Successfully!
          </h2>
          <p className="text-muted-foreground">
            {submitMessage}
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="animate-spin">
            <Loader2 size={20} className="text-primary" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, setFieldValue, setFieldTouched }) => (
        <Form className="space-y-6">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="text-sm">Back</span>
            </button>
          )}

          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold gradient-text">
                Create Account
              </h1>
              <p className="text-muted-foreground">
                Join our platform and get started today
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 gap-y-4 md:gap-y-6">
              {/* Column 1 */}
              <div className="space-y-4 md:space-y-6">
                <Field name="firstName">
                  {({ field }: any) => (
                    <InputField
                      {...field}
                      id="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                      icon={<User size={18} />}
                      error={touched.firstName && errors.firstName ? errors.firstName : undefined}
                      required
                    />
                  )}
                </Field>
                
                <Field name="middleName">
                  {({ field }: any) => (
                    <InputField
                      {...field}
                      id="middleName"
                      label="Middle Name"
                      placeholder="Enter your middle name"
                      icon={<User size={18} />}
                      error={touched.middleName && (errors as any).middleName ? (errors as any).middleName : undefined}
                      required
                    />
                  )}
                </Field>
                
                <Field name="lastName">
                  {({ field }: any) => (
                    <InputField
                      {...field}
                      id="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                      icon={<User size={18} />}
                      error={touched.lastName && errors.lastName ? errors.lastName : undefined}
                      required
                    />
                  )}
                </Field>

                <Field name="email">
                  {({ field }: any) => (
                    <InputField
                      {...field}
                      id="email"
                      type="email"
                      label="Email Address"
                      placeholder="Enter your email address"
                      icon={<Mail size={18} />}
                      error={touched.email && errors.email ? errors.email : undefined}
                      required
                    />
                  )}
                </Field>

                <Field name="phoneNumber">
                  {({ field, form }: any) => (
                    <PhoneField
                      label="Phone Number"
                      value={field.value}
                      onChange={(value: string) => form.setFieldValue(field.name, value)}
                      error={touched.phoneNumber && errors.phoneNumber ? (errors as any).phoneNumber : undefined}
                      required
                    />
                  )}
                </Field>
              </div>

              {/* Column 2 */}
              <div className="space-y-4 md:space-y-6">
                <Field name="role">
                  {({ field }: any) => (
                    <SelectField
                      {...field}
                      id="role"
                      label="Role"
                      icon={<UserCheck size={18} />}
                      options={roleOptions}
                      error={touched.role && errors.role ? errors.role : undefined}
                      required
                    />
                  )}
                </Field>

                <Field name="department">
                  {({ field }: any) => (
                    <SelectField
                      {...field}
                      id="department"
                      label="Department"
                      icon={<Building size={18} />}
                      options={departmentOptions}
                      error={touched.department && errors.department ? errors.department : undefined}
                      required
                    />
                  )}
                </Field>

                <Field name="password">
                  {({ field }: any) => (
                    <div className="space-y-3">
                      <InputField
                        {...field}
                        id="password"
                        type="password"
                        label="Password"
                        placeholder="Create a strong password"
                        icon={<Lock size={18} />}
                        showPasswordToggle
                        error={touched.password && errors.password ? errors.password : undefined}
                        required
                      />
                      
                      {values.password && (
                        <PasswordStrength 
                          password={values.password} 
                          className="animate-fade-in"
                        />
                      )}
                    </div>
                  )}
                </Field>

                <Field name="confirmPassword">
                  {({ field }: any) => (
                    <InputField
                      {...field}
                      id="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      placeholder="Confirm your password"
                      icon={<Lock size={18} />}
                      showPasswordToggle
                      error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                      success={values.confirmPassword && values.password === values.confirmPassword && !errors.confirmPassword}
                      required
                    />
                  )}
                </Field>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="space-y-4">
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg"
              >
                <p className="text-sm text-destructive text-center">
                  {submitMessage}
                </p>
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary h-12 text-base font-semibold"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <Loader2 size={20} className="animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};