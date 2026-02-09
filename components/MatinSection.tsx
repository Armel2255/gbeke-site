
import React from 'react';
import { MATIN_PRODUCTS, WHATSAPP_NUMBER, DEFAULT_IMAGES, DELIVERY_FREE_THRESHOLD, DELIVERY_LOCATIONS } from '../constants';
import { Order } from '../types';

const MatinSection: React.FC<{ images: typeof DEFAULT_IMAGES }> = ({ images }) => {
  const saveOrder = (product: any) => {
    const orders: Order[] = JSON.parse(localStorage.getItem('gbeke_orders') || '[]');
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: product.name,
      total: product.price,
      timestamp: Date.now(),
      type: 'matin'
    };
    localStorage.setItem('gbeke_orders', JSON.stringify([newOrder, ...orders]));
  };

  const handleOrder = (product: any) => {
    saveOrder(product);
    let msg = `Bonjour ! Je veux commander : ${product.name} (${product.price} F).`;
    if (product.price >= DELIVERY_FREE_THRESHOLD) {
      msg += ` Livraison gratuite sur ${DELIVERY_LOCATIONS} ?`;
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-lg font-black text-brand-text uppercase tracking-tight">Petit Déj' Bouaké</h2>
        <span className="text-[9px] bg-brand-primary text-white px-3 py-1.5 rounded-full font-black uppercase tracking-widest">Frais du jour</span>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {MATIN_PRODUCTS.map((product) => (
          <div 
            key={product.id}
            className="bg-white p-4 rounded-[2rem] flex items-center space-x-4 custom-shadow border border-gray-50 overflow-hidden"
          >
            <div className="w-24 h-24 rounded-3xl overflow-hidden flex-shrink-0 bg-gray-100">
              <img 
                src={(images as any)[product.id] || product.image} 
                alt={product.name}
                className="w-full h-full object-cover" 
                loading="lazy"
                decoding="async"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-black text-brand-text text-lg leading-tight uppercase tracking-tighter">{product.name}</h3>
                {product.price >= DELIVERY_FREE_THRESHOLD && (
                   <i className="fa-solid fa-truck-fast text-brand-secondary text-xs" title="Livraison offerte"></i>
                )}
              </div>
              <p className="text-brand-muted text-[11px] line-clamp-2 mt-1 font-medium italic">{product.desc}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-brand-secondary font-black text-sm">{product.price} F</span>
                <button 
                  onClick={() => handleOrder(product)}
                  aria-label={`Commander ${product.name}`}
                  className="bg-brand-primary text-white py-2 px-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-colors active:scale-95 shadow-lg shadow-brand-primary/20"
                >
                  Commander
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MatinSection;
