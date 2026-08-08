import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';

import NumberModule from './modules/NumberModule';
import { ColorModule } from './modules/ColorModule';
import { ShapeModule } from './modules/ShapeModule';
import FruitModule from './modules/FruitModule';
import { MusicModule } from './modules/MusicModule';
import MatchingModule from './modules/MatchingModule';
import QuizModule from './modules/QuizModule';

export const App: React.FC = () => {
  const [stars, setStars] = useState<number>(() => {
    const savedStars = localStorage.getItem('stars');
    return savedStars ? parseInt(savedStars, 10) : 0;
  });

  // Set default activeModule ke null agar saat refresh SELALU kembali ke Dashboard
  const [activeModule, setActiveModule] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('stars', stars.toString());
  }, [stars]);

  // Bersihkan data modul lama jika pernah tersimpan di browser
  useEffect(() => {
    localStorage.removeItem('activeModule');
  }, []);

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
      {/* Header Bintang */}
      <div className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border-2 border-white flex items-center gap-2">
        <span className="text-2xl animate-bounce">⭐</span>
        <span className="font-black text-amber-500 text-xl">{stars}</span>
      </div>

      {!activeModule && (
        <Dashboard onSelectModule={handleSelectModule} />
      )}

      {activeModule === 'number' && (
        <NumberModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />
      )}

      {activeModule === 'color' && (
        <ColorModule onBack={handleBackToDashboard} />
      )}

      {activeModule === 'shape' && (
        <ShapeModule onBack={handleBackToDashboard} />
      )}

      {activeModule === 'fruit' && (
        <FruitModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />
      )}

      {activeModule === 'music' && (
        <MusicModule onBack={handleBackToDashboard} />
      )}

      {activeModule === 'matching' && (
        <MatchingModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />
      )}

      {activeModule === 'quiz' && (
        <QuizModule onBack={handleBackToDashboard} onAddStar={handleAddStar} />
      )}
    </div>
  );
};

export default App;