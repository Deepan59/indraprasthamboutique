import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { shopConfig } from '../data/config';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/collections' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isHomeHero = location.pathname === '/' && !scrolled;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100 py-3.5' 
        : 'bg-transparent py-4 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo variant={isHomeHero ? "light" : "dark"} />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  isActive 
                    ? isHomeHero 
                      ? 'text-brand-300 border-b-2 border-brand-300 pb-0.5' 
                      : 'text-brand-600 border-b-2 border-brand-600 pb-0.5'
                    : isHomeHero 
                      ? 'text-stone-200 hover:text-white hover:border-b hover:border-white/50 pb-0.5' 
                      : 'text-stone-600 hover:text-stone-950 hover:border-b hover:border-stone-400 pb-0.5'
                }`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden md:flex items-center">
            <a 
              href={`https://wa.me/${shopConfig.contact.whatsappNumber}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors duration-300 rounded-sm ${
                isHomeHero 
                  ? 'bg-brand-500 hover:bg-brand-600 text-stone-950 shadow-lg' 
                  : 'bg-stone-950 text-white hover:bg-brand-700'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              Chat & Order
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 focus:outline-none transition-colors ${
                isHomeHero ? 'text-white' : 'text-stone-700 hover:text-stone-950'
              }`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <div className={`md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`} style={{ top: scrolled ? '64px' : '80px', height: 'calc(100vh - 64px)' }}>
        <div className="px-6 py-8 space-y-6 flex flex-col h-full bg-stone-50">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `text-xl font-medium tracking-wider uppercase transition-colors py-2 border-b border-stone-200 block ${
                isActive ? 'text-brand-600 font-semibold' : 'text-stone-700'
              }`}
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-6">
            <a
              href={`https://wa.me/${shopConfig.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-brand-600 text-white font-semibold uppercase tracking-wider hover:bg-brand-700 transition-colors rounded-sm"
            >
              <Phone className="w-4 h-4" />
              Connect on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
