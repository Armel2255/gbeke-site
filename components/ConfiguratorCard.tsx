
import React, { useState, useEffect } from 'react';
import { Order, ConfigOption } from '../types';
import { WHATSAPP_NUMBER, DELIVERY_FREE_THRESHOLD } from '../constants';

interface Props {
  id: string; title: string; image: string; type: 'midi' | 'soir';
  optionsA: { label: string; items: ConfigOption[] };
  optionsB: { label: string; items: ConfigOption[] };
  generateMessage: (a: number, b: number) => string;
}

const ConfiguratorCard: React.FC<Props> = ({ id, title, image, type, optionsA, optionsB, generateMessage }) => {
  const [valA, setValA] = useState(optionsA.items[0].value);
  const [valB, setValB] = useState(optionsB.items[0].value);
  const total = valA + valB;

  const handleOrder = () => {
    const orders = JSON.parse(localStorage.getItem('gbeke_orders') || '[]');
    const newOrder: Order = { id: Math.random().toString(36).substr(2,9), items: title, total, timestamp: Date.now(), type };
    localStorage.setItem('gbeke_orders', JSON.stringify([newOrder, ...orders]));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(generateMessage(valA, valB))}`, '_blank');
  };

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden custom-shadow border border-gray-100 p-2">
      <div className="h-44 rounded-[2rem] overflow-hidden relative">
        <img src={image} className="w-full h-full object-cover" alt={title} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <h3 className="text-white font-black text-xl italic uppercase tracking-tighter">{title}</h3>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div className="space-y-3">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{optionsA.label}</p>
          <div className="flex flex-wrap gap-2">
            {optionsA.items.map(i => (
              <button key={i.label} onClick={() => setValA(i.value)} className={`flex-1 py-3 px-2 rounded-xl border-2 text-[11px] font-black transition-all ${valA === i.value ? 'bg-brand-primary border-brand-primary text-white' : 'border-gray-50 text-gray-400'}`}>
                {i.label}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{optionsB.label}</p>
          <div className="grid grid-cols-2 gap-2">
            {optionsB.items.map(i => (
              <button key={i.label} onClick={() => setValB(i.value)} className={`py-3 px-2 rounded-xl border-2 text-[11px] font-black transition-all ${valB === i.value ? 'bg-brand-secondary border-brand-secondary text-white' : 'border-gray-50 text-gray-400'}`}>
                {i.label}
              </button>
            ))}
          </div>
        </div>
        <div className="pt-6 border-t-2 border-dashed border-gray-50 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black text-gray-400 uppercase">Total</p>
            <p className="text-2xl font-black">{total} F</p>
          </div>
          <button onClick={handleOrder} className="bg-brand-secondary text-white py-4 px-8 rounded-2xl font-black text-xs uppercase shadow-xl active:scale-95 transition-all">Commander</button>
        </div>
      </div>
    </div>
  );
};

export default ConfiguratorCard;
