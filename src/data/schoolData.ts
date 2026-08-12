import { ClassDetail, GalleryItem, Testimonial, NewsEvent, FaqItem } from '../types';

// Asset references generated & static high quality CDN photos
export const LOGO_IMAGE = 'https://i.imgur.com/2mOh8N1.png';
export const HERO_IMAGE = '/src/assets/images/school_hero_banner_1785850123882.jpg';
export const CLASSROOM_IMAGE = '/src/assets/images/classroom_learning_1785850138004.jpg';
export const CRECHE_IMAGE = '/src/assets/images/creche_nursery_play_1785850151264.jpg';

export const SCHOOL_INFO = {
  name: 'AKHEVILLE SCHOOL',
  tagline: 'Early Years & Primary',
  motto: 'Your kids deserve the best EDUCATION!',
  subMotto: 'A place committed to equipping children for the rapidly changing world.',
  admissionsStatus: 'Admission Into New Academic Session Is Now In Progress',
  ctaText: 'Hurry Now & Register Your Child Today',
  phones: ['0802 5675 379', '0902 9308 009'],
  email: 'info@akhevilleschool.com',
  address: 'House 3, Road 3, Phase II, Aco/AMAC Estate, Airport Road, Lugbe, Abuja',
  website: 'www.akhevilleschool.com',
  workingHours: 'Monday – Friday: 7:30 AM – 4:00 PM',
};

export const CLASSES_DATA: ClassDetail[] = [
  {
    id: 'Creche',
    name: 'Creche Program',
    tagline: 'Loving, hygienic, and nurturing care for infants & toddlers.',
    ageRange: '3 Months – 2 Years',
    description:
      'Our Creche facility provides a warm, home-away-from-home environment where babies receive attentive, individualized care from trained pediatric caregivers. We focus on sensory exploration, early motor skill development, and peaceful sleep routines.',
    highlights: [
      'Strict 1:3 Caregiver-to-Infant Ratio',
      'Air-conditioned & Sanitized Sleeping Quarters',
      'Sensory Toys & Tactile Learning Materials',
      'Daily Digital Activity Logs for Parents',
      'Continuous Health & Hygiene Monitoring'
    ],
    subjects: ['Sensory Exploration', 'Early Speech Prompts', 'Motor Coordination', 'Music & Rhymes', 'Social Interaction'],
    imageUrl: CRECHE_IMAGE,
  },
  {
    id: 'Nursery',
    name: 'Nursery Program',
    tagline: 'Fostering curiosity, early literacy, and social confidence.',
    ageRange: '2 Years – 5 Years',
    description:
      'Our Nursery curriculum combines Montessori and EYFS learning approaches. We encourage children to discover reading phonics, foundational numbers, creative art, and social etiquette through play-based and structured group activities.',
    highlights: [
      'Interactive Jolly Phonics Reading System',
      'Foundational Numeracy & Logical Puzzles',
      'Creative Arts, Crafts, and Music Development',
      'Social Etiquette, Manners, and Emotional Growth',
      'Outdoor Physical Play & Motor Coordination'
    ],
    subjects: ['Jolly Phonics', 'Number Work', 'Basic Science & Nature', 'Rhymes & Storytelling', 'Art & Craft', 'Physical Dev'],
    imageUrl: CLASSROOM_IMAGE,
  },
  {
    id: 'Primary',
    name: 'Primary Program',
    tagline: 'Academic excellence, critical thinking, and character building.',
    ageRange: '5 Years – 11 Years',
    description:
      'Our Primary School equips pupils with high academic standards, problem-solving skills, modern ICT proficiency, and sound moral values. We prepare learners to excel in entrance examinations into top secondary schools across Nigeria and abroad.',
    highlights: [
      'Blended British-Nigerian National Curriculum',
      'Hands-on Science & Practical Computer Literacy',
      'Quantitative & Verbal Reasoning Mastery',
      'Leadership Training, Debate & Public Speaking',
      'Sports, Music, and Extra-curricular Clubs'
    ],
    subjects: ['Mathematics & Geometry', 'English Language & Diction', 'Basic Science & Tech', 'Computer Studies / Coding', 'Social Studies', 'Civic & Moral Education', 'Agricultural Science', 'Creative Arts'],
    imageUrl: HERO_IMAGE,
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Modern Interactive Classroom',
    category: 'classrooms',
    imageUrl: CLASSROOM_IMAGE,
    caption: 'Bright, spacious, and air-conditioned classroom equipped with interactive learning aids.',
  },
  {
    id: '2',
    title: 'Creche & Toddler Play Den',
    category: 'early-years',
    imageUrl: CRECHE_IMAGE,
    caption: 'Hygienic and soft-padded creche play area designed for safe infant exploration.',
  },
  {
    id: '3',
    title: 'School Campus & Playground',
    category: 'classrooms',
    imageUrl: HERO_IMAGE,
    caption: 'Secure campus environment at ACO/AMAC Estate, Lugbe, Abuja.',
  },
  {
    id: '4',
    title: 'ICT & Computer Learning',
    category: 'activities',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    caption: 'Early computer literacy and guided digital skills practice for primary pupils.',
  },
  {
    id: '5',
    title: 'Annual Inter-House Sports',
    category: 'sports',
    imageUrl: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=800&q=80',
    caption: 'Pupils engaging in athletic competitions promoting teamwork and physical fitness.',
  },
  {
    id: '6',
    title: 'Creative Art & Crafts Exhibition',
    category: 'events',
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
    caption: 'Pupils expressing their imagination through painting, clay sculpting, and crafts.',
  },
  {
    id: '7',
    title: 'Reading & Library Corner',
    category: 'classrooms',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    caption: 'Rich collection of age-appropriate storybooks, encyclopedias, and learning cards.',
  },
  {
    id: '8',
    title: 'Cultural Day Celebration',
    category: 'events',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    caption: 'Celebrating rich Nigerian cultural heritage and diversity in colorful traditional attires.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Mrs. Chioma Okonkwo',
    role: 'Parent',
    childClass: 'Primary 3 & Nursery 1',
    quote:
      'Akheville School has been a blessing to our family. My son’s reading and diction improved drastically within his first term. The teachers are genuinely passionate, patient, and approachable.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: '2',
    name: 'Engr. Ibrahim Bello',
    role: 'Parent',
    childClass: 'Creche',
    quote:
      'Leaving my 8-month-old daughter in Creche was scary at first, but the caregivers at Akheville made us feel 100% reassured. The environment is impeccably clean, serene, and secure.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: '3',
    name: 'Dr. (Mrs.) Blessing Adebayo',
    role: 'Parent & PTA Executive',
    childClass: 'Primary 5',
    quote:
      'The academic standards at Akheville are top-tier. My daughter placed in the top percentile during regional competitions. Beyond academics, their emphasis on moral values is exemplary.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Qualified & Passionate Teachers',
    description: 'Certified educators trained in modern child psychology, early childhood development, and innovative teaching techniques.',
    iconName: 'GraduationCap',
  },
  {
    title: 'Safe & Secure Environment',
    description: 'Gated facility inside ACO/AMAC Estate with 24/7 security surveillance and strict access control for complete peace of mind.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Modern Interactive Classrooms',
    description: 'Well-ventilated, colorful classrooms equipped with audio-visual learning tools, ergonomic desks, and child-safe materials.',
    iconName: 'Sparkles',
  },
  {
    title: 'Child-Friendly Learning Approach',
    description: 'Individualized attention ensuring every learner progresses at their optimal pace while building intrinsic curiosity.',
    iconName: 'HeartHandshake',
  },
  {
    title: 'Academic Excellence',
    description: 'Comprehensive curriculum blending Nigerian and international standards to prepare pupils for global opportunities.',
    iconName: 'Award',
  },
  {
    title: 'Strong Moral Values & Discipline',
    description: 'Instilling integrity, respect, empathy, and sound leadership character in every pupil from early childhood.',
    iconName: 'BookOpenCheck',
  },
];

export const FAQ_DATA: FaqItem[] = [
  {
    category: 'Admissions',
    question: 'How do I register my child for admission at Akheville School?',
    answer:
      'Admission forms can be obtained directly at our school administrative office at House 3, Road 3, Phase II, ACO/AMAC Estate, Lugbe, Abuja, or submitted online via our website Admissions page. After submitting the form, your child will be scheduled for a friendly assessment.',
  },
  {
    category: 'Admissions',
    question: 'What is the entry age requirement for Creche, Nursery, and Primary?',
    answer:
      'Creche accepts infants from 3 months to 2 years. Nursery accepts toddlers from 2 to 5 years (Nursery 1, 2, and Reception). Primary accepts pupils from 5 to 11 years (Primary 1 to Primary 6).',
  },
  {
    category: 'Academics',
    question: 'What curriculum does Akheville School operate?',
    answer:
      'We operate an enriched blended curriculum that integrates the Nigerian National Curriculum with international Early Years Foundation Stage (EYFS) principles and practical STEM & ICT modules.',
  },
  {
    category: 'Facilities',
    question: 'What safety and security measures are in place for the children?',
    answer:
      'Our school is situated in a quiet, gated residential estate (ACO/AMAC Estate, Airport Road, Lugbe). We enforce strict pickup authorization protocols, CCTV monitoring, trained security personnel, and first-aid trained staff.',
  },
  {
    category: 'General',
    question: 'What are the school operating hours?',
    answer:
      'School hours run from 7:30 AM to 1:30 PM for Creche & Nursery, and 7:30 AM to 2:30 PM for Primary pupils. After-school care and homework support clubs run until 4:00 PM.',
  },
];

export const NEWS_EVENTS: NewsEvent[] = [
  {
    id: 'e1',
    title: 'Admission Into New Academic Session Now Open',
    date: 'August 2026',
    category: 'Admissions',
    snippet: 'Applications are currently being received for Creche, Nursery, and Primary classes for the upcoming session.',
    location: 'Akheville School Campus, Lugbe',
    imageUrl: HERO_IMAGE,
  },
  {
    id: 'e2',
    title: 'Annual Literacy Week & Spelling Bee',
    date: 'September 18, 2026',
    category: 'Academics',
    snippet: 'A week-long celebration of storytelling, vocabulary contests, book exhibitions, and pupil presentations.',
    location: 'School Assembly Hall',
    imageUrl: CLASSROOM_IMAGE,
  },
  {
    id: 'e3',
    title: 'Parent-Teacher Association (PTA) Meeting',
    date: 'October 03, 2026',
    category: 'Community',
    snippet: 'Interactive session between management, staff, and parents to discuss term progress and school developments.',
    location: 'Main Multipurpose Room',
    imageUrl: CRECHE_IMAGE,
  },
];
