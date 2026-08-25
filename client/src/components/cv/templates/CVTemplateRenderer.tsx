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
};

export function CVTemplateRenderer({ data, templateSlug }: Props) {
  const Template = TEMPLATE_MAP[templateSlug] ?? CVMinimalClean;
  return <Template data={data} />;
}
