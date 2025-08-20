import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { Mail, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { InputField } from '@/components/ui/input-field';
import { Button } from '@/components/ui/button';
import { API_BASE_URL } from '@/lib/utils';

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

interface FormValues {
  email: string;
}

export const ForgotPasswordForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const initialValues: FormValues = {
    email: '',
  };

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSubmitStatus('success');
        setSubmitMessage(data.message || 'If an account with that email exists, we have sent a password reset link.');
      } else {
        setSubmitStatus('error');
        setSubmitMessage((data as any).message || 'Failed to send reset link. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Failed to send reset link. Please try again.');
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
            Request Sent
          </h2>
          <p className="text-muted-foreground">
            {submitMessage}
          </p>
        </div>

        <Button variant="outline" asChild>
          <a href="/login" className="flex items-center space-x-2">
            <ArrowLeft size={16} />
            <span>Back to Sign In</span>
          </a>
        </Button>
      </motion.div>
    );
  }

  return (
    <Formik initialValues={initialValues} validationSchema={forgotPasswordSchema} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold gradient-text">Forgot Password</h1>
            <p className="text-muted-foreground">Enter your email to receive a reset link</p>
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
                  <span>Sending Link...</span>
                </div>
              ) : (
                'Send Reset Link'
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Remember your password?{' '}
                <a href="/login" className="text-primary hover:text-primary-dark font-medium transition-colors">
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
