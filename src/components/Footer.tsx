"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerLinks = {
    company: [
      { text: 'About Us', href: '#' },
      { text: 'Careers', href: '#' },
      { text: 'Blog', href: '#' },
      { text: 'Press', href: '#' },
    ],
    product: [
      { text: 'Features', href: '#features' },
      { text: 'Pricing', href: '#pricing' },
      { text: 'Testimonials', href: '#testimonials' },
      { text: 'FAQ', href: '#faq' },
    ],
    resources: [
      { text: 'Documentation', href: '#' },
      { text: 'API Reference', href: '#' },
      { text: 'Guides', href: '#' },
      { text: 'Support', href: '#' },
    ],
    legal: [
      { text: 'Privacy', href: '#' },
      { text: 'Terms', href: '#' },
      { text: 'Security', href: '#' },
      { text: 'Cookies', href: '#' },
    ],
  };

  const socialIcons = [
    {
      name: 'Twitter',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      ),
      href: '#',
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
      href: '#',
    },
    {
      name: 'GitHub',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
      href: '#',
    },
  ];

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company logo and info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">SkillProof</span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-sm">
              Revolutionizing hiring through skill validation and AI-driven assessments. Find the perfect match based on abilities, not buzzwords.
            </p>
            
            {/* Social icons */}
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-200 pt-8 pb-4">
          <div className="max-w-md mx-auto lg:mx-0">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Subscribe to our newsletter
            </h3>
            <p className="text-gray-600 mb-4">
              Get the latest updates, news and product offerings sent straight to your inbox.
            </p>
            <form className="flex gap-2 mb-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                type="submit"
              >
                Subscribe
              </motion.button>
            </form>
            <p className="text-gray-500 text-xs">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} SkillProof. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link 
              href="#" 
              className="text-gray-500 hover:text-indigo-600 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="#" 
              className="text-gray-500 hover:text-indigo-600 text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="#" 
              className="text-gray-500 hover:text-indigo-600 text-sm transition-colors"
            >
              Cookies Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 