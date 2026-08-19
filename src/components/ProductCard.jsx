import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';

export default function ProductCard({ product }) {
  const { id, name, category, price, images, available, newArrival, featured } = product;
  const primaryImage = (images && images.length > 0 && images[0]) ? images[0] : FALLBACK_IMAGE;

  // Format currency
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_IMAGE;
  };

  return (
    <div className="group relative bg-white border border-stone-200/60 overflow-hidden flex flex-col h-full rounded-sm hover:shadow-lg hover:shadow-stone-200/50 hover:border-brand-200 transition-all duration-500 ease-out">
      {/* Product Image Container */}
      <div className="aspect-[3/4] overflow-hidden bg-stone-100 relative">
        <img
          src={primaryImage}
          alt={name}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-1 z-10 pointer-events-none">
          {!available && (
            <span className="px-2.5 py-1 text-[8px] sm:text-[9px] uppercase font-bold tracking-widest bg-stone-900/90 text-white rounded-xs">
              Sold Out
            </span>
          )}
          {available && newArrival && (
            <span className="px-2.5 py-1 text-[8px] sm:text-[9px] uppercase font-bold tracking-widest bg-brand-650 text-white rounded-xs shadow-sm">
              New In
            </span>
          )}
          {available && featured && !newArrival && (
            <span className="px-2.5 py-1 text-[8px] sm:text-[9px] uppercase font-bold tracking-widest bg-stone-900 text-white border border-stone-700 rounded-xs shadow-sm">
              Bestseller
            </span>
          )}
        </div>

        {/* Quick View Overlay on Hover */}
        {available && (
          <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-3 sm:p-4">
            <Link 
              to={`/product/${id}`}
              className="w-full py-2.5 sm:py-3 bg-white text-stone-950 font-semibold text-[11px] sm:text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-brand-600 hover:text-white transition-luxury shadow-xl rounded-xs"
            >
              View Details
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3.5 sm:p-5 flex flex-col flex-grow bg-white border-t border-stone-100/40">
        <span className="text-[9px] sm:text-[10px] text-stone-400 uppercase tracking-widest font-semibold mb-1 block">
          {category}
        </span>
        <h3 className="font-serif text-sm sm:text-base text-stone-900 font-medium group-hover:text-brand-700 transition-colors mb-2 line-clamp-1">
          <Link to={`/product/${id}`}>
            {name}
          </Link>
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-sm sm:text-base font-semibold text-stone-950 font-sans tracking-wide">
            {formattedPrice}
            {category === 'Fabric Section' && (
              <span className="text-[10px] font-normal text-stone-500 ml-1">/ meter</span>
            )}
          </p>
          <Link 
            to={`/product/${id}`} 
            className="text-[10px] uppercase tracking-wider font-semibold text-brand-600 sm:hidden"
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}
