import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SHAPES_DATA, type ShapeItem } from '../data/contentData';
import { useAudio } from '../hooks/useAudio';

interface ShapeModuleProps {
  onBack: () => void;
}

export const ShapeModule: React.FC<ShapeModuleProps> = ({ onBack }) => {
  const { speak, playSoundEffect } = useAudio();
  const [selectedShape, setSelectedShape] = useState<ShapeItem>(SHAPES_DATA[0]);

  const handleSelectShape = (shape: ShapeItem) => {
    playSoundEffect('pop');
    setSelectedShape(shape);
    speak(`Bentuk ${shape.name}. ${shape.description}`);
  };

  return (
    <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-purple-300 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="bg-purple-500 hover:bg-purple-600 text-white font-extrabold px-5 py-2.5 rounded-full shadow-md transition active:scale-95 flex items-center gap-2 text-base"
        >
          ⬅️ Menu Utama
        </button>
        <span className="bg-purple-100 text-purple-800 font-black px-4 py-1.5 rounded-full text-sm">
          Bentuk Geometri
        </span>
      </div>

      <motion.div 
        key={selectedShape.name}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full bg-gradient-to-tr from-purple-100 to-indigo-50 rounded-3xl p-8 border-2 border-purple-200 flex flex-col items-center text-center my-2 shadow-inner"
      >
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-9xl mb-4 drop-shadow-md"
        >
          {selectedShape.icon}
        </motion.div>
        <h3 className="text-4xl font-black text-purple-700 mb-2">{selectedShape.name}</h3>
        <p className="text-lg font-bold text-gray-600 max-w-md">{selectedShape.description}</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full mt-4">
        {SHAPES_DATA.map((item: ShapeItem) => (
          <motion.button
            key={item.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSelectShape(item)}
            className={`p-4 rounded-2xl flex flex-col items-center justify-center border-b-4 transition cursor-pointer ${
              selectedShape.name === item.name
                ? 'bg-purple-500 text-white border-purple-700 shadow-lg scale-105'
                : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
            }`}
          >
            <span className="text-5xl mb-1">{item.icon}</span>
            <span className="font-extrabold text-base">{item.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};