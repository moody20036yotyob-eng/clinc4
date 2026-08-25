import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const CV_TEMPLATE_CATEGORIES = [
  'minimal', 'modern', 'corporate', 'executive', 'creative',
  'ats', 'student', 'technology', 'engineering', 'marketing',
  'finance', 'elegant', 'luxury', 'professional',
];

const PORTFOLIO_TEMPLATE_CATEGORIES = [
  'minimal', 'corporate', 'creative', 'developer', 'designer',
  'freelancer', 'personal-brand', 'luxury',
];

async function main() {
  console.log('🌱 Seeding EcoTrove database...');

  // Admin user
  const adminPassword = await bcrypt.hash(process.env.ADMIN_INITIAL_PASSWORD || 'Admin@EcoTrove123', 12);
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@ecotrove.sa' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@ecotrove.sa',
      passwordHash: adminPassword,
      name: 'EcoTrove Admin',
      role: 'ADMIN',
      emailVerified: true,
    },
  });

  // Default settings
  const defaultSettings = [
    { key: 'price_cv', value: '119', label: 'CV Price (SAR)' },
    { key: 'price_portfolio', value: '159', label: 'Portfolio Price (SAR)' },
    { key: 'price_bundle', value: '249', label: 'Bundle Price (SAR)' },
    { key: 'hosting_renewal_price', value: '79', label: 'Hosting Renewal Price (SAR)' },
    { key: 'currency', value: 'SAR', label: 'Currency' },
    { key: 'whatsapp_number', value: process.env.WHATSAPP_NUMBER || '966500000000', label: 'WhatsApp Number' },
    { key: 'company_email', value: 'hello@ecotrove.sa', label: 'Company Email' },
    { key: 'portfolio_base_url', value: 'https://portfolio.ecotrove.sa', label: 'Portfolio Base URL' },
  ];

  for (const setting of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  // CV Templates (80 total — seeding first batch of 20)
  const cvTemplates = [
    // Minimal
    { slug: 'cv-minimal-clean', name: 'Clean Minimal', nameAr: 'أنيق بسيط', category: 'minimal', componentName: 'CVMinimalClean', isATS: true, isFeatured: true, tags: ['minimal', 'clean', 'ats'], order: 1 },
    { slug: 'cv-minimal-nordic', name: 'Nordic', nameAr: 'نورديك', category: 'minimal', componentName: 'CVMinimalNordic', isATS: true, tags: ['minimal', 'nordic', 'simple'], order: 2 },
    { slug: 'cv-minimal-slate', name: 'Slate', nameAr: 'رمادي', category: 'minimal', componentName: 'CVMinimalSlate', tags: ['minimal', 'slate'], order: 3 },
    // Modern
    { slug: 'cv-modern-prime', name: 'Prime Modern', nameAr: 'عصري متميز', category: 'modern', componentName: 'CVModernPrime', isFeatured: true, tags: ['modern', 'sidebar', 'colorful'], order: 10 },
    { slug: 'cv-modern-impact', name: 'Impact', nameAr: 'تأثير', category: 'modern', componentName: 'CVModernImpact', tags: ['modern', 'bold'], order: 11 },
    { slug: 'cv-modern-flow', name: 'Flow', nameAr: 'تدفق', category: 'modern', componentName: 'CVModernFlow', tags: ['modern', 'timeline'], order: 12 },
    // Corporate
    { slug: 'cv-corporate-executive', name: 'Corporate Executive', nameAr: 'تنفيذي شركات', category: 'corporate', componentName: 'CVCorporateExecutive', isATS: true, isFeatured: true, tags: ['corporate', 'professional', 'ats'], order: 20 },
    { slug: 'cv-corporate-classic', name: 'Corporate Classic', nameAr: 'كلاسيكي الشركات', category: 'corporate', componentName: 'CVCorporateClassic', isATS: true, tags: ['corporate', 'classic'], order: 21 },
    // Creative
    { slug: 'cv-creative-portfolio', name: 'Creative Portfolio', nameAr: 'إبداعي', category: 'creative', componentName: 'CVCreativePortfolio', tags: ['creative', 'design', 'colorful'], order: 30 },
    { slug: 'cv-creative-bold', name: 'Bold Creative', nameAr: 'جريء إبداعي', category: 'creative', componentName: 'CVCreativeBold', isFeatured: true, tags: ['creative', 'bold'], order: 31 },
    // Technology
    { slug: 'cv-tech-developer', name: 'Developer Pro', nameAr: 'مطور محترف', category: 'technology', componentName: 'CVTechDeveloper', isATS: true, isFeatured: true, tags: ['tech', 'developer', 'ats'], order: 40 },
    { slug: 'cv-tech-engineer', name: 'Engineer', nameAr: 'مهندس', category: 'technology', componentName: 'CVTechEngineer', isATS: true, tags: ['tech', 'engineer'], order: 41 },
    // Executive
    { slug: 'cv-executive-premium', name: 'Executive Premium', nameAr: 'تنفيذي فاخر', category: 'executive', componentName: 'CVExecutivePremium', isPremium: true, tags: ['executive', 'premium', 'luxury'], order: 50 },
    // Finance
    { slug: 'cv-finance-professional', name: 'Finance Professional', nameAr: 'مالي محترف', category: 'finance', componentName: 'CVFinanceProfessional', isATS: true, tags: ['finance', 'professional', 'ats'], order: 60 },
    // Marketing
    { slug: 'cv-marketing-creative', name: 'Marketing Creative', nameAr: 'تسويق إبداعي', category: 'marketing', componentName: 'CVMarketingCreative', tags: ['marketing', 'creative'], order: 70 },
    // Student
    { slug: 'cv-student-fresh', name: 'Fresh Graduate', nameAr: 'خريج جديد', category: 'student', componentName: 'CVStudentFresh', isATS: true, tags: ['student', 'graduate', 'entry-level', 'ats'], order: 80 },
    // Elegant
    { slug: 'cv-elegant-serif', name: 'Elegant Serif', nameAr: 'أنيق كلاسيكي', category: 'elegant', componentName: 'CVElegantSerif', isPremium: true, tags: ['elegant', 'serif', 'premium'], order: 90 },
    // ATS
    { slug: 'cv-ats-simple', name: 'ATS Simple', nameAr: 'ATS بسيط', category: 'ats', componentName: 'CVATSSimple', isATS: true, tags: ['ats', 'simple', 'recruiter-friendly'], order: 100 },
    { slug: 'cv-ats-professional', name: 'ATS Professional', nameAr: 'ATS محترف', category: 'ats', componentName: 'CVATSProfessional', isATS: true, isFeatured: true, tags: ['ats', 'professional'], order: 101 },
    // Engineering
    { slug: 'cv-engineering-technical', name: 'Technical Engineer', nameAr: 'مهندس تقني', category: 'engineering', componentName: 'CVEngineeringTechnical', isATS: true, tags: ['engineering', 'technical'], order: 110 },
  ];

  for (const template of cvTemplates) {
    await prisma.cVTemplate.upsert({
      where: { slug: template.slug },
      update: {},
      create: { ...template, description: `Professional ${template.name} CV template`, supportedLanguages: ['en', 'ar'] },
    });
  }

  // Portfolio Templates (40 total — seeding first batch of 15)
  const portfolioTemplates = [
    { slug: 'pf-minimal-white', name: 'Clean White', nameAr: 'أبيض نظيف', category: 'minimal', componentName: 'PFMinimalWhite', isFeatured: true, tags: ['minimal', 'clean'], order: 1 },
    { slug: 'pf-minimal-ink', name: 'Ink', nameAr: 'حبر', category: 'minimal', componentName: 'PFMinimalInk', tags: ['minimal', 'dark'], order: 2 },
    { slug: 'pf-corporate-pro', name: 'Corporate Pro', nameAr: 'شركات احترافي', category: 'corporate', componentName: 'PFCorporatePro', isFeatured: true, tags: ['corporate', 'professional'], order: 10 },
    { slug: 'pf-creative-canvas', name: 'Creative Canvas', nameAr: 'لوحة إبداعية', category: 'creative', componentName: 'PFCreativeCanvas', isFeatured: true, tags: ['creative', 'design', 'colorful'], order: 20 },
    { slug: 'pf-developer-terminal', name: 'Terminal', nameAr: 'مطور', category: 'developer', componentName: 'PFDeveloperTerminal', tags: ['developer', 'dark', 'code'], order: 30 },
    { slug: 'pf-developer-github', name: 'GitHub Style', nameAr: 'نمط مطور', category: 'developer', componentName: 'PFDeveloperGithub', isFeatured: true, tags: ['developer', 'github'], order: 31 },
    { slug: 'pf-designer-studio', name: 'Design Studio', nameAr: 'استوديو تصميم', category: 'designer', componentName: 'PFDesignerStudio', tags: ['designer', 'creative', 'portfolio'], order: 40 },
    { slug: 'pf-freelancer-modern', name: 'Freelancer Modern', nameAr: 'مستقل عصري', category: 'freelancer', componentName: 'PFFreelancerModern', tags: ['freelancer', 'modern', 'services'], order: 50 },
    { slug: 'pf-personal-brand', name: 'Personal Brand', nameAr: 'العلامة الشخصية', category: 'personal-brand', componentName: 'PFPersonalBrand', isFeatured: true, tags: ['personal', 'brand', 'professional'], order: 60 },
    { slug: 'pf-luxury-black', name: 'Luxury Black', nameAr: 'فاخر أسود', category: 'luxury', componentName: 'PFLuxuryBlack', isPremium: true, tags: ['luxury', 'dark', 'premium'], order: 70 },
    { slug: 'pf-minimal-portfolio', name: 'Portfolio Minimal', nameAr: 'معرض بسيط', category: 'minimal', componentName: 'PFMinimalPortfolio', tags: ['minimal', 'portfolio'], order: 3 },
    { slug: 'pf-corporate-blue', name: 'Corporate Blue', nameAr: 'شركات أزرق', category: 'corporate', componentName: 'PFCorporateBlue', tags: ['corporate', 'blue'], order: 11 },
    { slug: 'pf-creative-bold', name: 'Bold Creative', nameAr: 'إبداعي جريء', category: 'creative', componentName: 'PFCreativeBold', tags: ['creative', 'bold'], order: 21 },
    { slug: 'pf-designer-grid', name: 'Grid Layout', nameAr: 'شبكة', category: 'designer', componentName: 'PFDesignerGrid', tags: ['designer', 'grid'], order: 41 },
    { slug: 'pf-personal-minimal', name: 'Personal Minimal', nameAr: 'شخصي بسيط', category: 'personal-brand', componentName: 'PFPersonalMinimal', tags: ['personal', 'minimal'], order: 61 },
  ];

  for (const template of portfolioTemplates) {
    await prisma.portfolioTemplate.upsert({
      where: { slug: template.slug },
      update: {},
      create: { ...template, description: `Professional ${template.name} portfolio template` },
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log(`   Admin: ${process.env.ADMIN_EMAIL || 'admin@ecotrove.sa'}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
