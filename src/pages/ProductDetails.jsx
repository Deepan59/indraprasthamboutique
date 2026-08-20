import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MessageSquare, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { productService } from '../data/productService';
import { shopConfig } from '../data/config';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProductDetails() {
      setLoading(true);
      try {
        const item = await productService.getProductById(id);
        if (!item) {
          // If product not found, we redirect or we handle it
          setProduct(null);
        } else {
          setProduct(item);
          setSelectedImage(item.images[0] || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80');
          
          // Pre-select first size and color if available
          if (item.sizes && item.sizes.length > 0) {
            setSelectedSize(item.sizes[0]);
          }
          if (item.colors && item.colors.length > 0) {
            setSelectedColor(item.colors[0]);
          }

          // Load related products
          const related = await productService.getRelatedProducts(item.category, item.id);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error('Error fetching product detail page:', err);
      } finally {
        setLoading(false);
      }
    }
    
    loadProductDetails();
    // Scroll to top when product ID changes
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-stone-500 font-light uppercase tracking-widest text-xs">Loading Product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-20 max-w-md mx-auto px-4 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <AlertCircle className="w-16 h-16 text-stone-300 mb-4" />
        <h2 className="font-serif text-3xl text-stone-900 font-medium mb-3">Product Not Found</h2>
        <p className="text-stone-500 font-light text-sm mb-8 leading-relaxed">
          The product you are looking for might have been removed, sold out, or is temporarily unavailable.
        </p>
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-brand-600 text-white text-xs font-semibold tracking-widest uppercase transition-luxury rounded-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collections
        </Link>
      </div>
    );
  }

  // Format currency
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(product.price);

  // WhatsApp prefilled link generator
  const getWhatsAppLink = () => {
    const text = `Hi Indraprastham Boutique,

I'm interested in:

Product: ${product.name}
Product ID: ${product.productCode}
Price: ${formattedPrice}
${selectedSize ? `Size: ${selectedSize}` : ''}
${selectedColor ? `Color Preference: ${selectedColor}` : ''}

Please confirm availability.`;

    const encodedText = encodeURIComponent(text);
    return `https://wa.me/${shopConfig.contact.whatsappNumber}?text=${encodedText}`;
  };

  return (
    <div className="pt-28 pb-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/collections"
            className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-950 font-medium text-xs uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Collections
          </Link>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 bg-white border border-stone-100 p-4 sm:p-8 rounded-sm shadow-xs">
          
          {/* 1. Image Gallery Column (LG: 7 cols) */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
            
            {/* Thumbnails list */}
            {product.images && product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-x-visible shrink-0 pb-2 md:pb-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-20 md:w-20 md:h-24 bg-stone-100 overflow-hidden shrink-0 border rounded-xs transition-all ${
                      selectedImage === img ? 'border-brand-600 ring-1 ring-brand-600' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} preview`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image display */}
            <div className="flex-grow aspect-[3/4] bg-stone-100 overflow-hidden relative order-1 md:order-2 rounded-sm border border-stone-100">
              <img
                src={selectedImage}
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
                }}
                className="w-full h-full object-cover"
              />
              
              {/* Sold out overlay */}
              {!product.available && (
                <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center">
                  <span className="px-4 py-2 bg-stone-950 text-white font-bold tracking-widest uppercase text-sm border border-stone-850 rounded-sm">
                    Out of stock
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 2. Product Info Column (LG: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-[11px] text-brand-600 uppercase tracking-widest font-semibold mb-2 block">
              {product.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-semibold mb-3">
              {product.name}
            </h1>
            
            {/* Code & Availability Status */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-light text-stone-500 mb-6">
              <span>Code: <strong className="font-medium text-stone-850">{product.productCode}</strong></span>
              <span className="text-stone-300">|</span>
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${product.available ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                {product.available ? 'Available' : 'Out of Stock / Ordering Delayed'}
              </span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-stone-900 mb-6 font-sans flex items-baseline">
              <span>{formattedPrice}</span>
              {product.category === 'Fabric Section' && (
                <span className="text-sm font-normal text-stone-500 ml-1.5">/ meter</span>
              )}
            </div>

            {/* Fabric Specifications */}
            {product.category === 'Fabric Section' && (
              <div className="mb-6 p-4 bg-stone-50 border border-stone-200/80 rounded-sm">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-850 mb-2">Fabric Details</h4>
                <div className="grid grid-cols-2 gap-4 text-xs font-light text-stone-600">
                  <div>
                    <span className="block text-stone-400 mb-0.5">Price</span>
                    <strong className="font-medium text-stone-850">₹150 / meter</strong>
                  </div>
                  <div>
                    <span className="block text-stone-400 mb-0.5">Available Stock</span>
                    <strong className="font-medium text-stone-850">20 mtr</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Divider */}
            <hr className="border-stone-100 mb-6" />

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-900 mb-2">Description</h3>
              <p className="text-stone-600 font-light text-sm leading-relaxed whitespace-pre-line">
                {product.description || 'No description available for this designer boutique selection.'}
              </p>
            </div>

            {/* Colors Selectors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-900 mb-2.5">Available Colors</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => {
                    const isHex = color.startsWith('#');
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                          selectedColor === color 
                            ? 'border-brand-600 ring-2 ring-brand-100 scale-105' 
                            : 'border-stone-300 hover:scale-105'
                        }`}
                        title={color}
                        style={isHex ? { backgroundColor: color } : {}}
                      >
                        {selectedColor === color && (
                          <Check className={`w-4 h-4 ${isHex && color.toLowerCase() !== '#ffffff' ? 'text-white' : 'text-stone-800'}`} />
                        )}
                        {!isHex && <span className="text-[10px] uppercase font-bold">{color.substring(0, 2)}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sizes Selectors (Conditional) */}
            {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'Free Size' && (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-900 mb-2.5">Select Size</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-10 h-10 px-3 border text-xs font-semibold uppercase tracking-wider transition-all rounded-sm ${
                        selectedSize === size
                          ? 'border-brand-600 bg-brand-50 text-brand-700'
                          : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* WhatsApp Ordering CTA button */}
            <div className="mt-auto pt-6">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2.5 transition-luxury rounded-sm ${
                  product.available
                    ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-md'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed pointer-events-none'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Order on WhatsApp
              </a>
              <p className="text-center text-[10px] text-stone-500 font-light mt-3">
                Orders are fulfilled directly by our shop manager through WhatsApp conversation.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-stone-200 pt-16">
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium mb-8">
              Related Collections
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
