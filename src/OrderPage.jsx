// src/OrderPage.jsx
import { useState } from 'react';
import { pizzaData } from './mockData';
import './OrderPage.css';

const OrderPage = ({ onOrderSubmit }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDough, setSelectedDough] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  const calculateTotal = () => {
    const basePrice = selectedSize
      ? pizzaData.price + (selectedSize.price || 0)
      : pizzaData.price;
    const extrasTotal = selectedExtras.length * 5;
    return (basePrice + extrasTotal) * quantity;
  };

  const handleExtraChange = (extraId) => {
    setSelectedExtras(prev =>
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      pizza: pizzaData.name,
      size: selectedSize?.name,
      dough: selectedDough?.name,
      extras: pizzaData.extras
        .filter(extra => selectedExtras.includes(extra.id))
        .map(extra => extra.name),
      quantity,
      note,
      total: calculateTotal()
    };
    console.log('Sipariş Verildi:', order);
    onOrderSubmit(order);
  };

  return (
    <div className="order-page">
      <header className="order-header">
        <h1 className="logo">Teknolojik Yemekler</h1>
      </header>
      <div className="order-container">
        <div className="pizza-info">
          <h1>{pizzaData.name}</h1>
          <div className="rating">
            <span>★ {pizzaData.rating}</span>
            <span>({pizzaData.commentCount})</span>
          </div>
          <p className="description">{pizzaData.description}</p>
          <div className="price">₺{pizzaData.price}</div>
        </div>

        <div className="order-form-container">
          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-section">
              <h2>Boyut Seç <span className="required">*</span></h2>
              <div className="size-options">
                {pizzaData.sizeOptions.map(size => (
                  <label key={size.id} className="option-label">
                    <input
                      type="radio"
                      name="size"
                      checked={selectedSize?.id === size.id}
                      onChange={() => setSelectedSize(size)}
                      required
                    />
                    <span className="size-name">{size.name}</span>
                    {size.price > 0 && <span className="size-price">+₺{size.price}</span>}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h2>Hamur Seç <span className="required">*</span></h2>
              <select
                value={selectedDough?.id || ''}
                onChange={(e) => {
                  const dough = pizzaData.doughOptions.find(d => d.id === Number(e.target.value));
                  setSelectedDough(dough);
                }}
                required
                className="dough-select"
              >
                <option value="">Hamur Seçiniz</option>
                {pizzaData.doughOptions.map(dough => (
                  <option key={dough.id} value={dough.id}>
                    {dough.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-section">
              <h2>Ek Malzemeler</h2>
              <p className="extras-info">En fazla 10 malzeme seçebilirsiniz.</p>
              <div className="extras-grid">
                {pizzaData.extras.map(extra => (
                  <label key={extra.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedExtras.includes(extra.id)}
                      onChange={() => handleExtraChange(extra.id)}
                      disabled={selectedExtras.length >= 10 && !selectedExtras.includes(extra.id)}
                    />
                    <span className="extra-name">{extra.name}</span>
                    <span className="extra-price">+₺5</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h2>Sipariş Notu</h2>
              <textarea
                placeholder="Siparişinizle ilgili notunuzu yazabilirsiniz..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="note-input"
              />
            </div>

            <div className="order-summary">
              <div className="quantity-selector">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>

              <div className="price-summary">
                <div className="total-price">₺{calculateTotal().toFixed(2)}</div>
                <button type="submit" className="order-button">
                  SİPARİŞ VER
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
