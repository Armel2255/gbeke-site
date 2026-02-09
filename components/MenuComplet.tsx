
import React from 'react';
import { MATIN_PRODUCTS, MIDI_PRODUCTS, SOIR_PRODUCTS, DEFAULT_IMAGES, DELIVERY_FREE_THRESHOLD, DELIVERY_LOCATIONS } from '../constants';

const MenuComplet: React.FC<{ images: typeof DEFAULT_IMAGES }> = ({ images }) => {
  const sections = [
    { title: "Petit Matin à Gbêkê", data: MATIN_PRODUCTS, color: "bg-brand-primary", icon: "☀️" },
    { title: "Le Midi (Garba)", data: MIDI_PRODUCTS, color: "bg-brand-secondary", icon: "🥘" },
    { title: "La Soirée (Le Gbi)", data: SOIR_PRODUCTS, color: "bg-brand-text", icon: "🌙" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-brand-text">La Carte de Bouaké</h2>
        <p className="text-[10px] text-brand-muted font-black uppercase tracking-[0.2em]">Sélection Gbêkê • 100% Frais</p>
      </div>

      <div className="bg-white p-5 rounded-[2.5rem] border border-brand-secondary/20 border-dashed text-center custom-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform">
           <i className="fa-solid fa-truck-fast text-4xl text-brand-secondary"></i>
        </div>
        <p className="text-xs font-bold text-brand-secondary leading-tight uppercase relative z-10">
          🎁 Le Sauvetage de Bouaké : <br/>
          <span className="text-lg font-black">LIVRAISON 0 FCFA</span> <br/>
          <span className="text-[9px] text-brand-muted tracking-widest font-black">Vers {DELIVERY_LOCATIONS} dès {DELIVERY_FREE_THRESHOLD} F !</span>
        </p>
      </div>

      {sections.map((section) => (
        <div key={section.title} className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-3">
              <span className={`h-1.5 w-10 rounded-full ${section.color}`}></span>
              <h3 className="font-bold text-brand-text uppercase text-xs tracking-wider">{section.title}</h3>
            </div>
            <span className="text-lg">{section.icon}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {section.data.map((item) => (
              <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden custom-shadow border border-gray-100 flex flex-col group active:scale-95 transition-transform">
                <div className="h-32 w-full relative">
                  <img src={(images as any)[item.id] || item.image} alt={item.name} className="w-full h-full object-cover" />
                  {item.id.includes('debout') && (
                    <span className="absolute top-2 right-2 bg-brand-primary text-white text-[8px] font-black px-2 py-1 rounded-full uppercase">VIP</span>
                  )}
                  {item.id.includes('coule') && (
                    <span className="absolute top-2 right-2 bg-brand-secondary text-white text-[8px] font-black px-2 py-1 rounded-full uppercase">Eco</span>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-black text-[13px] text-brand-text leading-tight uppercase tracking-tighter">{item.name}</h4>
                    <p className="text-[9px] text-brand-muted mt-1 font-medium italic line-clamp-2">{item.desc}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <span className={`font-black text-xs ${item.id.includes('coule') ? 'text-brand-secondary' : 'text-brand-primary'}`}>
                      Dès {item.price} F
                    </span>
                    <i className="fa-solid fa-arrow-right text-[10px] text-gray-300"></i>
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
