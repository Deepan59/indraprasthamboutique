import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="max-w-md w-full px-6 text-center">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-6xl text-stone-900 font-medium mb-3">404</h1>
        <h2 className="font-serif text-2xl text-stone-800 font-medium mb-4">Page Not Found</h2>
        <p className="text-stone-500 font-light text-sm mb-8 leading-relaxed">
          The page you are looking for doesn't exist, has been moved, or the product catalog item has changed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-stone-900 hover:bg-brand-600 text-white text-xs font-semibold tracking-widest uppercase transition-colors rounded-sm"
          >
            Go to Homepage
          </Link>
          <Link
            to="/collections"
            className="px-6 py-3 border border-stone-300 hover:border-stone-900 text-stone-750 text-xs font-semibold tracking-widest uppercase transition-colors rounded-sm bg-white"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
