import React from 'react';
import { NavigationPage } from '../types';
import { SCHOOL_INFO, LOGO_IMAGE } from '../data/schoolData';
import { MapPin, Phone, Mail, ArrowUp, Facebook, Instagram, Globe, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenApplyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenApplyModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: NavigationPage) => {
    onNavigate(page);
    scrollToTop();
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t-4 border-red-600 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-500 bg-white p-0.5 shrink-0">
                <img
                  src={LOGO_IMAGE}
                  alt="Akheville School Crest"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  AKHEVILLE <span className="text-red-500">SCHOOL</span>
                </h3>
                <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
                  {SCHOOL_INFO.tagline}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-300 italic leading-relaxed">
              "{SCHOOL_INFO.motto}"
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {SCHOOL_INFO.subMotto}
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenApplyModal}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Admissions Now Open</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-blue-500 pl-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', page: 'home' as NavigationPage },
                { label: 'About Akheville', page: 'about' as NavigationPage },
                { label: 'Academic Programs', page: 'academics' as NavigationPage },
                { label: 'Admissions & Entry', page: 'admissions' as NavigationPage },
                { label: 'Photo Gallery', page: 'gallery' as NavigationPage },
                { label: 'Contact Us', page: 'contact' as NavigationPage },
              ].map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => handleNav(link.page)}
                    className="text-slate-300 hover:text-white hover:translate-x-1 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span className="text-red-500 font-bold">›</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Available Classes */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-red-500 pl-3">
              Classes Available
            </h4>
            <div className="space-y-3">
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <span className="text-xs font-bold text-amber-400 block uppercase">Creche Program</span>
                <span className="text-xs text-slate-300">3 Months – 2 Years • Infant Care & Sensory Play</span>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <span className="text-xs font-bold text-blue-400 block uppercase">Nursery Classes</span>
                <span className="text-xs text-slate-300">2 Years – 5 Years • Phonics & Foundation Learning</span>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <span className="text-xs font-bold text-red-400 block uppercase">Primary School</span>
                <span className="text-xs text-slate-300">5 Years – 11 Years • Nigerian-British Curriculum</span>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Location */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-blue-500 pl-3">
              Contact School Office
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>{SCHOOL_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="flex flex-col">
                  <a href={`tel:${SCHOOL_INFO.phones[0].replace(/\s+/g, '')}`} className="hover:text-white">
                    {SCHOOL_INFO.phones[0]}
                  </a>
                  <a href={`tel:${SCHOOL_INFO.phones[1].replace(/\s+/g, '')}`} className="hover:text-white">
                    {SCHOOL_INFO.phones[1]}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-white underline decoration-red-500/50">
                  {SCHOOL_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-300">{SCHOOL_INFO.website}</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/2348025675379?text=Hello%20Akheville%20School%2C%20I%20would%20like%20to%20enquire%20about%20admissions.`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} AKHEVILLE SCHOOL. All Rights Reserved. Built with excellence.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              School Map & Directions
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-blue-400 hover:text-white transition-colors cursor-pointer font-semibold"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
