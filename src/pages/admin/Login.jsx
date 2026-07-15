import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../lib/api'
import t from '../../i18n/translations'
import { useLang } from '../../context/LanguageContext'

export default function AdminLogin() {
  const { lang } = useLang()
  const T = t[lang].admin
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.login(password)
      if (res.token) {
        localStorage.setItem('admin_token', res.token)
        navigate('/admin/dashboard')
      } else {
        setError(T.loginError)
      }
    } catch {
      setError(T.loginError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--ivory)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-display text-3xl font-light mb-2" style={{ color: 'var(--forest)' }}>
            {lang === 'ar' ? '[اسم العيادة]' : '[Clinic Name]'}
          </p>
          <h1 className="font-semibold text-xl" style={{ color: 'var(--text)' }}>{T.loginTitle}</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{T.loginSub}</p>
        </div>
        <form onSubmit={handleSubmit}
          className="rounded-2xl border p-8"
          style={{ background: 'white', borderColor: 'var(--ivory-dark)' }}>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>
            {T.passwordLabel}
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border outline-none mb-4"
            style={{ borderColor: 'var(--ivory-dark)' }}
            autoFocus
          />
          {error && <p className="text-sm mb-4 text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full font-semibold text-white disabled:opacity-60"
            style={{ background: 'var(--forest)' }}>
            {loading ? '…' : T.loginBtn}
          </button>
        </form>
      </div>
    </div>
  )
}
