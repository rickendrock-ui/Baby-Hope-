import { useState } from 'react';
import { Sparkles, Shield, Volume2 } from 'lucide-react';
import AlphabetModule from './modules/AlphabetModule';
import NumberModule from './modules/NumberModule';
import ColorModule from './modules/ColorModule';
import AnimalModule from './modules/AnimalModule';
import ShapeModule from './modules/ShapeModule';
import FruitModule from './modules/FruitModule';
import QuizModule from './modules/QuizModule';
import ParentModal, { VOICE_CHARACTERS } from './components/ParentModal';
import { speakWithElevenLabs } from './services/elevenlabs';

export default function App() {
  const [stars, setStars] = useState(15);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);

  // STATE PENGATURAN KARAKTER SUARA
  const [selectedCharacter, setSelectedCharacter] = useState('cheerful_child');
  const [speechRate, setSpeechRate] = useState(0.92);
  const [speechPitch, setSpeechPitch] = useState(1.25);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');

  // Fungsi pembaca suara universal berkarakter, beremosi, dan lebih smooth
  const speakWithCharacter = async (text: string) => {
    const charObj = VOICE_CHARACTERS.find((c) => c.id === selectedCharacter);
    const prefix = charObj ? charObj.emotionPrefix : '';
    const fullText = `${prefix}${text}`;

    // 1. Coba jalankan ElevenLabs terlebih dahulu untuk hasil suara anak yang super natural & smooth
    const success = await speakWithElevenLabs(fullText);
    if (success) return;

    // 2. Fallback ke Web Speech API dengan optimasi jeda & engine suara terbaik
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      // Penambahan jeda otomatis pada tanda baca agar intonasi tidak datar/kaku
      const formattedText = fullText
        .replace(/!/g, '... wah! ')
        .replace(/\?/g, '... ya? ')
        .replace(/,/g, '... ');

      const utterance = new SpeechSynthesisUtterance(formattedText);
      utterance.lang = 'id-ID';
      utterance.rate = speechRate;
      utterance.pitch = speechPitch;

      const voices = window.speechSynthesis.getVoices();

      // Jika user memilih suara spesifik di modal
      if (selectedVoiceURI) {
        const customVoice = voices.find((v) => v.voiceURI === selectedVoiceURI);
        if (customVoice) utterance.voice = customVoice;
      } else {
        // Cari engine suara berkualitas tinggi secara otomatis (Google / Natural / Wavenet)
        const bestVoice =
          voices.find(
            (v) =>
              (v.lang.includes('id') || v.lang.includes('ID')) &&
              (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Wavenet'))
          ) || voices.find((v) => v.lang.includes('id'));

        if (bestVoice) {
          utterance.voice = bestVoice;
        }
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  const modules = [
    { id: 'kuis', title: 'Kuis Pintar', icon: '🎮', badge: 'Game 🏆', bgGradient: 'from-indigo-500 to-purple-600 border-indigo-700 hover:shadow-indigo-300', desc: 'Main Tebak-Tebakan' },
    { id: 'huruf', title: 'Huruf A-Z', icon: '🔤', badge: 'Dasar ✏️', bgGradient: 'from-pink-400 to-rose-500 border-pink-700 hover:shadow-pink-300', desc: 'Mengenal Abjad' },
    { id: 'angka', title: 'Angka 1-10', icon: '🔢', badge: 'Berhitung 🧮', bgGradient: 'from-sky-400 to-blue-500 border-sky-700 hover:shadow-sky-300', desc: 'Belajar Hitung' },
    { id: 'warna', title: 'Warna-Warni', icon: '🌈', badge: 'Kreatif 🎨', bgGradient: 'from-amber-400 to-yellow-500 border-amber-600 hover:shadow-amber-300', desc: 'Merah, Biru ...' },
    { id: 'hewan', title: 'Dunia Hewan', icon: '🦁', badge: 'Seru! 🔊', bgGradient: 'from-emerald-400 to-green-600 border-emerald-700 hover:shadow-emerald-300', desc: 'Suara & Nama' },
    { id: 'bentuk', title: 'Bentuk Geometri', icon: '🔷', badge: 'Pintar 📐', bgGradient: 'from-purple-400 to-indigo-500 border-purple-700 hover:shadow-purple-300', desc: 'Lingkaran, Bintang' },
    { id: 'buah', title: 'Buah & Sayur', icon: '🍎', badge: 'Sehat 🍌', bgGradient: 'from-orange-400 to-amber-500 border-orange-700 hover:shadow-orange-300', desc: 'Apel, Pisang ...' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-indigo-100 font-sans text-slate-800 pb-12 select-none relative overflow-x-hidden">
      
      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-4 py-3 shadow-md flex justify-between items-center max-w-4xl mx-auto rounded-b-3xl border-b-2 border-sky-200">
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-bounce">🌈</span>
          <div>
            <h1 className="text-xl font-black bg-clip-text bg-gradient-to-r from-sky-600 to-pink-500 text-transparent">
              BABY HOPE
            </h1>
            <p className="text-[10px] text-slate-500 font-bold">Belajar • Bermain • Tumbuh</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-100 to-yellow-200 border-2 border-amber-400 px-3 py-1.5 rounded-full shadow-md">
            <Sparkles className="text-amber-500 fill-amber-400 animate-spin" size={20} />
            <span className="font-black text-amber-800 text-sm">{stars} Bintang</span>
          </div>

          <button 
            onClick={() => setIsParentModalOpen(true)}
            type="button"
            className="bg-white/80 hover:bg-slate-100 p-2.5 rounded-full border-2 border-slate-200 shadow-sm transition active:scale-90"
            title="Area Orang Tua"
          >
            <Shield size={20} />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="mt-4 relative z-10">
        {activeModule === 'kuis' ? (
          <QuizModule onBack={() => setActiveModule(null)} onAddStar={() => setStars(prev => prev + 1)} />
        ) : activeModule === 'huruf' ? (
          <AlphabetModule onBack={() => setActiveModule(null)} onAddStar={() => setStars(prev => prev + 1)} />
        ) : activeModule === 'angka' ? (
          <NumberModule onBack={() => setActiveModule(null)} onAddStar={() => setStars(prev => prev + 1)} />
        ) : activeModule === 'warna' ? (
          <ColorModule onBack={() => setActiveModule(null)} onAddStar={() => setStars(prev => prev + 1)} />
        ) : activeModule === 'hewan' ? (
          <AnimalModule onBack={() => setActiveModule(null)} onAddStar={() => setStars(prev => prev + 1)} />
        ) : activeModule === 'bentuk' ? (
          <ShapeModule onBack={() => setActiveModule(null)} onAddStar={() => setStars(prev => prev + 1)} />
        ) : activeModule === 'buah' ? (
          <FruitModule onBack={() => setActiveModule(null)} onAddStar={() => setStars(prev => prev + 1)} />
        ) : (
          <div className="max-w-4xl mx-auto px-4 text-center mt-4">
            <div className="relative inline-block mb-2">
              <button
                onClick={() => speakWithCharacter('Halo Hope! Yuk bermain dan belajar bersamaku!')}
                type="button"
                className="bg-white p-4 rounded-full shadow-xl border-4 border-sky-300 transform hover:scale-110 active:scale-95 transition cursor-pointer relative group"
              >
                <span className="text-6xl md:text-7xl block animate-bounce">🐥</span>
                <div className="absolute -bottom-1 -right-1 bg-pink-500 text-white p-1.5 rounded-full shadow-md">
                  <Volume2 size={16} />
                </div>
              </button>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-800">👋 Halo, Hope!</h2>
            <p className="text-slate-600 font-bold text-sm md:text-base mb-6">Yuk pilih permainan seru hari ini! 👇</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod.id)}
                  type="button"
                  className={`bg-gradient-to-b ${mod.bgGradient} text-white p-5 rounded-3xl shadow-xl border-b-[8px] transition-all transform hover:-translate-y-2 hover:shadow-2xl active:translate-y-1 active:border-b-2 flex flex-col items-center justify-between min-h-[165px] relative group overflow-hidden`}
                >
                  <span className="absolute top-2 right-2 bg-white/20 backdrop-blur-md text-[10px] font-black px-2 py-0.5 rounded-full border border-white/30">
                    {mod.badge}
                  </span>
                  <span className="text-5xl my-2 transform group-hover:scale-125 transition duration-300">{mod.icon}</span>
                  <div className="w-full">
                    <h3 className="text-lg md:text-xl font-black">{mod.title}</h3>
                    <p className="text-[11px] text-white/90 font-bold mt-0.5">{mod.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* PARENT MODAL */}
      <ParentModal
        isOpen={isParentModalOpen}
        onClose={() => setIsParentModalOpen(false)}
        stars={stars}
        onResetStars={() => setStars(0)}
        speechRate={speechRate}
        onChangeSpeechRate={setSpeechRate}
        speechPitch={speechPitch}
        onChangeSpeechPitch={setSpeechPitch}
        selectedVoiceURI={selectedVoiceURI}
        onChangeVoiceURI={setSelectedVoiceURI}
        selectedCharacter={selectedCharacter}
        onChangeCharacter={setSelectedCharacter}
      />
    </div>
  );
}