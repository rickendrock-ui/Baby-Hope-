import { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Sparkles } from 'lucide-react';
import { playAudio } from '../utils/audio';

interface FruitModuleProps {
  onBack: () => void;
  onAddStar: () => void;
}

interface FruitItem {
  id: string;
  name: string;
  icon: string;
  category: 'Buah' | 'Sayur';
  bgColor: string;
  borderColor: string;
  benefit: string;
}

const fruitData: FruitItem[] = [
  { id: 'apel', name: 'Apel', icon: '🍎', category: 'Buah', bgColor: 'bg-red-400', borderColor: 'border-red-600', benefit: 'Kaya vitamin & bikin sehat!' },
  { id: 'pisang', name: 'Pisang', icon: '🍌', category: 'Buah', bgColor: 'bg-yellow-400', borderColor: 'border-yellow-600', benefit: 'Memberi energi untuk bermain!' },
  { id: 'jeruk', name: 'Jeruk', icon: '🍊', category: 'Buah', bgColor: 'bg-orange-400', borderColor: 'border-orange-600', benefit: 'Kaya Vitamin C!' },
  { id: 'semangka', name: 'Semangka', icon: '🍉', category: 'Buah', bgColor: 'bg-emerald-400', borderColor: 'border-emerald-600', benefit: 'Segar dan manis!' },
  { id: 'anggur', name: 'Anggur', icon: '🍇', category: 'Buah', bgColor: 'bg-purple-400', borderColor: 'border-purple-600', benefit: 'Manis dan lezat!' },
  { id: 'wortel', name: 'Wortel', icon: '🥕', category: 'Sayur', bgColor: 'bg-orange-500', borderColor: 'border-orange-700', benefit: 'Bagus untuk kesehatan mata!' },
  { id: 'brokoli', name: 'Brokoli', icon: '🥦', category: 'Sayur', bgColor: 'bg-green-500', borderColor: 'border-green-700', benefit: 'Bikin tubuh kuat dan pintar!' },
  { id: 'tomat', name: 'Tomat', icon: '🍅', category: 'Sayur', bgColor: 'bg-rose-500', borderColor: 'border-rose-700', benefit: 'Segar dan kaya nutrisi!' },
  { id: 'jagung', name: 'Jagung', icon: '🌽', category: 'Sayur', bgColor: 'bg-amber-400', borderColor: 'border-amber-600', benefit: 'Manis dan bikin kenyang!' },
  { id: 'alpukat', name: 'Alpukat', icon: '🥑', category: 'Buah', bgColor: 'bg-lime-500', borderColor: 'border-lime-700', benefit: 'Lemak baik untuk otak!' },
];

export default function FruitModule({ onBack, onAddStar }: FruitModuleProps) {
  const [selectedItem, setSelectedItem] = useState<FruitItem | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const handleSelectItem = (item: FruitItem) => {
    setSelectedItem(item);
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

        <h2 className="text-2xl font-black text-orange-500 flex items-center gap-2">
          <span>{"🍎"}</span>
          <span>{"Buah & Sayur"}</span>
        </h2>
      </div>

      {/* Detail Kartu Buah/Sayur */}
      {selectedItem && (
        <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-orange-300 text-center mb-8 transition">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-xs font-black text-white px-3 py-1 rounded-full ${selectedItem.category === 'Buah' ? 'bg-orange-500' : 'bg-green-500'}`}>
              {selectedItem.category}
            </span>
            <button
              onClick={() => playAudio(selectedItem.name)}
              type="button"
              className="bg-orange-100 p-3 rounded-full text-orange-600 hover:bg-orange-200 transition"
              title="Putar Suara"
            >
              <Volume2 size={24} />
            </button>
          </div>

          <div className="text-8xl my-2 transform hover:scale-110 transition duration-300 inline-block">
            {selectedItem.icon}
          </div>

          <h3 className="text-3xl font-black text-slate-800 tracking-wide">
            {selectedItem.name}
          </h3>

          <p className="text-slate-500 font-bold text-base mt-1">
            ✨ {selectedItem.benefit}
          </p>

          <p className="text-slate-400 font-bold text-sm flex items-center justify-center gap-1 mt-3">
            <Sparkles size={16} className="text-amber-400" />
            <span>{"Kamu dapat +1 Bintang!"}</span>
          </p>
        </div>
      )}

      {/* Grid Tombol Buah & Sayur */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {fruitData.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSelectItem(item)}
            type="button"
            className={`${item.bgColor} text-white p-4 rounded-3xl shadow-lg border-b-8 ${item.borderColor} flex flex-col items-center justify-between transition transform hover:-translate-y-1 active:scale-95 min-h-[130px]`}
          >
            <span className="text-5xl my-1">{item.icon}</span>
            <span className="text-xs font-black bg-black/20 px-2.5 py-0.5 rounded-full mt-2">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}