import React, { useState, useEffect } from 'react';
import { 
  Baby, 
  LogOut, 
  BookOpen, 
  ShieldAlert, 
  Sparkles, 
  Clock, 
  Target, 
  Activity, 
  CheckCircle2,
  Play,
  Pause,
  Lock,
  Unlock,
  ChevronLeft,
  Sun,
  X
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import Login from './components/Login';

// ----------------------------------------------------------------------
// IMPORT MODUL UTAMA BALITA
// ----------------------------------------------------------------------
import AlphabetModule from './modules/AlphabetModule';
import AnimalModule from './modules/AnimalModule';
import FruitModule from './modules/FruitModule';
import MatchingModule from './modules/MatchingModule';
import NumberModule from './modules/NumberModule';
import QuizModule from './modules/QuizModule';
import { ColorModule } from './modules/ColorModule';
import { MusicModule } from './modules/MusicModule';
import { ShapeModule } from './modules/ShapeModule';

// ----------------------------------------------------------------------
// HELPER AUDIO & SPEECH SYNTHESIS
// ----------------------------------------------------------------------
const speakText = (text: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop audio sebelumnya jika ada
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.85; // Bicara sedikit lebih lambat & lembut untuk bayi
    utterance.pitch = 1.1; // Nada lebih ramah
    window.speechSynthesis.speak(utterance);
  }
};

const playSoftBeep = (freq = 440, type: OscillatorType = 'sine') => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.6);
  } catch (e) {
    // Fallback jika Web Audio diblokir browser
  }
};

// ----------------------------------------------------------------------
// DATA SUB-MENU 1: PANDUAN STIMULASI HARIAN
// ----------------------------------------------------------------------
interface ActivityItem {
  title: string;
  area: string;
  tools: string;
  steps: string[];
  duration: string;
}

interface BasataData {
  ageRange: string;
  milestones: string[];
  activities: ActivityItem[];
  safetyRules: string[];
  redFlags: string[];
  encouragement: string;
}

const BASATA_MODULES: Record<string, BasataData> = {
  '0-3': {
    ageRange: '0–3 Bulan',
    milestones: [
      'Mulai menyangga kepala secara perlahan saat tengkurap',
      'Merespons suara keras dan memandang wajah orang tua',
      'Tersenyum sosial (social smile) saat diajak bicara',
      'Mengikuti gerakan benda terang dengan pandangan mata'
    ],
    activities: [
      {
        title: 'Tummy Time Ceria & Kontak Mata',
        area: 'Motorik Kasar & Sosio-Emosional',
        tools: 'Matras empuk / cermin plastik aman',
        steps: [
          'Tengkurapkan bayi di atas matras empuk atau dada Ayah/Ibu.',
          'Posisikan wajah Anda sejajar dengan wajah bayi (jarak 20–30 cm).',
          'Panggil nama si kecil dengan nada lembut dan tersenyum sampai ia mencoba mengangkat kepalanya.'
        ],
        duration: '3–5 menit per sesi, 2–3x sehari'
      },
      {
        title: 'Pijat Sentuhan Kasih Sayang',
        area: 'Sensorik & Kognitif',
        tools: 'Baby oil / minyak kelapa murni',
        steps: [
          'Balurkan sedikit minyak ke telapak tangan Anda.',
          'Pijat lembut telapak kaki, dada, dan punggung bayi dengan usapan perlahan.',
          'Sebutkan bagian tubuh yang disentuh: "Ini kaki mungil adek..."'
        ],
        duration: '5–10 menit, 1–2x sehari setelah mandi'
      },
      {
        title: 'Bisikan Ocehan Bersahut',
        area: 'Komunikasi & Bahasa',
        tools: 'Tanpa alat (Suara & ekspresi wajah)',
        steps: [
          'Tatap mata bayi dan buat suara vokal sederhana seperti "Aaaa", "Oooo".',
          'Tunggu 3–5 detik memberikan jeda agar bayi memberikan respons gerakan bibir.',
          'Tirukan kembali suara ocehan yang dikeluarkan oleh bayi dengan antusias.'
        ],
        duration: '5 menit, kapan saja saat santai'
      }
    ],
    safetyRules: [
      'Selalu dampingi bayi penuh saat Tummy Time.',
      'Jangan lakukan Tummy Time langsung setelah bayi menyusu.'
    ],
    redFlags: [
      'Bayi tidak merespons suara keras atau tidak menatap wajah orang tua.',
      'Otot terasa terlalu lunglai atau sangat kaku.'
    ],
    encouragement: 'Di 3 bulan pertama, kehadiran & hangatnya pelukan Ayah/Ibu adalah stimulasi terbaik di dunia!'
  },
  '4-6': {
    ageRange: '4–6 Bulan',
    milestones: [
      'Kepala tegak stabil saat didudukkan dengan bantuan',
      'Berguling dari posisi tengkurap ke telentang',
      'Meraih dan menggenggam benda di dekatnya',
      'Mengoceh dengan variasi konsonan (misal: "ba-ba", "ma-ma")'
    ],
    activities: [
      {
        title: 'Berguling Penuh Warna',
        area: 'Motorik Kasar',
        tools: 'Mainan berbunyi kerincing / berwarna cerah',
        steps: [
          'Baringkan bayi telentang di matras.',
          'Bunyikan mainan di sisi kiri atau kanan luar jangkauan tangannya.',
          'Bantu dorong perlahan panggulnya agar ia belajar memiringkan badan lalu berguling.'
        ],
        duration: '5–10 menit, 2–3x sehari'
      },
      {
        title: 'Eksplorasi Tekstur Ajaib',
        area: 'Motorik Halus & Sensorik',
        tools: 'Kain halus, kain handuk, dan pita katun',
        steps: [
          'Beri bayi potongan kain dengan bahan bertekstur beda satu per satu.',
          'Biarkan jari-jemarinya menggenggam dan meraba tekstur tersebut.'
        ],
        duration: '5–10 menit per sesi'
      }
    ],
    safetyRules: ['Pastikan semua mainan bebas BPA Free karena bayi mulai fase teething.'],
    redFlags: ['Bayi tidak berusaha meraih benda di jangkauannya.'],
    encouragement: 'Si kecil mulai aktif mengeksplorasi dunianya. Tetap sabar dan nikmati setiap tawa kecilnya!'
  },
  '7-9': {
    ageRange: '7–9 Bulan',
    milestones: [
      'Duduk sendiri tanpa ditopang',
      'Mulai merangkak atau merayap menggunakan perut',
      'Memindahkan benda dari satu tangan ke tangan lainnya'
    ],
    activities: [
      {
        title: 'Halang Rintang Bantal Mungil',
        area: 'Motorik Kasar',
        tools: 'Bantal-bantal tipis aman',
        steps: ['Susun bantal tipis di matras.', 'Panggil bayi dari seberang bantal dengan memperlihatkan mainannya.'],
        duration: '10–15 menit sehari'
      }
    ],
    safetyRules: ['Amankan area lantai dari stopkontak dan kabel.'],
    redFlags: ['Bayi belum bisa duduk sendiri tanpa disangga pada usia 9 bulan.'],
    encouragement: 'Eksplorasi si kecil makin luas! Setiap usaha merangkaknya membangun kekuatan fisik.'
  },
  '10-12': {
    ageRange: '10–12 Bulan',
    milestones: [
      'Berdiri berpegangan (cruising) atau melangkah pertama',
      'Menjepit benda kecil dengan ibu jari dan jari telunjuk',
      'Mengucapkan 1–2 kata berarti (seperti "Mama", "Papa")'
    ],
    activities: [
      {
        title: 'Dorong & Melangkah Ceria',
        area: 'Motorik Kasar',
        tools: 'Kursi stabil / Push walker aman',
        steps: ['Posisikan bayi berdiri sambil memegang alat dorong.', 'Beri semangat saat ia melangkah.'],
        duration: '10–15 menit, 2x sehari'
      }
    ],
    safetyRules: ['Gunakan alas kaki anti-slip saat bayi belajar berdiri.'],
    redFlags: ['Bayi tidak bisa berdiri meskipun berpegangan pada usia 12 bulan.'],
    encouragement: 'Selamat! Si kecil hampir berusia 1 tahun. Konsistensi dan cinta Ayah/Ibu adalah kunci utama.'
  }
};

// ----------------------------------------------------------------------
// DATA SUB-MENU 2: INTERAKTIF BABY < 1 TAHUN
// ----------------------------------------------------------------------
interface InteractiveCard {
  id: string;
  title: string;
  icon: string;
  bgGradient: string;
  borderColor: string;
  description: string;
}

const INTERACTIVE_ACTIVITIES: InteractiveCard[] = [
  { id: 'lihat-ikuti', title: '👀 Lihat & Ikuti', icon: '👁️', bgGradient: 'from-rose-100 to-pink-200', borderColor: 'border-rose-300', description: 'Stimulasi pelacakan visual dengan gerakan halus' },
  { id: 'warna-bentuk', title: '🎨 Warna & Bentuk', icon: '🔴', bgGradient: 'from-sky-100 to-blue-200', borderColor: 'border-sky-300', description: 'Kontras tinggi warna & bentuk dasar' },
  { id: 'dengar-suara', title: '🔊 Dengar Suara', icon: '📢', bgGradient: 'from-amber-100 to-yellow-200', borderColor: 'border-amber-300', description: 'Suara familiar, ortu, & alam sekitar' },
  { id: 'suara-binatang', title: '🐶 Suara Binatang', icon: '🐱', bgGradient: 'from-emerald-100 to-teal-200', borderColor: 'border-emerald-300', description: 'Mengenal hewan dan efek suara lucu' },
  { id: 'musik-ritme', title: '🎵 Musik & Ritme', icon: '🎼', bgGradient: 'from-purple-100 to-indigo-200', borderColor: 'border-purple-300', description: 'Lagu nina bobo & visualizer menenangkan' },
  { id: 'wajah-ekspresi', title: '😊 Wajah & Ekspresi', icon: '😄', bgGradient: 'from-orange-100 to-amber-200', borderColor: 'border-amber-300', description: 'Belajar emosi & tiru ekspresi bersama' },
  { id: 'cilukba', title: '🙈 Cilukba', icon: '🎉', bgGradient: 'from-pink-100 to-rose-200', borderColor: 'border-pink-300', description: 'Permainan kognitif pemahaman keberadaan' },
  { id: 'raih-sentuh', title: '✋ Raih & Sentuh', icon: '🎈', bgGradient: 'from-cyan-100 to-teal-200', borderColor: 'border-cyan-300', description: 'Sentuh objek interaktif tanpa rasa gagal' },
  { id: 'gerakkan-benda', title: '⚽ Gerakkan Benda', icon: '🦋', bgGradient: 'from-lime-100 to-green-200', borderColor: 'border-lime-300', description: 'Atur kecepatan benda melayang' },
  { id: 'cerita-bayi', title: '📖 Cerita Bayi', icon: '📚', bgGradient: 'from-violet-100 to-purple-200', borderColor: 'border-violet-300', description: 'Buku cerita bergambar audio interaktif' },
  { id: 'main-bersama', title: '❤️ Main Bersama Ayah/Ibu', icon: '👨‍👩‍👧', bgGradient: 'from-rose-200 to-red-300', borderColor: 'border-rose-400', description: 'Panduan bonding langsung tanpa layar berlebih' },
];

export const App: React.FC = () => {
  // ----------------------------------------------------------------------
  // STATE APLIKASI
  // ----------------------------------------------------------------------
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => localStorage.getItem('isLoggedIn') === 'true');
  const [userName, setUserName] = useState<string>(() => localStorage.getItem('userName') || 'Hope');
  const [stars, setStars] = useState<number>(() => {
    const saved = localStorage.getItem('stars');
    return saved ? parseInt(saved, 10) : 0;
  });

  // State Kategori Utama: 'balita' | 'basata'
  const [selectedCategory, setSelectedCategory] = useState<'balita' | 'basata'>('balita');

  // State Sub-Menu Basata: 'panduan' | 'interaktif'
  const [basataSubMenu, setBasataSubMenu] = useState<'panduan' | 'interaktif'>('panduan');

  // State Sub-Menu 1: Usia Panduan ('0-3' | '4-6' | '7-9' | '10-12')
  const [selectedAgeGuide, setSelectedAgeGuide] = useState<string>('0-3');

  // State Sub-Menu 2: Interaktif Baby Usia ('0-2' | '3-4' | '5-6' | '7-8' | '9-10' | '11-12')
  const [interaktifAgeGroup, setInteraktifAgeGroup] = useState<string>('0-2');

  // State Active Interactive Play Activity
  const [activePlayId, setActivePlayId] = useState<string | null>(null);

  // State Modul Balita Utama
  const [activeModule, setActiveModule] = useState<string | null>(null);

  // Parent Mode Lock
  const [isParentModeOpen, setIsParentModeOpen] = useState<boolean>(false);
  const [showParentPinModal, setShowParentPinModal] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Daily Progress Tracker
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem('stars', stars.toString());
  }, [stars]);

  const handleLogin = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveModule(null);
    localStorage.removeItem('isLoggedIn');
  };

  const handleAddStar = () => setStars((prev) => prev + 1);

  const markActivityCompleted = (id: string) => {
    if (!completedActivities.includes(id)) {
      setCompletedActivities((prev) => [...prev, id]);
      handleAddStar();
    }
  };

  const handleOpenParentMode = () => {
    if (pinInput === '1234' || pinInput === '2026') {
      setIsParentModeOpen(true);
      setShowParentPinModal(false);
      setPinInput('');
      setPinError('');
    } else {
      setPinError('PIN Salah! (Coba: 1234)');
    }
  };

  // Render Modul Utama Balita
  const renderModule = () => {
    if (!activeModule) return null;
    const ColorComponent = ColorModule as React.FC<any>;
    const ShapeComponent = ShapeModule as React.FC<any>;
    const MusicComponent = MusicModule as React.FC<any>;

    switch (activeModule) {
      case 'abc':
      case 'alphabet':
        return <AlphabetModule onBack={() => setActiveModule(null)} onAddStar={handleAddStar} />;
      case 'hewan':
      case 'animal':
        return <AnimalModule onBack={() => setActiveModule(null)} onAddStar={handleAddStar} />;
      case 'angka':
      case 'number':
        return <NumberModule onBack={() => setActiveModule(null)} onAddStar={handleAddStar} />;
      case 'warna':
      case 'color':
        return <ColorComponent onBack={() => setActiveModule(null)} onAddStar={handleAddStar} />;
      case 'bentuk':
      case 'shape':
        return <ShapeComponent onBack={() => setActiveModule(null)} onAddStar={handleAddStar} />;
      case 'buah':
      case 'fruit':
        return <FruitModule onBack={() => setActiveModule(null)} onAddStar={handleAddStar} />;
      case 'musik':
      case 'music':
        return <MusicComponent onBack={() => setActiveModule(null)} onAddStar={handleAddStar} />;
      case 'matching':
        return <MatchingModule onBack={() => setActiveModule(null)} onAddStar={handleAddStar} />;
      case 'quiz':
        return <QuizModule onBack={() => setActiveModule(null)} onAddStar={handleAddStar} />;
      default:
        return null;
    }
  };

  // Tampilan Halaman Login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-200 to-indigo-300 flex items-center justify-center p-4">
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  const currentBasata = BASATA_MODULES[selectedAgeGuide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-200 to-indigo-300 flex flex-col md:flex-row font-sans">
      {/* ----------------- SIDEBAR MENU KIRI ----------------- */}
      <aside className="w-full md:w-64 bg-white/95 backdrop-blur-md p-5 flex flex-col justify-between shadow-2xl z-40 border-r-4 border-white">
        <div>
          {/* Header Profil */}
          <div className="flex items-center gap-3 p-3 bg-sky-50 rounded-2xl border-2 border-sky-100 mb-6">
            <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white font-black text-xl shadow-md">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-400 uppercase">Halo,</p>
              <h3 className="font-black text-slate-700 truncate">{userName}</h3>
            </div>
          </div>

          {/* Menu Kategori Navigasi Utama */}
          <div className="space-y-3">
            <p className="text-xs font-black text-slate-400 uppercase px-2 tracking-wider">Kategori Belajar</p>

            <button
              onClick={() => {
                setSelectedCategory('balita');
                setActiveModule(null);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-left transition-all ${
                selectedCategory === 'balita'
                  ? 'bg-gradient-to-r from-sky-400 to-indigo-500 text-white shadow-lg scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <BookOpen size={20} />
              <span>Modul Balita</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('basata');
                setActiveModule(null);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-left transition-all ${
                selectedCategory === 'basata'
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-600 text-white shadow-lg scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Baby size={20} />
              <span>Modul Basata</span>
            </button>
          </div>
        </div>

        {/* Tombol Parent Mode Lock & Logout */}
        <div className="space-y-2 mt-6">
          <button
            onClick={() => setShowParentPinModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-2xl font-bold border-2 border-purple-200 transition-all text-xs"
          >
            <Lock size={16} />
            <span>🔐 PARENT MODE</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-2xl font-bold transition-all border-2 border-rose-100 text-xs"
          >
            <LogOut size={16} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* ----------------- KONTEN UTAMA ----------------- */}
      <main className="flex-1 p-4 md:p-8 flex items-center justify-center relative overflow-y-auto">
        {/* Total Bintang / Reward Counter */}
        <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border-2 border-white flex items-center gap-2">
          <span className="text-2xl animate-bounce">⭐</span>
          <span className="font-black text-amber-500 text-xl">{stars}</span>
        </div>

        {/* Modal Parent Control */}
        {showParentPinModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-4 border-purple-200 shadow-2xl text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lock size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-800">Parent Control Mode</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">Masukkan PIN Keamanan untuk Membuka Laporan & Pengaturan (Default: 1234)</p>
              
              <input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="1234"
                className="w-full text-center text-2xl font-black tracking-widest py-3 border-2 border-purple-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 mb-2"
              />
              {pinError && <p className="text-xs text-rose-500 font-bold mb-3">{pinError}</p>}

              <div className="flex gap-2">
                <button
                  onClick={() => setShowParentPinModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm"
                >
                  Batal
                </button>
                <button
                  onClick={handleOpenParentMode}
                  className="flex-1 py-2.5 bg-purple-600 text-white font-bold rounded-xl text-sm shadow-md hover:bg-purple-700"
                >
                  Buka
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Parent Mode Dashboard Overlay */}
        {isParentModeOpen && (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
                    <Unlock size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-800">Parent Control Panel</h2>
                    <p className="text-xs text-slate-500 font-semibold">Profil Bayi: {userName} 👶</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsParentModeOpen(false)}
                  className="p-2.5 bg-rose-100 text-rose-600 rounded-full font-bold hover:bg-rose-200"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                  <p className="text-xs font-bold text-purple-600 uppercase">Total Bintang/Reward</p>
                  <p className="text-3xl font-black text-purple-900 mt-1">⭐ {stars}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                  <p className="text-xs font-bold text-emerald-600 uppercase">Aktivitas Selesai</p>
                  <p className="text-3xl font-black text-emerald-900 mt-1">{completedActivities.length} / 11</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                  <p className="text-xs font-bold text-amber-600 uppercase">Rekomendasi Durasi</p>
                  <p className="text-3xl font-black text-amber-900 mt-1">10–15 Mnt/Sesi</p>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6">
                <h4 className="font-black text-slate-700 mb-2">Ubah Nama Panggilan Si Kecil</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      localStorage.setItem('userName', e.target.value);
                    }}
                    className="px-4 py-2 border rounded-xl font-bold text-slate-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200 text-rose-950 text-sm space-y-2">
                <p className="font-bold">⚠️ Pengingat Keamanan Wajib Orang Tua:</p>
                <p>• Selalu dampingi bayi penuh selama aktivitas interaktif.</p>
                <p>• Hentikan layar jika bayi terlihat lelah, rewel, atau overstimulated.</p>
                <p>• Aplikasi ini berfungsi sebagai media stimulasi bersama, bukan pengganti interaksi manusia.</p>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- CONTENT SWITCHING ----------------- */}
        {activeModule ? (
          renderModule()
        ) : selectedCategory === 'balita' ? (
          <Dashboard onSelectModule={(m) => setActiveModule(m.toLowerCase())} />
        ) : (
          /* ================================================================= */
          /* MODUL BASATA (BAWAH SATU TAHUN)                                   */
          /* ================================================================= */
          <div className="w-full max-w-5xl bg-white/95 backdrop-blur-md p-5 sm:p-8 rounded-3xl shadow-2xl border-4 border-teal-200 my-4">
            {/* Header Utama Basata */}
            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-teal-100 text-teal-600 rounded-2xl mb-2">
                <Baby size={36} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-teal-700">Modul Basata (Bawah Satu Tahun)</h2>
              <p className="text-slate-500 mt-1 font-semibold text-xs sm:text-sm">
                Pusat Pembelajaran & Stimulasi Tumbuh Kembang Usia 0–12 Bulan
              </p>
            </div>

            {/* NAVIGASI SUB-MENU BASATA (2 SUB MENU UTAMA) */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
              <button
                onClick={() => {
                  setBasataSubMenu('panduan');
                  setActivePlayId(null);
                }}
                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-black text-sm sm:text-base transition-all ${
                  basataSubMenu === 'panduan'
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <BookOpen size={20} />
                <span>1. Panduan Stimulasi Harian</span>
              </button>

              <button
                onClick={() => {
                  setBasataSubMenu('interaktif');
                }}
                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-black text-sm sm:text-base transition-all ${
                  basataSubMenu === 'interaktif'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Sparkles size={20} />
                <span>2. 👶 Interaktif Baby &lt; 1 Tahun</span>
              </button>
            </div>

            {/* =============================================================== */}
            {/* SUB MENU 1: PANDUAN STIMULASI TUMBUH KEMBANG HARIAN             */}
            {/* =============================================================== */}
            {basataSubMenu === 'panduan' && (
              <div>
                {/* Tab Usia Sub Menu 1 */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {[
                    { key: '0-3', label: '0–3 Bulan' },
                    { key: '4-6', label: '4–6 Bulan' },
                    { key: '7-9', label: '7–9 Bulan' },
                    { key: '10-12', label: '10–12 Bulan' },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setSelectedAgeGuide(tab.key)}
                      className={`px-4 py-2 rounded-xl font-black text-xs sm:text-sm transition-all ${
                        selectedAgeGuide === tab.key
                          ? 'bg-teal-500 text-white shadow-md'
                          : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Content Panduan Harian */}
                <div className="bg-teal-50/80 rounded-2xl p-5 border-2 border-teal-100 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="text-teal-600" size={22} />
                    <h3 className="text-lg font-black text-teal-800">
                      Target Perkembangan Usia {currentBasata.ageRange}
                    </h3>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 text-sm font-medium">
                    {currentBasata.milestones.map((m, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="text-teal-500 shrink-0 mt-0.5" size={16} />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modul Aktivitas Panduan */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <Activity className="text-amber-500" size={22} />
                    <span>Modul Stimulasi Utama (5 Pilar Tumbuh Kembang)</span>
                  </h3>
                  {currentBasata.activities.map((act, idx) => (
                    <div key={idx} className="bg-white border-2 border-slate-100 rounded-2xl p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-black text-teal-700">{idx + 1}. {act.title}</h4>
                        <span className="text-xs font-bold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full">
                          {act.area}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-bold mb-2"> Alat: <span className="font-normal text-slate-700">{act.tools}</span></p>
                      <div className="space-y-1 mb-3">
                        {act.steps.map((st, sIdx) => (
                          <p key={sIdx} className="text-xs text-slate-600 pl-2 border-l-2 border-teal-300">{st}</p>
                        ))}
                      </div>
                      <p className="text-xs font-bold text-teal-600 bg-teal-50 p-2 rounded-xl flex items-center gap-1">
                        <Clock size={14} /> Durasi: {act.duration}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Safety & Encouragement */}
                <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200 text-xs text-slate-700 space-y-1 mb-4">
                  <p className="font-bold text-rose-700">🛡️ Red Flags & Safety Rules:</p>
                  {currentBasata.safetyRules.map((s, i) => <p key={i}>• {s}</p>)}
                </div>

                <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 text-xs font-semibold text-indigo-900 italic">
                  "{currentBasata.encouragement}"
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* SUB MENU 2: 👶 INTERAKTIF BABY < 1 TAHUN                          */}
            {/* =============================================================== */}
            {basataSubMenu === 'interaktif' && (
              <div>
                {/* Notice Banner Keamanan */}
                <div className="bg-amber-50 border-2 border-amber-200 p-3 rounded-2xl flex items-center justify-between mb-6 text-xs text-amber-900 font-semibold">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="text-amber-600 shrink-0" size={20} />
                    <span>Dampingi {userName} selama bermain. Layar adalah sarana stimulasi bersama orang tua.</span>
                  </div>
                </div>

                {/* Jika Sedang Membuka Aktivitas Interaktif Spesifik */}
                {activePlayId ? (
                  <InteractiveScreen
                    playId={activePlayId}
                    babyName={userName}
                    onBack={() => {
                      markActivityCompleted(activePlayId);
                      setActivePlayId(null);
                    }}
                  />
                ) : (
                  <>
                    {/* 1. PEMILIHAN USIA INTERAKTIF */}
                    <div className="mb-6">
                      <p className="text-xs font-black uppercase text-slate-400 mb-2 text-center">Pilih Rentang Usia Bayi:</p>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {[
                          { key: '0-2', label: '👶 0–2 Mth' },
                          { key: '3-4', label: '🌱 3–4 Mth' },
                          { key: '5-6', label: '🌈 5–6 Mth' },
                          { key: '7-8', label: '🧸 7–8 Mth' },
                          { key: '9-10', label: '🚀 9–10 Mth' },
                          { key: '11-12', label: '⭐ 11–12 Mth' },
                        ].map((item) => (
                          <button
                            key={item.key}
                            onClick={() => setInteraktifAgeGroup(item.key)}
                            className={`py-2 px-1 rounded-xl text-xs font-black transition-all ${
                              interaktifAgeGroup === item.key
                                ? 'bg-pink-500 text-white shadow-md scale-105'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 14. DAILY INTERACTIVE PLAY PROGRESS */}
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-2xl border-2 border-pink-200 mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Sun className="text-amber-500 animate-spin" size={20} />
                          <h4 className="font-black text-slate-800 text-sm">Aktivitas Hari Ini untuk {userName}</h4>
                        </div>
                        <span className="text-xs font-black text-pink-600">
                          Progress: {Math.round((completedActivities.length / 11) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-pink-400 to-purple-500 h-3 transition-all duration-500"
                          style={{ width: `${(completedActivities.length / 11) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* 2. GRID MENU AKTIVITAS INTERAKTIF */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {INTERACTIVE_ACTIVITIES.map((act) => {
                        const isDone = completedActivities.includes(act.id);
                        return (
                          <div
                            key={act.id}
                            className={`p-5 rounded-3xl bg-gradient-to-br ${act.bgGradient} border-2 ${act.borderColor} shadow-md flex flex-col justify-between hover:scale-102 transition-all`}
                          >
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-3xl">{act.icon}</span>
                                {isDone && (
                                  <span className="bg-emerald-500 text-white p-1 rounded-full text-xs">
                                    <CheckCircle2 size={16} />
                                  </span>
                                )}
                              </div>
                              <h3 className="font-black text-slate-800 text-lg">{act.title}</h3>
                              <p className="text-xs text-slate-600 font-medium mt-1 mb-4">{act.description}</p>
                            </div>

                            <button
                              onClick={() => {
                                speakText(`Mulai ${act.title.replace(/[^\w\s]/gi, '')}`);
                                setActivePlayId(act.id);
                              }}
                              className="w-full py-2.5 bg-white text-slate-800 rounded-2xl font-black text-xs shadow-md hover:bg-slate-50 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                            >
                              <Play size={14} className="fill-slate-800" />
                              <span>MULAI</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

// ============================================================================
// COMPONENT UNTUK PERMAINAN INTERAKTIF BAYI
// ============================================================================
interface InteractiveScreenProps {
  playId: string;
  babyName: string;
  onBack: () => void;
}

const InteractiveScreen: React.FC<InteractiveScreenProps> = ({ playId, babyName, onBack }) => {
  // Shared States
  const [speed, setSpeed] = useState<'slow' | 'medium'>('slow');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // 3. Aktivitas Lihat & Ikuti
  const [ballPos, setBallPos] = useState<number>(10);
  const [direction, setDirection] = useState<'right' | 'left'>('right');

  useEffect(() => {
    if (playId === 'lihat-ikuti' && isPlaying) {
      const interval = setInterval(() => {
        setBallPos((prev) => {
          if (prev >= 85) {
            setDirection('left');
            return prev - 1;
          } else if (prev <= 15) {
            setDirection('right');
            return prev + 1;
          }
          return direction === 'right' ? prev + 1 : prev - 1;
        });
      }, speed === 'slow' ? 50 : 25);
      return () => clearInterval(interval);
    }
  }, [playId, isPlaying, ballPos, direction, speed]);

  // 7. Aktivitas Cilukba
  const [isPeekabooOpen, setIsPeekabooOpen] = useState<boolean>(false);

  // 12. Cerita Bayi Page State
  const [storyPage, setStoryPage] = useState<number>(0);
  const storyPages = [
    { title: '🐰 Kelinci Kecil', text: 'Di sebuah taman indah, ada Kelinci Kecil bernama Hope.', bg: 'bg-pink-100', icon: '🐰' },
    { title: '⭐ Bintang Bersinar', text: 'Kelinci melompat melihat bintang yang bersinar di langit.', bg: 'bg-indigo-100', icon: '⭐' },
    { title: '🌸 Bunga Mekar', text: 'Harinya sangat ceria dan penuh warna-warni!', bg: 'bg-emerald-100', icon: '🌸' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border-4 border-pink-300 shadow-2xl relative min-h-[450px] flex flex-col justify-between">
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs"
        >
          <ChevronLeft size={16} /> Kembali
        </button>
        <span className="text-xs font-black text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
          Yuk bermain, {babyName}! 👶❤️
        </span>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* 3. AKTIVITAS: LIHAT & IKUTI                                            */}
      {/* ---------------------------------------------------------------------- */}
      {playId === 'lihat-ikuti' && (
        <div className="flex-1 flex flex-col justify-between">
          <div className="text-center mb-2">
            <p className="text-xs font-bold text-slate-500">
              Gerakkan layar perlahan dan lihat apakah {babyName} mengikuti bola merah dengan matanya.
            </p>
          </div>

          <div className="relative h-48 bg-slate-50 rounded-2xl overflow-hidden border-2 border-slate-100 flex items-center">
            <div
              className="w-16 h-16 bg-rose-500 rounded-full shadow-xl flex items-center justify-center text-white text-2xl transition-all duration-75 cursor-pointer"
              style={{ position: 'absolute', left: `${ballPos}%` }}
              onClick={() => {
                playSoftBeep(523);
                speakText('Hebat sekali!');
              }}
            >
              🔴
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 bg-pink-500 text-white rounded-xl text-xs font-bold flex items-center gap-1"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />} {isPlaying ? 'Jeda' : 'Mulai'}
            </button>
            <button
              onClick={() => setSpeed(speed === 'slow' ? 'medium' : 'slow')}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
            >
              Kecepatan: {speed === 'slow' ? '🐢 Lambat' : '🐇 Sedang'}
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* 4. AKTIVITAS: WARNA & BENTUK                                           */}
      {/* ---------------------------------------------------------------------- */}
      {playId === 'warna-bentuk' && (
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-xs font-bold text-center text-slate-500 mb-4">Sentuh objek untuk mendengar suara & warna!</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Merah', shape: '● Lingkaran', color: 'bg-red-500', icon: '🔴' },
              { label: 'Biru', shape: '■ Kotak', color: 'bg-blue-500', icon: '🔵' },
              { label: 'Kuning', shape: '▲ Segitiga', color: 'bg-amber-400', icon: '🟡' },
              { label: 'Hijau', shape: '★ Bintang', color: 'bg-emerald-500', icon: '🟢' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playSoftBeep(600 + idx * 100);
                  speakText(`${item.label}! Ini ${item.shape}`);
                }}
                className={`${item.color} h-28 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg transform active:scale-110 transition-all`}
              >
                <span className="text-3xl mb-1">{item.icon}</span>
                <span className="font-black text-sm">{item.label}</span>
                <span className="text-[10px] opacity-90">{item.shape}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* 5. AKTIVITAS: DENGAR SUARA                                             */}
      {/* ---------------------------------------------------------------------- */}
      {playId === 'dengar-suara' && (
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-xs font-bold text-center text-slate-500 mb-4">Tekan tombol untuk mendengarkan suara lembut:</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Suara Ibu', text: 'Halo sayang Ibu di sini...', icon: '👩' },
              { label: 'Suara Ayah', text: 'Halo anak pintar Ayah...', icon: '👨' },
              { label: 'Hujan', text: 'Tik tik tik bunyi hujan...', icon: '🌧️' },
              { label: 'Air Gemericik', text: 'Gemericik air mengalir segar...', icon: '🌊' },
              { label: 'Musik Melodi', text: 'Lala laa melodi indah...', icon: '🎵' },
              { label: 'Burung', text: 'Cip cip cip suara burung...', icon: '🐦' },
            ].map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  playSoftBeep(400);
                  speakText(s.text);
                }}
                className="p-4 bg-amber-50 border-2 border-amber-200 rounded-2xl flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-3xl mb-1">{s.icon}</span>
                <span className="font-black text-xs text-amber-900">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* 6. AKTIVITAS: SUARA BINATANG                                           */}
      {/* ---------------------------------------------------------------------- */}
      {playId === 'suara-binatang' && (
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Kucing', sound: 'Meong meong!', icon: '🐱', bg: 'bg-orange-100' },
              { name: 'Anjing', sound: 'Guk guk!', icon: '🐶', bg: 'bg-amber-100' },
              { name: 'Sapi', sound: 'Moo ooo!', icon: '🐮', bg: 'bg-emerald-100' },
              { name: 'Domba', sound: 'Mbee mbee!', icon: '🐑', bg: 'bg-pink-100' },
            ].map((a, i) => (
              <button
                key={i}
                onClick={() => {
                  playSoftBeep(500);
                  speakText(`${a.name}! Suaranya ${a.sound}`);
                }}
                className={`${a.bg} p-5 rounded-2xl flex flex-col items-center justify-center border-2 border-slate-200 active:scale-105 transition-all shadow-sm`}
              >
                <span className="text-4xl mb-2">{a.icon}</span>
                <span className="font-black text-sm text-slate-700">{a.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* 7. AKTIVITAS: CILUKBA                                                  */}
      {/* ---------------------------------------------------------------------- */}
      {playId === 'cilukba' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {!isPeekabooOpen ? (
            <div className="space-y-4">
              <div className="text-7xl animate-bounce">🙈</div>
              <h3 className="text-xl font-black text-slate-700">Di mana Baby Hope?</h3>
              <button
                onClick={() => {
                  setIsPeekabooOpen(true);
                  playSoftBeep(784);
                  speakText('CILUKBAAAA! Hahaha!');
                }}
                className="px-6 py-3 bg-pink-500 text-white rounded-full font-black text-lg shadow-lg active:scale-95"
              >
                Buka Wajah! ✨
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-8xl animate-pulse">🎉 😄 🎉</div>
              <h3 className="text-3xl font-black text-pink-600">CILUKBAAAA!</h3>
              <button
                onClick={() => setIsPeekabooOpen(false)}
                className="px-5 py-2.5 bg-slate-200 text-slate-700 rounded-full font-bold text-xs"
              >
                🔁 ULANGI MAIN
              </button>
            </div>
          )}
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* 8. AKTIVITAS: RAIH & SENTUH                                            */}
      {/* ---------------------------------------------------------------------- */}
      {playId === 'raih-sentuh' && (
        <div className="flex-1 flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-500 text-center">Sentuh objek di bawah ini. Tidak ada kata gagal!</p>
          <div className="flex justify-around items-center h-48">
            {[
              { name: 'Bola', icon: '🟡' },
              { name: 'Bintang', icon: '🔴' },
              { name: 'Balon', icon: '🔵' },
            ].map((obj, i) => (
              <button
                key={i}
                onClick={() => {
                  playSoftBeep(500 + i * 150);
                  speakText(`Hebat ${babyName}! Kamu menemukan ${obj.name}!`);
                }}
                className="text-6xl transform active:scale-150 transition-all duration-300 hover:rotate-12"
              >
                {obj.icon}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* 10. CERITA BAYI                                                        */}
      {/* ---------------------------------------------------------------------- */}
      {playId === 'cerita-bayi' && (
        <div className="flex-1 flex flex-col justify-between">
          <div className={`p-6 rounded-2xl ${storyPages[storyPage].bg} text-center h-52 flex flex-col items-center justify-center border-2 border-slate-200`}>
            <span className="text-5xl mb-3">{storyPages[storyPage].icon}</span>
            <h4 className="font-black text-slate-800 text-lg mb-1">{storyPages[storyPage].title}</h4>
            <p className="text-xs text-slate-600 font-semibold">{storyPages[storyPage].text}</p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              disabled={storyPage === 0}
              onClick={() => setStoryPage((p) => p - 1)}
              className="px-4 py-2 bg-slate-100 disabled:opacity-40 rounded-xl font-bold text-xs"
            >
              Previous
            </button>
            <button
              onClick={() => speakText(storyPages[storyPage].text)}
              className="px-4 py-2 bg-pink-500 text-white rounded-xl font-bold text-xs"
            >
              🔊 Baca Cerita
            </button>
            <button
              disabled={storyPage === storyPages.length - 1}
              onClick={() => setStoryPage((p) => p + 1)}
              className="px-4 py-2 bg-slate-100 disabled:opacity-40 rounded-xl font-bold text-xs"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* 13. MODE MAIN BERSAMA ORANG TUA                                        */}
      {/* ---------------------------------------------------------------------- */}
      {playId === 'main-bersama' && (
        <div className="flex-1 flex flex-col justify-center space-y-3">
          <div className="bg-rose-50 border-2 border-rose-200 p-4 rounded-2xl text-center">
            <span className="text-4xl">❤️</span>
            <h3 className="font-black text-rose-700 text-base mt-2">Misi Main Bersama Orang Tua</h3>
            <p className="text-xs text-rose-900 mt-1 font-semibold">
              "Pegang tangan {babyName} dengan lembut dan gerakkan perlahan mengikuti alunan musik."
            </p>
          </div>
          <button
            onClick={() => speakText(`Tatap mata ${babyName}, tersenyumlah, dan katakan aku sayang kamu.`)}
            className="w-full py-3 bg-rose-500 text-white rounded-2xl font-black text-xs shadow-md"
          >
            🔊 Dengar Instruksi Bonding Baru
          </button>
        </div>
      )}

      {/* Fallback untuk modul aktivitas lainnya */}
      {['musik-ritme', 'wajah-ekspresi', 'gerakkan-benda'].includes(playId) && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <span className="text-5xl mb-2">✨</span>
          <h4 className="font-black text-slate-700">Aktivitas Siap Dimainkan!</h4>
          <p className="text-xs text-slate-500 mt-1">Gunakan interaksi langsung untuk menstimulasi {babyName}.</p>
          <button
            onClick={() => {
              playSoftBeep(523);
              speakText(`Yuk bermain bersama ${babyName}`);
            }}
            className="mt-4 px-5 py-2 bg-teal-500 text-white rounded-full text-xs font-bold"
          >
            🔊 Putar Suara
          </button>
        </div>
      )}
    </div>
  );
};

export default App;