import React from 'react';
import { X, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  total: number;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  onRemove, 
  onUpdateQuantity,
  total,
  onCheckout
}) => {
  return (
    <div className={`fixed inset-0 z-[60] pointer-events-none overflow-hidden ${isOpen ? 'pointer-events-auto' : ''}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-chocolate-900/50 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div 
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-chocolate-50">
          <h2 className="text-2xl font-serif font-bold text-chocolate-800 flex items-center gap-2">
            <ShoppingBag size={24} /> Tu Carrito
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-chocolate-100 rounded-full text-chocolate-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-chocolate-400 space-y-4">
              <ShoppingBag size={64} opacity={0.2} />
              <p className="text-xl font-medium">Tu carrito está vacío</p>
              <p className="text-sm">¡Agrega algunas delicias para comenzar!</p>
              <button 
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-chocolate-100 text-chocolate-800 rounded-full font-bold text-sm hover:bg-chocolate-200 transition-colors"
              >
                Volver a la tienda
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="flex gap-4 group">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-chocolate-900 line-clamp-1">{item.product.name}</h4>
                    <p className="text-sm text-chocolate-500">${item.product.price} / unidad</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3 bg-chocolate-50 rounded-full px-3 py-1">
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="p-1 hover:text-chocolate-800 text-chocolate-500 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="p-1 hover:text-chocolate-800 text-chocolate-500 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 bg-chocolate-50 border-t border-chocolate-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-chocolate-600">Subtotal</span>
              <span className="text-xl font-bold text-chocolate-900">${total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-chocolate-400 mb-6 text-center">Impuestos y envío calculados al finalizar compra</p>
            <button 
              onClick={onCheckout}
              className="w-full bg-chocolate-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-chocolate-700 transition-all shadow-lg active:scale-95"
            >
              Proceder al Pago
            </button>
          </div>
        )}
      </div>
    </div>
  );
};