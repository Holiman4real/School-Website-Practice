import React, { useState, useEffect } from 'react';
import { NavigationPage, ClassCategory } from './types';
import { SCHOOL_INFO } from './data/schoolData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { AboutUsSection } from './components/AboutUsSection';
import { AcademicsSection } from './components/AcademicsSection';
import { AdmissionsPageSection } from './components/AdmissionsPageSection';
import { GalleryLightbox } from './components/GalleryLightbox';
import { TestimonialsSection } from './components/TestimonialsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ContactFormSection } from './components/ContactFormSection';
import { FaqAccordion } from './components/FaqAccordion';
import { NewsEventsSection } from './components/NewsEventsSection';
import { AdmissionModal } from './components/AdmissionModal';
import { GraduationCap, ArrowUp, Sparkles, Phone, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedClassForModal, setSelectedClassForModal] = useState<ClassCategory>('Primary');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenApplyModal = (targetClass: ClassCategory = 'Primary') => {
    setSelectedClassForModal(targetClass);
    setIsApplyModalOpen(true);
  };

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-red-500 selection:text-white">
      {/* Top Header & Sticky Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenApplyModal={() => handleOpenApplyModal('Primary')}
      />

      {/* Main Page View Switcher */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              onNavigate={handleNavigate}
              onOpenApplyModal={() => handleOpenApplyModal('Primary')}
            />

            {/* High Impact Admission Announcement Callout Banner */}
            <section className="bg-gradient-to-r from-red-600 via-red-700 to-blue-900 text-white py-10 px-4 shadow-inner">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 bg-white/20 text-amber-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/30">
                    <Sparkles className="w-3.5 h-3.5" /> Admission Progress Alert
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {SCHOOL_INFO.admissionsStatus}
                  </h3>
                  <p className="text-blue-100 text-sm">
                    {SCHOOL_INFO.ctaText} — Creche, Nursery & Primary Classes
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleOpenApplyModal('Primary')}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-6 py-3.5 rounded-xl shadow-lg transition-all transform hover:scale-105 cursor-pointer"
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span>Hurry & Register Today</span>
                  </button>

                  <a
                    href={`tel:${SCHOOL_INFO.phones[0].replace(/\s+/g, '')}`}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-xl border border-white/20 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-amber-300" />
                    <span>Call Admission Desk</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Why Choose Us */}
            <WhyChooseUsSection />

            {/* Academic Programs */}
            <AcademicsSection
              onSelectClassForAdmission={(category) => handleOpenApplyModal(category)}
            />

            {/* Gallery Preview */}
            <GalleryLightbox />

            {/* News & Events */}
            <NewsEventsSection
              onOpenApplyModal={() => handleOpenApplyModal('Primary')}
            />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* FAQs */}
            <FaqAccordion />

            {/* Contact Form Section */}
            <ContactFormSection />
          </div>
        )}

        {currentPage === 'about' && (
          <div>
            <AboutUsSection />
            <WhyChooseUsSection />
            <TestimonialsSection />
          </div>
        )}

        {currentPage === 'academics' && (
          <div>
            <AcademicsSection
              onSelectClassForAdmission={(category) => handleOpenApplyModal(category)}
            />
            <WhyChooseUsSection />
          </div>
        )}

        {currentPage === 'admissions' && (
          <div>
            <AdmissionsPageSection
              onOpenApplyModal={(category) => handleOpenApplyModal(category || 'Primary')}
            />
            <FaqAccordion />
          </div>
        )}

        {currentPage === 'gallery' && (
          <div>
            <GalleryLightbox />
          </div>
        )}

        {currentPage === 'contact' && (
          <div>
            <ContactFormSection />
            <FaqAccordion />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenApplyModal={() => handleOpenApplyModal('Primary')}
      />

      {/* Admission Registration Modal */}
      <AdmissionModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        defaultClass={selectedClassForModal}
      />

      {/* Scroll-To-Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-blue-900 text-white shadow-2xl flex items-center justify-center hover:bg-red-600 transition-all duration-300 transform hover:scale-110 cursor-pointer border-2 border-white"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
