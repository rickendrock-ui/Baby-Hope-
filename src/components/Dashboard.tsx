import React from 'react';
import { motion } from 'framer-motion';

const gameModules = [
  { id: 1, title: 'Kuis Pintar', subtitle: 'Main Tebak-Tebakan', icon: '🎮', badge: 'Game 🏆', color: 'from-indigo-500 to-purple-600' },
  { id: 2, title: 'Huruf A-Z', subtitle: 'Mengenal Abjad', icon: '🔤', badge: 'Dasar 🖍️', color: 'from-pink-400 to-rose-500' },
  { id: 3, title: 'Angka 1-10', subtitle: 'Belajar Hitung', icon: '🔢', badge: 'Berhitung 🧮', color: 'from-blue-400 to-blue-600' },
  { id: 4, title: 'Warna-Warni', subtitle: 'Merah, Biru ...', icon: '🌈', badge: 'Kreatif 🎨', color: 'from-yellow-400 to-amber-500' },
  { id: 5, title: 'Dunia Hewan', subtitle: 'Suara & Nama', icon: '🦁', badge: 'Seru! 🔊', color: 'from-green-400 to-emerald-600' },
  { id: 6, title: 'Bentuk Geometri', subtitle: 'Lingkaran, Bintang', icon: '🔷', badge: 'Pintar 🧠', color: 'from-purple-400 to-indigo-500' },
  { id: 7, title: 'Buah & Sayur', subtitle: 'Apel, Pisang ...', icon: '🍎', badge: 'Sehat 🍌', color: 'from-orange-400 to-red-500' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#E5F3FF] font-comic-sans flex flex-col items-center pb-12">
      {/* HEADER */}
      <div className="w-full max-w-4xl bg-white rounded-b-3xl shadow-sm p-4 flex justify-between items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-400 to-blue-400 rounded-full flex items-center justify-center text-white text-xl shadow-md">
            🌈
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-blue-500 leading-tight">BABY HOPE</h1>
            <p className="text-xs text-gray-500 font-semibold">Belajar • Bermain • Tumbuh</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-yellow-100 border-2 border-yellow-400 text-yellow-700 px-4 py-1.5 rounded-full font-bold flex items-center gap-2 shadow-sm">
            ⭐ 26 Bintang
          </div>
        </div>
      </div>

      {/* PROFIL & SAMBUTAN */}
      <div className="mt-8 flex flex-col items-center">
        <motion.div 
          className="relative w-28 h-28 bg-white rounded-full border-4 border-blue-200 shadow-xl flex items-center justify-center text-6xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          🐥
        </motion.div>
        
        <h2 className="mt-4 text-3xl font-extrabold text-gray-800 flex items-center gap-2">
          👋 Halo, Hope!
        </h2>
        <p className="text-gray-600 font-medium text-lg mt-1">
          Yuk pilih permainan seru hari ini! 👇
        </p>
      </div>

      {/* GRID MENU MODUL */}
      <div className="mt-8 w-full max-w-4xl px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gameModules.map((module) => (
          <motion.div
            key={module.id}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className={`relative bg-gradient-to-br ${module.color} p-6 rounded-3xl shadow-lg cursor-pointer flex flex-col items-center justify-center text-white border-b-4 border-black/20`}
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

export default Dashboard;