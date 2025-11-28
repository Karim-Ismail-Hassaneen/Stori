import './LoadingSkeleton.css';

export const ProductCardSkeleton = () => (
  <div>
    <div className="skeleton-base skeleton-image skeleton-product-card" />
    <div className="skeleton-base skeleton-text skeleton-product-text-1" />
    <div className="skeleton-base skeleton-text skeleton-product-text-2" />
    <div className="skeleton-base skeleton-text skeleton-product-text-3" />
  </div>
);

export const ProductDetailSkeleton = () => (
  <div>
    <div className="skeleton-base skeleton-image skeleton-detail-image" />
    <div className="skeleton-base skeleton-text skeleton-detail-title" />
    <div className="skeleton-base skeleton-text skeleton-detail-price" />
    <div className="skeleton-base skeleton-text skeleton-detail-text" />
    <div className="skeleton-base skeleton-text skeleton-detail-text" />
    <div className="skeleton-base skeleton-text skeleton-detail-text-80" />
  </div>
);

export default ProductCardSkeleton;
