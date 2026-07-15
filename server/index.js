import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { body, param, validationResult } from 'express-validator'
import xss from 'xss'
import { verifyPassword, signToken, requireAuth } from './auth.js'
import { Doctors, Services, Content } from './store.js'

const app = express()

// ── Security: Helmet (sets 14 HTTP headers) ──────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
}))

// ── Security: CORS — lock to known origins ────────────────────────────────────
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:4173').split(',')
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true)
    cb(new Error('CORS: origin not allowed'))
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.use(express.json({ limit: '50kb' })) // Body size cap

// ── Rate limiters ─────────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
})

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // 10 login attempts per 15 min
  message: { error: 'Too many login attempts. Please wait 15 minutes.' },
  skipSuccessfulRequests: true,
})

const writeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: 'Too many write requests. Slow down.' },
})

app.use('/api', globalLimiter)

// ── Helpers ───────────────────────────────────────────────────────────────────
function handleValidation(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() })
  }
  return null
}

function sanitizeBilingual(obj) {
  if (!obj || typeof obj !== 'object') return obj
  const out = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v && typeof v === 'object' && typeof v.en === 'string' && typeof v.ar === 'string') {
      out[k] = { en: xss(v.en), ar: xss(v.ar) }
    } else if (typeof v === 'string') {
      out[k] = xss(v)
    } else {
      out[k] = v
    }
  }
  return out
}

function isBilingual(v) {
  return v && typeof v === 'object' && !Array.isArray(v) &&
    typeof v.en === 'string' && typeof v.ar === 'string'
}

function validateBilingualFields(fields) {
  return fields.map(f =>
    body(f)
      .optional()
      .custom(v => {
        if (v !== undefined && !isBilingual(v)) throw new Error(`${f} must be {en: string, ar: string}`)
        return true
      })
  )
}

// ── Auth ──────────────────────────────────────────────────────────────────────
app.post('/api/admin/login',
  loginLimiter,
  body('password').isString().notEmpty().isLength({ max: 200 }),
  (req, res) => {
    const err = handleValidation(req, res)
    if (err) return

    const { password } = req.body
    if (!verifyPassword(password)) {
      return res.status(401).json({ error: 'Invalid password' })
    }
    res.json({ token: signToken() })
  }
)

// ── Doctors ──────────────────────────────────────────────────────────────────
const doctorValidators = validateBilingualFields(['name', 'credentials', 'specialty', 'years', 'bio'])

app.get('/api/doctors', async (req, res) => {
  res.json(await Doctors.list())
})

app.post('/api/doctors', requireAuth, writeLimiter, ...doctorValidators, async (req, res) => {
  const err = handleValidation(req, res)
  if (err) return
  const item = await Doctors.create(sanitizeBilingual(req.body))
  res.status(201).json(item)
})

app.put('/api/doctors/:id',
  requireAuth, writeLimiter,
  param('id').isUUID(),
  ...doctorValidators,
  async (req, res) => {
    const err = handleValidation(req, res)
    if (err) return
    const updated = await Doctors.update(req.params.id, sanitizeBilingual(req.body))
    if (!updated) return res.status(404).json({ error: 'Not found' })
    res.json(updated)
  }
)

app.delete('/api/doctors/:id', requireAuth, writeLimiter, param('id').isUUID(), async (req, res) => {
  const err = handleValidation(req, res)
  if (err) return
  const ok = await Doctors.delete(req.params.id)
  if (!ok) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})

// ── Services ─────────────────────────────────────────────────────────────────
const serviceValidators = validateBilingualFields(['name', 'description', 'tip'])

app.get('/api/services', async (req, res) => {
  res.json(await Services.list())
})

app.post('/api/services', requireAuth, writeLimiter, ...serviceValidators, async (req, res) => {
  const err = handleValidation(req, res)
  if (err) return
  const item = await Services.create(sanitizeBilingual(req.body))
  res.status(201).json(item)
})

app.put('/api/services/:id',
  requireAuth, writeLimiter,
  param('id').isUUID(),
  ...serviceValidators,
  async (req, res) => {
    const err = handleValidation(req, res)
    if (err) return
    const updated = await Services.update(req.params.id, sanitizeBilingual(req.body))
    if (!updated) return res.status(404).json({ error: 'Not found' })
    res.json(updated)
  }
)

app.delete('/api/services/:id', requireAuth, writeLimiter, param('id').isUUID(), async (req, res) => {
  const err = handleValidation(req, res)
  if (err) return
  const ok = await Services.delete(req.params.id)
  if (!ok) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})

// ── Content ───────────────────────────────────────────────────────────────────
const ALLOWED_SECTIONS = ['hero', 'about', 'faq', 'contact']

app.get('/api/content', async (req, res) => {
  res.json(await Content.get())
})

app.put('/api/content/:section',
  requireAuth, writeLimiter,
  param('section').isIn(ALLOWED_SECTIONS),
  async (req, res) => {
    const err = handleValidation(req, res)
    if (err) return
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Body must be an object' })
    }
    const updated = await Content.updateSection(req.params.section, req.body)
    res.json(updated)
  }
)

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.message)
  // Never leak stack traces in production
  res.status(500).json({ error: 'Internal server error' })
})

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`))
