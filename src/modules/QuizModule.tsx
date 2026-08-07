import { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { playAudio } from '../utils/audio';

interface QuizModuleProps {
  onBack: () => void;
  onAddStar: () => void;
}

interface Question {
  id: number;
  questionText: string;
  correctAnswer: string;
  options: { name: string; icon: string }[];
}

const questionsPool: Question[] = [
  {
    id: 1,
    questionText: 'Mana gambar Kucing?',
    correctAnswer: 'Kucing',
    options: [
      { name: 'Kucing', icon: '🐱' },
      { name: 'Anjing', icon: '🐶' },
      { name: 'Sapi', icon: '🐮' },
    ],
  },
  {
    id: 2,
    questionText: 'Mana angka Tiga?',
    correctAnswer: '3',
    options: [
      { name: '1', icon: '1️⃣' },
      { name: '3', icon: '3️⃣' },
      { name: '5', icon: '5️⃣' },
    ],
  },
  {
    id: 3,
    questionText: 'Mana warna Merah?',
    correctAnswer: 'Merah',
    options: [
      { name: 'Merah', icon: '🔴' },
      { name: 'Biru', icon: '🔵' },
      { name: 'Kuning', icon: '🟡' },
    ],
  },
  {
    id: 4,
    questionText: 'Mana buah Apel?',
    correctAnswer: 'Apel',
    options: [
      { name: 'Pisang', icon: '🍌' },
      { name: 'Apel', icon: '🍎' },
      { name: 'Jeruk', icon: '🍊' },
    ],
  },
  {
    id: 5,
    questionText: 'Mana bentuk Bintang?',
    correctAnswer: 'Bintang',
    options: [
      { name: 'Lingkaran', icon: '⭕' },
      { name: 'Segitiga', icon: '🔺' },
      { name: 'Bintang', icon: '⭐' },
    ],
  },
  {
    id: 6,
    questionText: 'Mana hewan Ayam?',
    correctAnswer: 'Ayam',
    options: [
      { name: 'Ayam', icon: '🐔' },
      { name: 'Bebek', icon: '🦆' },
      { name: 'Burung', icon: '🐦' },
    ],
  },
];

export default function QuizModule({ onBack, onAddStar }: QuizModuleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = questionsPool[currentIndex];

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
    // Ucapkan pertanyaan saat pertanyaan berganti
    playAudio(currentQuestion.questionText, 0.8);
  }, [currentIndex]);

  const handleAnswer = (optionName: string) => {
    setSelectedOption(optionName);
    if (optionName === currentQuestion.correctAnswer) {
      setIsCorrect(true);
      playAudio('Hore, kamu hebat dan pintar!', 0.85);
      onAddStar();
    } else {
      setIsCorrect(false);
      playAudio('Tetot! Coba tebak lagi ya!', 0.85);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setCurrentIndex((prev) => (prev + 1) % questionsPool.length);
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

        <h2 className="text-2xl font-black text-indigo-600 flex items-center gap-2">
          <span>{"🎮"}</span>
          <span>{"Kuis Pintar"}</span>
        </h2>
      </div>

      {/* Kartu Pertanyaan Utama */}
      <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-indigo-300 text-center mb-6 relative">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-black text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
            {"Soal "} {currentIndex + 1} {" dari "} {questionsPool.length}
          </span>
          <button
            onClick={() => playAudio(currentQuestion.questionText, 0.8)}
            type="button"
            className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-200 transition"
            title="Ulangi Pertanyaan"
          >
            <Volume2 size={24} />
          </button>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 my-4">
          "{currentQuestion.questionText}"
        </h3>

        {/* Status Jawaban */}
        {isCorrect === true && (
          <div className="bg-emerald-100 text-emerald-700 p-3 rounded-2xl font-black text-lg flex items-center justify-center gap-2 animate-bounce">
            <Sparkles className="text-amber-500 fill-amber-400" size={24} />
            <span>{"Hore, Jawabanmu Benar! +1 Bintang"}</span>
          </div>
        )}

        {isCorrect === false && (
          <div className="bg-rose-100 text-rose-700 p-3 rounded-2xl font-black text-lg">
            <span>{"Hampir benar! Coba pilih gambar lain ya 😉"}</span>
          </div>
        )}
      </div>

      {/* Pilihan Jawaban */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {currentQuestion.options.map((option) => (
          <button
            key={option.name}
            onClick={() => handleAnswer(option.name)}
            type="button"
            className={`p-6 rounded-3xl shadow-lg border-b-8 flex flex-col items-center justify-center transition transform active:scale-95 ${
              selectedOption === option.name
                ? option.name === currentQuestion.correctAnswer
                  ? 'bg-emerald-500 border-emerald-700 text-white'
                  : 'bg-rose-500 border-rose-700 text-white'
                : 'bg-white border-indigo-200 hover:border-indigo-400 text-slate-800'
            }`}
          >
            <span className="text-6xl my-2">{option.icon}</span>
            <span className="text-sm font-black mt-2">{option.name}</span>
          </button>
        ))}
      </div>

      {/* Tombol Lanjut Soal */}
      {isCorrect === true && (
        <div className="text-center">
          <button
            onClick={handleNextQuestion}
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg px-8 py-4 rounded-2xl shadow-xl border-b-4 border-indigo-900 transition transform hover:-translate-y-1 active:scale-95 flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={22} />
            <span>{"Soal Berikutnya"}</span>
          </button>
        </div>
      )}
    </div>
  );
}