
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MatinSection from './components/MatinSection';
import MidiSection from './components/MidiSection';
import SoirSection from './components/SoirSection';
import MenuComplet from './components/MenuComplet';
import AdminPanel from './components/AdminPanel';
import { Section } from './types';
import { DEFAULT_IMAGES, DELIVERY_FREE_THRESHOLD, DELIVERY_LOCATIONS } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('accueil');
  const [showAdmin, setShowAdmin] = useState(false);
  const [images, setImages] = useState(DEFAULT_IMAGES);

  useEffect(() => {
    const saved = localStorage.getItem('gbeke_images');
    if (saved) setImages(JSON.parse(saved));
  }, []);

  const updateImages = (newImages: typeof DEFAULT_IMAGES) => {
    setImages(newImages);
    localStorage.setItem('gbeke_images', JSON.stringify(newImages));
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col bg-brand-background font-outfit pb-12">
      <div onDoubleClick={() => setShowAdmin(true)}>
        <Header />
      </div>

      {showAdmin && <AdminPanel currentImages={images} onUpdate={updateImages} onClose={() => setShowAdmin(false)} />}

      <nav className="flex justify-center sticky top-0 z-50 py-4 bg-brand-background/95 backdrop-blur-md px-4 flex-col space-y-3">
        <div className="bg-white p-1 rounded-full flex space-x-1 custom-shadow border border-gray-100 w-full overflow-x-auto no-scrollbar">
          {(['accueil', 'matin', 'midi', 'soir'] as Section[]).map((s) => (
            <button 
              key={s}
              onClick={() => setActiveSection(s)}
              className={`flex-1 min-w-[85px] py-3 rounded-full text-[11px] font-black uppercase tracking-tighter transition-all duration-300 ${
                activeSection === s 
                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-[1.02]' 
                : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              {s === 'accueil' ? 'La Carte 📋' : s === 'matin' ? 'Matin ☀️' : s === 'midi' ? 'Midi 🥘' : 'Soir 🌙'}
            </button>
          ))}
        </div>
        
        {/* Barre de Livraison Gratuite Bouaké */}
        <div className="bg-brand-secondary text-white py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center space-x-2 animate-pulse shadow-md border-2 border-white/20">
          <i className="fa-solid fa-truck-ramp-box text-sm"></i>
          <span>Livraison GRATUITE dès {DELIVERY_FREE_THRESHOLD} F ({DELIVERY_LOCATIONS})</span>
        </div>
      </nav>

      <main className="flex-1 px-4 mt-2">
        {activeSection === 'accueil' && <MenuComplet images={images} />}
        {activeSection === 'matin' && <MatinSection images={images} />}
        {activeSection === 'midi' && <MidiSection images={images} />}
        {activeSection === 'soir' && <SoirSection images={images} />}
      </main>

      <div className="fixed bottom-6 right-6 z-40">
        <a 
          href="tel:+2250101010101"
          className="w-16 h-16 bg-brand-secondary text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform hover:rotate-6 border-4 border-white"
        >
          <i className="fa-solid fa-phone-volume text-xl"></i>
        </a>
      </div>

      <footer className="mt-16 pb-8 text-center px-4 opacity-60">
        <div className="flex justify-center space-x-2 mb-3">
          <div className="w-6 h-1 bg-brand-primary rounded-full"></div>
          <div className="w-6 h-1 bg-gray-200 rounded-full"></div>
          <div className="w-6 h-1 bg-brand-secondary rounded-full"></div>
        </div>
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-muted">
          Gbêkê Street Food • Bouaké, Côte d'Ivoire
        </p>
      </footer>
    </div>
  );
};

export default App;
