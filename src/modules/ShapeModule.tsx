import { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Sparkles } from 'lucide-react';
import { playAudio } from '../utils/audio';

interface ShapeModuleProps {
  onBack: () => void;
  onAddStar: () => void;
}

interface ShapeItem {
  id: string;
  name: string;
  icon: string;
  exampleIcon: string;
  exampleName: string;
  bgColor: string;
  borderColor: string;
}

const shapeData: ShapeItem[] = [
  { id: 'lingkaran', name: 'Lingkaran', icon: '⭕', exampleIcon: '⚽', exampleName: 'Bola', bgColor: 'bg-red-400', borderColor: 'border-red-600' },
  { id: 'persegi', name: 'Persegi', icon: '🟦', exampleIcon: '🪟', exampleName: 'Jendela', bgColor: 'bg-sky-400', borderColor: 'border-sky-600' },
  { id: 'segitiga', name: 'Segitiga', icon: '🔺', exampleIcon: '🍕', exampleName: 'Potongan Pizza', bgColor: 'bg-amber-400', borderColor: 'border-amber-600' },
  { id: 'bintang', name: 'Bintang', icon: '⭐', exampleIcon: '🌟', exampleName: 'Bintang Laut', bgColor: 'bg-yellow-400', borderColor: 'border-yellow-600' },
  { id: 'hati', name: 'Hati', icon: '❤️', exampleIcon: '💖', exampleName: 'Kartu Kasih Sayang', bgColor: 'bg-pink-400', borderColor: 'border-pink-600' },
  { id: 'lonjong', name: 'Lonjong', icon: '🥚', exampleIcon: '🥚', exampleName: 'Telur', bgColor: 'bg-orange-400', borderColor: 'border-orange-600' },
  { id: 'persegi_panjang', name: 'Persegi Panjang', icon: '💳', exampleIcon: '📱', exampleName: 'Handphone', bgColor: 'bg-emerald-400', borderColor: 'border-emerald-600' },
  { id: 'belah_ketupat', name: 'Belah Ketupat', icon: '🔷', exampleIcon: '🪅', exampleName: 'Ketupat', bgColor: 'bg-purple-400', borderColor: 'border-purple-600' },
];

export default function ShapeModule({ onBack, onAddStar }: ShapeModuleProps) {
  const [selectedShape, setSelectedShape] = useState<ShapeItem | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const handleSelectShape = (item: ShapeItem) => {
    setSelectedShape(item);
    playAudio(item.name);
    onAddStar();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      {/* Header Navigasi */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          type="button"
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border-2 border-slate-200 hover:bg-slate-50 font-bold text-slate-700 active:scale-95 transition"
        >
          <ArrowLeft size={20} />
          <span>{"Kembali"}</span>
        </button>

        <h2 className="text-2xl font-black text-purple-600 flex items-center gap-2">
          <span>{"🔷"}</span>
          <span>{"Mengenal Bentuk"}</span>
        </h2>
      </div>

      {/* Detail Kartu Bentuk */}
      {selectedShape && (
        <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-purple-300 text-center mb-8 transition">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-extrabold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
              {selectedShape.name}
            </span>
            <button
              onClick={() => playAudio(selectedShape.name)}
              type="button"
              className="bg-purple-100 p-3 rounded-full text-purple-600 hover:bg-purple-200 transition"
              title="Putar Suara"
            >
              <Volume2 size={24} />
            </button>
          </div>

          <div className="text-8xl my-2 transform hover:scale-110 transition duration-300 inline-block">
            {selectedShape.icon}
          </div>

          <h3 className="text-3xl font-black text-slate-800 tracking-wide">
            {selectedShape.name}
          </h3>

          <p className="text-slate-500 font-bold text-base mt-1">
            {"Contoh: "}
            <span className="text-purple-600">
              {selectedShape.exampleIcon} {selectedShape.exampleName}
            </span>
          </p>

          <p className="text-slate-400 font-bold text-sm flex items-center justify-center gap-1 mt-3">
            <Sparkles size={16} className="text-amber-400" />
            <span>{"Kamu dapat +1 Bintang!"}</span>
          </p>
        </div>
      )}

      {/* Grid Tombol Bentuk */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {shapeData.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSelectShape(item)}
            type="button"
            className={`${item.bgColor} text-white p-5 rounded-3xl shadow-lg border-b-8 ${item.borderColor} flex flex-col items-center justify-between transition transform hover:-translate-y-1 active:scale-95 min-h-[130px]`}
          >
            <span className="text-5xl my-1">{item.icon}</span>
            <span className="text-xs font-black bg-black/20 px-3 py-0.5 rounded-full mt-2">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}