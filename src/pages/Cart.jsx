import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { removeFromCart, updateQuantity, selectCartItems, selectCartTotal } from '../store/cartSlice';
import Counter from '../components/Counter';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>
        <div className="cart-empty">
          <h2 className="cart-empty-title">Your cart is empty</h2>
          <p>Start shopping to add items to your cart</p>
          <Link to="/products" className="cart-shop-button">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                className="cart-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <img className="cart-item-image" src={item.image} alt={item.title} />
                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <div className="cart-item-price">${item.price.toFixed(2)}</div>
                </div>
                <div className="cart-item-actions">
                  <Counter
                    initialValue={item.quantity}
                    onValueChange={(newQuantity) =>
                      handleQuantityChange(item.id, newQuantity)
                    }
                    min={1}
                    max={99}
                  />
                  <button className="cart-remove-button" onClick={() => handleRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="cart-summary">
          <h2 className="cart-summary-title">Order Summary</h2>
          <div className="cart-summary-row">
            <span>Items ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="cart-summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="cart-checkout-button">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
