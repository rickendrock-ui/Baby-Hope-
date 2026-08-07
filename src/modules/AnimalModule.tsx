import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../hooks/useAudio';

interface AnimalItem {
  name: string;
  soundText: string;
  icon: string;
  fact: string;
  bgColor: string;
}

const ANIMALS_DATA: AnimalItem[] = [
  { name: 'Kucing', soundText: 'Meong... Meong!', icon: '🐱', fact: 'Kucing suka makan ikan dan bermain benang!', bgColor: 'from-amber-400 to-orange-500' },
  { name: 'Anjing', soundText: 'Guk... Guk!', icon: '🐶', fact: 'Anjing adalah teman yang sangat setia!', bgColor: 'from-yellow-400 to-amber-600' },
  { name: 'Sapi', soundText: 'Muuu... Muuu!', icon: '🐮', fact: 'Sapi menghasilkan susu yang sehat untuk tubuh!', bgColor: 'from-emerald-400 to-green-600' },
  { name: 'Singa', soundText: 'Roooarrr!', icon: '🦁', fact: 'Singa adalah raja hutan yang gagah!', bgColor: 'from-orange-400 to-red-500' },
  { name: 'Ayam', soundText: 'Kukuruyuk!', icon: '🐔', fact: 'Ayam berkokok di pagi hari!', bgColor: 'from-red-400 to-rose-600' },
  { name: 'Bebek', soundText: 'Kwek... Kwek!', icon: '🦆', fact: 'Bebek pandai berenang di air!', bgColor: 'from-sky-400 to-blue-600' },
];

interface AnimalModuleProps {
  onBack: () => void;
}

export const AnimalModule: React.FC<AnimalModuleProps> = ({ onBack }) => {
  const { speak, playSoundEffect } = useAudio();
  const [activeAnimal, setActiveAnimal] = useState<AnimalItem>(ANIMALS_DATA[0]);

  const handleTapAnimal = (animal: AnimalItem) => {
    playSoundEffect('pop');
    setActiveAnimal(animal);
    speak(`${animal.name}! Suaranya ${animal.soundText}`);
  };

  return (
    <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-emerald-300 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4">
        <button
          onClick={onBack}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-5 py-2.5 rounded-full shadow-md transition active:scale-95 flex items-center gap-2 text-base"
        >
          ⬅️ Menu Utama
        </button>
        <span className="bg-emerald-100 text-emerald-800 font-black px-4 py-1.5 rounded-full text-sm">
          Dunia Hewan 🔊
        </span>
      </div>

      <motion.div 
        key={activeAnimal.name}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`w-full bg-gradient-to-br ${activeAnimal.bgColor} rounded-3xl p-6 text-white flex flex-col items-center text-center shadow-xl border-b-4 border-black/20 my-2`}
      >
        <motion.div 
          whileTap={{ scale: 1.2, rotate: 10 }}
          onClick={() => speak(activeAnimal.soundText)}
          className="text-9xl my-2 cursor-pointer select-none drop-shadow-md"
        >
          {activeAnimal.icon}
        </motion.div>
        <h3 className="text-4xl font-black drop-shadow mb-1">{activeAnimal.name}</h3>
        <span className="bg-white/30 backdrop-blur-sm px-4 py-1 rounded-full text-lg font-black mb-3">
          🔊 "{activeAnimal.soundText}"
        </span>
        <p className="text-sm font-bold opacity-90 max-w-md bg-black/10 p-3 rounded-2xl border border-white/20">
          💡 {activeAnimal.fact}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mt-4">
        {ANIMALS_DATA.map((ani: AnimalItem) => (
          <motion.button
            key={ani.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleTapAnimal(ani)}
            className={`p-4 rounded-2xl flex items-center gap-3 border-b-4 transition cursor-pointer ${
              activeAnimal.name === ani.name
                ? 'bg-emerald-500 text-white border-emerald-700 shadow-md'
                : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <span className="text-4xl">{ani.icon}</span>
            <div className="text-left">
              <div className="font-extrabold text-base">{ani.name}</div>
              <div className="text-xs opacity-75 font-bold">{ani.soundText}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};