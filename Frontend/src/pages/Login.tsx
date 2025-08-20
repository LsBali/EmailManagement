import React from 'react';
import { motion } from 'framer-motion';
import { LoginForm } from '@/components/login-form';
import DecorShapes from '@/components/decor-shapes';

const Login: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-form-background to-background flex items-center justify-center p-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--primary))_1px,_transparent_0)] [background-size:32px_32px]" />
      </div>
      
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Form Container */}
        <div className="form-container p-8 space-y-6">
          <LoginForm />
        </div>
      </motion.div>
      
      {/* Decorative Elements */}
      <DecorShapes />
    </div>
  );
};

export default Login;


