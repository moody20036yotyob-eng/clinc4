import { useState } from 'react'

const ICONS = ['🦷','🔬','😁','🩺','💉','🧴','✨','🔧','🌿','🧪','💎','🪥']

const empty = () => ({
  icon: '🦷',
  name: { en: '', ar: '' },
  description: { en: '', ar: '' },
  tip: { en: '', ar: '' },
})

export default function ServiceForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || empty())

  const set = (field, lang, val) =>
    setForm(f => ({ ...f, [field]: { ...f[field], [lang]: val } }))

  return (
    <div className="rounded-2xl border p-6" style={{ background: 'white', borderColor: 'var(--ivory-dark)' }}>
      {/* Icon selector */}
      <div className="mb-5">
        <p className="text-xs uppercase tracking-wider mb-2 font-semibold" style={{ color: 'var(--forest)' }}>Icon</p>
        <div className="flex flex-wrap gap-2">
          {ICONS.map(ic => (
            <button key={ic} onClick={() => setForm(f => ({ ...f, icon: ic }))}
              className="w-10 h-10 text-xl rounded-lg border transition-colors"
              style={{
                background: form.icon === ic ? 'var(--mint)' : 'white',
                borderColor: form.icon === ic ? 'var(--forest-light)' : 'var(--ivory-dark)'
              }}>
              {ic}
            </button>
          ))}
        </div>
      </div>

      {[
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description', multiline: true },
        { key: 'tip', label: '"Did You Know?" Tip', multiline: true },
      ].map(f => (
        <div key={f.key} className="mb-5">
          <p className="text-xs uppercase tracking-wider mb-2 font-semibold" style={{ color: 'var(--forest)' }}>{f.label}</p>
          <div className="grid grid-cols-2 gap-3">
            {['en', 'ar'].map(lng => (
              f.multiline ? (
                <textarea key={lng} rows={3}
                  placeholder={lng === 'en' ? 'English' : 'عربي'}
                  value={form[f.key][lng]}
                  onChange={e => set(f.key, lng, e.target.value)}
                  dir={lng === 'ar' ? 'rtl' : 'ltr'}
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none resize-none"
                  style={{ borderColor: 'var(--ivory-dark)' }} />
              ) : (
                <input key={lng} type="text"
                  placeholder={lng === 'en' ? 'English' : 'عربي'}
                  value={form[f.key][lng]}
                  onChange={e => set(f.key, lng, e.target.value)}
                  dir={lng === 'ar' ? 'rtl' : 'ltr'}
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                  style={{ borderColor: 'var(--ivory-dark)' }} />
              )
            ))}
          </div>
        </div>
      ))}

      <div className="flex gap-3 mt-6">
        <button onClick={() => onSave(form)}
          className="px-6 py-2 rounded-full font-semibold text-white text-sm"
          style={{ background: 'var(--forest)' }}>
          Save
        </button>
        <button onClick={onCancel}
          className="px-6 py-2 rounded-full text-sm border"
          style={{ borderColor: 'var(--ivory-dark)', color: 'var(--muted)' }}>
          Cancel
        </button>
      </div>
    </div>
  )
}
