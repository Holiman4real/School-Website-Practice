import React from 'react';
import { WHY_CHOOSE_US } from '../data/schoolData';
import { GraduationCap, ShieldCheck, Sparkles, HeartHandshake, Award, BookOpenCheck } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-blue-700" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-red-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-emerald-600" />;
      case 'Award':
        return <Award className="w-6 h-6 text-purple-600" />;
      case 'BookOpenCheck':
        return <BookOpenCheck className="w-6 h-6 text-blue-800" />;
      default:
        return <GraduationCap className="w-6 h-6 text-blue-700" />;
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-blue-200">
            Our Key Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Parents Choose <span className="text-blue-700">Akheville School</span>
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Equipping your children for the rapidly changing world through holistic academic and moral nurturing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-500/40 hover:bg-white hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 shadow-xs transition-transform">
                {getIcon(item.iconName)}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
