import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { prisma } from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/authenticate';
import { AppError } from '../middleware/errorHandler';
import { uploadLimiter } from '../middleware/rateLimiter';

export const uploadRouter = Router();
uploadRouter.use(authenticate, uploadLimiter);

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuid()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_SIZE },
  fileFilter: (_, file, cb) => {
    if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'));
    }
  },
});

uploadRouter.post('/image', upload.single('file'), async (req: AuthRequest, res, next) => {
  try {
    if (!req.file) throw new AppError('No file uploaded', 400);

    const baseUrl = process.env.SERVER_URL || `http://localhost:${process.env.PORT || 3001}`;
    const url = `${baseUrl}/uploads/${req.file.filename}`;

    await prisma.file.create({
      data: {
        userId: req.user!.id,
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url,
        storageType: 'local',
        storageKey: req.file.filename,
      },
    });

    res.json({ success: true, data: { url, filename: req.file.filename } });
  } catch (err) {
    next(err);
  }
});
