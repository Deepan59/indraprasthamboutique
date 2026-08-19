-- ==========================================
-- Supabase Setup Script for Saravana Boutique
-- ==========================================

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    product_code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    description TEXT,
    images TEXT[] DEFAULT '{}'::TEXT[],
    colors TEXT[] DEFAULT '{}'::TEXT[],
    sizes TEXT[] DEFAULT '{}'::TEXT[],
    available BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    new_arrival BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON public.products
    FOR SELECT USING (true);

-- 2. Insert Mock Products Data
INSERT INTO public.products (id, product_code, name, category, price, description, images, colors, sizes, available, featured, new_arrival, created_at)
VALUES
-- SAREES
('sb-sar-001', 'SB-SAR-001', 'Banarasi Silk Saree in Royal Crimson', 'Sarees', 3499, 'An elegant Banarasi Silk saree featuring intricate golden zari work, an ornate pallu, and a matching unstitched blouse piece. Perfect for weddings, festive occasions, and grand celebrations.', 
    ARRAY['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#991b1b', '#b91c1c', '#1e3a8a'], ARRAY['Free Size'], TRUE, TRUE, TRUE, '2026-08-10T12:00:00Z'),

('sb-sar-002', 'SB-SAR-002', 'Classic Kanjeevaram Kora Saree', 'Sarees', 4299, 'A traditional Kanjeevaram silk-cotton blend saree with premium gold borders and stunning ethnic patterns. Crafted with premium thread counts for maximum durability and comfort.', 
    ARRAY['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#d97706', '#047857'], ARRAY['Free Size'], TRUE, TRUE, FALSE, '2026-07-28T09:30:00Z'),

('sb-sar-003', 'SB-SAR-003', 'Handloom Linen Cotton Saree', 'Sarees', 1899, 'A lightweight, breathable linen cotton handloom saree with contemporary stripes and a minimalist border. Perfect for modern office wear or elegant daytime functions.', 
    ARRAY['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#f59e0b', '#ec4899', '#14b8a6'], ARRAY['Free Size'], TRUE, FALSE, TRUE, '2026-08-15T15:00:00Z'),

('sb-sar-004', 'SB-SAR-004', 'Emerald Green Georgette Saree', 'Sarees', 2499, 'Flowy, elegant georgette saree featuring delicate sequin borders and a contemporary look. Drapes beautifully and offers a lightweight party-wear silhouette.', 
    ARRAY['https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#065f46', '#0f172a'], ARRAY['Free Size'], TRUE, FALSE, FALSE, '2026-07-20T10:15:00Z'),

('sb-sar-005', 'SB-SAR-005', 'Organza Floral Print Saree', 'Sarees', 2199, 'An ultra-modern, delicate pastel organza saree featuring beautiful digital floral prints and a scalloped embroidered border. Comes with a matching satin blouse fabric.', 
    ARRAY['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#fbcfe8', '#cffafe'], ARRAY['Free Size'], TRUE, TRUE, TRUE, '2026-08-16T11:45:00Z'),

-- KURTI SETS
('sb-kur-001', 'SB-KUR-001', 'Embroidered Anarkali Kurti Set', 'Kurti Sets', 2199, 'A gorgeous cotton-silk Anarkali kurti paired with matching palazzo pants and a sheer organza dupatta. Features refined embroidery along the neckline and cuffs.', 
    ARRAY['https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1631856955319-3543d8a7c29e?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#be123c', '#4c1d95', '#064e3b'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], TRUE, TRUE, TRUE, '2026-08-12T14:30:00Z'),

('sb-kur-002', 'SB-KUR-002', 'Floral A-Line Cotton Kurti Set', 'Kurti Sets', 1599, 'Comfortable, everyday A-Line printed cotton kurti set with narrow trousers. Designed with premium breathable cotton fabric, perfect for summer days.', 
    ARRAY['https://images.unsplash.com/photo-1631856955319-3543d8a7c29e?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#cbd5e1', '#fef08a', '#bae6fd'], ARRAY['M', 'L', 'XL', 'XXL'], TRUE, FALSE, TRUE, '2026-08-14T08:00:00Z'),

('sb-kur-003', 'SB-KUR-003', 'Pure Chanderi Silk Kurta Set', 'Kurti Sets', 2899, 'A premium Chanderi Silk straight kurta set with matching silk trousers and a printed floral dupatta. Excellent choice for festive get-togethers and ceremonies.', 
    ARRAY['https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#fb923c', '#f472b6'], ARRAY['S', 'M', 'L', 'XL'], TRUE, TRUE, FALSE, '2026-07-15T18:20:00Z'),

('sb-kur-004', 'SB-KUR-004', 'Rayon Straight Kurti Set with Dupatta', 'Kurti Sets', 1399, 'Soft and comfortable rayon straight-cut kurti featuring golden foil print work. Pairs beautifully with matching solid leggings and a contrast dupatta.', 
    ARRAY['https://images.unsplash.com/photo-1631856955319-3543d8a7c29e?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#1e293b', '#0f766e'], ARRAY['M', 'L', 'XL', 'XXL'], TRUE, FALSE, FALSE, '2026-07-25T11:00:00Z'),

-- NIGHTIES
('sb-nig-001', 'SB-NIG-001', 'Premium Cotton Printed Nighty', 'Nighties', 599, 'Extra soft, 100% pure cotton nighty with a front zip and short sleeves. Designed for maximum breathability and comfortable night-long sleep.', 
    ARRAY['https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1608060434411-0c3fa9049e7b?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#bae6fd', '#fecdd3', '#e9d5ff'], ARRAY['L', 'XL', 'XXL'], TRUE, FALSE, TRUE, '2026-08-11T16:30:00Z'),

('sb-nig-002', 'SB-NIG-002', 'Embroidery Neck Cotton Nighty', 'Nighties', 699, 'Graceful nighty crafted from high-quality mercerized cotton. Features dynamic Kashmiri embroidery styling around the neck and button details.', 
    ARRAY['https://images.unsplash.com/photo-1608060434411-0c3fa9049e7b?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#1e3a8a', '#064e3b', '#581c87'], ARRAY['L', 'XL', 'XXL'], TRUE, TRUE, FALSE, '2026-07-30T14:00:00Z'),

('sb-nig-003', 'SB-NIG-003', 'Alpine Comfort Printed Nighty', 'Nighties', 849, 'Super soft alpine fabric nighty, highly durable, shrink-resistant, and featuring lovely conversational designs. Fits loose and comfortable.', 
    ARRAY['https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#a1a1aa', '#fda4af'], ARRAY['Free Size'], TRUE, FALSE, TRUE, '2026-08-17T09:00:00Z'),

-- NIGHT DRESSES
('sb-ndr-001', 'SB-NDR-001', 'Satin Collar Nightsuit Set', 'Night Dresses', 1199, 'Luxurious satin-silk nightwear set featuring a button-down collar shirt and matching slip-on pyjamas. Feels incredibly smooth against the skin.', 
    ARRAY['https://images.unsplash.com/photo-1608060434411-0c3fa9049e7b?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#881337', '#0f172a', '#3b0764'], ARRAY['S', 'M', 'L', 'XL'], TRUE, TRUE, TRUE, '2026-08-13T10:00:00Z'),

('sb-ndr-002', 'SB-NDR-002', 'Hosiery Cotton T-Shirt & Pyjama Set', 'Night Dresses', 899, 'Ultra-cozy combed cotton knitted lounge set. Includes a cute graphic-printed short sleeve tee and matching checked straight-leg pyjamas.', 
    ARRAY['https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#e2e8f0', '#fed7aa', '#f5d0fe'], ARRAY['S', 'M', 'L', 'XL'], TRUE, FALSE, FALSE, '2026-07-29T12:00:00Z'),

('sb-ndr-003', 'SB-NDR-003', 'Lace Trim Satin Nighty & Robe Set', 'Night Dresses', 1499, 'Elegant 2-piece satin nightwear. Features a sleek spaghetti slip-dress with beautiful lace work on the bust, paired with a matching full-length satin robe.', 
    ARRAY['https://images.unsplash.com/photo-1608060434411-0c3fa9049e7b?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#dc2626', '#020617'], ARRAY['M', 'L', 'XL'], TRUE, TRUE, TRUE, '2026-08-14T17:15:00Z'),

-- TOPS
('sb-top-001', 'SB-TOP-001', 'Georgette Floral Ruffle Top', 'Tops', 799, 'A gorgeous, flowy georgette top with elegant ruffles around the neck and elasticated puff sleeves. Ideal for pairing with high-waisted denim or trousers.', 
    ARRAY['https://images.unsplash.com/photo-1564585299772-3a22837f2875?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#fdf2f8', '#ecfdf5', '#fef2f2'], ARRAY['XS', 'S', 'M', 'L', 'XL'], TRUE, TRUE, TRUE, '2026-08-16T10:00:00Z'),

('sb-top-002', 'SB-TOP-002', 'Embroidered Cotton Peplum Top', 'Tops', 999, 'A trendy peplum top in premium white cotton slub, decorated with colorful ethnic thread work. Breathable, stylish, and perfect for casual outings.', 
    ARRAY['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1564585299772-3a22837f2875?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#ffffff', '#cbd5e1'], ARRAY['S', 'M', 'L', 'XL'], TRUE, FALSE, TRUE, '2026-08-15T09:40:00Z'),

('sb-top-003', 'SB-TOP-003', 'Classic Striped Linen Blouse', 'Tops', 1199, 'Tailored regular-fit linen blouse featuring classic pinstripes and a buttoned front. Sophisticated, lightweight, and versatile for work and play.', 
    ARRAY['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#1e40af', '#475569'], ARRAY['S', 'M', 'L', 'XL'], TRUE, TRUE, FALSE, '2026-07-20T14:30:00Z'),

('sb-top-004', 'SB-TOP-004', 'Ribbed Knit Wrap Top', 'Tops', 849, 'A chic wrap-around style top made from super soft ribbed knit cotton. Adjusts to fit your waist perfectly, adding style and confidence to your outfit.', 
    ARRAY['https://images.unsplash.com/photo-1564585299772-3a22837f2875?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#292524', '#78716c', '#d6d3d1'], ARRAY['XS', 'S', 'M', 'L'], TRUE, FALSE, FALSE, '2026-07-22T16:00:00Z'),

('sb-top-005', 'SB-TOP-005', 'Crepe High-Neck Top', 'Tops', 899, 'An elegant high-neck top in moss crepe fabric with button cuffs and keyhole back closure. Perfect office-wear staple.', 
    ARRAY['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80'], 
    ARRAY['#4a044e', '#1c1917'], ARRAY['S', 'M', 'L', 'XL'], FALSE, FALSE, FALSE, '2026-07-10T11:00:00Z'),

('sb-fab-001', 'SB-FAB-001', 'Maroon Ajrakh Block Print Cotton Fabric', 'Fabric Section', 150, 'Premium quality maroon block print cotton fabric featuring fine pin-tuck pleats and traditional ethnic arch motifs. Soft, breathable, and durable fabric perfect for custom blouses, kurtis, dresses, and ethnic wear. Price is per meter. Total available stock: 20 meters.',
    ARRAY['/maroon-printed-fabric.jpg'],
    ARRAY['#800000', '#d97706', '#000000'], ARRAY['Per Meter'], TRUE, TRUE, TRUE, '2026-08-19T21:50:00Z')

ON CONFLICT (product_code) DO UPDATE SET 
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    price = EXCLUDED.price,
    description = EXCLUDED.description,
    images = EXCLUDED.images,
    colors = EXCLUDED.colors,
    sizes = EXCLUDED.sizes,
    available = EXCLUDED.available,
    featured = EXCLUDED.featured,
    new_arrival = EXCLUDED.new_arrival;
