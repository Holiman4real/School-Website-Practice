import React from 'react';
import { SCHOOL_INFO, HERO_IMAGE, LOGO_IMAGE } from '../data/schoolData';
import { NavigationPage } from '../types';
import { GraduationCap, ArrowRight, ShieldCheck, Sparkles, CheckCircle, Phone, Award, Users } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenApplyModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenApplyModal }) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white overflow-hidden pt-8 pb-16 lg:py-20 border-b-4 border-red-600">
      {/* Decorative backdrop glow */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 rounded-full bg-red-600/15 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Urgent Badge */}
            <div className="inline-flex items-center gap-2 bg-red-600/90 hover:bg-red-600 text-white text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full border border-red-400 shadow-lg animate-bounce">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{SCHOOL_INFO.admissionsStatus}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Equipping Children For The <span className="text-red-500 underline decoration-blue-500">Rapidly Changing</span> World
            </h1>

            {/* School Motto & Tagline */}
            <p className="text-lg sm:text-xl font-bold text-blue-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              "{SCHOOL_INFO.motto}"
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Welcome to <strong>AKHEVILLE SCHOOL</strong> (Creche, Nursery & Primary) located in ACO/AMAC Estate, Lugbe, Abuja. We provide a safe, modern, and inspiring learning atmosphere where your child’s academic potential and moral values thrive.
            </p>

            {/* Classes Available Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="text-xs font-bold uppercase text-slate-300 mr-1">Available Classes:</span>
              <span className="bg-blue-800/80 text-amber-300 border border-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                👶 Creche (3m – 2yrs)
              </span>
              <span className="bg-blue-800/80 text-blue-200 border border-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                🎨 Nursery (2yrs – 5yrs)
              </span>
              <span className="bg-blue-800/80 text-red-300 border border-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                📚 Primary (5yrs – 11yrs)
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenApplyModal}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-base px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer"
              >
                <GraduationCap className="w-5 h-5" />
                <span>Register Your Child Today</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate('academics')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-base px-6 py-4 rounded-2xl border border-white/20 transition-all cursor-pointer"
              >
                <span>Explore Academics</span>
              </button>
            </div>

            {/* Trust Highlights Row */}
            <div className="pt-6 border-t border-blue-900/80 grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-amber-400 block">100%</span>
                <span className="text-xs text-slate-300 font-medium">Safe & Secured Campus</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-red-400 block">1:8</span>
                <span className="text-xs text-slate-300 font-medium">Teacher-Pupil Ratio</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-blue-300 block">15+</span>
                <span className="text-xs text-slate-300 font-medium">Certified Educators</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Graphic / Image Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-slate-900 group">
              <img
                src={HERO_IMAGE}
                alt="Akheville School Campus & Pupils"
                className="w-full h-[380px] sm:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

              {/* Overlay Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold">
                  <Award className="w-5 h-5 text-amber-300" />
                </div>
                <div className="text-left text-slate-900">
                  <span className="text-xs font-bold text-red-600 uppercase block">Top Rated</span>
                  <span className="text-xs font-semibold">Primary & Early Years</span>
                </div>
              </div>

              {/* Bottom Card Caption */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-blue-950/90 backdrop-blur-md border border-white/10 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-400 shrink-0">
                    <img src={LOGO_IMAGE} alt="Logo Crest" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">AKHEVILLE SCHOOL, Lugbe</h4>
                    <p className="text-xs text-slate-300">House 3, Road 3, Phase II, ACO/AMAC Estate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
