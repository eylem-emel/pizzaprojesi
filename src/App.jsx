import { useState } from 'react';
import axios from 'axios';
import './App.css';
import OrderPage from './OrderPage.jsx';

const pizzaData = [
  {
    name: 'Margherita',
    ingredients: 'Domates sos, mozzarella, fesleğen',
    price: 85,
    photoName: '/home/ana sayfa pizza.png',
    soldOut: false,
  },
  {
    name: 'Tavuklu Barbekü',
    ingredients: 'Barbekü sos, tavuk, mısır, soğan, kaşar',
    price: 95,
    photoName: '/home/ana sayfa pizza.png',
    soldOut: false,
  },
  {
    name: 'Vejetaryen',
    ingredients: 'Domates sos, biber, mantar, mısır, zeytin, kaşar',
    price: 90,
    photoName: '/home/ana sayfa pizza.png',
    soldOut: false,
  },
  {
    name: 'Karışık Pizza',
    ingredients: 'Sucuk, salam, sosis, biber, mantar, zeytin, kaşar',
    price: 100,
    photoName: '/home/ana sayfa pizza.png',
    soldOut: false,
  },
  {
    name: 'Sucuklu',
    ingredients: 'Domates sos, sucuk, kaşar',
    price: 85,
    photoName: '/home/ana sayfa pizza.png',
    soldOut: false,
  },
  {
    name: 'Tavuklu Mantar',
    ingredients: 'Tavuk, mantar, mısır, kaşar, domates sos',
    price: 95,
    photoName: '/home/ana sayfa pizza.png',
    soldOut: false,
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'menu' or 'order' or 'success'
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToCart = (pizza) => {
    setCart([...cart, { ...pizza, id: Date.now() }]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleOrderSubmit = async (orderData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: `Pizza Siparişi - ${orderData.pizza}`,
        body: JSON.stringify(orderData),
        userId: 1
      });

      setOrderData({ ...orderData, serverResponse: response.data });
      setCurrentPage('success');
    } catch (err) {
      setError('İnternete bağlanılamadı. Lütfen bağlantınızı kontrol edin.');
      console.error('Sipariş gönderilirken hata:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderClick = () => {
    setCurrentPage('order');
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setCurrentPage('success');
    setCart([]);
    // Return to home after 2 seconds
    setTimeout(() => {
      setCurrentPage('home');
    }, 2000);
  };

  return (
    <div className="app">
      {currentPage === 'home' && (
        <div className="home-page">
          {/* HEADER */}
          <header className="header">
            <div className="header-top">
              <h1 className="logo">Teknolojik Yemekler</h1>
              <div className="header-slogan">
                <p className="slogan-small">fırsatı kaçırma</p>
                <h2 className="slogan-main">KOD ACIKTIRIR, PIZZA, DOYURUR</h2>
                <button className="order-now-btn" onClick={handleOrderClick}>
                  ACIKTIM
                </button>
              </div>
            </div>
          </header>

          {/* NAVIGATION */}
          <nav className="navigation">
            <div className="nav-item">
              <span className="nav-icon">🏮</span>
              <span className="nav-text">YENİ Kore</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">🍕</span>
              <span className="nav-text">Pizza</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">🍔</span>
              <span className="nav-text">Burger</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">🍟</span>
              <span className="nav-text">Kızartmalar</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">🍗</span>
              <span className="nav-text">Fast food</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">🥤</span>
              <span className="nav-text">Gazlı içecek</span>
            </div>
          </nav>

          {/* MAIN CONTENT */}
          <main className="main-content">
            {/* Kampanya Kutuları */}
            <section className="campaign-section">
              {/* Sol Büyük Kart */}
              <div className="campaign-card large">
                <div className="campaign-image">
                  <img src="/iterasyon2/cta/kart-1.png" alt="Özel Lezzetus" />
                </div>
                <div className="campaign-overlay">
                  <div className="campaign-content">
                    <h3>Özel Lezzetus</h3>
                    <p>Position Absolute Ac Burger</p>
                    <button className="campaign-btn">SİPARİŞ VER</button>
                  </div>
                </div>
              </div>

              {/* Sağ İki Kart */}
              <div className="campaign-right">
                <div className="campaign-card small">
                  <div className="campaign-image">
                    <img src="/iterasyon2/cta/kart-2.png" alt="Burger Menu" />
                  </div>
                  <div className="campaign-overlay">
                    <div className="campaign-content">
                      <h3>Hackathlon Burger Menü</h3>
                      <button className="campaign-btn">SİPARİŞ VER</button>
                    </div>
                  </div>
                </div>

                <div className="campaign-card small">
                  <div className="campaign-image">
                    <img src="/iterasyon2/cta/kart-3.png" alt="Courier" />
                  </div>
                  <div className="campaign-overlay">
                    <div className="campaign-content">
                      <p>Cooooook hızlı, npm gibi kurye</p>
                      <button className="campaign-btn">SİPARİŞ VER</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Popüler Menü */}
            <section className="popular-menu">
              <div className="popular-header">
                <h2>en çok paketlenen menüler</h2>
                <p className="popular-subtitle">Acıktıran Kodlara Doyuran Lezzetler</p>
              </div>

              <div className="category-filters">
                <button className="category-btn">
                  <img src="/iterasyon2/icons/1.svg" alt="Ramen" className="category-icon" />
                  Ramen
                </button>
                <button className="category-btn active">
                  <img src="/iterasyon2/icons/2.svg" alt="Pizza" className="category-icon" />
                  Pizza
                </button>
                <button className="category-btn">
                  <img src="/iterasyon2/icons/3.svg" alt="Burger" className="category-icon" />
                  Burger
                </button>
                <button className="category-btn">
                  <img src="/iterasyon2/icons/4.svg" alt="French fries" className="category-icon" />
                  French fries
                </button>
                <button className="category-btn">
                  <img src="/iterasyon2/icons/5.svg" alt="Fast food" className="category-icon" />
                  Fast food
                </button>
                <button className="category-btn">
                  <img src="/iterasyon2/icons/6.svg" alt="Soft drinks" className="category-icon" />
                  Soft drinks
                </button>
              </div>

              <div className="menu-grid">
                <div className="menu-item">
                  <img src="/home/ana sayfa pizza.png" alt="Terminal Pizza" />
                  <h4>Terminal Pizza</h4>
                  <div className="rating">
                    <span>★ 4.9</span>
                    <span>(2200)</span>
                  </div>
                  <span className="price">60₺</span>
                </div>

                <div className="menu-item">
                  <img src="/home/ana sayfa pizza.png" alt="Position Absolute Ac Pizza" />
                  <h4>Position Absolute Ac Pizza</h4>
                  <div className="rating">
                    <span>★ 4.9</span>
                    <span>(2000)</span>
                  </div>
                  <span className="price">60₺</span>
                </div>

                <div className="menu-item">
                  <img src="/home/ana sayfa pizza.png" alt="useEffect Tavuklu Burger" />
                  <h4>useEffect Tavuklu Burger</h4>
                  <div className="rating">
                    <span>★ 4.9</span>
                    <span>(2000)</span>
                  </div>
                  <span className="price">60₺</span>
                </div>
              </div>
            </section>
          </main>

          {/* FOOTER */}
          <footer className="footer">
            <div className="footer-content">
              <div className="footer-section contact-info">
                <h3>Teknolojik Yemekler</h3>
                <p><img src="/iterasyon2/footer/icon/icon-1.png" alt="Location" className="contact-icon" />34 Londonderry Road, İstanbul Türkiye</p>
                <p><img src="/iterasyon2/footer/icon/icon-2.png" alt="Email" className="contact-icon" />aciktim@teknolojikyemekler.com</p>
                <p><img src="/iterasyon2/footer/icon/icon-3.png" alt="Phone" className="contact-icon" />+90 216 123 45 67</p>
              </div>

              <div className="footer-section hot-menu">
                <h4>Hot Menu</h4>
                <ul>
                  <li>Terminal Pizza</li>
                  <li>5 Kişilik Hackathlon Pizza</li>
                  <li>useEffect Tavuklu Pizza</li>
                  <li>Beyaz Console Frosty</li>
                  <li>Tester Geçti Mi Burger</li>
                  <li>Position Absolute Ac Burger</li>
                </ul>
              </div>

              <div className="footer-section instagram-feed">
                <h4>Instagram</h4>
                <div className="insta-grid">
                  <div className="insta-item">
                    <img src="/iterasyon2/footer/insta/li-0.png" alt="Instagram 1" />
                  </div>
                  <div className="insta-item">
                    <img src="/iterasyon2/footer/insta/li-1.png" alt="Instagram 2" />
                  </div>
                  <div className="insta-item">
                    <img src="/iterasyon2/footer/insta/li-2.png" alt="Instagram 3" />
                  </div>
                  <div className="insta-item">
                    <img src="/iterasyon2/footer/insta/li-3.png" alt="Instagram 4" />
                  </div>
                  <div className="insta-item">
                    <img src="/iterasyon2/footer/insta/li-4.png" alt="Instagram 5" />
                  </div>
                  <div className="insta-item">
                    <img src="/iterasyon2/footer/insta/li-5.png" alt="Instagram 6" />
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <p>© 2023 Teknolojik Yemekler.</p>
              <div className="social-icons">
                <a href="#" className="social-icon" aria-label="Twitter/X">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </footer>
        </div>
      )}

      {currentPage === 'menu' && (
        <div className="menu-container">
          <header className="menu-header">
            <h2>Teknolojik Yemekler</h2>
            <p className="menu-description">
              KOD ACIKTIRIR, PİZZA DOYURUR
            </p>
          </header>

          <div className="pizza-grid">
            {pizzaData.map((pizza, index) => (
              <div key={index} className={`pizza-card ${pizza.soldOut ? 'sold-out' : ''}`}>
                <img src={pizza.photoName} alt={pizza.name} className="pizza-image" />
                <div className="pizza-info">
                  <h3>{pizza.name}</h3>
                  <p>{pizza.ingredients}</p>
                  <div className="pizza-footer">
                    <span className="price">{pizza.price} ₺</span>
                    <button
                      className="add-to-cart"
                      onClick={() => {
                        setCurrentPage('order');
                      }}
                      disabled={pizza.soldOut}
                    >
                      {pizza.soldOut ? 'TÜKENDİ' : 'SEPETE EKLE'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentPage === 'order' && (
        <OrderPage onOrderSubmit={handleOrderSubmit} />
      )}

      {currentPage === 'success' && (
        <div className="success-page">
          <div className="success-container">
            <div className="success-logo">
              <h1 className="logo">Teknolojik Yemekler</h1>
            </div>
            <h3 className="success-title">TEBRİKLER</h3>
            <h3 className="success-title">SİPARİŞİNİZ ALINDI</h3>

            {orderData && (
              <div className="order-summary">
                <h4>Sipariş Özeti</h4>
                <div className="order-details">
                  <p><strong>Pizza:</strong> {orderData.pizza}</p>
                  <p><strong>Boyut:</strong> {orderData.size}</p>
                  <p><strong>Hamur:</strong> {orderData.dough}</p>
                  <p><strong>Adet:</strong> {orderData.quantity}</p>
                  <p><strong>Toplam:</strong> ₺{orderData.total}</p>
                  {orderData.extras && orderData.extras.length > 0 && (
                    <p><strong>Ek Malzemeler:</strong> {orderData.extras.join(', ')}</p>
                  )}
                  {orderData.note && (
                    <p><strong>Not:</strong> {orderData.note}</p>
                  )}
                </div>
              </div>
            )}

            <div className="success-actions">
              <button
                className="btn btn-primary"
                onClick={() => setCurrentPage('home')}
              >
                Ana Sayfaya Dön
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="error-overlay">
          <div className="error-container">
            <h2>⚠️ Hata</h2>
            <p>{error}</p>
            <button
              className="btn btn-secondary"
              onClick={() => setError(null)}
            >
              Tamam
            </button>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="modal-overlay">
          <div className="order-modal">
            <h2>SEPETİM</h2>
            
            {cart.length === 0 ? (
              <p className="empty-cart">Sepetiniz boş. Hemen menüden seçiminizi yapabilirsiniz.</p>
            ) : (
              <>
                <div className="order-items">
                  {cart.map((item, index) => (
                    <div key={index} className="order-item">
                      <span>{item.name}</span>
                      <span>{item.price} ₺</span>
                      <button onClick={() => removeFromCart(index)}>❌</button>
                    </div>
                  ))}
                </div>
                
                <div className="order-total">
                  <span>Toplam:</span>
                  <span>{totalPrice} ₺</span>
                </div>
                
                {!isOrderPlaced ? (
                  <form onSubmit={handleOrderSubmit} className="order-form">
                    <input
                      type="text"
                      placeholder="Ad Soyad"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Telefon Numarası"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Teslimat Adresi"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                    <button type="submit" className="order-btn">
                      SİPARİŞİ TAMAMLA {totalPrice} ₺
                    </button>
                  </form>
                ) : (
                  <div className="order-success">
                    <p>✅ Siparişiniz alındı!</p>
                    <p>Lezzetli pizzalarınız yolda!</p>
                  </div>
                )}
              </>
            )}
            
            <button className="close-modal" onClick={() => setIsCartOpen(false)}>
              ✖
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default App;
