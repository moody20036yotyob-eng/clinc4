import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, locale = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export function formatRelativeTime(date: string | Date, locale = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const rtf = new Intl.RelativeTimeFormat(locale === 'ar' ? 'ar' : 'en', { numeric: 'auto' });
  const diff = d.getTime() - Date.now();
  const seconds = diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (Math.abs(days) >= 1) return rtf.format(Math.round(days), 'day');
  if (Math.abs(hours) >= 1) return rtf.format(Math.round(hours), 'hour');
  return rtf.format(Math.round(minutes), 'minute');
}

export function formatCurrency(amount: number, currency = 'SAR', locale = 'en'): string {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-SA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function generateWhatsAppUrl(phoneNumber: string): string {
  const clean = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${clean}`;
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) return navigator.clipboard.writeText(text);
  return new Promise((resolve, reject) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    if (ok) resolve();
    else reject();
  });
}

export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}
