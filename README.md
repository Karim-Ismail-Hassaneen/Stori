# Stori - Tech Products E-commerce

A modern, responsive e-commerce store built with React, Redux Toolkit, and Styled Components. Stori specializes in tech products including laptops, phones, accessories, and gadgets.

## 🚀 Features

- **Modern UI/UX**: Clean, minimal design with blue (#007BFF) and silver (#C0C0C0) brand colors
- **Product Catalog**: Browse products by category with filtering
- **Product Details**: Detailed product pages with images, specs, and descriptions
- **Shopping Cart**: Add, remove, and update quantities with persistent storage
- **Checkout**: Complete checkout flow with form validation
- **Responsive Design**: Fully responsive across all device sizes
- **Smooth Animations**: Enhanced UX with Framer Motion animations
- **Loading States**: Skeleton loaders for better perceived performance

## 🛠️ Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client
- **Framer Motion** - Animation library
- **FakeStoreAPI** - Product data API

## 📁 Project Structure

```
src/
  components/       # Reusable UI components
    - Navbar.jsx
    - ProductCard.jsx
    - Counter.jsx
    - LoadingSkeleton.jsx
  pages/            # Page components
    - Home.jsx
    - Products.jsx
    - ProductDetails.jsx
    - Cart.jsx
    - Checkout.jsx
  store/            # Redux store configuration
    - index.js
    - cartSlice.js
  styles/           # Theme and global styles
    - theme.js
    - GlobalStyles.js
  utils/            # Utility functions
    - api.js
  assets/           # Static assets
  hooks/            # Custom React hooks
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Stori
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎨 Brand Colors

- **Primary Blue**: #007BFF
- **Secondary Silver**: #C0C0C0

## 📱 Pages

- **Home** (`/`) - Hero section, categories, and featured products
- **Products** (`/products`) - Product listing with category filters
- **Product Details** (`/products/:id`) - Individual product information
- **Cart** (`/cart`) - Shopping cart with quantity controls
- **Checkout** (`/checkout`) - Checkout form with validation

## 🔧 Key Features Implementation

### Redux Store
- Cart state management with localStorage persistence
- Actions: addToCart, removeFromCart, updateQuantity, clearCart
- Selectors: selectCartItems, selectCartTotal, selectCartItemsCount

### API Integration
- Uses FakeStoreAPI for product data
- Functions: getProducts, getProduct, getProductsByCategory, getCategories

### Responsive Design
- Mobile-first approach
- Breakpoints: mobile (480px), tablet (768px), desktop (1024px), wide (1200px)

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Build Configuration

The project is configured for Vercel deployment. The build command is:
```bash
npm run build
```

Output directory: `dist`

## 📸 Screenshots

_Add screenshots of your application here_

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ for modern e-commerce experiences.

---

**Note**: This project uses FakeStoreAPI for demonstration purposes. In a production environment, you would connect to your own backend API.

