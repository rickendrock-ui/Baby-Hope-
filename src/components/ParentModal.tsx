import { useState, useEffect } from 'react';
import { X, RotateCcw, Volume2, ShieldCheck, Sliders, Smile } from 'lucide-react';

export interface VoiceCharacter {
  id: string;
  name: string;
  icon: string;
  pitch: number;
  rate: number;
  emotionPrefix: string;
}

// Preset Karakter Suara dengan Emosi Bertutur
export const VOICE_CHARACTERS: VoiceCharacter[] = [
  {
    id: 'cheerful_child',
    name: 'Anak Ceria (Hope) 👧🎈',
    icon: '👧',
    pitch: 1.4, // Pitch tinggi khas anak-anak
    rate: 1.05, // Agak cepat & penuh semangat
    emotionPrefix: 'Wah, asyik sekali! ',
  },
  {
    id: 'cute_robot',
    name: 'Robot Imut (Beep-Boop) 🤖',
    icon: '🤖',
    pitch: 1.5,
    rate: 0.9,
    emotionPrefix: 'Bip bop! ',
  },
  {
    id: 'gentle_mom',
    name: 'Ibu Penyayang 👩‍🦱❤️',
    icon: '👩',
    pitch: 1.0,
    rate: 0.85,
    emotionPrefix: 'Hebat sekali sayang! ',
  },
  {
    id: 'custom',
    name: 'Kustom Manual ⚙️',
    icon: '⚙️',
    pitch: 1.0,
    rate: 0.85,
    emotionPrefix: '',
  },
];

interface ParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  stars: number;
  onResetStars: () => void;
  speechRate: number;
  onChangeSpeechRate: (rate: number) => void;
  speechPitch: number;
  onChangeSpeechPitch: (pitch: number) => void;
  selectedVoiceURI: string;
  onChangeVoiceURI: (voiceURI: string) => void;
  selectedCharacter: string;
  onChangeCharacter: (characterId: string) => void;
}

export default function ParentModal({
  isOpen,
  onClose,
  stars,
  onResetStars,
  speechRate,
  onChangeSpeechRate,
  speechPitch,
  onChangeSpeechPitch,
  selectedVoiceURI,
  onChangeVoiceURI,
  selectedCharacter,
  onChangeCharacter,
}: ParentModalProps) {
  const [num1] = useState(Math.floor(Math.random() * 5) + 3);
  const [num2] = useState(Math.floor(Math.random() * 5) + 2);
  const [userAnswer, setUserAnswer] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      if (!selectedVoiceURI && availableVoices.length > 0) {
        const idVoice = availableVoices.find((v) => v.lang.includes('id'));
        if (idVoice) {
          onChangeVoiceURI(idVoice.voiceURI);
        } else {
          onChangeVoiceURI(availableVoices[0].voiceURI);
        }
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }, []);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userAnswer) === num1 + num2) {
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Jawaban salah! Coba hitung lagi.');
    }
  };

  // Mengganti Preset Karakter Suara
  const handleSelectCharacter = (char: VoiceCharacter) => {
    onChangeCharacter(char.id);
    if (char.id !== 'custom') {
      onChangeSpeechPitch(char.pitch);
      onChangeSpeechRate(char.rate);
    }
  };

  const handleTestVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const charObj = VOICE_CHARACTERS.find((c) => c.id === selectedCharacter);
      const prefix = charObj ? charObj.emotionPrefix : '';
      const textToSpeak = `${prefix}Halo teman-teman! Yuk, kita belajar dan bermain dengan gembira hari ini!`;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = speechRate;
      utterance.pitch = speechPitch;

      const voice = voices.find((v) => v.voiceURI === selectedVoiceURI);
      if (voice) utterance.voice = voice;

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleClose = () => {
    setIsUnlocked(false);
    setUserAnswer('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-sky-300 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 p-2 rounded-full text-slate-600 transition"
        >
          <X size={20} />
        </button>

        {!isUnlocked ? (
          /* PARENT GATE MATH TEST */
          <div className="text-center py-4">
            <div className="bg-sky-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 text-sky-600">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-1">Area Orang Tua</h3>
            <p className="text-xs text-slate-500 font-semibold mb-4">
              Jawab pertanyaan untuk membuka pengaturan:
            </p>

            <form onSubmit={handleVerify} className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200 text-2xl font-black text-amber-900 tracking-wider">
                {num1} + {num2} = ?
              </div>

              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Jawaban..."
                className="w-full text-center text-xl font-bold py-2.5 px-4 rounded-xl border-2 border-slate-300 focus:border-sky-500 focus:outline-none"
                autoFocus
              />

              {errorMsg && <p className="text-xs font-bold text-red-500">{errorMsg}</p>}

              <button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-3 rounded-xl shadow-lg transition active:scale-95"
              >
                Masuk Pengaturan
              </button>
            </form>
          </div>
        ) : (
          /* UNLOCKED SETTINGS */
          <div className="py-2 space-y-5">
            <div className="flex items-center gap-2 border-b-2 border-slate-100 pb-3">
              <Sliders className="text-sky-500" size={24} />
              <h3 className="text-lg font-black text-slate-800">Pengaturan Suara Karakter</h3>
            </div>

            {/* PILIHAN KARAKTER SUARA */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-700 flex items-center gap-1">
                <Smile size={16} className="text-pink-500" />
                Pilih Karakter & Emosi Suara
              </label>
              <div className="grid grid-cols-2 gap-2">
                {VOICE_CHARACTERS.map((char) => (
                  <button
                    key={char.id}
                    type="button"
                    onClick={() => handleSelectCharacter(char)}
                    className={`p-2.5 rounded-2xl border-2 text-left transition flex items-center gap-2 ${
                      selectedCharacter === char.id
                        ? 'border-pink-500 bg-pink-50 text-pink-900 font-black shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700 font-bold'
                    }`}
                  >
                    <span className="text-2xl">{char.icon}</span>
                    <span className="text-xs">{char.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* PENGATURAN MESIN SUARA SISTEM */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <label className="block text-[11px] font-black text-slate-600 mb-1">
                  🗣️ Mesin Suara (Voice Engine)
                </label>
                <select
                  value={selectedVoiceURI}
                  onChange={(e) => onChangeVoiceURI(e.target.value)}
                  className="w-full bg-white text-xs font-bold p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-sky-500"
                >
                  {voices.length === 0 && <option value="">Suara bawaan HP</option>}
                  {voices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </div>

              {/* SLIDER PITCH (NADA) */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                  <span>🎵 Pitch (Tinggi Suara Anak)</span>
                  <span>{speechPitch.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.1"
                  value={speechPitch}
                  onChange={(e) => {
                    onChangeSpeechPitch(parseFloat(e.target.value));
                    onChangeCharacter('custom');
                  }}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              {/* SLIDER KECEPATAN */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                  <span>⚡ Kecepatan Bicara</span>
                  <span>{speechRate.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.2"
                  step="0.05"
                  value={speechRate}
                  onChange={(e) => {
                    onChangeSpeechRate(parseFloat(e.target.value));
                    onChangeCharacter('custom');
                  }}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              {/* TOMBOL TES SUARA */}
              <button
                type="button"
                onClick={handleTestVoice}
                className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-black text-xs py-2.5 rounded-xl shadow-md transition active:scale-95"
              >
                <Volume2 size={16} /> Tes Suara Karakter Ceria
              </button>
            </div>

            {/* RESET BINTANG */}
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-black text-amber-900">Total Bintang: {stars}</p>
                <p className="text-[10px] text-amber-700 font-medium">Reset progress bintang anak</p>
              </div>
              <button
                type="button"
                onClick={onResetStars}
                className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow transition active:scale-95"
              >
                <RotateCcw size={14} /> Reset
              </button>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-black py-2.5 rounded-xl transition"
            >
              Selesai
            </button>
          </div>
        )}
      </div>
    </div>
  );
}