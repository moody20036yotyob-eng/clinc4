# Security Notes

## Before going live — checklist

- [ ] Change admin password in `server/auth.js` (replace the `bcrypt.hashSync` default)
- [ ] Set `JWT_SECRET` in `.env` to a long random string (32+ chars)
- [ ] Set `ALLOWED_ORIGINS` in `.env` to your real domain only
- [ ] Replace `yourdomain.com` in `src/components/SEO.jsx` and `StructuredData.jsx`
- [ ] Enable HTTPS (via reverse proxy like Nginx or a platform like Railway/Render)
- [ ] Remove or protect `/api/admin/*` behind a firewall or VPN if possible

## Security measures implemented

| Layer | Measure |
|---|---|
| HTTP headers | Helmet (14 headers: CSP, HSTS, X-Frame-Options, etc.) |
| CORS | Strict allowlist — only known origins accepted |
| Rate limiting | 200 req/15min globally; 10 login attempts/15min; 30 writes/min |
| Body size | JSON bodies capped at 50 KB |
| Input validation | express-validator on all routes (type, length, UUID checks) |
| XSS sanitisation | All bilingual string fields sanitised with `xss` library |
| Auth | bcrypt password hashing; JWT signed with HS256; 24h expiry |
| Error responses | Stack traces never exposed; generic 500 message in production |
| Section allowlist | Content section PUT accepts only: hero, about, faq, contact |
| Concurrency | Write mutex (withLock) prevents race conditions on JSON files |
