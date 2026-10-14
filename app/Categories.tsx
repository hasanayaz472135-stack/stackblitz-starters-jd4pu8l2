'use client';

export default function Categories({ detailedCategories, theme, title }: any) {
  return (
    <div>
      <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', color: theme.text }}>{title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
        {detailedCategories.map((cat: any, idx: number) => (
          <div key={idx} style={{ background: theme.card, padding: '16px', borderRadius: '16px', border: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '24px' }}>{cat.icon}</span>
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: theme.text }}>{cat.name}</h4>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {cat.subcategories.map((sub: string, sIdx: number) => (
                <span key={sIdx} style={{ background: theme.darkMode ? '#2a2a2a' : '#fff3ed', color: '#FF6A00', padding: '6px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold' }}>
                  {sub}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
