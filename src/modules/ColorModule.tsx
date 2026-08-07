import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS_DATA, type ColorItem } from '../data/contentData';
import { useAudio } from '../hooks/useAudio';

interface ColorModuleProps {
  onBack: () => void;
}

export const ColorModule: React.FC<ColorModuleProps> = ({ onBack }) => {
  const { speak, playSoundEffect } = useAudio();
  const [activeColor, setActiveColor] = useState<ColorItem>(COLORS_DATA[0]);
  const [mode, setMode] = useState<'learn' | 'game'>('learn');
  const [targetColor, setTargetColor] = useState<ColorItem>(COLORS_DATA[0]);
  const [celebrate, setCelebrate] = useState(false);

  const startQuiz = () => {
    const random = COLORS_DATA[Math.floor(Math.random() * COLORS_DATA.length)];
    setTargetColor(random);
    setCelebrate(false);
    speak(`Mana yang berwarna ${random.name}?`);
  };

  const handleSelectColor = (col: ColorItem) => {
    playSoundEffect('pop');
    setActiveColor(col);

    if (mode === 'learn') {
      speak(`Warna ${col.name}! Seperti ${col.objectName}`);
    } else {
      if (col.name === targetColor.name) {
        playSoundEffect('success');
        setCelebrate(true);
        speak(`Horeee! Benar sekali, ini warna ${col.name}!`);
        setTimeout(() => {
          startQuiz();
        }, 2000);
      } else {
        speak(`Yuk coba lagi! Cari warna ${targetColor.name}`);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-yellow-300 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4">
        <button
          onClick={onBack}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-extrabold px-5 py-2.5 rounded-full shadow-md transition active:scale-95 flex items-center gap-2 text-base"
        >
          ⬅️ Menu Utama
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => { setMode('learn'); speak("Ayo mengenal warna-warni!"); }}
            className={`px-4 py-2 rounded-full font-black text-sm transition ${
              mode === 'learn' ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-100 text-gray-600'
            }`}
          >
            🎨 Belajar
          </button>
          <button
            onClick={() => { setMode('game'); startQuiz(); }}
            className={`px-4 py-2 rounded-full font-black text-sm transition ${
              mode === 'game' ? 'bg-pink-500 text-white shadow-md' : 'bg-gray-100 text-gray-600'
            }`}
          >
            🎮 Tebak Warna
          </button>
        </div>
      </div>

      <div 
        className="w-full h-56 rounded-3xl flex flex-col items-center justify-center text-white shadow-inner transition-colors duration-500 relative overflow-hidden my-2 border-4 border-white"
        style={{ backgroundColor: mode === 'learn' ? activeColor.hex : targetColor.hex }}
      >
        {mode === 'learn' ? (
          <motion.div 
            key={activeColor.name}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center text-center p-4 drop-shadow-lg"
          >
            <span className="text-7xl mb-2">{activeColor.icon}</span>
            <h3 className="text-4xl font-black">{activeColor.name}</h3>
            <p className="text-lg font-bold opacity-90">{activeColor.objectName}</p>
          </motion.div>
        ) : (
          <div className="text-center p-4 drop-shadow-lg">
            <span className="text-6xl mb-2 animate-bounce block">❓</span>
            <h3 className="text-3xl font-black">Cari Warna {targetColor.name}!</h3>
            <p className="text-sm font-bold opacity-90">Sentuh tombol warna di bawah ini:</p>
          </div>
        )}

        <AnimatePresence>
          {celebrate && (
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              exit={{ scale: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-white font-black text-4xl"
            >
              🎉 HEBAT SEKALI! ⭐
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 w-full mt-4">
        {COLORS_DATA.map((col: ColorItem) => (
          <motion.button
            key={col.name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => handleSelectColor(col)}
            className="h-20 rounded-2xl flex flex-col items-center justify-center shadow-md border-b-4 border-black/20 text-white cursor-pointer select-none"
            style={{ backgroundColor: col.hex }}
          >
            <span className="text-2xl">{col.icon}</span>
            <span className="text-xs font-black drop-shadow">{col.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};