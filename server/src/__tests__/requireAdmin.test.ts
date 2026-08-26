import { describe, it, expect, vi } from 'vitest';
import { requireAdmin } from '../middleware/authenticate';
import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../middleware/authenticate';
import { AppError } from '../middleware/errorHandler';

describe('requireAdmin', () => {
  it('calls next() when user is ADMIN', () => {
    const req = { user: { id: '1', email: 'a@a.com', role: 'ADMIN' } } as AuthRequest;
    const next: NextFunction = vi.fn();
    requireAdmin(req, {} as Response, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('passes AppError 403 when user is USER', () => {
    const req = { user: { id: '1', email: 'a@a.com', role: 'USER' } } as AuthRequest;
    const next: NextFunction = vi.fn();
    requireAdmin(req, {} as Response, next);
    const err = (next as any).mock.calls[0][0];
    expect(err).toBeInstanceOf(AppError);
    expect(err.statusCode).toBe(403);
  });

  it('passes AppError 403 when user is undefined', () => {
    const req = {} as AuthRequest;
    const next: NextFunction = vi.fn();
    requireAdmin(req, {} as Response, next);
    const err = (next as any).mock.calls[0][0];
    expect(err).toBeInstanceOf(AppError);
    expect(err.statusCode).toBe(403);
  });
});
