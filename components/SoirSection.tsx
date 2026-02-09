
import React from 'react';
import ConfiguratorCard from './ConfiguratorCard';
import { PORC_OPTIONS, PANINI_OPTIONS, DEFAULT_IMAGES } from '../constants';

const SoirSection: React.FC<{ images: typeof DEFAULT_IMAGES }> = ({ images }) => {
  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-lg font-bold text-brand-text">C'est la fête au village ! 🌙</h2>
      </div>
      
      <div className="space-y-8">
        {/* Fix: Added required 'id' and 'type' props to ConfiguratorCard to satisfy the component's interface */}
        <ConfiguratorCard 
          id="porc"
          type="soir"
          title="Porc au Four Grillé"
          image={images.porc}
          optionsA={{
            label: "Mise de Porc",
            items: PORC_OPTIONS
          }}
          optionsB={{
            label: "Accompagnement",
            items: [{label: 'Attiéké', value: 200}, {label: 'Pain', value: 100}, {label: 'Alloco', value: 500}]
          }}
          generateMessage={(porc, acc) => `Bonsoir ! Porc de ${porc} F avec accompagnement. Vite !`}
        />

        {/* Fix: Added required 'id' and 'type' props to ConfiguratorCard to satisfy the component's interface */}
        <ConfiguratorCard 
          id="panini"
          type="soir"
          title="Panini Chaud"
          image={images.panini}
          optionsA={{
            label: "Type de Panini",
            items: PANINI_OPTIONS
          }}
          optionsB={{
            label: "Suppléments",
            items: [{label: 'Frites', value: 500}, {label: 'Fromage', value: 200}, {label: 'Simple', value: 0}]
          }}
          generateMessage={(pan, sup) => `Bonsoir ! Un Panini type ${pan} F avec supplément. Merci !`}
        />
      </div>
    </div>
  );
};

export default SoirSection;
