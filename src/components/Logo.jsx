import logoImg from '../assets/logo.jpg';

export default function Logo({ className = "", variant = "light" }) {
  // variant: "light" (for dark backgrounds), "dark" (for white backgrounds)
  const isLight = variant === "light";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Emblem Icon: Logo Image */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-700 via-amber-600 to-amber-900 p-[1.5px] shadow-md">
        <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center overflow-hidden relative">
          <img 
            src={logoImg} 
            alt="Dhanaz Boutique Logo" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <span className={`font-serif text-lg sm:text-2xl font-bold tracking-widest leading-none ${
          isLight ? 'text-white' : 'text-stone-900'
        }`}>
          DHANAZ
        </span>
        <div className="flex items-center gap-1 mt-0.5">
          <span className={`h-[1px] w-2 ${isLight ? 'bg-amber-400/60' : 'bg-amber-600/60'}`}></span>
          <span className={`text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-medium ${
            isLight ? 'text-amber-300' : 'text-amber-700'
          }`}>
            BOUTIQUE
          </span>
          <span className={`h-[1px] w-2 ${isLight ? 'bg-amber-400/60' : 'bg-amber-600/60'}`}></span>
        </div>
      </div>
    </div>
  );
}
