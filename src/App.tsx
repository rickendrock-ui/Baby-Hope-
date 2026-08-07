import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Asumsikan Anda memiliki komponen Dashboard dari gambar image_e7eadb.png
import Dashboard from './components/Dashboard'; 

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inisialisasi audio saat komponen dimuat
  useEffect(() => {
    // Pastikan path sesuai dengan lokasi file di folder public
    audioRef.current = new Audio('/welcome-voice.mp3');
  }, []);

  const handleStart = () => {
    setIsStarted(true);
    // Mainkan suara saat tombol diklik
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Gagal memutar audio:", error);
      });
    }
  };

  return (
    // Membungkus seluruh aplikasi dengan latar belakang yang menarik
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-center font-comic-sans"
      style={{ backgroundImage: "url('/kids-bg.jpg')" }} 
    >
      {/* Lapisan overlay semi-transparan agar teks lebih terbaca jika bg terlalu ramai */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm pointer-events-none"></div>

      <AnimatePresence mode="wait">
        {!isStarted ? (
          // --- WELCOME SCREEN ---
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="z-10 flex flex-col items-center justify-center text-center p-8 bg-white/80 rounded-3xl shadow-2xl border-4 border-blue-400 max-w-md mx-4"
          >
             <motion.img 
                src="/logo-baby-hope.png" // Ganti dengan path logo Anda
                alt="Baby Hope Logo" 
                className="w-48 h-48 mb-6 drop-shadow-xl"
                animate={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
             />
             
            <h1 className="text-4xl font-extrabold text-blue-600 mb-2 drop-shadow-md">
              Baby Hope
            </h1>
            <p className="text-xl text-gray-700 mb-8 font-semibold">
              Belajar • Bermain • Tumbuh
            </p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleStart}
              className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-2xl font-bold py-4 px-10 rounded-full shadow-lg border-b-4 border-pink-700 hover:border-pink-500 hover:shadow-xl transition-all"
              // Animasi memantul terus-menerus untuk menarik perhatian
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Mulai Bermain! 🚀
            </motion.button>
          </motion.div>
        ) : (
          // --- DASHBOARD UTAMA ---
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="z-10 w-full h-full"
          >
             {/* Render komponen Dashboard Anda di sini */}
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;