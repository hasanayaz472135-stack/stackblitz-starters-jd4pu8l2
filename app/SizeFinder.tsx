'use client';

import { useState } from 'react';

export default function SizeFinder({ darkMode, theme }: any) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [sizeResult, setSizeResult] = useState<string | null>(null);

  const calculateSize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!height || !weight) return;
    const h = Number(height);
    const w = Number(weight);
    let res = 'M Beden';
    if (w > 85 || h > 185) res = 'XL Beden';
    else if (w > 75 || h > 178) res = 'L Beden';
    else if (w < 60) res = 'S Beden';
    setSizeResult(res);
  };

  return (
    <div style={{ background: darkMode ? '#1a1a1a' : '#fff3ed', border: '1px solid #FF6A00', padding: '16px', borderRadius: '16px', marginBottom: '16px' }}>
      <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#FF6A00', fontWeight: '900' }}>👕 Sanal Soyunma Odası (AI Beden Önerici)</h4>
      <form onSubmit={calculateSize} style={{ display: 'flex', gap: '8px' }}>
        <input type="number" placeholder="Boy (cm)" value={height} onChange={e => setHeight(e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.card, color: theme.text, fontSize: '11px', outline: 'none' }} />
        <input type="number" placeholder="Kilo (kg)" value={weight} onChange={e => setWeight(e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.card, color: theme.text, fontSize: '11px', outline: 'none' }} />
        <button type="submit" style={{ background: '#FF6A00', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>Hesapla</button>
      </form>
      {sizeResult && (
        <div style={{ marginTop: '8px', fontSize: '12px', fontWeight: 'bold', color: theme.text }}>
          Önerilen Beden: <span style={{ color: '#FF6A00' }}>{sizeResult}</span> ✨
        </div>
      )}
    </div>
  );
}
