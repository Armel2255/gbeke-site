
import React, { useState } from 'react';
import { Order, ConfigOption } from '../types';
import { WHATSAPP_NUMBER, DELIVERY_FREE_THRESHOLD, DELIVERY_ZONES_GRATUITES } from '../constants';

interface Props {
  id: string; title: string; image: string; type: 'midi' | 'soir';
  optionsA: { label: string; items: ConfigOption[] };
  optionsB?: { label: string; items: ConfigOption[] }; // Option B facultative maintenant
  generateMessage: (a: number, b: number, qty: number) => string;
}

const ConfiguratorCard: React.FC<Props> = ({ id, title, image, type, optionsA, optionsB, generateMessage }) => {
  const [valA, setValA] = useState(optionsA.items[0].value);
  const [valB, setValB] = useState(optionsB ? optionsB.items[0].value : 0);
  const [qty, setQty] = useState(1);

  const totalUnit = valA + (optionsB ? valB : 0);
  const total = totalUnit * qty;

  const increment = () => setQty(q => q + 1);
  const decrement = () => setQty(q => Math.max(1, q - 1));

  const handleOrder = () => {
    const orders = JSON.parse(localStorage.getItem('gbeke_orders') || '[]');
    const newOrder: Order = { id: Math.random().toString(36).substr(2,9), items: `${title} (x${qty})`, total, timestamp: Date.now(), type };
    localStorage.setItem('gbeke_orders', JSON.stringify([newOrder, ...orders]));
    
    // On génère la description des articles
    const itemDetails = generateMessage(valA, valB, qty);

    // Détermination des frais de livraison
    const deliveryStatus = total >= DELIVERY_FREE_THRESHOLD 
      ? "GRATUIT (Commande > 1500F) ✅" 
      : `GRATUIT (Zone ${DELIVERY_ZONES_GRATUITES}) ou PAYANT ailleurs 🛵`;

    // Nouveau format de message WhatsApp unifié
    const msg = `🛵 NOUVELLE COMMANDE - GBÊKÊ FOOD
👤 Client : [Votre Nom]
📞 Numéro : [Votre Numéro]
📝 Commande : ${itemDetails}
💰 Total : ${total} F
📍 Lieu de livraison : [Indiquer votre lieu]
🚚 Frais : ${deliveryStatus}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden custom-shadow border border-gray-100 p-2 flex flex-col lg:flex-row h-full">
      <div className="h-44 lg:h-auto lg:w-5/12 rounded-[2rem] overflow-hidden relative shrink-0">
        <img src={image} className="w-full h-full object-cover" alt={title} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <h3 className="text-white font-black text-xl italic uppercase tracking-tighter leading-none">
            {title}
            <span className="block text-[10px] opacity-70 mt-1 not-italic font-sans">Quantité : {qty}</span>
          </h3>
        </div>
      </div>
      
      <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Options A */}
          <div className="space-y-3">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{optionsA.label}</p>
            <div className="flex flex-wrap gap-2">
              {optionsA.items.map(i => (
                <button key={i.label} onClick={() => setValA(i.value)} className={`flex-1 py-3 px-2 rounded-xl border-2 text-[11px] font-black transition-all whitespace-nowrap ${valA === i.value ? 'bg-brand-primary border-brand-primary text-white' : 'border-gray-50 text-gray-400 hover:border-gray-200'}`}>
                  {i.label}
                </button>
              ))}
            </div>
          </div>

          {/* Options B (Conditionnel) */}
          {optionsB && (
            <div className="space-y-3">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{optionsB.label}</p>
              <div className="grid grid-cols-2 gap-2">
                {optionsB.items.map(i => (
                  <button key={i.label} onClick={() => setValB(i.value)} className={`py-3 px-2 rounded-xl border-2 text-[11px] font-black transition-all whitespace-nowrap ${valB === i.value ? 'bg-brand-secondary border-brand-secondary text-white' : 'border-gray-50 text-gray-400 hover:border-gray-200'}`}>
                    {i.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="pt-6 border-t-2 border-dashed border-gray-50 space-y-4">
          {/* Sélecteur de quantité */}
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded-2xl">
             <span className="text-[10px] font-black text-gray-400 uppercase ml-2">Nombre de plats</span>
             <div className="flex items-center space-x-3">
                <button onClick={decrement} className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm text-gray-500 hover:text-brand-primary font-bold">-</button>
                <span className="font-black text-sm w-4 text-center">{qty}</span>
                <button onClick={increment} className="w-8 h-8 flex items-center justify-center bg-brand-text text-white rounded-xl shadow-sm font-bold">+</button>
             </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase">Total à payer</p>
              <p className="text-3xl font-black text-brand-secondary">{total} F</p>
            </div>
            <button onClick={handleOrder} className="bg-brand-primary text-white py-4 px-8 rounded-2xl font-black text-xs uppercase shadow-xl shadow-brand-primary/20 active:scale-95 hover:bg-orange-600 transition-all">
              Commander
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguratorCard;
