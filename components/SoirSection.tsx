
import React from 'react';
import ConfiguratorCard from './ConfiguratorCard';
import { PORC_OPTIONS, PANINI_OPTIONS } from '../constants';
import { Product } from '../types';

const SoirSection: React.FC<{ products: Product[] }> = ({ products }) => {
  const getProduct = (id: string) => products.find(p => p.id === id) || { name: 'Produit', image: '', price: 0 };
  
  const porc = getProduct('porc');
  const panini = getProduct('panini');

  return (
    <div className="space-y-6 md:space-y-10 pb-24 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-lg md:text-2xl font-bold text-brand-text">C'est la fête au village ! 🌙</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 max-w-5xl mx-auto">
        <ConfiguratorCard 
          id="porc"
          type="soir"
          title={porc.name}
          image={porc.image}
          optionsA={{
            label: "Mise de Porc",
            items: PORC_OPTIONS
          }}
          optionsB={{
            label: "Accompagnement",
            items: [{label: 'Attiéké', value: 200}, {label: 'Simple', value: 0}]
          }}
          generateMessage={(p, acc, qty) => 
            `${qty}x ${porc.name} à ${p}F (${acc > 0 ? 'avec Attiéké +200F' : 'Viande Simple'})`
          }
        />

        <ConfiguratorCard 
          id="panini"
          type="soir"
          title={panini.name}
          image={panini.image}
          optionsA={{
            label: "Choix du Panini (500F)",
            items: PANINI_OPTIONS
          }}
          // Options B supprimé pour le Panini selon la demande
          generateMessage={(pan, _, qty) => 
            `${qty}x ${panini.name} (${pan === 1000 ? 'Mixte +500F' : 'Simple'})`
          }
        />
      </div>
    </div>
  );
};

export default SoirSection;
