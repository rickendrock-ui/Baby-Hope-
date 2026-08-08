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
  Plus,
  Trash2,
  Check,
  ArrowLeft,
  LogOut,
  Eye,
  EyeOff,
  Lock,
  User,
  Heart,
  Music,
  Smile,
  Camera,
  Save,
  Clock
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import BalitaStimulasi from './components/BalitaStimulasi';

// Helper LocalStorage
const getStorageData = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStorageData = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Gagal menyimpan data ke localStorage', e);
  }
};

export function App() {
  // ==========================================
  // STATE PROFIL BAYI & USIA DINAMIS (REAL-TIME)
  // ==========================================
  const [babyName, setBabyName] = useState<string>(() => getStorageData('baby_name', 'Hope'));
  const [birthDate, setBirthDate] = useState<string>(() => getStorageData('baby_birthdate', '2024-08-01'));
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [saveNotification, setSaveNotification] = useState<string>('');

  // Hitung Usia Real-Time Berdasarkan Tanggal Lahir
  const calculateRealtimeAge = (bDateStr: string) => {
    const birth = new Date(bDateStr);
    const now = new Date();
    if (isNaN(birth.getTime())) return { totalMonths: 24, years: 2, remainingMonths: 0, days: 0 };

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalMonths = years * 12 + months;
    return { totalMonths, years, remainingMonths: months, days };
  };

  const currentAge = calculateRealtimeAge(birthDate);

  const handleSaveProfile = () => {
    setStorageData('baby_name', babyName);
    setStorageData('baby_birthdate', birthDate);
    setIsEditingProfile(false);
    triggerNotification('Profil & Tanggal Lahir berhasil disimpan!');
  };

  const triggerNotification = (msg: string) => {
    setSaveNotification(msg);
    setTimeout(() => setSaveNotification(''), 3000);
  };

  // ==========================================
  // STATE AUTENTIKASI (LOGIN & LOGOUT)
  // ==========================================
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginName, setLoginName] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');

  const playWelcomeSpeech = (name: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `Selamat Datang Baby ${name}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginName.trim().toLowerCase() === 'hope' && loginPassword === 'Hope123') {
      setIsLoggedIn(true);
      setLoginError('');
      playWelcomeSpeech(babyName);
    } else {
      setLoginError('ID/Nama Bayi atau Sandi salah! (Gunakan ID: Hope & Sandi: Hope123)');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginName('');
    setLoginPassword('');
    setActiveMenu('dashboard');
  };

  // ==========================================
  // NAVIGASI
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
  // STATE CATATAN PERTUMBUHAN + FOTO & SAVING
  // ==========================================
  const [growthLogs, setGrowthLogs] = useState(() =>
    getStorageData('growth_logs', [
      { id: 1, date: '2026-08-01', ageMonths: 24, weight: 12.2, height: 87.5, headCirc: 48, photoUrl: '' },
      { id: 2, date: '2026-06-01', ageMonths: 22, weight: 11.8, height: 85.0, headCirc: 47.5, photoUrl: '' },
    ])
  );

  const [newLog, setNewLog] = useState({
    date: new Date().toISOString().split('T')[0],
    ageMonths: '',
    weight: '',
    height: '',
    headCirc: '',
    photoUrl: ''
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddGrowthLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.ageMonths || !newLog.weight || !newLog.height) return;
    const log = {
      id: Date.now(),
      date: newLog.date || new Date().toISOString().split('T')[0],
      ageMonths: Number(newLog.ageMonths),
      weight: Number(newLog.weight),
      height: Number(newLog.height),
      headCirc: Number(newLog.headCirc) || 0,
      photoUrl: newLog.photoUrl
    };
    const updated = [log, ...growthLogs];
    setGrowthLogs(updated);
    setStorageData('growth_logs', updated);
    setNewLog({ date: new Date().toISOString().split('T')[0], ageMonths: '', weight: '', height: '', headCirc: '', photoUrl: '' });
    triggerNotification('Catatan Pertumbuhan Berhasil Disimpan!');
  };

  const handleDeleteGrowthLog = (id: number) => {
    const updated = growthLogs.filter((item: any) => item.id !== id);
    setGrowthLogs(updated);
    setStorageData('growth_logs', updated);
    triggerNotification('Data pengukuran berhasil dihapus.');
  };

  const latestLog = growthLogs[0];
  const getGrowthStatus = (weight: number) => {
    if (weight < 9) return { status: 'Gizi Kurang', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    if (weight > 16) return { status: 'Risiko Lebih', color: 'bg-rose-100 text-rose-800 border-rose-300' };
    return { status: 'Ideal (Standar WHO)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  };

  // ==========================================
  // STATE IMUNISASI + TANGGAL & FOTO
  // ==========================================
  const [vaccines, setVaccines] = useState(() =>
    getStorageData('vaccines', [
      { id: 1, name: 'Hepatitis B (HB-0)', age: '0 Bulan', done: true, dateGiven: '2024-08-01', photoUrl: '' },
      { id: 2, name: 'BCG & Polio 1', age: '1 Bulan', done: true, dateGiven: '2024-09-01', photoUrl: '' },
      { id: 3, name: 'DPT-HB-Hib 1 & Polio 2', age: '2 Bulan', done: true, dateGiven: '2024-10-01', photoUrl: '' },
      { id: 4, name: 'DPT-HB-Hib 2 & Polio 3', age: '3 Bulan', done: true, dateGiven: '2024-11-01', photoUrl: '' },
      { id: 5, name: 'DPT-HB-Hib 3 & Polio 4', age: '4 Bulan', done: true, dateGiven: '2024-12-01', photoUrl: '' },
      { id: 6, name: 'Campak / MR (Lanjutan 1)', age: '9 Bulan', done: true, dateGiven: '2025-05-01', photoUrl: '' },
      { id: 7, name: 'PCV & Rotavirus Booster', age: '12 Bulan', done: true, dateGiven: '2025-08-01', photoUrl: '' },
      { id: 8, name: 'Campak / MR (Booster)', age: '18 Bulan', done: true, dateGiven: '2026-02-01', photoUrl: '' },
      { id: 9, name: 'DPT-HB-Hib Booster', age: '18 Bulan', done: false, dateGiven: '', photoUrl: '' },
    ])
  );

  const handleUpdateVaccine = (id: number, fields: Partial<typeof vaccines[0]>) => {
    const updated = vaccines.map((v: any) => (v.id === id ? { ...v, ...fields } : v));
    setVaccines(updated);
    setStorageData('vaccines', updated);
  };

  const handleSaveVaccinesAll = () => {
    setStorageData('vaccines', vaccines);
    triggerNotification('Jadwal & Catatan Imunisasi Berhasil Disimpan!');
  };

  const campakStatus = vaccines.filter((v: any) => v.name.includes('Campak') && v.done).length >= 2;

  // ==========================================
  // STATE MPASI & EDUKASI
  // ==========================================
  const [mpasiCategory, setMpasiCategory] = useState<'6-8' | '9-11' | '12-24'>('6-8');
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>(() => getStorageData('fav_recipes', []));

  const toggleFavoriteRecipe = (recipeName: string) => {
    const updated = favoriteRecipes.includes(recipeName)
      ? favoriteRecipes.filter((n) => n !== recipeName)
      : [...favoriteRecipes, recipeName];
    setFavoriteRecipes(updated);
    setStorageData('fav_recipes', updated);
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

  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [likedArticles, setLikedArticles] = useState<number[]>(() => getStorageData('liked_articles', []));

  const toggleLikeArticle = (articleId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = likedArticles.includes(articleId)
      ? likedArticles.filter((id) => id !== articleId)
      : [...likedArticles, articleId];
    setLikedArticles(updated);
    setStorageData('liked_articles', updated);
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

  // ==========================================
  // STATE INTERAKTIF MODUL BASATA & BALITA
  // ==========================================
  const [basataSubTab, setBasataSubTab] = useState<'panduan' | 'interaktif'>('panduan');
  const [basataAgeFilter, setBasataAgeFilter] = useState<'0-3' | '4-6' | '7-9' | '10-12'>('0-3');

  // Interaktif Game State Basata (<1 Thn)
  const [peekabooOpen, setPeekabooOpen] = useState<boolean>(false);
  const [rattleCount, setRattleCount] = useState<number>(0);

  // Interaktif Game State Balita (1-5 Thn)
  const [balitaSubTab, setBalitaSubTab] = useState<'panduan' | 'interaktif'>('panduan');
  const [activeAnimalSound, setActiveAnimalSound] = useState<string>('');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'basata', label: 'Modul Basata (<1 Thn)', icon: Baby },
    { id: 'balita', label: 'Modul Balita (1-5 Thn)', icon: BookOpen },
    { id: 'pertumbuhan', label: 'Catatan Pertumbuhan', icon: HeartPulse },
    { id: 'imunisasi', label: 'Jadwal Imunisasi', icon: Calendar },
    { id: 'nutrisi', label: 'MPASI & Nutrisi', icon: Utensils },
    { id: 'edukasi', label: 'Edukasi Parenting', icon: BookOpen },
  ];

  // ==========================================
  // HALAMAN LOGIN
  // ==========================================
  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-200 via-sky-100 to-pink-100 font-sans p-4">
        <style>{`
          @keyframes floatSlow { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-18px) rotate(6deg); } }
          @keyframes floatReverse { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(18px) rotate(-6deg); } }
          @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes pulseGlow { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.06); opacity: 1; } }
          .animate-float-1 { animation: floatSlow 5s ease-in-out infinite; }
          .animate-float-2 { animation: floatReverse 6s ease-in-out infinite; }
          .animate-spin-slow { animation: spinSlow 18s linear infinite; }
          .animate-pulse-glow { animation: pulseGlow 3s ease-in-out infinite; }
        `}</style>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-48 h-48 bg-cyan-300/40 rounded-full filter blur-2xl animate-float-1" />
          <div className="absolute bottom-12 right-12 w-64 h-64 bg-pink-300/40 rounded-full filter blur-3xl animate-float-2" />
        </div>

        <div className="relative z-10 w-full max-w-md bg-white/85 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border border-white/60 text-slate-800">
          <div className="flex flex-col items-center text-center space-y-3 mb-6 relative">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-pink-400 to-yellow-300 opacity-60 animate-spin-slow filter blur-md" />
              <div className="relative w-28 h-28 bg-white rounded-3xl p-2 shadow-xl animate-pulse-glow flex items-center justify-center border-2 border-white">
                <img src="/icon-192.png" alt="Baby Hope Logo" className="w-full h-full object-contain rounded-2xl" />
              </div>
              <div className="absolute -top-2 -right-1 p-2 bg-yellow-400 text-white rounded-full shadow-lg animate-float-1">
                <Star className="w-5 h-5 fill-yellow-200" />
              </div>
              <div className="absolute -bottom-1 -left-2 p-2 bg-pink-500 text-white rounded-full shadow-lg animate-float-2">
                <Heart className="w-5 h-5 fill-pink-200" />
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-[#00A884]">BABY HOPE APP</h1>
              <p className="text-xs text-slate-500 font-semibold mt-1">Aplikasi Tumbuh Kembang & Edukasi Balita</p>
            </div>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-2xl text-center font-bold">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-600 mb-1.5">ID / NAMA BAYI</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Masukkan ID / Nama Bayi (misal: Hope)"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/90 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-[#00A884] shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-600 mb-1.5">KATASANDI</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan Sandi (misal: Hope123)"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white/90 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-[#00A884] shadow-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#00A884] hover:bg-emerald-600 text-white font-extrabold text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Smile className="w-4 h-4" />
              <span>MASUK SEKARANG</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-200/60 text-center text-[11px]">
            <p className="font-bold text-slate-500">Kredensial Akses Demo:</p>
            <p className="text-[#00A884] font-bold mt-0.5">ID: <span className="underline">Hope</span> | Sandi: <span className="underline">Hope123</span></p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // TAMPILAN UTAMA APLIKASI
  // ==========================================
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#E0F7FC] via-sky-50 to-pink-50 flex flex-col md:flex-row font-sans text-slate-800 overflow-x-hidden">
      
      {/* TOAST NOTIFIKASI SIMPAN */}
      {saveNotification && (
        <div className="fixed top-5 right-5 z-50 bg-[#00A884] text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-yellow-300" />
          <span>{saveNotification}</span>
        </div>
      )}

      {/* HEADER MOBILE */}
      <div className="md:hidden bg-white/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <img src="/icon-192.png" alt="Baby Hope Logo" className="w-10 h-10 rounded-xl object-contain border border-emerald-100 bg-white p-0.5" />
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">BABY HOPE APP</p>
            <p className="text-xs font-extrabold text-[#00A884] -mt-0.5">Baby {babyName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleLogout} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl">
            <LogOut className="w-5 h-5" />
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl">
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* SIDEBAR */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white/90 backdrop-blur-md border-r border-slate-100 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out shadow-lg md:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="space-y-6 z-10">
          <div className="bg-emerald-50/70 border border-emerald-100 p-3.5 rounded-2xl flex items-center gap-3 shadow-sm">
            <img src="/icon-192.png" alt="Baby Hope Logo" className="w-12 h-12 rounded-xl object-contain shadow-sm bg-white p-0.5" />
            <div>
              <p className="text-[10px] text-emerald-600 font-extrabold uppercase">PROFIL AKTIF</p>
              <h3 className="text-base font-extrabold text-slate-800 leading-none">Baby {babyName}</h3>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-3">MENU UTAMA</p>
            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                      isActive ? 'bg-[#00A884] text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
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

        <div className="pt-4 border-t border-slate-100 space-y-3 z-10">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-2xl border border-rose-200">
            <LogOut className="w-4 h-4" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* OVERLAY MOBILE */}
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/20 z-30 md:hidden" />}

      {/* CONTENT AREA */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
        
        {/* BANNER EDIT PROFIL & USIA DINAMIS */}
        <div className="max-w-5xl mx-auto mb-6 bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-slate-100 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-100 text-[#00A884] rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-inner">
              👶
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-800">Baby {babyName}</h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {currentAge.years > 0 ? `${currentAge.years} Thn ` : ''}{currentAge.remainingMonths} Bln {currentAge.days} Hari
                </span>
              </div>
              <p className="text-xs text-slate-500 font-semibold mt-0.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Tanggal Lahir: <strong className="text-slate-700">{birthDate}</strong> (Usia ter-update otomatis tiap hari)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => playWelcomeSpeech(babyName)}
              className="px-3.5 py-2 bg-emerald-50 text-[#00A884] rounded-2xl text-xs font-bold border border-emerald-200 flex items-center gap-1.5 hover:bg-emerald-100"
            >
              <Smile className="w-4 h-4" />
              Sapaan Suara
            </button>

            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="px-3.5 py-2 bg-[#00A884] text-white rounded-2xl text-xs font-bold shadow flex items-center gap-1.5 hover:bg-emerald-600 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Edit Tanggal Lahir
            </button>
          </div>
        </div>

        {/* MODAL / FORM EDIT PROFIL & TANGGAL LAHIR */}
        {isEditingProfile && (
          <div className="max-w-5xl mx-auto mb-6 bg-slate-800 text-white p-5 rounded-3xl shadow-xl border border-slate-700 space-y-4 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <h4 className="text-xs font-extrabold text-emerald-400 flex items-center gap-2">
                <Save className="w-4 h-4" /> Pengaturan Data Dasar Bayi
              </h4>
              <button onClick={() => setIsEditingProfile(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-300">Nama Bayi</label>
                <input
                  type="text"
                  value={babyName}
                  onChange={(e) => setBabyName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-semibold focus:outline-emerald-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-300">Tanggal Lahir (Dasar Hitung Usia)</label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-semibold focus:outline-emerald-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={handleSaveProfile}
                className="bg-[#00A884] hover:bg-emerald-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Simpan Tanggal Lahir & Profil
              </button>
            </div>
          </div>
        )}

        {/* TOMBOL KEMBALI */}
        {activeMenu !== 'dashboard' && (
          <div className="max-w-5xl mx-auto mb-4">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 shadow-sm cursor-pointer"
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
              latestAgeMonths={currentAge.totalMonths}
            />
          </div>
        )}

        {/* 2. MODUL BASATA (<1 THN) - INTERAKTIF BAYI FIX */}
        {activeMenu === 'basata' && (
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-xl border border-slate-100">
            <div className="text-center space-y-3 mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-md overflow-hidden border-2 border-emerald-100 bg-white p-1">
                <img src="/icon-192.png" alt="Baby Hope Logo" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#00A884]">Modul Basata (Bawah Satu Tahun)</h2>
              <p className="text-xs text-slate-500 font-semibold">Pusat Pembelajaran & Stimulasi Tumbuh Kembang Usia 0–12 Bulan</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <button
                onClick={() => setBasataSubTab('panduan')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  basataSubTab === 'panduan' ? 'bg-[#00A884] text-white shadow-md' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                1. Panduan Stimulasi Harian
              </button>
              <button
                onClick={() => setBasataSubTab('interaktif')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  basataSubTab === 'interaktif' ? 'bg-[#00A884] text-white shadow-md' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Star className="w-4 h-4 text-yellow-300" />
                2. Interaktif Baby &lt; 1 Tahun (AKTIF)
              </button>
            </div>

            {/* CONTENT PANDUAN BASATA */}
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
                    <CheckCircle2 className="w-4 h-4" /> Target Perkembangan Usia {basataAgeFilter} Bulan
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">• Mampu merespons rangsangan suara & motorik dasar secara aktif.</p>
                </div>
              </>
            )}

            {/* CONTENT INTERAKTIF BAYI BASATA (<1 THN) */}
            {basataSubTab === 'interaktif' && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Game 1: Cukba / Peek-a-Boo */}
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 rounded-3xl p-6 text-center space-y-4">
                    <span className="text-[10px] font-extrabold bg-pink-200 text-pink-800 px-3 py-1 rounded-full uppercase">
                      Permainan Sensorik 1
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-800">Cukba! (Peek-A-Boo)</h3>
                    <p className="text-xs text-slate-500 font-medium">Klik tombol untuk menyembunyikan dan memunculkan wajah lucu Baby Hope!</p>
                    
                    <div className="w-32 h-32 mx-auto bg-white rounded-3xl shadow-lg border-2 border-pink-200 flex items-center justify-center text-5xl transition-transform active:scale-110">
                      {peekabooOpen ? '🙈' : '👶✨'}
                    </div>

                    <button
                      onClick={() => setPeekabooOpen(!peekabooOpen)}
                      className="w-full py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-xs rounded-2xl shadow cursor-pointer"
                    >
                      {peekabooOpen ? 'Buka Tangan: CUKBA! 🎉' : 'Sembunyi Tangan 🙈'}
                    </button>
                  </div>

                  {/* Game 2: Kerincingan Sound Digital */}
                  <div className="bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-200 rounded-3xl p-6 text-center space-y-4">
                    <span className="text-[10px] font-extrabold bg-cyan-200 text-cyan-800 px-3 py-1 rounded-full uppercase">
                      Permainan Sensorik 2
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-800">Kerincingan Digital 🔔</h3>
                    <p className="text-xs text-slate-500 font-medium">Goyangkan atau klik tombol untuk membunyikan suara merdu krincingan.</p>

                    <div className="w-32 h-32 mx-auto bg-white rounded-3xl shadow-lg border-2 border-cyan-200 flex flex-col items-center justify-center text-3xl">
                      🔔
                      <span className="text-xs font-bold text-cyan-700 mt-1">{rattleCount} Bunyi</span>
                    </div>

                    <button
                      onClick={() => {
                        setRattleCount(rattleCount + 1);
                        if ('speechSynthesis' in window) {
                          const u = new SpeechSynthesisUtterance('Klining klining!');
                          u.lang = 'id-ID';
                          window.speechSynthesis.speak(u);
                        }
                      }}
                      className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-extrabold text-xs rounded-2xl shadow cursor-pointer"
                    >
                      Goyangkan Kerincingan! 🔔
                    </button>
                  </div>

                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. MODUL BALITA (1-5 THN) + FITUR INTERAKTIF BALITA */}
        {activeMenu === 'balita' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">Modul Balita (1–5 Tahun)</h2>
                  <p className="text-xs text-slate-500 font-semibold">Panduan Stimulasi & Permainan Interaktif Balita</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setBalitaSubTab('panduan')}
                    className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                      balitaSubTab === 'panduan' ? 'bg-[#00A884] text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Panduan Stimulasi
                  </button>
                  <button
                    onClick={() => setBalitaSubTab('interaktif')}
                    className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                      balitaSubTab === 'interaktif' ? 'bg-[#00A884] text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    ✨ Interaktif Balita
                  </button>
                </div>
              </div>

              {balitaSubTab === 'panduan' ? (
                <BalitaStimulasi />
              ) : (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-4">
                    <h3 className="text-sm font-extrabold text-amber-900 flex items-center gap-2">
                      <Music className="w-5 h-5 text-amber-600" />
                      1. Tebak Suara Hewan & Kata Balita
                    </h3>
                    <p className="text-xs text-amber-800">Klik ikon di bawah untuk memperdengarkan suara hewan kepada si kecil:</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { name: 'Kucing', sound: 'Meeong! Meong!', icon: '🐱' },
                        { name: 'Anjing', sound: 'Guk guk guk!', icon: '🐶' },
                        { name: 'Bebek', sound: 'Kwek kwek kwek!', icon: '🦆' },
                        { name: 'Sapi', sound: 'Mooooo!', icon: '🐮' }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setActiveAnimalSound(item.sound);
                            if ('speechSynthesis' in window) {
                              const u = new SpeechSynthesisUtterance(`${item.name}. Suaranya: ${item.sound}`);
                              u.lang = 'id-ID';
                              window.speechSynthesis.speak(u);
                            }
                          }}
                          className="p-4 bg-white rounded-2xl border border-amber-200 shadow-xs hover:border-amber-400 text-center flex flex-col items-center cursor-pointer"
                        >
                          <span className="text-3xl mb-1">{item.icon}</span>
                          <span className="text-xs font-extrabold text-slate-800">{item.name}</span>
                        </button>
                      ))}
                    </div>

                    {activeAnimalSound && (
                      <div className="p-3 bg-white text-emerald-800 font-extrabold text-xs rounded-xl border border-emerald-200 text-center">
                        Suara: "{activeAnimalSound}" 🔊
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. CATATAN PERTUMBUHAN + ENTRY FOTO & SIMPAN */}
        {activeMenu === 'pertumbuhan' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-rose-100 text-rose-500 rounded-2xl">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">Catatan & Status Pertumbuhan</h2>
                  <p className="text-xs text-slate-500 font-semibold">Sertakan foto pengukuran dan simpan permanen ke sistem</p>
                </div>
              </div>

              {/* FORM PENGUKURAN BARU */}
              <form onSubmit={handleAddGrowthLog} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-8 space-y-4">
                <h4 className="text-xs font-extrabold text-slate-700 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#00A884]" /> Tambah Pengukuran + Foto Baru
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500">Tanggal Pengukuran</label>
                    <input
                      type="date"
                      value={newLog.date}
                      onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500">Usia (Bulan)</label>
                    <input
                      type="number"
                      placeholder="Contoh: 24"
                      value={newLog.ageMonths}
                      onChange={(e) => setNewLog({ ...newLog, ageMonths: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500">Berat Badan (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Contoh: 12.2"
                      value={newLog.weight}
                      onChange={(e) => setNewLog({ ...newLog, weight: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500">Tinggi Badan (cm)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Contoh: 87.5"
                      value={newLog.height}
                      onChange={(e) => setNewLog({ ...newLog, height: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
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
                      className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500">Upload Foto Pengukuran</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(e, (base64) => setNewLog({ ...newLog, photoUrl: base64 }))}
                      className="w-full mt-1 px-2 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>

                {newLog.photoUrl && (
                  <div className="flex items-center gap-2">
                    <img src={newLog.photoUrl} alt="Preview" className="w-12 h-12 rounded-xl object-cover border" />
                    <span className="text-xs font-bold text-emerald-600">Foto Siap Disimpan ✓</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-[#00A884] hover:bg-emerald-600 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Simpan Catatan Pertumbuhan
                </button>
              </form>

              {/* TABEL CATATAN */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase">
                      <th className="py-3 px-2">Foto</th>
                      <th className="py-3 px-2">Tanggal</th>
                      <th className="py-3 px-2">Usia</th>
                      <th className="py-3 px-2">BB / TB</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {growthLogs.map((log: any) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="py-3 px-2">
                          {log.photoUrl ? (
                            <img src={log.photoUrl} alt="Foto" className="w-10 h-10 rounded-xl object-cover border" />
                          ) : (
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                              <Camera className="w-4 h-4" />
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-2">{log.date}</td>
                        <td className="py-3 px-2">{log.ageMonths} Bln</td>
                        <td className="py-3 px-2">{log.weight} kg / {log.height} cm</td>
                        <td className="py-3 px-2">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getGrowthStatus(log.weight).color}`}>
                            {getGrowthStatus(log.weight).status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button onClick={() => handleDeleteGrowthLog(log.id)} className="text-rose-400 hover:text-rose-600 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 5. JADWAL IMUNISASI + TANGGAL + ENTRY FOTO & SIMPAN */}
        {activeMenu === 'imunisasi' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 text-blue-500 rounded-2xl">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800">Jadwal & Rekam Imunisasi</h2>
                    <p className="text-xs text-slate-500 font-semibold">Isi tanggal pemberian & foto sertifikat/bukti imunisasi</p>
                  </div>
                </div>

                <button
                  onClick={handleSaveVaccinesAll}
                  className="bg-[#00A884] hover:bg-emerald-600 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Simpan Semua Jadwal
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {vaccines.map((v: any) => (
                  <div key={v.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleUpdateVaccine(v.id, { done: !v.done })}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                            v.done ? 'bg-[#00A884] text-white' : 'border-2 border-slate-300'
                          }`}
                        >
                          {v.done && <Check className="w-4 h-4 stroke-[3]" />}
                        </button>

                        <div>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                            Target Usia: {v.age}
                          </span>
                          <h4 className="text-xs font-extrabold text-slate-800 mt-0.5">{v.name}</h4>
                        </div>
                      </div>

                      {/* ENTRY TANGGAL IMUNISASI */}
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <label className="text-[10px] font-bold text-slate-500">Tgl Diberikan:</label>
                        <input
                          type="date"
                          value={v.dateGiven || ''}
                          onChange={(e) => handleUpdateVaccine(v.id, { dateGiven: e.target.value })}
                          className="px-2 py-1 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                    </div>

                    {/* ENTRY FOTO BUKTI IMUNISASI */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                      <div className="flex items-center gap-2">
                        {v.photoUrl ? (
                          <img src={v.photoUrl} alt="Bukti Imunisasi" className="w-10 h-10 rounded-xl object-cover border" />
                        ) : (
                          <span className="text-[11px] text-slate-400 font-medium">Belum ada foto bukti</span>
                        )}

                        <label className="text-[10px] font-extrabold text-[#00A884] bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 cursor-pointer hover:bg-emerald-100 flex items-center gap-1">
                          <Camera className="w-3.5 h-3.5" />
                          <span>{v.photoUrl ? 'Ganti Foto' : 'Upload Foto Bukti'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(e, (base64) => handleUpdateVaccine(v.id, { photoUrl: base64 }))}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <button
                        onClick={() => handleSaveVaccinesAll()}
                        className="text-xs font-extrabold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" /> Simpan Baris Ini
                      </button>
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
                  <p className="text-xs text-slate-500 font-semibold">Resep gizi seimbang & bookmark resep favorit</p>
                </div>
              </div>

              <div className="flex justify-center gap-2 mb-8">
                {(['6-8', '9-11', '12-24'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMpasiCategory(cat)}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                      mpasiCategory === cat ? 'bg-[#00A884] text-white shadow-md' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Usia {cat} Bulan
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mpasiData[mpasiCategory].recipes.map((r, i) => {
                  const isFav = favoriteRecipes.includes(r.name);
                  return (
                    <div key={i} className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-slate-50/70">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-extrabold text-slate-800 text-sm text-[#00A884]">{r.name}</h5>
                        <button
                          onClick={() => toggleFavoriteRecipe(r.name)}
                          className={`p-1.5 rounded-full ${isFav ? 'bg-rose-100 text-rose-500' : 'bg-white text-slate-300'}`}
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 font-medium"><strong>Bahan:</strong> {r.ingredients}</p>
                      <span className="inline-block text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                        {r.benefit}
                      </span>
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
                  <p className="text-xs text-slate-500 font-semibold">Artikel pengasuhan anak dari pakar tumbuh kembang</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {articles.map((art) => {
                  const isLiked = likedArticles.includes(art.id);
                  return (
                    <div
                      key={art.id}
                      onClick={() => setSelectedArticle(art)}
                      className="border border-slate-200 rounded-2xl p-5 hover:border-purple-300 transition-all cursor-pointer space-y-3 bg-white"
                    >
                      <div className="flex items-center justify-between text-[10px] font-extrabold text-purple-600">
                        <span>{art.category}</span>
                        <span className="text-slate-400">{art.readTime}</span>
                      </div>
                      <h4 className="font-extrabold text-slate-800 text-sm leading-snug">{art.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-3 font-medium">{art.summary}</p>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="text-xs font-bold text-[#00A884]">Baca Artikel →</span>
                        <button onClick={(e) => toggleLikeArticle(art.id, e)} className={isLiked ? 'text-pink-500' : 'text-slate-300'}>
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-pink-500' : ''}`} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedArticle && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
                  <button onClick={() => setSelectedArticle(null)} className="absolute top-4 right-4 text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-extrabold text-slate-800">{selectedArticle.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{selectedArticle.content}</p>
                  <button onClick={() => setSelectedArticle(null)} className="w-full bg-[#00A884] text-white text-xs font-bold py-2.5 rounded-xl shadow">
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