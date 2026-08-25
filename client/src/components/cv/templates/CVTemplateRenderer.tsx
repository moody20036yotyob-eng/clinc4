import type { CVData } from '@shared/types/cv';
import { CVMinimalClean } from './CVMinimalClean';
import { CVModernPrime } from './CVModernPrime';
import { CVDarkSidebar } from './CVDarkSidebar';
import { CVElegantPhoto } from './CVElegantPhoto';
import { CVBoldHeader } from './CVBoldHeader';
import { CVCreativeSplash } from './CVCreativeSplash';
import { CVProfessionalPhoto } from './CVProfessionalPhoto';
import { CVModernTwoCol } from './CVModernTwoCol';
import { CVAcademicClean } from './CVAcademicClean';
import { CVCreativeLines } from './CVCreativeLines';
import { CVInfographic } from './CVInfographic';
import { CVMinimalistBorder } from './CVMinimalistBorder';
import { CVExecutiveGold } from './CVExecutiveGold';
import { CVTechDeveloper } from './CVTechDeveloper';
import { CVStartupModern } from './CVStartupModern';
import { CVFinancePro } from './CVFinancePro';
import { CVGraduateEntry } from './CVGraduateEntry';
import { CVLuxuryDark } from './CVLuxuryDark';
import { CVMarketingBold } from './CVMarketingBold';
import { CVTimeline } from './CVTimeline';
import { CVCompactATS } from './CVCompactATS';
import { CVDesignerPortfolio } from './CVDesignerPortfolio';
import { CVSplitColor } from './CVSplitColor';
import { CVEditorial } from './CVEditorial';
import { CVGeometric } from './CVGeometric';
import { CVCorporateBlue } from './CVCorporateBlue';
import { CVPhotoRight } from './CVPhotoRight';
import { CVSwissClean } from './CVSwissClean';
import { CVCreativeAgencyStyle } from './CVCreativeAgencyStyle';
import { CVCardBased } from './CVCardBased';
import { CVHeroName } from './CVHeroName';
import { CVPhotoCircleLeft } from './CVPhotoCircleLeft';
import { CVArabicModern } from './CVArabicModern';
import { CVHealthcare } from './CVHealthcare';
import { CVLegalPro } from './CVLegalPro';
import { CVTeacherEdu } from './CVTeacherEdu';
import { CVFreelancer } from './CVFreelancer';
import { CVSeniorExec } from './CVSeniorExec';
import { CVProductManager } from './CVProductManager';
import { CVDataScientist } from './CVDataScientist';
import { CVCreativeBold } from './CVCreativeBold';
import { CVElegantMinimal } from './CVElegantMinimal';
import { CVModernPhotoHeader } from './CVModernPhotoHeader';
import { CVDiagonalSplit } from './CVDiagonalSplit';
import { CVCircularSkills } from './CVCircularSkills';
import { CVMonogramInitials } from './CVMonogramInitials';
import { CVNewspaper } from './CVNewspaper';
import { CVRibbonAccent } from './CVRibbonAccent';
import { CVTwoTone } from './CVTwoTone';
import { CVPassportStyle } from './CVPassportStyle';
import { CVIconSidebar } from './CVIconSidebar';
import { CVGradientHeader } from './CVGradientHeader';
import { CVNonprofit } from './CVNonprofit';
import { CVHospitality } from './CVHospitality';
import { CVSalesPro } from './CVSalesPro';
import { CVHRProfessional } from './CVHRProfessional';
import { CVJournalist } from './CVJournalist';
import { CVConsulting } from './CVConsulting';
import { CVResearcher } from './CVResearcher';
import { CVITInfrastructure } from './CVITInfrastructure';
import { CVSocialMedia } from './CVSocialMedia';
import { CVBusinessAnalyst } from './CVBusinessAnalyst';
import { CVBoldColorBlocks } from './CVBoldColorBlocks';
import { CVWatermarkName } from './CVWatermarkName';
import { CVMagazineCover } from './CVMagazineCover';
import { CVTriangleCorner } from './CVTriangleCorner';
import { CVBorderFrame } from './CVBorderFrame';
import { CVColorBandStack } from './CVColorBandStack';
import { CVTabDividers } from './CVTabDividers';
import { CVIconRich } from './CVIconRich';
import { CVMinimalCards } from './CVMinimalCards';
import { CVDotAccents } from './CVDotAccents';
import { CVArchitectDesign } from './CVArchitectDesign';
import { CVGameDeveloper } from './CVGameDeveloper';
import { CVCivilEngineer } from './CVCivilEngineer';
import { CVAccountant } from './CVAccountant';
import { CVVideoProducer } from './CVVideoProducer';
import { CVUXResearcher } from './CVUXResearcher';
import { CVExecutiveBrief } from './CVExecutiveBrief';
import { CVMultilingual } from './CVMultilingual';
import { CVNightMode } from './CVNightMode';
import { CVCleanSplit } from './CVCleanSplit';

interface Props {
  data: CVData;
  templateSlug: string;
}

const TEMPLATE_MAP: Record<string, React.ComponentType<{ data: CVData }>> = {
  'minimal-clean': CVMinimalClean,
  'modern-prime': CVModernPrime,
  'dark-sidebar': CVDarkSidebar,
  'elegant-photo': CVElegantPhoto,
  'bold-header': CVBoldHeader,
  'creative-splash': CVCreativeSplash,
  'professional-photo': CVProfessionalPhoto,
  'modern-two-col': CVModernTwoCol,
  'academic-clean': CVAcademicClean,
  'creative-lines': CVCreativeLines,
  'infographic': CVInfographic,
  'minimalist-border': CVMinimalistBorder,
  'executive-gold': CVExecutiveGold,
  'tech-developer': CVTechDeveloper,
  'startup-modern': CVStartupModern,
  'finance-pro': CVFinancePro,
  'graduate-entry': CVGraduateEntry,
  'luxury-dark': CVLuxuryDark,
  'marketing-bold': CVMarketingBold,
  'timeline-style': CVTimeline,
  'compact-ats': CVCompactATS,
  'designer-portfolio': CVDesignerPortfolio,
  'split-color': CVSplitColor,
  'editorial': CVEditorial,
  'geometric': CVGeometric,
  'corporate-blue': CVCorporateBlue,
  'photo-right': CVPhotoRight,
  'swiss-clean': CVSwissClean,
  'agency-style': CVCreativeAgencyStyle,
  'card-based': CVCardBased,
  'hero-name': CVHeroName,
  'photo-circle-left': CVPhotoCircleLeft,
  'arabic-modern': CVArabicModern,
  'healthcare': CVHealthcare,
  'legal-pro': CVLegalPro,
  'teacher-edu': CVTeacherEdu,
  'freelancer': CVFreelancer,
  'senior-exec': CVSeniorExec,
  'product-manager': CVProductManager,
  'data-scientist': CVDataScientist,
  'creative-bold': CVCreativeBold,
  'elegant-minimal': CVElegantMinimal,
  'modern-photo-header': CVModernPhotoHeader,
  'diagonal-split': CVDiagonalSplit,
  'circular-skills': CVCircularSkills,
  'monogram': CVMonogramInitials,
  'newspaper': CVNewspaper,
  'ribbon-accent': CVRibbonAccent,
  'two-tone': CVTwoTone,
  'passport-style': CVPassportStyle,
  'icon-sidebar': CVIconSidebar,
  'gradient-header': CVGradientHeader,
  'nonprofit': CVNonprofit,
  'hospitality': CVHospitality,
  'sales-pro': CVSalesPro,
  'hr-professional': CVHRProfessional,
  'journalist': CVJournalist,
  'consulting': CVConsulting,
  'researcher': CVResearcher,
  'it-infrastructure': CVITInfrastructure,
  'social-media': CVSocialMedia,
  'business-analyst': CVBusinessAnalyst,
  'bold-color-blocks': CVBoldColorBlocks,
  'watermark-name': CVWatermarkName,
  'magazine-cover': CVMagazineCover,
  'triangle-corner': CVTriangleCorner,
  'border-frame': CVBorderFrame,
  'color-band-stack': CVColorBandStack,
  'tab-dividers': CVTabDividers,
  'icon-rich': CVIconRich,
  'minimal-cards': CVMinimalCards,
  'dot-accents': CVDotAccents,
  'architect-design': CVArchitectDesign,
  'game-developer': CVGameDeveloper,
  'civil-engineer': CVCivilEngineer,
  'accountant': CVAccountant,
  'video-producer': CVVideoProducer,
  'ux-researcher': CVUXResearcher,
  'executive-brief': CVExecutiveBrief,
  'multilingual': CVMultilingual,
  'night-mode': CVNightMode,
  'clean-split': CVCleanSplit,
};

export function CVTemplateRenderer({ data, templateSlug }: Props) {
  const Template = TEMPLATE_MAP[templateSlug] ?? CVMinimalClean;
  return <Template data={data} />;
}
