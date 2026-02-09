
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="pt-8 pb-4 px-6 text-center">
      <div className="flag-gradient mb-4 rounded-full opacity-50"></div>
      <h1 className="text-3xl font-black tracking-tighter text-brand-text uppercase">
        Gbêkê <span className="text-brand-primary">Street Food</span>
      </h1>
      <p className="text-brand-muted text-xs mt-1 font-medium tracking-widest uppercase">
        Le goût authentique de Bouaké
      </p>
    </header>
  );
};

export default Header;
