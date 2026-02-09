
import React, { useState, useEffect } from 'react';
import { Order, Product } from '../types';
import { GoogleGenAI } from "@google/genai";

interface AdminPanelProps {
  onClose: () => void;
  products: { matin: Product[], midi: Product[], soir: Product[] };
  onUpdateProducts: (cat: 'matin'|'midi'|'soir', list: Product[]) => void;
  onReset: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, products, onUpdateProducts, onReset }) => {
  const [tab, setTab] = useState<'stats' | 'menu' | 'orders' | 'system'>('stats');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [editCategory, setEditCategory] = useState<'matin'|'midi'|'soir'>('matin');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const saved = JSON.parse(localStorage.getItem('gbeke_orders') || '[]');
    setOrders(saved);
  };

  const clearOrders = () => {
    if (confirm('Vider tout l\'historique des commandes ? Cette action est irréversible.')) {
      localStorage.removeItem('gbeke_orders');
      setOrders([]);
    }
  };

  const handleResetMenu = () => {
    if (confirm('Réinitialiser tout le menu par défaut ? Vos modifications de prix et d\'images seront perdues.')) {
      onReset();
      alert('Menu réinitialisé avec succès !');
    }
  };

  const runAiAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyse ces ventes : ${JSON.stringify(orders)}. Donne 3 conseils courts en argot ivoirien (Nouchi) pour le business.`;
      const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      setAiAnalysis(response.text);
    } catch (e) { setAiAnalysis("Erreur IA."); }
    finally { setIsAnalyzing(false); }
  };

  const handleProductChange = (id: string, field: keyof Product, value: any) => {
    const newList = products[editCategory].map(p => 
      p.id === id ? { ...p, [field]: value } : p
    );
    onUpdateProducts(editCategory, newList);
  };

  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 z-[100] bg-brand-text/95 flex items-center justify-center p-6 backdrop-blur-sm">
        <div className="bg-white w-full max-w-xs p-8 rounded-[2.5rem] shadow-2xl">
          <h3 className="font-black text-center mb-6 uppercase tracking-tighter">Accès Admin</h3>
          <input 
            type="password" placeholder="Code Secret" 
            className="w-full border-2 border-gray-100 p-5 rounded-2xl text-center font-black mb-4 focus:border-brand-primary outline-none"
            onChange={(e) => e.target.value === '225' && setIsUnlocked(true)}
          />
          <button onClick={onClose} className="w-full text-[10px] font-black uppercase text-gray-400">Annuler</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900/90 backdrop-blur-md flex items-center justify-center p-4">
      {/* Container Responsive pour l'Admin Panel */}
      <div className="bg-gray-900 text-white w-full max-w-lg md:max-w-4xl h-full md:h-[80vh] md:rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        
        <div className="bg-gray-900/95 p-6 border-b border-white/10 flex justify-between items-center backdrop-blur-md z-10 shrink-0">
          <h2 className="font-black italic text-lg uppercase">Gbêkê Admin</h2>
          <button onClick={onClose} className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"><i className="fa-solid fa-xmark"></i></button>
        </div>

        <div className="flex p-4 space-x-2 overflow-x-auto shrink-0 border-b border-white/5">
          {['stats', 'menu', 'orders', 'system'].map(t => (
            <button key={t} onClick={() => setTab(t as any)} className={`flex-1 min-w-[70px] py-3 rounded-2xl text-[10px] font-black uppercase transition-colors ${tab === t ? 'bg-brand-primary text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
          {tab === 'stats' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                  <span className="text-[10px] text-gray-400 font-black uppercase">Ventes</span>
                  <p className="text-2xl font-black">{orders.length}</p>
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                  <span className="text-[10px] text-gray-400 font-black uppercase">Total (F)</span>
                  <p className="text-2xl font-black text-brand-secondary">{orders.reduce((a,b)=>a+b.total,0)}</p>
                </div>
              </div>
              <div className="bg-brand-primary/10 p-6 rounded-[2rem] border border-brand-primary/20">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-black text-xs uppercase">Analyse Gemini</h4>
                  <button onClick={runAiAnalysis} className="bg-brand-primary px-4 py-2 rounded-xl text-[9px] font-black hover:bg-brand-primary/80 transition-colors">{isAnalyzing ? '...' : 'Lancer'}</button>
                </div>
                <p className="text-xs text-gray-300 italic leading-relaxed">{aiAnalysis || "L'IA attend tes données pour t'aider."}</p>
              </div>
            </div>
          )}

          {tab === 'menu' && (
            <div className="space-y-6">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {(['matin', 'midi', 'soir'] as const).map(c => (
                  <button key={c} onClick={() => setEditCategory(c)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-colors ${editCategory === c ? 'bg-white text-brand-text' : 'bg-white/10 hover:bg-white/20'}`}>
                    {c}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products[editCategory].map(p => (
                  <div key={p.id} className="bg-white/5 p-4 rounded-3xl border border-white/10 space-y-3">
                    <div className="flex gap-4">
                       <img src={p.image} className="w-16 h-16 rounded-xl object-cover bg-white/10" />
                       <div className="flex-1 space-y-2">
                         <div>
                           <label className="text-[9px] text-gray-500 font-black uppercase">Nom</label>
                           <input 
                              value={p.name} 
                              onChange={(e) => handleProductChange(p.id, 'name', e.target.value)}
                              className="w-full bg-transparent border-b border-white/20 py-1 text-sm font-bold focus:border-brand-primary outline-none"
                           />
                         </div>
                         <div>
                           <label className="text-[9px] text-gray-500 font-black uppercase">Prix</label>
                           <input 
                              type="number"
                              value={p.price} 
                              onChange={(e) => handleProductChange(p.id, 'price', parseInt(e.target.value))}
                              className="w-full bg-transparent border-b border-white/20 py-1 text-sm font-bold text-brand-secondary focus:border-brand-primary outline-none"
                           />
                         </div>
                       </div>
                    </div>
                    <div>
                      <label className="text-[9px] text-gray-500 font-black uppercase">Description</label>
                      <textarea 
                        value={p.desc} 
                        onChange={(e) => handleProductChange(p.id, 'desc', e.target.value)}
                        className="w-full bg-white/5 rounded-xl p-3 text-xs mt-1 outline-none focus:ring-1 ring-brand-primary"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-gray-500 font-black uppercase">URL Image</label>
                      <input 
                        value={p.image} 
                        onChange={(e) => handleProductChange(p.id, 'image', e.target.value)}
                        className="w-full bg-transparent border-b border-white/20 py-1 text-[10px] text-gray-400 focus:border-brand-primary outline-none truncate"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'orders' && (
            <div className="space-y-3">
              {orders.length === 0 ? <p className="text-center text-xs text-gray-500 py-10">Aucune commande.</p> : orders.map(o => (
                <div key={o.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center hover:bg-white/10 transition-colors">
                  <div className="flex-1"><p className="text-[11px] font-black truncate">{o.items}</p></div>
                  <div className="text-right ml-4"><p className="text-xs font-black text-brand-secondary">{o.total} F</p></div>
                </div>
              ))}
            </div>
          )}

          {tab === 'system' && (
            <div className="space-y-6">
              <div className="bg-black/40 p-6 rounded-3xl border border-white/10 font-mono text-xs space-y-2">
                <h3 className="text-[10px] text-brand-primary font-black uppercase mb-4 tracking-widest">Diagnostic Système</h3>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status API IA</span>
                  <span className="text-brand-secondary">ONLINE (Gemini 3 Flash)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Stockage Local</span>
                  <span className="text-brand-secondary">ACTIF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Version App</span>
                  <span className="text-white">v2.5.0-bouake</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-[10px] text-gray-500 font-black uppercase tracking-widest px-2">Zone de Danger</h3>
                <button 
                  onClick={handleResetMenu}
                  className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-brand-primary hover:border-brand-primary transition-colors text-xs font-black uppercase flex items-center justify-between px-6 group"
                >
                  <span>Réinitialiser le Menu</span>
                  <i className="fa-solid fa-rotate-right text-gray-500 group-hover:text-white"></i>
                </button>
                <button 
                  onClick={clearOrders}
                  className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-red-600 hover:border-red-600 transition-colors text-xs font-black uppercase flex items-center justify-between px-6 group"
                >
                  <span>Vider Historique Commandes</span>
                  <i className="fa-solid fa-trash text-gray-500 group-hover:text-white"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
