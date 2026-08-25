export interface PortfolioPersonalInfo {
  name: string;
  nameAr?: string;
  title: string;
  titleAr?: string;
  bio: string;
  bioAr?: string;
  photo?: string;
  email?: string;
  phone?: string;
  location?: string;
  locationAr?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  behance?: string;
  dribbble?: string;
  resume?: string;
}

export interface PortfolioSkill {
  id: string;
  name: string;
  nameAr?: string;
  level?: number;
  category?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  thumbnail?: string;
  images?: string[];
  video?: string;
  url?: string;
  github?: string;
  technologies?: string[];
  category?: string;
  featured: boolean;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  caseStudy?: string;
  caseStudyAr?: string;
  client?: string;
  clientAr?: string;
}

export interface PortfolioExperience {
  id: string;
  company: string;
  companyAr?: string;
  position: string;
  positionAr?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  descriptionAr?: string;
}

export interface PortfolioEducation {
  id: string;
  institution: string;
  institutionAr?: string;
  degree: string;
  degreeAr?: string;
  field: string;
  fieldAr?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
}

export interface PortfolioService {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  icon?: string;
  price?: string;
}

export interface PortfolioTestimonial {
  id: string;
  name: string;
  nameAr?: string;
  position?: string;
  positionAr?: string;
  company?: string;
  companyAr?: string;
  content: string;
  contentAr?: string;
  avatar?: string;
  rating?: number;
}

export interface PortfolioSection {
  id: string;
  type: PortfolioSectionType;
  visible: boolean;
  order: number;
  title?: string;
  titleAr?: string;
}

export type PortfolioSectionType =
  | 'hero'
  | 'about'
  | 'skills'
  | 'experience'
  | 'education'
  | 'projects'
  | 'services'
  | 'testimonials'
  | 'contact'
  | 'custom';

export interface PortfolioSEO {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
}

export interface PortfolioSettings {
  language: 'ar' | 'en';
  direction: 'rtl' | 'ltr';
  primaryColor: string;
  accentColor?: string;
  fontFamily: string;
  theme: 'light' | 'dark';
  favicon?: string;
}

export interface PortfolioData {
  personal: PortfolioPersonalInfo;
  skills: PortfolioSkill[];
  projects: PortfolioProject[];
  experience: PortfolioExperience[];
  education: PortfolioEducation[];
  services: PortfolioService[];
  testimonials: PortfolioTestimonial[];
  sections: PortfolioSection[];
  seo: PortfolioSEO;
  settings: PortfolioSettings;
}

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  personal: {
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
  },
  skills: [],
  projects: [],
  experience: [],
  education: [],
  services: [],
  testimonials: [],
  sections: [
    { id: 'hero', type: 'hero', visible: true, order: 0 },
    { id: 'about', type: 'about', visible: true, order: 1 },
    { id: 'projects', type: 'projects', visible: true, order: 2 },
    { id: 'skills', type: 'skills', visible: true, order: 3 },
    { id: 'experience', type: 'experience', visible: false, order: 4 },
    { id: 'education', type: 'education', visible: false, order: 5 },
    { id: 'services', type: 'services', visible: false, order: 6 },
    { id: 'testimonials', type: 'testimonials', visible: false, order: 7 },
    { id: 'contact', type: 'contact', visible: true, order: 8 },
  ],
  seo: {},
  settings: {
    language: 'en',
    direction: 'ltr',
    primaryColor: '#1a56db',
    fontFamily: 'Inter',
    theme: 'light',
  },
};
