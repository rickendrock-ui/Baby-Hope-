import React, { useState } from 'react';
import { LogIn, User, Lock, Sparkles } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username.trim() || 'Si Kecil');
  };

  return (
    <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-4 border-white text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-sky-100 text-sky-500 rounded-full mb-4 shadow-inner">
        <Sparkles size={40} />
      </div>

      <h1 className="text-3xl font-black text-sky-600 mb-1">BABY HOPE</h1>
      <p className="text-slate-500 text-sm mb-6 font-semibold">Silakan masuk untuk memulai belajar!</p>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Nama Si Kecil / Orang Tua</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Masukkan Nama"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-400 focus:outline-none font-semibold text-slate-700"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Kata Sandi</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-400 focus:outline-none font-semibold text-slate-700"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white font-black rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 mt-6"
        >
          <LogIn size={20} />
          MASUK APLIKASI
        </button>
      </form>
    </div>
  );
};

export default Login;