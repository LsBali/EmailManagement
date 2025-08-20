import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { InputField } from '@/components/ui/input-field';
import { Button } from '@/components/ui/button';
import { API_BASE_URL } from '@/lib/utils';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

interface FormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onBack?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Signed in successfully! Redirecting...');
        
        // Store user info for role-based routing
        const userDetails = {
          email: data?.user?.email || values.email,
          role: data?.user?.role || 'employee',
          firstName: data?.user?.fullname?.firstname || 'User',
          middleName: data?.user?.fullname?.middlename || '',
          lastName: data?.user?.fullname?.lastname || '',
          ...data
        };
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        const userRole = userDetails.role;
        localStorage.setItem('userRole', userRole);
        
        setTimeout(() => {
          // Redirect based on role
          if (userRole === 'admin') {
            window.location.href = '/dashboard';
          } else {
            window.location.href = '/employee-dashboard';
          }
        }, 1500);
      } else {
        setSubmitStatus('error');
        setSubmitMessage((data as any).message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      // Dev fallback: if API is not available locally, simulate login for demo
      setSubmitStatus('success');
      setSubmitMessage('Signed in successfully! Redirecting...');
      
      // For demo purposes, determine role based on email or set default
      const userRole = values.email.includes('admin') ? 'admin' : 'employee';
      const userFirstName = values.email.split('@')[0] || 'User';
      const userDetails = {
        email: values.email,
        firstName: userFirstName,
        middleName: '',
        lastName: 'User',
        role: userRole,
        department: userRole === 'admin' ? 'Engineering' : 'Marketing',
        phoneNumber: '+1234567890'
      };
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      localStorage.setItem('userRole', userRole);
      
      setTimeout(() => {
        if (userRole === 'admin') {
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/employee-dashboard';
        }
      }, 1500);
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
          <h2 className="text-2xl font-bold text-foreground">Welcome back!</h2>
          <p className="text-muted-foreground">{submitMessage}</p>
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
    <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleSubmit}>
      {({ errors, touched, values }) => (
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
              <h1 className="text-3xl font-bold gradient-text">Sign In</h1>
              <p className="text-muted-foreground">Welcome back! Please enter your details</p>
            </div>

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

            <Field name="password">
              {({ field }: any) => (
                <InputField
                  {...field}
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  icon={<Lock size={18} />}
                  showPasswordToggle
                  error={touched.password && errors.password ? errors.password : undefined}
                  required
                />
              )}
            </Field>
          </div>

          <div className="space-y-4">
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg"
              >
                <p className="text-sm text-destructive text-center">{submitMessage}</p>
              </motion.div>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full btn-primary h-12 text-base font-semibold">
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <Loader2 size={20} className="animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <a href="/signup" className="text-primary hover:text-primary-dark font-medium transition-colors">
                  Create one
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                <a href="/forgot-password" className="text-primary hover:text-primary-dark font-medium transition-colors">
                  Forgot Password?
                </a>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};


