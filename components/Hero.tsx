import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=2072&auto=format&fit=crop" 
          alt="Artistic Chocolate Texture" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-chocolate-900/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-8">
        <div className="inline-block border border-gold-400/50 px-4 py-1 rounded-full backdrop-blur-sm">
          <span className="text-gold-400 uppercase tracking-[0.2em] text-xs font-bold">Desde 1985</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight drop-shadow-lg">
          Placer en cada <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-200 italic pr-2">
            Bocado
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-chocolate-100 max-w-2xl mx-auto font-light leading-relaxed">
          Descubre la fusión perfecta entre el cacao de origen más fino y la artesanía tradicional europea. Un lujo que mereces probar.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button 
            onClick={onShopNow}
            className="group bg-gold-500 hover:bg-gold-400 text-chocolate-900 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
          >
            Explorar Tienda
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 transition-colors backdrop-blur-sm">
            Ver Colección
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};