
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="pt-8 pb-4 px-6 text-center select-none cursor-pointer">
      <div className="flag-gradient mb-6 rounded-full opacity-40"></div>
      <h1 className="text-3xl font-black tracking-tighter text-brand-text uppercase leading-none">
        Gbêkê <span className="text-brand-primary italic">Street Food</span>
      </h1>
      <p className="text-[9px] text-brand-muted mt-2 font-black tracking-[0.4em] uppercase">Authentique Bouaké 🇨🇮</p>
    </header>
  );
};

export default Header;
