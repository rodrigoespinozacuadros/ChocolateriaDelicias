import React, { useState } from 'react';
import { Instagram, Facebook, Twitter, Heart, Coffee } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-chocolate-900 text-chocolate-200 py-16 px-6 border-t border-chocolate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-chocolate-700 p-2 rounded-full">
               <Coffee size={24} />
            </div>
            <span className="font-serif font-bold text-2xl tracking-tighter">
              Chocolatería<span className="text-gold-500">Delicias</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-chocolate-300">
            Creando momentos de felicidad a través del chocolate artesanal desde 1985. 
            Pasión en cada ingrediente, amor en cada detalle.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gold-500 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-gold-500 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-gold-500 transition-colors"><Twitter size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 font-serif text-lg">Explorar</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-gold-400 transition-colors">Nuestra Historia</a></li>
            <li><a href="#" className="hover:text-gold-400 transition-colors">Colección de Trufas</a></li>
            <li><a href="#" className="hover:text-gold-400 transition-colors">Barras de Origen</a></li>
            <li><a href="#" className="hover:text-gold-400 transition-colors">Regalos Corporativos</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 font-serif text-lg">Ayuda</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-gold-400 transition-colors">Envíos y Entregas</a></li>
            <li><a href="#" className="hover:text-gold-400 transition-colors">Política de Devolución</a></li>
            <li><a href="#" className="hover:text-gold-400 transition-colors">Cuidado del Chocolate</a></li>
            <li><a href="#" className="hover:text-gold-400 transition-colors">Preguntas Frecuentes</a></li>
          </ul>
        </div>

        <div>
           <h4 className="text-white font-bold mb-6 font-serif text-lg">Boletín</h4>
           <p className="text-sm mb-4 text-chocolate-300">Suscríbete para recibir noticias dulces y ofertas exclusivas.</p>
           <form className="flex flex-col gap-2">
             <input 
               type="email" 
               placeholder="Tu correo electrónico" 
               className="bg-chocolate-800 border border-chocolate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gold-500 transition-colors text-white"
             />
             <button className="bg-gold-500 text-chocolate-900 font-bold py-2 rounded-lg hover:bg-gold-400 transition-colors text-sm">
               Suscribirse
             </button>
           </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-chocolate-800 text-center text-xs text-chocolate-400 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2024 Chocolatería Delicias. Todos los derechos reservados.</p>
        <p className="flex items-center gap-1">
          Hecho con <Heart size={12} className="text-red-500 fill-current" /> para los amantes del chocolate.
        </p>
      </div>
    </footer>
  );
};