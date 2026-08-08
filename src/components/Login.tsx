// src/components/LoginModal.tsx
import React, { useState } from 'react';
import { playPopSound, speakText } from '../utils/audio';

interface LoginModalProps {
  onLoginSuccess: (userName: string) => void;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLoginSuccess, onClose }) => {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playPopSound();
    if (name.trim()) {
      speakText(`Selamat datang, ${name}!`);
      onLoginSuccess(name);
    } else {
      speakText('Silakan isi nama adik terlebih dahulu');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000, padding: '16px'
    }}>
      <div style={{
        background: '#FFFFFF', borderRadius: '32px', padding: '28px',
        maxWidth: '360px', width: '100%', textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)', border: '4px solid #FF80AB'
      }}>
        <div style={{ fontSize: '50px', marginBottom: '10px' }} className="floating-icon">👑</div>
        <h2 style={{ color: '#FF4081', fontSize: '24px', marginBottom: '16px' }}>Masuk Profil Anak</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <input
            type="text"
            placeholder="Nama Si Kecil..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: '14px 18px', fontSize: '18px', borderRadius: '16px',
              border: '2px solid #FF80AB', outline: 'none', textAlign: 'center',
              fontWeight: 'bold'
            }}
          />
          <input
            type="password"
            placeholder="Pin Orang Tua (Opsional)"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={{
              padding: '14px 18px', fontSize: '18px', borderRadius: '16px',
              border: '2px solid #CBD5E1', outline: 'none', textAlign: 'center'
            }}
          />

          <button
            type="submit"
            style={{
              padding: '14px', fontSize: '20px', fontWeight: 'bold',
              borderRadius: '20px', background: 'linear-gradient(135deg, #FF4081, #FF80AB)',
              color: 'white', border: 'none', cursor: 'pointer',
              boxShadow: '0 6px 12px rgba(255, 64, 129, 0.3)'
            }}
            className="bouncy-card"
          >
            🚀 Masuk & Bermain
          </button>
        </form>

        <button
          onClick={() => { playPopSound(); onClose(); }}
          style={{ marginTop: '16px', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}
        >
          Tutup
        </button>

        {/* TULISAN ID/SANDI DEMO SUDAH DIHILANGKAN DI SINI */}
      </div>
    </div>
  );
};