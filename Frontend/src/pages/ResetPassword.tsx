import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { Lock, Loader2, CheckCircle } from 'lucide-react';
import DecorShapes from '@/components/decor-shapes';
import { InputField } from '@/components/ui/input-field';
import { PasswordStrength } from '@/components/ui/password-strength';
import { Button } from '@/components/ui/button';
import { API_BASE_URL } from '@/lib/utils';

const resetSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'Password must contain at least one special character')
        .required('New password is required'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Please confirm your new password'),
});

interface FormValues {
    newPassword: string;
    confirmNewPassword: string;
}

const ResetPassword: React.FC = () => {
    const { token } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [submitMessage, setSubmitMessage] = useState('');

    const initialValues: FormValues = {
        newPassword: '',
        confirmNewPassword: '',
    };

    const handleSubmit = async (values: FormValues) => {
        if (!token) {
            setSubmitStatus('error');
            setSubmitMessage('Invalid or missing token.');
            return;
        }
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setSubmitMessage('');

        try {
            const res = await fetch(`${API_BASE_URL}/auth/reset-password/${token}` , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values),
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                setSubmitStatus('success');
                setSubmitMessage(data.message || 'Password has been reset successfully. Redirecting to sign in...');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1200);
            } else {
                setSubmitStatus('error');
                setSubmitMessage((data as any).message || 'Failed to reset password. Please try again or request a new link.');
            }
        } catch (error) {
            setSubmitStatus('error');
            setSubmitMessage('Failed to reset password. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-background via-form-background to-background flex items-center justify-center p-4 overflow-hidden">
            <div className="absolute inset-0 opacity-5 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--primary))_1px,_transparent_0)] [background-size:24px_24px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md"
            >
                <div className="form-container p-8 space-y-6">
                    {submitStatus === 'success' ? (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                                <CheckCircle size={32} className="text-success" />
                            </motion.div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-foreground">Password Reset</h2>
                                <p className="text-muted-foreground">{submitMessage}</p>
                            </div>
                        </motion.div>
                    ) : (
                        <Formik initialValues={initialValues} validationSchema={resetSchema} onSubmit={handleSubmit}>
                            {({ errors, touched, values }) => (
                                <Form className="space-y-6">
                                    <div className="text-center space-y-2">
                                        <h1 className="text-3xl font-bold gradient-text">Reset Password</h1>
                                        <p className="text-muted-foreground">Enter a new password for your account</p>
                                    </div>

                                    <Field name="newPassword">
                                        {({ field }: any) => (
                                            <div className="space-y-3">
                                                <InputField
                                                    {...field}
                                                    id="newPassword"
                                                    type="password"
                                                    label="New Password"
                                                    placeholder="Create a strong password"
                                                    icon={<Lock size={18} />}
                                                    showPasswordToggle
                                                    error={touched.newPassword && errors.newPassword ? errors.newPassword : undefined}
                                                    required
                                                />

                                                {values.newPassword && (
                                                    <PasswordStrength password={values.newPassword} className="animate-fade-in" />
                                                )}
                                            </div>
                                        )}
                                    </Field>

                                    <Field name="confirmNewPassword">
                                        {({ field }: any) => (
                                            <InputField
                                                {...field}
                                                id="confirmNewPassword"
                                                type="password"
                                                label="Confirm New Password"
                                                placeholder="Confirm your new password"
                                                icon={<Lock size={18} />}
                                                showPasswordToggle
                                                error={touched.confirmNewPassword && errors.confirmNewPassword ? errors.confirmNewPassword : undefined}
                                                required
                                            />
                                        )}
                                    </Field>

                                    {submitStatus === 'error' && (
                                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                                            <p className="text-sm text-destructive text-center">{submitMessage}</p>
                                        </motion.div>
                                    )}

                                    <Button type="submit" disabled={isSubmitting} className="w-full btn-primary h-12 text-base font-semibold">
                                        {isSubmitting ? (
                                            <div className="flex items-center space-x-2">
                                                <Loader2 size={20} className="animate-spin" />
                                                <span>Resetting Password...</span>
                                            </div>
                                        ) : (
                                            'Reset Password'
                                        )}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    )}
                </div>
            </motion.div>

            <DecorShapes />
        </div>
    );
};

export default ResetPassword;


