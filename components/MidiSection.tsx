
import React from 'react';
import ConfiguratorCard from './ConfiguratorCard';
import { DEBOUT_ATTIEKE, DEBOUT_POISSON, COULE_ATTIEKE, COULE_POISSON, DEFAULT_IMAGES } from '../constants';

const MidiSection: React.FC<{ images: typeof DEFAULT_IMAGES }> = ({ images }) => {
  return (
    <div className="space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="text-center px-4 space-y-1">
        <h2 className="text-2xl font-black text-brand-text uppercase tracking-tighter">L'heure du Garba 🥘</h2>
        <p className="text-[10px] text-brand-muted font-bold uppercase tracking-widest">Le vrai goût de Gbêkê</p>
      </div>
      
      <div className="space-y-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 px-2">
            <span className="h-2 w-2 bg-brand-primary rounded-full animate-pulse"></span>
            <span className="text-xs font-black text-brand-primary uppercase tracking-wider">Option "Les Debout" (V.I.P)</span>
          </div>
          <ConfiguratorCard 
            id="garba_debout"
            title="Garba des Debout"
            type="midi"
            image={images.garba_debout}
            optionsA={{
              label: "Grosse Mise Attiéké",
              items: DEBOUT_ATTIEKE
            }}
            optionsB={{
              label: "Gros Poisson",
              items: DEBOUT_POISSON
            }}
            generateMessage={(attieke, poisson) => 
              `Bonjour Chef ! Je suis "Debout" aujourd'hui. Faites-moi un Garba de ${attieke} F d'attiéké et ${poisson} F de poisson. Total: ${attieke + poisson} F.`
            }
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2 px-2">
            <span className="h-2 w-2 bg-brand-secondary rounded-full"></span>
            <span className="text-xs font-black text-brand-secondary uppercase tracking-wider">Option "Les Coulé" (Sauvetage)</span>
          </div>
          <ConfiguratorCard 
            id="garba_coule"
            title="Garba des Coulé"
            type="midi"
            image={images.garba_coule}
            optionsA={{
              label: "Mise Attiéké",
              items: COULE_ATTIEKE
            }}
            optionsB={{
              label: "Petit Poisson",
              items: COULE_POISSON
            }}
            generateMessage={(attieke, poisson) => 
              `Bonjour, c'est "Coulé" sur moi ! Garba rapide : ${attieke} F d'attiéké et ${poisson} F de poisson. On gère ça à ${attieke + poisson} F.`
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MidiSection;
