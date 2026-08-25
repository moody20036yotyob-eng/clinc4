export interface PersonalInfo {
  fullName: string;
  fullNameAr?: string;
  jobTitle: string;
  jobTitleAr?: string;
  photo?: string;
  email: string;
  phone: string;
  location: string;
  locationAr?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  behance?: string;
  dribbble?: string;
  summary?: string;
  summaryAr?: string;
}

export interface ExperienceItem {
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
  achievements?: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  institutionAr?: string;
  degree: string;
  degreeAr?: string;
  field: string;
  fieldAr?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  description?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  nameAr?: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category?: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  nameAr?: string;
  level: 'elementary' | 'limited' | 'professional' | 'full_professional' | 'native';
}

export interface CertificationItem {
  id: string;
  name: string;
  nameAr?: string;
  issuer: string;
  issuerAr?: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  url?: string;
  github?: string;
  technologies?: string[];
  startDate?: string;
  endDate?: string;
  current?: boolean;
  images?: string[];
}

export interface AwardItem {
  id: string;
  title: string;
  titleAr?: string;
  issuer: string;
  issuerAr?: string;
  date: string;
  description?: string;
  descriptionAr?: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  position: string;
  company: string;
  email?: string;
  phone?: string;
  relationship?: string;
}

export interface CVSection {
  id: string;
  type: CVSectionType;
  visible: boolean;
  order: number;
  title?: string;
  titleAr?: string;
}

export type CVSectionType =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'languages'
  | 'certifications'
  | 'projects'
  | 'awards'
  | 'references'
  | 'custom';

export interface CVData {
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  awards: AwardItem[];
  references: ReferenceItem[];
  sections: CVSection[];
  settings: CVSettings;
}

export interface CVSettings {
  language: 'ar' | 'en';
  direction: 'rtl' | 'ltr';
  primaryColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  showPhoto: boolean;
  pageSize: 'A4' | 'Letter';
}

export const DEFAULT_CV_DATA: CVData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
  awards: [],
  references: [],
  sections: [
    { id: 'personal', type: 'personal', visible: true, order: 0 },
    { id: 'summary', type: 'summary', visible: true, order: 1 },
    { id: 'experience', type: 'experience', visible: true, order: 2 },
    { id: 'education', type: 'education', visible: true, order: 3 },
    { id: 'skills', type: 'skills', visible: true, order: 4 },
    { id: 'languages', type: 'languages', visible: true, order: 5 },
    { id: 'certifications', type: 'certifications', visible: false, order: 6 },
    { id: 'projects', type: 'projects', visible: false, order: 7 },
    { id: 'awards', type: 'awards', visible: false, order: 8 },
    { id: 'references', type: 'references', visible: false, order: 9 },
  ],
  settings: {
    language: 'en',
    direction: 'ltr',
    primaryColor: '#1a56db',
    fontFamily: 'Inter',
    fontSize: 'medium',
    showPhoto: true,
    pageSize: 'A4',
  },
};
