import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      className="product-card"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/products/${product.id}`}>
        <div className="product-card-image-container">
          <img
            className="product-card-image"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="product-card-content">
          <h3 className="product-card-title">{product.title}</h3>
          <div className="product-card-price">${product.price.toFixed(2)}</div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
