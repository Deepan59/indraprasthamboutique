import { supabase } from '../supabase/supabaseClient';
import { sampleProducts } from './sampleProducts';

// Helper to map snake_case from database to camelCase for the frontend
const mapProduct = (dbProduct) => {
  if (!dbProduct) return null;
  return {
    id: dbProduct.id,
    productCode: dbProduct.product_code || dbProduct.productCode || '',
    name: dbProduct.name,
    category: dbProduct.category,
    price: Number(dbProduct.price),
    description: dbProduct.description,
    images: dbProduct.images || [],
    colors: dbProduct.colors || [],
    sizes: dbProduct.sizes || [],
    available: dbProduct.available !== undefined ? dbProduct.available : true,
    featured: dbProduct.featured !== undefined ? dbProduct.featured : false,
    newArrival: dbProduct.new_arrival !== undefined ? dbProduct.new_arrival : (dbProduct.newArrival !== undefined ? dbProduct.newArrival : false),
    createdAt: dbProduct.created_at || dbProduct.createdAt || new Date().toISOString()
  };
};

export const productService = {
  async getProducts() {
    if (!supabase) {
      console.log('Supabase not configured, using mock data.');
      return sampleProducts;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (!data || data.length === 0) {
        console.log('No products returned from Supabase, using mock data.');
        return sampleProducts;
      }

      return data.map(mapProduct);
    } catch (err) {
      console.error('Error fetching products from Supabase, falling back to mock data:', err.message);
      return sampleProducts;
    }
  },

  async getProductById(id) {
    if (!supabase) {
      return sampleProducts.find(p => p.id === id) || null;
    }

    try {
      // First try uuid check, else search by string or product_code
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        // Try fallback query by product_code or custom string id
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('products')
          .select('*')
          .or(`id.eq.${id},product_code.eq.${id}`);
        
        if (fallbackError || !fallbackData || fallbackData.length === 0) {
          // Final fallback to mock
          return sampleProducts.find(p => p.id === id) || null;
        }
        return mapProduct(fallbackData[0]);
      }

      return mapProduct(data);
    } catch (err) {
      console.error(`Error fetching product ${id} from Supabase, falling back to mock:`, err.message);
      return sampleProducts.find(p => p.id === id) || null;
    }
  },

  async getRelatedProducts(category, currentProductId, limit = 4) {
    const allProducts = await this.getProducts();
    return allProducts
      .filter(p => p.category === category && p.id !== currentProductId && p.available)
      .slice(0, limit);
  }
};
