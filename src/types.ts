export type NavigationPage = 'home' | 'about' | 'academics' | 'admissions' | 'gallery' | 'contact';

export type ClassCategory = 'Creche' | 'Nursery' | 'Primary';

export interface ClassDetail {
  id: ClassCategory;
  name: string;
  tagline: string;
  ageRange: string;
  description: string;
  highlights: string[];
  subjects: string[];
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'classrooms' | 'early-years' | 'sports' | 'events' | 'activities';
  imageUrl: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  childClass: string;
  rating: number;
  avatar: string;
}

export interface NewsEvent {
  id: string;
  title: string;
  date: string;
  category: string;
  snippet: string;
  location: string;
  imageUrl: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Admissions' | 'Academics' | 'Facilities' | 'General';
}

export interface ContactFormData {
  fullName: string;
  parentName: string;
  email: string;
  phone: string;
  subject: string;
  classOfInterest: ClassCategory;
  message: string;
  websiteUrl?: string;
}

export interface AdmissionFormData {
  childName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  targetClass: ClassCategory;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  homeAddress: string;
  medicalNotes?: string;
}
