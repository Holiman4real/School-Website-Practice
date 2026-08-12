import React from 'react';
import { SCHOOL_INFO, CLASSROOM_IMAGE, HERO_IMAGE, CRECHE_IMAGE } from '../data/schoolData';
import { Target, Eye, Heart, Shield, Award, Users, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutUsSection: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-blue-200">
            About Akheville School
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Nurturing Young Minds for <span className="text-blue-700">Academic & Moral</span> Leadership
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Located in ACO/AMAC Estate, Lugbe, Abuja, <strong>AKHEVILLE SCHOOL</strong> is a premier early childhood and primary educational institution committed to providing holistic, child-centered education.
          </p>
        </div>

        {/* History & Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-md border border-red-200 inline-block">
              Our Journey & Heritage
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              A Firm Foundation Built On Excellence, Compassion & Safety
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Founded with a clear vision to redefine early childhood education in Abuja, Akheville School was created to answer a vital need: providing children with a nurturing, safe, and academically rigorous space where curiosity is celebrated.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Over the years, our school has grown into a trusted sanctuary for parents seeking top-quality care in Creche, Nursery, and Primary education. We fuse modern educational methodologies with timeless moral values to build confident, compassionate, and resilient leaders.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-2xl font-black text-blue-800">Creche – Primary</span>
                <p className="text-xs text-slate-600 mt-1">Seamless educational progression</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-2xl font-black text-red-600">Blended</span>
                <p className="text-xs text-slate-600 mt-1">Nigerian-British Curriculum</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border-4 border-slate-100 shadow-xl">
              <img
                src={CLASSROOM_IMAGE}
                alt="Akheville Learning Environment"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-bold text-lg text-white">"{SCHOOL_INFO.subMotto}"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden border border-blue-800">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              To equip children for a rapidly changing world by providing a safe, stimulate-driven, and supportive learning environment that fosters critical thinking, academic competence, and strong moral character.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-br from-red-700 to-red-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden border border-red-600">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 mb-6">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-red-100 text-sm sm:text-base leading-relaxed">
              To be recognized as a premier benchmark school in Abuja for early childhood and primary education—celebrated for holistic child development, academic distinction, and ethical leadership.
            </p>
          </div>
        </div>

        {/* Core Values Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Our Core Values</h3>
            <p className="text-slate-600 text-sm mt-1">
              The ethical compass guiding our educators, pupils, and school community daily.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: 'Excellence', desc: 'Highest academic standards', color: 'border-blue-500 text-blue-800' },
              { title: 'Integrity', desc: 'Honesty and accountability', color: 'border-red-500 text-red-700' },
              { title: 'Safety', desc: 'Secure campus environment', color: 'border-emerald-500 text-emerald-800' },
              { title: 'Empathy', desc: 'Kindness & social care', color: 'border-amber-500 text-amber-800' },
              { title: 'Innovation', desc: 'Modern technology & ICT', color: 'border-purple-500 text-purple-800' },
              { title: 'Discipline', desc: 'Self-control & respect', color: 'border-indigo-500 text-indigo-800' },
            ].map((v, idx) => (
              <div key={idx} className={`p-5 rounded-2xl bg-slate-50 border-t-4 ${v.color} shadow-xs text-center space-y-1`}>
                <h4 className="font-extrabold text-base text-slate-900">{v.title}</h4>
                <p className="text-xs text-slate-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Commitment to Quality & Experienced Teachers */}
        <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
              Our Educational Standards
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
              Commitment to Quality Education & Learning Environment
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mt-3">
              At Akheville School, quality is non-negotiable. Every pupil receives personalized attention designed to identify and cultivate their unique strengths.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Regular continuous assessment and detailed termly parent progress reports.',
                'Air-conditioned, brightly lit classrooms equipped with modern teaching aids.',
                'Certified, passionate educators with regular professional development training.',
                'Zero-tolerance policy on bullying with active socio-emotional counseling.',
                'Enriched co-curricular activities including music, arts, sports, and ICT.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg">
            <img src={CRECHE_IMAGE} alt="Nursery & Creche Caregivers" className="w-full h-[360px] object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs uppercase font-bold text-amber-300">Experienced Faculty</span>
              <h4 className="font-bold text-base text-white">Dedicated Early Years & Primary Teachers</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
