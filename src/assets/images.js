// Centralized image imports from public folder
// Using public folder paths as Vite serves them from root

// Hero images
export const hero1 = '/hero/hero-1.png';

// placeholder URLs from Unsplash - replace with local images in public/categories/
export const electronicsCategory = 'https://plus.unsplash.com/premium_photo-1671439429636-6d8d66247143?q=80&w=1157&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
export const jeweleryCategory = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&auto=format';
export const mensClothingCategory = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&auto=format';
export const womensClothingCategory = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&auto=format';


// Footer images
export const facebookIcon = '/footer/facebook.svg';
export const instagramIcon = '/footer/instagram.svg';
export const twitterIcon = '/footer/twitter.svg';

// Category mapping
export const categoryImageMap = {
  'electronics': electronicsCategory,
  'jewelery': jeweleryCategory,
  "men's clothing": mensClothingCategory,
  "women's clothing": womensClothingCategory,
};

// Product image mapping - maps product titles to images
// Helper function to get product image by title
export const getProductImage = (productTitle) => {
  if (!productTitle) return ipadPro11Inch;
  
  const titleLower = productTitle.toLowerCase();
  
  // Try to find exact match first
  for (const [key, image] of Object.entries(productImageMap)) {
    if (titleLower.includes(key)) {
      return image;
    }
  }
  
  // Fallback: try to match by category keywords
  if (titleLower.includes('ipad')) {
    return ipadPro11Inch;
  }
  if (titleLower.includes('macbook') || titleLower.includes('laptop')) {
    return macbookAir13Inch;
  }
  if (titleLower.includes('iphone') || titleLower.includes('phone')) {
    return iphone14Blue;
  }
  if (titleLower.includes('airpods')) {
    return airpodsPro2ndGen;
  }
  if (titleLower.includes('watch')) {
    return appleWatchSeries9;
  }
  
  // Default fallback
  return ipadPro11Inch;
};

// Helper function to get category image
export const getCategoryImage = (category) => {
  if (!category) return electronicsCategory;
  const categoryLower = category.toLowerCase();
  return categoryImageMap[categoryLower] || electronicsCategory;
};

