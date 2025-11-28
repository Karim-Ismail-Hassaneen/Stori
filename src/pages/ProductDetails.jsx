import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { getProduct } from '../utils/api';
import { addToCart } from '../store/cartSlice';
import Counter from '../components/Counter';
import { ProductDetailSkeleton } from '../components/LoadingSkeleton';
import './ProductDetails.css';

const colors = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Gray', value: '#808080' },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(colors[0].value);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity,
        })
      );
      // Navigate to cart after adding
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="product-details-container">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-container">
        <div>Product not found</div>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="product-details-content">
        <div className="product-details-image-section">
          <motion.img
            className="product-details-image"
            src={product.image}
            alt={product.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="product-details-info">
          <div className="product-details-category">{product.category}</div>
          <h1 className="product-details-title">{product.title}</h1>
          <div className="product-details-price">${product.price.toFixed(2)}</div>

          <div className="product-details-rating">
            <span>⭐ {product.rating?.rate || 'N/A'}</span>
            <span>({product.rating?.count || 0} reviews)</span>
          </div>

          <p className="product-details-description">{product.description}</p>

          <div className="product-details-color-options">
            <label className="product-details-color-label">Color</label>
            <div className="product-details-color-buttons">
              {colors.map((color) => (
                <button
                  key={color.name}
                  className={`product-details-color-button ${selectedColor === color.value ? 'selected' : ''}`}
                  style={{ background: color.value }}
                  onClick={() => setSelectedColor(color.value)}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="product-details-quantity-section">
            <label className="product-details-quantity-label">Quantity</label>
            <Counter
              initialValue={quantity}
              onValueChange={setQuantity}
              min={1}
              max={99}
            />
          </div>

          <button className="product-details-add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
