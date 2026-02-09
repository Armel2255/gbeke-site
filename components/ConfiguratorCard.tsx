
import React, { useState, useEffect } from 'react';
import { ConfigOption, Order } from '../types';
import { WHATSAPP_NUMBER, DELIVERY_FREE_THRESHOLD, DELIVERY_LOCATIONS } from '../constants';

interface ConfiguratorCardProps {
  id: string;
  title: string;
  image: string;
  type: 'midi' | 'soir';
  optionsA: {
    label: string;
    items: ConfigOption[];
  };
  optionsB: {
    label: string;
    items: ConfigOption[];
  };
  generateMessage: (valA: number, valB: number) => string;
}

const ConfiguratorCard: React.FC<ConfiguratorCardProps> = ({ 
  id,
  title, 
  image, 
  type,
  optionsA, 
  optionsB,
  generateMessage 
}) => {
  const [valA, setValA] = useState<number>(optionsA.items[0].value);
  const [valB, setValB] = useState<number>(optionsB.items[0].value);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(valA + valB);
  }, [valA, valB]);

  const saveOrder = () => {
    const orders: Order[] = JSON.parse(localStorage.getItem('gbeke_orders') || '[]');
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: `${title} (${valA} + ${valB})`,
      total: total,
      timestamp: Date.now(),
      type: type
    };
    localStorage.setItem('gbeke_orders', JSON.stringify([newOrder, ...orders]));
  };

  const handleOrder = () => {
    saveOrder();
    let text = generateMessage(valA, valB);
    if (total >= DELIVERY_FREE_THRESHOLD) {
      text += ` (Livraison gratuite demandée pour Campus/Commerce)`;
    }
    const message = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const isFreeDelivery = total >= DELIVERY_FREE_THRESHOLD;

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden custom-shadow border border-gray-100">
      <div className="h-48 w-full relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-text/90 via-transparent to-transparent flex items-end p-6">
          <h3 className="text-white text-2xl font-black italic uppercase tracking-tighter">{title}</h3>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="space-y-4">
          <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] flex items-center">
            <span className="w-1.5 h-1.5 bg-brand-primary rounded-full mr-2"></span>
            {optionsA.label}
          </label>
          <div className="flex flex-wrap gap-2">
            {optionsA.items.map((item) => (
              <button
                key={item.label}
                onClick={() => setValA(item.value)}
                className={`flex-1 min-w-[80px] py-4 px-2 rounded-2xl border-2 text-xs font-black transition-all active:scale-95 ${
                  valA === item.value 
                  ? 'bg-brand-primary border-brand-primary text-white shadow-lg' 
                  : 'bg-white border-gray-100 text-brand-muted hover:border-brand-primary/20'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] flex items-center">
            <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full mr-2"></span>
            {optionsB.label}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {optionsB.items.map((item) => (
              <button
                key={item.label}
                onClick={() => setValB(item.value)}
                className={`py-4 px-2 rounded-2xl border-2 text-xs font-black transition-all active:scale-95 ${
                  valB === item.value 
                  ? 'bg-brand-secondary border-brand-secondary text-white shadow-lg' 
                  : 'bg-white border-gray-100 text-brand-muted hover:border-brand-secondary/20'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t-2 border-dashed border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase text-brand-muted tracking-widest">Total à payer</span>
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-black text-brand-text leading-none">{total} <span className="text-xs font-bold text-brand-primary">F</span></span>
              </div>
            </div>
            {isFreeDelivery && (
              <div className="bg-brand-secondary/10 border border-brand-secondary/20 px-3 py-1.5 rounded-full animate-bounce">
                <span className="text-[10px] font-black text-brand-secondary uppercase tracking-tight">
                  <i className="fa-solid fa-truck-fast mr-1"></i> Livraison Offerte
                </span>
              </div>
            )}
          </div>
          
          <button 
            onClick={handleOrder}
            className="w-full bg-brand-secondary text-white h-16 rounded-full font-black flex items-center justify-center space-x-3 active:scale-95 transition-all shadow-xl shadow-brand-secondary/30"
          >
            <span className="text-sm uppercase tracking-tighter">Passer la commande</span>
            <i className="fa-brands fa-whatsapp text-2xl"></i>
          </button>
          
          <p className="text-[9px] text-center text-brand-muted mt-3 font-medium">
            Gratuit pour {DELIVERY_LOCATIONS} dès {DELIVERY_FREE_THRESHOLD} F
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfiguratorCard;
