
import React from 'react';
import { DELIVERY_FREE_THRESHOLD, DELIVERY_ZONES_GRATUITES } from '../constants';
import { Product } from '../types';

interface Props {
  products: { matin: Product[], midi: Product[], soir: Product[] };
}

const MenuComplet: React.FC<Props> = ({ products }) => {
  const sections = [
    { title: "Petit Matin à Gbêkê", data: products.matin, color: "bg-brand-primary", icon: "☀️" },
    { title: "Le Midi (Garba)", data: products.midi, color: "bg-brand-secondary", icon: "🥘" },
    { title: "La Soirée (Le Gbi)", data: products.soir, color: "bg-brand-text", icon: "🌙" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-4xl font-black text-brand-text">La Carte de Bouaké</h2>
        <p className="text-[10px] md:text-xs text-brand-muted font-black uppercase tracking-[0.2em]">Sélection Gbêkê • 100% Frais</p>
      </div>

      <div className="bg-white p-5 md:p-8 rounded-[2.5rem] border border-brand-secondary/20 border-dashed text-center custom-shadow relative overflow-hidden group max-w-3xl mx-auto">
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform">
           <i className="fa-solid fa-truck-fast text-4xl text-brand-secondary"></i>
        </div>
        <div className="relative z-10 space-y-2">
           <h3 className="text-sm font-black text-brand-secondary uppercase">🎁 Le Sauvetage de Bouaké</h3>
           
           <div className="bg-brand-secondary/10 p-3 rounded-2xl">
             <p className="text-xs font-black text-brand-secondary uppercase">Gratuit pour :</p>
             <p className="text-xl font-black text-brand-text leading-none mt-1">{DELIVERY_ZONES_GRATUITES}</p>
           </div>
           
           <div className="flex items-center justify-center space-x-2">
             <span className="h-px w-8 bg-gray-300"></span>
             <p className="text-[10px] text-gray-400 font-bold uppercase">Ou</p>
             <span className="h-px w-8 bg-gray-300"></span>
           </div>

           <p className="text-xs md:text-sm font-bold text-gray-500 uppercase">
             Livraison 0 FCFA partout ailleurs dès <span className="text-brand-secondary font-black">{DELIVERY_FREE_THRESHOLD} F</span>
           </p>
        </div>
      </div>

      {sections.map((section) => (
        <div key={section.title} className="space-y-4">
          <div className="flex items-center justify-between px-2 border-b border-gray-100 pb-2">
            <div className="flex items-center space-x-3">
              <span className={`h-1.5 w-10 rounded-full ${section.color}`}></span>
              <h3 className="font-bold text-brand-text uppercase text-xs md:text-sm tracking-wider">{section.title}</h3>
            </div>
            <span className="text-lg">{section.icon}</span>
          </div>
          
          {/* Responsive Grid: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {section.data.map((item) => (
              <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden custom-shadow border border-gray-100 flex flex-col group hover:-translate-y-1 transition-all duration-300">
                <div className="h-32 md:h-40 w-full relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  {item.id.includes('debout') && (
                    <span className="absolute top-2 right-2 bg-brand-primary text-white text-[8px] font-black px-2 py-1 rounded-full uppercase">VIP</span>
                  )}
                  {item.id.includes('coule') && (
                    <span className="absolute top-2 right-2 bg-brand-secondary text-white text-[8px] font-black px-2 py-1 rounded-full uppercase">Eco</span>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-black text-[13px] md:text-sm text-brand-text leading-tight uppercase tracking-tighter">{item.name}</h4>
                    <p className="text-[9px] md:text-[10px] text-brand-muted mt-1 font-medium italic line-clamp-2">{item.desc}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <span className={`font-black text-xs ${item.id.includes('coule') ? 'text-brand-secondary' : 'text-brand-primary'}`}>
                      Dès {item.price} F
                    </span>
                    <i className="fa-solid fa-arrow-right text-[10px] text-gray-300 group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuComplet;
