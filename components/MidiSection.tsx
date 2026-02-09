
import React from 'react';
import ConfiguratorCard from './ConfiguratorCard';
import { DEBOUT_ATTIEKE, DEBOUT_POISSON, COULE_ATTIEKE, COULE_POISSON } from '../constants';
import { Product } from '../types';

const MidiSection: React.FC<{ products: Product[] }> = ({ products }) => {
  const getProduct = (id: string) => products.find(p => p.id === id) || { name: 'Non trouvé', image: '', price: 0 };

  const debout = getProduct('garba_debout');
  const coule = getProduct('garba_coule');

  return (
    <div className="space-y-8 md:space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="text-center px-4 space-y-1">
        <h2 className="text-2xl md:text-4xl font-black text-brand-text uppercase tracking-tighter">L'heure du Garba 🥘</h2>
        <p className="text-[10px] md:text-xs text-brand-muted font-bold uppercase tracking-widest">Le vrai goût de Gbêkê</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 max-w-5xl mx-auto">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 px-2">
            <span className="h-2 w-2 bg-brand-primary rounded-full animate-pulse"></span>
            <span className="text-xs font-black text-brand-primary uppercase tracking-wider">Option "{debout.name}"</span>
          </div>
          <ConfiguratorCard 
            id="garba_debout"
            title={debout.name}
            type="midi"
            image={debout.image}
            optionsA={{
              label: "Grosse Mise Attiéké",
              items: DEBOUT_ATTIEKE
            }}
            optionsB={{
              label: "Gros Poisson",
              items: DEBOUT_POISSON
            }}
            generateMessage={(attieke, poisson, qty) => 
              `${qty}x ${debout.name} (Mise ${attieke}F + Poisson ${poisson}F)`
            }
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2 px-2">
            <span className="h-2 w-2 bg-brand-secondary rounded-full"></span>
            <span className="text-xs font-black text-brand-secondary uppercase tracking-wider">Option "{coule.name}"</span>
          </div>
          <ConfiguratorCard 
            id="garba_coule"
            title={coule.name}
            type="midi"
            image={coule.image}
            optionsA={{
              label: "Mise Attiéké",
              items: COULE_ATTIEKE
            }}
            optionsB={{
              label: "Petit Poisson",
              items: COULE_POISSON
            }}
            generateMessage={(attieke, poisson, qty) => 
              `${qty}x ${coule.name} (Mise ${attieke}F + Poisson ${poisson}F)`
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MidiSection;
