import type { PortfolioData } from '@shared/types/portfolio';
import { PortfolioMinimal } from './PortfolioMinimal';
import { PortfolioMinimalDark } from './PortfolioMinimalDark';
import { PortfolioMinimalTypo } from './PortfolioMinimalTypo';
import { PortfolioMinimalGrid } from './PortfolioMinimalGrid';
import { PortfolioMinimalLine } from './PortfolioMinimalLine';
import { PortfolioMinimalMono } from './PortfolioMinimalMono';
import { PortfolioCorporateBlue } from './PortfolioCorporateBlue';
import { PortfolioCorporateWhite } from './PortfolioCorporateWhite';
import { PortfolioCorporateSplit } from './PortfolioCorporateSplit';
import { PortfolioCorporateDark } from './PortfolioCorporateDark';
import { PortfolioCorporateModern } from './PortfolioCorporateModern';
import { PortfolioCreativeBold } from './PortfolioCreativeBold';
import { PortfolioCreativeArt } from './PortfolioCreativeArt';
import { PortfolioCreativeAgency } from './PortfolioCreativeAgency';
import { PortfolioCreativePlayful } from './PortfolioCreativePlayful';
import { PortfolioCreativeEditorial } from './PortfolioCreativeEditorial';
import { PortfolioDevTerminal } from './PortfolioDevTerminal';
import { PortfolioDevClean } from './PortfolioDevClean';
import { PortfolioDevDark } from './PortfolioDevDark';
import { PortfolioDevMinimal } from './PortfolioDevMinimal';
import { PortfolioDevModern } from './PortfolioDevModern';

interface Props {
  data: PortfolioData;
  templateSlug: string;
}

const TEMPLATE_MAP: Record<string, React.ComponentType<{ data: PortfolioData }>> = {
  'portfolio-minimal': PortfolioMinimal,
  'portfolio-minimal-dark': PortfolioMinimalDark,
  'portfolio-minimal-typo': PortfolioMinimalTypo,
  'portfolio-minimal-grid': PortfolioMinimalGrid,
  'portfolio-minimal-line': PortfolioMinimalLine,
  'portfolio-minimal-mono': PortfolioMinimalMono,
  'portfolio-corporate-blue': PortfolioCorporateBlue,
  'portfolio-corporate-white': PortfolioCorporateWhite,
  'portfolio-corporate-split': PortfolioCorporateSplit,
  'portfolio-corporate-dark': PortfolioCorporateDark,
  'portfolio-corporate-modern': PortfolioCorporateModern,
  'portfolio-creative-bold': PortfolioCreativeBold,
  'portfolio-creative-art': PortfolioCreativeArt,
  'portfolio-creative-agency': PortfolioCreativeAgency,
  'portfolio-creative-playful': PortfolioCreativePlayful,
  'portfolio-creative-editorial': PortfolioCreativeEditorial,
  'portfolio-dev-terminal': PortfolioDevTerminal,
  'portfolio-dev-clean': PortfolioDevClean,
  'portfolio-dev-dark': PortfolioDevDark,
  'portfolio-dev-minimal': PortfolioDevMinimal,
  'portfolio-dev-modern': PortfolioDevModern,
};

export function PortfolioTemplateRenderer({ data, templateSlug }: Props) {
  const Template = TEMPLATE_MAP[templateSlug] ?? PortfolioMinimal;
  return <Template data={data} />;
}
