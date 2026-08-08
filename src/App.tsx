import React, { useState, useEffect } from 'react';
import { Baby, LogOut, BookOpen } from 'lucide-react';

import Dashboard from './components/Dashboard';
import Login from './components/Login';

// ----------------------------------------------------------------------
// IMPORT IMPORT PRESISI SESUAI EKSPOR MASING-MASING FILE MODUL
// ----------------------------------------------------------------------

// 1. Modul dengan Default Export
import AlphabetModuleRaw from './modules/AlphabetModule';
import FruitModuleRaw from './modules/FruitModule';
import MatchingModuleRaw from './modules/MatchingModule';
import NumberModuleRaw from './modules/NumberModule';
import QuizModuleRaw from './modules/QuizModule';

// 2. Modul dengan Named Export
import { AnimalModule as AnimalModuleRaw } from './modules/AnimalModule';
import { ColorModule as ColorModuleRaw } from './modules/ColorModule';
import { MusicModule as MusicModuleRaw } from './modules/MusicModule';
import { ShapeModule as ShapeModuleRaw } from './modules/ShapeModule';

// Type Cast (Mencegah TypeScript Mismatch Props)
const AlphabetModule = AlphabetModuleRaw as React.FC<any>;
const AnimalModule = AnimalModuleRaw as React.FC<any>;
const ColorModule = ColorModuleRaw as React.FC<any>;
const FruitModule = FruitModuleRaw as React.FC<any>;
const MatchingModule = MatchingModuleRaw as React.FC<any>;
const MusicModule = MusicModuleRaw as React.FC<any>;
const NumberModule = NumberModuleRaw as React.FC<any>;
const QuizModule = QuizModuleRaw as React.FC<any>;
const ShapeModule = ShapeModuleRaw as React.FC<any>;

export const App: React.FC = () => {
  // State Login
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('userName') || 'Si Kecil';
  });

  // State Navigation Sidebar: 'balita' | 'batita'
  const [selectedCategory, setSelectedCategory] = useState<'balita' | 'batita'>('balita');

  // State Bintang
  const [stars, setStars] = useState<number>(() => {
    const savedStars = localStorage.getItem('stars');
    return savedStars ? parseInt(savedStars, 10) : 0;
  });

  // State Modul Aktif
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
    setActiveModule(moduleName.toLowerCase());
  };

  const handleBackToDashboard = () => {
    setActiveModule(null);
  };

  const handleAddStar = () => {
    setStars((prev) => prev + 1);
  };

  // Render Modul Berdasarkan ID yang Diklik
  const renderModule = () => {
    if (!activeModule) return null;

    switch (activeModule) {
      case 'abc':
      case 'abjad':
      case 'alphabet':
        return <AlphabetModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />;

      case 'hewan':
      case 'animal':
      case 'dunia hewan':
        return <AnimalModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />;

      case 'number':
      case 'numbers':
      case 'angka':
      case 'berhitung':
        return <NumberModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />;

      case 'color':
      case 'colors':
      case 'warna':
        return <ColorModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />;

      case 'shape':
      case 'shapes':
      case 'bentuk':
        return <ShapeModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />;

      case 'fruit':
      case 'fruits':
      case 'buah':
        return <FruitModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />;

      case 'music':
      case 'musik':
        return <MusicModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />;

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
              className="mt-4 px-6 py-2.5 bg-sky-500 text-white font-bold rounded-full shadow-lg"
            >
              Kembali
            </button>
          </div>
        );
    }
  };

  // Tampilan Login (Jika Belum Login)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-200 to-indigo-300 flex items-center justify-center p-4">
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  // Tampilan Utama Aplikasi
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
              <p className="text-xs font-bold text-slate-400 uppercase">Selamat Datang,</p>
              <h3 className="font-black text-slate-700 truncate">{userName}</h3>
            </div>
          </div>

          {/* Menu Kategori */}
          <div className="space-y-3">
            <p className="text-xs font-black text-slate-400 uppercase px-2 tracking-wider">Kategori Belajar</p>
            
            {/* Button Modul Balita */}
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

            {/* Button Modul Batita */}
            <button
              onClick={() => {
                setSelectedCategory('batita');
                setActiveModule(null);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-left transition-all ${
                selectedCategory === 'batita'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Baby size={20} />
              <span>Modul Batita</span>
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

        {/* Render Modul atau Dashboard */}
        {activeModule ? (
          renderModule()
        ) : selectedCategory === 'balita' ? (
          // MODUL BALITA (Mewadahi seluruh modul utama)
          <Dashboard onSelectModule={handleSelectModule} />
        ) : (
          // MODUL BATITA (Khusus stimulasi batita)
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-center max-w-lg w-full border-4 border-amber-200">
            <div className="text-6xl mb-4">👶</div>
            <h2 className="text-3xl font-black text-amber-600 mb-2">Modul Batita</h2>
            <p className="text-slate-500 mb-6 font-semibold">
              Koleksi pembelajaran sederhana khusus untuk balita di bawah usia 3 tahun.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSelectModule('warna')}
                className="p-4 bg-rose-100 hover:bg-rose-200 rounded-2xl font-black text-rose-700 shadow-md transition-all"
              >
                🎨 Warna-Warni
              </button>
              <button
                onClick={() => handleSelectModule('musik')}
                className="p-4 bg-purple-100 hover:bg-purple-200 rounded-2xl font-black text-purple-700 shadow-md transition-all"
              >
                🎵 Mini Musik
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;