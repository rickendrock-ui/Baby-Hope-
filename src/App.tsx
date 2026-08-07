import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA MODUL ---
interface GameModule {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  color: string;
  voiceText: string;
}

const modulesData: GameModule[] = [
  { id: 'quiz', title: 'Kuis Pintar', subtitle: 'Main Tebak-Tebakan & Dapat Bintang!', icon: '🎮', badge: 'Game 🏆', color: 'from-indigo-500 to-purple-600', voiceText: 'Ayo main kuis pintar dan dapatkan bintang!' },
  { id: 'alphabet', title: 'Huruf A-Z', subtitle: 'Mengenal Abjad & Kata', icon: '🔤', badge: 'Dasar 🖍️', color: 'from-pink-400 to-rose-500', voiceText: 'Kita belajar huruf A sampai Z yuk!' },
  { id: 'numbers', title: 'Angka 1-10', subtitle: 'Hitung Balon & Bintang', icon: '🔢', badge: 'Berhitung 🧮', color: 'from-blue-400 to-blue-600', voiceText: 'Satu, dua, tiga! Mari berhitung!' },
  { id: 'colors', title: 'Warna-Warni', subtitle: 'Mengenal Warna & Objek', icon: '🌈', badge: 'Kreatif 🎨', color: 'from-yellow-400 to-amber-500', voiceText: 'Lihat warna-warni indah sekali!' },
  { id: 'animals', title: 'Dunia Hewan', subtitle: 'Suara & Nama Hewan', icon: '🦁', badge: 'Seru! 🔊', color: 'from-green-400 to-emerald-600', voiceText: 'Lucunya hewan-hewan ini!' },
  { id: 'shapes', title: 'Bentuk Geometri', subtitle: 'Lingkaran, Bintang, Persegi', icon: '🔷', badge: 'Pintar 🧠', color: 'from-purple-400 to-indigo-500', voiceText: 'Belajar bentuk bersama-sama!' },
  { id: 'fruits', title: 'Buah & Sayur', subtitle: 'Apel, Pisang & Sayuran Sehat', icon: '🍎', badge: 'Sehat 🍌', color: 'from-orange-400 to-red-500', voiceText: 'Buah dan sayur bikin badan sehat!' },
];

// --- FUNGSI SUARA ANAK PEREMPUAN ---
const speakAsChild = (text: string) => {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID';
  utterance.pitch = 1.6; // Suara anak perempuan riang 4 tahun
  utterance.rate = 0.95;
  utterance.volume = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find((v) => v.lang.includes('id') || v.lang.includes('ID'));
  if (idVoice) utterance.voice = idVoice;

  window.speechSynthesis.speak(utterance);
};

// --- BACKGROUND INTERAKTIF ANIME/AWAN ---
const InteractiveBackground: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-pink-200 to-amber-100 opacity-80" />
    <motion.div className="absolute top-8 left-8 text-7xl opacity-40" animate={{ y: [0, -20, 0], x: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>☁️</motion.div>
    <motion.div className="absolute top-24 right-12 text-8xl opacity-40" animate={{ y: [0, 25, 0], x: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>☁️</motion.div>
    <motion.div className="absolute bottom-16 left-1/4 text-6xl opacity-30" animate={{ scale: [1, 1.25, 1], rotate: [0, 15, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>⭐</motion.div>
    <motion.div className="absolute top-1/3 right-1/4 text-7xl opacity-30" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>🌟</motion.div>
  </div>
);

// --- MODAL PARENTAL GATE ---
const ParentModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [num1] = useState(Math.floor(Math.random() * 5) + 3);
  const [num2] = useState(Math.floor(Math.random() * 4) + 1);
  const [ans, setAns] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isOpen) return null;

  const handleVerify = () => {
    if (parseInt(ans) === num1 + num2) {
      setIsUnlocked(true);
    } else {
      alert('Jawaban salah. Fitur ini khusus untuk Orang Tua.');
      setAns('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border-4 border-amber-400">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">🛡️ Area Orang Tua</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">✖</button>
        </div>
        {!isUnlocked ? (
          <div className="flex flex-col items-center">
            <p className="text-gray-600 text-center mb-4 font-semibold">Bantu jawab soal ini untuk membuka pengaturan:</p>
            <div className="text-3xl font-extrabold text-amber-600 bg-amber-50 px-6 py-3 rounded-2xl mb-4 border-2 border-amber-200">
              {num1} + {num2} = ?
            </div>
            <input 
              type="number" 
              value={ans} 
              onChange={(e) => setAns(e.target.value)} 
              placeholder="Jawaban..." 
              className="w-full text-center text-xl p-3 border-2 border-gray-300 rounded-xl mb-4 focus:border-amber-500 outline-none font-bold" 
            />
            <button onClick={handleVerify} className="w-full bg-amber-500 text-white font-extrabold py-3 rounded-xl shadow-md hover:bg-amber-600 transition">
              Buka Pengaturan 🔓
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-green-100 text-green-800 rounded-xl text-center font-bold">✅ Pengaturan Terbuka</div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Batasan Waktu Bermain</label>
              <select className="w-full p-2 border rounded-xl font-bold">
                <option>Tanpa Batas</option>
                <option>15 Menit</option>
                <option>30 Menit</option>
              </select>
            </div>
            <button onClick={() => { setIsUnlocked(false); onClose(); }} className="w-full bg-blue-500 text-white font-bold py-2.5 rounded-xl">Simpan & Tutup</button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MODUL INTERAKTIF UTAMA (VIEWER) ---
interface ModuleViewerProps {
  moduleId: string;
  onBack: () => void;
  onAddStar: () => void;
}

const ModuleViewer: React.FC<ModuleViewerProps> = ({ moduleId, onBack, onAddStar }) => {
  const currentModule = modulesData.find((m) => m.id === moduleId);

  // STATE KUIS PINTAR
  const [quizScore, setQuizScore] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const quizQuestions = [
    { question: 'Hewan mana yang bersuara "Meong Meong"?', options: [{ text: 'Anjing 🐶', correct: false }, { text: 'Kucing 🐱', correct: true }, { text: 'Sapi 🐮', correct: false }] },
    { question: 'Warna apakah buah Apel ini? 🍎', options: [{ text: 'Merah 🔴', correct: true }, { text: 'Biru 🔵', correct: false }, { text: 'Kuning 🟡', correct: false }] },
    { question: 'Manakah bentuk Bintang? ⭐', options: [{ text: 'Lingkaran ⚪', correct: false }, { text: 'Segitiga 🔺', correct: false }, { text: 'Bintang ⭐', correct: true }] }
  ];

  const handleQuizAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      speakAsChild("Horeee! Jawaban kamu benar sekali! Kamu hebat!");
      setQuizScore((prev) => prev + 1);
      onAddStar(); // Reward Bintang
    } else {
      speakAsChild("Oops, hampir benar! Coba lagi ya!");
    }

    if (quizStep < quizQuestions.length - 1) {
      setTimeout(() => setQuizStep((prev) => prev + 1), 1000);
    } else {
      setTimeout(() => {
        speakAsChild("Selamat! Kamu berhasil menyelesaikan Kuis Pintar!");
      }, 1200);
    }
  };

  // RENDER INTERAKTIF SETIAP MODUL
  const renderInteractiveContent = () => {
    switch (moduleId) {
      case 'alphabet':
        const alphabetData = [
          { char: 'A', word: 'Apel', icon: '🍎' },
          { char: 'B', word: 'Bebek', icon: '🦆' },
          { char: 'C', word: 'Cokelat', icon: '🍫' },
          { char: 'D', word: 'Domba', icon: '🐑' },
          { char: 'E', word: 'Elang', icon: '🦅' },
          { char: 'F', word: 'Foto', icon: '📷' },
          { char: 'G', word: 'Gajah', icon: '🐘' },
          { char: 'H', word: 'Harimau', icon: '🐯' },
          { char: 'I', word: 'Ikan', icon: '🐟' },
          { char: 'J', word: 'Jeruk', icon: '🍊' },
          { char: 'K', word: 'Kucing', icon: '🐱' },
          { char: 'L', word: 'Lilin', icon: '🕯️' },
        ];
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
            {alphabetData.map((item) => (
              <motion.div
                key={item.char}
                whileHover={{ scale: 1.08, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => speakAsChild(`${item.char} untuk ${item.word}`)}
                className="bg-gradient-to-tr from-pink-400 to-rose-400 text-white p-4 rounded-3xl shadow-lg border-b-4 border-pink-700 flex flex-col items-center justify-center cursor-pointer"
              >
                <span className="text-4xl font-extrabold bg-white/20 px-4 py-1 rounded-2xl mb-2">{item.char}</span>
                <span className="text-5xl mb-1">{item.icon}</span>
                <span className="font-bold text-lg">{item.word}</span>
              </motion.div>
            ))}
          </div>
        );

      case 'numbers':
        const numbersData = [
          { num: 1, word: 'Satu', icon: '🎈' },
          { num: 2, word: 'Dua', icon: '🎈🎈' },
          { num: 3, word: 'Tiga', icon: '🎈🎈🎈' },
          { num: 4, word: 'Empat', icon: '🎈🎈🎈🎈' },
          { num: 5, word: 'Lima', icon: '🎈🎈🎈🎈🎈' },
          { num: 6, word: 'Enam', icon: '🌟🌟🌟🌟🌟🌟' },
        ];
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {numbersData.map((item) => (
              <motion.div
                key={item.num}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => speakAsChild(`${item.num}. ${item.word}`)}
                className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white p-5 rounded-3xl shadow-lg border-b-4 border-blue-700 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-black bg-white/20 px-4 py-2 rounded-2xl">{item.num}</span>
                  <span className="text-2xl font-extrabold">{item.word}</span>
                </div>
                <span className="text-2xl">{item.icon}</span>
              </motion.div>
            ))}
          </div>
        );

      case 'colors':
        const colorsData = [
          { name: 'Merah', bg: 'bg-red-500', icon: '🍎' },
          { name: 'Biru', bg: 'bg-blue-500', icon: '🌊' },
          { name: 'Kuning', bg: 'bg-yellow-400', icon: '🌻' },
          { name: 'Hijau', bg: 'bg-green-500', icon: '🍃' },
          { name: 'Ungu', bg: 'bg-purple-500', icon: '🍇' },
          { name: 'Jingga', bg: 'bg-orange-500', icon: '🍊' },
        ];
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
            {colorsData.map((col) => (
              <motion.div
                key={col.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => speakAsChild(`Warna ${col.name}`)}
                className={`${col.bg} text-white p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center cursor-pointer border-b-4 border-black/20`}
              >
                <span className="text-5xl mb-2">{col.icon}</span>
                <span className="text-2xl font-black">{col.name}</span>
              </motion.div>
            ))}
          </div>
        );

      case 'animals':
        const animalsData = [
          { name: 'Kucing', sound: 'Meong Meong', icon: '🐱' },
          { name: 'Anjing', sound: 'Guk Guk', icon: '🐶' },
          { name: 'Sapi', sound: 'Muuu', icon: '🐮' },
          { name: 'Singa', sound: 'Rooaar', icon: '🦁' },
          { name: 'Ayam', sound: 'Kukuruyuk', icon: '🐔' },
          { name: 'Bebek', sound: 'Kwek Kwek', icon: '🦆' },
        ];
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
            {animalsData.map((ani) => (
              <motion.div
                key={ani.name}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => speakAsChild(`${ani.name}! Suaranya ${ani.sound}`)}
                className="bg-gradient-to-tr from-emerald-400 to-teal-500 text-white p-5 rounded-3xl shadow-xl flex flex-col items-center justify-center cursor-pointer border-b-4 border-teal-700"
              >
                <span className="text-6xl mb-2">{ani.icon}</span>
                <span className="font-extrabold text-2xl">{ani.name}</span>
                <span className="text-xs bg-white/30 px-3 py-1 rounded-full mt-2 font-bold">{ani.sound}</span>
              </motion.div>
            ))}
          </div>
        );

      case 'quiz':
        const q = quizQuestions[quizStep];
        return (
          <div className="w-full flex flex-col items-center bg-amber-50/90 p-6 rounded-3xl border-4 border-amber-300 shadow-xl">
            <div className="flex justify-between w-full mb-4 items-center">
              <span className="text-lg font-black text-amber-800">Pertanyaan {quizStep + 1} / {quizQuestions.length}</span>
              <span className="bg-yellow-300 text-yellow-900 px-4 py-1 rounded-full font-extrabold">⭐ Skor: {quizScore}</span>
            </div>

            <h3 className="text-2xl font-extrabold text-gray-800 text-center mb-6">{q.question}</h3>

            <div className="grid grid-cols-1 gap-4 w-full max-w-md">
              {q.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuizAnswer(opt.correct)}
                  className="bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xl font-extrabold py-4 px-6 rounded-2xl shadow-lg border-b-4 border-orange-600 hover:from-amber-500 hover:to-orange-500 transition"
                >
                  {opt.text}
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 'shapes':
      case 'fruits':
      default:
        const defaultItems = moduleId === 'shapes' 
          ? [{ name: 'Lingkaran', icon: '⚪' }, { name: 'Persegi', icon: '🟦' }, { name: 'Segitiga', icon: '🔺' }, { name: 'Bintang', icon: '⭐' }]
          : [{ name: 'Apel', icon: '🍎' }, { name: 'Pisang', icon: '🍌' }, { name: 'Jeruk', icon: '🍊' }, { name: 'Wortel', icon: '🥕' }];
        return (
          <div className="grid grid-cols-2 gap-4 w-full">
            {defaultItems.map((it) => (
              <motion.div
                key={it.name}
                whileHover={{ scale: 1.05 }}
                onClick={() => speakAsChild(it.name)}
                className="bg-purple-500 text-white p-6 rounded-3xl shadow-lg flex flex-col items-center justify-center cursor-pointer border-b-4 border-purple-700"
              >
                <span className="text-6xl mb-2">{it.icon}</span>
                <span className="text-2xl font-bold">{it.name}</span>
              </motion.div>
            ))}
          </div>
        );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative z-10 w-full max-w-3xl bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-white flex flex-col items-center"
    >
      <div className="w-full flex justify-between items-center mb-6">
        <button 
          onClick={onBack}
          className="bg-pink-500 text-white font-extrabold px-5 py-2.5 rounded-full shadow-md hover:bg-pink-600 transition flex items-center gap-2 text-lg"
        >
          ⬅️ Menu Utama
        </button>
        <span className="bg-amber-100 text-amber-800 font-extrabold px-4 py-1.5 rounded-full text-sm">
          {currentModule?.badge}
        </span>
      </div>

      <div className="text-7xl mb-2">{currentModule?.icon}</div>
      <h2 className="text-3xl font-black text-gray-800 mb-1">{currentModule?.title}</h2>
      <p className="text-gray-600 font-bold mb-6">{currentModule?.subtitle}</p>

      {renderInteractiveContent()}
    </motion.div>
  );
};

// --- DASHBOARD UTAMA ---
const DashboardContent: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [starsCount, setStarsCount] = useState(26);
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);

  const handleSelectModule = (mod: GameModule) => {
    speakAsChild(mod.voiceText);
    setActiveModuleId(mod.id);
  };

  const handleAddStar = () => {
    setStarsCount((prev) => prev + 1);
  };

  return (
    <div className="relative z-10 min-h-screen w-full flex flex-col items-center pb-12">
      {/* Top Header Bar */}
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-b-3xl shadow-md p-4 flex justify-between items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-400 to-blue-400 rounded-full flex items-center justify-center text-white text-xl shadow-md">
            🌈
          </div>
          <div>
            <h1 className="text-xl font-black text-blue-500 leading-tight">BABY HOPE</h1>
            <p className="text-xs text-gray-500 font-bold">Belajar • Bermain • Tumbuh</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.div 
            key={starsCount}
            animate={{ scale: [1, 1.2, 1] }}
            className="bg-yellow-100 border-2 border-yellow-400 text-yellow-700 px-4 py-1.5 rounded-full font-black flex items-center gap-2 shadow-sm"
          >
            ⭐ {starsCount} Bintang
          </motion.div>
          <button 
            onClick={() => setIsParentModalOpen(true)}
            className="bg-amber-400 hover:bg-amber-500 text-white p-2.5 rounded-full shadow-md text-xl transition"
            title="Pengaturan Orang Tua"
          >
            🛡️
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {activeModuleId ? (
        <div className="mt-8 px-4 w-full flex justify-center">
          <ModuleViewer 
            moduleId={activeModuleId} 
            onBack={() => setActiveModuleId(null)} 
            onAddStar={handleAddStar}
          />
        </div>
      ) : (
        <>
          {/* Avatar Greeting */}
          <div className="mt-8 flex flex-col items-center">
            <motion.div 
              onClick={() => speakAsChild("Halo Baby Hope! Aku teman bermainmu!")}
              className="relative w-28 h-28 bg-white rounded-full border-4 border-blue-200 shadow-xl flex items-center justify-center text-6xl cursor-pointer hover:scale-105 transition-transform"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              🐥
              <span className="absolute bottom-0 right-0 bg-pink-500 text-white text-xs p-1.5 rounded-full border-2 border-white shadow">🔊</span>
            </motion.div>
            
            <h2 className="mt-4 text-3xl font-black text-gray-800">👋 Halo, Hope!</h2>
            <p className="text-gray-700 font-extrabold text-lg mt-1">Yuk pilih permainan seru hari ini! 👇</p>
          </div>

          {/* Grid Modul Pembelajaran */}
          <div className="mt-8 w-full max-w-4xl px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modulesData.map((mod) => (
              <motion.div
                key={mod.id}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectModule(mod)}
                className={`relative bg-gradient-to-br ${mod.color} p-6 rounded-3xl shadow-xl cursor-pointer flex flex-col items-center justify-center text-white border-b-4 border-black/20`}
              >
                <div className="absolute top-3 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold border border-white/30">
                  {mod.badge}
                </div>
                <div className="text-6xl mb-4 drop-shadow-md">{mod.icon}</div>
                <h3 className="text-2xl font-black text-center drop-shadow-sm">{mod.title}</h3>
                <p className="text-white/90 text-sm font-bold text-center mt-1">{mod.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Parental Gate Modal */}
      <ParentModal isOpen={isParentModalOpen} onClose={() => setIsParentModalOpen(false)} />
    </div>
  );
};

// --- APP ENTRY POINT ---
const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
    if ('speechSynthesis' in window) window.speechSynthesis.getVoices();

    setTimeout(() => {
      speakAsChild("Halo Baby Hoooope! Ayo kita Bermain dan belajar. Tuhan Yesus Memberkati kamu menjadi anak yang pintar!");
    }, 300);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center font-sans overflow-x-hidden">
      <InteractiveBackground />

      <AnimatePresence mode="wait">
        {!isStarted ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="z-10 flex flex-col items-center justify-center text-center p-8 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-blue-400 max-w-md mx-4"
          >
            <motion.div className="text-8xl mb-4" animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
              🌈
            </motion.div>
            <h1 className="text-4xl font-black text-blue-600 mb-2">Baby Hope</h1>
            <p className="text-lg text-gray-600 mb-8 font-extrabold">Belajar • Bermain • Tumbuh</p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleStart}
              className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-2xl font-black py-4 px-10 rounded-full shadow-lg border-b-4 border-pink-700 hover:border-pink-500 transition-all cursor-pointer"
            >
              Ayo Main! 🚀
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full min-h-screen z-10">
            <DashboardContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;