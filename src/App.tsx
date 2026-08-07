import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA MODUL PERMAINAN ---
interface GameModule {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  color: string;
  voiceText: string;
  items: string[];
}

const gameModules: GameModule[] = [
  { 
    id: 1, 
    title: 'Kuis Pintar', 
    subtitle: 'Main Tebak-Tebakan', 
    icon: '🎮', 
    badge: 'Game 🏆', 
    color: 'from-indigo-500 to-purple-600', 
    voiceText: 'Ayo main kuis pintar!',
    items: ['Berapa 1 + 1?', 'Hewan apa yang meong?', 'Warna langit apa?']
  },
  { 
    id: 2, 
    title: 'Huruf A-Z', 
    subtitle: 'Mengenal Abjad', 
    icon: '🔤', 
    badge: 'Dasar 🖍️', 
    color: 'from-pink-400 to-rose-500', 
    voiceText: 'Kita belajar huruf A B C yuk!',
    items: ['A - Apel 🍎', 'B - Bebek 🦆', 'C - Cicak 🦎', 'D - Domba 🐑', 'E - Elang 🦅']
  },
  { 
    id: 3, 
    title: 'Angka 1-10', 
    subtitle: 'Belajar Hitung', 
    icon: '🔢', 
    badge: 'Berhitung 🧮', 
    color: 'from-blue-400 to-blue-600', 
    voiceText: 'Satu, dua, tiga! Mari berhitung!',
    items: ['1 🎈', '2 🎈🎈', '3 🎈🎈🎈', '4 🎈🎈🎈🎈', '5 🎈🎈🎈🎈🎈']
  },
  { 
    id: 4, 
    title: 'Warna-Warni', 
    subtitle: 'Merah, Biru ...', 
    icon: '🌈', 
    badge: 'Kreatif 🎨', 
    color: 'from-yellow-400 to-amber-500', 
    voiceText: 'Lihat warna-warni indah sekali!',
    items: ['Merah 🔴', 'Biru 🔵', 'Kuning 🟡', 'Hijau 🟢', 'Ungu 🟣']
  },
  { 
    id: 5, 
    title: 'Dunia Hewan', 
    subtitle: 'Suara & Nama', 
    icon: '🦁', 
    badge: 'Seru! 🔊', 
    color: 'from-green-400 to-emerald-600', 
    voiceText: 'Lucunya hewan-hewan ini!',
    items: ['Kucing 🐱', 'Anjing 🐶', 'Sapi 🐮', 'Singa 🦁', 'Gajah 🐘']
  },
  { 
    id: 6, 
    title: 'Bentuk Geometri', 
    subtitle: 'Lingkaran, Bintang', 
    icon: '🔷', 
    badge: 'Pintar 🧠', 
    color: 'from-purple-400 to-indigo-500', 
    voiceText: 'Belajar bentuk bersama-sama!',
    items: ['Lingkaran ⚪', 'Persegi 🟦', 'Segitiga 🔺', 'Bintang ⭐', 'Hati ❤️']
  },
  { 
    id: 7, 
    title: 'Buah & Sayur', 
    subtitle: 'Apel, Pisang ...', 
    icon: '🍎', 
    badge: 'Sehat 🍌', 
    color: 'from-orange-400 to-red-500', 
    voiceText: 'Buah dan sayur bikin badan sehat!',
    items: ['Apel 🍎', 'Pisang 🍌', 'Jeruk 🍊', 'Wortel 🥕', 'Brokoli 🥦']
  },
];

// --- FUNGSI SUARA ANAK PEREMPUAN ---
const speakAsChild = (text: string) => {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID';
  utterance.pitch = 1.6;  // Nada tinggi khas anak-anak
  utterance.rate = 0.95;
  utterance.volume = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find((v) => v.lang.includes('id') || v.lang.includes('ID'));
  if (idVoice) utterance.voice = idVoice;

  window.speechSynthesis.speak(utterance);
};

// --- BACKGROUND INTERAKTIF BERSINAR & AWAN ---
const InteractiveBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Animated Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-pink-200 to-amber-100 opacity-80" />
      
      {/* Floating Bubbles / Elements */}
      <motion.div 
        className="absolute top-10 left-10 text-6xl opacity-40"
        animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        ☁️
      </motion.div>
      <motion.div 
        className="absolute top-28 right-16 text-7xl opacity-40"
        animate={{ y: [0, 25, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        ☁️
      </motion.div>
      <motion.div 
        className="absolute bottom-20 left-1/4 text-5xl opacity-30"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        ⭐
      </motion.div>
      <motion.div 
        className="absolute top-1/3 right-1/4 text-6xl opacity-30"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🌟
      </motion.div>
    </div>
  );
};

// --- MODAL PARENTAL GATE (FITUR TAMENG / PENGATURAN) ---
interface ParentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ParentModal: React.FC<ParentModalProps> = ({ isOpen, onClose }) => {
  const [num1] = useState(Math.floor(Math.random() * 5) + 3);
  const [num2] = useState(Math.floor(Math.random() * 4) + 1);
  const [ans, setAns] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isOpen) return null;

  const handleVerify = () => {
    if (parseInt(ans) === num1 + num2) {
      setIsUnlocked(true);
    } else {
      alert('Jawaban salah. Fitur ini khusus untuk Orang Tua.');
      setAns('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border-4 border-amber-400">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            🛡️ Area Orang Tua
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✖</button>
        </div>

        {!isUnlocked ? (
          <div className="flex flex-col items-center">
            <p className="text-gray-600 text-center mb-4 font-medium">
              Selesaikan pertanyaan matematika berikut untuk membuka pengaturan:
            </p>
            <div className="text-3xl font-extrabold text-amber-600 bg-amber-50 px-6 py-3 rounded-2xl mb-4 border-2 border-amber-200">
              {num1} + {num2} = ?
            </div>
            <input 
              type="number"
              value={ans}
              onChange={(e) => setAns(e.target.value)}
              placeholder="Masukkan jawaban..."
              className="w-full text-center text-xl p-3 border-2 border-gray-300 rounded-xl mb-4 focus:border-amber-500 outline-none"
            />
            <button 
              onClick={handleVerify}
              className="w-full bg-amber-500 text-white font-bold py-3 rounded-xl shadow-md hover:bg-amber-600 transition"
            >
              Buka Pengaturan 🔓
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-2xl text-green-800 font-semibold text-center">
              ✅ Akses Diberikan
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Batas Waktu Bermain</label>
              <select className="w-full p-2 border rounded-xl font-medium">
                <option>Tidak Ada Batasan</option>
                <option>15 Menit</option>
                <option>30 Menit</option>
                <option>60 Menit</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Volume Suara Sistem</label>
              <input type="range" className="w-full accent-amber-500" defaultValue="80" />
            </div>
            <button 
              onClick={() => { setIsUnlocked(false); onClose(); }}
              className="w-full bg-blue-500 text-white font-bold py-2.5 rounded-xl mt-2"
            >
              Simpan & Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- DEDICATED GAME SCREEN (TAMPILAN SAAT MEMBUKA MODUL) ---
interface ActiveGameProps {
  module: GameModule;
  onBack: () => void;
}

const ActiveGameScreen: React.FC<ActiveGameProps> = ({ module, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative z-10 w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-white flex flex-col items-center"
    >
      <div className="w-full flex justify-between items-center mb-6">
        <button 
          onClick={onBack}
          className="bg-pink-500 text-white font-extrabold px-5 py-2.5 rounded-full shadow-md hover:bg-pink-600 transition flex items-center gap-2"
        >
          ⬅️ Kembali ke Menu
        </button>
        <span className="bg-amber-100 text-amber-800 font-bold px-4 py-1.5 rounded-full text-sm">
          {module.badge}
        </span>
      </div>

      <div className="text-7xl mb-2">{module.icon}</div>
      <h2 className="text-4xl font-extrabold text-gray-800 mb-2">{module.title}</h2>
      <p className="text-gray-600 font-medium mb-8">{module.subtitle}</p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {module.items.map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => speakAsChild(item)}
            className="bg-gradient-to-r from-sky-400 to-blue-500 text-white p-5 rounded-2xl shadow-lg cursor-pointer flex items-center justify-between text-xl font-bold border-b-4 border-blue-700"
          >
            <span>{item}</span>
            <span className="text-2xl">🔊</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// --- DASHBOARD Utama ---
const DashboardContent: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<GameModule | null>(null);
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);

  const handleOpenModule = (module: GameModule) => {
    speakAsChild(module.voiceText);
    setSelectedModule(module);
  };

  return (
    <div className="relative z-10 min-h-screen w-full flex flex-col items-center pb-12">
      {/* Top Header */}
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-b-3xl shadow-md p-4 flex justify-between items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-400 to-blue-400 rounded-full flex items-center justify-center text-white text-xl shadow-md">
            🌈
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-blue-500 leading-tight">BABY HOPE</h1>
            <p className="text-xs text-gray-500 font-semibold">Belajar • Bermain • Tumbuh</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-yellow-100 border-2 border-yellow-400 text-yellow-700 px-4 py-1.5 rounded-full font-bold flex items-center gap-2 shadow-sm">
            ⭐ 26 Bintang
          </div>
          {/* FITUR TAMENG / PENGATURAN ORANG TUA */}
          <button 
            onClick={() => setIsParentModalOpen(true)}
            className="bg-amber-400 hover:bg-amber-500 text-white p-2.5 rounded-full shadow-md text-lg transition"
            title="Pengaturan Orang Tua"
          >
            🛡️
          </button>
        </div>
      </div>

      {selectedModule ? (
        <div className="mt-8 px-4 w-full flex justify-center">
          <ActiveGameScreen 
            module={selectedModule} 
            onBack={() => setSelectedModule(null)} 
          />
        </div>
      ) : (
        <>
          {/* Profile & Greeting */}
          <div className="mt-8 flex flex-col items-center">
            <motion.div 
              onClick={() => speakAsChild("Halo Baby Hope! Aku teman bermainmu!")}
              className="relative w-28 h-28 bg-white rounded-full border-4 border-blue-200 shadow-xl flex items-center justify-center text-6xl cursor-pointer hover:scale-105 transition-transform"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              🐥
              <span className="absolute bottom-0 right-0 bg-pink-500 text-white text-xs p-1.5 rounded-full border-2 border-white shadow">
                🔊
              </span>
            </motion.div>
            
            <h2 className="mt-4 text-3xl font-extrabold text-gray-800 flex items-center gap-2">
              👋 Halo, Hope!
            </h2>
            <p className="text-gray-700 font-bold text-lg mt-1">
              Yuk pilih permainan seru hari ini! 👇
            </p>
          </div>

          {/* Grid Kartu Modul */}
          <div className="mt-8 w-full max-w-4xl px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameModules.map((module) => (
              <motion.div
                key={module.id}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOpenModule(module)}
                className={`relative bg-gradient-to-br ${module.color} p-6 rounded-3xl shadow-xl cursor-pointer flex flex-col items-center justify-center text-white border-b-4 border-black/20`}
              >
                <div className="absolute top-3 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold border border-white/30">
                  {module.badge}
                </div>
                <div className="text-6xl mb-4 drop-shadow-md">{module.icon}</div>
                <h3 className="text-2xl font-extrabold text-center drop-shadow-sm">{module.title}</h3>
                <p className="text-white/90 text-sm font-medium text-center mt-1">{module.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Parental Gate Modal */}
      <ParentModal 
        isOpen={isParentModalOpen} 
        onClose={() => setIsParentModalOpen(false)} 
      />
    </div>
  );
};

// --- KOMPONEN UTAMA (APP) ---
const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }

    setTimeout(() => {
      speakAsChild(
        "Halo Baby Hoooope! Ayo kita Bermain dan belajar. Tuhan Yesus Memberkati kamu menjadi anak yang pintar!"
      );
    }, 300);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center font-sans overflow-x-hidden">
      {/* Interactive Background */}
      <InteractiveBackground />

      <AnimatePresence mode="wait">
        {!isStarted ? (
          /* WELCOME SCREEN */
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="z-10 flex flex-col items-center justify-center text-center p-8 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-blue-400 max-w-md mx-4"
          >
            <motion.div 
              className="text-8xl mb-4 cursor-pointer"
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              🌈
            </motion.div>
             
            <h1 className="text-4xl font-extrabold text-blue-600 mb-2 drop-shadow-md">
              Baby Hope
            </h1>
            <p className="text-lg text-gray-600 mb-8 font-semibold">
              Belajar • Bermain • Tumbuh
            </p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleStart}
              className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-2xl font-bold py-4 px-10 rounded-full shadow-lg border-b-4 border-pink-700 hover:border-pink-500 transition-all cursor-pointer"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Ayo Main! 🚀
            </motion.button>
          </motion.div>
        ) : (
          /* DASHBOARD */
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full min-h-screen z-10"
          >
            <DashboardContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;