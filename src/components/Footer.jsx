import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { shopConfig } from '../data/config';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <Logo variant="light" />
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed font-light mb-6">
              Empowering your elegant wardrobe with authentic handpicked collections, designed to celebrate your unique grace.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-white text-lg font-medium mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-white transition-colors duration-300">Our Collections</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors duration-300">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors duration-300">Contact & Visit</Link>
              </li>
            </ul>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="font-serif text-white text-lg font-medium mb-4 tracking-wide">Categories</h4>
            <ul className="space-y-2.5 text-sm font-light">
              {shopConfig.categories.map((cat) => (
                <li key={cat.tag}>
                  <Link to={`/collections?category=${cat.name}`} className="hover:text-white transition-colors duration-300">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Information */}
          <div>
            <h4 className="font-serif text-white text-lg font-medium mb-4 tracking-wide">Store Address</h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-400 shrink-0" />
                <span>{shopConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href={`tel:${shopConfig.contact.phone}`} className="hover:text-white transition-colors">
                  {shopConfig.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 text-center md:flex md:justify-between md:items-center text-xs font-light text-stone-500">
          <p>&copy; {currentYear} {shopConfig.name}. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex justify-center space-x-6">
            <span>Designed for Premium Browsing</span>
            <span className="text-stone-700">|</span>
            <span>WhatsApp Order V1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
