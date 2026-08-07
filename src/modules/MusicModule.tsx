import React from 'react';
import { motion } from 'framer-motion';

interface KeyProps {
  note: string;
  freq: number;
  color: string;
  height: string;
}

const XYLOPHONE_KEYS: KeyProps[] = [
  { note: 'Do', freq: 261.63, color: 'bg-red-500 border-red-700', height: 'h-64' },
  { note: 'Re', freq: 293.66, color: 'bg-orange-500 border-orange-700', height: 'h-60' },
  { note: 'Mi', freq: 329.63, color: 'bg-yellow-400 border-yellow-600', height: 'h-56' },
  { note: 'Fa', freq: 349.23, color: 'bg-green-500 border-green-700', height: 'h-52' },
  { note: 'Sol', freq: 392.00, color: 'bg-teal-500 border-teal-700', height: 'h-48' },
  { note: 'La', freq: 440.00, color: 'bg-blue-500 border-blue-700', height: 'h-44' },
  { note: 'Si', freq: 493.88, color: 'bg-indigo-500 border-indigo-700', height: 'h-40' },
  { note: 'Do', freq: 523.25, color: 'bg-purple-500 border-purple-700', height: 'h-36' },
];

interface MusicModuleProps {
  onBack: () => void;
}

export const MusicModule: React.FC<MusicModuleProps> = ({ onBack }) => {
  const playNote = (freq: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-pink-300 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="bg-pink-500 hover:bg-pink-600 text-white font-extrabold px-5 py-2.5 rounded-full shadow-md transition active:scale-95 flex items-center gap-2 text-base"
        >
          ⬅️ Menu Utama
        </button>
        <span className="bg-pink-100 text-pink-800 font-black px-4 py-1.5 rounded-full text-sm">
          Xylophone Musik 🎹
        </span>
      </div>

      <p className="text-gray-600 font-extrabold text-center mb-6">Sentuh bilah warna-warni untuk memainkan musik!</p>

      <div className="w-full bg-amber-100 rounded-3xl p-6 border-4 border-amber-300 shadow-inner flex items-end justify-center gap-2 md:gap-4 overflow-x-auto min-h-[300px]">
        {XYLOPHONE_KEYS.map((k) => (
          <motion.button
            key={k.note + k.freq}
            whileTap={{ scale: 0.9, y: 10 }}
            onClick={() => playNote(k.freq)}
            className={`${k.color} ${k.height} flex-1 max-w-[70px] rounded-2xl border-b-8 shadow-lg flex flex-col justify-between items-center py-4 text-white font-black text-xl cursor-pointer select-none transition-all active:brightness-125`}
          >
            <span className="w-4 h-4 bg-white/40 rounded-full shadow-inner" />
            <span>{k.note}</span>
            <span className="w-4 h-4 bg-white/40 rounded-full shadow-inner" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};