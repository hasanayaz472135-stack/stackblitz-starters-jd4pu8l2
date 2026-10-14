'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'hologram' | 'social'>('hologram');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [fitResult, setFitResult] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [userPoints, setUserPoints] = useState(750);
  const [showCartRecovery, setShowCartRecovery] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [eta, setEta] = useState('12 dakika');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  // Sesli Arama Simülasyonu
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Tarayıcınız sesli aramayı desteklemiyor.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'tr-TR';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setSearchTerm(text);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // Yapay Zeka Beden Hesaplama
  const calculateSize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!height || !weight) return;
    const h = Number(height);
    const w = Number(weight);
    let recommended = 'M Beden';
    if (w > 85 || h > 185) recommended = 'XL Beden';
    else if (w > 75 || h > 178) recommended = 'L Beden';
    else if (w < 60) recommended = 'S Beden';
    setFitResult(recommended);
  };

  // Sepet Terk Kurtarma Tetikleyicisi
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && cartCount > 0) {
        setShowCartRecovery(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [cartCount]);

  // Kurye ETA Güncelleme
  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => {
        const mins = parseInt(prev);
        return mins > 1 ? `${mins - 1} dakika` : 'Kapıda! 🚪🔔';
      });
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const tiers = [
    { name: 'Bronz', minPoints: 0, discount: '%0' },
    { name: 'Gümüş', minPoints: 500, discount: '%5' },
    { name: 'Altın', minPoints: 1000, discount: '%10' },
    { name: 'VIP', minPoints: 2500, discount: '%20 + Kargo Bedava' },
  ];
  const currentTier = tiers.reverse().find(t => userPoints >= t.minPoints) || tiers[tiers.length - 1];

  const products = [
    { id: 1, name: 'Kablosuz Akıllı Kulaklık Pro', price: '2.499 TL', category: 'Elektronik', rating: '⭐ 4.9' },
    { id: 2, name: 'Oversize Premium Sweatshirt', price: '899 TL', category: 'Giyim', rating: '⭐ 4.8' },
    { id: 3, name: 'Minimalist Akıllı Saat', price: '1.799 TL', category: 'Aksesuar', rating: '⭐ 4.7' },
  ];

  return (
    <main className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'} p-4 sm:p-8 font-sans`}>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Üst Bilgi ve Tema Değiştirici */}
        <div className="flex justify-between items-center bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6 rounded-3xl shadow-2xl">
          <div>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold">alyaz-web.vercel.app</span>
            <h1 className="text-2xl sm:text-3xl font-black mt-2">Alyaz E-Ticaret Platformu</h1>
            <p className="text-xs text-orange-100 mt-1">20'de 20 Efsanevi Meta-Ticaret Deneyimi</p>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl text-xl backdrop-blur-md transition-all shadow-lg"
            title="Karanlık/Aydınlık Mod"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* 1 & 14. Arama Çubuğu & Sesli Arama Asistanı */}
        <div className={`flex items-center gap-3 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border px-6 py-4 rounded-3xl shadow-lg`}>
          <button 
            onClick={startListening}
            className={`p-3 rounded-2xl text-white transition-all ${isListening ? 'bg-red-500 animate-pulse' : 'bg-orange-600 hover:bg-orange-700'}`}
            title="Sesli Arama"
          >
            🎙️
          </button>
          <div className="flex-1">
            <span className="text-xs font-bold text-gray-400 block">
              {isListening ? 'Dinleniyor, konuşun...' : 'Sesli veya Metin Arama'}
            </span>
            <input 
              type="text" 
              placeholder="Ürün, kategori veya marka ara..." 
              value={transcript || searchTerm}
              onChange={(e) => {
                setTranscript(e.target.value);
                setSearchTerm(e.target.value);
              }}
              className="w-full bg-transparent text-sm focus:outline-none font-medium mt-0.5"
            />
          </div>
        </div>

        {/* Kategori Filtreleri */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['Tümü', 'Elektronik', 'Giyim', 'Aksesuar'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-orange-600 text-white shadow-lg' : darkMode ? 'bg-gray-900 text-gray-400 border border-gray-800' : 'bg-white text-gray-600 border border-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Ürün Listesi */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {products
            .filter(p => selectedCategory === 'Tümü' || p.category === selectedCategory)
            .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(product => (
              <div key={product.id} className={`p-4 rounded-3xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} shadow-lg flex flex-col justify-between`}>
                <div>
                  <div className="h-36 bg-gray-800 rounded-2xl mb-3 flex items-center justify-center text-3xl">🛍️</div>
                  <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{product.category}</span>
                  <h4 className="font-bold text-sm mt-1">{product.name}</h4>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-base font-black text-orange-600">{product.price}</span>
                  <span className="text-xs text-gray-400">{product.rating}</span>
                </div>
              </div>
          ))}
        </div>

        {/* 15. AR (Artırılmış Gerçeklik) Ürün Görüntüleyici */}
        <div className={`p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg text-white">
              🥽
            </div>
            <div>
              <h3 className="text-lg font-extrabold">Odanızda Deneyin (AR)</h3>
              <p className="text-xs text-gray-400">Ürünü gerçek boyutlarıyla mekanınızda görüntüleyin.</p>
            </div>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none bg-gray-800 text-white hover:bg-black font-bold px-4 py-3 rounded-xl text-xs text-center shadow-md transition-all">
              🍎 iOS (AR)
            </button>
            <button className="flex-1 sm:flex-none bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-3 rounded-xl text-xs text-center shadow-md transition-all">
              🤖 Android (3D)
            </button>
          </div>
        </div>

        {/* 17. VIP Sadakat Kulübü Seviye Sistemi */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-950 text-white p-6 rounded-3xl shadow-2xl border border-orange-500/30">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-orange-400 font-bold">Sadakat Kulübü</span>
              <h3 className="text-xl font-black">Seviyeniz: {currentTier.name} 🏆</h3>
            </div>
            <div className="bg-orange-500/20 border border-orange-500 px-4 py-2 rounded-2xl text-center">
              <span className="block text-xs text-orange-300">Puanınız</span>
              <span className="text-lg font-extrabold text-orange-400">{userPoints} Pts</span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {tiers.map((tier, idx) => {
              const isUnlocked = userPoints >= tier.minPoints;
              return (
                <div key={idx} className={`p-3 rounded-2xl border ${isUnlocked ? 'bg-orange-600/20 border-orange-500 text-white' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                  <h4 className="font-extrabold text-xs mb-1">{tier.name}</h4>
                  <span className="text-[10px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded-full">{tier.discount}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 18. Canlı GPS Kurye Takip Haritası */}
        <div className={`p-6 rounded-3xl shadow-xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-xs bg-orange-100 text-orange-600 font-extrabold px-3 py-1 rounded-full">Canlı Takip</span>
              <h3 className="text-lg font-black mt-2">Kuryemiz Yolda! 🛵</h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 block">Varış (ETA)</span>
              <span className="text-base font-extrabold text-orange-600">{eta}</span>
            </div>
          </div>
          <div className="relative h-40 bg-gray-950 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-800">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ff6a00_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="relative z-10 flex flex-col items-center animate-bounce">
              <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl shadow-xl">🛵</div>
              <span className="bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">Ahmet Y. (Kurye)</span>
            </div>
          </div>
        </div>

        {/* 19. Yapay Zeka Sanal Soyunma Odası */}
        <div className="bg-gradient-to-br from-orange-600 to-amber-700 text-white p-6 rounded-3xl shadow-2xl border border-orange-400/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white text-orange-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">👕</div>
            <div>
              <span className="text-xs uppercase tracking-widest text-orange-200 font-bold">AI Asistanı</span>
              <h3 className="text-lg font-black">Sanal Soyunma Odası</h3>
            </div>
          </div>
          <form onSubmit={calculateSize} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <input 
              type="number" placeholder="Boy (cm) Örn: 175" value={height} onChange={e => setHeight(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-orange-200 text-xs focus:outline-none"
            />
            <input 
              type="number" placeholder="Kilo (kg) Örn: 70" value={weight} onChange={e => setWeight(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-orange-200 text-xs focus:outline-none"
            />
            <button type="submit" className="bg-white text-orange-600 hover:bg-orange-50 font-extrabold py-2 rounded-xl text-xs shadow-lg transition-all">
              Bedenimi Hesapla 🤖
            </button>
          </form>
          {fitResult && (
            <div className="bg-black/20 backdrop-blur-md p-3 rounded-xl border border-white/20 text-center">
              <p className="text-xs text-white font-bold">Önerilen Beden: <span className="text-amber-300 font-black">{fitResult}</span> ✨</p>
            </div>
          )}
        </div>

        {/* 20. 3D Holografik Vitrin ve Sosyal Alışveriş Akışı */}
        <div className={`p-6 rounded-3xl shadow-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-orange-500 font-bold">Meta-Ticaret</span>
              <h3 className="text-lg font-black">20. Seviye: Geleceğin Vitrini</h3>
            </div>
            <div className="flex bg-gray-800 p-1 rounded-xl border border-gray-700">
              <button 
                onClick={() => setActiveTab('hologram')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'hologram' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                🔮 Hologram
              </button>
              <button 
                onClick={() => setActiveTab('social')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'social' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                📸 Sosyal Akış
              </button>
            </div>
          </div>

          {activeTab === 'hologram' ? (
            <div className="bg-black/40 border border-gray-800 rounded-2xl p-6 text-center relative overflow-hidden">
              <div className="text-5xl my-4 animate-pulse">🛸</div>
              <h4 className="text-sm font-bold mb-1">Holografik Ürün İnceleme</h4>
              <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">Ürünü 360 derece havada döndürerek inceleyin.</p>
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-lg transition-all">
                Hologramı Başlat
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className={`p-3 rounded-2xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} flex flex-col`}>
                  <div className="h-28 bg-gray-700 rounded-xl mb-2 flex items-center justify-center text-2xl">📸</div>
                  <p className="text-xs font-bold mb-1">"@alyaz_kullanicisi"</p>
                  <p className="text-[11px] text-gray-400">"Ürün elime ulaştı, kalitesi harika! 🌟"</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 16. Yapay Zeka Sepet Terk Kurtarma Modalı */}
        {showCartRecovery && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white text-gray-900 max-w-sm w-full rounded-3xl shadow-2xl p-6 text-center border border-gray-100">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">🎁</div>
              <h3 className="text-lg font-black mb-1">Gitmeden Önce Sürpriz!</h3>
              <p className="text-xs text-gray-500 mb-4">Sepetini tamamlaman için sana özel anında **%15 İndirim** tanımladık!</p>
              <div className="bg-gray-50 border-2 border-dashed border-orange-300 p-2.5 rounded-xl mb-4">
                <span className="text-sm font-mono font-extrabold text-orange-600">ALYAZ15KAÇIRMA</span>
              </div>
              <button 
                onClick={() => setShowCartRecovery(false)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-colors"
              >
                İndirimi Uygula ve Alışverişe Dön
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
