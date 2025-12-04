import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Instagram, Facebook, Twitter, Heart, ArrowRight } from 'lucide-react';
import { PRODUCTS } from './constants';
import { Product, CartItem, Section } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when cart or modal is open
  useEffect(() => {
    if (selectedProduct || cartOpen || checkoutOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct, cartOpen, checkoutOpen]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Navigation */}
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        cartCount={cartItemCount}
        onOpenCart={() => setCartOpen(true)}
        scrolled={scrolled}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {activeSection === 'home' && (
          <>
            <Hero onShopNow={() => setActiveSection('shop')} />
            
            {/* Featured Section */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-chocolate-500 font-bold tracking-widest uppercase text-sm">Selección Exclusiva</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-chocolate-800">Favoritos de la Casa</h2>
                <div className="w-24 h-1 bg-chocolate-500 mx-auto"></div>
                <p className="mt-6 text-chocolate-600 max-w-2xl mx-auto text-lg">
                  Descubre nuestras creaciones más amadas, elaboradas a mano con cacao de origen único y pasión infinita.
                </p>
              </div>
              <ProductGrid 
                products={PRODUCTS.filter(p => p.featured)} 
                onProductClick={setSelectedProduct}
                onAddToCart={addToCart}
              />
              <div className="text-center mt-12">
                <button 
                  onClick={() => setActiveSection('shop')}
                  className="inline-flex items-center gap-2 border-b-2 border-chocolate-800 text-chocolate-800 font-bold pb-1 hover:text-chocolate-600 hover:border-chocolate-600 transition-colors"
                >
                  Ver toda la colección <ArrowRight size={18} />
                </button>
              </div>
            </section>

            {/* Story Section Teaser */}
            <section className="bg-chocolate-800 text-chocolate-100 py-24 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')]"></div>
              <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-bold text-white">El Arte del Cacao</h2>
                  <p className="text-lg text-chocolate-200 leading-relaxed">
                    Desde 1985, Chocolatería Delicias ha transformado granos seleccionados en obras maestras comestibles. 
                    Nuestro proceso "Bean-to-Bar" garantiza una pureza inigualable y un sabor que despierta los sentidos.
                  </p>
                  <button 
                    onClick={() => setActiveSection('about')}
                    className="bg-transparent border border-chocolate-200 text-chocolate-100 px-8 py-3 rounded-full hover:bg-chocolate-700 transition-all uppercase tracking-wider text-sm font-semibold"
                  >
                    Nuestra Historia
                  </button>
                </div>
                <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700">
                  <img 
                    src="https://images.unsplash.com/photo-1605256565134-8c8a14b0b147?q=80&w=800&auto=format&fit=crop" 
                    alt="Maestro Chocolatero trabajando" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === 'shop' && (
          <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-chocolate-800 mb-4">Nuestra Colección</h1>
              <p className="text-chocolate-600">Explora la variedad de sabores y texturas que tenemos para ti.</p>
            </div>
            
            {/* Filter Tabs (Visual only for now) */}
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              {['Todos', 'Trufas', 'Barras', 'Regalos'].map((cat) => (
                <button 
                  key={cat} 
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                    cat === 'Todos' 
                      ? 'bg-chocolate-800 text-white shadow-lg' 
                      : 'bg-white text-chocolate-600 hover:bg-chocolate-100 border border-chocolate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <ProductGrid 
              products={PRODUCTS} 
              onProductClick={setSelectedProduct}
              onAddToCart={addToCart}
            />
          </div>
        )}

        {activeSection === 'about' && (
          <div className="pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6 text-center mb-16">
              <h1 className="text-5xl font-bold text-chocolate-800 mb-6">Nuestra Pasión</h1>
              <p className="text-xl text-chocolate-600 leading-relaxed">
                "El chocolate no es solo un alimento, es un viaje emocional."
              </p>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center mb-24">
               <img 
                 src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop" 
                 alt="Cacao Pods Farm" 
                 className="rounded-lg shadow-xl w-full h-[600px] object-cover"
               />
               <div className="space-y-8">
                 <h3 className="text-3xl font-bold text-chocolate-800">Origen Sostenible</h3>
                 <p className="text-chocolate-600 text-lg leading-relaxed">
                   Trabajamos directamente con agricultores en Ecuador y Perú para obtener los granos de cacao más finos. 
                   Pagamos precios justos por encima del mercado para asegurar la calidad de vida de nuestros productores 
                   y la calidad excepcional de nuestro chocolate.
                 </p>
                 <div className="grid grid-cols-2 gap-6">
                   <div className="bg-white p-6 rounded-lg shadow-md border border-chocolate-100">
                     <span className="block text-4xl font-bold text-chocolate-500 mb-2">100%</span>
                     <span className="text-chocolate-800 font-medium">Orgánico</span>
                   </div>
                   <div className="bg-white p-6 rounded-lg shadow-md border border-chocolate-100">
                     <span className="block text-4xl font-bold text-chocolate-500 mb-2">35+</span>
                     <span className="text-chocolate-800 font-medium">Premios Internacionales</span>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="pt-24 pb-20 px-6 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-4xl font-bold text-chocolate-800 mb-8 text-center">Contáctanos</h1>
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-chocolate-100">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-chocolate-700 mb-2">Nombre</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg bg-chocolate-50 border border-chocolate-200 focus:border-chocolate-500 focus:outline-none focus:ring-1 focus:ring-chocolate-500 transition-colors" placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-chocolate-700 mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg bg-chocolate-50 border border-chocolate-200 focus:border-chocolate-500 focus:outline-none focus:ring-1 focus:ring-chocolate-500 transition-colors" placeholder="tucorreo@ejemplo.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-chocolate-700 mb-2">Mensaje</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-chocolate-50 border border-chocolate-200 focus:border-chocolate-500 focus:outline-none focus:ring-1 focus:ring-chocolate-500 transition-colors" placeholder="¿En qué podemos ayudarte?"></textarea>
                </div>
                <button className="w-full bg-chocolate-800 text-white py-4 rounded-lg font-bold hover:bg-chocolate-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
                  Enviar Mensaje
                </button>
              </form>
              
              <div className="mt-12 pt-8 border-t border-chocolate-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                 <div>
                   <h4 className="font-bold text-chocolate-800 mb-2">Ubicación</h4>
                   <p className="text-sm text-chocolate-600">Av. del Chocolate 123<br/>Ciudad de México</p>
                 </div>
                 <div>
                   <h4 className="font-bold text-chocolate-800 mb-2">Horario</h4>
                   <p className="text-sm text-chocolate-600">Lun - Sab: 10am - 8pm<br/>Dom: 11am - 6pm</p>
                 </div>
                 <div>
                   <h4 className="font-bold text-chocolate-800 mb-2">Teléfono</h4>
                   <p className="text-sm text-chocolate-600">+52 555 123 4567<br/>hola@chocolateriadelicias.com</p>
                 </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        total={cartTotal}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {/* Product Modal */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={addToCart}
        />
      )}

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        total={cartTotal}
        onClearCart={() => setCart([])}
      />
    </div>
  );
};

export default App;