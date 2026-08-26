import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { CVTemplateRenderer } from '@/components/cv/templates/CVTemplateRenderer';
import type { CVData } from '@shared/types/cv';

interface CVResponse {
  id: string;
  title: string;
  data: CVData;
  template: { slug: string };
}

export default function CVPrintPage() {
  const { id } = useParams<{ id: string }>();

  const { data: cv, isSuccess } = useQuery({
    queryKey: ['cv-print', id],
    queryFn: () => api.get<CVResponse>(`/cv/${id}`),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess && cv) {
      document.title = cv.title;
    }
  }, [isSuccess, cv]);

  if (!cv) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
      </div>
    );
  }

  return (
    <div data-cv-ready="true">
      <CVTemplateRenderer data={cv.data} templateSlug={cv.template.slug} />
    </div>
  );
}
