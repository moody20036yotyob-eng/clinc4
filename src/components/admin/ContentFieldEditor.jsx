import { useState } from 'react'

const CAT_OPTIONS = ['general', 'treatment', 'payment', 'emergency', 'children']

function BilingualInput({ value, onChange, multiline, label }) {
  const v = value || { en: '', ar: '' }
  return (
    <div className="mb-3">
      {label && <p className="text-xs text-gray-500 mb-1">{label}</p>}
      <div className="grid grid-cols-2 gap-2">
        {['en', 'ar'].map(lng => (
          multiline ? (
            <textarea key={lng} rows={3}
              placeholder={lng === 'en' ? 'English' : 'عربي'}
              value={v[lng] || ''}
              onChange={e => onChange({ ...v, [lng]: e.target.value })}
              dir={lng === 'ar' ? 'rtl' : 'ltr'}
              className="w-full px-3 py-2 rounded-lg border text-sm outline-none resize-none"
              style={{ borderColor: 'var(--ivory-dark)' }} />
          ) : (
            <input key={lng} type="text"
              placeholder={lng === 'en' ? 'English' : 'عربي'}
              value={v[lng] || ''}
              onChange={e => onChange({ ...v, [lng]: e.target.value })}
              dir={lng === 'ar' ? 'rtl' : 'ltr'}
              className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
              style={{ borderColor: 'var(--ivory-dark)' }} />
          )
        ))}
      </div>
    </div>
  )
}

function isBilingual(val) {
  return val && typeof val === 'object' && !Array.isArray(val) && ('en' in val || 'ar' in val)
}

export function FieldEditor({ fieldKey, value, onChange, depth = 0 }) {
  // Hidden fields
  if (fieldKey === 'id') return null

  // Bilingual string
  if (isBilingual(value)) {
    const isLong = (value.en || '').length > 80 || (value.ar || '').length > 80
    return <BilingualInput value={value} onChange={onChange} multiline={isLong} label={fieldKey} />
  }

  // String
  if (typeof value === 'string') {
    return (
      <div className="mb-2">
        <label className="block text-xs text-gray-500 mb-1">{fieldKey}</label>
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
          style={{ borderColor: 'var(--ivory-dark)' }} />
      </div>
    )
  }

  // Category field for FAQ items
  if (fieldKey === 'cat' && typeof value === 'string') {
    return (
      <div className="mb-2">
        <label className="block text-xs text-gray-500 mb-1">Category</label>
        <select value={value} onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
          style={{ borderColor: 'var(--ivory-dark)' }}>
          {CAT_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    )
  }

  // Array
  if (Array.isArray(value)) {
    return (
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--forest)' }}>{fieldKey}</p>
        {value.map((item, i) => (
          <div key={i} className="mb-3 ps-4 border-s-2" style={{ borderColor: 'var(--ivory-dark)' }}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">Item {i + 1}</span>
              <button onClick={() => onChange(value.filter((_, j) => j !== i))}
                className="text-xs text-red-500 hover:text-red-700">Remove</button>
            </div>
            {typeof item === 'object' && !isBilingual(item)
              ? Object.entries(item).map(([k, v]) => (
                  <FieldEditor key={k} fieldKey={k} value={v} depth={depth + 1}
                    onChange={nv => {
                      const arr = [...value]
                      arr[i] = { ...item, [k]: nv }
                      onChange(arr)
                    }} />
                ))
              : <FieldEditor fieldKey={`${fieldKey}[${i}]`} value={item} depth={depth + 1}
                  onChange={nv => { const arr = [...value]; arr[i] = nv; onChange(arr) }} />
            }
          </div>
        ))}
        <button
          onClick={() => {
            const newItem = value.length > 0 && typeof value[0] === 'object' && !isBilingual(value[0])
              ? Object.fromEntries(Object.entries(value[0]).map(([k, v]) => [k, isBilingual(v) ? { en: '', ar: '' } : Array.isArray(v) ? [] : typeof v === 'string' ? '' : v]))
              : { en: '', ar: '' }
            onChange([...value, newItem])
          }}
          className="mt-1 text-xs px-3 py-1.5 rounded-full border"
          style={{ borderColor: 'var(--forest-light)', color: 'var(--forest)' }}>
          + Add Item
        </button>
      </div>
    )
  }

  // Object
  if (typeof value === 'object' && value !== null) {
    return (
      <div className="mb-3">
        {depth > 0 && <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--forest)' }}>{fieldKey}</p>}
        <div className={depth > 0 ? 'ps-4 border-s-2' : ''} style={{ borderColor: depth > 0 ? 'var(--ivory-dark)' : undefined }}>
          {Object.entries(value).map(([k, v]) => (
            <FieldEditor key={k} fieldKey={k} value={v} depth={depth + 1}
              onChange={nv => onChange({ ...value, [k]: nv })} />
          ))}
        </div>
      </div>
    )
  }

  return null
}

export default function ContentFieldEditor({ section, data, onUpdate }) {
  const [local, setLocal] = useState(data)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    await onUpdate(section, local)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <FieldEditor fieldKey={section} value={local} depth={0} onChange={setLocal} />
      <button onClick={handleSave}
        className="mt-4 px-6 py-2 rounded-full font-semibold text-white text-sm"
        style={{ background: saved ? 'var(--forest-light)' : 'var(--forest)' }}>
        {saved ? '✓ Saved' : 'Save Changes'}
      </button>
    </div>
  )
}
