import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image as ImageIcon, CheckCircle, Lock } from 'lucide-react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';
import AdminPage from './Admin';

// --- COMPOSANT PHOTO VIDE ---
const PhotoPlaceholder = ({ category }) => (
  <div className="h-56 w-full bg-gray-100 flex flex-col items-center justify-center text-gray-400 group-hover:bg-gray-200 transition-colors">
    <ImageIcon size={40} strokeWidth={1} />
    <span className="text-[10px] mt-2 uppercase tracking-widest font-bold italic">Espace {category}</span>
  </div>
);

// --- 1. SITE PUBLIC ---
const MainSite = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [category, setCategory] = useState('All');
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setGalleryItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  const goals = [
    "الاهتمام بالتخييم والتكوين التربوي والتدريب وتطوير الكفاءات ذاتيا وعلميا، اجتماعيا، ثقافيا، فنيا، رياضيا، صحيا، وبيئيا.",
    "العمل على تطبيق شريعة الكشاف، ونشر المناهج الكشفية، والخضوع للقسم وفق خطة المكتب الكشفي العالمي والمنظمة الكشفية العربية.",
    "خدمة الطفولة والشباب بجنسيهما، لتحقيق الغايات الكشفية التربوية والتنموية المستدامة.",
    "تأطير المواطنين وتحسين أدائهم اقتصاديا، اجتماعيا وثقافيا وبيئيا من أجل إدماجهم في التنمية.",
    "تقوية أسس التضامن والتعاون بربط علاقات الصداقة والشراكة على المستوى المحلي والوطني الدولي بين مختلف الهيئات والجمعيات ذات الاهتمام المشstrict قصد تفعيل الدبلوماسية الموازية.",
    "المساهمة في العمل التنموي باعتماد وسائل وآليات فعالة؛ الانخراط الفاعل في التنمية البشرية المستدامة.",
    "التربية والتنمية الشاملة:(الفكرية، والرياضية، والاجتماعية، الفنية، والثقافية والبيئية) للطفولة والشباب وفق قيم المقدسات الوطنية.",
    "تقوية النسيج التربوي والاهتمام بالمرأة وتعزيز دور الأسرة؛ والاهتمام بالشباب العاطل مع مراعاة مقاربة النوع في كافة البرامج والمشاريع.",
    "محاربة الأمية والتربية غير النظامية والتعليم الأولي وإدماج ذوي الاحتياجات الخاصة.",
    "الاهتمام بالفنون المسرحية و السينمائية و الموسيقية و الفن التشكيلي.",
    "تعزيز قيم المواطنة والديموقراطية، والتعاون والتسامح، لتكوين عالم أفضل يتمتع فيه الأفراد بالاستقلال الذاتي والفعالية في بناء المجتمع."
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-lg md:text-xl font-black text-blue-800 uppercase italic leading-none">Al Ichraq</h1>
            <span className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em]">Oued Fes Section</span>
          </div>
          <div className="flex space-x-6 font-bold text-xs uppercase tracking-widest">
            <button onClick={() => setActiveTab('Home')} className={activeTab === 'Home' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}>Home</button>
            <button onClick={() => setActiveTab('Gallery')} className={activeTab === 'Gallery' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}>Gallery</button>
            <button onClick={() => setActiveTab('Join Us')} className={activeTab === 'Join Us' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}>Join Us</button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4 max-w-6xl mx-auto">
        {activeTab === 'Home' && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <div className="mb-12 flex justify-center">
                <img src="/logo.jpeg" alt="Logo" className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-full shadow-2xl" />
            </div>
            <div className="max-w-4xl mx-auto mb-20 bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100">
              <h2 className="text-3xl font-black text-blue-900 mb-6 italic underline decoration-orange-500">التعريف</h2>
              <p className="text-lg text-gray-700 leading-relaxed rtl text-right">
                التعريف: جمعية وطنية كشفية تربوية تنموية تهتم بمجال الطفولة والشباب والتخييم والتكوين التربوي...
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.map((goal, i) => (
                    <div key={i} className="p-4 bg-white border border-gray-100 rounded-2xl flex flex-row-reverse items-start gap-3 text-right shadow-sm">
                        <CheckCircle size={16} className="text-orange-600 mt-1 shrink-0" />
                        <p className="text-gray-700 font-bold text-[13px] leading-relaxed rtl">{goal}</p>
                    </div>
                ))}
            </div>
          </motion.section>
        )}

        {activeTab === 'Gallery' && (
          <section>
            <div className="text-center mb-10"><h2 className="text-2xl font-black text-blue-900 uppercase italic">Galerie Photos</h2></div>
            <div className="flex space-x-2 overflow-x-auto pb-4 justify-center mb-10">
              {["All", "Moukhyam", "Events", "Sessions", "Trips"].map(cat => (
                <button key={cat} onClick={() => setCategory(cat)} className={`px-5 py-2 rounded-full text-[10px] font-black tracking-widest ${category === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>{cat.toUpperCase()}</button>
              ))}
            </div>
            {galleryItems.length === 0 ? (
              <div className="text-center py-20 text-gray-300">
                <ImageIcon size={60} className="mx-auto mb-4" strokeWidth={1} />
                <p className="font-bold uppercase tracking-widest text-sm">La galerie est vide pour l'instant</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {galleryItems.filter(a => category === 'All' || a.category === category).map(item => (
                  <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 group">
                    {item.type === 'video' ? (
                      <video src={item.imageUrl} controls className="h-56 w-full object-cover" />
                    ) : (
                      <img src={item.imageUrl} alt={item.title} className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    )}
                    <div className="p-5 text-right">
                      <span className="text-[9px] bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-black uppercase">{item.category}</span>
                      <h4 className="font-bold mt-2 text-sm text-gray-800">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'Join Us' && (
          <div className="w-full bg-white rounded-[2rem] shadow-xl overflow-hidden h-[600px]">
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScVV3zaAroDPA5HNAJtECZpX-yPrA6P8NoS458fz-q7IxWcgw/viewform?embedded=true" className="w-full h-full">Chargement…</iframe>
          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-white py-12 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-lg font-black uppercase mb-4 italic">Al Ichraq <span className="text-orange-500">Oued Fes</span></h3>
          <p className="text-[9px] opacity-40 mb-8 font-bold italic">© 2026 Association Al Ichraq.</p>
          {/* LIEN VERS ADMIN CACHÉ */}
          <Link to="/admin" className="opacity-10 hover:opacity-100 transition-opacity absolute bottom-4 right-4 text-white"><Lock size={12} /></Link>
        </div>
      </footer>
    </div>
  );
};

// --- 3. CONFIGURATION DU ROUTAGE ---
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<MainSite />} />
        <Route path="*" element={<MainSite />} />
      </Routes>
    </Router>
  );
}