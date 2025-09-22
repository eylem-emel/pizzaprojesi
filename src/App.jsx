import { useState } from 'react';
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

  const addToCart = (pizza) => {
    setCart([...cart, { ...pizza, id: Date.now() }]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleOrderSubmit = (orderData) => {
    console.log('Sipariş Verildi:', orderData);
    setCurrentPage('success');
    // Removed automatic redirect to home page
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
          <header className="header">
            <h1 className="logo">Teknolojik Yemekler</h1>
          </header>
          <div className="hero">
            <div className="hero-background" />
            <div className="hero-content">
              <h1>KOD ACIKTIRIR<br/>PİZZA, DOYURUR</h1>
              <button className="order-now-btn" onClick={handleOrderClick}>
                ACIKTIM
              </button>
            </div>
            <div className="pizza-bottom">
              <img src="/home/ana sayfa pizza.png" alt="Pizza" />
            </div>
          </div>
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
