import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data/schoolData';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const GalleryLightbox: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'classrooms', label: 'Classrooms' },
    { id: 'early-years', label: 'Creche & Nursery' },
    { id: 'activities', label: 'ICT & Learning' },
    { id: 'sports', label: 'Sports & Games' },
    { id: 'events', label: 'School Events' },
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const showPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev === 0 ? filteredItems.length - 1 : (prev! - 1)));
    }
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev === filteredItems.length - 1 ? 0 : (prev! + 1)));
    }
  };

  const currentItem: GalleryItem | null =
    selectedImageIndex !== null ? filteredItems[selectedImageIndex] : null;

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="inline-block bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-red-200">
            Life At Akheville School
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Our Campus <span className="text-blue-700">Photo Gallery</span>
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Take a visual tour of our modern facilities, vibrant early learning spaces, and cheerful pupils in action.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  isActive ? 'text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="galleryTabHighlight"
                    className="absolute inset-0 bg-blue-900 rounded-xl shadow-md"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Responsive Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="group relative h-64 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <span className="text-xs uppercase font-bold text-red-400 tracking-wider">
                    {item.category.replace('-', ' ')}
                  </span>
                  <h4 className="font-bold text-sm text-white mt-0.5">{item.title}</h4>
                  <p className="text-xs text-slate-200 line-clamp-2 mt-1">{item.caption}</p>
                  <div className="mt-2 flex items-center text-xs font-semibold text-blue-300 gap-1">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to expand</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {currentItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Nav Previous */}
              <button
                onClick={showPrevious}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-all cursor-pointer z-50"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              {/* Nav Next */}
              <button
                onClick={showNext}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-all cursor-pointer z-50"
                aria-label="Next Image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Lightbox Image Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl max-h-[85vh] w-full flex flex-col bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
              >
                <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] max-h-[65vh]">
                  <img
                    src={currentItem.imageUrl}
                    alt={currentItem.title}
                    className="max-h-[65vh] max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Caption Bar */}
                <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-800">
                  <div>
                    <span className="text-xs uppercase font-bold text-red-400 tracking-wider">
                      {currentItem.category.replace('-', ' ')}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">{currentItem.title}</h3>
                    <p className="text-sm text-slate-300 mt-1">{currentItem.caption}</p>
                  </div>
                  <div className="text-xs text-slate-400 font-mono shrink-0">
                    {selectedImageIndex! + 1} of {filteredItems.length}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
