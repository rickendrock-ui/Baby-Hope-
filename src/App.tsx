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
  ArrowLeft,
  LogOut,
  Eye,
  EyeOff,
  Lock,
  User,
  Volume2,
  Heart,
  Music,
  Smile,
  ShieldCheck
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import BalitaStimulasi from './components/BalitaStimulasi';

export function App() {
  // ==========================================
  // STATE AUTENTIKASI (LOGIN & LOGOUT)
  // ==========================================
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginName, setLoginName] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');

  // Fungsi Pemutar Suara Sapaan Selamat Datang
  const playWelcomeSpeech = (name: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Hentikan suara yang sedang berjalan jika ada
      const text = `Selamat Datang Baby ${name}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9; // Kecepatan bicara natural
      utterance.pitch = 1.1; // Nada suara lebih ramah
      window.speechSynthesis.speak(utterance);
    }
  };

  // Handler Login Validation
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginName.trim().toLowerCase() === 'hope' && loginPassword === 'Hope123') {
      setIsLoggedIn(true);
      setLoginError('');
      playWelcomeSpeech('Hope');
    } else {
      setLoginError('ID/Nama Bayi atau Sandi salah! (Gunakan ID: Hope & Sandi: Hope123)');
    }
  };

  // Handler Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginName('');
    setLoginPassword('');
    setActiveMenu('dashboard');
    setNavigationHistory(['dashboard']);
  };

  // ==========================================
  // STATE NAVIGASI & RIWAYAT (HISTORY STACK)
  // ==========================================
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['dashboard']);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleNavigate = (targetMenu: string) => {
    if (targetMenu !== activeMenu) {
      setNavigationHistory((prev) => [...prev, targetMenu]);
      setActiveMenu(targetMenu);
    }
    setIsSidebarOpen(false);
  };

  const handleGoBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop();
      const previousMenu = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setActiveMenu(previousMenu);
    } else {
      setActiveMenu('dashboard');
    }
  };

  // ==========================================
  // STATE CATATAN PERTUMBUHAN
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
    setGrowthLogs(growthLogs.filter((item) => item.id !== id));
  };

  const latestLog = growthLogs[0];
  const getGrowthStatus = (weight: number) => {
    if (weight < 9) return { status: 'Gizi Kurang', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    if (weight > 16) return { status: 'Risiko Lebih', color: 'bg-rose-100 text-rose-800 border-rose-300' };
    return { status: 'Ideal (Standar WHO)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  };

  // ==========================================
  // STATE IMUNISASI
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
    setVaccines(vaccines.map((v) => (v.id === id ? { ...v, done: !v.done } : v)));
  };

  const completedVaccinesCount = vaccines.filter((v) => v.done).length;
  const totalVaccinesCount = vaccines.length;
  const vaccineProgressPercentage = Math.round((completedVaccinesCount / totalVaccinesCount) * 100);
  const campakStatus = vaccines.filter((v) => v.name.includes('Campak') && v.done).length >= 2;

  // ==========================================
  // STATE MPASI & FAVORIT RESEP
  // ==========================================
  const [mpasiCategory, setMpasiCategory] = useState<'6-8' | '9-11' | '12-24'>('6-8');
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);

  const toggleFavoriteRecipe = (recipeName: string) => {
    if (favoriteRecipes.includes(recipeName)) {
      setFavoriteRecipes(favoriteRecipes.filter((name) => name !== recipeName));
    } else {
      setFavoriteRecipes([...favoriteRecipes, recipeName]);
    }
  };

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
  // STATE EDUKASI & INTERAKSI ARTIKEL
  // ==========================================
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [likedArticles, setLikedArticles] = useState<number[]>([]);

  const toggleLikeArticle = (articleId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedArticles.includes(articleId)) {
      setLikedArticles(likedArticles.filter((id) => id !== articleId));
    } else {
      setLikedArticles([...likedArticles, articleId]);
    }
  };

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

  // ==========================================
  // TAMPILAN HALAMAN LOGIN (JIKA BELUM LOGIN)
  // ==========================================
  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-200 via-sky-100 to-pink-100 font-sans p-4">
        {/* CSS KEYFRAMES UNTUK ANIMASI HIDUP */}
        <style>{`
          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-18px) rotate(6deg); }
          }
          @keyframes floatReverse {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(18px) rotate(-6deg); }
          }
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulseGlow {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.06); opacity: 1; }
          }
          .animate-float-1 { animation: floatSlow 5s ease-in-out infinite; }
          .animate-float-2 { animation: floatReverse 6s ease-in-out infinite; }
          .animate-spin-slow { animation: spinSlow 18s linear infinite; }
          .animate-pulse-glow { animation: pulseGlow 3s ease-in-out infinite; }
        `}</style>

        {/* GELEMBUNG LATAR BELAKANG INTERAKTIF & HIDUP */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-48 h-48 bg-cyan-300/40 rounded-full filter blur-2xl animate-float-1" />
          <div className="absolute bottom-12 right-12 w-64 h-64 bg-pink-300/40 rounded-full filter blur-3xl animate-float-2" />
          <div className="absolute top-1/3 right-1/4 w-36 h-36 bg-yellow-200/50 rounded-full filter blur-xl animate-float-1" />
          <div className="absolute bottom-1/4 left-1/5 w-44 h-44 bg-[#00A884]/20 rounded-full filter blur-2xl animate-float-2" />
        </div>

        {/* KARTU FORM LOGIN */}
        <div className="relative z-10 w-full max-w-md bg-white/85 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border border-white/60 text-slate-800">
          
          {/* HEADER LOGO BESAR DENGAN OBJEK BERGERAK */}
          <div className="flex flex-col items-center text-center space-y-3 mb-6 relative">
            <div className="relative w-36 h-36 flex items-center justify-center">
              
              {/* Cincin Cahaya Berputar */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-pink-400 to-yellow-300 opacity-60 animate-spin-slow filter blur-md" />

              {/* LOGO UTAMA BESAR */}
              <div className="relative w-28 h-28 bg-white rounded-3xl p-2 shadow-xl animate-pulse-glow flex items-center justify-center border-2 border-white">
                <img
                  src="/icon-192.png"
                  alt="Baby Hope Logo"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>

              {/* OBJEK-OBJEK YANG BERGERAK / MELAYANG DI SEKITAR LOGO */}
              <div className="absolute -top-2 -right-1 p-2 bg-yellow-400 text-white rounded-full shadow-lg animate-float-1">
                <Star className="w-5 h-5 fill-yellow-200" />
              </div>
              <div className="absolute -bottom-1 -left-2 p-2 bg-pink-500 text-white rounded-full shadow-lg animate-float-2">
                <Heart className="w-5 h-5 fill-pink-200" />
              </div>
              <div className="absolute top-1/2 -right-5 p-1.5 bg-cyan-500 text-white rounded-full shadow-md animate-float-2">
                <Music className="w-4 h-4" />
              </div>
              <div className="absolute top-1/2 -left-5 p-1.5 bg-emerald-500 text-white rounded-full shadow-md animate-float-1">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-[#00A884]">BABY HOPE APP</h1>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Aplikasi Tumbuh Kembang & Edukasi Balita
              </p>
            </div>
          </div>

          {/* PESAN ERROR LOGIN */}
          {loginError && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-2xl text-center font-bold">
              {loginError}
            </div>
          )}

          {/* FORM LOGIN */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-600 mb-1.5">
                ID / NAMA BAYI
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Masukkan ID / Nama Bayi (misal: Hope)"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/90 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-[#00A884] shadow-sm transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-600 mb-1.5">
                KATASANDI
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan Sandi (misal: Hope123)"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white/90 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-[#00A884] shadow-sm transition-all"
                  required
                />
                {/* TOMBOL LIHAT/SEMBUNYI SANDI */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#00A884] hover:bg-emerald-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-emerald-200 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Smile className="w-4 h-4" />
              <span>MASUK SEKARANG</span>
            </button>
          </form>

          {/* KETERANGAN BANTUAN */}
          <div className="mt-6 pt-4 border-t border-slate-200/60 text-center">
            <p className="text-[11px] font-bold text-slate-500">
              Kredensial Akses Demo:
            </p>
            <p className="text-[11px] text-[#00A884] font-bold mt-0.5">
              ID Bayi: <span className="underline">Hope</span> | Sandi: <span className="underline">Hope123</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // TAMPILAN APLIKASI UTAMA (SETELAH LOGIN)
  // ==========================================
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#E0F7FC] via-sky-50 to-pink-50 flex flex-col md:flex-row font-sans text-slate-800 overflow-x-hidden">
      
      {/* STYLE ANMATION BUBBLES APPS */}
      <style>{`
        @keyframes bgFloat1 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(25px, -20px); }
        }
        @keyframes bgFloat2 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-20px, 25px); }
        }
        .bg-bubble-1 { animation: bgFloat1 10s ease-in-out infinite; }
        .bg-bubble-2 { animation: bgFloat2 12s ease-in-out infinite; }
      `}</style>

      {/* BACKGROUND INTERAKTIF APLIKASI UTAMA */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-200/30 rounded-full filter blur-3xl bg-bubble-1" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-pink-200/30 rounded-full filter blur-3xl bg-bubble-2" />
      </div>

      {/* ================= HEADER MOBILE ================= */}
      <div className="md:hidden bg-white/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="/icon-192.png"
            alt="Baby Hope Logo"
            className="w-10 h-10 rounded-xl object-contain border border-emerald-100 shadow-sm bg-white p-0.5"
          />
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">BABY HOPE</p>
            <p className="text-xs font-extrabold text-[#00A884] -mt-0.5">Baby Hope</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Tombol Logout Mobile */}
          <button
            onClick={handleLogout}
            title="Keluar"
            className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ================= SIDEBAR KIRI ================= */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white/90 backdrop-blur-md border-r border-slate-100 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out shadow-lg md:shadow-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6 z-10">
          {/* LOGO BRAND SIDEBAR */}
          <div className="bg-emerald-50/70 border border-emerald-100 p-3.5 rounded-2xl flex items-center gap-3 shadow-sm">
            <img
              src="/icon-192.png"
              alt="Baby Hope Logo"
              className="w-12 h-12 rounded-xl object-contain shadow-sm bg-white p-0.5 hover:scale-105 transition-transform"
            />
            <div>
              <p className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-wider">BAYI AKTIF</p>
              <h3 className="text-base font-extrabold text-slate-800 leading-none">Baby Hope</h3>
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
                        ? 'bg-[#00A884] text-white shadow-md shadow-emerald-200 scale-[1.02]'
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

        {/* TOMBOL LOGOUT SIDEBAR */}
        <div className="pt-4 border-t border-slate-100 space-y-3 z-10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-2xl transition-all border border-rose-200 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar (Logout)</span>
          </button>

          <div className="text-[11px] text-slate-400 text-center font-medium">
            Baby Hope App v2.0
          </div>
        </div>
      </aside>

      {/* Overlay Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-xs"
        />
      )}

      {/* ================= KONTEN UTAMA KANAN ================= */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
        
        {/* TOP BAR / DESKTOP CONTROLS */}
        <div className="hidden md:flex items-center justify-between max-w-5xl mx-auto mb-6">
          <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-2xl border border-slate-200/80 shadow-xs">
            <Volume2 className="w-4 h-4 text-[#00A884]" />
            <span className="text-xs font-extrabold text-slate-700">Sapaan Suara:</span>
            <button
              onClick={() => playWelcomeSpeech('Hope')}
              className="text-xs font-bold text-[#00A884] hover:underline cursor-pointer"
            >
              Putar "Selamat Datang Baby Hope" 🔊
            </button>
          </div>

          <div className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 shadow-sm cursor-pointer hover:scale-110 transition-transform">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
        </div>

        {/* TOMBOL KEMBALI INTERAKTIF */}
        {activeMenu !== 'dashboard' && (
          <div className="max-w-4xl mx-auto mb-4">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-slate-700 font-bold text-xs rounded-2xl border border-slate-200/80 shadow-sm transition-all hover:-translate-x-1 active:scale-95 cursor-pointer"
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
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-xl border border-slate-100">
            <div className="text-center space-y-3 mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-md overflow-hidden border-2 border-emerald-100 bg-white p-1">
                <img src="/icon-192.png" alt="Baby Hope Logo" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#00A884]">
                Modul Basata (Bawah Satu Tahun)
              </h2>
              <p className="text-xs text-slate-500 font-semibold">
                Pusat Pembelajaran & Stimulasi Tumbuh Kembang Usia 0–12 Bulan
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <button
                onClick={() => setBasataSubTab('panduan')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
                  basataSubTab === 'panduan' ? 'bg-[#00A884] text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                1. Panduan Stimulasi Harian
              </button>
              <button
                onClick={() => setBasataSubTab('interaktif')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
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
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
                  <p className="text-xs text-slate-600 font-medium">
                    • Mampu merespons rangsangan suara & motorik dasar secara aktif.
                  </p>
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
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-rose-100 text-rose-500 rounded-2xl">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">Catatan & Status Pertumbuhan</h2>
                  <p className="text-xs text-slate-500 font-semibold">
                    Input data Berat Badan (BB), Tinggi Badan (TB), & Lingkar Kepala (LK) Baby Hope
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-5 text-white mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
                <div>
                  <span className="bg-white/20 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                    Status Pertumbuhan Baby Hope
                  </span>
                  <h3 className="text-2xl font-extrabold mt-1">
                    {latestLog ? getGrowthStatus(latestLog.weight).status : 'Belum Ada Data'}
                  </h3>
                  <p className="text-xs text-emerald-100 mt-1 font-medium">
                    {latestLog
                      ? `Pencatatan terakhir usia ${latestLog.ageMonths} Bulan (BB: ${latestLog.weight} kg, TB: ${latestLog.height} cm)`
                      : 'Silakan isi formulir di bawah ini.'}
                  </p>
                </div>
                <div className="bg-white text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-extrabold shadow-sm">
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
                  className="bg-[#00A884] hover:bg-emerald-600 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow transition-all w-full sm:w-auto cursor-pointer"
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
                        <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-2">{log.date}</td>
                          <td className="py-3 px-2">{log.ageMonths} Bulan</td>
                          <td className="py-3 px-2">{log.weight} kg</td>
                          <td className="py-3 px-2">{log.height} cm</td>
                          <td className="py-3 px-2">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${status.color}`}>
                              {status.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <button
                              onClick={() => handleDeleteGrowthLog(log.id)}
                              className="text-rose-400 hover:text-rose-600 p-1 cursor-pointer"
                              title="Hapus"
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
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 text-blue-500 rounded-2xl">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">Jadwal & Rekam Imunisasi</h2>
                  <p className="text-xs text-slate-500 font-semibold">
                    Klik kartu untuk mencentang vaksin yang sudah diberikan kepada Baby Hope
                  </p>
                </div>
              </div>

              {/* PROGRESS BAR INTERAKTIF VAKSIN */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6 space-y-2">
                <div className="flex justify-between items-center text-xs font-extrabold text-slate-700">
                  <span>Progres Kelengkapan Vaksin:</span>
                  <span className="text-[#00A884]">{completedVaccinesCount} dari {totalVaccinesCount} Vaksin ({vaccineProgressPercentage}%)</span>
                </div>
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-[#00A884] h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${vaccineProgressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 text-white mb-8 flex items-center justify-between shadow-md">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-blue-200">Status Kelengkapan Khusus</p>
                  <h3 className="text-xl font-extrabold">
                    Campak / MR: {campakStatus ? 'LENGKAP ✓' : 'BELUM LENGKAP'}
                  </h3>
                  <p className="text-xs text-blue-100 font-medium">
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
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between hover:scale-[1.01] ${
                      v.done
                        ? 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        Target Usia: {v.age}
                      </span>
                      <h4 className="text-xs font-extrabold text-slate-800">{v.name}</h4>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        v.done ? 'bg-[#00A884] text-white shadow-sm' : 'border-2 border-slate-300'
                      }`}
                    >
                      {v.done && <Check className="w-4 h-4 stroke-[3]" />}
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
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-100 text-[#00A884] rounded-2xl">
                  <Utensils className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">Panduan MPASI & Nutrisi</h2>
                  <p className="text-xs text-slate-500 font-semibold">
                    Resep gizi seimbang dan takaran porsi sesuai tahapan usia
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-2 mb-8">
                {(['6-8', '9-11', '12-24'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMpasiCategory(cat)}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
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
                {mpasiData[mpasiCategory].recipes.map((r, i) => {
                  const isFav = favoriteRecipes.includes(r.name);
                  return (
                    <div
                      key={i}
                      className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-slate-50/70 hover:border-emerald-300 transition-all relative"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-extrabold text-slate-800 text-sm text-[#00A884]">{r.name}</h5>
                        {/* FITUR SIMPAN FAVORIT INTERAKTIF */}
                        <button
                          onClick={() => toggleFavoriteRecipe(r.name)}
                          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                            isFav ? 'bg-rose-100 text-rose-500' : 'bg-white text-slate-300 hover:text-rose-400'
                          }`}
                          title={isFav ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                        </button>
                      </div>

                      <p className="text-xs text-slate-600 font-medium"><strong>Bahan:</strong> {r.ingredients}</p>
                      <div className="pt-1">
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                          {r.benefit}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 7. EDUKASI PARENTING */}
        {activeMenu === 'edukasi' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">Edukasi & Tips Parenting</h2>
                  <p className="text-xs text-slate-500 font-semibold">
                    Artikel pengasuhan anak dari pakar tumbuh kembang
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {articles.map((art) => {
                  const isLiked = likedArticles.includes(art.id);
                  return (
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
                        <p className="text-xs text-slate-500 line-clamp-3 font-medium">{art.summary}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1 text-xs font-bold text-[#00A884]">
                          <span>Baca Artikel</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>

                        {/* FITUR LIKE INTERAKTIF */}
                        <button
                          onClick={(e) => toggleLikeArticle(art.id, e)}
                          className={`p-1.5 rounded-full transition-transform active:scale-125 ${
                            isLiked ? 'text-pink-500' : 'text-slate-300 hover:text-pink-400'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-pink-500' : ''}`} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MODAL BACA ARTIKEL */}
            {selectedArticle && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">
                    {selectedArticle.category}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-800">{selectedArticle.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{selectedArticle.content}</p>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="w-full bg-[#00A884] text-white text-xs font-bold py-2.5 rounded-xl shadow cursor-pointer"
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