'use client';

import { useState, useEffect } from 'react';
import SupportChat from './SupportChat';
import Categories from './Categories';
import SizeFinder from './SizeFinder';

export default function MobileApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'customer' | 'seller'>('customer');
  const [tab, setTab] = useState('home');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<{ id: number; title: string; price: number; icon: string; count: number; stock: number }[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  
  const [isCheckout, setIsCheckout] = useState(false);
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'door' | 'eft'>('card');

  const [sellerContractAccepted, setSellerContractAccepted] = useState(false);
  const [sellerWallet, setSellerWallet] = useState(0);
  const [escrowPool, setEscrowPool] = useState(0);

  const [newProductTitle, setNewProductTitle] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Ayakkabı');
  const [newProductIcon, setNewProductIcon] = useState('📦');
  const [newProductStock, setNewProductStock] = useState('10');

  const [activeTrackingOrder, setActiveTrackingOrder] = useState<any | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const savedAddress = localStorage.getItem('alyaz_address');
    const savedCard = localStorage.getItem('alyaz_card');
    if (savedAddress) setAddress(savedAddress);
    if (savedCard) setCardNumber(savedCard);
  }, []);

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [orders, setOrders] = useState<any[]>([]);

  const [isChatOpen, setIsChatOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState('5');

  const [lang, setLang] = useState<'tr' | 'en'>('tr');
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('Tümü');
  const [maxPriceFilter, setMaxPriceFilter] = useState(5000);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Yaz İndirimi Başladı!', desc: 'YAZ2026 kodu ile sepetinde %20 indirim kazan.', date: '14.10.2026', read: false },
    { id: 2, title: 'Hoş Geldin Hediyesi', desc: 'Alyaz ailesine katıldığın için teşekkür ederiz.', date: '14.10.2026', read: false }
  ]);

  const t = {
    tr: {
      loginTitle: 'Müşteri Girişi',
      sellerLoginTitle: 'Satıcı Paneli Girişi',
      welcome: 'Alışverişin Yeni Trendi',
      search: 'Ürün ara...',
      flash: 'Flaş Ürünler',
      addToCart: 'Sepete Ekle',
      categories: 'Kategoriler & Alt Kırılımlar',
      cartTitle: 'Sepetim',
      emptyCart: 'Sepetiniz boş.',
      favoritesTitle: 'Favorilerim',
      emptyFav: 'Favori ürün yok.',
      profileTitle: 'Hesabım',
      ordersTitle: 'Sipariş Geçmişim',
      noOrders: 'Sipariş bulunmuyor.',
      completeOrder: 'Siparişi Tamamla',
      total: 'Toplam',
      apply: 'Uygula',
      couponPlaceholder: 'Kupon (YAZ2026)',
      logout: 'Çıkış',
      statusPrep: 'Kurye Yolda 🛵',
      notificationsTitle: 'Bildirimler',
      emptyNotif: 'Bildirim bulunmuyor.',
      sortDefault: 'Sıralama: Önerilen',
      sortAsc: 'Fiyat: Artan',
      sortDesc: 'Fiyat: Azalan',
      addProduct: 'Yeni Ürün Ekle',
      productName: 'Ürün Adı',
      productPrice: 'Fiyat (TL)',
      productStock: 'Stok Adedi',
      saveProduct: 'Ürünü Mağazada Yayınla',
      sellerOrders: 'Mağaza Siparişleri & Stok',
      contractTitle: 'alyaz Güvenli Satıcı Sözleşmesi',
      contractText: '%10 Platform Komisyonu, 14 gün yasal iade şartı ve orijinal ürün taahhüdünü kabul ediyorum.',
      acceptContractError: 'Lütfen satıcı sözleşmesini onaylayın!',
      walletBalance: 'Cüzdan (Hak Ediş):',
      escrowBalance: 'Havuzda Bekleyen Tutar:',
      sellerRating: 'Mağaza Puanı: 4.8 / 5.0 ⭐',
      trackLive: 'Canlı Harita Takibi 📍',
      paymentTitle: 'Ödeme Yöntemi Seçin',
      payCard: 'Kredi / Banka Kartı',
      payDoor: 'Kapıda Ödeme (+15 TL)',
      payEft: 'Havale / EFT'
    },
    en: {
      loginTitle: 'Customer Login',
      sellerLoginTitle: 'Seller Dashboard Login',
      welcome: 'New Trend of Shopping',
      search: 'Search products...',
      flash: 'Flash Products',
      addToCart: 'Add to Cart',
      categories: 'Categories & Subcategories',
      cartTitle: 'My Cart',
      emptyCart: 'Your cart is empty.',
      favoritesTitle: 'My Favorites',
      emptyFav: 'No favorites.',
      profileTitle: 'My Profile',
      ordersTitle: 'Order History',
      noOrders: 'No orders found.',
      completeOrder: 'Complete Order',
      total: 'Total',
      apply: 'Apply',
      couponPlaceholder: 'Coupon (YAZ2026)',
      logout: 'Log Out',
      statusPrep: 'Courier on the way 🛵',
      notificationsTitle: 'Notifications',
      emptyNotif: 'No notifications found.',
      sortDefault: 'Sort: Featured',
      sortAsc: 'Price: Low to High',
      sortDesc: 'Price: High to Low',
      addProduct: 'Add New Product',
      productName: 'Product Name',
      productPrice: 'Price (TL)',
      productStock: 'Stock Qty',
      saveProduct: 'Publish Product',
      sellerOrders: 'Store Orders & Stock',
      contractTitle: 'alyaz Secure Seller Agreement',
      contractText: 'I accept 10% platform commission, 14-day return policy and authentic product commitment.',
      acceptContractError: 'Please accept the seller agreement!',
      walletBalance: 'Wallet (Earnings):',
      escrowBalance: 'Escrow Pool Balance:',
      sellerRating: 'Store Rating: 4.8 / 5.0 ⭐',
      trackLive: 'Live Map Tracking 📍',
      paymentTitle: 'Select Payment Method',
      payCard: 'Credit / Debit Card',
      payDoor: 'Cash on Delivery (+15 TL)',
      payEft: 'Bank Transfer / EFT'
    }
  }[lang];

  const [products, setProducts] = useState([
    { id: 1, title: 'Spor Ayakkabı', price: 1299, icon: '👟', category: 'Ayakkabı', stock: 15, reviews: [{ user: 'Ahmet Y.', comment: 'Çok rahat ve şık.', rating: 5 }] },
    { id: 2, title: 'Kol Saati', price: 599, icon: '⌚', category: 'Aksesuar', reviews: [{ user: 'Can T.', comment: 'Fiyatına göre harika.', rating: 4 }] },
    { id: 3, title: 'Sırt Çantası', price: 899, icon: '🎒', category: 'Çanta', reviews: [{ user: 'Zeynep D.', comment: 'Geniş ve kullanışlı.', rating: 5 }] },
    { id: 4, title: 'Kablosuz Kulaklık', price: 799, icon: '🎧', category: 'Elektronik', reviews: [{ user: 'Burak K.', comment: 'Ses kalitesi iyi.', rating: 4 }] },
  ]);

  const detailedCategories = [
    { name: 'Elektronik', icon: '⚡', subcategories: ['Akıllı Saatler', 'Kulaklıklar', 'Telefon Aksesuarları', 'Şarj Cihazları'] },
    { name: 'Ayakkabı', icon: '👟', subcategories: ['Spor Ayakkabı', 'Günlük Ayakkabı', 'Koşu Ayakkabısı', 'Bot & Çizme'] },
    { name: 'Çanta', icon: '🎒', subcategories: ['Sırt Çantası', 'El Çantası', 'Laptop Çantası', 'Seyahat Valizi'] },
    { name: 'Aksesuar', icon: '⌚', subcategories: ['Kol Saati', 'Gözlük', 'Cüzdan', 'Kemer'] },
  ];

  const theme = {
    bg: darkMode ? '#121212' : '#f8f9fa',
    card: darkMode ? '#1e1e1e' : '#fff',
    text: darkMode ? '#e0e0e0' : '#1F1F1F',
    subText: darkMode ? '#aaa' : '#666',
    border: darkMode ? '#333' : '#eee',
    darkMode
  };
  const addToCart = (product: any) => {
    if (product.stock <= 0) {
      alert('Ürün tükendi!');
      return;
    }
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, count: item.count + 1 } : item);
      }
      return [...prev, { ...product, count: 1 }];
    });
    alert(`${product.title} sepete eklendi!`);
  };

  const updateCartCount = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newCount = item.count + delta;
        return newCount > 0 ? { ...item, count: newCount } : null;
      }
      return item;
    }).filter(Boolean) as any);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'YAZ2026') {
      setDiscount(0.20);
      alert(lang === 'tr' ? '%20 indirim uygulandı!' : '20% discount applied!');
    } else {
      alert(lang === 'tr' ? 'Geçersiz kupon!' : 'Invalid coupon!');
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;
    if (paymentMethod === 'card' && !cardNumber) return;
    
    localStorage.setItem('alyaz_address', address);
    if (cardNumber) localStorage.setItem('alyaz_card', cardNumber);

    const doorFee = paymentMethod === 'door' ? 15 : 0;
    const orderTotalNum = Number((subTotal * (1 - discount) + doorFee).toFixed(2));
    
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString('tr-TR'),
      items: [...cart],
      total: orderTotalNum.toFixed(2),
      status: t.statusPrep,
      courier: 'Ahmet Y. (Kurye)',
      payment: paymentMethod === 'card' ? 'Kredi Kartı' : paymentMethod === 'door' ? 'Kapıda Ödeme' : 'Havale / EFT'
    };

    setProducts(prevProducts => prevProducts.map(p => {
      const cartItem = cart.find(c => c.id === p.id);
      if (cartItem) {
        return { ...p, stock: Math.max(0, p.stock - cartItem.count) };
      }
      return p;
    }));

    setOrders([newOrder, ...orders]);
    const netSellerEarnings = orderTotalNum * 0.90;
    setEscrowPool(prev => prev + netSellerEarnings);
    setTimeout(() => {
      setEscrowPool(prev => Math.max(0, prev - netSellerEarnings));
      setSellerWallet(prev => prev + netSellerEarnings);
    }, 5000);

    setCart([]);
    setDiscount(0);
    setCoupon('');
    setIsCheckout(false);
    setTab('profile');

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
    
    setNotifications(prev => [
      { id: Date.now(), title: lang === 'tr' ? 'Sipariş Alındı 🎉' : 'Order Received 🎉', desc: lang === 'tr' ? 'Siparişiniz başarıyla oluşturuldu.' : 'Your order has been successfully created.', date: new Date().toLocaleDateString('tr-TR'), read: false },
      ...prev
    ]);
  };
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerContractAccepted) {
      alert(t.acceptContractError);
      return;
    }
    if (!newProductTitle || !newProductPrice) return;
    const newProduct = {
      id: Date.now(),
      title: newProductTitle,
      price: Number(newProductPrice),
      icon: newProductIcon || '📦',
      category: newProductCategory,
      stock: Number(newProductStock) || 10,
      reviews: []
    };
    setProducts([newProduct, ...products]);
    setNewProductTitle('');
    setNewProductPrice('');
    setNewProductStock('10');
    alert(lang === 'tr' ? 'Ürün başarıyla mağazaya eklendi!' : 'Product added successfully!');
  };

  const updateProductStock = (id: number, newStockVal: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, stock: Math.max(0, newStockVal) } : p));
  };

  const addReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const updatedReviews = [...selectedProduct.reviews, { user: 'Hasan Ayaz', comment: newComment, rating: Number(newRating) }];
    const updatedProduct = { ...selectedProduct, reviews: updatedReviews };
    setSelectedProduct(updatedProduct);
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setNewComment('');
  };

  const filtered = products
    .filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategoryFilter === 'Tümü' || p.category === selectedCategoryFilter;
      const matchesPrice = p.price <= maxPriceFilter;
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'asc') return a.price - b.price;
      if (sortBy === 'desc') return b.price - a.price;
      return 0;
    });

  const totalCount = cart.reduce((sum, item) => sum + item.count, 0);
  const subTotal = cart.reduce((sum, item) => sum + (item.price * item.count), 0);
  const doorFee = paymentMethod === 'door' ? 15 : 0;
  const finalPrice = subTotal * (1 - discount) + doorFee;
  const unreadCount = notifications.filter(n => !n.read).length;

  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total), 0);
  const totalOrdersCount = orders.length;

  if (!isLoggedIn) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#FF6A00', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', fontFamily: 'sans-serif' }}>
        <div style={{ background: '#fff', padding: '28px 24px', borderRadius: '24px', width: '100%', maxWidth: '380px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: '#FF6A00', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: '#fff', fontWeight: '900', boxShadow: '0 4px 12px rgba(255,106,0,0.4)', position: 'relative' }}>
              a
              <span style={{ position: 'absolute', top: '8px', right: '10px', fontSize: '14px' }}>✨</span>
            </div>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '900', color: '#1F1F1F', letterSpacing: '-0.5px' }}>alyaz</h1>
          </div>
          <p style={{ color: '#666', fontSize: '13px', margin: '0 0 24px 0', fontWeight: '500' }}>{t.welcome}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={() => { setUserRole('customer'); setIsLoggedIn(true); setTab('home'); }} style={{ width: '100%', padding: '14px', background: '#FF6A00', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>{t.loginTitle}</button>
            <button onClick={() => { setUserRole('seller'); setIsLoggedIn(true); setTab('seller-dashboard'); }} style={{ width: '100%', padding: '14px', background: '#222', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>{t.sellerLoginTitle}</button>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main style={{ minHeight: '100vh', backgroundColor: theme.bg, color: theme.text, fontFamily: 'sans-serif', paddingBottom: '70px', position: 'relative' }}>
      
      {showConfetti && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,106,0,0.15)', backdropFilter: 'blur(2px)' }}>
          <div style={{ background: '#fff', padding: '24px 32px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '50px', marginBottom: '8px' }}>🎉🥳🚀</div>
            <h2 style={{ margin: '0 0 6px 0', color: '#FF6A00', fontSize: '20px' }}>Siparişiniz Başarıyla Alındı!</h2>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Kuryeniz yola çıktı, keyifli alışverişler dileriz!</p>
          </div>
        </div>
      )}

      <header style={{ backgroundColor: theme.card, padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.border}`, position: 'sticky', top: 0, zIndex: 99 }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: theme.text, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '26px', height: '26px', backgroundColor: '#FF6A00', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#fff', fontWeight: '900' }}>a</div>
          {userRole === 'seller' ? 'alyaz satıcı' : 'alyaz'}
        </h2>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {userRole === 'customer' && (
            <button onClick={() => setTab('notifications')} style={{ background: theme.bg, color: theme.text, border: `1px solid ${theme.border}`, padding: '4px 8px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', position: 'relative' }}>
              🔔 {unreadCount > 0 && <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#FF6A00', color: '#fff', borderRadius: '50%', fontSize: '9px', width: '14px', height: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>{unreadCount}</span>}
            </button>
          )}
          <button onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')} style={{ background: theme.bg, color: theme.text, border: `1px solid ${theme.border}`, padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
            {lang === 'tr' ? 'EN' : 'TR'}
          </button>
          <button onClick={() => setDarkMode(!darkMode)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>{darkMode ? '☀️' : '🌙'}</button>
          <button onClick={() => setIsLoggedIn(false)} style={{ background: '#fff5ec', color: '#FF6A00', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '11px', cursor: 'pointer' }}>{t.logout}</button>
        </div>
      </header>

      <div style={{ padding: '16px', maxWidth: '480px', margin: '0 auto' }}>
        {userRole === 'seller' ? (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
              <div style={{ background: theme.card, padding: '16px', borderRadius: '16px', border: `1px solid ${theme.border}` }}>
                <div style={{ fontSize: '11px', color: theme.subText, marginBottom: '4px' }}>Toplam Ciro</div>
                <div style={{ fontSize: '18px', fontWeight: '900', color: '#FF6A00' }}>{totalRevenue.toFixed(2)} TL</div>
              </div>
              <div style={{ background: theme.card, padding: '16px', borderRadius: '16px', border: `1px solid ${theme.border}` }}>
                <div style={{ fontSize: '11px', color: theme.subText, marginBottom: '4px' }}>Toplam Sipariş</div>
                <div style={{ fontSize: '18px', fontWeight: '900', color: theme.text }}>{totalOrdersCount} Adet</div>
              </div>
            </div>

            <div style={{ background: theme.card, padding: '16px', borderRadius: '16px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: `1px solid ${theme.border}` }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', color: theme.text }}>{t.sellerRating}</h4>
                <p style={{ margin: 0, fontSize: '11px', color: '#4caf50', fontWeight: 'bold' }}>✔ Onaylı Güvenli Satıcı</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: theme.subText }}>{t.walletBalance}</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#FF6A00' }}>{sellerWallet.toFixed(2)} TL</div>
              </div>
            </div>

            <div style={{ background: darkMode ? '#1a1a1a' : '#fff3ed', padding: '14px', borderRadius: '14px', marginBottom: '16px', border: '1px solid #FF6A00' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', color: theme.text }}>
                <span>🔒 {t.escrowBalance}</span>
                <span style={{ color: '#FF6A00' }}>{escrowPool.toFixed(2)} TL</span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '10px', color: theme.subText }}>Müşteri onayından sonra hak edişiniz cüzdanınıza aktarılır.</p>
            </div>

            <div style={{ background: theme.card, padding: '20px', borderRadius: '20px', marginBottom: '16px' }}>
              <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', fontWeight: '800', color: theme.text }}>{t.addProduct}</h3>
              <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" value={newProductTitle} onChange={(e) => setNewProductTitle(e.target.value)} placeholder={t.productName} style={{ padding: '10px', borderRadius: '10px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, fontSize: '12px', outline: 'none' }} required />
                <input type="number" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} placeholder={t.productPrice} style={{ padding: '10px', borderRadius: '10px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, fontSize: '12px', outline: 'none' }} required />
                <input type="number" value={newProductStock} onChange={(e) => setNewProductStock(e.target.value)} placeholder={t.productStock} style={{ padding: '10px', borderRadius: '10px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, fontSize: '12px', outline: 'none' }} required />
                <select value={newProductCategory} onChange={(e) => setNewProductCategory(e.target.value)} style={{ padding: '10px', borderRadius: '10px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, fontSize: '12px' }}>
                  {detailedCategories.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
                </select>
                <input type="text" value={newProductIcon} onChange={(e) => setNewProductIcon(e.target.value)} placeholder="Emoji (Örn: 💻)" style={{ padding: '10px', borderRadius: '10px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, fontSize: '12px', outline: 'none' }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '6px' }}>
                  <input type="checkbox" checked={sellerContractAccepted} onChange={(e) => setSellerContractAccepted(e.target.checked)} id="contractCheck" style={{ marginTop: '2px', cursor: 'pointer' }} />
                  <label htmlFor="contractCheck" style={{ fontSize: '11px', color: theme.subText, lineHeight: '1.4', cursor: 'pointer' }}>
                    <b>{t.contractTitle}:</b> {t.contractText}
                  </label>
                </div>

                <button type="submit" style={{ padding: '12px', background: '#FF6A00', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', marginTop: '6px' }}>{t.saveProduct}</button>
              </form>
            </div>

            <div style={{ background: theme.card, padding: '20px', borderRadius: '20px', marginBottom: '16px' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '800', color: theme.text }}>📦 Mağaza Stok Yönetimi</h3>
              {products.map(p => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: darkMode ? '#252525' : '#f8f9fa', padding: '10px 12px', borderRadius: '10px', marginBottom: '8px', fontSize: '12px' }}>
                  <span>{p.icon} <b>{p.title}</b></span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: theme.subText }}>Stok:</span>
                    <input type="number" value={p.stock} onChange={(e) => updateProductStock(p.id, Number(e.target.value))} style={{ width: '50px', padding: '4px', textAlign: 'center', borderRadius: '6px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, fontSize: '12px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : selectedProduct ? (
          <div style={{ background: theme.card, padding: '20px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button onClick={() => setSelectedProduct(null)} style={{ background: 'none', border: 'none', color: '#FF6A00', fontWeight: 'bold', textAlign: 'left', padding: 0, cursor: 'pointer' }}>← Geri</button>
            <div style={{ textAlign: 'center', fontSize: '60px', padding: '10px 0' }}>{selectedProduct.icon}</div>
            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: theme.text }}>{selectedProduct.title}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#FF6A00', fontWeight: 'bold', fontSize: '18px' }}>{selectedProduct.price} TL</span>
              <span style={{ fontSize: '12px', color: selectedProduct.stock > 0 ? '#4caf50' : '#f44336', fontWeight: 'bold' }}>
                {selectedProduct.stock > 0 ? `Stok: ${selectedProduct.stock} adet` : 'Tükendi'}
              </span>
            </div>
            <button onClick={() => addToCart(selectedProduct)} disabled={selectedProduct.stock <= 0} style={{ width: '100%', padding: '12px', background: selectedProduct.stock > 0 ? '#FF6A00' : '#ccc', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: selectedProduct.stock > 0 ? 'pointer' : 'not-allowed' }}>{t.addToCart}</button>
            
            <hr style={{ border: 'none', borderTop: `1px solid ${theme.border}`, margin: '8px 0' }} />
            
            <h4 style={{ margin: 0, fontSize: '15px', color: theme.text }}>Değerlendirmeler</h4>
            {selectedProduct.reviews.length === 0 ? (
              <p style={{ color: theme.subText, fontSize: '12px', margin: 0 }}>Yorum yok.</p>
            ) : (
              selectedProduct.reviews.map((r: any, i: number) => (
                <div key={i} style={{ background: darkMode ? '#252525' : '#f8f9fa', padding: '10px', borderRadius: '10px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '4px', color: theme.text }}>
                    <span>{r.user}</span>
                    <span>{'⭐'.repeat(r.rating)}</span>
                  </div>
                  <p style={{ margin: 0, color: theme.subText }}>{r.comment}</p>
                </div>
              ))
            )}

            <form onSubmit={addReview} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              <select value={newRating} onChange={(e) => setNewRating(e.target.value)} style={{ padding: '8px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, fontSize: '12px' }}>
                <option value="5">⭐⭐⭐⭐⭐ Mükemmel</option>
                <option value="4">⭐⭐⭐⭐ Çok İyi</option>
                <option value="3">⭐⭐⭐ Normal</option>
              </select>
              <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Yorum yaz..." rows={2} style={{ padding: '8px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, fontSize: '12px', outline: 'none' }} required />
              <button type="submit" style={{ padding: '10px', background: '#333', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>Gönder</button>
            </form>
          </div>
        ) : isCheckout ? (
          <form onSubmit={handleCheckout} style={{ background: theme.card, padding: '20px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <button type="button" onClick={() => setIsCheckout(false)} style={{ background: 'none', border: 'none', color: '#FF6A00', fontWeight: 'bold', textAlign: 'left', padding: 0, cursor: 'pointer' }}>← Geri</button>
            <h3 style={{ margin: 0, fontSize: '18px', color: theme.text }}>Ödeme ve Adres</h3>
            
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Teslimat Adresi..." rows={3} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, boxSizing: 'border-box' }} required />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: theme.text }}>{t.paymentTitle}:</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                <button type="button" onClick={() => setPaymentMethod('card')} style={{ padding: '10px 4px', borderRadius: '8px', border: paymentMethod === 'card' ? '2px solid #FF6A00' : `1px solid ${theme.border}`, background: paymentMethod === 'card' ? (darkMode ? '#2a1a10' : '#fff5ec') : theme.bg, color: theme.text, fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>💳 Kart</button>
                <button type="button" onClick={() => setPaymentMethod('door')} style={{ padding: '10px 4px', borderRadius: '8px', border: paymentMethod === 'door' ? '2px solid #FF6A00' : `1px solid ${theme.border}`, background: paymentMethod === 'door' ? (darkMode ? '#2a1a10' : '#fff5ec') : theme.bg, color: theme.text, fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>🚪 Kapıda</button>
                <button type="button" onClick={() => setPaymentMethod('eft')} style={{ padding: '10px 4px', borderRadius: '8px', border: paymentMethod === 'eft' ? '2px solid #FF6A00' : `1px solid ${theme.border}`, background: paymentMethod === 'eft' ? (darkMode ? '#2a1a10' : '#fff5ec') : theme.bg, color: theme.text, fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>🏦 Havale</button>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Kredi Kart Numarası..." style={{ width: '100%', padding: '10px', borderRadius: '10px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, boxSizing: 'border-box' }} required />
            )}

            {paymentMethod === 'door' && (
              <p style={{ margin: 0, fontSize: '11px', color: '#FF6A00' }}>ℹ️ Kapıda ödemelerde +15 TL ek hizmet bedeli eklenmiştir.</p>
            )}

            {paymentMethod === 'eft' && (
              <p style={{ margin: 0, fontSize: '11px', color: theme.subText }}>🏦 TR43 0006 2000 1234 5678 90 (Akbank)</p>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', color: theme.text, marginTop: '4px' }}>
              <span>{t.total}:</span>
              <span style={{ color: '#FF6A00' }}>{finalPrice.toFixed(2)} TL</span>
            </div>
            
            <button type="submit" style={{ width: '100%', padding: '14px', background: '#FF6A00', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>{t.completeOrder}</button>
          </form>
        ) : (
          <>
            {tab === 'home' && (
              <div>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search} style={{ width: '100%', padding: '12px', borderRadius: '14px', border: `1px solid ${theme.border}`, marginBottom: '12px', outline: 'none', boxSizing: 'border-box', background: theme.card, color: theme.text }} />
                
                <div style={{ background: theme.card, padding: '14px', borderRadius: '16px', marginBottom: '14px', border: `1px solid ${theme.border}` }}>
                  <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '8px' }}>
                    {['Tümü', 'Ayakkabı', 'Aksesuar', 'Çanta', 'Elektronik'].map(cat => (
                      <button key={cat} onClick={() => setSelectedCategoryFilter(cat)} style={{ background: selectedCategoryFilter === cat ? '#FF6A00' : theme.bg, color: selectedCategoryFilter === cat ? '#fff' : theme.text, border: `1px solid ${theme.border}`, padding: '6px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        {cat}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: theme.subText }}>
                    <span>Max Fiyat: <b>{maxPriceFilter} TL</b></span>
                    <input type="range" min="100" max="5000" step="100" value={maxPriceFilter} onChange={(e) => setMaxPriceFilter(Number(e.target.value))} style={{ accentColor: '#FF6A00', width: '55%' }} />
                  </div>
                </div>

                <SizeFinder darkMode={darkMode} theme={theme} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: theme.text }}>{t.flash}</h3>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '6px 10px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.card, color: theme.text, fontSize: '11px', outline: 'none' }}>
                    <option value="default">{t.sortDefault}</option>
                    <option value="asc">{t.sortAsc}</option>
                    <option value="desc">{t.sortDesc}</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {filtered.map(item => (
                    <div key={item.id} onClick={() => setSelectedProduct(item)} style={{ background: theme.card, padding: '16px', borderRadius: '16px', textAlign: 'center', position: 'relative', cursor: 'pointer' }}>
                      <button onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', zIndex: 2 }}>
                        {favorites.includes(item.id) ? '❤️' : '🤍'}
                      </button>
                      <div style={{ fontSize: '40px', marginBottom: '8px' }}>{item.icon}</div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', color: theme.text }}>{item.title}</h4>
                      <p style={{ color: '#FF6A00', fontWeight: 'bold', fontSize: '13px', margin: '0 0 4px 0' }}>{item.price} TL</p>
                      <p style={{ fontSize: '10px', color: item.stock > 0 ? theme.subText : '#f44336', margin: '0 0 10px 0' }}>
                        {item.stock > 0 ? `Stok: ${item.stock}` : 'Tükendi'}
                      </p>
                      <button onClick={(e) => { e.stopPropagation(); addToCart(item); }} disabled={item.stock <= 0} style={{ width: '100%', padding: '8px', background: item.stock > 0 ? '#FF6A00' : '#ccc', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: item.stock > 0 ? 'pointer' : 'not-allowed' }}>{t.addToCart}</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'categories' && (
              <Categories detailedCategories={detailedCategories} theme={theme} title={t.categories} />
            )}

            {tab === 'cart' && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px', color: theme.text }}>{t.cartTitle} ({totalCount})</h3>
                {cart.length === 0 ? (
                  <p style={{ color: theme.subText, textAlign: 'center', marginTop: '40px' }}>{t.emptyCart}</p>
                ) : (
                  <>
                    {cart.map((item, idx) => (
                      <div key={idx} style={{ background: theme.card, padding: '12px', borderRadius: '12px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: theme.text }}>
                        <span style={{ fontSize: '12px' }}>{item.icon} {item.title}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: darkMode ? '#2a2a2a' : '#f1f1f1', padding: '4px 8px', borderRadius: '8px' }}>
                            <button onClick={() => updateCartCount(item.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: theme.text }}>-</button>
                            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.count}</span>
                            <button onClick={() => updateCartCount(item.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: theme.text }}>+</button>
                          </div>
                          <span style={{ fontWeight: 'bold', color: '#FF6A00', fontSize: '12px' }}>{item.price * item.count} TL</span>
                        </div>
                      </div>
                    ))}
                    <div style={{ background: theme.card, padding: '12px', borderRadius: '12px', margin: '12px 0', display: 'flex', gap: '8px' }}>
                      <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder={t.couponPlaceholder} style={{ flex: 1, padding: '8px', border: `1px solid ${theme.border}`, borderRadius: '8px', fontSize: '12px', background: theme.bg, color: theme.text, outline: 'none' }} />
                      <button onClick={applyCoupon} style={{ padding: '8px 12px', background: '#FF6A00', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>{t.apply}</button>
                    </div>
                    <div style={{ background: theme.card, padding: '16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', color: theme.text }}>
                        <span>{t.total}:</span>
                        <span style={{ color: '#FF6A00' }}>{finalPrice.toFixed(2)} TL</span>
                      </div>
                      <button onClick={() => setIsCheckout(true)} style={{ width: '100%', padding: '12px', background: '#FF6A00', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>{t.completeOrder}</button>
                    </div>
                  </>
                )}
              </div>
            )}

            {tab === 'favorites' && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px', color: theme.text }}>{t.favoritesTitle} ({favorites.length})</h3>
                {favorites.length === 0 ? (
                  <p style={{ color: theme.subText, textAlign: 'center', marginTop: '40px' }}>{t.emptyFav}</p>
                ) : (
                  products.filter(p => favorites.includes(p.id)).map(item => (
                    <div key={item.id} onClick={() => setSelectedProduct(item)} style={{ background: theme.card, padding: '12px', borderRadius: '12px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: theme.text }}>
                      <span>{item.icon} {item.title}</span>
                      <span style={{ fontWeight: 'bold', color: '#FF6A00' }}>{item.price} TL</span>
                    </div>
                  ))
                )}
              </div>
            )}

            {tab === 'notifications' && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px', color: theme.text }}>{t.notificationsTitle}</h3>
                {notifications.length === 0 ? (
                  <p style={{ color: theme.subText, textAlign: 'center', marginTop: '40px' }}>{t.emptyNotif}</p>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} onClick={() => markNotificationAsRead(n.id)} style={{ background: theme.card, padding: '14px', borderRadius: '14px', marginBottom: '10px', borderLeft: n.read ? `4px solid ${theme.border}` : '4px solid #FF6A00', color: theme.text, cursor: 'pointer', opacity: n.read ? 0.7 : 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
                        <span>{n.title} {!n.read && '🔴'}</span>
                        <span style={{ fontSize: '10px', color: theme.subText }}>{n.date}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '12px', color: theme.subText }}>{n.desc}</p>
                    </div>
                  ))
                )}
              </div>
            )}

            {tab === 'profile' && (
              <div>
                <div style={{ background: theme.card, padding: '24px', borderRadius: '20px', textAlign: 'center', marginBottom: '16px', color: theme.text }}>
                  <h3 style={{ margin: '0 0 4px 0' }}>Hasan Ayaz</h3>
                  <p style={{ color: theme.subText, fontSize: '13px', margin: 0 }}>hasanayaz@gmail.com</p>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px', color: theme.text }}>{t.ordersTitle} ({orders.length})</h3>
                {orders.length === 0 ? (
                  <p style={{ color: theme.subText, textAlign: 'center', marginTop: '20px' }}>{t.noOrders}</p>
                ) : (
                  orders.map(o => (
                    <div key={o.id} style={{ background: theme.card, padding: '16px', borderRadius: '16px', marginBottom: '10px', fontSize: '12px', color: theme.text, display: 'flex', flexDirection: 'column', gap: '8px', border: `1px solid ${theme.border}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                        <span>Tarih: {o.date}</span>
                        <span style={{ color: '#FF6A00' }}>{o.total} TL</span>
                      </div>
                      <div style={{ fontSize: '11px', color: theme.subText }}>Ödeme: {o.payment || 'Kredi Kartı'}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#4caf50', fontWeight: 'bold' }}>Durum: {o.status}</span>
                        <button onClick={() => setActiveTrackingOrder(o)} style={{ background: '#FF6A00', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>
                          {t.trackLive}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
      {activeTrackingOrder && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: theme.card, width: '100%', maxWidth: '380px', borderRadius: '24px', padding: '20px', color: theme.text, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900' }}>🛵 Canlı Kurye Takibi</h3>
              <button onClick={() => setActiveTrackingOrder(null)} style={{ background: 'none', border: 'none', color: theme.text, fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>✕</button>
            </div>
            
            <div style={{ width: '100%', height: '160px', backgroundColor: darkMode ? '#0f0f0f' : '#e5e7eb', borderRadius: '16px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${theme.border}` }}>
              <div style={{ position: 'absolute', width: '80%', height: '4px', backgroundColor: '#FF6A00', borderRadius: '2px', opacity: 0.6 }}></div>
              <span style={{ position: 'absolute', left: '20px', fontSize: '20px' }}>🏪</span>
              <span style={{ position: 'absolute', right: '20px', fontSize: '20px' }}>🏠</span>
              <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ backgroundColor: '#FF6A00', color: '#fff', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', boxShadow: '0 4px 10px rgba(255,106,0,0.5)' }}>🛵</div>
                <span style={{ backgroundColor: '#111', color: '#fff', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '6px', marginTop: '4px' }}>Ahmet Y. (6 Dk)</span>
              </div>
            </div>

            <div style={{ background: darkMode ? '#252525' : '#f8f9fa', padding: '12px', borderRadius: '12px', fontSize: '12px' }}>
              <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>Sipariş No: #{activeTrackingOrder.id.toString().slice(-4)}</p>
              <p style={{ margin: 0, color: theme.subText }}>Kuryeniz teslimat adresinize doğru güvenle ilerliyor.</p>
            </div>

            <button onClick={() => setActiveTrackingOrder(null)} style={{ width: '100%', padding: '12px', backgroundColor: '#FF6A00', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
              Tamam
            </button>
          </div>
        </div>
      )}

      {userRole === 'customer' && (
        <div style={{ position: 'fixed', bottom: '80px', right: '16px', zIndex: 1000 }}>
          {!isChatOpen ? (
            <button onClick={() => setIsChatOpen(true)} style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FF6A00', color: '#fff', border: 'none', fontSize: '22px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>💬</button>
          ) : (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setIsChatOpen(false)} style={{ position: 'absolute', top: '8px', right: '10px', background: 'none', border: 'none', color: '#fff', fontSize: '14px', cursor: 'pointer', zIndex: 10 }}>✕</button>
              <SupportChat lang={lang} darkMode={darkMode} theme={theme} />
            </div>
          )}
        </div>
      )}

      {userRole === 'customer' && (
        <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: theme.card, borderTop: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-around', padding: '10px 0', zIndex: 100 }}>
          <button onClick={() => { setTab('home'); setSelectedProduct(null); setIsCheckout(false); }} style={{ background: 'none', border: 'none', fontWeight: 'bold', fontSize: '11px', color: tab === 'home' && !selectedProduct && !isCheckout ? '#FF6A00' : theme.subText, cursor: 'pointer' }}>🏠 Ana Sayfa</button>
          <button onClick={() => { setTab('categories'); setSelectedProduct(null); setIsCheckout(false); }} style={{ background: 'none', border: 'none', fontWeight: 'bold', fontSize: '11px', color: tab === 'categories' && !selectedProduct && !isCheckout ? '#FF6A00' : theme.subText, cursor: 'pointer' }}>📂 Kategoriler</button>
          <button onClick={() => { setTab('cart'); setSelectedProduct(null); setIsCheckout(false); }} style={{ background: 'none', border: 'none', fontWeight: 'bold', fontSize: '11px', color: tab === 'cart' && !selectedProduct && !isCheckout ? '#FF6A00' : theme.subText, cursor: 'pointer' }}>🛒 Sepet ({totalCount})</button>
          <button onClick={() => { setTab('favorites'); setSelectedProduct(null); setIsCheckout(false); }} style={{ background: 'none', border: 'none', fontWeight: 'bold', fontSize: '11px', color: tab === 'favorites' && !selectedProduct && !isCheckout ? '#FF6A00' : theme.subText, cursor: 'pointer' }}>❤️ Favori ({favorites.length})</button>
          <button onClick={() => { setTab('profile'); setSelectedProduct(null); setIsCheckout(false); }} style={{ background: 'none', border: 'none', fontWeight: 'bold', fontSize: '11px', color: tab === 'profile' && !selectedProduct && !isCheckout ? '#FF6A00' : theme.subText, cursor: 'pointer' }}>👤 Hesabım</button>
        </nav>
      )}
    </main>
  );
}
