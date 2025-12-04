import React from 'react';
import { X, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToCart }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-chocolate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 grid md:grid-cols-2 animate-fade-in-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/80 p-2 rounded-full hover:bg-white text-chocolate-800 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Image Side */}
        <div className="h-64 md:h-auto bg-chocolate-50 relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Side */}
        <div className="p-8 md:p-12 flex flex-col justify-between">
          <div>
             <span className="text-gold-500 text-sm font-bold uppercase tracking-widest mb-2 block">{product.category}</span>
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-chocolate-900 mb-4">{product.name}</h2>
             <div className="text-2xl text-chocolate-700 font-light mb-6">${product.price.toFixed(2)}</div>
             
             <p className="text-chocolate-600 leading-relaxed mb-8 text-lg">
               {product.description}
             </p>

             {product.ingredients && (
               <div className="mb-8">
                 <h4 className="font-bold text-chocolate-800 mb-3 text-sm uppercase">Ingredientes Principales</h4>
                 <div className="flex flex-wrap gap-2">
                   {product.ingredients.map(ing => (
                     <span key={ing} className="bg-chocolate-50 text-chocolate-700 px-3 py-1 rounded-full text-sm border border-chocolate-100">
                       {ing}
                     </span>
                   ))}
                 </div>
               </div>
             )}
             
             {product.weight && (
                <div className="mb-8 flex items-center gap-2 text-chocolate-600">
                   <span className="font-bold">Contenido:</span> {product.weight}
                </div>
             )}
          </div>

          <div className="flex gap-4">
             <button 
               onClick={() => { onAddToCart(product); onClose(); }}
               className="flex-1 bg-chocolate-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-chocolate-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
             >
               <ShoppingBag size={20} />
               Agregar al Carrito
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};