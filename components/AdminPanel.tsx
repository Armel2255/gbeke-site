
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
    const savedOrders = JSON.parse(localStorage.getItem('gbeke_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  const runAiAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Tu es l'assistant IA de "Gbêkê Street Food" à Bouaké. Voici les dernières commandes de ma boutique : ${JSON.stringify(orders)}. Analyse ces données et donne-moi 3 conseils stratégiques TRÈS COURTS pour augmenter mon profit, en tenant compte du contexte local (étudiants Campus 1/2, quartier Commerce). Réponds en français ivoirien amical (Nouchi léger).`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setAiAnalysis(response.text || "Désolé chef, l'IA a coulé un peu. Réessaye.");
    } catch (e) {
      setAiAnalysis("Erreur de connexion avec l'IA. Vérifie ton réseau.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearOrders = () => {
    if(window.confirm("Vider tout l'historique ?")) {
      localStorage.removeItem('gbeke_orders');
      setOrders([]);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 z-[100] bg-brand-text/95 flex items-center justify-center p-6 backdrop-blur-sm">
        <div className="bg-white w-full max-w-xs p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-center">Backend Merchant</h3>
          <p className="text-[10px] text-center text-brand-muted uppercase tracking-widest">Accès réservé au gérant</p>
          <input 
            type="password" 
            placeholder="Code Secret" 
            className="w-full border-2 border-gray-100 p-4 rounded-2xl text-center font-black"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              if(e.target.value === '225') setIsUnlocked(true);
            }}
          />
          <button onClick={onClose} className="w-full text-xs text-gray-400 font-bold uppercase py-2">Quitter</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900 text-white overflow-y-auto pb-10 animate-in slide-in-from-bottom duration-300">
      {/* Header Admin */}
      <div className="sticky top-0 bg-gray-900/90 backdrop-blur-md p-6 border-b border-white/10 flex justify-between items-center z-10">
        <div>
          <h2 className="text-xl font-black italic">GBÊKÊ <span className="text-brand-primary">DASHBOARD</span></h2>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Connecté en tant que Gérant</p>
        </div>
        <button onClick={onClose} className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors">
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex p-4 space-x-2">
        {['stats', 'orders', 'settings'].map((t) => (
          <button 
            key={t}
            onClick={() => setTab(t as any)}
            className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-tighter transition-all ${
              tab === t ? 'bg-brand-primary text-white shadow-lg' : 'bg-white/5 text-gray-400'
            }`}
          >
            {t === 'stats' ? 'Rapports 📊' : t === 'orders' ? 'Ventes 🛒' : 'Config ⚙️'}
          </button>
        ))}
      </div>

      <div className="px-4 space-y-8">
        {tab === 'stats' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-5 rounded-3xl border border-white/10">
                <span className="text-[9px] font-bold text-gray-400 uppercase">Recettes</span>
                <p className="text-2xl font-black text-brand-secondary">{totalRevenue} F</p>
              </div>
              <div className="bg-white/5 p-5 rounded-3xl border border-white/10">
                <span className="text-[9px] font-bold text-gray-400 uppercase">Ventes</span>
                <p className="text-2xl font-black text-brand-primary">{orders.length}</p>
              </div>
            </div>

            {/* AI Assistant Section */}
            <div className="bg-brand-primary/10 rounded-3xl p-6 border border-brand-primary/30 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center animate-pulse">
                    <i className="fa-solid fa-robot text-white"></i>
                  </div>
                  <h4 className="font-black text-sm uppercase">L'IA te conseille</h4>
                </div>
                <button 
                  onClick={runAiAnalysis}
                  disabled={isAnalyzing || orders.length === 0}
                  className="bg-brand-primary text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase disabled:opacity-50"
                >
                  {isAnalyzing ? 'Analyse...' : 'Lancer'}
                </button>
              </div>
              
              {aiAnalysis ? (
                <div className="bg-black/20 p-4 rounded-2xl border border-white/5 animate-in slide-in-from-top-2">
                  <p className="text-xs leading-relaxed italic text-gray-200">{aiAnalysis}</p>
                </div>
              ) : (
                <p className="text-[10px] text-gray-400">Cliquez sur "Lancer" pour que Gemini analyse vos ventes et vous donne des astuces de pro.</p>
              )}
            </div>
            
            <div className="h-40 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Graphique des ventes (À venir)</span>
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-black uppercase text-gray-400">Derniers Clics WhatsApp</h4>
              <button onClick={clearOrders} className="text-[9px] text-red-400 font-bold uppercase">Réinitialiser</button>
            </div>
            {orders.length === 0 ? (
              <div className="py-20 text-center opacity-30">
                <i className="fa-solid fa-ghost text-4xl mb-4"></i>
                <p className="text-xs font-bold uppercase">Aucune vente enregistrée</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((o) => (
                  <div key={o.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                    <div>
                      <p className="text-[11px] font-black leading-tight">{o.items}</p>
                      <p className="text-[9px] text-gray-500 mt-1">{new Date(o.timestamp).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-brand-secondary">{o.total} F</p>
                      <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded-full text-gray-400 uppercase">{o.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'settings' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h4 className="text-xs font-black uppercase text-gray-400">Configuration Visuelle</h4>
            {Object.entries(tempImages).map(([key, url]) => (
              <div key={key} className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-500">{key}</label>
                <div className="flex space-x-2">
                  <input 
                    className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl text-xs text-gray-300"
                    value={url}
                    onChange={(e) => setTempImages({...tempImages, [key]: e.target.value})}
                  />
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                    <img src={url} className="w-full h-full object-cover" alt="preview" />
                  </div>
                </div>
              </div>
            ))}
            <button 
              onClick={() => { onUpdate(tempImages); onClose(); }}
              className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black text-xs uppercase shadow-xl"
            >
              Enregistrer les visuels
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
