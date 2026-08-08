import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Activity,
  MessageCircle,
  Smile,
  CheckCircle2,
  Circle,
  Calendar,
  Sparkles,
  Clock,
  Info
} from 'lucide-react';

interface ActivityItem {
  id: string;
  title: string;
  category: 'Motorik' | 'Bahasa' | 'Kognitif' | 'Sosial';
  duration: string;
  description: string;
  tips: string;
}

interface AgeGroup {
  id: string;
  label: string;
  range: string;
  activities: ActivityItem[];
}

const stimulationData: AgeGroup[] = [
  {
    id: '1-2-tahun',
    label: '1 - 2 Tahun',
    range: '12 - 24 Bulan',
    activities: [
      {
        id: 'a1',
        title: 'Bermain Lempar Tangkap Bola Lembut',
        category: 'Motorik',
        duration: '15 Menit',
        description: 'Gunakan bola kain atau plastik lembut. Gelindingkan atau lempar pelan ke arah balita.',
        tips: 'Melatih koordinasi mata-tangan dan keseimbangan tubuh.'
      },
      {
        id: 'a2',
        title: 'Menirukan Suara Hewan & Benda',
        category: 'Bahasa',
        duration: '10 Menit',
        description: 'Tunjukkan gambar hewan (kucing, anjing, burung) lalu contohkan bunyinya secara jelas.',
        tips: 'Mendorong perkembangan kosa kata awal dan respon auditori.'
      },
      {
        id: 'a3',
        title: 'Menumpuk Balok atau Wadah Plastik',
        category: 'Kognitif',
        duration: '15 Menit',
        description: 'Ajak anak menumpuk 3–5 balok atau wadah makanan plastik hingga membentuk menara.',
        tips: 'Melatih pemahaman sebab-akibat dan pemecahan masalah sederhana.'
      }
    ]
  },
  {
    id: '2-3-tahun',
    label: '2 - 3 Tahun',
    range: '24 - 36 Bulan',
    activities: [
      {
        id: 'b1',
        title: 'Melompat Dua Kaki di Tempat',
        category: 'Motorik',
        duration: '15 Menit',
        description: 'Beri contoh cara melompat dengan kedua kaki mendarat bersamaan di atas matras.',
        tips: 'Menguatkan otot kaki dan kontrol keseimbangan motorik kasar.'
      },
      {
        id: 'b2',
        title: 'Mewarnai & Mencoret Bebas',
        category: 'Motorik',
        duration: '20 Menit',
        description: 'Beri krayon ramah anak dan kertas kosong besar. Biarkan anak mengeksplorasi garis.',
        tips: 'Melatih genggaman jemari (fine motor control) persiapan menulis.'
      },
      {
        id: 'b3',
        title: 'Bermain Peran Sederhana',
        category: 'Sosial',
        duration: '20 Menit',
        description: 'Gunakan boneka atau mainan masak-masakan untuk pura-pura memberi makan.',
        tips: 'Menumbuhkan rasa empati dan imajinasi sosial.'
      }
    ]
  },
  {
    id: '3-5-tahun',
    label: '3 - 5 Tahun',
    range: '36 - 60 Bulan',
    activities: [
      {
        id: 'c1',
        title: 'Mengelompokkan Benda Berdasar Warna',
        category: 'Kognitif',
        duration: '20 Menit',
        description: 'Minta anak mengumpulkan mainan berwarna merah ke dalam satu wadah yang sama.',
        tips: 'Melatih logika klasifikasi dan persepsi visual.'
      },
      {
        id: 'c2',
        title: 'Mendengarkan & Menceritakan Kembali',
        category: 'Bahasa',
        duration: '15 Menit',
        description: 'Bacakan buku cerita bergambar, lalu tanyakan: "Tadi beruangnya sedang apa ya?"',
        tips: 'Meningkatkan pemahaman narasi dan daya ingat ekspresif.'
      },
      {
        id: 'c3',
        title: 'Bermain Bergantian dengan Teman',
        category: 'Sosial',
        duration: '30 Menit',
        description: 'Ajak anak bermain bergantian menggunakan satu mainan secara bergiliran.',
        tips: 'Mengembangkan regulasi emosi dan kemampuan berinteraksi.'
      }
    ]
  }
];

export const BalitaStimulasi: React.FC = () => {
  const [selectedAge, setSelectedAge] = useState<string>('1-2-tahun');
  const [completedList, setCompletedList] = useState<string[]>([]);

  const activeGroup = stimulationData.find((group) => group.id === selectedAge) || stimulationData[0];

  const toggleComplete = (id: string) => {
    setCompletedList((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getCategoryBadge = (category: ActivityItem['category']) => {
    switch (category) {
      case 'Motorik':
        return { icon: <Activity className="w-4 h-4" />, color: 'bg-orange-100 text-orange-700 border-orange-200' };
      case 'Bahasa':
        return { icon: <MessageCircle className="w-4 h-4" />, color: 'bg-blue-100 text-blue-700 border-blue-200' };
      case 'Kognitif':
        return { icon: <Brain className="w-4 h-4" />, color: 'bg-purple-100 text-purple-700 border-purple-200' };
      case 'Sosial':
        return { icon: <Smile className="w-4 h-4" />, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
    }
  };

  const completedCount = activeGroup.activities.filter((a) => completedList.includes(a.id)).length;
  const progressPercent = Math.round((completedCount / activeGroup.activities.length) * 100);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-pink-500 to-rose-500 p-6 rounded-2xl text-white shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-xs font-semibold tracking-wider uppercase bg-white/20 px-2.5 py-1 rounded-full">
              Panduan Harian
            </span>
          </div>
          <h2 className="text-2xl font-bold">Stimulasi Tumbuh Tumbuh Balita</h2>
          <p className="text-pink-100 text-sm mt-1">
            Aktivitas harian sederhana untuk memaksimalkan potensi perkembangan fisik, bahasa, dan emosi anak.
          </p>
        </div>
        
        {/* Progress Bar Mini */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 min-w-[180px]">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span>Progres Hari Ini</span>
            <span className="font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-yellow-300 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-pink-100 mt-2 text-right">
            {completedCount} dari {activeGroup.activities.length} aktivitas selesai
          </p>
        </div>
      </div>

      {/* Tab Filter Umur */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {stimulationData.map((group) => (
          <button
            key={group.id}
            onClick={() => setSelectedAge(group.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
              selectedAge === group.id
                ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{group.label}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                selectedAge === group.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {group.range}
            </span>
          </button>
        ))}
      </div>

      {/* Daftar Kartu Stimulasi */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedAge}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="grid gap-4"
        >
          {activeGroup.activities.map((item) => {
            const isCompleted = completedList.includes(item.id);
            const badge = getCategoryBadge(item.category);

            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl p-5 border transition-all shadow-sm ${
                  isCompleted ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md border ${badge.color}`}
                      >
                        {badge.icon}
                        {item.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3" />
                        {item.duration}
                      </span>
                    </div>

                    <h3
                      className={`text-base font-bold ${
                        isCompleted ? 'line-through text-slate-400' : 'text-slate-800'
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>

                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200/60 rounded-lg p-2.5 text-xs text-amber-800">
                      <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span><strong>Tips Manfaat:</strong> {item.tips}</span>
                    </div>
                  </div>

                  {/* Tombol Ceklis / Selesai */}
                  <button
                    onClick={() => toggleComplete(item.id)}
                    className="shrink-0 p-1 rounded-full text-slate-400 hover:text-emerald-500 transition-colors focus:outline-none"
                    title={isCompleted ? 'Tandai Belum' : 'Tandai Selesai'}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-7 h-7 text-emerald-500 fill-emerald-100" />
                    ) : (
                      <Circle className="w-7 h-7 text-slate-300 hover:text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BalitaStimulasi;