import React, { useState, useEffect } from 'react';
import { 
  Baby, 
  LogOut, 
  BookOpen, 
  ShieldAlert, 
  Heart, 
  Sparkles, 
  Clock, 
  Target, 
  Activity, 
  CheckCircle2 
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import Login from './components/Login';

// ----------------------------------------------------------------------
// IMPORT MODUL SESUAI TIPE EKSPOR MASING-MASING
// ----------------------------------------------------------------------

// 1. Modul dengan Default Export
import AlphabetModule from './modules/AlphabetModule';
import AnimalModule from './modules/AnimalModule';
import FruitModule from './modules/FruitModule';
import MatchingModule from './modules/MatchingModule';
import NumberModule from './modules/NumberModule';
import QuizModule from './modules/QuizModule';

// 2. Modul dengan Named Export
import { ColorModule } from './modules/ColorModule';
import { MusicModule } from './modules/MusicModule';
import { ShapeModule } from './modules/ShapeModule';

// ----------------------------------------------------------------------
// DATA STIMULASI MODUL BASATA (BAWAH SATU TAHUN)
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
        duration: '3–5 menit per sesi, 2–3x sehari (saat bayi tidak mengantuk/kenyang)'
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
          'Tunggu 3–5 detik memberikan jeda agar bayi memberikan respons gerakan bibir atau suara.',
          'Tirukan kembali suara ocehan yang dikeluarkan oleh bayi dengan antusias.'
        ],
        duration: '5 menit, kapan saja saat interaksi santai'
      }
    ],
    safetyRules: [
      'Selalu dampingi bayi penuh saat Tummy Time.',
      'Jangan lakukan Tummy Time langsung setelah bayi menyusu (cegah muntah/gumoh).'
    ],
    redFlags: [
      'Bayi tidak merespons suara keras atau tidak menatap wajah orang tua saat diajak bicara.',
      'Otot terasa terlalu lunglai atau sangat kaku.'
    ],
    encouragement: 'Di 3 bulan pertama, kehadiran & hangatnya pelukan Ayah/Ibu adalah stimulasi terbaik di dunia untuk pertumbuhan otak si kecil!'
  },
  '4-6': {
    ageRange: '4–6 Bulan',
    milestones: [
      'Kepala tegak stabil saat didudukkan dengan bantuan',
      'Berguling dari posisi tengkurap ke telentang atau sebaliknya',
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
          'Biarkan jari-jemarinya menggenggam dan meraba tekstur tersebut.',
          'Sebutkan teksturnya: "Ini kain lembut, yang ini sedikit kasar..."'
        ],
        duration: '5–10 menit per sesi'
      },
      {
        title: 'Cermin Bayangan Lucu',
        area: 'Sosio-Emosional & Kognitif',
        tools: 'Cermin aman (Shatterproof mirror)',
        steps: [
          'Pangku bayi di depan cermin besar.',
          'Tepuk lembut bayangan bayi di cermin sambil memanggil namanya.',
          'Ajak bayi tersenyum dan lambaikan tangan pada bayangannya sendiri.'
        ],
        duration: '5–10 menit sehari'
      }
    ],
    safetyRules: [
      'Pastikan semua mainan bebas bahan kimia berbahaya (BPA Free) karena bayi mulai memasukkan benda ke mulut (teething phase).',
      'Pilih mainan berukuran lebih besar dari genggaman tangan untuk cegah risiko tersedak.'
    ],
    redFlags: [
      'Bayi tidak berusaha meraih benda di jangkauannya.',
      'Mata terlihat juling secara menetap.'
    ],
    encouragement: 'Si kecil mulai aktif mengeksplorasi dunianya. Tetap sabar dan nikmati setiap tawa kecilnya!'
  },
  '7-9': {
    ageRange: '7–9 Bulan',
    milestones: [
      'Duduk sendiri tanpa ditopang',
      'Mulai merangkak atau merayap menggunakan perut',
      'Memindahkan benda dari satu tangan ke tangan lainnya',
      'Memahami kata sederhana seperti "Tidak" atau namanya sendiri'
    ],
    activities: [
      {
        title: 'Halang Rintang Bantal Mungil',
        area: 'Motorik Kasar',
        tools: 'Bantal-bantal tipis aman',
        steps: [
          'Susun bantal tipis di atas matras lantai.',
          'Panggil bayi dari seberang bantal dengan memperlihatkan mainan favoritnya.',
          'Biarkan ia berusaha merangkak atau memanjat melewati bantal tersebut.'
        ],
        duration: '10–15 menit sehari'
      },
      {
        title: 'Meraup & Menjepit Makanan (Pincer Grasp)',
        area: 'Motorik Halus',
        tools: 'Potongan buah lembut (misal: pisang/alpukat matang)',
        steps: [
          'Letakkan potongan buah lembut berukuran kecil di meja kursi makan bayi.',
          'Contohkan cara mengambilnya menggunakan ibu jari dan telunjuk.',
          'Biarkan bayi mencoba memegang dan memasukkannya sendiri ke mulut.'
        ],
        duration: 'Saat jadwal makan snack harian'
      },
      {
        title: 'Petak Sembet (Peek-a-Boo) Benda',
        area: 'Kognitif & Bahasa',
        tools: 'Kain lap bersih & mainan kecil',
        steps: [
          'Tutup mainan kesukaan bayi dengan kain di depannya.',
          'Tanyakan: "Ke mana mainannya ya?"',
          'Biarkan bayi menarik kain untuk menemukan mainan tersebut, lalu bersorak gembira!'
        ],
        duration: '5–10 menit, 2x sehari'
      }
    ],
    safetyRules: [
      'Amankan area lantai dari stopkontak, kabel, dan benda-benda tajam/kecil.',
      'Pasang gerbang pengaman jika ada tangga di rumah.'
    ],
    redFlags: [
      'Bayi belum bisa duduk sendiri tanpa disangga pada usia 9 bulan.',
      'Tidak mengoceh atau tidak merespons panggapan nama.'
    ],
    encouragement: 'Eksplorasi si kecil makin luas! Setiap usaha merangkaknya membangun kekuatan fisik dan keberaniannya.'
  },
  '10-12': {
    ageRange: '10–12 Bulan',
    milestones: [
      'Berdiri berpegangan (cruising) atau melangkah pertama',
      'Menjepit benda kecil dengan ibu jari dan jari telunjuk secara presisi',
      'Mengucapkan 1–2 kata berarti (seperti "Mama", "Papa", "Da-da")',
      'Menirukan gerakan sederhana (seperti bertepuk tangan atau melambaikan tangan)'
    ],
    activities: [
      {
        title: 'Dorong & Melangkah Ceria',
        area: 'Motorik Kasar',
        tools: 'Kursi stabil / Push walker aman',
        steps: [
          'Posisikan bayi berdiri sambil memegang alat dorong atau berdiri menyusuri sofa.',
          'Beri semangat di sebelahnya saat ia mencoba melangkahkan kaki satu per satu.'
        ],
        duration: '10–15 menit, 2x sehari'
      },
      {
        title: 'Masuk & Keluarkan Benda',
        area: 'Motorik Halus & Kognitif',
        tools: 'Wadah plastik lunak & bola-bola warna terang',
        steps: [
          'Tunjukkan cara memasukkan bola ke dalam wadah plastik.',
          'Ajak bayi meniru memasukkan dan membalikkan wadah untuk mengeluarkan bola.'
        ],
        duration: '10 menit per sesi'
      },
      {
        title: 'Membaca Buku Busa & Menunjuk Gambar',
        area: 'Komunikasi & Bahasa',
        tools: 'Buku cerita bergambar besar (Board book / cloth book)',
        steps: [
          'Pangku bayi dan buka buku cerita.',
          'Tunjuk gambar hewan/benda dan sebutkan namnya dengan jelas: "Ini Anjing! Suaranya Guk Guk!"',
          'Ajak bayi ikut menunjuk gambar yang disebutkan.'
        ],
        duration: '5–10 menit sebelum tidur atau saat santai'
      }
    ],
    safetyRules: [
      'Gunakan alas kaki anti-slip saat bayi belajar berdiri/berjalan di lantai licin.',
      'Hindari penggunaan *baby walker* roda melingkar karena berisiko memicu cedera.'
    ],
    redFlags: [
      'Bayi tidak bisa berdiri meskipun berpegangan pada usia 12 bulan.',
      'Tidak menggunakan isyarat tangan (seperti menunjuk atau menggeleng).'
    ],
    encouragement: 'Selamat! Si kecil hampir berusia 1 tahun. Konsistensi dan cinta Ayah/Ibu adalah kunci tumbuh kembang optimalnya.'
  }
};

export const App: React.FC = () => {
  // State Login
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('userName') || 'Si Kecil';
  });

  // State Kategori Sidebar: 'balita' | 'basata'
  const [selectedCategory, setSelectedCategory] = useState<'balita' | 'basata'>('balita');

  // State Usia Bayi Modul Basata ('0-3' | '4-6' | '7-9' | '10-12')
  const [selectedAgeKey, setSelectedAgeKey] = useState<string>('0-3');

  // State Bintang
  const [stars, setStars] = useState<number>(() => {
    const savedStars = localStorage.getItem('stars');
    return savedStars ? parseInt(savedStars, 10) : 0;
  });

  // State Modul Utama Aktif
  const [activeModule, setActiveModule] = useState<string | null>(null);

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

  const handleSelectModule = (moduleName: string) => {
    setActiveModule(moduleName.toLowerCase().trim());
  };

  const handleBackToDashboard = () => {
    setActiveModule(null);
  };

  const handleAddStar = () => {
    setStars((prev) => prev + 1);
  };

  // Render Modul Utama
  const renderModule = () => {
    if (!activeModule) return null;

    const ColorComponent = ColorModule as React.FC<any>;
    const ShapeComponent = ShapeModule as React.FC<any>;
    const MusicComponent = MusicModule as React.FC<any>;

    switch (activeModule) {
      case 'abc':
      case 'abjad':
      case 'alphabet':
        return <AlphabetModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />;

      case 'hewan':
      case 'animal':
      case 'animals':
      case 'dunia hewan':
      case 'dunia-hewan':
        return <AnimalModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />;

      case 'number':
      case 'numbers':
      case 'angka':
      case 'berhitung':
        return <NumberModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />;

      case 'color':
      case 'colors':
      case 'warna':
        return <ColorComponent onBack={handleBackToDashboard} onAddStar={handleAddStar} />;

      case 'shape':
      case 'shapes':
      case 'bentuk':
        return <ShapeComponent onBack={handleBackToDashboard} onAddStar={handleAddStar} />;

      case 'fruit':
      case 'fruits':
      case 'buah':
        return <FruitModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />;

      case 'music':
      case 'musik':
        return <MusicComponent onBack={handleBackToDashboard} onAddStar={handleAddStar} />;

      case 'matching':
      case 'pencocokan':
      case 'cocok':
        return <MatchingModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />;

      case 'quiz':
      case 'tebak':
      case 'tebakan':
        return <QuizModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />;

      default:
        return (
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md w-full border-4 border-sky-200">
            <div className="text-6xl mb-4">🎈</div>
            <h2 className="text-2xl font-black text-slate-700 mb-2">Modul Segera Hadir!</h2>
            <button
              onClick={handleBackToDashboard}
              className="mt-4 px-6 py-2.5 bg-sky-500 text-white font-bold rounded-full shadow-lg hover:bg-sky-600 transition-all"
            >
              Kembali
            </button>
          </div>
        );
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

  const currentBasata = BASATA_MODULES[selectedAgeKey];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-200 to-indigo-300 flex flex-col md:flex-row">
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

          {/* Menu Kategori Navigasi */}
          <div className="space-y-3">
            <p className="text-xs font-black text-slate-400 uppercase px-2 tracking-wider">Kategori Belajar</p>

            {/* Menu Modul Balita */}
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

            {/* Menu Modul Basata (Bawah Satu Tahun) */}
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

        {/* Tombol Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 mt-6 px-4 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-2xl font-bold transition-all border-2 border-rose-100"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </aside>

      {/* ----------------- KONTEN UTAMA ----------------- */}
      <main className="flex-1 p-4 md:p-8 flex items-center justify-center relative overflow-y-auto">
        {/* Total Bintang */}
        <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border-2 border-white flex items-center gap-2">
          <span className="text-2xl animate-bounce">⭐</span>
          <span className="font-black text-amber-500 text-xl">{stars}</span>
        </div>

        {/* Render Modul / Dashboard */}
        {activeModule ? (
          renderModule()
        ) : selectedCategory === 'balita' ? (
          // MODUL BALITA
          <Dashboard onSelectModule={handleSelectModule} />
        ) : (
          // MODUL BASATA (BAWAH SATU TAHUN)
          <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-teal-200 my-4">
            {/* Header Basata */}
            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-teal-100 text-teal-600 rounded-2xl mb-2">
                <Baby size={40} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-teal-700">Modul Basata (Bawah Satu Tahun)</h2>
              <p className="text-slate-500 mt-1 font-semibold text-sm sm:text-base">
                Panduan Stimulasi Tumbuh Kembang Harian Berbasis Sains & 5 Pilar Utama
              </p>
            </div>

            {/* Tab Pilihan Usia Bayi */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
              {[
                { key: '0-3', label: '0–3 Bulan' },
                { key: '4-6', label: '4–6 Bulan' },
                { key: '7-9', label: '7–9 Bulan' },
                { key: '10-12', label: '10–12 Bulan' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedAgeKey(tab.key)}
                  className={`px-4 py-2.5 rounded-xl font-black text-sm sm:text-base transition-all ${
                    selectedAgeKey === tab.key
                      ? 'bg-teal-500 text-white shadow-md scale-105'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Section 1: Target Perkembangan Usia */}
            <div className="bg-teal-50/80 rounded-2xl p-5 border-2 border-teal-100 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Target className="text-teal-600" size={24} />
                <h3 className="text-xl font-black text-teal-800">
                  1. Target Perkembangan Usia {currentBasata.ageRange}
                </h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentBasata.milestones.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700 font-medium text-sm">
                    <CheckCircle2 className="text-teal-500 shrink-0 mt-0.5" size={16} />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 2: Modul Stimulasi Utama */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="text-amber-500" size={24} />
                <h3 className="text-xl font-black text-slate-800">
                  2. Modul Stimulasi Utama (Aktivitas Harian)
                </h3>
              </div>

              <div className="space-y-4">
                {currentBasata.activities.map((act, idx) => (
                  <div key={idx} className="bg-white border-2 border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h4 className="text-lg font-black text-teal-700">{idx + 1}. {act.title}</h4>
                      <span className="text-xs font-black px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
                        {act.area}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 font-bold mb-3">
                      📦 Alat & Bahan: <span className="text-slate-700 font-normal">{act.tools}</span>
                    </p>

                    <div className="space-y-1.5 mb-3">
                      <p className="text-xs font-bold text-slate-600 uppercase">Cara Melakukan (Step-by-Step):</p>
                      {act.steps.map((step, sIdx) => (
                        <p key={sIdx} className="text-sm text-slate-700 pl-3 border-l-2 border-teal-300">
                          {step}
                        </p>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-teal-600 bg-teal-50 p-2.5 rounded-xl">
                      <Clock size={16} />
                      <span>Durasi & Frekuensi: {act.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Catatan Keamanan & Red Flags */}
            <div className="bg-rose-50/80 rounded-2xl p-5 border-2 border-rose-100 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="text-rose-600" size={24} />
                <h3 className="text-xl font-black text-rose-800">
                  3. Catatan Keamanan & Red Flags
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-black uppercase text-rose-700 mb-1.5">Aturan Keamanan (Safety Rules):</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 font-medium">
                    {currentBasata.safetyRules.map((rule, idx) => (
                      <li key={idx}>{rule}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase text-rose-700 mb-1.5">Red Flags (Waspadai Jika):</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 font-medium">
                    {currentBasata.redFlags.map((flag, idx) => (
                      <li key={idx}>{flag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 4: Pesan Penguat untuk Orang Tua */}
            <div className="bg-gradient-to-r from-indigo-50 to-sky-50 rounded-2xl p-5 border-2 border-indigo-100 flex items-start gap-3">
              <div className="p-2.5 bg-indigo-500 text-white rounded-xl shrink-0 mt-1">
                <Heart size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black text-indigo-800 uppercase mb-1">Pesan Penguat Orang Tua</h4>
                <p className="text-sm text-indigo-950 font-semibold italic">
                  "{currentBasata.encouragement}"
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;