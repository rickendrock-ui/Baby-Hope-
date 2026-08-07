import { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Sparkles } from 'lucide-react';
import { playAudio } from '../utils/audio';

interface NumberModuleProps {
  onBack: () => void;
  onAddStar: () => void;
}

interface NumberItem {
  num: number;
  word: string;
  fruit: string;
  color: string;
}

const numberData: NumberItem[] = [
  { num: 1, word: 'Satu', fruit: '🍎', color: 'bg-red-400 border-red-600' },
  { num: 2, word: 'Dua', fruit: '🍊', color: 'bg-orange-400 border-orange-600' },
  { num: 3, word: 'Tiga', fruit: '🍌', color: 'bg-amber-400 border-amber-600' },
  { num: 4, word: 'Empat', fruit: '🍇', color: 'bg-purple-400 border-purple-600' },
  { num: 5, word: 'Lima', fruit: '🍉', color: 'bg-emerald-400 border-emerald-600' },
  { num: 6, word: 'Enam', fruit: '🍓', color: 'bg-pink-400 border-pink-600' },
  { num: 7, word: 'Tujuh', fruit: '🍍', color: 'bg-yellow-500 border-yellow-700' },
  { num: 8, word: 'Delapan', fruit: '🍒', color: 'bg-rose-500 border-rose-700' },
  { num: 9, word: 'Sembilan', fruit: '🥝', color: 'bg-lime-500 border-lime-700' },
  { num: 10, word: 'Sepuluh', fruit: '🥑', color: 'bg-teal-500 border-teal-700' },
];

export default function NumberModule({ onBack, onAddStar }: NumberModuleProps) {
  const [selectedNum, setSelectedNum] = useState<NumberItem | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const handleSelectNumber = (item: NumberItem) => {
    setSelectedNum(item);
    playAudio(item.word);
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

        <h2 className="text-2xl font-black text-sky-500 flex items-center gap-2">
          <span>{"🔢"}</span>
          <span>{"Belajar Angka"}</span>
        </h2>
      </div>

      {selectedNum !== null && (
        <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-sky-300 text-center mb-8 transition">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-extrabold text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
              {selectedNum.word}
            </span>
            <button
              onClick={() => playAudio(selectedNum.word)}
              type="button"
              className="bg-sky-100 p-3 rounded-full text-sky-600 hover:bg-sky-200 transition"
              title="Putar Suara"
            >
              <Volume2 size={24} />
            </button>
          </div>

          <div className="text-8xl font-black text-sky-500 my-1">
            {selectedNum.num}
          </div>

          <div className="flex flex-wrap justify-center gap-2 my-4 bg-sky-50 p-4 rounded-2xl border-2 border-dashed border-sky-200">
            {Array.from({ length: selectedNum.num }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => playAudio(`${index + 1}`)}
                className="text-4xl transform hover:scale-125 transition active:scale-90"
                title={`Buah ke-${index + 1}`}
              >
                {selectedNum.fruit}
              </button>
            ))}
          </div>

          <p className="text-slate-400 font-bold text-sm flex items-center justify-center gap-1">
            <Sparkles size={16} className="text-amber-400" />
            <span>{"Sentuh buah di atas untuk menghitung!"}</span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {numberData.map((item) => (
          <button
            key={item.num}
            onClick={() => handleSelectNumber(item)}
            type="button"
            className={`${item.color} text-white p-5 rounded-3xl shadow-lg border-b-8 flex flex-col items-center justify-between transition transform hover:-translate-y-1 active:scale-95 min-h-[130px]`}
          >
            <span className="text-5xl font-black">{item.num}</span>
            <span className="text-sm font-bold bg-black/20 px-3 py-0.5 rounded-full mt-2">
              {item.word}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}