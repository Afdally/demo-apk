import { useState } from 'react'
import '@/styles/packages.css'
import { MOCK_PACKAGES, MOCK_ADDONS } from '@/data/mockData'

const ICON_MAP = {
  print: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="6" y="2" width="12" height="10" rx="1"/><rect x="6" y="17" width="12" height="5" rx="1"/>
      <path d="M6 12H4a2 2 0 00-2 2v5h4v-5"/><path d="M18 12h2a2 2 0 012 2v5h-4v-5"/>
    </svg>
  ),
  bg: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9l4-4 4 4 4-4 4 4"/>
      <path d="M3 15l4 4 4-4 4 4 4-4"/>
    </svg>
  ),
  time: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
  ),
  makeup: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="5"/><path d="M12 13v8m-4-4h8"/>
    </svg>
  ),
  sparkles: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  ),
}

const formatRupiah = (num) => 'Rp ' + Number(num).toLocaleString('id-ID')

export default function ManagePackages() {
  const [activeTab, setActiveTab] = useState('paket')
  const [packages, setPackages] = useState(MOCK_PACKAGES)
  const [addons, setAddons] = useState(MOCK_ADDONS)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [features, setFeatures] = useState([{ text: '' }])
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({})

  const handleCreate = () => {
    setEditData(null)
    setFeatures([{ text: '' }])
    setFormData({})
    setShowForm(true)
  }

  const handleEdit = (data) => {
    setEditData(data)
    let parsed = [{ text: data.description || '' }]
    try {
      if (data.description?.trim().startsWith('[')) parsed = JSON.parse(data.description)
    } catch (e) {}
    setFeatures(parsed)
    setFormData({ ...data })
    setShowForm(true)
  }

  const handleDelete = (id, type) => {
    if (type === 'paket') setPackages((prev) => prev.filter((p) => p.id !== id))
    else setAddons((prev) => prev.filter((a) => a.id !== id))
    setDeleteConfirm(null)
  }

  const toggleStatus = (id, type) => {
    if (type === 'paket') setPackages((prev) => prev.map((p) => p.id === id ? { ...p, is_active: !p.is_active } : p))
    else setAddons((prev) => prev.map((a) => a.id === id ? { ...a, is_active: !a.is_active } : a))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    const fd = e.target

    if (activeTab === 'paket') {
      const newPkg = {
        id: editData?.id || Date.now(),
        title: fd.pkg_title.value,
        price: Number(fd.pkg_price.value),
        price_label: formatRupiah(fd.pkg_price.value),
        meta: [fd.pkg_orang?.value, fd.pkg_waktu?.value, fd.pkg_foto?.value].filter(Boolean).join(' · '),
        description: JSON.stringify(features),
        features: features.map(f => f.text).filter(Boolean),
        is_special: fd.pkg_special.checked,
        is_active: true,
        image_url: editData?.image_url || null,
      }
      if (editData) setPackages((prev) => prev.map((p) => p.id === editData.id ? newPkg : p))
      else setPackages((prev) => [...prev, newPkg])
    } else {
      const newAddon = {
        id: editData?.id || Date.now(),
        name: fd.addon_name.value,
        price: Number(fd.addon_price.value),
        description: fd.addon_desc.value,
        icon_name: fd.addon_icon.value,
        is_active: true,
      }
      if (editData) setAddons((prev) => prev.map((a) => a.id === editData.id ? newAddon : a))
      else setAddons((prev) => [...prev, newAddon])
    }

    setSaving(false)
    setShowForm(false)
    setEditData(null)
  }

  if (showForm) {
    return (
      <div className="packages-page">
        <div className="packages-header" style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600 }}>
            {editData ? 'Edit' : 'Tambah'} {activeTab === 'paket' ? 'Paket Foto' : 'Add-on'}
          </h2>
          <button
            className="admin-btn"
            style={{ width: 'auto', padding: '10px 20px', margin: 0, background: 'transparent', color: 'var(--text)', border: '1px solid var(--white-15)' }}
            onClick={() => { setShowForm(false); setEditData(null) }}
          >
            Batal
          </button>
        </div>

        <div className="bd-card" style={{ maxWidth: 800 }}>
          <form onSubmit={handleSave}>
            {activeTab === 'paket' ? (
              <>
                <div className="admin-form-group">
                  <label>Nama Paket</label>
                  <input name="pkg_title" type="text" className="admin-input" defaultValue={editData?.title || ''} required />
                </div>
                <div className="admin-form-group">
                  <label>Harga (angka saja)</label>
                  <input name="pkg_price" type="number" className="admin-input" defaultValue={editData?.price || ''} placeholder="150000" required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                  {['Jumlah Orang|pkg_orang|1 orang', 'Lama Sesi|pkg_waktu|60 min', 'Jumlah Foto|pkg_foto|60+ foto'].map((f) => {
                    const [label, name, placeholder] = f.split('|')
                    return (
                      <div key={name} className="admin-form-group" style={{ marginBottom: 0 }}>
                        <label>{label}</label>
                        <input name={name} type="text" className="admin-input" defaultValue={editData?.meta?.split(' · ')?.[['pkg_orang', 'pkg_waktu', 'pkg_foto'].indexOf(name)] || ''} placeholder={placeholder} />
                      </div>
                    )
                  })}
                </div>
                <div className="admin-form-group">
                  <label>Fitur / Keunggulan Paket</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {features.map((feature, index) => (
                      <div key={index} style={{ display: 'flex', gap: '8px' }}>
                        <textarea
                          className="admin-input" rows="2" style={{ resize: 'vertical', flex: 1 }}
                          placeholder="Penjelasan fitur..."
                          value={feature.text}
                          onChange={(e) => {
                            const updated = [...features]
                            updated[index].text = e.target.value
                            setFeatures(updated)
                          }}
                        />
                        {features.length > 1 && (
                          <button type="button" className="btn-delete" style={{ border: 'none', padding: '10px' }} onClick={() => setFeatures(features.filter((_, i) => i !== index))}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setFeatures([...features, { text: '' }])} style={{ marginTop: '12px', background: 'transparent', border: '1px dashed var(--white-15)', padding: '8px 16px', borderRadius: '8px', color: 'var(--text-60)', cursor: 'pointer', fontSize: '13px' }}>
                    + Tambah Fitur Baru
                  </button>
                </div>
                <div className="admin-form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <input name="pkg_special" type="checkbox" id="pkg_special" defaultChecked={editData?.is_special || false} style={{ width: 18, height: 18 }} />
                  <label htmlFor="pkg_special" style={{ marginBottom: 0 }}>Tandai sebagai Paket Spesial (★)</label>
                </div>
              </>
            ) : (
              <>
                <div className="admin-form-group"><label>Nama Add-on</label><input name="addon_name" type="text" className="admin-input" defaultValue={editData?.name || ''} required /></div>
                <div className="admin-form-group"><label>Harga</label><input name="addon_price" type="number" className="admin-input" defaultValue={editData?.price || ''} placeholder="50000" required /></div>
                <div className="admin-form-group"><label>Deskripsi</label><input name="addon_desc" type="text" className="admin-input" defaultValue={editData?.description || ''} placeholder="4 lembar ukuran 4R" /></div>
                <div className="admin-form-group">
                  <label>Icon</label>
                  <select name="addon_icon" className="admin-input" defaultValue={editData?.icon_name || 'sparkles'}>
                    <option value="print">Cetak (Printer)</option>
                    <option value="bg">Background</option>
                    <option value="time">Waktu</option>
                    <option value="makeup">Makeup</option>
                    <option value="sparkles">Lainnya</option>
                  </select>
                </div>
              </>
            )}
            <button type="submit" className="admin-btn" style={{ width: 'auto', padding: '12px 32px', marginTop: 16 }} disabled={saving}>
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="packages-page">
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="bd-card" style={{ maxWidth: 380, width: '100%', textAlign: 'center', padding: '32px' }}>
            <h3 style={{ marginBottom: 12 }}>Hapus {deleteConfirm.type === 'paket' ? 'Paket' : 'Add-on'}?</h3>
            <p style={{ color: 'var(--text-60)', fontSize: '14px', marginBottom: 24 }}>
              <b>"{deleteConfirm.label}"</b> akan dihapus permanen.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid var(--white-15)', borderRadius: 8, color: 'var(--text)', cursor: 'pointer' }}>Batal</button>
              <button onClick={() => handleDelete(deleteConfirm.id, deleteConfirm.type)} className="btn-delete" style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      <div className="packages-header">
        <div className="tab-switcher">
          <button className={`tab-btn ${activeTab === 'paket' ? 'active' : ''}`} onClick={() => setActiveTab('paket')}>Paket foto</button>
          <button className={`tab-btn ${activeTab === 'addon' ? 'active' : ''}`} onClick={() => setActiveTab('addon')}>Add-on</button>
        </div>
        <button className="admin-btn" style={{ width: 'auto', padding: '10px 20px', margin: 0 }} onClick={handleCreate}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 8 }}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Tambah
        </button>
      </div>

      {activeTab === 'paket' ? (
        <div className="packages-grid">
          {packages.map((pkg) => (
            <div key={pkg.id} className="package-card">
              <div className="package-image-wrapper">
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #0D1B2A, #1D3557)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="48" height="48" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                </div>
              </div>
              <div className="package-details">
                <div className="card-top-header">
                  <h3 className="package-title">{pkg.title}{pkg.is_special && <span>★</span>}</h3>
                  <label className={`toggle-wrapper ${!pkg.is_active ? 'inactive' : ''}`}>
                    <span>{pkg.is_active ? 'Aktif' : 'Nonaktif'}</span>
                    <div className="switch">
                      <input type="checkbox" checked={pkg.is_active} onChange={() => toggleStatus(pkg.id, 'paket')} />
                      <span className="slider" />
                    </div>
                  </label>
                </div>
                <p className="package-meta">{pkg.meta}</p>
                <p className="package-desc">
                  {(() => {
                    try { const p = JSON.parse(pkg.description); if (Array.isArray(p)) return p.map(f => f.text).join(' · ') } catch(e) {}
                    return pkg.description
                  })()}
                </p>
                <hr className="package-divider" />
                <div className="card-footer">
                  <span className="package-price">{pkg.price_label}</span>
                  <div className="action-btns">
                    <button className="btn-edit" onClick={() => handleEdit(pkg)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => setDeleteConfirm({ id: pkg.id, label: pkg.title, type: 'paket' })}>Hapus</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="packages-grid">
          {addons.map((addon) => (
            <div key={addon.id} className="package-card addon-card">
              <div className="addon-icon-wrapper">{ICON_MAP[addon.icon_name] || ICON_MAP.sparkles}</div>
              <div className="package-details">
                <div className="card-top-header">
                  <h3 className="package-title">{addon.name}</h3>
                  <label className={`toggle-wrapper ${!addon.is_active ? 'inactive' : ''}`}>
                    <span>{addon.is_active ? 'Aktif' : 'Nonaktif'}</span>
                    <div className="switch">
                      <input type="checkbox" checked={addon.is_active} onChange={() => toggleStatus(addon.id, 'addon')} />
                      <span className="slider" />
                    </div>
                  </label>
                </div>
                <p className="package-desc">{addon.description}</p>
                <hr className="package-divider" />
                <div className="card-footer">
                  <span className="package-price">{formatRupiah(addon.price)}</span>
                  <div className="action-btns">
                    <button className="btn-edit" onClick={() => handleEdit(addon)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => setDeleteConfirm({ id: addon.id, label: addon.name, type: 'addon' })}>Hapus</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
