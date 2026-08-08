import React from 'react';
import { Calendar, HeartPulse, ShieldCheck, ChevronRight, Baby, BookOpen, Utensils } from 'lucide-react';

interface DashboardProps {
  onSelectModule: (moduleName: string) => void;
  growthStatus?: string;
  campakStatus?: boolean;
  latestAgeMonths?: number;
}

export default function Dashboard({
  onSelectModule,
  growthStatus = 'Ideal (Standar WHO)',
  campakStatus = true,
  latestAgeMonths = 24
}: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* Banner Sapaan */}
      <div className="bg-gradient-to-r from-[#00A884] to-teal-600 rounded-3xl p-6 md:p-8 text-white shadow-lg">
        <h1 className="text-2xl md:text-3xl font-black">Selamat Datang di Baby Hope! 👋</h1>
        <p className="text-xs md:text-sm text-emerald-100 mt-2 font-medium">
          Pantau tumbuh kembang, jadwal imunisasi, dan nutrisi si kecil secara terpadu di satu tempat.
        </p>
      </div>

      {/* ===================================================
          3 KARTU INTERAKTIF (LANGSUNG BISA DIKLIK)
         =================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* KARTU 1: Usia Anak */}
        <div
          onClick={() => onSelectModule('balita')}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-300 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-slate-400">Usia Anak</p>
            <h4 className="text-sm font-extrabold text-slate-800 truncate">
              {latestAgeMonths} Bulan ({Math.floor(latestAgeMonths / 12)} Tahun)
            </h4>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
        </div>

        {/* KARTU 2: Status Pertumbuhan */}
        <div
          onClick={() => onSelectModule('pertumbuhan')}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-400 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-slate-400">Status Pertumbuhan</p>
            <h4 className="text-sm font-extrabold text-slate-800 truncate">
              {growthStatus}
            </h4>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
        </div>

        {/* KARTU 3: Imunisasi Terakhir / Campak MR */}
        <div
          onClick={() => onSelectModule('imunisasi')}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-purple-300 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0 group-hover:bg-purple-500 group-hover:text-white transition-colors">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-slate-400">Imunisasi Terakhir</p>
            <h4 className="text-sm font-extrabold text-slate-800 truncate">
              Campak / MR ({campakStatus ? 'Lengkap' : 'Belum Lengkap'})
            </h4>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-500 transition-colors" />
        </div>

      </div>

      {/* Akses Cepat Fitur */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
        <h3 className="text-sm font-extrabold text-slate-800">Menu Akses Cepat</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onSelectModule('basata')}
            className="p-4 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all flex flex-col items-center text-center gap-2 group"
          >
            <div className="p-3 bg-emerald-100 text-[#00A884] rounded-xl group-hover:scale-110 transition-transform">
              <Baby className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Modul Basata</span>
          </button>

          <button
            onClick={() => onSelectModule('balita')}
            className="p-4 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all flex flex-col items-center text-center gap-2 group"
          >
            <div className="p-3 bg-emerald-100 text-[#00A884] rounded-xl group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Modul Balita</span>
          </button>

          <button
            onClick={() => onSelectModule('nutrisi')}
            className="p-4 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all flex flex-col items-center text-center gap-2 group"
          >
            <div className="p-3 bg-emerald-100 text-[#00A884] rounded-xl group-hover:scale-110 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">MPASI & Nutrisi</span>
          </button>

          <button
            onClick={() => onSelectModule('edukasi')}
            className="p-4 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all flex flex-col items-center text-center gap-2 group"
          >
            <div className="p-3 bg-emerald-100 text-[#00A884] rounded-xl group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Edukasi Parenting</span>
          </button>
        </div>
      </div>
    </div>
  );
}