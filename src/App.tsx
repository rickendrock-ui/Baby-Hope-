import React, { useState } from 'react';
import {
  Baby,
  BookOpen,
  LayoutDashboard,
  HeartPulse,
  Calendar,
  Utensils,
  Star,
  Menu,
  X,
  CheckCircle2,
  Sparkles,
  Plus,
  Trash2,
  Check,
  Award,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import BalitaStimulasi from './components/BalitaStimulasi';

export function App() {
  // ==========================================
  // STATE NAVIGASI & RIWAYAT (HISTORY STACK)
  // ==========================================
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['dashboard']);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Fungsi Navigasi Maju (Menyimpan Riwayat Menu)
  const handleNavigate = (targetMenu: string) => {
    if (targetMenu !== activeMenu) {
      setNavigationHistory((prevHistory) => [...prevHistory, targetMenu]);
      setActiveMenu(targetMenu);
    }
    setIsSidebarOpen(false);
  };

  // Fungsi Tombol Kembali (Kembali ke Menu Sebelumnya)
  const handleGoBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Hapus halaman saat ini dari stack
      const previousMenu = newHistory[newHistory.length - 1]; // Ambil menu sebelumnya
      
      setNavigationHistory(newHistory);
      setActiveMenu(previousMenu);
    } else {
      setActiveMenu('dashboard');
    }
  };

  // ==========================================
  // STATE CATATAN & STATUS PERTUMBUHAN
  // ==========================================
  const [growthLogs, setGrowthLogs] = useState([
    { id: 1, date: '2026-08-01', ageMonths: 24, weight: 12.2, height: 87.5, headCirc: 48 },
    { id: 2, date: '2026-06-01', ageMonths: 22, weight: 11.8, height: 85.0, headCirc: 47.5 },
  ]);
  const [newLog, setNewLog] = useState({ ageMonths: '', weight: '', height: '', headCirc: '' });

  const handleAddGrowthLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.ageMonths || !newLog.weight || !newLog.height) return;
    const log = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      ageMonths: Number(newLog.ageMonths),
      weight: Number(newLog.weight),
      height: Number(newLog.height),
      headCirc: Number(newLog.headCirc) || 0
    };
    setGrowthLogs([log, ...growthLogs]);
    setNewLog({ ageMonths: '', weight: '', height: '', headCirc: '' });
  };

  const handleDeleteGrowthLog = (id: number) => {
    setGrowthLogs(growthLogs.filter(item => item.id !== id));
  };

  const latestLog = growthLogs[0];
  const getGrowthStatus = (weight: number) => {
    if (weight < 9) return { status: 'Gizi Kurang', color: 'bg-amber-100 text-amber-800' };
    if (weight > 16) return { status: 'Risiko Lebih', color: 'bg-rose-100 text-rose-800' };
    return { status: 'Ideal (Standar WHO)', color: 'bg-emerald-100 text-emerald-800' };
  };

  // ==========================================
  // STATE JADWAL & STATUS IMUNISASI
  // ==========================================
  const [vaccines, setVaccines] = useState([
    { id: 1, name: 'Hepatitis B (HB-0)', age: '0 Bulan', done: true },
    { id: 2, name: 'BCG & Polio 1', age: '1 Bulan', done: true },
    { id: 3, name: 'DPT-HB-Hib 1 & Polio 2', age: '2 Bulan', done: true },
    { id: 4, name: 'DPT-HB-Hib 2 & Polio 3', age: '3 Bulan', done: true },
    { id: 5, name: 'DPT-HB-Hib 3 & Polio 4', age: '4 Bulan', done: true },
    { id: 6, name: 'Campak / MR (Lanjutan 1)', age: '9 Bulan', done: true },
    { id: 7, name: 'PCV & Rotavirus Booster', age: '12 Bulan', done: true },
    { id: 8, name: 'Campak / MR (Booster)', age: '18 Bulan', done: true },
    { id: 9, name: 'DPT-HB-Hib Booster', age: '18 Bulan', done: false },
  ]);

  const toggleVaccine = (id: number) => {
    setVaccines(vaccines.map(v => v.id === id ? { ...v, done: !v.done } : v));
  };

  const campakStatus = vaccines.filter(v => v.name.includes('Campak') && v.done).length >= 2;

  // ==========================================
  // STATE MPASI & NUTRISI
  // ==========================================
  const [mpasiCategory, setMpasiCategory] = useState<'6-8' | '9-11' | '12-24'>('6-8');

  const mpasiData = {
    '6-8': {
      texture: 'Saring Halus / Lumat (Puree & Bubur Lembut)',
      frequency: '2–3 kali makan besar + 1–2 kali selingan per hari',
      recipes: [
        { name: 'Puree Daging Sapi & Kabocha', ingredients: 'Daging sapi giling, labu kuning/kabocha, minyak kelapa', benefit: 'Kaya zat besi & protein untuk cegah stunting' },
        { name: 'Bubur Tim Hati Ayam & Bayam', ingredients: 'Hati ayam kampung, beras putih, daun bayam halus', benefit: 'Tinggi zat besi dan Vit A' }
      ]
    },
    '9-11': {
      texture: 'Cincang Halus / Lembek (Mashed & Finger Food)',
      frequency: '3–4 kali makan besar + 1–2 kali selingan per hari',
      recipes: [
        { name: 'Nasi Tim Salmon Brokoli', ingredients: 'Beras, fillet salmon, brokoli cincang, butter', benefit: 'Tinggi Omega-3 & DHA untuk perkembangan otak' },
        { name: 'Stik Kentang Telur Puyuh', ingredients: 'Kentang kukus lumat, telur puyuh rebus, keju', benefit: 'Sumber kalsium & energi harian' }
      ]
    },
    '12-24': {
      texture: 'Makanan Keluarga (Potongan Agak Besar)',
      frequency: '3 kali makan keluarga + 2 kali selingan sehat',
      recipes: [
        { name: 'Sup Bola-Bola Ayam Sayur', ingredients: 'Daging ayam, wortel, buncis, bakso ayam homemade', benefit: 'Gizi lengkap karbohidrat & protein' },
        { name: 'Omelet Telur Keju & Tahu', ingredients: 'Telur ayam, tahu lumat, daun bawang, keju parut', benefit: 'Praktis, padat gizi, & disukai anak' }
      ]
    }
  };

  // ==========================================
  // STATE EDUKASI PARENTING
  // ==========================================
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const articles = [
    {
      id: 1,
      title: 'Cara Mengatasi Anak Picky Eater (Pilih-Pilih Makanan)',
      category: 'Gizi & Nutrisi',
      readTime: '4 menit',
      summary: 'Langkah praktis membiasakan anak menyukai sayur dan tekstur baru tanpa ada unsur paksaan.',
      content: 'Picky eating biasa terjadi pada usia balita. Tips utama: 1) Buat suasana makan menyenangkan, 2) Sajikan makanan porsi kecil tapi sering, 3) Libatkan anak saat menyiapkan makanan, 4) Tetap tawarkan makanan baru hingga 10-15 kali tanpa memaksa.'
    },
    {
      id: 2,
      title: 'Pentingnya Imunisasi Campak & MR Tepat Waktu',
      category: 'Kesehatan',
      readTime: '3 menit',
      summary: 'Mengapa vaksin MR sangat penting untuk mencegah komplikasi serius pada tumbuh kembang si kecil.',
      content: 'Vaksin MR mencegah infeksi Campak dan Rubella yang berisiko memicu radang paru (pneumonia) dan kerusakan otak. Dosis pertama diberikan di usia 9 bulan dan booster di usia 18 bulan.'
    },
    {
      id: 3,
      title: 'Stimulasi Wicara: Trik Agar Anak Cepat Bicara',
      category: 'Tumbuh Kembang',
      readTime: '5 menit',
      summary: 'Panduan stimulasi Bahasa & Komunikasi untuk melatih kosa kata pertama anak secara alami.',
      content: 'Kurangi screen time (gadget). Rajinlah mengajak berbicara face-to-face, bernyanyi bersama, dan gunakan bahasa yang jelas.'
    }
  ];

  const [basataSubTab, setBasataSubTab] = useState<'panduan' | 'interaktif'>('panduan');
  const [basataAgeFilter, setBasataAgeFilter] = useState<'0-3' | '4-6' | '7-9' | '10-12'>('0-3');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'basata', label: 'Modul Basata', icon: Baby },
    { id: 'balita', label: 'Modul Balita', icon: BookOpen },
    { id: 'pertumbuhan', label: 'Catatan Pertumbuhan', icon: HeartPulse },
    { id: 'imunisasi', label: 'Jadwal Imunisasi', icon: Calendar },
    { id: 'nutrisi', label: 'MPASI & Nutrisi', icon: Utensils },
    { id: 'edukasi', label: 'Edukasi Parenting', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-[#E0F7FC] flex flex-col md:flex-row font-sans text-slate-800">
      
      {/* Header Mobile Toggle */}
      <div className="md:hidden bg-white px-4 py-3 flex items-center justify-between border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-cyan-500 text-white font-extrabold flex items-center justify-center text-sm">
            H
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">HALO,</p>
            <p className="text-sm font-extrabold text-slate-700 -mt-1">hope</p>
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ================= SIDEBAR KIRI ================= */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-100 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00A884] text-white font-extrabold flex items-center justify-center text-base shadow-sm">
              H
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">HALO,</p>
              <h3 className="text-base font-extrabold text-slate-800 leading-none">hope</h3>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-3">
              KATEGORI BELAJAR
            </p>

            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                      isActive
                        ? 'bg-[#00A884] text-white shadow-md shadow-emerald-200'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center font-medium">
          Baby Hope App v2.0
        </div>
      </aside>

      {/* Overlay Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
        />
      )}

      {/* ================= KONTEN UTAMA KANAN ================= */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto relative">
        
        {/* Tombol Favorit */}
        <div className="absolute top-6 right-8 hidden md:block">
          <div className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 shadow-sm cursor-pointer hover:scale-105 transition-transform">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
        </div>

        {/* ===================================================
            TOMBOL KEMBALI INTERAKTIF (BERDASARKAN RIWAYAT)
           =================================================== */}
        {activeMenu !== 'dashboard' && (
          <div className="max-w-4xl mx-auto mb-4">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200/80 shadow-sm transition-all hover:-translate-x-1 active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#00A884]" />
              <span>Kembali</span>
            </button>
          </div>
        )}

        {/* 1. DASHBOARD */}
        {activeMenu === 'dashboard' && (
          <div className="max-w-5xl mx-auto">
            <Dashboard
              onSelectModule={(mod) => handleNavigate(mod)}
              growthStatus={latestLog ? getGrowthStatus(latestLog.weight).status : 'Ideal (Standar WHO)'}
              campakStatus={campakStatus}
              latestAgeMonths={latestLog ? latestLog.ageMonths : 24}
            />
          </div>
        )}

        {/* 2. MODUL BASATA */}
        {activeMenu === 'basata' && (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-100">
            <div className="text-center space-y-3 mb-8">
              <div className="w-14 h-14 bg-emerald-100 text-[#00A884] rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <Baby className="w-8 h-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#00A884]">
                Modul Basata (Bawah Satu Tahun)
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Pusat Pembelajaran & Stimulasi Tumbuh Kembang Usia 0–12 Bulan
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <button
                onClick={() => setBasataSubTab('panduan')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  basataSubTab === 'panduan' ? 'bg-[#00A884] text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                1. Panduan Stimulasi Harian
              </button>
              <button
                onClick={() => setBasataSubTab('interaktif')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  basataSubTab === 'interaktif' ? 'bg-[#00A884] text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                2. Interaktif Baby &lt; 1 Tahun
              </button>
            </div>

            {basataSubTab === 'panduan' && (
              <>
                <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                  {(['0-3', '4-6', '7-9', '10-12'] as const).map((age) => (
                    <button
                      key={age}
                      onClick={() => setBasataAgeFilter(age)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        basataAgeFilter === age ? 'bg-[#00A884] text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {age} Bulan
                    </button>
                  ))}
                </div>

                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 mb-8">
                  <h4 className="text-xs font-bold text-[#00A884] flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                    Target Perkembangan Usia {basataAgeFilter} Bulan
                  </h4>
                  <p className="text-xs text-slate-600">• Mampu merespons rangsangan suara & motorik dasar secara aktif.</p>
                </div>
              </>
            )}
          </div>
        )}

        {/* 3. MODUL BALITA */}
        {activeMenu === 'balita' && <BalitaStimulasi />}

        {/* 4. CATATAN & STATUS PERTUMBUHAN */}
        {activeMenu === 'pertumbuhan' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-rose-100 text-rose-500 rounded-2xl">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">Catatan & Status Pertumbuhan</h2>
                  <p className="text-xs text-slate-500">Input data Berat Badan (BB), Tinggi Badan (TB), & Lingkar Kepala (LK)</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-5 text-white mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
                <div>
                  <span className="bg-white/20 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                    Status Pertumbuhan Saat Ini
                  </span>
                  <h3 className="text-2xl font-extrabold mt-1">
                    {latestLog ? getGrowthStatus(latestLog.weight).status : 'Belum Ada Data'}
                  </h3>
                  <p className="text-xs text-emerald-100 mt-1">
                    {latestLog ? `Berdasarkan pencatatan terakhir usia ${latestLog.ageMonths} Bulan (BB: ${latestLog.weight} kg, TB: ${latestLog.height} cm)` : 'Silakan isi form di bawah.'}
                  </p>
                </div>
                <div className="bg-white text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-bold shadow">
                  Grafik Standard WHO ✓
                </div>
              </div>

              <form onSubmit={handleAddGrowthLog} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-8 space-y-4">
                <h4 className="text-xs font-extrabold text-slate-700 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#00A884]" /> Tambah Catatan Pengukuran Baru
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500">Usia (Bulan)</label>
                    <input
                      type="number"
                      placeholder="Contoh: 24"
                      value={newLog.ageMonths}
                      onChange={(e) => setNewLog({ ...newLog, ageMonths: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500">Berat Badan (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Contoh: 12.5"
                      value={newLog.weight}
                      onChange={(e) => setNewLog({ ...newLog, weight: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500">Tinggi Badan (cm)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Contoh: 88.0"
                      value={newLog.height}
                      onChange={(e) => setNewLog({ ...newLog, height: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500">Lingkar Kepala (cm)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Contoh: 48.0"
                      value={newLog.headCirc}
                      onChange={(e) => setNewLog({ ...newLog, headCirc: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-emerald-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-[#00A884] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow hover:bg-emerald-600 transition-all w-full sm:w-auto"
                >
                  Simpan Catatan Pertumbuhan
                </button>
              </form>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase">
                      <th className="py-3 px-2">Tanggal</th>
                      <th className="py-3 px-2">Usia</th>
                      <th className="py-3 px-2">BB (kg)</th>
                      <th className="py-3 px-2">TB (cm)</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {growthLogs.map((log) => {
                      const status = getGrowthStatus(log.weight);
                      return (
                        <tr key={log.id} className="hover:bg-slate-50">
                          <td className="py-3 px-2">{log.date}</td>
                          <td className="py-3 px-2">{log.ageMonths} Bulan</td>
                          <td className="py-3 px-2">{log.weight} kg</td>
                          <td className="py-3 px-2">{log.height} cm</td>
                          <td className="py-3 px-2">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${status.color}`}>
                              {status.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <button
                              onClick={() => handleDeleteGrowthLog(log.id)}
                              className="text-rose-400 hover:text-rose-600 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 5. JADWAL & REKAM IMUNISASI */}
        {activeMenu === 'imunisasi' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 text-blue-500 rounded-2xl">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">Jadwal & Rekam Imunisasi</h2>
                  <p className="text-xs text-slate-500">Klik centang pada imunisasi yang sudah diberikan kepada anak</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 text-white mb-8 flex items-center justify-between shadow-md">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-blue-200">Status Kelengkapan Khusus</p>
                  <h3 className="text-xl font-extrabold">
                    Campak / MR: {campakStatus ? 'LENGKAP ✓' : 'BELUM LENGKAP'}
                  </h3>
                  <p className="text-xs text-blue-100">
                    {campakStatus
                      ? 'Seluruh dosis vaksin Campak / MR (Dosis 1 & Booster) sudah selesai.'
                      : 'Pastikan anak mendapatkan dosis Campak/MR di usia 9 & 18 bulan.'}
                  </p>
                </div>
                <Award className="w-10 h-10 text-yellow-300 hidden sm:block" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {vaccines.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => toggleVaccine(v.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      v.done
                        ? 'bg-emerald-50/60 border-emerald-200'
                        : 'bg-white border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        Target Usia: {v.age}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800">{v.name}</h4>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        v.done ? 'bg-[#00A884] text-white' : 'border-2 border-slate-300'
                      }`}
                    >
                      {v.done && <Check className="w-4 h-4" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. MPASI & NUTRISI */}
        {activeMenu === 'nutrisi' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-100 text-[#00A884] rounded-2xl">
                  <Utensils className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">Panduan MPASI & Nutrisi</h2>
                  <p className="text-xs text-slate-500">Resep gizi seimbang dan takaran porsi sesuai tahapan usia</p>
                </div>
              </div>

              <div className="flex justify-center gap-2 mb-8">
                {(['6-8', '9-11', '12-24'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMpasiCategory(cat)}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all ${
                      mpasiCategory === cat
                        ? 'bg-[#00A884] text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Usia {cat} Bulan
                  </button>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 space-y-2">
                <h4 className="text-xs font-extrabold text-amber-800">📌 Panduan Pemberian Makan ({mpasiCategory} Bulan):</h4>
                <p className="text-xs text-amber-900"><strong>Tekstur:</strong> {mpasiData[mpasiCategory].texture}</p>
                <p className="text-xs text-amber-900"><strong>Frekuensi:</strong> {mpasiData[mpasiCategory].frequency}</p>
              </div>

              <h4 className="text-sm font-extrabold text-slate-800 mb-4">Rekomendasi Resep Bergizi:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mpasiData[mpasiCategory].recipes.map((r, i) => (
                  <div key={i} className="border border-slate-200 rounded-2xl p-5 space-y-2 bg-slate-50/50 hover:border-emerald-300 transition-all">
                    <h5 className="font-extrabold text-slate-800 text-sm text-[#00A884]">{r.name}</h5>
                    <p className="text-xs text-slate-600"><strong>Bahan:</strong> {r.ingredients}</p>
                    <div className="pt-2">
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                        {r.benefit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 7. EDUKASI PARENTING */}
        {activeMenu === 'edukasi' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">Edukasi & Tips Parenting</h2>
                  <p className="text-xs text-slate-500">Artikel pengasuhan anak dari pakar tumbuh kembang</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => setSelectedArticle(art)}
                    className="border border-slate-200 rounded-2xl p-5 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 bg-white"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-extrabold text-purple-600">
                        <span>{art.category}</span>
                        <span className="text-slate-400">{art.readTime}</span>
                      </div>
                      <h4 className="font-extrabold text-slate-800 text-sm leading-snug">{art.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-3">{art.summary}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#00A884] pt-2">
                      <span>Baca Artikel</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedArticle && (
              <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">
                    {selectedArticle.category}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-800">{selectedArticle.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{selectedArticle.content}</p>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="w-full bg-[#00A884] text-white text-xs font-bold py-2.5 rounded-xl shadow"
                  >
                    Tutup Artikel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}

export default App;