import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Truck, Heart, MessageSquare, MapPin, Clock, Phone, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { productService } from '../data/productService';
import { shopConfig } from '../data/config';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const allProducts = await productService.getProducts();
        
        // Filter featured and new arrivals
        const featured = allProducts.filter(p => p.featured && p.available).slice(0, 4);
        const arrivals = allProducts.filter(p => p.newArrival && p.available).slice(0, 4);
        
        setFeaturedProducts(featured);
        setNewArrivals(arrivals);
      } catch (err) {
        console.error('Failed to load home products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="bg-brand-50 overflow-x-hidden">
      
      {/* 1. HERO SECTION WITH ATTRACTIVE BACKGROUND IMAGE */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Full-width High-Res Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1920&q=80"
            alt="Indraprastham Boutique Hero Background"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
          {/* Dark Overlay Gradient for maximum text readability & contrast */}
          <div className="absolute inset-0 bg-hero-overlay"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & Action Buttons (7 cols) */}
            <div className="lg:col-span-7 space-y-8 animate-slide-up text-white">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-300/30 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-brand-300 animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-200">
                    Madurai's Premier Boutique
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-6xl lg:text-7xl font-light tracking-wide leading-[1.1] text-white">
                  Beautiful & Elegant <br />
                  <span className="italic font-serif text-brand-300 font-normal">Women's Fashion</span> <br />
                  For Every Occasion
                </h1>

                <p className="text-stone-200 text-sm sm:text-base font-light tracking-wide max-w-lg leading-relaxed pt-2">
                  Discover our handpicked collection of soft cotton sarees, trendy kurti sets, comfy nightwear, and modern tops. Quality fabrics crafted with care.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to="/collections"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-stone-950 font-bold text-xs tracking-widest uppercase transition-luxury rounded-sm shadow-xl hover:shadow-brand-500/30"
                >
                  Shop Our Collection
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/${shopConfig.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-xs tracking-widest uppercase transition-luxury rounded-sm backdrop-blur-md"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  WhatsApp Enquiry
                </a>
              </div>

              {/* Feature Highlights */}
              <div className="pt-6 border-t border-white/15 grid grid-cols-2 gap-4 text-xs font-medium tracking-wide text-brand-100 uppercase">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-300 shrink-0" />
                  <span>100% Quality Fabric</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-300 shrink-0" />
                  <span>Direct WhatsApp Ordering</span>
                </div>
              </div>
            </div>

            {/* Right Column: Glassmorphic Preview Feature Card (5 cols) */}
            <div className="lg:col-span-5 relative flex justify-center z-10 hidden sm:flex">
              <div className="glass-card-dark p-4 sm:p-6 rounded-md shadow-2xl max-w-[380px] w-full transform hover:scale-[1.02] transition-luxury">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xs bg-stone-900 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
                    alt="Latest Collection Saree"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-brand-300/40">
                    <span className="text-[10px] font-bold text-brand-300 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      In Stock Now
                    </span>
                  </div>
                </div>
                <div className="text-white space-y-1">
                  <h3 className="font-serif text-xl font-medium text-brand-100">Handloom Silk & Cotton Sarees</h3>
                  <p className="text-xs text-stone-300 font-light">Soft draping, vibrant borders, ready to ship.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CATEGORY SPOTLIGHT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs text-brand-600 uppercase tracking-[0.25em] font-bold block mb-2">
              Explore Categories
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-stone-900 font-medium tracking-wide">
              Shop by Category
            </h2>
            <p className="text-stone-500 font-light text-sm max-w-md mx-auto mt-2">
              Find the perfect outfit for every occasion, from traditional sarees to comfy nightwear.
            </p>
            <div className="w-12 h-[2px] bg-brand-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-6">
            {shopConfig.categories.map((category) => (
              <Link
                key={category.name}
                to={`/collections?category=${category.name}`}
                className="group relative flex flex-col items-center overflow-hidden rounded-sm bg-brand-50 border border-brand-200/60 p-2.5 sm:p-3 hover:shadow-xl hover:border-brand-400 transition-all duration-500"
              >
                {/* Image Wrap */}
                <div className="aspect-[4/5] w-full overflow-hidden bg-stone-150 mb-2.5 sm:mb-3.5 relative rounded-xs">
                  <img
                    src={category.image}
                    alt={category.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-stone-950/10 group-hover:bg-brand-950/20 transition-colors duration-500"></div>
                </div>
                <h3 className="font-serif text-base sm:text-xl font-medium text-stone-900 group-hover:text-brand-700 transition-colors text-center">
                  {category.name}
                </h3>
                <span className="text-[10px] sm:text-[11px] text-stone-500 font-normal mt-0.5 text-center line-clamp-1">
                  {category.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS GRID */}
      <section className="py-12 sm:py-20 bg-brand-50 border-t border-b border-brand-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-14">
            <div>
              <span className="text-xs text-brand-600 uppercase tracking-[0.25em] font-bold block mb-1.5 sm:mb-2">
                Popular Items
              </span>
              <h2 className="font-serif text-2xl sm:text-5xl text-stone-900 font-medium">
                Featured Products
              </h2>
            </div>
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 text-stone-900 hover:text-brand-600 font-semibold tracking-widest uppercase text-xs transition-colors mt-4 sm:mt-0 pb-1 border-b border-stone-850 hover:border-brand-600"
            >
              View All Products
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white border border-stone-200 h-[380px] rounded-sm"></div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-stone-500">No featured products found.</div>
          )}
        </div>
      </section>

      {/* 4. ABOUT BOUTIQUE STORY SECTION */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left: Images Showcase (6 cols) */}
            <div className="lg:col-span-6 grid grid-cols-12 gap-4 relative">
              <div className="col-span-12 sm:col-span-8 overflow-hidden rounded-sm shadow-lg aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&w=600&q=80"
                  alt="Quality clothing model"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="col-span-6 absolute -bottom-8 -right-2 w-[60%] overflow-hidden rounded-sm shadow-xl border-4 border-white aspect-square hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80"
                  alt="Fabric texture"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right: Narrative (6 cols) */}
            <div className="lg:col-span-6 lg:pl-8 space-y-4 sm:space-y-6">
              <span className="text-xs text-brand-600 uppercase tracking-[0.25em] font-bold block">
                Our Boutique Story
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-stone-900 font-medium leading-[1.15]">
                Quality Fabrics & <br />
                Fashionable Styles for Women
              </h2>
              <div className="w-12 h-[2px] bg-brand-500 my-4 rounded-full"></div>
              
              <p className="text-stone-600 font-light text-sm sm:text-base leading-relaxed">
                {shopConfig.aboutText.history}
              </p>
              <p className="text-stone-600 font-light text-sm sm:text-base leading-relaxed">
                {shopConfig.aboutText.mission}
              </p>
              
              <div className="pt-2 sm:pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-stone-950 font-bold tracking-widest uppercase text-xs hover:text-brand-600 transition-colors duration-300 pb-1 border-b-2 border-stone-900 hover:border-brand-600"
                >
                  Read Our Full Story
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS */}
      <section className="py-12 sm:py-20 bg-brand-50 border-t border-brand-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-14">
            <div>
              <span className="text-xs text-brand-600 uppercase tracking-[0.25em] font-bold block mb-1.5 sm:mb-2">
                Fresh Stock
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-stone-900 font-medium">
                New Arrivals
              </h2>
            </div>
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 text-stone-900 hover:text-brand-600 font-semibold tracking-widest uppercase text-xs transition-colors mt-4 sm:mt-0 pb-1 border-b border-stone-850 hover:border-brand-600"
            >
              View All New Items
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white border border-stone-200 h-[380px] rounded-sm"></div>
              ))}
            </div>
          ) : newArrivals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-stone-500">No new arrivals found.</div>
          )}
        </div>
      </section>

      {/* 6. TRUST & QUALITY CARDS */}
      <section className="py-20 bg-white border-t border-brand-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs text-brand-600 uppercase tracking-[0.25em] font-bold block mb-2">
              Why Shop With Us
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 font-medium">
              Quality, Comfort & Perfect Fit
            </h2>
            <div className="w-12 h-[2px] bg-brand-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="group text-center space-y-3 bg-brand-50/50 p-6 rounded-sm border border-brand-100">
              <div className="w-14 h-14 bg-white text-brand-600 flex items-center justify-center rounded-full mx-auto shadow-sm transition-transform duration-300 group-hover:scale-110">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-stone-900">Handpicked Quality</h3>
              <p className="text-stone-500 font-light text-sm leading-relaxed">
                Every dress and saree is checked for soft texture, stitch quality, and beautiful color.
              </p>
            </div>

            <div className="group text-center space-y-3 bg-brand-50/50 p-6 rounded-sm border border-brand-100">
              <div className="w-14 h-14 bg-white text-brand-600 flex items-center justify-center rounded-full mx-auto shadow-sm transition-transform duration-300 group-hover:scale-110">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-stone-900">WhatsApp Help</h3>
              <p className="text-stone-500 font-light text-sm leading-relaxed">
                Get real photos, size details, and design recommendations directly on WhatsApp.
              </p>
            </div>

            <div className="group text-center space-y-3 bg-brand-50/50 p-6 rounded-sm border border-brand-100">
              <div className="w-14 h-14 bg-white text-brand-600 flex items-center justify-center rounded-full mx-auto shadow-sm transition-transform duration-300 group-hover:scale-110">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-stone-900">Maximum Comfort</h3>
              <p className="text-stone-500 font-light text-sm leading-relaxed">
                Our nightwear and daily kurtis use soft, breathable cottons designed for all-day comfort.
              </p>
            </div>

            <div className="group text-center space-y-3 bg-brand-50/50 p-6 rounded-sm border border-brand-100">
              <div className="w-14 h-14 bg-white text-brand-600 flex items-center justify-center rounded-full mx-auto shadow-sm transition-transform duration-300 group-hover:scale-110">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-stone-900">Fast Delivery</h3>
              <p className="text-stone-500 font-light text-sm leading-relaxed">
                We safely package and courier your order straight to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. VISIT OUR STORE SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-50 border border-brand-200/80 rounded-sm overflow-hidden p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Address Info */}
            <div className="space-y-6">
              <div>
                <span className="text-xs text-brand-600 uppercase tracking-[0.25em] font-bold block mb-2">
                  Visit Our Shop
                </span>
                <h2 className="font-serif text-4xl text-stone-900 font-medium leading-[1.15]">
                  Visit Our Store <br />
                  in Madurai
                </h2>
                <p className="text-stone-500 font-light text-sm leading-relaxed mt-3 max-w-md">
                  Drop by our boutique to see our full range, touch the fabric quality, and try on your favorite outfits.
                </p>
              </div>

              <div className="space-y-5 pt-2">
                <div className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-semibold text-stone-950 text-base mb-0.5">Our Address</h4>
                    <p className="text-stone-600 font-light text-sm leading-relaxed">{shopConfig.contact.address}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Clock className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-semibold text-stone-950 text-base mb-0.5">Opening Hours</h4>
                    <p className="text-stone-600 font-light text-sm leading-relaxed">{shopConfig.contact.openingHours}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Phone className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-semibold text-stone-950 text-base mb-0.5">Call Store</h4>
                    <p className="text-stone-600 font-light text-sm">
                      <a href={`tel:${shopConfig.contact.phone}`} className="hover:text-brand-700 font-medium transition-colors">
                        {shopConfig.contact.phone}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Visual Store Interior Showcase */}
            <div className="h-[380px] w-full overflow-hidden rounded-sm shadow-xl relative border border-brand-200">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
                alt="Indraprastham Boutique Storefront and Interior"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[1500ms]"
              />
              <div className="absolute inset-0 bg-stone-950/10"></div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. WHATSAPP ORDER BANNER */}
      <section className="bg-stone-950 py-16 text-white text-center border-t border-brand-300/10">
        <div className="max-w-3xl mx-auto px-4 space-y-5">
          <MessageSquare className="w-12 h-12 mx-auto text-brand-400" />
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-wide text-white">
            Found Something You Like?
          </h2>
          <p className="text-stone-300 text-sm font-light leading-relaxed max-w-md mx-auto">
            Chat with us directly on WhatsApp to check available sizes, request real photos, or place your order easily.
          </p>
          <div className="pt-3">
            <a
              href={`https://wa.me/${shopConfig.contact.whatsappNumber}?text=Hi%20Indraprastham%20Boutique,%20I'm%20interested%20in%20browsing%20your%20latest%20collections!`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-stone-950 font-bold tracking-widest uppercase transition-luxury shadow-xl rounded-sm text-xs"
            >
              Order Easily on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

