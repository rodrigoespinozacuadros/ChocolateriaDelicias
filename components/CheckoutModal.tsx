import React, { useState, useEffect } from 'react';
import { X, CreditCard, Banknote, QrCode, CheckCircle, MapPin, Truck, Loader2, Lock, Wallet } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  onClearCart: () => void;
}

type PaymentMethod = 'card' | 'cash' | 'wallet';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  total, 
  onClearCart 
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  
  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setLoading(false);
      setPaymentMethod('card');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      onClearCart();
    }, 2000);
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-chocolate-900/80 backdrop-blur-sm"></div>
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-chocolate-800 mb-4">¡Orden Confirmada!</h2>
          <p className="text-chocolate-600 mb-8">
            Gracias por tu compra. Hemos enviado un correo de confirmación con los detalles de tu pedido.
          </p>
          <div className="bg-chocolate-50 p-4 rounded-lg mb-8 border border-chocolate-100">
            <p className="text-sm text-chocolate-500 uppercase tracking-widest font-bold mb-1">Número de Orden</p>
            <p className="text-2xl font-mono text-chocolate-900">#CD-{Math.floor(Math.random() * 10000)}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-full bg-chocolate-800 text-white py-4 rounded-xl font-bold hover:bg-chocolate-700 transition-colors shadow-lg"
          >
            Volver a la Tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-0 md:p-4 overflow-y-auto">
      <div 
        className="absolute inset-0 bg-chocolate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white md:rounded-2xl shadow-2xl w-full max-w-5xl min-h-screen md:min-h-0 md:h-auto md:max-h-[90vh] flex flex-col md:flex-row overflow-hidden animate-fade-in-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/80 p-2 rounded-full hover:bg-gray-100 text-chocolate-800 transition-colors md:hidden"
        >
          <X size={24} />
        </button>

        {/* Left Side: Summary (Mobile: Top, Desktop: Left) */}
        <div className="bg-chocolate-50 p-6 md:p-10 md:w-2/5 border-b md:border-b-0 md:border-r border-chocolate-100 overflow-y-auto max-h-[30vh] md:max-h-full order-1 md:order-2">
           <h3 className="font-serif font-bold text-2xl text-chocolate-800 mb-6 flex items-center gap-2">
             Resumen
           </h3>
           <div className="space-y-4 mb-6">
             {cart.map((item) => (
               <div key={item.product.id} className="flex gap-4">
                 <div className="w-16 h-16 rounded-md overflow-hidden bg-white shadow-sm flex-shrink-0">
                   <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-1">
                   <h4 className="font-bold text-chocolate-900 text-sm line-clamp-1">{item.product.name}</h4>
                   <p className="text-xs text-chocolate-500">Cant: {item.quantity}</p>
                   <p className="text-sm font-bold text-chocolate-700">${(item.product.price * item.quantity).toFixed(2)}</p>
                 </div>
               </div>
             ))}
           </div>
           
           <div className="border-t border-chocolate-200 pt-4 space-y-2">
             <div className="flex justify-between text-chocolate-600">
               <span>Subtotal</span>
               <span>${total.toFixed(2)}</span>
             </div>
             <div className="flex justify-between text-chocolate-600">
               <span>Envío</span>
               <span>$50.00</span>
             </div>
             <div className="flex justify-between text-xl font-bold text-chocolate-900 pt-4 border-t border-chocolate-200 mt-4">
               <span>Total</span>
               <span>${(total + 50).toFixed(2)}</span>
             </div>
           </div>
        </div>

        {/* Right Side: Form & Payment (Mobile: Bottom, Desktop: Right) */}
        <div className="p-6 md:p-10 md:w-3/5 overflow-y-auto order-2 md:order-1">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-chocolate-900">Finalizar Compra</h2>
            <button onClick={onClose} className="hidden md:block p-2 hover:bg-gray-100 rounded-full text-chocolate-600">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Info */}
            <section>
              <h4 className="text-sm font-bold text-chocolate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <MapPin size={16} /> Dirección de Envío
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <input required type="text" placeholder="Nombre Completo" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-chocolate-500 focus:ring-1 focus:ring-chocolate-500 outline-none transition-all" />
                </div>
                <div className="md:col-span-2">
                  <input required type="text" placeholder="Dirección y Número" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-chocolate-500 focus:ring-1 focus:ring-chocolate-500 outline-none transition-all" />
                </div>
                <div>
                  <input required type="text" placeholder="Ciudad" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-chocolate-500 focus:ring-1 focus:ring-chocolate-500 outline-none transition-all" />
                </div>
                <div>
                  <input required type="text" placeholder="Código Postal" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-chocolate-500 focus:ring-1 focus:ring-chocolate-500 outline-none transition-all" />
                </div>
              </div>
            </section>

            {/* Payment Methods */}
            <section>
              <h4 className="text-sm font-bold text-chocolate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Wallet size={16} /> Método de Pago
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-gold-500 bg-gold-50 text-chocolate-900 shadow-md' 
                      : 'border-gray-100 bg-white text-gray-500 hover:border-chocolate-200'
                  }`}
                >
                  <CreditCard size={24} />
                  <span className="font-bold text-sm">Tarjeta</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                    paymentMethod === 'wallet' 
                      ? 'border-gold-500 bg-gold-50 text-chocolate-900 shadow-md' 
                      : 'border-gray-100 bg-white text-gray-500 hover:border-chocolate-200'
                  }`}
                >
                  <QrCode size={24} />
                  <span className="font-bold text-sm">Yape/Plin</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                    paymentMethod === 'cash' 
                      ? 'border-gold-500 bg-gold-50 text-chocolate-900 shadow-md' 
                      : 'border-gray-100 bg-white text-gray-500 hover:border-chocolate-200'
                  }`}
                >
                  <Banknote size={24} />
                  <span className="font-bold text-sm">Efectivo</span>
                </button>
              </div>

              {/* Dynamic Payment Fields */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 animate-fade-in">
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="relative">
                       <CreditCard className="absolute top-3.5 left-4 text-gray-400" size={20} />
                       <input required type="text" placeholder="Número de Tarjeta" className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-chocolate-500 outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input required type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-chocolate-500 outline-none" />
                      <div className="relative">
                         <Lock className="absolute top-3.5 left-4 text-gray-400" size={16} />
                         <input required type="text" placeholder="CVC" className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-chocolate-500 outline-none" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                      <Lock size={12} />
                      <span>Transacción encriptada de extremo a extremo</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'wallet' && (
                  <div className="text-center py-4 space-y-4">
                    <p className="text-chocolate-600 font-medium">Escanea el código QR o envía al número:</p>
                    <div className="text-2xl font-bold text-chocolate-800 tracking-wider">+51 987 654 321</div>
                    
                    <div className="flex justify-center gap-4 my-4">
                       {/* Mock QR */}
                       <div className="w-32 h-32 bg-white border-2 border-chocolate-200 p-2 rounded-lg flex items-center justify-center">
                          <div className="w-full h-full bg-chocolate-900 opacity-80" style={{backgroundImage: 'radial-gradient(white 2px, transparent 0)', backgroundSize: '10px 10px'}}></div>
                       </div>
                    </div>
                    
                    <div className="flex justify-center gap-4">
                       <div className="px-3 py-1 bg-purple-600 text-white rounded font-bold text-xs shadow-sm">Yape</div>
                       <div className="px-3 py-1 bg-cyan-500 text-white rounded font-bold text-xs shadow-sm">Plin</div>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-2">
                      Una vez realizado el pago, haz clic en "Confirmar Pago".
                    </p>
                  </div>
                )}

                {paymentMethod === 'cash' && (
                  <div className="flex items-start gap-3">
                    <Truck className="text-chocolate-500 flex-shrink-0" size={24} />
                    <p className="text-sm text-chocolate-700">
                      Pagarás en efectivo al momento de recibir tu pedido. Por favor ten el monto exacto para facilitar la entrega.
                    </p>
                  </div>
                )}
              </div>
            </section>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-chocolate-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-chocolate-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Procesando...
                </>
              ) : (
                <>
                  {paymentMethod === 'wallet' ? 'Confirmar Pago' : `Pagar $${(total + 50).toFixed(2)}`}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};