
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

      <nav className="flex justify-center sticky top-0 z-50 py-4 bg-brand-background/95 backdrop-blur-md px-4 flex-col space-y-3 shadow-sm">
        <div className="bg-white p-1 rounded-full flex space-x-1 custom-shadow border border-gray-100 w-full overflow-x-auto no-scrollbar">
          {(['accueil', 'matin', 'midi', 'soir'] as Section[]).map((s) => (
            <button 
              key={s}
              onClick={() => setActiveSection(s)}
              className={`flex-1 min-w-[85px] py-3 rounded-full text-[11px] font-black uppercase tracking-tighter transition-all duration-300 ${
                activeSection === s ? 'bg-brand-primary text-white shadow-lg' : 'text-brand-muted'
              }`}
            >
              {s === 'accueil' ? 'Carte 📋' : s === 'matin' ? 'Matin ☀️' : s === 'midi' ? 'Midi 🥘' : 'Soir 🌙'}
            </button>
          ))}
        </div>
        <div className="bg-brand-secondary text-white py-2 px-4 rounded-xl text-[10px] font-black uppercase flex items-center justify-center space-x-2 animate-pulse shadow-md">
          <i className="fa-solid fa-truck-fast"></i>
          <span>Livraison GRATUITE dès {DELIVERY_FREE_THRESHOLD} F</span>
        </div>
      </nav>

      <main className="flex-1 px-4 mt-4">
        {activeSection === 'accueil' && <MenuComplet images={images} />}
        {activeSection === 'matin' && <MatinSection images={images} />}
        {activeSection === 'midi' && <MidiSection images={images} />}
        {activeSection === 'soir' && <SoirSection images={images} />}
      </main>

      <footer className="mt-16 pb-8 text-center opacity-40">
        <p className="text-[8px] font-black uppercase tracking-[0.4em]">Gbêkê Street Food • Côte d'Ivoire</p>
      </footer>
    </div>
  );
};

export default App;
