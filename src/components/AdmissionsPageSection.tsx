import React from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import { ClassCategory } from '../types';
import { GraduationCap, CheckCircle2, FileText, Calendar, UserCheck, ShieldAlert, ArrowRight, Download, Sparkles } from 'lucide-react';

interface AdmissionsPageSectionProps {
  onOpenApplyModal: (defaultClass?: ClassCategory) => void;
}

export const AdmissionsPageSection: React.FC<AdmissionsPageSectionProps> = ({ onOpenApplyModal }) => {
  return (
    <div className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Banner header */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-red-700 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-blue-900">
          <div className="max-w-3xl relative z-10 space-y-4">
            <span className="inline-block bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-sm">
              Session 2026/2027 Admissions
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {SCHOOL_INFO.admissionsStatus}
            </h2>
            <p className="text-base sm:text-lg text-blue-100 leading-relaxed">
              We welcome applications for <strong>Creche</strong>, <strong>Nursery</strong>, and <strong>Primary</strong> classes. Give your child the foundation they deserve at Akheville School, Lugbe, Abuja.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onOpenApplyModal('Primary')}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-base px-8 py-4 rounded-xl shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <GraduationCap className="w-5 h-5" />
                <span>Apply Online Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Admission Process (4 Steps) */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-blue-200">
              Simple 4-Step Entry
            </span>
            <h3 className="text-3xl font-black text-slate-900">Our Admission Process</h3>
            <p className="text-slate-600 text-sm mt-2">
              Follow these straightforward steps to enroll your child at Akheville School.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Application Form',
                desc: 'Fill out our online application form or visit our administrative office at ACO/AMAC Estate, Lugbe, Abuja.',
                icon: FileText,
                color: 'bg-blue-900 text-white',
              },
              {
                step: '02',
                title: 'Child Assessment',
                desc: 'Schedule a friendly interactive readiness assessment for Nursery & Primary entrance placement.',
                icon: Calendar,
                color: 'bg-red-600 text-white',
              },
              {
                step: '03',
                title: 'Parent Interview',
                desc: 'A brief interactive discussion with school leadership to align learning goals and health history.',
                icon: UserCheck,
                color: 'bg-blue-950 text-white',
              },
              {
                step: '04',
                title: 'Enrollment & Welcome',
                desc: 'Receive official admission offer letter, uniform package, book list, and join our vibrant community!',
                icon: CheckCircle2,
                color: 'bg-emerald-600 text-white',
              },
            ].map((s, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center font-bold shadow-sm`}>
                    <s.icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-300 font-mono">Step {s.step}</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900">{s.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Admission Requirements Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-red-600" />
              <span>Admission Requirements</span>
            </h3>

            <p className="text-sm text-slate-600">
              Parents/Guardians are requested to provide copies of the following documents during formal registration:
            </p>

            <ul className="space-y-3">
              {[
                "Duly completed Akheville School Registration Form.",
                "Copy of Child's Official Birth Certificate or Statutory Age Declaration.",
                "Two (2) recent passport photographs of the child.",
                "One (1) passport photograph of parent / authorized pickup guardian.",
                "Copy of Child's immunization and medical history card.",
                "Previous school report card / transcript (for Primary 2 - Primary 6 applicants).",
              ].map((req, i) => (
                <li key={i} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Classes Summary Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-blue-950 text-white p-6 rounded-3xl shadow-xl space-y-4 border border-blue-900">
              <h4 className="text-lg font-bold text-white uppercase tracking-wider border-b border-blue-800 pb-3">
                Classes Currently Open
              </h4>

              <div className="space-y-3">
                <div className="bg-blue-900/60 p-3.5 rounded-xl border border-blue-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-amber-300 block text-sm">Creche Program</span>
                    <span className="text-xs text-blue-200">Ages 3 Months – 2 Years</span>
                  </div>
                  <button
                    onClick={() => onOpenApplyModal('Creche')}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                <div className="bg-blue-900/60 p-3.5 rounded-xl border border-blue-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-blue-200 block text-sm">Nursery Classes</span>
                    <span className="text-xs text-blue-200">Ages 2 Years – 5 Years</span>
                  </div>
                  <button
                    onClick={() => onOpenApplyModal('Nursery')}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                <div className="bg-blue-900/60 p-3.5 rounded-xl border border-blue-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-red-300 block text-sm">Primary School</span>
                    <span className="text-xs text-blue-200">Ages 5 Years – 11 Years</span>
                  </div>
                  <button
                    onClick={() => onOpenApplyModal('Primary')}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  Have questions regarding fee structure or payment installment options? Call our office at {SCHOOL_INFO.phones.join(' or ')}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
