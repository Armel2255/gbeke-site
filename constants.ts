
import { Product } from './types';

export const WHATSAPP_NUMBER = '2250101010101'; 
export const DELIVERY_FREE_THRESHOLD = 500;
export const DELIVERY_LOCATIONS = "Campus 1, Campus 2 et Commerce";

export const DEFAULT_IMAGES = {
  baca: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=400',
  galette: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=400',
  gateau: 'https://images.unsplash.com/photo-1599490659223-e153c07ea4c4?auto=format&fit=crop&w=400',
  bissap: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=400',
  garba_debout: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=800',
  garba_coule: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800',
  porc: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800',
  panini: 'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&w=800'
};

export const MATIN_PRODUCTS: Product[] = [
  { id: 'baca', name: 'Le Baka', price: 200, image: DEFAULT_IMAGES.baca, desc: 'Bouillie de mil traditionnelle' },
  { id: 'galette', name: 'Galettes', price: 100, image: DEFAULT_IMAGES.galette, desc: 'Galettes de farine frites' },
  { id: 'gateau', name: 'Gâteaux Coco', price: 50, image: DEFAULT_IMAGES.gateau, desc: 'Beignets sucrés' },
  { id: 'bissap', name: 'Bissap Glacé', price: 250, image: DEFAULT_IMAGES.bissap, desc: 'Jus de fleurs d\'hibiscus' },
];

export const MIDI_PRODUCTS: Product[] = [
  { id: 'garba_debout', name: 'Garba "Les Debout"', price: 1500, image: DEFAULT_IMAGES.garba_debout, desc: 'Portion VIP pour les boss' },
  { id: 'garba_coule', name: 'Garba "Les Coulé"', price: 400, image: DEFAULT_IMAGES.garba_coule, desc: 'Le sauvetage des étudiants' }
];

export const SOIR_PRODUCTS: Product[] = [
  { id: 'porc', name: 'Porc au Four', price: 1000, image: DEFAULT_IMAGES.porc, desc: 'Viande grillée assaisonnée' },
  { id: 'panini', name: 'Panini Chaud', price: 1500, image: DEFAULT_IMAGES.panini, desc: 'Sandwich pressé garni' }
];

export const DEBOUT_ATTIEKE = [{ label: '300 F', value: 300 }, { label: '400 F', value: 400 }, { label: '500 F', value: 500 }];
export const DEBOUT_POISSON = [{ label: '800 F', value: 800 }, { label: '1000 F', value: 1000 }, { label: '1200 F', value: 1200 }, { label: '1500 F', value: 1500 }];
export const COULE_ATTIEKE = [{ label: '100 F', value: 100 }, { label: '150 F', value: 150 }, { label: '200 F', value: 200 }];
export const COULE_POISSON = [{ label: '200 F', value: 200 }, { label: '300 F', value: 300 }, { label: '400 F', value: 400 }];
export const PORC_OPTIONS = [{ label: '500 F', value: 500 }, { label: '1000 F', value: 1000 }, { label: '2000 F', value: 2000 }];
export const PANINI_OPTIONS = [{ label: 'Poulet', value: 1500 }, { label: 'Viande', value: 1500 }, { label: 'Mixte', value: 2000 }];
