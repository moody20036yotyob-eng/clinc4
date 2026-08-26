import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding EcoTrove database...');

  // ── Admin user ─────────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash(
    process.env.ADMIN_INITIAL_PASSWORD || 'Admin@EcoTrove123',
    12,
  );
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

  // ── Platform settings ───────────────────────────────────────────────────────
  const defaultSettings = [
    { key: 'price_cv',              value: '119',                         label: 'CV Price (SAR)' },
    { key: 'price_portfolio',       value: '159',                         label: 'Portfolio Price (SAR)' },
    { key: 'price_bundle',          value: '249',                         label: 'Bundle Price (SAR)' },
    { key: 'hosting_renewal_price', value: '79',                          label: 'Hosting Renewal Price (SAR/year)' },
    { key: 'currency',              value: 'SAR',                         label: 'Currency' },
    { key: 'whatsapp_number',       value: process.env.WHATSAPP_NUMBER || '966500000000', label: 'WhatsApp Number' },
    { key: 'company_email',         value: 'hello@ecotrove.sa',           label: 'Company Email' },
    { key: 'portfolio_base_url',    value: 'https://ecotrove.sa/p',       label: 'Portfolio Base URL' },
  ];

  for (const s of defaultSettings) {
    await prisma.setting.upsert({ where: { key: s.key }, update: {}, create: s });
  }

  // ── CV Templates (82 templates) ─────────────────────────────────────────────
  // slugs MUST match the keys in CVTemplateRenderer.tsx TEMPLATE_MAP
  const cvTemplates = [
    // ── Original pair ──────────────────────────────────────────────────────────
    { slug: 'minimal-clean',       name: 'Clean Minimal',         nameAr: 'أنيق بسيط',          category: 'minimal',      isATS: true,  isFeatured: true,  tags: ['minimal','clean','ats'],                order: 1  },
    { slug: 'modern-prime',        name: 'Prime Modern',          nameAr: 'عصري متميز',          category: 'modern',       isFeatured: true,                  tags: ['modern','sidebar','colorful'],          order: 2  },

    // ── Batch 1 ────────────────────────────────────────────────────────────────
    { slug: 'dark-sidebar',        name: 'Dark Sidebar',          nameAr: 'شريط جانبي داكن',     category: 'modern',       isFeatured: true,                  tags: ['dark','sidebar','modern'],              order: 10 },
    { slug: 'elegant-photo',       name: 'Elegant Photo',         nameAr: 'صورة أنيقة',          category: 'elegant',      isFeatured: true,                  tags: ['elegant','photo','two-column'],         order: 11 },
    { slug: 'bold-header',         name: 'Bold Header',           nameAr: 'رأس جريء',            category: 'creative',                                        tags: ['bold','header','photo'],                order: 12 },
    { slug: 'creative-splash',     name: 'Creative Splash',       nameAr: 'إبداعي ملون',         category: 'creative',                                        tags: ['creative','colorful','shapes'],         order: 13 },
    { slug: 'professional-photo',  name: 'Professional Photo',    nameAr: 'صورة احترافية',       category: 'professional', isFeatured: true,                  tags: ['professional','photo','classic'],       order: 14 },
    { slug: 'modern-two-col',      name: 'Modern Two Column',     nameAr: 'عمودان عصريان',       category: 'modern',                                          tags: ['modern','two-column','sidebar'],        order: 15 },
    { slug: 'academic-clean',      name: 'Academic Clean',        nameAr: 'أكاديمي نظيف',        category: 'academic',     isATS: true,                       tags: ['academic','clean','single-column'],     order: 16 },
    { slug: 'creative-lines',      name: 'Creative Lines',        nameAr: 'خطوط إبداعية',        category: 'creative',                                        tags: ['creative','diagonal','accent'],         order: 17 },
    { slug: 'infographic',         name: 'Infographic',           nameAr: 'إنفوغرافيك',          category: 'creative',     isFeatured: true,                  tags: ['infographic','visual','skill-bars'],    order: 18 },
    { slug: 'minimalist-border',   name: 'Minimalist Border',     nameAr: 'حدود بسيطة',          category: 'minimal',      isATS: true,                       tags: ['minimal','border','clean'],             order: 19 },
    { slug: 'executive-gold',      name: 'Executive Gold',        nameAr: 'تنفيذي ذهبي',         category: 'executive',    isPremium: true, isFeatured: true,  tags: ['executive','gold','premium','navy'],    order: 20 },
    { slug: 'tech-developer',      name: 'Tech Developer',        nameAr: 'مطور تقني',           category: 'technology',   isFeatured: true,                  tags: ['tech','developer','terminal','code'],   order: 21 },
    { slug: 'startup-modern',      name: 'Startup Modern',        nameAr: 'شركة ناشئة',          category: 'modern',                                          tags: ['startup','modern','rounded','tags'],    order: 22 },
    { slug: 'finance-pro',         name: 'Finance Pro',           nameAr: 'مالي محترف',          category: 'finance',      isATS: true,                       tags: ['finance','conservative','ats'],         order: 23 },
    { slug: 'graduate-entry',      name: 'Graduate Entry',        nameAr: 'خريج جديد',           category: 'student',      isATS: true,                       tags: ['student','graduate','entry-level'],     order: 24 },
    { slug: 'luxury-dark',         name: 'Luxury Dark',           nameAr: 'فاخر داكن',           category: 'luxury',       isPremium: true,                   tags: ['luxury','dark','premium','elegant'],    order: 25 },
    { slug: 'marketing-bold',      name: 'Marketing Bold',        nameAr: 'تسويق جريء',          category: 'marketing',                                       tags: ['marketing','bold','creative'],          order: 26 },
    { slug: 'timeline-style',      name: 'Timeline',              nameAr: 'خط زمني',             category: 'modern',                                          tags: ['timeline','modern','visual'],           order: 27 },
    { slug: 'compact-ats',         name: 'Compact ATS',           nameAr: 'ATS مدمج',            category: 'ats',          isATS: true, isFeatured: true,      tags: ['ats','compact','recruiter-friendly'],   order: 28 },
    { slug: 'designer-portfolio',  name: 'Designer Portfolio',    nameAr: 'معرض المصمم',         category: 'creative',                                        tags: ['designer','portfolio','visual'],        order: 29 },

    // ── Batch 2 ────────────────────────────────────────────────────────────────
    { slug: 'split-color',         name: 'Split Color',           nameAr: 'ألوان مقسمة',         category: 'modern',       isFeatured: true,                  tags: ['split','color','modern'],               order: 30 },
    { slug: 'editorial',           name: 'Editorial',             nameAr: 'تحريري',              category: 'creative',                                        tags: ['editorial','magazine','three-column'],  order: 31 },
    { slug: 'geometric',           name: 'Geometric',             nameAr: 'هندسي',               category: 'creative',                                        tags: ['geometric','shapes','modern'],          order: 32 },
    { slug: 'corporate-blue',      name: 'Corporate Blue',        nameAr: 'أزرق الشركات',        category: 'corporate',    isATS: true,                       tags: ['corporate','blue','classic'],           order: 33 },
    { slug: 'photo-right',         name: 'Photo Right',           nameAr: 'صورة يمين',           category: 'professional',                                    tags: ['photo','right','asymmetric'],           order: 34 },
    { slug: 'swiss-clean',         name: 'Swiss Design',          nameAr: 'تصميم سويسري',        category: 'minimal',                                         tags: ['swiss','grid','typography'],            order: 35 },
    { slug: 'agency-style',        name: 'Agency Style',          nameAr: 'نمط الوكالة',         category: 'creative',                                        tags: ['agency','studio','dark'],               order: 36 },
    { slug: 'card-based',          name: 'Card Based',            nameAr: 'بطاقات',              category: 'modern',                                          tags: ['cards','modern','shadow'],              order: 37 },
    { slug: 'hero-name',           name: 'Hero Name',             nameAr: 'اسم بطولي',           category: 'modern',                                          tags: ['hero','name','large-type'],             order: 38 },
    { slug: 'photo-circle-left',   name: 'Circle Photo',          nameAr: 'صورة دائرية',         category: 'elegant',                                         tags: ['photo','circle','elegant'],             order: 39 },
    { slug: 'arabic-modern',       name: 'Arabic Modern',         nameAr: 'عربي عصري',           category: 'arabic',       isFeatured: true,                  tags: ['arabic','rtl','modern'],                order: 40 },
    { slug: 'healthcare',          name: 'Healthcare',            nameAr: 'رعاية صحية',          category: 'professional',                                    tags: ['healthcare','medical','clean'],         order: 41 },
    { slug: 'legal-pro',           name: 'Legal Pro',             nameAr: 'قانوني محترف',        category: 'professional', isATS: true,                       tags: ['legal','conservative','serif'],         order: 42 },
    { slug: 'teacher-edu',         name: 'Teacher / Educator',    nameAr: 'معلم',                category: 'academic',                                        tags: ['teacher','education','warm'],           order: 43 },
    { slug: 'freelancer',          name: 'Freelancer',            nameAr: 'مستقل',               category: 'modern',                                          tags: ['freelancer','self-brand','portfolio'],  order: 44 },
    { slug: 'senior-exec',         name: 'Senior Executive',      nameAr: 'تنفيذي أول',          category: 'executive',    isPremium: true,                   tags: ['executive','senior','navy'],            order: 45 },
    { slug: 'product-manager',     name: 'Product Manager',       nameAr: 'مدير المنتج',         category: 'technology',                                      tags: ['product','manager','saas','modern'],    order: 46 },
    { slug: 'data-scientist',      name: 'Data Scientist',        nameAr: 'عالم بيانات',         category: 'technology',                                      tags: ['data','science','analytics'],           order: 47 },
    { slug: 'creative-bold',       name: 'Creative Bold',         nameAr: 'إبداعي جريء',         category: 'creative',     isFeatured: true,                  tags: ['creative','bold','colorful'],           order: 48 },
    { slug: 'elegant-minimal',     name: 'Elegant Minimal',       nameAr: 'بسيط أنيق',           category: 'minimal',      isPremium: true,                   tags: ['elegant','minimal','refined'],          order: 49 },

    // ── Batch 3 ────────────────────────────────────────────────────────────────
    { slug: 'modern-photo-header', name: 'Modern Photo Header',   nameAr: 'رأس بصورة عصرية',    category: 'modern',                                          tags: ['photo','header','modern','gradient'],   order: 50 },
    { slug: 'diagonal-split',      name: 'Diagonal Split',        nameAr: 'قسم قطري',            category: 'creative',                                        tags: ['diagonal','split','creative'],          order: 51 },
    { slug: 'circular-skills',     name: 'Circular Skills',       nameAr: 'مهارات دائرية',       category: 'modern',       isFeatured: true,                  tags: ['circular','skills','visual','svg'],     order: 52 },
    { slug: 'monogram',            name: 'Monogram',              nameAr: 'مونوغرام',            category: 'elegant',      isPremium: true,                   tags: ['monogram','initials','elegant'],        order: 53 },
    { slug: 'newspaper',           name: 'Newspaper',             nameAr: 'صحيفة',               category: 'creative',                                        tags: ['newspaper','editorial','columns'],      order: 54 },
    { slug: 'ribbon-accent',       name: 'Ribbon Accent',         nameAr: 'شريط زخرفي',          category: 'elegant',                                         tags: ['ribbon','accent','elegant'],            order: 55 },
    { slug: 'two-tone',            name: 'Two Tone',              nameAr: 'لونان',               category: 'modern',                                          tags: ['two-tone','color','modern'],            order: 56 },
    { slug: 'passport-style',      name: 'Passport Style',        nameAr: 'نمط جواز سفر',        category: 'creative',                                        tags: ['passport','unique','memorable'],        order: 57 },
    { slug: 'icon-sidebar',        name: 'Icon Sidebar',          nameAr: 'شريط بأيقونات',       category: 'modern',                                          tags: ['icons','sidebar','modern'],             order: 58 },
    { slug: 'gradient-header',     name: 'Gradient Header',       nameAr: 'رأس متدرج',           category: 'modern',       isFeatured: true,                  tags: ['gradient','header','colorful'],         order: 59 },
    { slug: 'nonprofit',           name: 'Nonprofit / NGO',       nameAr: 'غير ربحي',            category: 'professional',                                    tags: ['nonprofit','ngo','warm','green'],       order: 60 },
    { slug: 'hospitality',         name: 'Hospitality',           nameAr: 'ضيافة',               category: 'professional',                                    tags: ['hospitality','hotel','gold'],           order: 61 },
    { slug: 'sales-pro',           name: 'Sales Pro',             nameAr: 'مبيعات محترفة',       category: 'marketing',                                       tags: ['sales','achievements','results'],       order: 62 },
    { slug: 'hr-professional',     name: 'HR Professional',       nameAr: 'موارد بشرية',         category: 'professional', isATS: true,                       tags: ['hr','people','professional'],           order: 63 },
    { slug: 'journalist',          name: 'Journalist',            nameAr: 'صحفي',                category: 'creative',                                        tags: ['journalist','media','editorial'],       order: 64 },
    { slug: 'consulting',          name: 'Consulting',            nameAr: 'استشاري',             category: 'corporate',    isATS: true,                       tags: ['consulting','mckinsey','structured'],   order: 65 },
    { slug: 'researcher',          name: 'Researcher',            nameAr: 'باحث',                category: 'academic',     isATS: true,                       tags: ['research','academic','publications'],   order: 66 },
    { slug: 'it-infrastructure',   name: 'IT Infrastructure',     nameAr: 'بنية تحتية',          category: 'technology',                                      tags: ['it','infrastructure','sysadmin'],       order: 67 },
    { slug: 'social-media',        name: 'Social Media',          nameAr: 'وسائل التواصل',       category: 'marketing',                                       tags: ['social','media','content','creator'],   order: 68 },
    { slug: 'business-analyst',    name: 'Business Analyst',      nameAr: 'محلل أعمال',          category: 'corporate',                                       tags: ['business','analyst','data'],            order: 69 },

    // ── Batch 4 ────────────────────────────────────────────────────────────────
    { slug: 'bold-color-blocks',   name: 'Bold Color Blocks',     nameAr: 'كتل ملونة جريئة',    category: 'creative',                                        tags: ['bold','color','blocks','sections'],     order: 70 },
    { slug: 'watermark-name',      name: 'Watermark Name',        nameAr: 'اسم كعلامة مائية',   category: 'elegant',                                         tags: ['watermark','name','elegant'],           order: 71 },
    { slug: 'magazine-cover',      name: 'Magazine Cover',        nameAr: 'غلاف مجلة',          category: 'creative',     isFeatured: true,                  tags: ['magazine','cover','cinematic'],         order: 72 },
    { slug: 'triangle-corner',     name: 'Triangle Corner',       nameAr: 'مثلث',               category: 'creative',                                        tags: ['triangle','geometric','corner'],        order: 73 },
    { slug: 'border-frame',        name: 'Border Frame',          nameAr: 'إطار حدودي',          category: 'elegant',      isPremium: true,                   tags: ['border','frame','classic','elegant'],   order: 74 },
    { slug: 'color-band-stack',    name: 'Color Band Stack',      nameAr: 'أشرطة ملونة',         category: 'modern',                                          tags: ['bands','color','stripe','header'],      order: 75 },
    { slug: 'tab-dividers',        name: 'Tab Dividers',          nameAr: 'علامات تبويب',        category: 'modern',                                          tags: ['tabs','dividers','skeuomorphic'],       order: 76 },
    { slug: 'icon-rich',           name: 'Icon Rich',             nameAr: 'غني بالأيقونات',      category: 'modern',                                          tags: ['icons','symbols','rich'],               order: 77 },
    { slug: 'minimal-cards',       name: 'Minimal Cards',         nameAr: 'بطاقات بسيطة',        category: 'minimal',                                         tags: ['cards','minimal','shadow'],             order: 78 },
    { slug: 'dot-accents',         name: 'Dot Accents',           nameAr: 'نقاط زخرفية',         category: 'elegant',                                         tags: ['dots','accent','circles','numbered'],   order: 79 },
    { slug: 'architect-design',    name: 'Architect / Design',    nameAr: 'معماري مصمم',         category: 'professional',                                    tags: ['architect','design','blueprint'],       order: 80 },
    { slug: 'game-developer',      name: 'Game Developer',        nameAr: 'مطور ألعاب',          category: 'technology',                                      tags: ['gaming','developer','dark','neon'],     order: 81 },
    { slug: 'civil-engineer',      name: 'Civil Engineer',        nameAr: 'مهندس مدني',          category: 'engineering',  isATS: true,                       tags: ['civil','engineer','technical'],         order: 82 },
    { slug: 'accountant',          name: 'Accountant / CPA',      nameAr: 'محاسب',               category: 'finance',      isATS: true,                       tags: ['accounting','finance','cpa','ats'],     order: 83 },
    { slug: 'video-producer',      name: 'Video Producer',        nameAr: 'منتج فيديو',          category: 'creative',                                        tags: ['video','film','producer','creative'],   order: 84 },
    { slug: 'ux-researcher',       name: 'UX Researcher',         nameAr: 'باحث UX',             category: 'technology',                                      tags: ['ux','research','design','methods'],     order: 85 },
    { slug: 'executive-brief',     name: 'Executive Brief',       nameAr: 'ملخص تنفيذي',         category: 'executive',    isPremium: true, isFeatured: true,  tags: ['executive','brief','board','senior'],   order: 86 },
    { slug: 'multilingual',        name: 'Multilingual',          nameAr: 'متعدد اللغات',        category: 'professional',                                    tags: ['multilingual','languages','global'],    order: 87 },
    { slug: 'night-mode',          name: 'Night Mode',            nameAr: 'الوضع الليلي',        category: 'modern',       isFeatured: true,                  tags: ['dark','night','modern','glow'],         order: 88 },
    { slug: 'clean-split',         name: 'Clean Split',           nameAr: 'قسم نظيف',            category: 'minimal',      isATS: true,                       tags: ['clean','split','two-column','ats'],     order: 89 },
  ];

  for (const t of cvTemplates) {
    await prisma.cVTemplate.upsert({
      where: { slug: t.slug },
      update: { name: t.name, nameAr: t.nameAr, category: t.category, tags: t.tags, order: t.order, isATS: t.isATS ?? false, isFeatured: t.isFeatured ?? false, isPremium: t.isPremium ?? false },
      create: {
        slug: t.slug,
        name: t.name,
        nameAr: t.nameAr,
        category: t.category,
        description: `Professional ${t.name} CV template`,
        tags: t.tags,
        order: t.order,
        isATS: t.isATS ?? false,
        isFeatured: t.isFeatured ?? false,
        isPremium: t.isPremium ?? false,
        supportedLanguages: ['en', 'ar'],
        isActive: true,
      },
    });
  }
  console.log(`✅ Seeded ${cvTemplates.length} CV templates`);

  // ── Portfolio Templates (41 templates) ──────────────────────────────────────
  // slugs MUST match keys in PortfolioTemplateRenderer.tsx TEMPLATE_MAP
  const portfolioTemplates = [
    // Minimal (6)
    { slug: 'portfolio-minimal',           name: 'Minimal',             nameAr: 'بسيط',                 category: 'minimal',       isFeatured: true,                  tags: ['minimal','clean'],                        order: 1  },
    { slug: 'portfolio-minimal-dark',      name: 'Minimal Dark',        nameAr: 'بسيط داكن',            category: 'minimal',                                          tags: ['minimal','dark'],                         order: 2  },
    { slug: 'portfolio-minimal-typo',      name: 'Editorial Typo',      nameAr: 'تحريري',               category: 'minimal',                                          tags: ['minimal','typography','editorial'],        order: 3  },
    { slug: 'portfolio-minimal-grid',      name: 'Minimal Grid',        nameAr: 'شبكة بسيطة',           category: 'minimal',                                          tags: ['minimal','grid','gallery'],               order: 4  },
    { slug: 'portfolio-minimal-line',      name: 'Line Minimal',        nameAr: 'خط بسيط',              category: 'minimal',                                          tags: ['minimal','line','timeline'],              order: 5  },
    { slug: 'portfolio-minimal-mono',      name: 'Monochrome',          nameAr: 'أحادي اللون',          category: 'minimal',                                          tags: ['minimal','mono','cards'],                 order: 6  },
    // Corporate (5)
    { slug: 'portfolio-corporate-blue',    name: 'Corporate Blue',      nameAr: 'شركات أزرق',           category: 'corporate',     isFeatured: true,                  tags: ['corporate','blue','professional'],         order: 10 },
    { slug: 'portfolio-corporate-white',   name: 'Corporate White',     nameAr: 'شركات أبيض',           category: 'corporate',                                        tags: ['corporate','white','stats'],              order: 11 },
    { slug: 'portfolio-corporate-split',   name: 'Corporate Split',     nameAr: 'شركات بشريط',          category: 'corporate',                                        tags: ['corporate','sidebar','executive'],         order: 12 },
    { slug: 'portfolio-corporate-dark',    name: 'Corporate Dark',      nameAr: 'شركات داكن',           category: 'corporate',                                        tags: ['corporate','dark','gold'],                order: 13 },
    { slug: 'portfolio-corporate-modern',  name: 'Corporate Modern',    nameAr: 'شركات عصري',           category: 'corporate',                                        tags: ['corporate','saas','gradient'],             order: 14 },
    // Creative (5)
    { slug: 'portfolio-creative-bold',     name: 'Creative Bold',       nameAr: 'إبداعي جريء',          category: 'creative',      isFeatured: true,                  tags: ['creative','bold','colorful'],             order: 20 },
    { slug: 'portfolio-creative-art',      name: 'Art Gallery',         nameAr: 'معرض فني',             category: 'creative',                                        tags: ['creative','gallery','art'],               order: 21 },
    { slug: 'portfolio-creative-agency',   name: 'Creative Agency',     nameAr: 'وكالة إبداعية',        category: 'creative',                                        tags: ['creative','agency','dark'],               order: 22 },
    { slug: 'portfolio-creative-playful',  name: 'Playful',             nameAr: 'مرح',                  category: 'creative',                                        tags: ['creative','playful','colorful','wave'],   order: 23 },
    { slug: 'portfolio-creative-editorial',name: 'Creative Editorial',  nameAr: 'إبداعي تحريري',        category: 'creative',                                        tags: ['creative','editorial','magazine'],         order: 24 },
    // Developer (5)
    { slug: 'portfolio-dev-terminal',      name: 'Terminal',            nameAr: 'مطور طرفية',           category: 'developer',     isFeatured: true,                  tags: ['developer','terminal','dark','code'],     order: 30 },
    { slug: 'portfolio-dev-clean',         name: 'Dev Clean',           nameAr: 'مطور نظيف',            category: 'developer',                                        tags: ['developer','clean','github'],             order: 31 },
    { slug: 'portfolio-dev-dark',          name: 'Dev Dark',            nameAr: 'مطور داكن',            category: 'developer',                                        tags: ['developer','dark','vscode'],              order: 32 },
    { slug: 'portfolio-dev-minimal',       name: 'Dev Minimal',         nameAr: 'مطور بسيط',            category: 'developer',                                        tags: ['developer','minimal','ascii','hacker'],   order: 33 },
    { slug: 'portfolio-dev-modern',        name: 'Dev Modern',          nameAr: 'مطور عصري',            category: 'developer',                                        tags: ['developer','modern','hire','projects'],   order: 34 },
    // Designer (5)
    { slug: 'portfolio-designer-showcase', name: 'Designer Showcase',   nameAr: 'معرض المصمم',          category: 'designer',      isFeatured: true,                  tags: ['designer','showcase','masonry'],          order: 40 },
    { slug: 'portfolio-designer-dark',     name: 'Designer Dark',       nameAr: 'مصمم داكن',            category: 'designer',                                        tags: ['designer','dark','filmstrip'],            order: 41 },
    { slug: 'portfolio-designer-grid',     name: 'Designer Grid',       nameAr: 'شبكة تصميم',           category: 'designer',                                        tags: ['designer','grid','behance'],              order: 42 },
    { slug: 'portfolio-designer-typo',     name: 'Designer Editorial',  nameAr: 'تحريري مصمم',          category: 'designer',                                        tags: ['designer','typography','numbered'],       order: 43 },
    { slug: 'portfolio-designer-minimal',  name: 'Designer Minimal',    nameAr: 'مصمم بسيط',            category: 'designer',                                        tags: ['designer','minimal','whitespace'],        order: 44 },
    // Freelancer (5)
    { slug: 'portfolio-freelancer-pro',    name: 'Freelancer Pro',      nameAr: 'مستقل محترف',          category: 'freelancer',    isFeatured: true,                  tags: ['freelancer','services','hire'],           order: 50 },
    { slug: 'portfolio-freelancer-bold',   name: 'Freelancer Bold',     nameAr: 'مستقل جريء',           category: 'freelancer',                                        tags: ['freelancer','bold','dark','stats'],       order: 51 },
    { slug: 'portfolio-freelancer-clean',  name: 'Freelancer Clean',    nameAr: 'مستقل نظيف',           category: 'freelancer',                                        tags: ['freelancer','clean','agency'],            order: 52 },
    { slug: 'portfolio-freelancer-creative',name:'Freelancer Creative', nameAr: 'مستقل إبداعي',         category: 'freelancer',                                        tags: ['freelancer','creative','colorful'],       order: 53 },
    { slug: 'portfolio-freelancer-minimal',name: 'Freelancer Minimal',  nameAr: 'مستقل بسيط',           category: 'freelancer',                                        tags: ['freelancer','minimal','text-only'],       order: 54 },
    // Personal Brand (5)
    { slug: 'portfolio-personal-brand',    name: 'Personal Brand',      nameAr: 'علامة شخصية',          category: 'personal-brand',isFeatured: true,                  tags: ['personal','brand','hero'],                order: 60 },
    { slug: 'portfolio-personal-speaker',  name: 'Speaker / Leader',    nameAr: 'متحدث',                category: 'personal-brand',                                   tags: ['personal','speaker','thought-leader'],    order: 61 },
    { slug: 'portfolio-personal-coach',    name: 'Coach / Consultant',  nameAr: 'مدرب استشاري',         category: 'personal-brand',                                   tags: ['personal','coach','services'],            order: 62 },
    { slug: 'portfolio-personal-influencer',name:'Content Creator',     nameAr: 'منشئ محتوى',           category: 'personal-brand',                                   tags: ['personal','influencer','social'],         order: 63 },
    { slug: 'portfolio-personal-writer',   name: 'Writer / Author',     nameAr: 'كاتب',                 category: 'personal-brand',                                   tags: ['personal','writer','author','editorial'], order: 64 },
    // Luxury (5)
    { slug: 'portfolio-luxury-black',      name: 'Luxury Black',        nameAr: 'فاخر أسود',            category: 'luxury',        isPremium: true, isFeatured: true,  tags: ['luxury','dark','gold','premium'],         order: 70 },
    { slug: 'portfolio-luxury-white',      name: 'Luxury White',        nameAr: 'فاخر أبيض',            category: 'luxury',        isPremium: true,                   tags: ['luxury','white','ivory','premium'],       order: 71 },
    { slug: 'portfolio-luxury-navy',       name: 'Luxury Navy',         nameAr: 'فاخر كحلي',            category: 'luxury',        isPremium: true,                   tags: ['luxury','navy','formal','executive'],     order: 72 },
    { slug: 'portfolio-luxury-dark',       name: 'Luxury Dark',         nameAr: 'فاخر داكن',            category: 'luxury',        isPremium: true,                   tags: ['luxury','cinematic','dark'],              order: 73 },
    { slug: 'portfolio-luxury-gold',       name: 'Luxury Gold',         nameAr: 'فاخر ذهبي',            category: 'luxury',        isPremium: true,                   tags: ['luxury','gold','opulent'],                order: 74 },
  ];

  for (const t of portfolioTemplates) {
    await prisma.portfolioTemplate.upsert({
      where: { slug: t.slug },
      update: { name: t.name, nameAr: t.nameAr, category: t.category, tags: t.tags, order: t.order, isFeatured: t.isFeatured ?? false, isPremium: t.isPremium ?? false },
      create: {
        slug: t.slug,
        name: t.name,
        nameAr: t.nameAr,
        category: t.category,
        description: `Professional ${t.name} portfolio template`,
        tags: t.tags,
        order: t.order,
        isFeatured: t.isFeatured ?? false,
        isPremium: t.isPremium ?? false,
        isActive: true,
      },
    });
  }
  console.log(`✅ Seeded ${portfolioTemplates.length} portfolio templates`);

  console.log('\n🎉 Database seeded successfully!');
  console.log(`   Admin: ${process.env.ADMIN_EMAIL || 'admin@ecotrove.sa'}`);
  console.log(`   CV templates: ${cvTemplates.length}`);
  console.log(`   Portfolio templates: ${portfolioTemplates.length}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
