import { useEffect } from 'react'

// Injects JSON-LD structured data into <head>
export function LocalBusinessSchema() {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Dentist',
      name: '[Clinic Name]',
      url: 'https://yourdomain.com',
      logo: 'https://yourdomain.com/logo.png',
      image: 'https://yourdomain.com/og-image.jpg',
      description: 'Award-winning dental clinic offering comprehensive dental care including implants, orthodontics, cosmetic dentistry, and more.',
      telephone: '+966500000000',
      email: 'hello@clinicdemo.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Health Street, Medical District',
        addressLocality: 'Riyadh',
        postalCode: '12345',
        addressCountry: 'SA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 24.7136,
        longitude: 46.6753,
      },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday','Sunday','Monday','Tuesday','Wednesday'], opens: '09:00', closes: '21:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Thursday'], opens: '09:00', closes: '18:00' },
      ],
      priceRange: '$$',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1200',
        bestRating: '5',
      },
      sameAs: [
        'https://instagram.com/clinicdemo',
        'https://twitter.com/clinicdemo',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Dental Services',
        itemListElement: [
          'Smile Makeover', 'Dental Implants', 'Teeth Whitening',
          'Invisalign', 'Porcelain Veneers', 'Gum Treatment',
          'Root Canal', 'Children\'s Dentistry',
        ].map(name => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
      },
    }

    const id = 'ld-local-business'
    let el = document.getElementById(id)
    if (!el) {
      el = document.createElement('script')
      el.id = id
      el.type = 'application/ld+json'
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(schema)

    return () => { const e = document.getElementById(id); if (e) e.remove() }
  }, [])

  return null
}

export function FAQSchema({ items }) {
  useEffect(() => {
    if (!items?.length) return
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map(item => ({
        '@type': 'Question',
        name: item.q?.en || '',
        acceptedAnswer: { '@type': 'Answer', text: item.a?.en || '' },
      })),
    }
    const id = 'ld-faq'
    let el = document.getElementById(id)
    if (!el) { el = document.createElement('script'); el.id = id; el.type = 'application/ld+json'; document.head.appendChild(el) }
    el.textContent = JSON.stringify(schema)
    return () => { const e = document.getElementById(id); if (e) e.remove() }
  }, [items])

  return null
}

export function BreadcrumbSchema({ crumbs }) {
  useEffect(() => {
    if (!crumbs?.length) return
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: `https://yourdomain.com${c.path}`,
      })),
    }
    const id = 'ld-breadcrumb'
    let el = document.getElementById(id)
    if (!el) { el = document.createElement('script'); el.id = id; el.type = 'application/ld+json'; document.head.appendChild(el) }
    el.textContent = JSON.stringify(schema)
    return () => { const e = document.getElementById(id); if (e) e.remove() }
  }, [crumbs])

  return null
}
