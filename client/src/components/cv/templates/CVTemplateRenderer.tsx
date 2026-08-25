import type { CVData } from '@shared/types/cv';
import { CVMinimalClean } from './CVMinimalClean';
import { CVModernPrime } from './CVModernPrime';

interface Props {
  data: CVData;
  templateSlug: string;
}

const TEMPLATE_MAP: Record<string, React.ComponentType<{ data: CVData }>> = {
  'minimal-clean': CVMinimalClean,
  'modern-prime': CVModernPrime,
};

export function CVTemplateRenderer({ data, templateSlug }: Props) {
  const Template = TEMPLATE_MAP[templateSlug] ?? CVMinimalClean;
  return <Template data={data} />;
}
