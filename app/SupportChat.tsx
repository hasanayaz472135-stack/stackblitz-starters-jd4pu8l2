'use client';

import { useState } from 'react';

export default function SupportChat({ lang, darkMode, theme }: any) {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    { sender: 'bot', text: lang === 'tr' ? 'Merhaba! Alyaz Asistan’a hoş geldiniz. Size nasıl yardımcı olabilirim?' : 'Hello! Welcome to Alyaz Assistant. How can I help you?' }
  ]);

  const sendBotMessage = (text: string) => {
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setTimeout(() => {
      let reply = lang === 'tr' ? 'Talebiniz ilgili birime aktarıldı.' : 'Your request has been forwarded.';
      if (text.includes('Kargo') || text.includes('Shipping')) {
        reply = lang === 'tr' ? 'Siparişlerinizi "Hesabım" sekmesinden canlı takip edebilirsiniz 🛵' : 'You can track orders live in "My Profile" 🛵';
      } else if (text.includes('İade') || text.includes('Return')) {
        reply = lang === 'tr' ? '14 gün içinde kolayca iade oluşturabilirsiniz.' : 'You can easily return within 14 days.';
      }
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 800);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userText = chatInput;
    setChatInput('');
    sendBotMessage(userText);
  };

  return (
    <div style={{ width: '280px', height: '360px', background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
      <div style={{ background: '#FF6A00', color: '#fff', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold' }}>
        <span>{lang === 'tr' ? 'Canlı Asistan' : 'Live Assistant'}</span>
      </div>
      
      <div style={{ flex: 1, padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', background: m.sender === 'user' ? '#FF6A00' : (darkMode ? '#333' : '#f1f1f1'), color: m.sender === 'user' ? '#fff' : theme.text, padding: '6px 10px', borderRadius: '10px', maxWidth: '80%' }}>
            {m.text}
          </div>
        ))}
      </div>

      <div style={{ padding: '6px 8px', display: 'flex', gap: '4px', borderTop: `1px solid ${theme.border}`, background: darkMode ? '#1a1a1a' : '#fafafa' }}>
        <button onClick={() => sendBotMessage('Kargom nerede?')} style={{ background: theme.bg, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: '6px', fontSize: '9px', padding: '4px 6px', cursor: 'pointer' }}>📦 Kargo</button>
        <button onClick={() => sendBotMessage('İade yapabilir miyim?')} style={{ background: theme.bg, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: '6px', fontSize: '9px', padding: '4px 6px', cursor: 'pointer' }}>🔄 İade</button>
      </div>

      <form onSubmit={sendMessage} style={{ display: 'flex', borderTop: `1px solid ${theme.border}`, padding: '6px' }}>
        <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Mesaj..." style={{ flex: 1, padding: '6px', border: `1px solid ${theme.border}`, borderRadius: '6px', fontSize: '11px', background: theme.bg, color: theme.text, outline: 'none' }} />
        <button type="submit" style={{ background: '#FF6A00', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', marginLeft: '4px' }}>Gönder</button>
      </form>
    </div>
  );
}
