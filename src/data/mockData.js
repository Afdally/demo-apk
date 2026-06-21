// ─── Mock Data untuk menggantikan backend API ───────────────────────────────
// Semua data statis, tidak perlu database/server

export const MOCK_PACKAGES = [
  {
    id: 1,
    title: 'Basic Solo',
    price: 150000,
    duration: 60,
    meta: '1 orang · 60 menit · 20+ foto',
    is_active: true,
    is_special: false,
    price_label: 'Rp 150.000',
    description: JSON.stringify([
      { text: '1 background pilihan' },
      { text: 'Cetak 2 foto 4R' },
      { text: 'Soft file semua hasil foto' },
      { text: 'Props dasar tersedia' },
    ]),
    features: ['1 background pilihan', 'Cetak 2 foto 4R', 'Soft file semua hasil foto', 'Props dasar tersedia'],
  },
  {
    id: 2,
    title: 'Couple Session',
    price: 250000,
    duration: 90,
    meta: '2 orang · 90 menit · 40+ foto',
    is_active: true,
    is_special: true,
    price_label: 'Rp 250.000',
    description: JSON.stringify([
      { text: '2 background pilihan' },
      { text: 'Cetak 4 foto 4R' },
      { text: 'Soft file semua hasil foto' },
      { text: 'Props lengkap & romantis' },
    ]),
    features: ['2 background pilihan', 'Cetak 4 foto 4R', 'Soft file semua hasil foto', 'Props lengkap & romantis'],
  },
  {
    id: 3,
    title: 'Family Pack',
    price: 400000,
    duration: 120,
    meta: 'Max 6 orang · 120 menit · 80+ foto',
    is_active: true,
    is_special: false,
    price_label: 'Rp 400.000',
    description: JSON.stringify([
      { text: '3 background pilihan' },
      { text: 'Cetak 8 foto 4R' },
      { text: 'Soft file semua hasil foto' },
      { text: 'Album digital eksklusif' },
    ]),
    features: ['3 background pilihan', 'Cetak 8 foto 4R', 'Soft file semua hasil foto', 'Album digital eksklusif'],
  },
]

export const MOCK_ADDONS = [
  {
    id: 1,
    name: 'Cetak foto tambahan',
    description: '4 lembar ukuran 4R',
    price: 50000,
    icon_name: 'print',
    is_active: true,
    label: '+Rp50rb',
  },
  {
    id: 2,
    name: 'Background extra',
    description: '1 background tambahan',
    price: 75000,
    icon_name: 'bg',
    is_active: true,
    label: '+Rp75rb',
  },
  {
    id: 3,
    name: 'Extra waktu',
    description: 'Tambah 30 menit sesi',
    price: 100000,
    icon_name: 'time',
    is_active: true,
    label: '+Rp100rb',
  },
  {
    id: 4,
    name: 'Makeup artist',
    description: 'Touch up profesional',
    price: 150000,
    icon_name: 'makeup',
    is_active: true,
    label: '+Rp150rb',
  },
]

export const MOCK_BOOKINGS = [
  { id: 1, booking_code: 'SB-2101-001', customer_name: 'Sari Rahayu', customer_phone: '6281234567890', customer_email: 'sari@email.com', package_name: 'Couple Session', booking_date: '2026-06-21', slot_time: '09:00 - 10:30', total_price: 325000, status: 'Lunas', notes: 'Minta background warna putih', created_at: '2026-06-18T10:00:00Z' },
  { id: 2, booking_code: 'SB-2101-002', customer_name: 'Budi Hartono', customer_phone: '6285678901234', customer_email: '', package_name: 'Family Pack', booking_date: '2026-06-21', slot_time: '11:00 - 13:00', total_price: 400000, status: 'Pending', notes: '', created_at: '2026-06-18T12:00:00Z' },
  { id: 3, booking_code: 'SB-2101-003', customer_name: 'Dewi Anggraini', customer_phone: '6287890123456', customer_email: 'dewi@email.com', package_name: 'Basic Solo', booking_date: '2026-06-21', slot_time: '14:00 - 15:00', total_price: 150000, status: 'Lunas', notes: '', created_at: '2026-06-19T09:00:00Z' },
  { id: 4, booking_code: 'SB-2101-004', customer_name: 'Rizky Pratama', customer_phone: '6281111222333', customer_email: '', package_name: 'Couple Session', booking_date: '2026-06-22', slot_time: '09:00 - 10:30', total_price: 250000, status: 'Pending', notes: 'Bawa baju ganti 3 set', created_at: '2026-06-19T14:00:00Z' },
  { id: 5, booking_code: 'SB-2101-005', customer_name: 'Eka Putri', customer_phone: '6282222333444', customer_email: 'eka@email.com', package_name: 'Basic Solo', booking_date: '2026-06-22', slot_time: '11:00 - 12:00', total_price: 300000, status: 'Lunas', notes: '', created_at: '2026-06-20T08:00:00Z' },
  { id: 6, booking_code: 'SB-2101-006', customer_name: 'Hendra Wijaya', customer_phone: '6283333444555', customer_email: '', package_name: 'Family Pack', booking_date: '2026-06-23', slot_time: '13:00 - 15:00', total_price: 500000, status: 'Batal', notes: '', created_at: '2026-06-20T10:00:00Z' },
  { id: 7, booking_code: 'SB-2101-007', customer_name: 'Maya Sari', customer_phone: '6284444555666', customer_email: 'maya@email.com', package_name: 'Couple Session', booking_date: '2026-06-24', slot_time: '09:00 - 10:30', total_price: 250000, status: 'Lunas', notes: '', created_at: '2026-06-20T15:00:00Z' },
  { id: 8, booking_code: 'SB-2101-008', customer_name: 'Fajar Nugroho', customer_phone: '6285555666777', customer_email: '', package_name: 'Basic Solo', booking_date: '2026-06-24', slot_time: '11:00 - 12:00', total_price: 150000, status: 'Pending', notes: 'Background warna hitam', created_at: '2026-06-21T07:00:00Z' },
]

export const MOCK_DASHBOARD = {
  stats: {
    today_revenue: 475000,
    revenue_trend: 12.5,
    total_bookings: 128,
    booking_trend: 8.3,
    pending_today: 2,
    done_today: 3,
  },
  chart: {
    weekly: [
      { label: 'Sen', income: 250 },
      { label: 'Sel', income: 400 },
      { label: 'Rab', income: 320 },
      { label: 'Kam', income: 480 },
      { label: 'Jum', income: 560 },
      { label: 'Sab', income: 720 },
      { label: 'Min', income: 380 },
    ],
    monthly: [
      { label: 'Mg1', income: 1800 },
      { label: 'Mg2', income: 2400 },
      { label: 'Mg3', income: 2100 },
      { label: 'Mg4', income: 2900 },
    ],
    yearly: [
      { label: 'Jan', income: 8200 },
      { label: 'Feb', income: 7400 },
      { label: 'Mar', income: 9600 },
      { label: 'Apr', income: 10200 },
      { label: 'Mei', income: 11400 },
      { label: 'Jun', income: 9800 },
    ],
  },
  today_schedule: [
    { id: 1, name: 'Sari Rahayu', package: 'Couple Session', slot_time: '09:00 - 10:30', status: 'Lunas' },
    { id: 2, name: 'Budi Hartono', package: 'Family Pack', slot_time: '11:00 - 13:00', status: 'Pending' },
    { id: 3, name: 'Dewi Anggraini', package: 'Basic Solo', slot_time: '14:00 - 15:00', status: 'Lunas' },
  ],
  recent_bookings: [
    { id: 8, name: 'Fajar Nugroho', date: '21 Jun 2026', package: 'Basic Solo', status: 'Pending' },
    { id: 7, name: 'Maya Sari', date: '20 Jun 2026', package: 'Couple Session', status: 'Lunas' },
    { id: 6, name: 'Hendra Wijaya', date: '20 Jun 2026', package: 'Family Pack', status: 'Batal' },
    { id: 5, name: 'Eka Putri', date: '20 Jun 2026', package: 'Basic Solo', status: 'Lunas' },
    { id: 4, name: 'Rizky Pratama', date: '19 Jun 2026', package: 'Couple Session', status: 'Pending' },
  ],
}

export const MOCK_REPORTS = {
  pemasukan: {
    stats: {
      total_revenue: 5875000,
      revenue_trend: 14,
      total_count: 23,
      count_trend: 8,
      avg_value: 255435,
    },
    financials: [
      { id: 1, date: '20 Jun 2026', customer: 'Maya Sari', type: 'Couple Session', amount: 'Rp 250.000' },
      { id: 2, date: '20 Jun 2026', customer: 'Eka Putri', type: 'Basic Solo + Extra Waktu', amount: 'Rp 300.000' },
      { id: 3, date: '19 Jun 2026', customer: 'Rizky Pratama', type: 'Couple Session', amount: 'Rp 250.000' },
      { id: 4, date: '19 Jun 2026', customer: 'Dewi Anggraini', type: 'Basic Solo', amount: 'Rp 150.000' },
      { id: 5, date: '18 Jun 2026', customer: 'Sari Rahayu', type: 'Couple Session + Print', amount: 'Rp 325.000' },
    ],
    popular_packages: [
      { name: 'Couple Session', count: 12, revenue: 'Rp 3.000.000' },
      { name: 'Family Pack', count: 6, revenue: 'Rp 2.400.000' },
      { name: 'Basic Solo', count: 5, revenue: 'Rp 750.000' },
    ],
  },
  booking: {
    stats: { total: 23, done: 16, done_pct: 70, pending: 5, pending_pct: 22, cancelled: 2, cancel_pct: 8 },
    list: [
      { id: 8, date: '21 Jun 2026', customer: 'Fajar Nugroho', type: 'Basic Solo', status: 'Pending', amount: 'Rp 150.000' },
      { id: 7, date: '20 Jun 2026', customer: 'Maya Sari', type: 'Couple Session', status: 'Lunas', amount: 'Rp 250.000' },
      { id: 6, date: '20 Jun 2026', customer: 'Hendra Wijaya', type: 'Family Pack', status: 'Batal', amount: 'Rp 500.000' },
      { id: 5, date: '20 Jun 2026', customer: 'Eka Putri', type: 'Basic Solo + Extra', status: 'Lunas', amount: 'Rp 300.000' },
    ],
    by_package: [
      { name: 'Couple Session', count: 12 },
      { name: 'Family Pack', count: 6 },
      { name: 'Basic Solo', count: 5 },
    ],
  },
}

export const MOCK_SETTINGS = {
  studio_name: 'Luminary Studio',
  studio_desc: 'Studio foto profesional di jantung kota, dengan peralatan modern dan tim fotografer berpengalaman.',
  contact_phone: '6281234567890',
  contact_email: 'hello@studiobook.id',
  contact_address: 'Jl. Sudirman No. 88, Jakarta Pusat, DKI Jakarta 10210',
  contact_ig: '@luminarystudio',
  payment_bank: 'BCA',
  payment_number: '1234567890',
  payment_name: 'Luminary Studio',
}

export const MOCK_SCHEDULE = {
  hours: [
    { day: 'Senin', start: '10:00', end: '22:00', duration: 60, active: true },
    { day: 'Selasa', start: '10:00', end: '22:00', duration: 60, active: true },
    { day: 'Rabu', start: '10:00', end: '22:00', duration: 60, active: true },
    { day: 'Kamis', start: '10:00', end: '22:00', duration: 60, active: true },
    { day: 'Jumat', start: '10:00', end: '22:00', duration: 60, active: true },
    { day: 'Sabtu', start: '08:00', end: '22:00', duration: 90, active: true },
    { day: 'Minggu', start: '08:00', end: '20:00', duration: 90, active: true },
  ],
  blocked: [
    { id: 1, date: '2026-07-04', timeRange: 'Seharian', desc: 'Private Event' },
    { id: 2, date: '2026-07-17', timeRange: '08:00 - 12:00', desc: 'Maintenance Peralatan' },
  ],
}
