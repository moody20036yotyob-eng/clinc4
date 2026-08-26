import { describe, it, expect } from 'vitest';

function applyDiscount(base: number, type: 'PERCENTAGE' | 'FIXED', value: number): number {
  const discount = type === 'PERCENTAGE' ? base * (value / 100) : value;
  return Math.max(0, base - discount);
}

describe('coupon discount calculation', () => {
  it('applies percentage discount correctly', () => {
    expect(applyDiscount(100, 'PERCENTAGE', 20)).toBe(80);
    expect(applyDiscount(200, 'PERCENTAGE', 50)).toBe(100);
  });

  it('applies fixed discount correctly', () => {
    expect(applyDiscount(100, 'FIXED', 30)).toBe(70);
    expect(applyDiscount(100, 'FIXED', 100)).toBe(0);
  });

  it('never goes below zero', () => {
    expect(applyDiscount(50, 'FIXED', 100)).toBe(0);
    expect(applyDiscount(50, 'PERCENTAGE', 150)).toBe(0);
  });

  it('100% discount results in 0', () => {
    expect(applyDiscount(199, 'PERCENTAGE', 100)).toBe(0);
  });
});
