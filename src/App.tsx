import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA MODUL PERMAINAN ---
const gameModules = [
  { id: 1, title: 'Kuis Pintar', subtitle: 'Main Tebak-Tebakan', icon: '🎮', badge: 'Game 🏆', color: 'from-indigo-500 to-purple-600', voiceText: 'Ayo main kuis pintar!' },
  { id: 2, title: 'Huruf A-Z', subtitle: 'Mengenal Abjad', icon: '🔤', badge: 'Dasar 🖍️', color: 'from-pink-400 to-rose-500', voiceText: 'Kita belajar huruf A B C yuk!' },
  { id: 3, title: 'Angka 1-10', subtitle: 'Belajar Hitung', icon: '🔢', badge: 'Berhitung 🧮', color: 'from-blue-400 to-blue-600', voiceText: 'Satu, dua, tiga! Mari berhitung!' },
  { id: 4, title: 'Warna-Warni', subtitle: 'Merah, Biru ...', icon: '🌈', badge: 'Kreatif 🎨', color: 'from-yellow-400 to-amber-500', voiceText: 'Lihat warna-warni indah sekali!' },
  { id: 5, title: 'Dunia Hewan', subtitle: 'Suara & Nama', icon: '🦁', badge: 'Seru! 🔊', color: 'from-green-400 to-emerald-600', voiceText: 'Lucunya hewan-hewan ini!' },
  { id: 6, title: 'Bentuk Geometri', subtitle: 'Lingkaran, Bintang', icon: '🔷', badge: 'Pintar 🧠', color: 'from-purple-400 to-indigo-500', voiceText: 'Belajar bentuk bersama-sama!' },
  { id: 7, title: 'Buah & Sayur', subtitle: 'Apel, Pisang ...', icon: '🍎', badge: 'Sehat 🍌', color: 'from-orange-400 to-red-500', voiceText: 'Buah dan sayur bikin badan sehat!' },
];

// --- FUNGSI SUARA ANAK PEREMPUAN 4 TAHUN ---
const speakAsChild = (text: string) => {
  if (!('speechSynthesis' in window)) return;

  // Hentikan suara yang sedang berjalan sebelumnya
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID'; // Bahasa Indonesia

  // Setting nada & kecepatan agar bersuara seperti anak kecil polos & ceria
  utterance.pitch = 1.6;  // Nada tinggi khas anak-anak (1.5 - 1.8)
  utterance.rate = 0.95;  // Kecepatan wajar anak 4 tahun berbicara
  utterance.volume = 1.0; // Volume maksimal

  // Pilih suara wanita bahasa Indonesia dari sistem jika tersedia
  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find(
    (v) => v.lang.includes('id') || v.lang.includes('ID')
  );
  if (idVoice) {
    utterance.voice = idVoice;
  }

  window.speechSynthesis.speak(utterance);
};

// --- KOMPONEN DASHBOARD (MENU UTAMA) ---
const DashboardContent: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#E5F3FF]/90 font-sans flex flex-col items-center pb-12">
      {/* Header Top Bar */}
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
        <div className="bg-yellow-100 border-2 border-yellow-400 text-yellow-700 px-4 py-1.5 rounded-full font-bold flex items-center gap-2 shadow-sm">
          ⭐ 26 Bintang
        </div>
      </div>

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
        <p className="text-gray-600 font-medium text-lg mt-1">
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
            onClick={() => speakAsChild(module.voiceText)}
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
    </div>
  );
};

// --- KOMPONEN UTAMA (APP) ---
const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);

    // Buka akses suara browser
    window.speechSynthesis.getVoices();

    // Jalankan kalimat penyambutan persis sesuai permintaan Anda
    setTimeout(() => {
      speakAsChild(
        "Halo Baby Hoooope! Ayo kita Bermain dan belajar. Tuhan Yesus Memberkati kamu menjadi anak yang pintar!"
      );
    }, 300);
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-center font-sans"
      style={{ backgroundImage: "url('/kids-bg.jpg')" }}
    >
      <AnimatePresence mode="wait">
        {!isStarted ? (
          /* WELCOME SCREEN / TOMBOL MASUK */
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
          /* DASHBOARD SETELAH TOMBOL DIKLIK */
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full min-h-screen"
          >
            <DashboardContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;