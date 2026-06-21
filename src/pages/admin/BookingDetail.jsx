import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '@/styles/admin.css'
import { MOCK_BOOKINGS, MOCK_SETTINGS } from '@/data/mockData'
import { Skel } from '@/components/ui/Skeleton'

const formatRp = (n) => 'Rp ' + Number(n).toLocaleString('id-ID')

const statusClasses = { Lunas: 'lunas', Pending: 'pending', Batal: 'batal' }
const statusColors = {
  Lunas: 'rgba(34,197,94,0.15)',
  Pending: 'rgba(245,158,11,0.15)',
  Batal: 'rgba(239,68,68,0.1)',
}
const statusTextColors = {
  Lunas: '#15803d',
  Pending: '#b45309',
  Batal: '#b91c1c',
}

export default function BookingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [adminNotes, setAdminNotes] = useState('')
  const [saving, setSaving] = useState(false)

  const settings = MOCK_SETTINGS

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = MOCK_BOOKINGS.find((b) => b.id === parseInt(id))
      if (found) {
        setBooking(found)
        setStatus(found.status)
        setAdminNotes(found.notes || '')
      }
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [id])

  const handleSave = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    setBooking((prev) => ({ ...prev, status, notes: adminNotes }))
    setSaving(false)
    alert('Perubahan berhasil disimpan (mode demo)')
  }

  const waMsg = () => {
    if (!booking) return ''
    const total = formatRp(booking.total_price)
    return encodeURIComponent(
      `Halo ${booking.customer_name} 👋\n\nBooking kamu sudah kami konfirmasi!\n\n📋 Detail:\n• Kode: ${booking.booking_code}\n• Paket: ${booking.package_name}\n• Tanggal: ${booking.booking_date}\n• Slot: ${booking.slot_time}\n• Total: ${total}\n\n💰 Silakan transfer ke:\n🏦 ${settings.payment_bank}: ${settings.payment_number}\n👤 a.n: ${settings.payment_name}\n\nKirimkan bukti transfer. Terima kasih! 🙏`
    )
  }

  if (loading) {
    return (
      <div className="booking-detail-layout">
        {[1, 2].map((i) => (
          <div key={i} className="bd-card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Skel w="40%" h={16} />
              {[...Array(5)].map((_, j) => <Skel key={j} w={`${60 + j * 8}%`} h={14} />)}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!booking) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-45)' }}>
        <h3>Booking tidak ditemukan</h3>
        <button className="admin-btn" style={{ width: 'auto', padding: '10px 24px', marginTop: '20px' }} onClick={() => navigate('/admin/bookings')}>
          Kembali ke Daftar
        </button>
      </div>
    )
  }

  return (
    <>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => navigate('/admin/bookings')}
          style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--white-15)', borderRadius: '8px', color: 'var(--text)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}
        >
          ← Kembali
        </button>
      </div>

      <div className="booking-detail-layout">
        {/* LEFT COLUMN */}
        <div>
          <div className="bd-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-45)', marginBottom: '6px' }}>Kode Booking</p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', letterSpacing: '-0.5px' }}>
                  {booking.booking_code}
                </h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    padding: '6px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.5px',
                    background: statusColors[status] || 'rgba(0,0,0,0.05)',
                    color: statusTextColors[status] || 'var(--text)',
                  }}
                >
                  {status}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {[
                { label: 'Nama Customer', value: booking.customer_name },
                { label: 'Nomor WhatsApp', value: booking.customer_phone },
                { label: 'Email', value: booking.customer_email || '—' },
                { label: 'Paket', value: booking.package_name },
                { label: 'Tanggal', value: new Date(booking.booking_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
                { label: 'Slot Waktu', value: booking.slot_time },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontSize: '11px', color: 'var(--text-45)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</p>
                  <p style={{ fontWeight: 600 }}>{value}</p>
                </div>
              ))}
            </div>

            <div style={{ margin: '24px 0', height: '1px', background: 'var(--white-06)' }} />

            <div>
              <p style={{ fontSize: '12px', color: 'var(--text-45)', marginBottom: '8px' }}>Catatan Customer</p>
              <p style={{ padding: '12px 16px', background: 'var(--primary-mid)', borderRadius: '8px', fontSize: '14px', fontStyle: booking.notes ? 'normal' : 'italic', color: booking.notes ? 'var(--text)' : 'var(--text-45)' }}>
                {booking.notes || 'Tidak ada catatan'}
              </p>
            </div>
          </div>

          <div className="bd-card">
            <h3 style={{ fontWeight: 600, marginBottom: '16px' }}>Pesan WhatsApp ke Customer</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-45)', marginBottom: '12px' }}>
              Klik tombol di bawah untuk membuka WA dengan pesan yang sudah terisi otomatis.
            </p>
            <a
              href={`https://wa.me/${booking.customer_phone}?text=${waMsg()}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px',
                background: '#25D366', color: 'white', borderRadius: '8px', fontSize: '14px',
                fontWeight: 500, textDecoration: 'none', transition: 'opacity 0.2s',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Buka WhatsApp
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          <div className="bd-card">
            <h3 style={{ fontWeight: 600, marginBottom: '16px' }}>Kelola Status</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {['Pending', 'Lunas', 'Batal'].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: '8px', border: `1px solid ${status === s ? 'var(--text)' : 'var(--white-15)'}`,
                    background: status === s ? 'var(--text)' : 'transparent', color: status === s ? 'var(--primary)' : 'var(--text)',
                    cursor: 'pointer', fontWeight: 500, textAlign: 'left', fontSize: '14px', transition: 'all 0.2s'
                  }}
                >
                  {status === s && '✓ '}{s}
                </button>
              ))}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-60)', display: 'block', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Catatan Admin
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="admin-input"
                rows={3}
                style={{ resize: 'vertical' }}
                placeholder="Tambahkan catatan internal..."
              />
            </div>

            <button
              className="admin-btn"
              style={{ margin: 0, width: '100%' }}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>

          <div className="bd-card">
            <h3 style={{ fontWeight: 600, marginBottom: '16px' }}>Ringkasan Pembayaran</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--white-06)' }}>
              <span style={{ color: 'var(--text-60)' }}>{booking.package_name}</span>
              <span style={{ fontWeight: 600 }}>{formatRp(booking.total_price)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0' }}>
              <span style={{ fontWeight: 600 }}>Total</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px' }}>{formatRp(booking.total_price)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
