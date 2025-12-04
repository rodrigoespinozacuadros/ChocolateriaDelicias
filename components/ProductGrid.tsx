import React from 'react';
import { Plus, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          {/* Image Container */}
          <div className="aspect-[4/5] overflow-hidden bg-chocolate-100 relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-chocolate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
               <button 
                 onClick={(e) => { e.stopPropagation(); onProductClick(product); }}
                 className="bg-white text-chocolate-900 p-3 rounded-full hover:bg-gold-400 transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300"
                 title="Ver detalles"
               >
                 <Eye size={20} />
               </button>
               <button 
                 onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                 className="bg-chocolate-800 text-white p-3 rounded-full hover:bg-chocolate-700 transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                 title="Agregar al carrito"
               >
                 <Plus size={20} />
               </button>
            </div>
            
            {product.category === 'truffle' && (
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-chocolate-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Trufa
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-6">
            <h3 className="font-serif font-bold text-xl text-chocolate-900 mb-2 truncate">{product.name}</h3>
            <p className="text-chocolate-500 text-sm line-clamp-2 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-chocolate-800">${product.price.toFixed(2)}</span>
              <button 
                onClick={() => onAddToCart(product)}
                className="text-sm font-bold text-gold-600 hover:text-gold-500 uppercase tracking-wide border-b border-transparent hover:border-gold-500 transition-all"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};