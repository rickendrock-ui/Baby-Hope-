import React, { useState, useEffect, useRef } from 'react';
import { motion, type PanInfo, AnimatePresence } from 'framer-motion';

interface MatchingModuleProps {
  onBack: () => void;
  onAddStar: () => void;
}

export const MatchingModule: React.FC<MatchingModuleProps> = ({ onBack, onAddStar }) => {
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 9) + 1);
  const [options, setOptions] = useState<number[]>([]);
  const [shakeId, setShakeId] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  // Generate opsi angka baru secara rapi
  useEffect(() => {
    const distractors = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(n => n !== targetNumber);
    const shuffled = distractors.sort(() => 0.5 - Math.random());
    const newOptions = [targetNumber, ...shuffled.slice(0, 3)].sort(() => 0.5 - Math.random());
    setOptions(newOptions);
    setIsCorrect(false);
  }, [targetNumber]);

  const speakNumber = (num: number) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(num.toString());
      utterance.lang = 'id-ID';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, num: number) => {
    if (!targetRef.current || isCorrect) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const { x, y } = info.point;

    const isInside = 
      x >= targetRect.left && x <= targetRect.right &&
      y >= targetRect.top && y <= targetRect.bottom;

    if (isInside) {
      if (num === targetNumber) {
        // --- JIKA BENAR ---
        setIsCorrect(true);
        speakNumber(num);
        onAddStar();
        setOptions([]); // Hilangkan semua opsi lama seketika

        // Jeda 2 detik agar anak bisa melihat efek menyala, lalu ganti target baru
        setTimeout(() => {
          setTargetNumber(Math.floor(Math.random() * 9) + 1);
        }, 2000);
      } else {
        // --- JIKA SALAH ---
        setShakeId(num);
        setTimeout(() => {
          setOptions(prev => prev.filter(item => item !== num));
          setShakeId(null);
        }, 400);
      }
    }
  };

  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full max-w-xl bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border-4 border-white text-center relative"
    >
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={onBack} 
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-2xl font-black text-sm border-2 border-slate-200 transition cursor-pointer"
        >
          ← Kembali
        </button>
        <span className="text-xs font-black text-sky-600 bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
          🎯 Modul Pencocokan
        </span>
      </div>
      
      <h2 className="text-2xl font-black text-slate-800 mb-6">Cocokkan Angka!</h2>

      {/* Target Bayangan (Menyala & Tebal saat Benar) */}
      <motion.div 
        ref={targetRef}
        animate={{ 
          backgroundColor: isCorrect ? "#e0f2fe" : "#f0f9ff",
          borderColor: isCorrect ? "#0284c7" : "#7dd3fc",
          borderWidth: isCorrect ? "6px" : "4px",
          scale: isCorrect ? 1.05 : 1,
          boxShadow: isCorrect ? "0 0 35px rgba(2, 132, 199, 0.5)" : "none"
        }}
        className="w-32 h-32 sm:w-40 sm:h-40 mx-auto border-dashed rounded-[2rem] flex items-center justify-center mb-8 relative transition-all duration-300"
      >
        <motion.span 
          animate={{ color: isCorrect ? "#0284c7" : "#7dd3fc" }}
          className="text-7xl sm:text-8xl font-black select-none transition-colors duration-300"
        >
          {targetNumber}
        </motion.span>
        {isCorrect && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -bottom-3 bg-sky-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-md"
          >
            Hebat! 🎉
          </motion.div>
        )}
      </motion.div>

      {/* Pilihan Angka Rapi di Bawah */}
      <div className="flex justify-center items-center gap-6 sm:gap-10 min-h-[120px] flex-wrap">
        <AnimatePresence>
          {options.map((num) => (
            <motion.div
              key={num}
              drag={!isCorrect}
              dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => handleDragEnd(e, info, num)}
              animate={
                shakeId === num
                  ? { x: [-12, 12, -12, 12, 0] }
                  : { y: [0, -6, 0] }
              }
              transition={shakeId === num ? { duration: 0.3 } : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
              className="text-7xl sm:text-8xl font-black text-indigo-600 cursor-grab active:cursor-grabbing select-none drop-shadow-lg"
            >
              {num}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MatchingModule;