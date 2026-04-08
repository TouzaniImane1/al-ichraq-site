import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Send, MapPin, Camera, Image as ImageIcon } from 'lucide-react';

// Composant pour simuler une photo vide dans la galerie
const PhotoPlaceholder = ({ category }) => (
  <div className="h-56 w-full bg-gray-100 flex flex-col items-center justify-center text-gray-400 group-hover:bg-gray-200 transition-colors">
    <ImageIcon size={40} strokeWidth={1} />
    <span className="text-[10px] mt-2 uppercase tracking-widest font-bold">Espace Photo : {category}</span>
  </div>
);

export default function AlIchraqSite() {
  const [activeTab, setActiveTab] = useState('Home');
  const [category, setCategory] = useState('All');

  const activities = [
    { id: 1, cat: "Moukhyam", title: "Exemple : Moukhyam Sayfi" },
    { id: 2, cat: "Events", title: "Exemple : 7aflat l-Mawlid" },
    { id: 3, cat: "Sessions", title: "Exemple : Atelier Théâtre" },
    { id: 4, cat: "Trips", title: "Exemple : Kharaja l l'Ghaba" },
    { id: 5, cat: "Sessions", title: "Exemple : Cours de Soutien" },
    { id: 6, cat: "Events", title: "Exemple : Compétition Sportive" },
  ];

  const categories = ["All", "Moukhyam", "Events", "Sessions", "Trips"];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
        <div className="flex flex-col">
          <h1 className="text-xl font-black text-blue-800 tracking-tighter uppercase leading-none">
            Al Ichraq
          </h1>
          <span className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em]">Oued Fes Section</span>
        </div>
        
        <div className="hidden md:flex space-x-8 font-bold text-xs uppercase tracking-widest">
          {['Home', 'About', 'Gallery', 'Join Us'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'} hover:text-blue-500 transition-all pb-1`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        
        {/* --- HOME & ABOUT --- */}
        {(activeTab === 'Home' || activeTab === 'About') && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            
            {/* LOGO SANS BORDURES ET GRAND */}
            <div className="mb-12 flex justify-center">
                <img 
                  src="/logo.jpeg" 
                  alt="Logo Al Ichraq" 
                  className="w-64 h-64 md:w-80 md:h-80 object-cover transition-transform hover:scale-105 duration-500"
                  style={{ 
                    clipPath: 'circle(35%)', // Had l-sttar ghadi y9te3 l-byed li f l-jnab
                    backgroundColor: 'transparent'
                  }} 
                />
            </div>
            
            <h2 className="text-4xl font-black text-blue-900 mb-6 underline decoration-orange-500 decoration-4 underline-offset-8">من نحن؟</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed rtl font-medium mb-16">
              جمعية الإشراق فرع واد فاس هي جمعية تربوية، ثقافية واجتماعية تهدف إلى تأطير الطفولة والشباب وتنمية قدراتهم الإبداعية والتربوية من خلال أنشطة متنوعة طيلة السنة.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 italic">
                   <Users className="text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2 uppercase tracking-tighter">Encadrement</h3>
                <p className="text-sm text-gray-500 font-medium">تأطير تربوي هادف للناشئة وفق قيم المواطنة</p>
              </div>

              <div className="p-8 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                   <Camera className="text-orange-500" />
                </div>
                <h3 className="font-bold text-lg mb-2 uppercase tracking-tighter">Activités</h3>
                <p className="text-sm text-gray-500 font-medium">برامج متنوعة : مخيمات، ورشات، أناشيد وخرجات</p>
              </div>

              <div className="p-8 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                   <MapPin className="text-green-500" />
                </div>
                <h3 className="font-bold text-lg mb-2 uppercase tracking-tighter">Localisation</h3>
                <p className="text-sm text-gray-500 font-medium">واد فاس، مدينة فاس - المملكة المغربية</p>
              </div>
            </div>
          </motion.section>
        )}

        {/* --- GALLERY --- */}
        {activeTab === 'Gallery' && (
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-blue-900 uppercase">Aperçu de la Galerie</h2>
              <p className="text-gray-400 text-sm mt-2 italic">(Les photos seront ajoutées après validation)</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setCategory(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-black tracking-widest transition-all ${category === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {activities
                .filter(a => category === 'All' || a.cat === category)
                .map(item => (
                  <motion.div layout key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 group">
                    <PhotoPlaceholder category={item.cat} />
                    <div className="p-6">
                      <span className="text-[10px] bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-black uppercase tracking-tighter italic">
                        {item.cat}
                      </span>
                      <h4 className="font-bold mt-3 text-gray-800">{item.title}</h4>
                    </div>
                  </motion.div>
                ))}
            </div>
          </section>
        )}

        {/* --- JOIN US --- */}
        {activeTab === 'Join Us' && (
          <section className="max-w-4xl mx-auto py-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-blue-900 uppercase tracking-widest underline decoration-orange-500 decoration-2 underline-offset-4">Inscription</h2>
              <p className="text-xs text-gray-400 mt-2 tracking-widest uppercase italic">Remplissez le formulaire officiel ci-dessous</p>
            </div>
            
            <div className="w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 h-[800px]">
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLScVV3zaAroDPA5HNAJtECZpX-yPrA6P8NoS458fz-q7IxWcgw/viewform?embedded=true" 
                className="w-full h-full"
                frameBorder="0" 
              >
                Chargement…
              </iframe>
            </div>
          </section>
        )}

      </main>

      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-black uppercase tracking-tighter mb-4 italic">Al Ichraq <span className="text-orange-500">Oued Fes</span></h3>
          <p className="text-[10px] opacity-40 leading-relaxed mb-8 uppercase tracking-widest font-bold italic">
            © 2026 Association Al Ichraq. Développé avec passion pour l'éducation et la culture.
          </p>
          <div className="flex justify-center space-x-8 opacity-40 font-black text-[9px]">
            <span>FACEBOOK</span>
            <span>INSTAGRAM</span>
            <span>YOUTUBE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}