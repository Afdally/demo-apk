import { useState } from 'react'
import '@/styles/reports.css'
import { MOCK_REPORTS } from '@/data/mockData'
import { Skel } from '@/components/ui/Skeleton'

const formatRp = (num) => 'Rp ' + Number(num).toLocaleString('id-ID')
const EXPENSE_CATEGORIES = ['Sewa', 'Listrik', 'Bahan', 'Peralatan', 'Pemasaran', 'Lainnya']

const MOCK_EXPENSES = [
  { id: 1, date: '01 Jun 2026', category: 'Sewa', description: 'Sewa studio bulan Juni', amount: 2500000, amount_fmt: 'Rp 2.500.000' },
  { id: 2, date: '05 Jun 2026', category: 'Listrik', description: 'Tagihan listrik Mei', amount: 450000, amount_fmt: 'Rp 450.000' },
  { id: 3, date: '12 Jun 2026', category: 'Peralatan', description: 'Beli lampu LED baru', amount: 350000, amount_fmt: 'Rp 350.000' },
]

const statusStyle = (status) => {
  if (status === 'Lunas') return { bg: 'rgba(34,197,94,0.15)', color: '#15803d' }
  if (status === 'Pending') return { bg: 'rgba(245,158,11,0.15)', color: '#b45309' }
  return { bg: 'rgba(239,68,68,0.15)', color: '#b91c1c' }
}

export default function Reports() {
  const [activeTab, setActiveTab] = useState('pemasukan')
  const [expenses, setExpenses] = useState(MOCK_EXPENSES)
  const [showModal, setShowModal] = useState(false)
  const [expForm, setExpForm] = useState({ expense_date: '', category: 'Sewa', description: '', amount: '' })

  const data = MOCK_REPORTS
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0)
  const byCategory = EXPENSE_CATEGORIES
    .map((cat) => ({ category: cat, total: expenses.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0) }))
    .filter((c) => c.total > 0)
    .map((c) => ({ ...c, total_fmt: formatRp(c.total) }))

  const handleSaveExpense = () => {
    if (!expForm.expense_date || !expForm.description || !expForm.amount) { alert('Semua field wajib diisi.'); return }
    const newExp = {
      id: Date.now(),
      date: new Date(expForm.expense_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      category: expForm.category,
      description: expForm.description,
      amount: Number(expForm.amount),
      amount_fmt: formatRp(expForm.amount),
    }
    setExpenses((prev) => [newExp, ...prev])
    setShowModal(false)
    setExpForm({ expense_date: '', category: 'Sewa', description: '', amount: '' })
  }

  const handleDeleteExpense = (id) => {
    if (!window.confirm('Hapus pengeluaran ini?')) return
    setExpenses((prev) => prev.filter((e) => e.id !== id))
  }

  const trend = (val) => {
    if (!val) return null
    return <span className={`stat-trend ${val >= 0 ? 'trend-up' : 'trend-down'}`}>{val >= 0 ? '↑' : '↓'} {Math.abs(val)}%</span>
  }

  const handleExport = () => {
    alert('Fitur export Excel tersedia di mode produksi dengan backend. Di demo ini, data ditampilkan langsung.')
  }

  return (
    <div className="reports-page">
      <div style={{ display: 'flex', gap: 8, marginBottom: 8, borderBottom: '1px solid var(--white-06)', paddingBottom: 16 }}>
        {['pemasukan', 'booking', 'pengeluaran'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 24px', borderRadius: 'var(--radius-pill)', background: activeTab === tab ? 'var(--text)' : 'transparent', color: activeTab === tab ? 'var(--primary)' : 'var(--text-60)', border: 'none', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>
            {tab === 'pemasukan' ? 'Pemasukan' : tab === 'booking' ? 'Pemesanan / Booking' : 'Pengeluaran'}
          </button>
        ))}
      </div>

      <div className="reports-filter-bar">
        <div className="filter-controls">
          <span className="stat-label">Periode Laporan</span>
          <input type="date" className="report-date-input" defaultValue="2026-06-01" />
          <span style={{ opacity: 0.3 }}>→</span>
          <input type="date" className="report-date-input" defaultValue={new Date().toISOString().split('T')[0]} />
        </div>
        <button className="export-btn" onClick={handleExport}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export Excel
        </button>
      </div>

      {activeTab === 'pemasukan' && (
        <>
          <div className="reports-stats-grid">
            <div className="report-stat-card">
              <span className="stat-label">Total Pemasukan</span>
              <div className="stat-main"><span className="stat-number">{formatRp(data.pemasukan.stats.total_revenue)}</span>{trend(data.pemasukan.stats.revenue_trend)}</div>
            </div>
            <div className="report-stat-card">
              <span className="stat-label">Total Booking Lunas</span>
              <div className="stat-main"><span className="stat-number">{data.pemasukan.stats.total_count}</span>{trend(data.pemasukan.stats.count_trend)}</div>
            </div>
            <div className="report-stat-card">
              <span className="stat-label">Avg. Nilai Booking</span>
              <div className="stat-main"><span className="stat-number">{formatRp(data.pemasukan.stats.avg_value)}</span></div>
            </div>
          </div>
          <div className="reports-main-layout">
            <div className="report-panel">
              <div className="panel-header"><h2 className="panel-title">Rincian Pemasukan</h2></div>
              <table className="report-table">
                <thead><tr><th>Tanggal</th><th>Pelanggan</th><th>Paket</th><th style={{ textAlign: 'right' }}>Jumlah</th></tr></thead>
                <tbody>
                  {data.pemasukan.financials.map((row) => (
                    <tr key={row.id}>
                      <td style={{ color: 'var(--text-45)' }}>{row.date}</td>
                      <td style={{ fontWeight: 600 }}>{row.customer}</td>
                      <td>{row.type}</td>
                      <td style={{ textAlign: 'right' }} className="amt-plus">{row.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="report-panel">
              <div className="panel-header"><h2 className="panel-title" style={{ fontSize: '18px' }}>Paket Terpopuler</h2></div>
              <div className="top-list">
                {data.pemasukan.popular_packages.map((pkg) => (
                  <div key={pkg.name} className="top-item">
                    <div className="item-info"><span className="item-name">{pkg.name}</span><span className="item-meta">{pkg.count} kali dipesan</span></div>
                    <span className="item-value">{pkg.revenue}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'booking' && (
        <>
          <div className="reports-stats-grid">
            {[
              { label: 'Total Booking', val: data.booking.stats.total, color: 'var(--text)' },
              { label: 'Selesai', val: data.booking.stats.done, color: '#22c55e', sub: `${data.booking.stats.done_pct}% dari total` },
              { label: 'Pending', val: data.booking.stats.pending, color: '#f59e0b', sub: `${data.booking.stats.pending_pct}% dari total` },
              { label: 'Dibatalkan', val: data.booking.stats.cancelled, color: '#ef4444', sub: `${data.booking.stats.cancel_pct}% dari total` },
            ].map(({ label, val, color, sub }) => (
              <div key={label} className="report-stat-card">
                <span className="stat-label">{label}</span>
                <div className="stat-main"><span className="stat-number" style={{ color }}>{val}</span></div>
                {sub && <span style={{ fontSize: '11px', color: 'var(--text-45)' }}>{sub}</span>}
              </div>
            ))}
          </div>
          <div className="reports-main-layout">
            <div className="report-panel">
              <div className="panel-header"><h2 className="panel-title">Daftar Pemesanan</h2></div>
              <table className="report-table">
                <thead><tr><th>Tanggal</th><th>Pelanggan</th><th>Paket</th><th>Status</th><th style={{ textAlign: 'right' }}>Jumlah</th></tr></thead>
                <tbody>
                  {data.booking.list.map((row) => {
                    const s = statusStyle(row.status)
                    return (
                      <tr key={row.id}>
                        <td style={{ color: 'var(--text-45)' }}>{row.date}</td>
                        <td style={{ fontWeight: 600 }}>{row.customer}</td>
                        <td>{row.type}</td>
                        <td><span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, backgroundColor: s.bg, color: s.color }}>{row.status}</span></td>
                        <td style={{ textAlign: 'right', color: row.status === 'Batal' ? 'var(--text-45)' : '#22c55e', fontWeight: 600 }}>{row.amount}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="report-panel">
              <div className="panel-header"><h2 className="panel-title" style={{ fontSize: '18px' }}>Booking per Paket</h2></div>
              <div className="top-list">
                {data.booking.by_package.map((pkg) => (
                  <div key={pkg.name} className="top-item">
                    <div className="item-info"><span className="item-name">{pkg.name}</span></div>
                    <span className="item-value">{pkg.count} <span style={{ fontSize: 11, color: 'var(--text-45)', fontWeight: 400 }}>booking</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'pengeluaran' && (
        <>
          <div className="reports-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="report-stat-card"><span className="stat-label">Total Pengeluaran</span><div className="stat-main"><span className="stat-number" style={{ color: '#ef4444' }}>{formatRp(totalExpense)}</span></div></div>
            <div className="report-stat-card"><span className="stat-label">Total Pemasukan</span><div className="stat-main"><span className="stat-number" style={{ color: '#22c55e' }}>{formatRp(data.pemasukan.stats.total_revenue)}</span></div></div>
            <div className="report-stat-card"><span className="stat-label">Laba Bersih</span><div className="stat-main"><span className="stat-number">{formatRp(Math.max(0, data.pemasukan.stats.total_revenue - totalExpense))}</span></div></div>
          </div>
          <div className="reports-main-layout">
            <div className="report-panel">
              <div className="panel-header">
                <h2 className="panel-title">Rincian Pengeluaran</h2>
                <button onClick={() => setShowModal(true)} style={{ padding: '8px 16px', background: 'var(--text)', color: 'var(--primary)', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>+ Catat Pengeluaran</button>
              </div>
              <table className="report-table">
                <thead><tr><th>Tanggal</th><th>Kategori</th><th>Keterangan</th><th style={{ textAlign: 'right' }}>Jumlah</th><th></th></tr></thead>
                <tbody>
                  {expenses.length === 0 ? (
                    <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-45)', fontStyle: 'italic' }}>Belum ada pengeluaran.</td></tr>
                  ) : expenses.map((row) => (
                    <tr key={row.id}>
                      <td style={{ color: 'var(--text-45)' }}>{row.date}</td>
                      <td><span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '11px', border: '1px solid var(--white-08)', background: 'var(--primary-mid)' }}>{row.category}</span></td>
                      <td style={{ fontWeight: 600 }}>{row.description}</td>
                      <td style={{ textAlign: 'right', color: '#ef4444', fontWeight: 600 }}>{row.amount_fmt}</td>
                      <td>
                        <button onClick={() => handleDeleteExpense(row.id)} style={{ background: 'none', border: 'none', color: 'var(--text-45)', cursor: 'pointer', padding: '4px' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="report-panel" style={{ background: 'var(--text)', color: 'var(--primary)' }}>
              <div className="panel-header"><h2 className="panel-title" style={{ fontSize: '18px', color: 'var(--primary)' }}>Ringkasan Laba Rugi</h2></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>Total Pemasukan</span>
                  <span style={{ color: '#22c55e', fontWeight: 600 }}>{formatRp(data.pemasukan.stats.total_revenue)}</span>
                </div>
                {byCategory.map((cat, i, arr) => (
                  <div key={cat.category} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none', paddingBottom: '8px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>{cat.category}</span>
                    <span style={{ fontWeight: 600 }}>-{cat.total_fmt}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>Laba Bersih</span>
                  <span style={{ fontSize: '18px', fontFamily: 'var(--font-display)' }}>
                    {formatRp(Math.max(0, data.pemasukan.stats.total_revenue - totalExpense))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {showModal && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
              <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '420px', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
                <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 600 }}>Catat Pengeluaran</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[{ label: 'Tanggal *', type: 'date', key: 'expense_date' }, { label: 'Keterangan *', type: 'text', key: 'description', placeholder: 'Sewa studio bulan Juni' }, { label: 'Jumlah (Rp) *', type: 'number', key: 'amount', placeholder: '3500000' }].map(({ label, type, key, placeholder }) => (
                    <div key={key}>
                      <label style={{ fontSize: '12px', color: 'var(--text-60)', display: 'block', marginBottom: '6px' }}>{label}</label>
                      <input type={type} placeholder={placeholder} value={expForm[key]} onChange={(e) => setExpForm((f) => ({ ...f, [key]: e.target.value }))} style={{ width: '100%', padding: '10px 12px', background: 'var(--primary-mid)', border: '1px solid var(--white-08)', borderRadius: '8px', color: 'var(--text)', fontSize: '14px' }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-60)', display: 'block', marginBottom: '6px' }}>Kategori *</label>
                    <select value={expForm.category} onChange={(e) => setExpForm((f) => ({ ...f, category: e.target.value }))} style={{ width: '100%', padding: '10px 12px', background: 'var(--primary-mid)', border: '1px solid var(--white-08)', borderRadius: '8px', color: 'var(--text)', fontSize: '14px' }}>
                      {EXPENSE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
                  <button onClick={() => setShowModal(false)} style={{ padding: '10px 16px', background: 'transparent', border: 'none', color: 'var(--text-60)', cursor: 'pointer', fontSize: '14px' }}>Batal</button>
                  <button onClick={handleSaveExpense} style={{ padding: '10px 20px', background: 'var(--text)', color: 'var(--primary)', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>Simpan</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
