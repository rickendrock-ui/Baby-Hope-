import { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Sparkles } from 'lucide-react';
import { playAudio } from '../utils/audio';

interface ColorModuleProps {
  onBack: () => void;
  onAddStar: () => void;
}

interface ColorItem {
  id: string;
  name: string;
  bgClass: string;
  borderClass: string;
  exampleIcon: string;
  exampleName: string;
}

const colorData: ColorItem[] = [
  { id: 'merah', name: 'Merah', bgClass: 'bg-red-500', borderClass: 'border-red-700', exampleIcon: '🍎', exampleName: 'Apel' },
  { id: 'biru', name: 'Biru', bgClass: 'bg-blue-500', borderClass: 'border-blue-700', exampleIcon: '🌊', exampleName: 'Laut' },
  { id: 'kuning', name: 'Kuning', bgClass: 'bg-yellow-400', borderClass: 'border-yellow-600', exampleIcon: '🌻', exampleName: 'Bunga Matahari' },
  { id: 'hijau', name: 'Hijau', bgClass: 'bg-emerald-500', borderClass: 'border-emerald-700', exampleIcon: '🍃', exampleName: 'Daun' },
  { id: 'jingga', name: 'Jingga', bgClass: 'bg-orange-500', borderClass: 'border-orange-700', exampleIcon: '🍊', exampleName: 'Jeruk' },
  { id: 'ungu', name: 'Ungu', bgClass: 'bg-purple-500', borderClass: 'border-purple-700', exampleIcon: '🍇', exampleName: 'Anggur' },
  { id: 'pink', name: 'Merah Muda', bgClass: 'bg-pink-400', borderClass: 'border-pink-600', exampleIcon: '🌸', exampleName: 'Bunga Sakura' },
  { id: 'cokelat', name: 'Cokelat', bgClass: 'bg-amber-800', borderClass: 'border-amber-950', exampleIcon: '🍫', exampleName: 'Cokelat' },
  { id: 'hitam', name: 'Hitam', bgClass: 'bg-slate-900', borderClass: 'border-black', exampleIcon: '🐈‍⬛', exampleName: 'Kucing Hitam' },
  { id: 'putih', name: 'Putih', bgClass: 'bg-slate-100', borderClass: 'border-slate-300', exampleIcon: '☁️', exampleName: 'Awan' },
];

export default function ColorModule({ onBack, onAddStar }: ColorModuleProps) {
  const [selectedColor, setSelectedColor] = useState<ColorItem | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const handleSelectColor = (item: ColorItem) => {
    setSelectedColor(item);
    playAudio(item.name);
    onAddStar();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          type="button"
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border-2 border-slate-200 hover:bg-slate-50 font-bold text-slate-700 active:scale-95 transition"
        >
          <ArrowLeft size={20} />
          <span>{"Kembali"}</span>
        </button>

        <h2 className="text-2xl font-black text-amber-500 flex items-center gap-2">
          <span>{"🌈"}</span>
          <span>{"Belajar Warna"}</span>
        </h2>
      </div>

      {selectedColor !== null && (
        <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-amber-300 text-center mb-8 transition">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              {selectedColor.name}
            </span>
            <button
              onClick={() => playAudio(selectedColor.name)}
              type="button"
              className="bg-amber-100 p-3 rounded-full text-amber-600 hover:bg-amber-200 transition"
              title="Putar Suara"
            >
              <Volume2 size={24} />
            </button>
          </div>

          <div className={`${selectedColor.bgClass} w-32 h-32 mx-auto rounded-3xl shadow-lg border-4 ${selectedColor.borderClass} flex items-center justify-center text-6xl mb-4 transition transform hover:scale-110`}>
            {selectedColor.exampleIcon}
          </div>

          <h3 className="text-3xl font-black text-slate-700 mb-1">
            {selectedColor.name}
          </h3>

          <p className="text-slate-500 font-bold text-base mb-2">
            {"Contoh: "} <span className="text-amber-600">{selectedColor.exampleName}</span>
          </p>

          <p className="text-slate-400 font-bold text-sm flex items-center justify-center gap-1 mt-3">
            <Sparkles size={16} className="text-amber-400" />
            <span>{"Kamu dapat +1 Bintang!"}</span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {colorData.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSelectColor(item)}
            type="button"
            className={`${item.bgClass} ${item.id === 'putih' ? 'text-slate-800' : 'text-white'} p-5 rounded-3xl shadow-lg border-b-8 ${item.borderClass} flex flex-col items-center justify-between transition transform hover:-translate-y-1 active:scale-95 min-h-[130px]`}
          >
            <span className="text-4xl my-1">{item.exampleIcon}</span>
            <span className="text-xs font-black bg-black/20 text-white px-3 py-0.5 rounded-full mt-2">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}