import React from 'react';
import { NEWS_EVENTS } from '../data/schoolData';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { NavigationPage } from '../types';

interface NewsEventsSectionProps {
  onOpenApplyModal: () => void;
}

export const NewsEventsSection: React.FC<NewsEventsSectionProps> = ({ onOpenApplyModal }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-blue-200">
            Updates & Announcement
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            News & <span className="text-blue-700">School Events</span>
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Stay updated with upcoming academic activities, celebrations, and parent events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_EVENTS.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {item.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      {item.location}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.snippet}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={onOpenApplyModal}
                  className="w-full py-2.5 rounded-xl border border-blue-200 text-blue-900 hover:bg-blue-900 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Enquire / Register</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
