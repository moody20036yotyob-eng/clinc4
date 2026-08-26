import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';
import { PortfolioTemplateRenderer } from '@/components/portfolio/templates/PortfolioTemplateRenderer';
import type { PortfolioData } from '@shared/types/portfolio';

interface PublicPortfolioResponse {
  data: PortfolioData;
  templateSlug: string;
  title: string;
}

function setMetaTag(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

export default function PublicPortfolioPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['public-portfolio', slug],
    queryFn: () => api.get<PublicPortfolioResponse>(`/portfolio/public/${slug}`),
    enabled: !!slug,
    retry: false,
  });

  useEffect(() => {
    if (!data) return;
    const { personal } = data.data;
    const name = personal?.name || data.title;
    const title = personal?.title || '';
    const bio = personal?.bio || '';
    const photo = personal?.photo || '';
    const pageTitle = title ? `${name} — ${title}` : name;
    const desc = bio.slice(0, 160) || `${name}'s professional portfolio`;

    document.title = pageTitle;
    setMetaTag('description', desc);
    setMetaTag('og:title', pageTitle, true);
    setMetaTag('og:description', desc, true);
    setMetaTag('og:type', 'profile', true);
    if (photo) setMetaTag('og:image', photo, true);
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', pageTitle);
    setMetaTag('twitter:description', desc);
    if (photo) setMetaTag('twitter:image', photo);

    return () => { document.title = 'EcoTrove'; };
  }, [data]);

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
