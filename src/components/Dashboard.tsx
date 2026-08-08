// src/components/Dashboard.tsx
import { useState } from 'react';
import { playPopSound, speakText } from '../utils/audio';

interface DashboardProps {
  userName?: string;
  stars?: number;
  onBack?: () => void;
  onResetProgress?: () => void;
}

export const Dashboard = ({
  userName = 'Si Kecil',
  stars = 0,
  onBack,
  onResetProgress,
}: DashboardProps) => {
  const [playTimeLimit, setPlayTimeLimit] = useState<number>(30);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const handleBack = () => {
    playPopSound();
    if (onBack) onBack();
  };

  const handleReset = () => {
    playPopSound();
    if (window.confirm('Apakah Anda yakin ingin meriset seluruh progres dan bintang Si Kecil?')) {
      if (onResetProgress) onResetProgress();
      speakText('Progres berhasil diriset');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px', fontFamily: 'sans-serif' }}>
      {/* Header Dashboard */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#1E293B', fontSize: '24px' }}>📊 Dashboard Orang Tua</h2>
        {onBack && (
          <button
            onClick={handleBack}
            className="bouncy-card"
            style={{
              padding: '8px 16px',
              borderRadius: '14px',
              background: '#64748B',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            ⬅️ Kembali
          </button>
        )}
      </div>

      {/* Kartu Profil Anak & Bintang */}
      <div style={{
        background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
        borderRadius: '24px',
        padding: '20px',
        color: '#FFFFFF',
        marginBottom: '20px',
        boxShadow: '0 8px 20px rgba(139, 92, 246, 0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <span style={{ fontSize: '40px' }} className="floating-icon">👑</span>
          <div>
            <h3 style={{ margin: 0, fontSize: '22px' }}>{userName}</h3>
            <span style={{ fontSize: '14px', opacity: 0.9 }}>Level Belajar: {Math.floor(stars / 10) + 1}</span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '16px',
          background: 'rgba(255, 255, 255, 0.2)',
          padding: '12px 16px',
          borderRadius: '16px',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          <div>⭐ Total Bintang: {stars}</div>
          <div>🎯 Poin Prestasi: {stars * 10}</div>
        </div>
      </div>

      {/* Ringkasan Aktivitas Belajar */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: '1px solid #E2E8F0'
      }}>
        <h3 style={{ margin: '0 0 14px 0', color: '#1E293B', fontSize: '18px' }}>📈 Progres Modul</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#F8FAFC', borderRadius: '12px' }}>
            <span>🔤 Abjad & Angka</span>
            <strong style={{ color: '#22C55E' }}>Sering Dimainkan</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#F8FAFC', borderRadius: '12px' }}>
            <span>🎨 Warna & Bentuk</span>
            <strong style={{ color: '#3B82F6' }}>Bagus</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#F8FAFC', borderRadius: '12px' }}>
            <span>🎹 Musik & Suara Hewan</span>
            <strong style={{ color: '#A855F7' }}>Aktif</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#F8FAFC', borderRadius: '12px' }}>
            <span>🧩 Kuis & Cocok Gambar</span>
            <strong style={{ color: '#F59E0B' }}>Siap Dilatih</strong>
          </div>
        </div>
      </div>

      {/* Kontrol & Pengaturan Orang Tua */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: '1px solid #E2E8F0'
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#1E293B', fontSize: '18px' }}>⚙️ Pengaturan Orang Tua</h3>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', color: '#475569', fontSize: '14px' }}>
            ⏱️ Batas Waktu Main Balita:
          </label>
          <select
            value={playTimeLimit}
            onChange={(e) => setPlayTimeLimit(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '12px',
              border: '2px solid #CBD5E1',
              fontSize: '15px',
              fontWeight: 'bold',
              outline: 'none'
            }}
          >
            <option value={15}>15 Menit / Hari</option>
            <option value={30}>30 Menit / Hari</option>
            <option value={45}>45 Menit / Hari</option>
            <option value={60}>60 Menit / Hari</option>
          </select>
        </div>

        <div style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 0'
        }}>
          <span style={{ fontWeight: 'bold', color: '#475569', fontSize: '15px' }}>🔊 Efek Suara & Narasi</span>
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => setSoundEnabled(e.target.checked)}
            style={{ width: '22px', height: '22px', cursor: 'pointer' }}
          />
        </div>

        <button
          onClick={handleReset}
          className="bouncy-card"
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '14px',
            background: '#EF4444',
            color: '#FFFFFF',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '15px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)'
          }}
        >
          🗑️ Riset Seluruh Progres
        </button>
      </div>
    </div>
  );
};

export default Dashboard;