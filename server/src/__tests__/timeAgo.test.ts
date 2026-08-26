import { describe, it, expect } from 'vitest';

function timeAgo(date: Date): string {
  const ms = Date.now() - date.getTime();
  const d = Math.floor(ms / 86400000);
  if (d > 0) return `${d}d ago`;
  const h = Math.floor(ms / 3600000);
  if (h > 0) return `${h}h ago`;
  return 'just now';
}

describe('timeAgo', () => {
  it('returns "just now" for recent timestamps', () => {
    expect(timeAgo(new Date(Date.now() - 30_000))).toBe('just now');
  });

  it('returns hours ago', () => {
    expect(timeAgo(new Date(Date.now() - 2 * 3600_000))).toBe('2h ago');
  });

  it('returns days ago', () => {
    expect(timeAgo(new Date(Date.now() - 3 * 86400_000))).toBe('3d ago');
  });

  it('prioritises days over hours', () => {
    expect(timeAgo(new Date(Date.now() - 25 * 3600_000))).toBe('1d ago');
  });
});
