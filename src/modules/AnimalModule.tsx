import { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Sparkles } from 'lucide-react';
import { playAudio } from '../utils/audio';

interface AnimalModuleProps {
  onBack: () => void;
  onAddStar: () => void;
}

interface AnimalItem {
  id: string;
  name: string;
  soundText: string;
  icon: string;
  bgColor: string;
  borderColor: string;
}

const animalData: AnimalItem[] = [
  { id: 'kucing', name: 'Kucing', soundText: 'Meong, meong!', icon: '🐱', bgColor: 'bg-amber-400', borderColor: 'border-amber-600' },
  { id: 'anjing', name: 'Anjing', soundText: 'Guk, guk!', icon: '🐶', bgColor: 'bg-orange-400', borderColor: 'border-orange-600' },
  { id: 'sapi', name: 'Sapi', soundText: 'Moo, o, o!', icon: '🐮', bgColor: 'bg-emerald-400', borderColor: 'border-emerald-600' },
  { id: 'ayam', name: 'Ayam', soundText: 'Kukuruyuk!', icon: '🐔', bgColor: 'bg-red-400', borderColor: 'border-red-600' },
  { id: 'bebek', name: 'Bebek', soundText: 'Kwek, kwek, kwek!', icon: '🦆', bgColor: 'bg-yellow-400', borderColor: 'border-yellow-600' },
  { id: 'singa', name: 'Singa', soundText: 'Roar!', icon: '🦁', bgColor: 'bg-amber-500', borderColor: 'border-amber-700' },
  { id: 'gajah', name: 'Gajah', soundText: 'Tet, u, u!', icon: '🐘', bgColor: 'bg-slate-400', borderColor: 'border-slate-600' },
  { id: 'kuda', name: 'Kuda', soundText: 'Ihi, hi, hi!', icon: '🐴', bgColor: 'bg-amber-700', borderColor: 'border-amber-900' },
  { id: 'monyet', name: 'Monyet', soundText: 'Uuk, aa, aa!', icon: '🐵', bgColor: 'bg-amber-600', borderColor: 'border-amber-800' },
  { id: 'katak', name: 'Katak', soundText: 'Kungkung, kungkung!', icon: '🐸', bgColor: 'bg-green-500', borderColor: 'border-green-700' },
  { id: 'burung', name: 'Burung', soundText: 'Cip, cip, cip!', icon: '🐦', bgColor: 'bg-sky-400', borderColor: 'border-sky-600' },
  { id: 'domba', name: 'Domba', soundText: 'Mbee, e, e!', icon: '🐑', bgColor: 'bg-teal-400', borderColor: 'border-teal-600' },
];

export default function AnimalModule({ onBack, onAddStar }: AnimalModuleProps) {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalItem | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const handleSelectAnimal = (item: AnimalItem) => {
    setSelectedAnimal(item);
    
    // Kecepatan dibuat 0.8 (lebih lambat) & ditambah titik/koma agar berintonasi jelas
    const spokenText = `${item.name}. Suaranya... ${item.soundText}`;
    playAudio(spokenText, 0.8);
    
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

        <h2 className="text-2xl font-black text-emerald-600 flex items-center gap-2">
          <span>{"🦁"}</span>
          <span>{"Mengenal Hewan"}</span>
        </h2>
      </div>

      {/* Detail Kartu Hewan */}
      {selectedAnimal && (
        <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-emerald-300 text-center mb-8 transition">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-extrabold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
              {selectedAnimal.name}
            </span>
            <button
              onClick={() => playAudio(`${selectedAnimal.name}. Suaranya... ${selectedAnimal.soundText}`, 0.8)}
              type="button"
              className="bg-emerald-100 p-3 rounded-full text-emerald-600 hover:bg-emerald-200 transition"
              title="Putar Suara"
            >
              <Volume2 size={24} />
            </button>
          </div>

          <div 
            className="text-8xl my-2 transform hover:scale-110 transition duration-300 inline-block cursor-pointer"
            onClick={() => playAudio(selectedAnimal.soundText, 0.8)}
          >
            {selectedAnimal.icon}
          </div>

          <h3 className="text-3xl font-black text-slate-800 tracking-wide">
            {selectedAnimal.name}
          </h3>

          <p className="text-emerald-600 font-extrabold text-lg mt-1 italic">
            "{selectedAnimal.soundText}"
          </p>

          <p className="text-slate-400 font-bold text-sm flex items-center justify-center gap-1 mt-3">
            <Sparkles size={16} className="text-amber-400" />
            <span>{"Klik gambar untuk mendengar suara hewan lagi!"}</span>
          </p>
        </div>
      )}

      {/* Grid Tombol Hewan */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {animalData.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSelectAnimal(item)}
            type="button"
            className={`${item.bgColor} text-white p-4 rounded-3xl shadow-lg border-b-8 ${item.borderColor} flex flex-col items-center justify-between transition transform hover:-translate-y-1 active:scale-95 min-h-[130px]`}
          >
            <span className="text-5xl my-1">{item.icon}</span>
            <span className="text-sm font-black bg-black/20 px-3 py-0.5 rounded-full mt-2">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}