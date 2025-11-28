import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../utils/api';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/LoadingSkeleton';
import './Products.css';

const categories = ['all', 'electronics', 'jewelery', "men's clothing", "women's clothing"];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let data;
        if (selectedCategory === 'all') {
          data = await getProducts();
        } else {
          data = await getProductsByCategory(selectedCategory);
        }
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h1 className="products-title">All Products</h1>
        <div className="products-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`products-filter-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="products-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="products-empty-state">
          <h2>No products found</h2>
          <p>Try selecting a different category</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
