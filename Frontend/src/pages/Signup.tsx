import React from 'react';
import { motion } from 'framer-motion';
import { SignupForm } from '@/components/signup-form';
import DecorShapes from '@/components/decor-shapes';

const Signup: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-form-background to-background flex items-center justify-center p-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--primary))_1px,_transparent_0)] [background-size:24px_24px]" />
      </div>
      
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-4xl"
      >
        {/* Form Container */}
        <div className="form-container p-8 space-y-6">
          <SignupForm />
        </div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-muted-foreground">
            By creating an account, you agree to our{' '}
            <a href="/terms" className="text-primary hover:text-primary-dark transition-colors">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-primary hover:text-primary-dark transition-colors">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </motion.div>
      
      {/* Decorative Elements */}
      <DecorShapes />
    </div>
  );
};

export default Signup;