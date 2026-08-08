import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';

// 1. Default Imports (Modul yang menggunakan 'export default')
import NumberModule from './modules/NumberModule';
import FruitModule from './modules/FruitModule';
import MatchingModule from './modules/MatchingModule';
import QuizModule from './modules/QuizModule';

// 2. Named Imports (Modul yang menggunakan 'export const' sesuai error di VS Code)
import { ColorModule } from './modules/ColorModule';
import { ShapeModule } from './modules/ShapeModule';
import { MusicModule } from './modules/MusicModule';

export const App: React.FC = () => {
  const [stars, setStars] = useState<number>(() => {
    const savedStars = localStorage.getItem('stars');
    return savedStars ? parseInt(savedStars, 10) : 0;
  });

  // activeModule dibuat null agar saat di-refresh otomatis kembali ke Dashboard
  const [activeModule, setActiveModule] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('stars', stars.toString());
  }, [stars]);

  const handleSelectModule = (moduleName: string) => {
    setActiveModule(moduleName);
  };

  const handleBackToDashboard = () => {
    setActiveModule(null);
  };

  const handleAddStar = () => {
    setStars((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-200 to-indigo-300 flex items-center justify-center p-4 selection:bg-sky-500 selection:text-white">
      {/* Indicator Bintang */}
      <div className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border-2 border-white flex items-center gap-2">
        <span className="text-2xl animate-bounce">⭐</span>
        <span className="font-black text-amber-500 text-xl">{stars}</span>
      </div>

      {/* Render Dashboard jika tidak ada modul aktif */}
      {!activeModule && (
        <Dashboard onSelectModule={handleSelectModule} />
      )}

      {/* Render Modul Sesuai Pilihan */}
      {activeModule === 'number' && NumberModule && (
        <NumberModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />
      )}

      {activeModule === 'color' && ColorModule && (
        <ColorModule onBack={handleBackToDashboard} />
      )}

      {activeModule === 'shape' && ShapeModule && (
        <ShapeModule onBack={handleBackToDashboard} />
      )}

      {activeModule === 'fruit' && FruitModule && (
        <FruitModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />
      )}

      {activeModule === 'music' && MusicModule && (
        <MusicModule onBack={handleBackToDashboard} />
      )}

      {activeModule === 'matching' && MatchingModule && (
        <MatchingModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />
      )}

      {activeModule === 'quiz' && QuizModule && (
        <QuizModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />
      )}
    </div>
  );
};

export default App;