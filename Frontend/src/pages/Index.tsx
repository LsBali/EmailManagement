import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Zap, BarChart3, FolderCheck, MessageSquare, TrendingUp, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DecorShapes from '@/components/decor-shapes';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-form-background to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--primary))_1px,_transparent_0)] [background-size:32px_32px]" />
      </div>
      
      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-bold gradient-text">
            YourApp
          </div>
          
          <div className="flex space-x-4">
            <Button variant="ghost" asChild>
              <a href="/login">Sign In</a>
            </Button>
            <Button className="btn-primary" asChild>
              <a href="/signup">Get Started</a>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-foreground">
              Welcome to{' '}
              <span className="gradient-text">
                Your Platform
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Streamline your HR leave management with our comprehensive platform. 
              Simplify requests, automate processes, and gain valuable workforce insights.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="btn-primary h-14 px-8 text-lg font-semibold min-w-[200px]"
              asChild
            >
              <a href="/signup" className="flex items-center space-x-2">
                <span>Create Account</span>
                <ArrowRight size={20} />
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-lg min-w-[200px]"
              asChild
            >
              <a href="/login">Sign In</a>
            </Button>
          </motion.div>

          {/* HR Leave Management Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto"
          >
            <div className="glass-effect p-6 rounded-xl space-y-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold">Simplified Leave Requests</h3>
              </div>
              <p className="text-muted-foreground">
                No more messy emails—employees can apply for leave in just a few clicks.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-xl space-y-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Zero Manual Hassle</h3>
              </div>
              <p className="text-muted-foreground">
                Automated processing reduces errors and saves valuable HR time.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-xl space-y-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Centralised HR Dashboard</h3>
              </div>
              <p className="text-muted-foreground">
                One smart dashboard to manage, track, and approve all leave requests.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-xl space-y-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FolderCheck className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Compliance Made Easy</h3>
              </div>
              <p className="text-muted-foreground">
                Comprehensive leave records are maintained for smooth audits and legal compliance.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-xl space-y-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Automated Communication</h3>
              </div>
              <p className="text-muted-foreground">
                Instant, consistent, and professional email updates for every request.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-xl space-y-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Smart Workforce Insights</h3>
              </div>
              <p className="text-muted-foreground">
                Detailed analytics empower better planning and workforce decisions.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Decorative Elements */}
      <DecorShapes />
      
      {/* Spacer */}
      <div className="h-24"></div>
      
      {/* Footer */}
      <footer className="relative z-10 bg-purple-100 dark:bg-purple-900/20 border-t border-purple-200 dark:border-purple-800/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Phone size={18} className="text-purple-600 dark:text-purple-400" />
                  <span>+91 9071073303</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Mail size={18} className="text-purple-600 dark:text-purple-400" />
                  <span>teamdypcompany@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <MapPin size={18} className="text-purple-600 dark:text-purple-400" />
                  <span>123 Business Ave, Suite 100<br />San Francisco, CA 94105</span>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Business Hours</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Clock size={18} className="text-purple-600 dark:text-purple-400" />
                  <span>Monday - Friday: 9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <div className="w-[18px]"></div>
                  <span>Saturday: 10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <div className="w-[18px]"></div>
                  <span>Sunday: Closed</span>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">About</h4>
              <p className="text-muted-foreground leading-relaxed">
                Your Platform is dedicated to streamlining HR processes and empowering teams with intelligent leave management solutions.
              </p>
              <div className="text-sm text-muted-foreground">
                © 2024 Your Platform. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
