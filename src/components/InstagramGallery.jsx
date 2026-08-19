import { shopConfig } from '../data/config';

const FALLBACK_IMG = "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80";

export default function InstagramGallery() {
  const images = [
    { id: 1, url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80", likes: "124" },
    { id: 2, url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=500&q=80", likes: "89" },
    { id: 3, url: "https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&w=500&q=80", likes: "256" },
    { id: 4, url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80", likes: "148" },
    { id: 5, url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80", likes: "192" },
    { id: 6, url: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=500&q=80", likes: "310" }
  ];

  return (
    <section className="py-16 sm:py-20 bg-stone-50 border-t border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[11px] text-brand-600 uppercase tracking-[0.2em] font-semibold block mb-2">
          Follow Our Journey
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium mb-4">
          Instagram Gallery
        </h2>
        <p className="text-stone-500 font-light text-sm max-w-md mx-auto mb-10">
          Get inspired by our latest styles, customer lookbooks, and behind-the-scenes moments.
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {images.map((img) => (
            <a
              key={img.id}
              href={shopConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden block bg-stone-200 border border-stone-100 rounded-sm"
            >
              <img
                src={img.url}
                alt="Instagram boutique post preview"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_IMG;
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-2">
                <svg className="w-6 h-6 mb-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                <span className="text-xs font-semibold tracking-wide">♥ {img.likes}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 sm:mt-10">
          <a
            href={shopConfig.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-stone-900 hover:text-brand-600 font-medium tracking-wider uppercase text-xs transition-colors duration-300 pb-0.5 border-b border-stone-900 hover:border-brand-600"
          >
            Visit Our Instagram Profile
          </a>
        </div>
      </div>
    </section>
  );
}
