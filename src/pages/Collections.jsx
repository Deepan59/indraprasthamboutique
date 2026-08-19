import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { productService } from '../data/productService';
import ProductCard from '../components/ProductCard';

export default function Collections() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, price-asc, price-desc, name-asc

  // Categories list based on specification
  const categories = ['All', 'Sarees', 'Kurti Sets', 'Nighties', 'Night Dresses', 'Tops', 'Lounge Wear', 'Fabric Section'];

  // Get active category from URL path or query parameters (default to 'All')
  const activeCategory = useMemo(() => {
    if (pathname.includes('/collections/sarees')) return 'Sarees';
    if (pathname.includes('/collections/kurti-sets')) return 'Kurti Sets';
    if (pathname.includes('/collections/nighties')) return 'Nighties';
    if (pathname.includes('/collections/night-dresses')) return 'Night Dresses';
    if (pathname.includes('/collections/tops')) return 'Tops';
    if (pathname.includes('/collections/lounge-wear')) return 'Lounge Wear';
    if (pathname.includes('/collections/fabric-section')) return 'Fabric Section';
    return searchParams.get('category') || 'All';
  }, [pathname, searchParams]);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products in collections:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Update URL category using route navigation to reset any sub-route states
  const handleCategoryChange = (category) => {
    if (category === 'All') {
      navigate('/collections');
    } else {
      navigate(`/collections?category=${encodeURIComponent(category)}`);
    }
  };

  // Filter and Sort products logic
  const filteredSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Category Filter
    if (activeCategory !== 'All') {
      result = result.filter(
        p => p.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // 2. Search Query Filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        p => p.name.toLowerCase().includes(query) || 
             p.productCode.toLowerCase().includes(query) ||
             (p.description && p.description.toLowerCase().includes(query))
      );
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      // 'newest' (default) - sorted by date
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <div className="pt-28 pb-20 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="text-[11px] text-brand-600 uppercase tracking-[0.2em] font-semibold block mb-2">
            Explore All Items
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 font-medium mb-3">
            Our Collections
          </h1>
          <p className="text-stone-500 font-light text-sm max-w-md mx-auto">
            Browse through our handpicked women's clothing. Select your favorites and order easily on WhatsApp.
          </p>
        </div>

        {/* Filters Controls Panel */}
        <div className="bg-white border border-stone-100 p-6 rounded-sm mb-8 shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-grow max-w-lg">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name or code (e.g. SB-SAR-001)..."
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 text-stone-850 text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-all rounded-xs"
              />
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-stone-500 font-medium uppercase tracking-wider flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sort By
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2.5 bg-stone-50 border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-brand-500 rounded-xs"
              >
                <option value="newest">New Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="border-t border-stone-100 pt-5">
            <div className="flex flex-wrap gap-2.5">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all rounded-sm border ${
                    activeCategory.toLowerCase() === category.toLowerCase()
                      ? 'bg-brand-600 border-brand-600 text-white shadow-xs'
                      : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center text-xs text-stone-500 font-light">
          <p>
            Showing {filteredSortedProducts.length} of {products.length} products
          </p>
          {activeCategory !== 'All' && (
            <button 
              onClick={() => handleCategoryChange('All')}
              className="text-brand-600 hover:underline font-normal uppercase tracking-wider"
            >
              Clear Category Filter
            </button>
          )}
        </div>

        {/* Product Catalogue Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white border border-stone-100 h-96 rounded-sm"></div>
            ))}
          </div>
        ) : filteredSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-stone-150 py-20 px-4 text-center rounded-sm max-w-xl mx-auto shadow-xs">
            <h3 className="font-serif text-2xl font-medium text-stone-800 mb-2">No products found</h3>
            <p className="text-stone-500 text-sm font-light mb-6">
              We couldn't find any products matching your selection. Try adjusting your search query or filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                handleCategoryChange('All');
              }}
              className="px-6 py-3 bg-stone-900 hover:bg-brand-600 text-white text-xs font-semibold tracking-widest uppercase transition-colors rounded-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
