import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CLASSES_DATA } from '../data/schoolData';
import { ClassCategory } from '../types';
import { CheckCircle2, ArrowRight, BookOpen, Sparkles, GraduationCap } from 'lucide-react';

interface AcademicsSectionProps {
  onSelectClassForAdmission: (category: ClassCategory) => void;
}

export const AcademicsSection: React.FC<AcademicsSectionProps> = ({ onSelectClassForAdmission }) => {
  const [activeTab, setActiveTab] = useState<ClassCategory>('Primary');

  const selectedClass = CLASSES_DATA.find((c) => c.id === activeTab) || CLASSES_DATA[0];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-red-200">
            Comprehensive Curriculum
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Academic Programs & <span className="text-blue-700">Classes Available</span>
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Tailored learning pathways for infants, early learners, and primary pupils in Lugbe, Abuja.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-1">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner max-w-xl w-full relative min-w-[300px]">
            {CLASSES_DATA.map((cls) => {
              const isActive = activeTab === cls.id;
              return (
                <button
                  key={cls.id}
                  onClick={() => setActiveTab(cls.id)}
                  className={`relative z-10 flex-1 py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-slate-700 hover:text-blue-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="academicTabPill"
                      className="absolute inset-0 bg-blue-900 rounded-xl shadow-md"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cls.id} Class</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Class Details Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Class Banner Image (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[320px] bg-slate-200">
              <img
                src={selectedClass.imageUrl}
                alt={selectedClass.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
                  Age: {selectedClass.ageRange}
                </span>
                <h3 className="text-2xl font-black text-white">{selectedClass.name}</h3>
                <p className="text-xs text-slate-200 mt-1">{selectedClass.tagline}</p>
              </div>
            </div>

            {/* Class Content (7 cols) */}
            <div className="lg:col-span-7 p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-1">
                    Program Overview
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {selectedClass.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Key Learning Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedClass.highlights.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.05 }}
                        className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 shadow-2xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Subjects / Focus Areas */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    Subjects & Core Learning Modules
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedClass.subjects.map((subj, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold px-3 py-1 rounded-lg"
                      >
                        {subj}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-6 mt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  <span>Admissions currently open for </span>
                  <strong className="text-blue-900">{selectedClass.name}</strong>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectClassForAdmission(selectedClass.id)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Apply For {selectedClass.id}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
