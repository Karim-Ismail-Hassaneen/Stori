import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartTotal, clearCart } from '../store/cartSlice';
import Counter from '../components/Counter';
import './Checkout.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const [counterValue, setCounterValue] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }
    if (!formData.cardName.trim()) newErrors.cardName = 'Card name is required';
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Invalid format (MM/YY)';
    }
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate order processing
      dispatch(clearCart());
      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  if (items.length === 0 && !isSubmitted) {
    return (
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>
        <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
          <h2>Your cart is empty</h2>
          <p>Add items to your cart before checkout</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      {isSubmitted && (
        <div className="checkout-success-message">
          Order placed successfully! Redirecting to home...
        </div>
      )}
      <div className="checkout-content">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit}>
            <h2 className="checkout-section-title">Shipping Information</h2>
            <div className="checkout-row">
              <div className="checkout-form-group">
                <label className="checkout-label">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`checkout-input ${errors.firstName ? 'error' : ''}`}
                />
                {errors.firstName && (
                  <span className="checkout-error-message">{errors.firstName}</span>
                )}
              </div>
              <div className="checkout-form-group">
                <label className="checkout-label">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`checkout-input ${errors.lastName ? 'error' : ''}`}
                />
                {errors.lastName && (
                  <span className="checkout-error-message">{errors.lastName}</span>
                )}
              </div>
            </div>
            <div className="checkout-form-group">
              <label className="checkout-label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`checkout-input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && (
                <span className="checkout-error-message">{errors.email}</span>
              )}
            </div>
            <div className="checkout-form-group">
              <label className="checkout-label">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`checkout-input ${errors.phone ? 'error' : ''}`}
              />
              {errors.phone && (
                <span className="checkout-error-message">{errors.phone}</span>
              )}
            </div>
            <div className="checkout-form-group">
              <label className="checkout-label">Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`checkout-textarea ${errors.address ? 'error' : ''}`}
              />
              {errors.address && (
                <span className="checkout-error-message">{errors.address}</span>
              )}
            </div>
            <div className="checkout-row">
              <div className="checkout-form-group">
                <label className="checkout-label">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`checkout-input ${errors.city ? 'error' : ''}`}
                />
                {errors.city && (
                  <span className="checkout-error-message">{errors.city}</span>
                )}
              </div>
              <div className="checkout-form-group">
                <label className="checkout-label">Zip Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className={`checkout-input ${errors.zipCode ? 'error' : ''}`}
                />
                {errors.zipCode && (
                  <span className="checkout-error-message">{errors.zipCode}</span>
                )}
              </div>
            </div>
            <div className="checkout-form-group">
              <label className="checkout-label">Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`checkout-input ${errors.country ? 'error' : ''}`}
              />
              {errors.country && (
                <span className="checkout-error-message">{errors.country}</span>
              )}
            </div>

            <h2 className="checkout-section-title" style={{ marginTop: 'var(--spacing-xl)' }}>
              Payment Information
            </h2>
            <div className="checkout-form-group">
              <label className="checkout-label">Card Number *</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className={`checkout-input ${errors.cardNumber ? 'error' : ''}`}
              />
              {errors.cardNumber && (
                <span className="checkout-error-message">{errors.cardNumber}</span>
              )}
            </div>
            <div className="checkout-form-group">
              <label className="checkout-label">Cardholder Name *</label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                className={`checkout-input ${errors.cardName ? 'error' : ''}`}
              />
              {errors.cardName && (
                <span className="checkout-error-message">{errors.cardName}</span>
              )}
            </div>
            <div className="checkout-row">
              <div className="checkout-form-group">
                <label className="checkout-label">Expiry Date *</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  className={`checkout-input ${errors.expiryDate ? 'error' : ''}`}
                />
                {errors.expiryDate && (
                  <span className="checkout-error-message">{errors.expiryDate}</span>
                )}
              </div>
              <div className="checkout-form-group">
                <label className="checkout-label">CVV *</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength="4"
                  className={`checkout-input ${errors.cvv ? 'error' : ''}`}
                />
                {errors.cvv && (
                  <span className="checkout-error-message">{errors.cvv}</span>
                )}
              </div>
            </div>

            <div className="checkout-counter-section">
              <label className="checkout-counter-label">Quantity Counter (Demo)</label>
              <Counter
                initialValue={counterValue}
                onValueChange={setCounterValue}
                min={1}
                max={99}
              />
            </div>

            <button type="submit" className="checkout-submit-button" disabled={isSubmitted}>
              {isSubmitted ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h2 className="checkout-summary-title">Order Summary</h2>
          {items.map((item) => (
            <div key={item.id} className="checkout-summary-item">
              <span>
                {item.title} x{item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="checkout-summary-item">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="checkout-summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
