import { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Sparkles } from 'lucide-react';
import { playAudio } from '../utils/audio';

interface AlphabetModuleProps {
  onBack: () => void;
  onAddStar: () => void;
}

interface AlphabetItem {
  letter: string;
  word: string;
  icon: string;
}

const alphabetData: AlphabetItem[] = [
  { letter: 'A', word: 'Apel', icon: '🍎' },
  { letter: 'B', word: 'Bola', icon: '⚽' },
  { letter: 'C', word: 'Cermin', icon: '🪞' },
  { letter: 'D', word: 'Domba', icon: '🐑' },
  { letter: 'E', word: 'Elang', icon: '🦅' },
  { letter: 'F', word: 'Foto', icon: '🖼️' },
  { letter: 'G', word: 'Gajah', icon: '🐘' },
  { letter: 'H', word: 'Harimau', icon: '🐯' },
  { letter: 'I', word: 'Ikan', icon: '🐟' },
  { letter: 'J', word: 'Jeruk', icon: '🍊' },
  { letter: 'K', word: 'Kucing', icon: '🐱' },
  { letter: 'L', word: 'Lemon', icon: '🍋' },
  { letter: 'M', word: 'Mobil', icon: '🚗' },
  { letter: 'N', word: 'Nanas', icon: '🍍' },
  { letter: 'O', word: 'Obat', icon: '💊' },
  { letter: 'P', word: 'Pisang', icon: '🍌' },
  { letter: 'Q', word: 'Quran', icon: '📖' },
  { letter: 'R', word: 'Roti', icon: '🍞' },
  { letter: 'S', word: 'Sepatu', icon: '👟' },
  { letter: 'T', word: 'Topi', icon: '🧢' },
  { letter: 'U', word: 'Ulat', icon: '🐛' },
  { letter: 'V', word: 'Vaso', icon: '🏺' },
  { letter: 'W', word: 'Wortel', icon: '🥕' },
  { letter: 'X', word: 'Xilofon', icon: '🎼' },
  { letter: 'Y', word: 'Yo-yo', icon: '🪀' },
  { letter: 'Z', word: 'Zebra', icon: '🦓' },
];

export default function AlphabetModule({ onBack, onAddStar }: AlphabetModuleProps) {
  const [selectedItem, setSelectedItem] = useState<AlphabetItem | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const handleSelectLetter = (item: AlphabetItem) => {
    setSelectedItem(item);
    // Menyebutkan Huruf lalu Gambar (contoh: "A, Apel")
    playAudio(`${item.letter}, ${item.word}`);
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

        <h2 className="text-2xl font-black text-pink-500 flex items-center gap-2">
          <span>{"🔤"}</span>
          <span>{"Belajar Huruf"}</span>
        </h2>
      </div>

      {/* Pop-up Tampilan Kartu Huruf Detail */}
      {selectedItem && (
        <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-pink-300 text-center mb-8 transition">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-extrabold text-pink-500 bg-pink-100 px-3 py-1 rounded-full">
              {"Huruf "} {selectedItem.letter}
            </span>
            <button
              onClick={() => playAudio(`${selectedItem.letter}, ${selectedItem.word}`)}
              type="button"
              className="bg-pink-100 p-3 rounded-full text-pink-600 hover:bg-pink-200 transition"
              title="Putar Suara"
            >
              <Volume2 size={24} />
            </button>
          </div>

          <div className="text-7xl mb-2">{selectedItem.icon}</div>
          <h3 className="text-4xl font-black text-slate-800 tracking-wide">
            {selectedItem.word}
          </h3>

          <p className="text-slate-400 font-bold text-sm flex items-center justify-center gap-1 mt-3">
            <Sparkles size={16} className="text-amber-400" />
            <span>{"Sentuh ikon suara untuk mendengar lagi!"}</span>
          </p>
        </div>
      )}

      {/* Grid Tombol Huruf A-Z */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {alphabetData.map((item) => (
          <button
            key={item.letter}
            onClick={() => handleSelectLetter(item)}
            type="button"
            className="bg-white border-b-8 border-pink-300 hover:border-pink-400 p-4 rounded-2xl shadow-md flex flex-col items-center justify-center transition transform hover:-translate-y-1 active:scale-95 active:border-b-0"
          >
            <span className="text-4xl font-black text-pink-500">{item.letter}</span>
            <span className="text-xs font-bold text-slate-400 mt-1">{item.word}</span>
          </button>
        ))}
      </div>
    </div>
  );
}