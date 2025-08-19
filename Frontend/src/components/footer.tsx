import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-purple-100 dark:bg-purple-900/20 border-t border-purple-200 dark:border-purple-800/30 mt-8">
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
  );
};

export default Footer;
