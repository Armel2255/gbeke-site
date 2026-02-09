
import React, { useState } from 'react';
import { WHATSAPP_NUMBER, DELIVERY_FREE_THRESHOLD, DELIVERY_ZONES_GRATUITES } from '../constants';
import { Order, Product } from '../types';

interface Props {
  products: Product[];
}

// Configuration des produits liés obligatoirement
const LINKED_PRODUCTS: Record<string, { label: string; price: number; id: string }> = {
  'baca': { 
    label: 'Galettes', 
    price: 200, 
    id: 'galette'
  },
  'gateau': { 
    label: 'Bissap', 
    price: 200, 
    id: 'bissap'
  }
};

const MatinProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [qty, setQty] = useState(1); // Quantité du produit principal
  
  // Vérifie si ce produit a un compagnon (Ex: Baka a Galette, Gâteau a Bissap)
  const linkedConfig = LINKED_PRODUCTS[product.id];
  const hasLinkedItem = !!linkedConfig;
  
  // Quantité du produit compagnon (démarre à 1 si obligatoire)
  const [linkedQty, setLinkedQty] = useState(hasLinkedItem ? 1 : 0);

  // Si c'est le Bissap ou la Galette (les produits esclaves), on change l'affichage
  if (product.id === 'bissap' || product.id === 'galette') {
    const parentName = product.id === 'bissap' ? 'Gâteaux Farine' : 'Le Baka';
    return (
      <div className="bg-gray-50 p-4 rounded-[2rem] flex items-center space-x-4 border border-gray-100 opacity-80 grayscale-[0.3]">
        <div className="w-20 h-20 rounded-3xl overflow-hidden flex-shrink-0 bg-gray-200">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-black text-gray-500 text-lg uppercase tracking-tighter">{product.name}</h3>
          <p className="text-[10px] text-brand-primary font-black uppercase mt-1 bg-brand-primary/10 inline-block px-2 py-1 rounded-lg">
            Se commande avec {parentName}
          </p>
        </div>
      </div>
    );
  }

  const increment = () => setQty(q => q + 1);
  const decrement = () => setQty(q => Math.max(1, q - 1));

  const incrementLinked = () => setLinkedQty(q => q + 1);
  const decrementLinked = () => setLinkedQty(q => Math.max(1, q - 1));

  const saveOrder = (finalTotal: number, itemString: string) => {
    const orders: Order[] = JSON.parse(localStorage.getItem('gbeke_orders') || '[]');
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: itemString,
      total: finalTotal,
      timestamp: Date.now(),
      type: 'matin'
    };
    localStorage.setItem('gbeke_orders', JSON.stringify([newOrder, ...orders]));
  };

  const handleOrder = () => {
    let total = product.price * qty;
    let itemsDescription = `${qty}x ${product.name}`;

    // Logique pour les produits liés
    if (hasLinkedItem) {
      if (linkedQty < 1) {
        alert(`Impossible Chef ! Sans ${linkedConfig.label} ça marche pas !`);
        return;
      }
      const linkedTotal = linkedQty * linkedConfig.price;
      total += linkedTotal;
      itemsDescription += ` + ${linkedQty}x ${linkedConfig.label}`;
    }

    saveOrder(total, itemsDescription);
    
    // Détermination des frais de livraison
    const deliveryStatus = total >= DELIVERY_FREE_THRESHOLD 
      ? "GRATUIT (Commande > 1500F) ✅" 
      : `GRATUIT (Zone ${DELIVERY_ZONES_GRATUITES}) ou PAYANT ailleurs 🛵`;

    // Nouveau format de message WhatsApp
    const msg = `🛵 NOUVELLE COMMANDE - GBÊKÊ FOOD
👤 Client : [Votre Nom]
📞 Numéro : [Votre Numéro]
📝 Commande : ${itemsDescription}
💰 Total : ${total} F
📍 Lieu de livraison : [Indiquer votre lieu]
🚚 Frais : ${deliveryStatus}`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const currentTotal = (product.price * qty) + (hasLinkedItem ? (linkedQty * linkedConfig.price) : 0);

  // Structure spéciale pour Gâteaux Farine : Inversion visuelle demandée
  // On veut voir Bissap (200F) EN HAUT et Gâteaux (150F) EN BAS
  const isGateau = product.id === 'gateau';

  return (
    <div className="bg-white p-4 rounded-[2rem] flex items-center space-x-4 custom-shadow border border-gray-50 overflow-hidden group hover:border-brand-primary/20 transition-all duration-300">
      <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl overflow-hidden flex-shrink-0 bg-gray-100 relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          loading="lazy"
        />
        {qty > 1 && (
          <div className="absolute top-2 right-2 bg-brand-primary text-white w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-black shadow-lg">
            {qty}
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
        <div className="mb-2">
          <div className="flex justify-between items-start">
            <h3 className="font-black text-brand-text text-xl leading-none uppercase tracking-tighter">{product.name}</h3>
            {(currentTotal >= DELIVERY_FREE_THRESHOLD) && (
              <i className="fa-solid fa-truck-fast text-brand-secondary text-xs" title="Livraison offerte"></i>
            )}
          </div>
          <p className="text-brand-muted text-[10px] line-clamp-2 mt-1 font-bold italic">{product.desc}</p>
        </div>
        
        <div className="space-y-2">
          
          {/* SI C'EST GATEAU : On affiche BISSAP en premier (Haut) */}
          {isGateau && hasLinkedItem && (
             <div className="flex items-center justify-between bg-brand-primary/5 p-2 rounded-xl border border-brand-primary/10">
                <span className="text-[10px] font-black text-brand-text uppercase">{linkedConfig.label} ({linkedConfig.price}F)</span>
                <div className="flex items-center space-x-2">
                   <button onClick={decrementLinked} className="w-6 h-6 flex items-center justify-center bg-white rounded-lg shadow text-xs font-bold text-gray-400 hover:text-red-500">-</button>
                   <span className="text-xs font-black w-4 text-center">{linkedQty}</span>
                   <button onClick={incrementLinked} className="w-6 h-6 flex items-center justify-center bg-white rounded-lg shadow text-xs font-bold text-brand-secondary hover:text-green-600">+</button>
                </div>
             </div>
          )}

          {/* CONTROLE DU PRODUIT PRINCIPAL (Baka ou Gâteaux) */}
          {/* Pour Gâteaux, ceci s'affichera EN BAS du Bissap */}
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded-xl">
             <span className="text-[10px] font-black text-gray-500 uppercase">
               {product.name} ({product.price}F)
             </span>
             <div className="flex items-center space-x-2">
               <button onClick={decrement} className="w-6 h-6 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-500 hover:text-brand-primary font-bold">-</button>
               <span className="w-4 text-center font-black text-xs">{qty}</span>
               <button onClick={increment} className="w-6 h-6 flex items-center justify-center bg-brand-text text-white rounded-lg shadow-sm font-bold">+</button>
             </div>
          </div>

          {/* SI C'EST BAKA : On affiche GALETTE en dessous (Classique) */}
          {!isGateau && hasLinkedItem && (
            <div className="flex items-center justify-between bg-brand-primary/5 p-2 rounded-xl border border-brand-primary/10">
                <span className="text-[10px] font-black text-brand-text uppercase">{linkedConfig.label} ({linkedConfig.price}F)</span>
                <div className="flex items-center space-x-2">
                   <button onClick={decrementLinked} className="w-6 h-6 flex items-center justify-center bg-white rounded-lg shadow text-xs font-bold text-gray-400 hover:text-red-500">-</button>
                   <span className="text-xs font-black w-4 text-center">{linkedQty}</span>
                   <button onClick={incrementLinked} className="w-6 h-6 flex items-center justify-center bg-white rounded-lg shadow text-xs font-bold text-brand-secondary hover:text-green-600">+</button>
                </div>
             </div>
          )}

          {/* BOUTON COMMANDER ET TOTAL */}
          <div className="flex items-center justify-between pt-1">
             <div className="flex flex-col leading-none">
               <span className="text-[8px] text-gray-400 font-bold uppercase">Total Duo</span>
               <span className="text-brand-secondary font-black text-lg">{currentTotal} F</span>
             </div>
             <button 
               onClick={handleOrder}
               className="bg-brand-primary text-white py-2 px-4 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-brand-primary/30 active:scale-95 transition-transform"
             >
               Commander
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

const MatinSection: React.FC<Props> = ({ products }) => {
  return (
    <section className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-lg md:text-2xl font-black text-brand-text uppercase tracking-tight">Petit Déj' Bouaké</h2>
        <span className="text-[9px] bg-brand-primary text-white px-3 py-1.5 rounded-full font-black uppercase tracking-widest">Frais du jour</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {products.map((product) => (
          <MatinProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default MatinSection;
