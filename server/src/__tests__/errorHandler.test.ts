import { describe, it, expect, vi } from 'vitest';
import { AppError, errorHandler } from '../middleware/errorHandler';
import type { Request, Response, NextFunction } from 'express';

function makeRes() {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  } as unknown as Response;
  return res;
}

describe('AppError', () => {
  it('sets message, statusCode, and code', () => {
    const err = new AppError('Not found', 404, 'NOT_FOUND');
    expect(err.message).toBe('Not found');
    expect(err.statusCode).toBe(404);
    expect(err.code).toBe('NOT_FOUND');
    expect(err.name).toBe('AppError');
  });

  it('defaults statusCode to 500', () => {
    const err = new AppError('oops');
    expect(err.statusCode).toBe(500);
  });
});

describe('errorHandler', () => {
  const next: NextFunction = vi.fn();

  it('returns AppError details as JSON', () => {
    const res = makeRes();
    const err = new AppError('Payment required', 402, 'PAYMENT_REQUIRED');
    errorHandler(err, {} as Request, res, next);
    expect(res.status).toHaveBeenCalledWith(402);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'Payment required',
      code: 'PAYMENT_REQUIRED',
    });
  });

  it('returns 500 for unknown errors', () => {
    const res = makeRes();
    errorHandler(new Error('boom'), {} as Request, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect((res.json as any).mock.calls[0][0]).toMatchObject({ success: false });
  });
});
