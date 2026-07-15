import { useEffect } from 'react'

export default function SEO({ title, description, path = '', lang = 'en' }) {
  const siteName = '[Clinic Name]'
  const baseUrl = 'https://yourdomain.com'
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Dental Excellence`
  const fullUrl = `${baseUrl}${path}`

  useEffect(() => {
    // Title
    document.title = fullTitle

    const setMeta = (name, content, prop = false) => {
      const attr = prop ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // Standard
    setMeta('description', description)
    setMeta('robots', 'index, follow')
    setMeta('author', siteName)

    // Open Graph
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', description, true)
    setMeta('og:url', fullUrl, true)
    setMeta('og:type', 'website', true)
    setMeta('og:site_name', siteName, true)
    setMeta('og:locale', lang === 'ar' ? 'ar_SA' : 'en_US', true)
    setMeta('og:image', `${baseUrl}/og-image.jpg`, true)
    setMeta('og:image:width', '1200', true)
    setMeta('og:image:height', '630', true)

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', `${baseUrl}/og-image.jpg`)

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = fullUrl

    // lang/dir already handled by LanguageContext
  }, [fullTitle, description, fullUrl, lang])

  return null
}
