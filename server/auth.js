import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const SECRET = process.env.JWT_SECRET || 'dental-cms-secret-change-in-prod'
// Default password hash for "change-me-before-launch"
const PASSWORD_HASH = bcrypt.hashSync('change-me-before-launch', 10)

export function verifyPassword(password) {
  return bcrypt.compareSync(password, PASSWORD_HASH)
}

export function signToken() {
  return jwt.sign({ admin: true }, SECRET, { expiresIn: '24h' })
}

export function requireAuth(req, res, next) {
  const header = req.headers['authorization'] || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  try {
    jwt.verify(token, SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
