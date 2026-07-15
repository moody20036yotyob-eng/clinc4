import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../lib/api'
import DoctorForm from '../../components/admin/DoctorForm'
import ServiceForm from '../../components/admin/ServiceForm'
import ContentFieldEditor from '../../components/admin/ContentFieldEditor'

const TABS = ['Doctors', 'Services', 'Page Content']

export default function Dashboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)
  const [doctors, setDoctors] = useState([])
  const [services, setServices] = useState([])
  const [content, setContent] = useState(null)
  const [editingDoc, setEditingDoc] = useState(null)
  const [editingSvc, setEditingSvc] = useState(null)
  const [addingDoc, setAddingDoc] = useState(false)
  const [addingSvc, setAddingSvc] = useState(false)
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) { navigate('/admin/login'); return }
    loadAll()
  }, [])

  const loadAll = () => {
    api.getDoctors().then(d => setDoctors(d || []))
    api.getServices().then(s => setServices(s || []))
    api.getContent().then(c => setContent(c || {}))
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin/login')
  }

  // Doctors
  const saveDoctor = async (data) => {
    if (editingDoc) {
      await api.updateDoctor(editingDoc.id, data)
    } else {
      await api.createDoctor(data)
    }
    setEditingDoc(null); setAddingDoc(false)
    api.getDoctors().then(d => setDoctors(d || []))
  }
  const deleteDoctor = async (id) => {
    if (!confirm('Delete this doctor?')) return
    await api.deleteDoctor(id)
    api.getDoctors().then(d => setDoctors(d || []))
  }

  // Services
  const saveService = async (data) => {
    if (editingSvc) {
      await api.updateService(editingSvc.id, data)
    } else {
      await api.createService(data)
    }
    setEditingSvc(null); setAddingSvc(false)
    api.getServices().then(s => setServices(s || []))
  }
  const deleteService = async (id) => {
    if (!confirm('Delete this service?')) return
    await api.deleteService(id)
    api.getServices().then(s => setServices(s || []))
  }

  // Content
  const updateContent = async (section, data) => {
    await api.updateContent(section, data)
    api.getContent().then(c => setContent(c || {}))
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--ivory)' }}>
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b" style={{ background: 'var(--forest)', borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <p className="font-display text-lg font-light text-white">CMS Dashboard</p>
          <button onClick={logout} className="text-white/60 hover:text-white text-sm">Logout</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tab bar */}
        <div className="flex gap-2 mb-8">
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-colors"
              style={{
                background: tab === i ? 'var(--forest)' : 'white',
                color: tab === i ? 'white' : 'var(--muted)',
                border: `1px solid ${tab === i ? 'var(--forest)' : 'var(--ivory-dark)'}`,
              }}>
              {t}
            </button>
          ))}
        </div>

        {/* Doctors tab */}
        {tab === 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg" style={{ color: 'var(--forest)' }}>Doctors ({doctors.length})</h2>
              <button onClick={() => { setAddingDoc(true); setEditingDoc(null) }}
                className="px-4 py-2 rounded-full text-sm font-semibold text-white"
                style={{ background: 'var(--gold)' }}>
                + Add Doctor
              </button>
            </div>
            {(addingDoc || editingDoc) && (
              <div className="mb-6">
                <DoctorForm
                  initial={editingDoc}
                  onSave={saveDoctor}
                  onCancel={() => { setAddingDoc(false); setEditingDoc(null) }}
                />
              </div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {doctors.map(doc => (
                <div key={doc.id} className="rounded-xl border p-4" style={{ background: 'white', borderColor: 'var(--ivory-dark)' }}>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--gold)' }}>
                    {doc.specialty?.en}
                  </p>
                  <p className="font-semibold" style={{ color: 'var(--text)' }}>{doc.name?.en}</p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>{doc.credentials?.en}</p>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => { setEditingDoc(doc); setAddingDoc(false) }}
                      className="text-xs px-3 py-1.5 rounded-full border"
                      style={{ borderColor: 'var(--forest-light)', color: 'var(--forest)' }}>Edit</button>
                    <button onClick={() => deleteDoctor(doc.id)}
                      className="text-xs px-3 py-1.5 rounded-full border border-red-200 text-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services tab */}
        {tab === 1 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg" style={{ color: 'var(--forest)' }}>Services ({services.length})</h2>
              <button onClick={() => { setAddingSvc(true); setEditingSvc(null) }}
                className="px-4 py-2 rounded-full text-sm font-semibold text-white"
                style={{ background: 'var(--gold)' }}>
                + Add Service
              </button>
            </div>
            {(addingSvc || editingSvc) && (
              <div className="mb-6">
                <ServiceForm
                  initial={editingSvc}
                  onSave={saveService}
                  onCancel={() => { setAddingSvc(false); setEditingSvc(null) }}
                />
              </div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map(svc => (
                <div key={svc.id} className="rounded-xl border p-4" style={{ background: 'white', borderColor: 'var(--ivory-dark)' }}>
                  <span className="text-2xl block mb-2">{svc.icon}</span>
                  <p className="font-semibold" style={{ color: 'var(--text)' }}>{svc.name?.en}</p>
                  <p className="text-sm line-clamp-2" style={{ color: 'var(--muted)' }}>{svc.description?.en}</p>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => { setEditingSvc(svc); setAddingSvc(false) }}
                      className="text-xs px-3 py-1.5 rounded-full border"
                      style={{ borderColor: 'var(--forest-light)', color: 'var(--forest)' }}>Edit</button>
                    <button onClick={() => deleteService(svc.id)}
                      className="text-xs px-3 py-1.5 rounded-full border border-red-200 text-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content tab */}
        {tab === 2 && content && (
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Section list */}
            <div className="lg:col-span-1">
              <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>Sections</p>
              {Object.keys(content).map(sec => (
                <button key={sec} onClick={() => setActiveSection(sec)}
                  className="w-full text-start px-4 py-2.5 rounded-xl mb-1 text-sm transition-colors"
                  style={{
                    background: activeSection === sec ? 'var(--forest)' : 'white',
                    color: activeSection === sec ? 'white' : 'var(--text)',
                    border: `1px solid ${activeSection === sec ? 'var(--forest)' : 'var(--ivory-dark)'}`,
                  }}>
                  {sec}
                </button>
              ))}
            </div>

            {/* Editor */}
            <div className="lg:col-span-3">
              {activeSection && content[activeSection] !== undefined ? (
                <div className="rounded-2xl border p-6" style={{ background: 'white', borderColor: 'var(--ivory-dark)' }}>
                  <h3 className="font-semibold text-lg mb-6 capitalize" style={{ color: 'var(--forest)' }}>
                    Edit: {activeSection}
                  </h3>
                  <ContentFieldEditor
                    key={activeSection}
                    section={activeSection}
                    data={content[activeSection]}
                    onUpdate={updateContent}
                  />
                </div>
              ) : (
                <div className="rounded-2xl border p-12 text-center" style={{ background: 'white', borderColor: 'var(--ivory-dark)' }}>
                  <p style={{ color: 'var(--muted)' }}>Select a section to edit</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
