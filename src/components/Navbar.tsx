import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationPage } from '../types';
import { SCHOOL_INFO, LOGO_IMAGE } from '../data/schoolData';
import { Phone, Mail, MapPin, Menu, X, GraduationCap, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onOpenApplyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenApplyModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: NavigationPage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'academics', label: 'Academics' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: NavigationPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      {/* Top Bar - Urgent Announcement & Direct Contacts */}
      <div className="bg-blue-900 text-white text-xs sm:text-sm py-2 px-4 border-b border-blue-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Urgent Admission Marquee / Banner */}
          <div className="flex items-center gap-2 font-medium text-amber-300 animate-pulse text-center md:text-left">
            <Sparkles className="w-4 h-4 shrink-0 text-red-400" />
            <span>📢 {SCHOOL_INFO.admissionsStatus}</span>
          </div>

          {/* Quick Contact Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-200">
            <a
              href={`tel:${SCHOOL_INFO.phones[0].replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>{SCHOOL_INFO.phones[0]}</span>
            </a>
            <span className="hidden sm:inline text-blue-700">|</span>
            <a
              href={`tel:${SCHOOL_INFO.phones[1].replace(/\s+/g, '')}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>{SCHOOL_INFO.phones[1]}</span>
            </a>
            <span className="hidden md:inline text-blue-700">|</span>
            <a
              href={`mailto:${SCHOOL_INFO.email}`}
              className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-blue-300" />
              <span>{SCHOOL_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Title */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group py-2"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-blue-700 p-0.5 bg-white shadow-sm transition-transform group-hover:scale-105">
              <img
                src={LOGO_IMAGE}
                alt="Akheville School Logo"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-blue-950 tracking-tight leading-none group-hover:text-blue-700 transition-colors">
                AKHEVILLE <span className="text-red-600">SCHOOL</span>
              </h1>
              <p className="text-xs font-semibold text-blue-600 tracking-wider uppercase mt-0.5">
                {SCHOOL_INFO.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 border-b-2 border-red-600 shadow-xs'
                      : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenApplyModal}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Apply Now</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenApplyModal}
              className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
            >
              Apply
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-blue-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-blue-950 text-white font-bold'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-blue-900'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenApplyModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-base font-bold py-3 rounded-xl shadow-md cursor-pointer"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Register Your Child Today</span>
                </button>
                <div className="text-xs text-slate-500 text-center space-y-1 pt-1">
                  <p className="flex items-center justify-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" /> Lugbe, Airport Road, Abuja
                  </p>
                  <p>Call: {SCHOOL_INFO.phones.join(' | ')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
