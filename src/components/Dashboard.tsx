import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DashboardProps {
  onSelectModule: (moduleName: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectModule }) => {
  const [chickSaying, setChickSaying] = useState(false);
  const [balloonBouncing, setBalloonBouncing] = useState(false);

  const modules = [
    { id: 'alphabet', name: 'Abjad A-Z', icon: '🔤', bgGradient: 'from-rose-400 to-red-500', borderColor: 'border-red-600', shadowColor: 'shadow-red-300' },
    { id: 'numbers', name: 'Angka & Berhitung', icon: '🔢', bgGradient: 'from-sky-400 to-blue-600', borderColor: 'border-blue-700', shadowColor: 'shadow-blue-300' },
    { id: 'colors', name: 'Warna-Warni', icon: '🎨', bgGradient: 'from-amber-400 to-yellow-500', borderColor: 'border-amber-600', shadowColor: 'shadow-amber-300' },
    { id: 'shapes', name: 'Bentuk Geometri', icon: '🔷', bgGradient: 'from-purple-400 to-indigo-600', borderColor: 'border-indigo-700', shadowColor: 'shadow-purple-300' },
    { id: 'animals', name: 'Dunia Hewan', icon: '🐶', bgGradient: 'from-emerald-400 to-teal-600', borderColor: 'border-teal-700', shadowColor: 'shadow-teal-300' },
    { id: 'fruits', name: 'Buah & Sayur', icon: '🍎', bgGradient: 'from-orange-400 to-amber-600', borderColor: 'border-orange-700', shadowColor: 'shadow-orange-300' },
    { id: 'music', name: 'Mini Musik', icon: '🎹', bgGradient: 'from-pink-400 to-rose-500', borderColor: 'border-rose-600', shadowColor: 'shadow-pink-300' },
    { id: 'quiz', name: 'Tebak-Tebakan', icon: '🧩', bgGradient: 'from-violet-400 to-purple-600', borderColor: 'border-purple-700', shadowColor: 'shadow-purple-300' },
  ];

  const handleChickClick = () => {
    setChickSaying(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('Cip cip! Aku anak ayam lucu!');
      utterance.lang = 'id-ID';
      utterance.pitch = 1.6;
      utterance.rate = 1.1;
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setChickSaying(false), 2000);
  };

  const handleBalloonClick = () => {
    setBalloonBouncing(true);
    setTimeout(() => setBalloonBouncing(false), 1000);
  };

  const line1 = "BABY HOPE";
  const line2 = "PLAYGROUND";

  return (
    <motion.div 
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 120 }}
      className="w-full max-w-4xl bg-white/85 backdrop-blur-xl rounded-[3rem] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.18)] border-8 border-white text-center relative overflow-hidden"
    >
      {/* ----------------- HEADER AREA ----------------- */}
      <div className="mb-8 pt-2 relative flex items-center justify-between px-2 sm:px-6">
        
        {/* 🐣 Karakter Anak Ayam Interaktif (Kiri) */}
        <div className="relative flex flex-col items-center">
          {chickSaying && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.5 }}
              animate={{ opacity: 1, y: -45, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-300 text-amber-950 text-xs sm:text-sm font-black px-3 py-1 rounded-full shadow-md whitespace-nowrap border-2 border-white z-20 pointer-events-none"
            >
              Cip... Cip! 🐣
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.25, rotate: [0, -10, 10, 0] }}
            whileTap={{ scale: 0.85 }}
            animate={{
              y: [0, -8, 0],
              rotate: [0, -3, 3, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onClick={handleChickClick}
            className="text-5xl sm:text-7xl cursor-pointer filter drop-shadow-lg select-none focus:outline-none"
            title="Klik aku!"
          >
            🐥
          </motion.button>
        </div>

        {/* 🎨 Judul Utama Dua Baris (BABY HOPE di atas, PLAYGROUND di bawah) */}
        <div className="flex flex-col items-center justify-center flex-1 px-2">
          
          {/* Baris 1: BABY HOPE (Lebih Besar) */}
          <div className="flex flex-wrap justify-center gap-x-1 sm:gap-x-2 py-0.5">
            {line1.split("").map((char, index) => {
              if (char === " ") return <span key={index} className="w-3 sm:w-5" />;
              return (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.35, y: -6, rotate: [0, -10, 10, 0] }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    y: { duration: 1.8, repeat: Infinity, delay: index * 0.08, ease: "easeInOut" },
                    scale: { duration: 0.2 }
                  }}
                  className="inline-block font-black text-3xl sm:text-5xl md:text-6xl bg-gradient-to-b from-red-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent filter drop-shadow-[0_4px_3px_rgba(0,0,0,0.15)] cursor-default"
                  style={{ WebkitTextStroke: '1.2px rgba(255,255,255,0.9)' }}
                >
                  {char}
                </motion.span>
              );
            })}
          </div>

          {/* Baris 2: PLAYGROUND */}
          <div className="flex flex-wrap justify-center gap-x-[2px] sm:gap-x-1 py-0.5">
            {line2.split("").map((char, index) => {
              return (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.35, y: -6, rotate: [0, -10, 10, 0] }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    y: { duration: 1.8, repeat: Infinity, delay: (index + 5) * 0.08, ease: "easeInOut" },
                    scale: { duration: 0.2 }
                  }}
                  className="inline-block font-black text-2xl sm:text-4xl md:text-5xl bg-gradient-to-b from-sky-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent filter drop-shadow-[0_4px_3px_rgba(0,0,0,0.15)] cursor-default"
                  style={{ WebkitTextStroke: '1.2px rgba(255,255,255,0.9)' }}
                >
                  {char}
                </motion.span>
              );
            })}
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sky-900/90 font-black text-xs sm:text-base mt-2 tracking-wider flex items-center gap-1 bg-sky-100/80 px-4 py-1 rounded-full border border-sky-200/80 shadow-inner"
          >
            <span>Pilih modul belajar seru untuk si kecil!</span>
            <motion.span 
              animate={{ rotate: [0, 20, -20, 0] }} 
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </motion.p>
        </div>

        {/* 🎈 Balon Realistis 3D Interaktif (Kanan) */}
        <div className="relative flex flex-col items-center">
          <motion.div
            animate={balloonBouncing ? { scale: [1, 1.3, 0.9, 1.1, 1], rotate: [0, -15, 15, 0] } : {
              y: [0, -12, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: balloonBouncing ? 0 : Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            onClick={handleBalloonClick}
            className="cursor-pointer select-none focus:outline-none flex flex-col items-center"
            title="Klik balon!"
          >
            <div className="w-10 h-12 sm:w-14 sm:h-16 bg-gradient-to-tr from-rose-600 via-red-500 to-pink-400 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.3),_0_8px_15px_rgba(225,29,72,0.35)] relative">
              <div className="absolute top-2 left-2 w-3 h-4 sm:w-4 sm:h-5 bg-white/70 rounded-full rotate-[-30deg] blur-[0.5px]" />
              <div className="absolute top-3 left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/90 rounded-full" />
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2 sm:w-3 sm:h-2 bg-rose-700 rounded-b-sm" />
            </div>

            <svg className="w-4 h-8 sm:h-10 text-rose-400 -mt-0.5 overflow-visible" viewBox="0 0 20 40">
              <motion.path
                d="M 10 0 Q 15 10 10 20 T 10 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{
                  d: [
                    "M 10 0 Q 15 10 10 20 T 10 40",
                    "M 10 0 Q 5 10 10 20 T 10 40",
                    "M 10 0 Q 15 10 10 20 T 10 40"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        </div>

      </div>
      {/* ----------------- END HEADER AREA ----------------- */}

      {/* Grid Tombol Modul Playground */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mt-2">
        {modules.map((item, idx) => (
          <motion.button
            key={item.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.05, type: 'spring', stiffness: 150 }}
            whileHover={{ scale: 1.07, y: -5 }}
            whileTap={{ scale: 0.93, y: 3 }}
            onClick={() => onSelectModule(item.id)}
            className={`bg-gradient-to-b ${item.bgGradient} p-5 rounded-3xl text-white font-black flex flex-col items-center justify-center border-b-[6px] ${item.borderColor} shadow-xl ${item.shadowColor} cursor-pointer transition-all relative overflow-hidden group`}
          >
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20 rounded-t-3xl pointer-events-none" />
            
            <motion.span 
              whileHover={{ rotate: [0, -10, 10, 0] }}
              className="text-5xl sm:text-6xl mb-3 drop-shadow-md group-hover:scale-110 transition-transform"
            >
              {item.icon}
            </motion.span>
            
            <span className="text-base sm:text-lg leading-tight drop-shadow-md text-white font-black">
              {item.name}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;