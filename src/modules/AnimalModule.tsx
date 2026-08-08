import React, { useState } from 'react';
import { ArrowLeft, Volume2, Sparkles, Dog } from 'lucide-react';

interface AnimalModuleProps {
  onBack?: () => void;
  onAddStar?: () => void;
}

interface AnimalItem {
  id: string;
  name: string;
  soundText: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const AnimalModule: React.FC<AnimalModuleProps> = ({ onBack, onAddStar }) => {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalItem | null>(null);

  const animals: AnimalItem[] = [
    { id: 'kucing', name: 'Kucing', soundText: 'Meow... Meow...', emoji: '🐱', color: 'text-amber-600', bgColor: 'bg-amber-50 hover:bg-amber-100', borderColor: 'border-amber-200' },
    { id: 'anjing', name: 'Anjing', soundText: 'Guk... Guk!', emoji: '🐶', color: 'text-amber-800', bgColor: 'bg-amber-100 hover:bg-amber-200', borderColor: 'border-amber-300' },
    { id: 'sapi', name: 'Sapi', soundText: 'Moo... Moo...', emoji: '🐮', color: 'text-emerald-600', bgColor: 'bg-emerald-50 hover:bg-emerald-100', borderColor: 'border-emerald-200' },
    { id: 'ayam', name: 'Ayam', soundText: 'Kukuruyuk!', emoji: '🐔', color: 'text-rose-600', bgColor: 'bg-rose-50 hover:bg-rose-100', borderColor: 'border-rose-200' },
    { id: 'bebek', name: 'Bebek', soundText: 'Kwek... Kwek!', emoji: '🦆', color: 'text-yellow-600', bgColor: 'bg-yellow-50 hover:bg-yellow-100', borderColor: 'border-yellow-200' },
    { id: 'gajah', name: 'Gajah', soundText: 'Tooooot!', emoji: '🐘', color: 'text-slate-600', bgColor: 'bg-slate-50 hover:bg-slate-100', borderColor: 'border-slate-200' },
    { id: 'singa', name: 'Singa', soundText: 'Roaaar!', emoji: '🦁', color: 'text-orange-600', bgColor: 'bg-orange-50 hover:bg-orange-100', borderColor: 'border-orange-200' },
    { id: 'kelinci', name: 'Kelinci', soundText: 'Pyuk... Pyuk!', emoji: '🐰', color: 'text-pink-600', bgColor: 'bg-pink-50 hover:bg-pink-100', borderColor: 'border-pink-200' },
    { id: 'monyet', name: 'Monyet', soundText: 'Uu.. Aa.. Uu.. Aa!', emoji: '🐵', color: 'text-amber-700', bgColor: 'bg-amber-50 hover:bg-amber-100', borderColor: 'border-amber-200' },
    { id: 'domba', name: 'Domba', soundText: 'Mbee... Mbee...', emoji: '🐑', color: 'text-sky-600', bgColor: 'bg-sky-50 hover:bg-sky-100', borderColor: 'border-sky-200' },
    { id: 'burung', name: 'Burung', soundText: 'Cip... Cip... Cuit!', emoji: '🐦', color: 'text-cyan-600', bgColor: 'bg-cyan-50 hover:bg-cyan-100', borderColor: 'border-cyan-200' },
    { id: 'katak', name: 'Katak', soundText: 'Kungkung... Kungkung!', emoji: '🐸', color: 'text-green-600', bgColor: 'bg-green-50 hover:bg-green-100', borderColor: 'border-green-200' },
  ];

  const handleAnimalClick = (animal: AnimalItem) => {
    setSelectedAnimal(animal);
    if (onAddStar) {
      onAddStar();
    }

    // Bicara Nama & Suara Hewan jika browser mendukung
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${animal.name}. Bersuara ${animal.soundText}`);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-emerald-100 relative">
      {/* Tombol Kembali */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 font-bold transition-all shadow-sm mb-6"
        >
          <ArrowLeft size={18} /> Kembali
        </button>
      )}

      {/* Judul Modul */}
      <div className="text-center mb-8">
        <div className="inline-flex p-3 bg-emerald-100 rounded-2xl text-emerald-600 mb-2">
          <Dog size={40} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-emerald-600">Dunia Hewan & Suaranya</h1>
        <p className="text-slate-500 mt-1 font-semibold">Klik hewan untuk mendengarkan nama & suaranya! ⭐</p>
      </div>

      {/* Detail Hewan Terpilih */}
      {selectedAnimal && (
        <div className="mb-8 p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-200 text-center animate-fade-in relative overflow-hidden">
          <div className="text-7xl mb-2 animate-bounce">{selectedAnimal.emoji}</div>
          <h2 className="text-2xl font-black text-slate-800">{selectedAnimal.name}</h2>
          <p className="text-lg font-bold text-emerald-600 mt-1 flex items-center justify-center gap-2">
            <Volume2 size={20} /> "{selectedAnimal.soundText}"
          </p>
          <div className="mt-2 inline-flex items-center gap-1 text-xs font-black bg-amber-300 text-amber-900 px-3 py-1 rounded-full">
            <Sparkles size={14} /> Dapat 1 Bintang!
          </div>
        </div>
      )}

      {/* Grid Hewan */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {animals.map((item) => (
          <button
            key={item.id}
            onClick={() => handleAnimalClick(item)}
            className={`p-5 rounded-2xl flex flex-col items-center justify-center border-2 shadow-md transform hover:-translate-y-1 active:scale-95 transition-all ${item.bgColor} ${item.borderColor}`}
          >
            <span className="text-5xl mb-2">{item.emoji}</span>
            <span className={`font-black text-lg ${item.color}`}>{item.name}</span>
            <span className="text-xs font-semibold text-slate-400 mt-1">{item.soundText}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnimalModule;