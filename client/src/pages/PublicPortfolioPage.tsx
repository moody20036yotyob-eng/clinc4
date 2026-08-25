import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';
import { PortfolioTemplateRenderer } from '@/components/portfolio/templates/PortfolioTemplateRenderer';
import type { PortfolioData } from '@shared/types/portfolio';

export default function PublicPortfolioPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['public-portfolio', slug],
    queryFn: () => api.get<{ data: PortfolioData; templateSlug: string; title: string }>(`/portfolio/public/${slug}`),
    enabled: !!slug,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-brand-500" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-surface-500">
        <AlertCircle className="h-12 w-12 text-error-400" />
        <h1 className="text-2xl font-bold text-surface-900">Portfolio Not Found</h1>
        <p className="text-sm">This portfolio may be private or doesn't exist.</p>
        <a href="/" className="text-brand-600 hover:underline text-sm">Go to EcoTrove</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PortfolioTemplateRenderer data={data.data} templateSlug={data.templateSlug} />
    </div>
  );
}
