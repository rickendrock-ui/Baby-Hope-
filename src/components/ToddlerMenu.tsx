// src/components/ToddlerMenu.tsx
import React from 'react';
import { playPopSound, speakText } from '../utils/audio';

export interface ModuleItem {
  id: string;
  title: string;
  icon: string;
  gradient: string;
  borderColor: string;
  starCount: number;
}

interface ToddlerMenuProps {
  onSelectModule: (moduleId: string, title: string) => void;
}

const modulesList: ModuleItem[] = [
  { id: 'alphabet', title: 'Belajar Abjad', icon: '🔤', gradient: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', borderColor: '#FF6B6B', starCount: 3 },
  { id: 'number', title: 'Belajar Angka', icon: '🔢', gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', borderColor: '#4D96FF', starCount: 3 },
  { id: 'animal', title: 'Dunia Hewan', icon: '🦁', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', borderColor: '#FF9F43', starCount: 3 },
  { id: 'color', title: 'Mengenal Warna', icon: '🎨', gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', borderColor: '#9B59B6', starCount: 3 },
  { id: 'fruit', title: 'Buah Segar', icon: '🍎', gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)', borderColor: '#2ECC71', starCount: 3 },
  { id: 'shape', title: 'Bentuk Geometri', icon: '📐', gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', borderColor: '#8E44AD', starCount: 3 },
  { id: 'music', title: 'Xilofon Musik', icon: '🎹', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', borderColor: '#E84393', starCount: 3 },
  { id: 'matching', title: 'Cocok Gambar', icon: '🧩', gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', borderColor: '#F39C12', starCount: 3 },
  { id: 'quiz', title: 'Kuis Pintar', icon: '❓', gradient: 'linear-gradient(135deg, #5EE7DF 0%, #B490CA 100%)', borderColor: '#1ABC9C', starCount: 3 },
];

export const ToddlerMenu: React.FC<ToddlerMenuProps> = ({ onSelectModule }) => {
  const handleClick = (m: ModuleItem) => {
    playPopSound();
    speakText(`Mari ${m.title}!`);
    onSelectModule(m.id, m.title);
  };

  return (
    <div style={{ padding: '12px', maxWidth: '850px', margin: '0 auto' }}>
      {/* Banner Subtitle Ceria */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#2D3436', fontSize: '26px', fontWeight: 'bold' }}>
          ✨ Pilih Permainan Suka-Suka ✨
        </h2>
        <p style={{ color: '#636E72', fontSize: '15px' }}>Sentuh gambarnya untuk mulai belajar!</p>
      </div>

      {/* Grid 9 Modul Interaktif */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '18px',
        padding: '6px'
      }}>
        {modulesList.map((m) => (
          <div
            key={m.id}
            onClick={() => handleClick(m)}
            className="bouncy-card"
            style={{
              background: m.gradient,
              border: `4px solid ${m.borderColor}`,
              borderRadius: '28px',
              padding: '20px 14px',
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {/* Lencana Bintang Ceria */}
            <div style={{
              position: 'absolute', top: '8px', right: '12px',
              fontSize: '12px', background: 'rgba(255,255,255,0.7)',
              padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold'
            }}>
              ⭐ {m.starCount}
            </div>

            {/* Icon Melayang & Membal */}
            <div className="floating-icon" style={{ fontSize: '56px', margin: '10px 0' }}>
              {m.icon}
            </div>

            {/* Judul Modul */}
            <div style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#2D3436',
              background: 'rgba(255,255,255,0.85)',
              padding: '6px 12px',
              borderRadius: '16px',
              width: '100%',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              {m.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};