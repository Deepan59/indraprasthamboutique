import { Heart, ShieldCheck, Sun } from 'lucide-react';
import { shopConfig } from '../data/config';

export default function About() {
  return (
    <div className="pt-28 pb-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] text-brand-600 uppercase tracking-[0.2em] font-semibold block mb-2">
            The Brand
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 font-medium mb-3">
            About Saravana Boutique
          </h1>
          <p className="text-stone-500 font-light text-sm max-w-md mx-auto">
            A heritage of quality materials, curated with passion for modern women who love elegant fashion.
          </p>
        </div>

        {/* Narrative layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 bg-white border border-stone-100 p-6 sm:p-10 rounded-sm shadow-xs">
          <div className="lg:col-span-6 overflow-hidden rounded-sm bg-stone-100 aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
              alt="Saravana Boutique interior showcase"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="lg:col-span-6 lg:pl-6 space-y-6">
            <h2 className="font-serif text-3xl text-stone-900 font-semibold italic">
              "We believe fashion is an expression of grace."
            </h2>
            
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-900 mb-2">Our History</h3>
              <p className="text-stone-600 font-light leading-relaxed text-sm">
                {shopConfig.aboutText.history}
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-900 mb-2">Our Mission</h3>
              <p className="text-stone-600 font-light leading-relaxed text-sm">
                {shopConfig.aboutText.mission}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="block text-2xl font-bold text-brand-600">10+</span>
                <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">Years Active</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-brand-600">5k+</span>
                <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">Happy Clients</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-brand-600">100%</span>
                <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">Handpicked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars / Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-stone-100 p-8 rounded-sm shadow-xs text-center">
            <div className="w-12 h-12 bg-brand-50 text-brand-600 flex items-center justify-center rounded-full mx-auto mb-4">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-medium text-stone-900 mb-2">Ethical Sourcing</h3>
            <p className="text-stone-500 font-light text-sm leading-relaxed">
              We collaborate directly with local weavers and suppliers, ensuring fair pricing and authentic quality checks for every piece.
            </p>
          </div>

          <div className="bg-white border border-stone-100 p-8 rounded-sm shadow-xs text-center">
            <div className="w-12 h-12 bg-brand-50 text-brand-600 flex items-center justify-center rounded-full mx-auto mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-medium text-stone-900 mb-2">Customer Care</h3>
            <p className="text-stone-500 font-light text-sm leading-relaxed">
              Our direct WhatsApp assistance channel guarantees a personalized retail experience similar to walking into our physical store.
            </p>
          </div>

          <div className="bg-white border border-stone-100 p-8 rounded-sm shadow-xs text-center">
            <div className="w-12 h-12 bg-brand-50 text-brand-600 flex items-center justify-center rounded-full mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-medium text-stone-900 mb-2">Premium Quality</h3>
            <p className="text-stone-500 font-light text-sm leading-relaxed">
              We guarantee shrink-resistant materials, color fastness in cottons, and high zari standards in our signature silk saree lines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
