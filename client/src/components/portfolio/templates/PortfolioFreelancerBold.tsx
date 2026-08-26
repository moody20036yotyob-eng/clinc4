import type { PortfolioData, PortfolioProject } from '@shared/types/portfolio';

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery', desc: 'Understanding your goals, audience, and requirements deeply.' },
  { num: '02', title: 'Design', desc: 'Crafting the visual language and user experience strategy.' },
  { num: '03', title: 'Build', desc: 'Developing with clean, scalable, maintainable code.' },
  { num: '04', title: 'Launch', desc: 'Testing, optimizing, and deploying for maximum impact.' },
];

export function PortfolioFreelancerBold({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const experience = data.experience || [];

  const yearsExp = experience.length > 0 ? Math.max(1, new Date().getFullYear() - Math.min(...experience.map(e => new Date(e.startDate || '2020').getFullYear()))) : null;

  return (
    <div style={{ background: '#fff', color: '#111', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Nav */}
      <nav style={{ padding: '1.5rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#fff', zIndex: 10, borderBottom: '1px solid #eee' }}>
        <span style={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.03em' }}>{p.name || 'Freelancer'}</span>
        {p.email && <a href={`mailto:${p.email}`} style={{ background: primary, color: '#fff', padding: '0.6rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}>Work With Me</a>}
      </nav>

      {/* Hero */}
      <section style={{ padding: '8rem 4rem', background: '#0a0a0a', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-5rem', right: '-5rem', width: '30rem', height: '30rem', borderRadius: '50%', background: primary, opacity: 0.08, filter: 'blur(80px)' }} />
        <p style={{ color: primary, fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Freelance {p.title || 'Professional'}</p>
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: '2.5rem' }}>
          I build<br />
          <span style={{ color: primary }}>{p.title || 'great things'}</span><br />
          for you.
        </h1>
        {p.bio && <p style={{ color: '#aaa', maxWidth: '40rem', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '3rem' }}>{p.bio}</p>}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {p.email && <a href={`mailto:${p.email}`} style={{ background: primary, color: '#fff', padding: '1rem 2.5rem', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 800, fontSize: '1rem' }}>Hire Me →</a>}
          <a href="#work" style={{ border: '1px solid #333', color: '#aaa', padding: '1rem 2.5rem', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>See Work</a>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '4rem', background: primary, color: '#fff', display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
        {[
          { val: `${projects.length}+`, label: 'Projects' },
          { val: yearsExp ? `${yearsExp}+` : '3+', label: 'Years Experience' },
          { val: '100%', label: 'Client Satisfaction' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{stat.val}</div>
            <div style={{ fontSize: '0.82rem', opacity: 0.8, marginTop: '0.4rem', letterSpacing: '0.05em' }}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Process */}
      <section style={{ padding: '6rem 4rem', background: '#f9fafb' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center', marginBottom: '4rem' }}>My Process</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          {PROCESS_STEPS.map(step => (
            <div key={step.num} style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', border: '1px solid #e5e7eb' }}>
              <div style={{ color: primary, fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>{step.num}</div>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{step.title}</h3>
              <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Work */}
      {projects.length > 0 && (
        <section id="work" style={{ padding: '6rem 4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '3rem' }}>Featured Work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
            {projects.slice(0, 6).map((proj: PortfolioProject, i) => (
              <div key={proj.id} style={{ borderRadius: '1rem', overflow: 'hidden', border: '1px solid #e5e7eb', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ height: '14rem', background: `hsl(${(i * 60) % 360}, 40%, 93%)` }}>
                  {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ padding: '1.75rem' }}>
                  <p style={{ color: primary, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{proj.category || 'Project'}</p>
                  <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{proj.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>{proj.description?.slice(0, 120)}{proj.description && proj.description.length > 120 ? '…' : ''}</p>
                  {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700 }}>View →</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: '7rem 4rem', textAlign: 'center', background: '#0a0a0a', color: '#fff' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>Let's build something <span style={{ color: primary }}>bold.</span></h2>
        {p.email && <a href={`mailto:${p.email}`} style={{ background: primary, color: '#fff', padding: '1rem 3rem', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 800, fontSize: '1rem', display: 'inline-block' }}>Get in Touch</a>}
      </section>
    </div>
  );
}
