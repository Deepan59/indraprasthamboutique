import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collections from './pages/Collections';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { shopConfig } from './data/config';

// Scroll restoration component to scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Floating WhatsApp button for direct support from any page
function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${shopConfig.contact.whatsappNumber}?text=Hi%20Indraprastham%20Boutique,%20I'd%20like%20to%20inquire%20about%20your%20fashion%20collections!`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-6 group"
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.417 9.864-9.858.002-2.637-1.023-5.115-2.887-6.981-1.865-1.865-4.343-2.887-6.985-2.889-5.439 0-9.863 4.417-9.867 9.86 0 1.73.458 3.41 1.328 4.908L1.936 21.01l4.71-.123zM18.006 14.72c-.327-.164-1.93-.954-2.227-1.063-.297-.11-.513-.164-.729.164-.216.328-.838 1.063-1.027 1.28-.19.219-.379.247-.706.083-1.282-.64-2.525-1.28-3.486-2.92-.25-.429.25-.399.715-1.326.077-.165.039-.308-.02-.418-.058-.11-.513-1.233-.703-1.69-.185-.445-.373-.385-.513-.392-.132-.007-.284-.008-.436-.008-.152 0-.399.057-.607.284-.208.227-.796.777-.796 1.895 0 1.118.812 2.198.925 2.35.114.152 1.597 2.438 3.87 3.418.54.233.963.372 1.291.476.543.173 1.037.148 1.428.09.435-.065 1.93-.789 2.202-1.554.271-.766.271-1.422.19-1.554-.08-.135-.297-.216-.624-.38z"/>
      </svg>
      
      {/* Pulse effect */}
      <span className="absolute inset-0 w-full h-full rounded-full bg-emerald-500 opacity-30 animate-ping pointer-events-none"></span>

      {/* Tooltip popup */}
      <span className="absolute right-18 bg-stone-900 text-white text-[11px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-sm whitespace-nowrap opacity-0 scale-75 origin-right group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-md pointer-events-none">
        Chat & Order
      </span>
    </a>
  );
}

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50 selection:bg-brand-100 selection:text-brand-900">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          {/* Support category filters via direct links mentioned in routing spec */}
          <Route path="/collections/sarees" element={<Collections />} />
          <Route path="/collections/kurti-sets" element={<Collections />} />
          <Route path="/collections/nighties" element={<Collections />} />
          <Route path="/collections/night-dresses" element={<Collections />} />
          <Route path="/collections/tops" element={<Collections />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

