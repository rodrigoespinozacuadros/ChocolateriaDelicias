import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Coffee } from 'lucide-react';
import { Section } from '../types';

interface NavbarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  cartCount: number;
  onOpenCart: () => void;
  scrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  setActiveSection, 
  cartCount, 
  onOpenCart,
  scrolled 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: Section; label: string }[] = [
    { id: 'home', label: 'Inicio' },
    { id: 'shop', label: 'Tienda' },
    { id: 'about', label: 'Nosotros' },
    { id: 'contact', label: 'Contacto' },
  ];

  const handleNavClick = (id: Section) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || activeSection !== 'home'
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => handleNavClick('home')}
        >
          <div className="bg-chocolate-800 text-gold-400 p-2 rounded-full group-hover:bg-chocolate-700 transition-colors">
            <Coffee size={24} />
          </div>
          <span className={`font-serif font-bold text-2xl tracking-tighter ${
            scrolled || activeSection !== 'home' ? 'text-chocolate-800' : 'text-white'
          }`}>
            Chocolatería<span className="text-gold-500">Delicias</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-sm font-bold uppercase tracking-wider transition-colors hover:text-gold-500 ${
                activeSection === link.id
                  ? 'text-gold-500'
                  : scrolled || activeSection !== 'home' ? 'text-chocolate-800' : 'text-chocolate-100'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenCart}
            className={`relative p-2 rounded-full transition-colors ${
              scrolled || activeSection !== 'home' 
                ? 'text-chocolate-800 hover:bg-chocolate-50' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 ${
              scrolled || activeSection !== 'home' ? 'text-chocolate-800' : 'text-white'
            }`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-chocolate-900/95 backdrop-blur-lg flex flex-col items-center justify-center space-y-8 animate-fade-in md:hidden">
          <button 
            className="absolute top-6 right-6 text-chocolate-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={32} />
          </button>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-3xl font-serif font-bold text-chocolate-100 hover:text-gold-400 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};