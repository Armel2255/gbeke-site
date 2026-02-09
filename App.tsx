
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MatinSection from './components/MatinSection';
import MidiSection from './components/MidiSection';
import SoirSection from './components/SoirSection';
import MenuComplet from './components/MenuComplet';
import AdminPanel from './components/AdminPanel';
import { Section, Product } from './types';
import { MATIN_PRODUCTS, MIDI_PRODUCTS, SOIR_PRODUCTS, DELIVERY_FREE_THRESHOLD } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('accueil');
  const [showAdmin, setShowAdmin] = useState(false);
  
  // État global pour les produits
  const [allProducts, setAllProducts] = useState<{matin: Product[], midi: Product[], soir: Product[]}>(() => {
    const saved = localStorage.getItem('gbeke_products');
    return saved ? JSON.parse(saved) : {
      matin: MATIN_PRODUCTS,
      midi: MIDI_PRODUCTS,
      soir: SOIR_PRODUCTS
    };
  });

  useEffect(() => {
    localStorage.setItem('gbeke_products', JSON.stringify(allProducts));
  }, [allProducts]);

  const updateProducts = (category: 'matin'|'midi'|'soir', updatedList: Product[]) => {
    setAllProducts(prev => ({ ...prev, [category]: updatedList }));
  };

  const resetToDefaults = () => {
    const defaults = {
      matin: MATIN_PRODUCTS,
      midi: MIDI_PRODUCTS,
      soir: SOIR_PRODUCTS
    };
    setAllProducts(defaults);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-outfit">
      {/* Conteneur principal responsive : Mobile (full) -> Desktop (Centré, max-w-6xl) */}
      <div className="w-full md:max-w-6xl mx-auto min-h-screen flex flex-col bg-brand-background shadow-2xl md:border-x md:border-gray-100 pb-12 transition-all duration-300">
        
        <div onDoubleClick={() => setShowAdmin(true)} className="cursor-pointer">
          <Header />
        </div>

        {showAdmin && (
          <AdminPanel 
            products={allProducts} 
            onUpdateProducts={updateProducts} 
            onReset={resetToDefaults}
            onClose={() => setShowAdmin(false)} 
          />
        )}

        <nav className="sticky top-0 z-50 py-4 bg-brand-background/95 backdrop-blur-md px-4 flex flex-col space-y-3 shadow-sm md:shadow-none md:border-b md:border-gray-100">
          {/* Limitation de la largeur de la nav sur desktop pour que les boutons ne soient pas géants */}
          <div className="w-full md:max-w-2xl md:mx-auto">
            <div className="bg-white p-1 rounded-full flex space-x-1 custom-shadow border border-gray-100 w-full overflow-x-auto no-scrollbar">
              {(['accueil', 'matin', 'midi', 'soir'] as Section[]).map((s) => (
                <button 
                  key={s}
                  onClick={() => setActiveSection(s)}
                  className={`flex-1 min-w-[85px] py-3 rounded-full text-[11px] md:text-xs font-black uppercase tracking-tighter transition-all duration-300 ${
                    activeSection === s ? 'bg-brand-primary text-white shadow-lg' : 'text-brand-muted hover:bg-gray-50'
                  }`}
                >
                  {s === 'accueil' ? 'Carte 📋' : s === 'matin' ? 'Matin ☀️' : s === 'midi' ? 'Midi 🥘' : 'Soir 🌙'}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full md:max-w-md md:mx-auto">
            <div className="bg-brand-secondary text-white py-2 px-3 rounded-xl text-[9px] md:text-[10px] font-black uppercase flex items-center justify-center space-x-2 animate-pulse shadow-md text-center leading-tight">
              <i className="fa-solid fa-truck-fast"></i>
              <span>LIVRAISON 0F (Campus 1&2 / Commerce) • Partout dès {DELIVERY_FREE_THRESHOLD}F</span>
            </div>
          </div>
        </nav>

        <main className="flex-1 px-4 md:px-8 mt-6 md:mt-10">
          {activeSection === 'accueil' && <MenuComplet products={allProducts} />}
          {activeSection === 'matin' && <MatinSection products={allProducts.matin} />}
          {activeSection === 'midi' && <MidiSection products={allProducts.midi} />}
          {activeSection === 'soir' && <SoirSection products={allProducts.soir} />}
        </main>

        <footer className="mt-16 pb-8 text-center opacity-40">
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]">Gbêkê Street Food • Côte d'Ivoire</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
