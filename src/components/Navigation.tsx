"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const menuItems = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/events', label: 'Events' },
  { href: '/book', label: 'Book' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed w-full z-50 top-0 left-0">
      <div className="px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link 
            href="/" 
            className="font-medieval text-3xl text-primary hover:text-accent transition-all duration-300"
            aria-label="Otter Chaos - Home"
          >
            Otter Chaos
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary p-2 hover:text-accent transition-all duration-300 z-50"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <XMarkIcon className="h-8 w-8" />
              ) : (
                <Bars3Icon className="h-8 w-8" />
              )}
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#2c2c35] flex items-center justify-center"
          >
            <div className="relative z-10 w-full max-w-lg mx-auto px-4">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-6"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block font-medieval text-4xl text-center ${
                      pathname === item.href ? 'text-[#ffd700]' : 'text-white'
                    } hover:text-[#ffd700] transition-all duration-300`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}