import type { PortfolioData } from '@shared/types/portfolio';
import { PortfolioMinimal } from './PortfolioMinimal';

interface Props {
  data: PortfolioData;
  templateSlug: string;
}

const TEMPLATE_MAP: Record<string, React.ComponentType<{ data: PortfolioData }>> = {
  'portfolio-minimal': PortfolioMinimal,
};

export function PortfolioTemplateRenderer({ data, templateSlug }: Props) {
  const Template = TEMPLATE_MAP[templateSlug] ?? PortfolioMinimal;
  return <Template data={data} />;
}
