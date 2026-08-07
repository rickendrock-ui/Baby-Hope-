import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard';

import AlphabetModule from './modules/AlphabetModule';
import { AnimalModule } from './modules/AnimalModule';
import { ColorModule } from './modules/ColorModule';
import FruitModule from './modules/FruitModule';
import { MusicModule } from './modules/MusicModule';
import NumberModule from './modules/NumberModule';
import QuizModule from './modules/QuizModule';
import { ShapeModule } from './modules/ShapeModule';

export default function App() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [stars, setStars] = useState<number>(0);

  // State Modal & Parental Gate
  const [isGateOpen, setIsGateOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [mathProblem, setMathProblem] = useState<{ num1: number; num2: number; answer: number }>({ num1: 0, num2: 0, answer: 0 });
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [gateError, setGateError] = useState<boolean>(false);

  // State Pengaturan Suara & Timer Playtime
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [voiceSpeed, setVoiceSpeed] = useState<number>(0.9);
  const [voicePitch, setVoicePitch] = useState<number>(1.2);
  const [playtimeLimit, setPlaytimeLimit] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  useEffect(() => {
    if (playtimeLimit === 0) {
      setTimeRemaining(null);
      setIsTimeUp(false);
      return;
    }

    const totalSeconds = playtimeLimit * 60;
    setTimeRemaining(totalSeconds);
    setIsTimeUp(false);

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [playtimeLimit]);

  const handleAddStar = () => {
    setStars((prev) => prev + 1);
  };

  const handleOpenGate = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 8) + 2;
    setMathProblem({ num1: n1, num2: n2, answer: n1 + n2 });
    setUserAnswer('');
    setGateError(false);
    setIsGateOpen(true);
  };

  const handleVerifyGate = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userAnswer.trim(), 10) === mathProblem.answer) {
      setIsGateOpen(false);
      setIsSettingsOpen(true);
    } else {
      setGateError(true);
      setUserAnswer('');
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-sky-300 via-sky-200 to-indigo-200 flex flex-col items-center justify-center p-4 overflow-hidden select-none">
      {/* Visual Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: [-100, 1920] }} 
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-12 left-0 text-white/40 text-8xl blur-[1px]"
        >
          ☁️
        </motion.div>
        <motion.div 
          animate={{ x: [1920, -100] }} 
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/3 right-0 text-white/30 text-9xl blur-[1px]"
        >
          ☁️
        </motion.div>
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-gradient-to-br from-pink-400 via-yellow-300 to-emerald-400 rounded-full opacity-30 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tr from-purple-400 to-sky-300 rounded-full opacity-40 blur-3xl pointer-events-none" />
      </div>

      {/* Container Kanan Atas: Skor Bintang & Tombol Pengaturan Tepat di Bawahnya */}
      <div className="fixed top-5 right-5 flex flex-col items-end gap-3 z-40">
        {timeRemaining !== null && (
          <div className="bg-white/90 backdrop-blur-md text-slate-800 font-black px-4 py-2 rounded-full border-3 border-sky-300 shadow-md flex items-center gap-2 text-sm">
            <span>⏳</span>
            <span>{formatTime(timeRemaining)}</span>
          </div>
        )}

        <motion.div 
          whileHover={{ scale: 1.08 }}
          className="bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-950 px-5 py-2 rounded-full shadow-[0_6px_20px_rgba(245,158,11,0.4)] border-4 border-white flex items-center gap-2.5 font-black text-xl sm:text-2xl cursor-default"
        >
          <motion.span 
            animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl sm:text-3xl filter drop-shadow-md"
          >
            ⭐
          </motion.span>
          <span className="tracking-wide drop-shadow-sm">{stars}</span>
        </motion.div>

        {/* ⚙️ Tombol Pengaturan (Tepat di bawah poin bintang) */}
        <motion.button
          whileHover={{ scale: 1.15, rotate: 90 }}
          whileTap={{ scale: 0.85 }}
          onClick={handleOpenGate}
          className="w-11 h-11 bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 rounded-full border-4 border-sky-300 shadow-[0_6px_15px_rgba(0,0,0,0.15)] flex items-center justify-center text-xl cursor-pointer transition-colors"
          title="Pengaturan Orang Tua"
        >
          ⚙️
        </motion.button>
      </div>

      {/* 🔐 MODAL PARENTAL GATE */}
      <AnimatePresence>
        {isGateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border-8 border-indigo-200 text-center relative"
            >
              <button
                onClick={() => setIsGateOpen(false)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 font-black text-xl w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>

              <div className="text-4xl mb-2">🔒</div>
              <h3 className="text-xl font-black text-slate-800 mb-1">Area Orang Tua</h3>
              <p className="text-xs text-slate-500 font-bold mb-4">
                Selesaikan penjumlahan di bawah ini untuk mengakses pengaturan:
              </p>

              <form onSubmit={handleVerifyGate} className="flex flex-col gap-3">
                <div className="bg-indigo-50 py-3 px-4 rounded-2xl border-2 border-indigo-100 text-2xl font-black text-indigo-900 tracking-wider">
                  {mathProblem.num1} + {mathProblem.num2} = ?
                </div>

                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Jawaban..."
                  autoFocus
                  className="w-full text-center text-2xl font-black py-2.5 rounded-2xl border-2 border-slate-300 focus:border-indigo-500 outline-none"
                />

                {gateError && (
                  <p className="text-rose-500 font-extrabold text-xs">Jawaban belum tepat, coba lagi ya!</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black py-3 rounded-2xl shadow-md border-b-4 border-indigo-700 active:translate-y-1 cursor-pointer mt-1"
                >
                  Masuk Pengaturan
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🛠️ MODAL PENGATURAN LENGKAP */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-8 border-sky-200 text-left relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 font-black text-xl w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>

              <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2 border-b pb-3">
                <span>⚙️</span>
                <span>Pengaturan Orang Tua</span>
              </h3>

              <div className="mb-6 space-y-3">
                <h4 className="text-sm font-black text-slate-500 uppercase tracking-wider">Suara & Audio</h4>
                
                <div className="flex items-center justify-between p-3 bg-sky-50 rounded-2xl border border-sky-100">
                  <span className="font-bold text-slate-700 text-sm">
                    {soundEnabled ? '🔊 Suara Narasi' : '🔇 Suara Senyap'}
                  </span>
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`w-12 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                      soundEnabled ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <motion.div layout className="w-5 h-5 bg-white rounded-full shadow-md" />
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="block text-xs font-black text-slate-600 mb-2">Kecepatan Bicara Narator:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Pelan', val: 0.7 },
                      { label: 'Normal', val: 0.9 },
                      { label: 'Cepat', val: 1.1 }
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => setVoiceSpeed(item.val)}
                        className={`py-1.5 rounded-xl font-extrabold text-xs border cursor-pointer transition ${
                          voiceSpeed === item.val
                            ? 'bg-sky-500 text-white border-sky-600 shadow-sm'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="block text-xs font-black text-slate-600 mb-2">Nada Suara (Pitch):</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Normal', val: 1.0 },
                      { label: 'Ceria 🐣', val: 1.2 },
                      { label: 'Tinggi ✨', val: 1.5 }
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => setVoicePitch(item.val)}
                        className={`py-1.5 rounded-xl font-extrabold text-xs border cursor-pointer transition ${
                          voicePitch === item.val
                            ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                <h4 className="text-sm font-black text-slate-500 uppercase tracking-wider">Batas Waktu Bermain</h4>
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                  <label className="block text-xs font-black text-amber-900 mb-2">Durasi Main Si Kecil:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Tanpa Batas', val: 0 },
                      { label: '15 Menit', val: 15 },
                      { label: '30 Menit', val: 30 },
                      { label: '45 Menit', val: 45 }
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => setPlaytimeLimit(item.val)}
                        className={`py-2 rounded-xl font-extrabold text-xs border cursor-pointer transition ${
                          playtimeLimit === item.val
                            ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                            : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsSettingsOpen(false)}
                className="w-full bg-gradient-to-r from-sky-400 to-blue-500 text-white font-black py-3 rounded-2xl border-b-4 border-blue-600 shadow-md active:translate-y-1 cursor-pointer"
              >
                Simpan & Tutup
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🛑 LAYAR WAKTU ISTIRAHAT HABIS */}
      {isTimeUp ? (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="z-50 bg-white/95 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl border-8 border-amber-300 text-center max-w-md w-full"
        >
          <div className="text-8xl mb-4 animate-bounce">😴</div>
          <h2 className="text-3xl font-black text-amber-900 mb-2">Waktunya Istirahat!</h2>
          <p className="text-slate-600 font-bold mb-6 text-sm">
            Si kecil sudah belajar dengan hebat hari ini! Yuk istirahatkan mata dan bermain lagi nanti. ✨
          </p>
          <button
            onClick={() => handleOpenGate()}
            className="bg-amber-500 hover:bg-amber-600 text-white font-black px-6 py-3 rounded-2xl shadow-md border-b-4 border-amber-700 cursor-pointer"
          >
            Akses Orang Tua (Reset Waktu)
          </button>
        </motion.div>
      ) : (
        <div className="relative z-10 w-full flex items-center justify-center">
          {!activeModule && (
            <Dashboard onSelectModule={(moduleName: string) => setActiveModule(moduleName)} />
          )}

          {activeModule === 'alphabet' && (
            <AlphabetModule onBack={() => setActiveModule(null)} onAddStar={handleAddStar} />
          )}
          {activeModule === 'animals' && (
            <AnimalModule onBack={() => setActiveModule(null)} />
          )}
          {activeModule === 'colors' && (
            <ColorModule onBack={() => setActiveModule(null)} />
          )}
          {activeModule === 'fruits' && (
            <FruitModule onBack={() => setActiveModule(null)} onAddStar={handleAddStar} />
          )}
          {activeModule === 'music' && (
            <MusicModule onBack={() => setActiveModule(null)} />
          )}
          {activeModule === 'numbers' && (
            <NumberModule onBack={() => setActiveModule(null)} onAddStar={handleAddStar} />
          )}
          {activeModule === 'quiz' && (
            <QuizModule onBack={() => setActiveModule(null)} onAddStar={handleAddStar} />
          )}
          {activeModule === 'shapes' && (
            <ShapeModule onBack={() => setActiveModule(null)} />
          )}
        </div>
      )}
    </div>
  );
}