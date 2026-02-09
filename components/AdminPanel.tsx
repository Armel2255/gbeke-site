
import React, { useState, useEffect } from 'react';
import { DEFAULT_IMAGES } from '../constants';
import { Order } from '../types';
import { GoogleGenAI } from "@google/genai";

interface AdminPanelProps {
  onClose: () => void;
  onUpdate: (newImages: typeof DEFAULT_IMAGES) => void;
  currentImages: typeof DEFAULT_IMAGES;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onUpdate, currentImages }) => {
  const [tab, setTab] = useState<'stats' | 'orders' | 'settings'>('stats');
  const [tempImages, setTempImages] = useState(currentImages);
  const [pass, setPass] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('gbeke_orders') || '[]');
    setOrders(saved);
  }, []);

  const runAiAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyse ces commandes de ma boutique de Street Food à Bouaké : ${JSON.stringify(orders)}. Donne 3 conseils courts en Nouchi pour booster mon business.`;
      const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      setAiAnalysis(response.text);
    } catch (e) { setAiAnalysis("Erreur IA."); }
    finally { setIsAnalyzing(false); }
  };

  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 z-[100] bg-brand-text/95 flex items-center justify-center p-6 backdrop-blur-sm">
        <div className="bg-white w-full max-w-xs p-8 rounded-[2.5rem] shadow-2xl">
          <h3 className="font-black text-center mb-6 uppercase tracking-tighter">Accès Merchant</h3>
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
    <div className="fixed inset-0 z-[100] bg-gray-900 text-white overflow-y-auto pb-10">
      <div className="sticky top-0 bg-gray-900/95 p-6 border-b border-white/10 flex justify-between items-center backdrop-blur-md">
        <h2 className="font-black italic text-lg uppercase">Gbêkê Admin</h2>
        <button onClick={onClose} className="bg-white/10 p-3 rounded-full"><i className="fa-solid fa-xmark"></i></button>
      </div>

      <div className="flex p-4 space-x-2">
        {['stats', 'orders', 'settings'].map(t => (
          <button key={t} onClick={() => setTab(t as any)} className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase ${tab === t ? 'bg-brand-primary' : 'bg-white/5 text-gray-400'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 space-y-6">
        {tab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
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
                <h4 className="font-black text-xs uppercase">Analyse IA Gemini</h4>
                <button onClick={runAiAnalysis} className="bg-brand-primary px-4 py-2 rounded-xl text-[9px] font-black">{isAnalyzing ? '...' : 'Lancer'}</button>
              </div>
              <p className="text-xs text-gray-300 italic">{aiAnalysis || "L'IA attend tes données pour t'aider à dja les foules."}</p>
            </div>
          </div>
        )}
        {tab === 'orders' && (
          <div className="space-y-3">
            {orders.map(o => (
              <div key={o.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                <div className="flex-1"><p className="text-[11px] font-black truncate">{o.items}</p></div>
                <div className="text-right ml-4"><p className="text-xs font-black text-brand-secondary">{o.total} F</p></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
