import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/LoadingSkeleton';
import { hero1, getCategoryImage } from '../assets/images';
import './Home.css';

const categories = [
  { name: 'electronics', label: 'Electronics' },
  { name: 'jewelery', label: 'Jewelry' },
  { name: "men's clothing", label: "Men's Clothing" },
  { name: "women's clothing", label: "Women's Clothing" },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        // Get first 6 products as featured
        setFeaturedProducts(products.slice(0, 6));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <section className="home-hero" style={{ backgroundImage: `url(${hero1})` }}>
        <motion.div
          className="home-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="home-hero-title">Welcome to Stori</h1>
          <p className="home-hero-subtitle">Your one-stop destination for the latest technology products. Discover premium electronics, gadgets, and accessories that enhance your digital lifestyle. Shop with confidence and experience the future of shopping.</p>
        </motion.div>
      </section>

      <section className="home-section">
        <h2 className="home-section-title">Shop by Category</h2>
        <div className="home-categories-grid">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={`/products?category=${category.name}`}
                className="home-category-card"
                style={{ 
                  color: 'inherit', 
                  textDecoration: 'none', 
                  display: 'block' 
                }}
              >
                <div 
                  className="home-category-image"
                  style={{ 
                    backgroundImage: `url(${getCategoryImage(category.name)})`
                  }}
                ></div>
                <button className="home-category-button">{category.label}</button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-section-title">Featured Products</h2>
        <div className="home-products-grid">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
