import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, MapPin, Camera, Image as ImageIcon, CheckCircle, Target, Lock } from 'lucide-react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';
import AdminPage from './Admin';

// Composant pour simuler une photo vide dans la galerie
const PhotoPlaceholder = ({ category }) => (
  <div className="h-56 w-full bg-gray-100 flex flex-col items-center justify-center text-gray-400 group-hover:bg-gray-200 transition-colors">
    <ImageIcon size={40} strokeWidth={1} />
    <span className="text-[10px] mt-2 uppercase tracking-widest font-bold">Espace Photo : {category}</span>
  </div>
);

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

  const categories = ["All", "Moukhyam", "Events", "Sessions", "Trips"];

  const scrollToAbout = () => {
    setActiveTab('Home');
    setTimeout(() => {
      const element = document.getElementById('about-section');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const goals = [
    "الاهتمام بالتخييم والتكوين التربوي والتدريب وتطوير الكفاءات ذاتيا وعلميا، اجتماعيا، ثقافيا، فنيا، رياضيا، صحيا، وبيئيا.",
    "العمل على تطبيق شريعة الكشاف، ونشر المناهج الكشفية، والخضوع للقسم وفق خطة المكتب الكشفي العالمي والمنظمة الكشفية العربية.",
    "خدمة الطفولة والشباب بجنسيهما، لتحقيق الغايات الكشفية التربوية والتنموية المستدامة.",
    "تأطير المواطنين وتحسين أدائهم اقتصاديا، اجتماعيا وثقافيا وبيئيا من أجل إدماجهم في التنمية.",
    "تقوية أسس التضامن والتعاون بربط علاقات الصداقة والشراكة على المستوى المحلي والوطني والدولي بين مختلف الهيئات والجمعيات ذات الاهتمام المشترك قصد تفعيل الدبلوماسية الموازية.",
    "المساهمة في العمل التنموي باعتماد وسائل وآليات فعالة؛ الانخراط الفاعل في التنمية البشرية المستدامة.",
    "التربية والتنمية الشاملة:(الفكرية، والرياضية، والاجتماعية، الفنية، والثقافية والبيئية) للطفولة والشباب وفق قيم المقدسات الوطنية.",
    "تقوية النسيج التربوي والاهتمام بالمرأة وتعزيز دور الأسرة؛ والاهتمام بالشباب العاطل مع مراعاة مقاربة النوع في كافة البرامج والمشاريع.",
    "محاربة الأمية والتربية غير النظامية والتعليم الأولي وإدماج ذوي الاحتياجات الخاصة.",
    "الاهتمام بالفنون المسرحية و السينمائية و الموسيقية و الفن التشكيلي.",
    "تعزيز قيم المواطنة والديموقراطية، والتعاون والتسامح، لتكوين عالم أفضل يتمتع فيه الأفراد بالاستقلال الذاتي والفعالية في بناء المجتمع."
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-lg md:text-xl font-black text-blue-800 tracking-tighter uppercase leading-none">Al Ichraq</h1>
            <span className="text-orange-500 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">Oued Fes Section</span>
          </div>
          <div className="flex space-x-4 md:space-x-8 font-bold text-[10px] md:text-xs uppercase tracking-widest overflow-x-auto pb-2 md:pb-0">
            <button onClick={() => setActiveTab('Home')} className={`${activeTab === 'Home' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'} whitespace-nowrap`}>Home</button>
            <button onClick={scrollToAbout} className="text-gray-400 hover:text-blue-500 whitespace-nowrap">About</button>
            <button onClick={() => setActiveTab('Gallery')} className={`${activeTab === 'Gallery' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'} whitespace-nowrap`}>Gallery</button>
            <button onClick={() => setActiveTab('Join Us')} className={`${activeTab === 'Join Us' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'} whitespace-nowrap`}>Join Us</button>
          </div>
        </div>
      </nav>

      <main className="pt-32 md:pt-40 pb-20 px-4 md:px-6 max-w-6xl mx-auto">

        {activeTab === 'Home' && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <div className="mb-8 md:mb-12 flex justify-center">
              <img src="/logo.jpeg" alt="Logo Al Ichraq" className="w-48 h-48 md:w-80 md:h-80 object-cover" style={{ clipPath: 'circle(38%)' }} />
            </div>
            <div className="max-w-4xl mx-auto mb-16 md:mb-20">
              <h2 className="text-3xl md:text-4xl font-black text-blue-900 mb-6 underline decoration-orange-500 decoration-4 underline-offset-8">التعريف</h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed rtl font-medium bg-blue-50/50 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-blue-100 text-right">
                التعريف: جمعية وطنية كشفية تربوية تنموية تهتم بمجال الطفولة والشباب والتخييم والتكوين التربوي والتدريب وتطوير القيادات والكفاءات علميا، اجتماعيا، ثقافيا، فنيا، رياضيا، صحيا، وبيئيا، تهتدي بمبادئ التربية المغربية وفق مقومات الهوية الإسلامية، وقيمها الرامية لتكوين مجتمع متصف بالاستقامة والصلاح، المتسم بالتسامح والتعايش، والمطبوع بروح المبادرة الإيجابية والإنتاج النافع.
              </p>
            </div>
            <div id="about-section" className="py-6 md:py-10">
              <div className="flex items-center justify-center gap-3 mb-8 md:mb-12">
                <Target className="text-orange-500" size={28} />
                <h3 className="text-2xl md:text-3xl font-black text-blue-900 uppercase">الأهداف</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {goals.map((goal, index) => (
                  <div key={index} className="p-5 md:p-6 bg-white border border-gray-100 rounded-2xl md:rounded-3xl shadow-sm flex flex-row-reverse items-start gap-3 md:gap-4 text-right">
                    <div className="bg-orange-100 p-2 rounded-lg mt-1 shrink-0">
                      <CheckCircle size={16} className="text-orange-600" />
                    </div>
                    <p className="text-gray-700 font-bold text-xs md:text-sm leading-relaxed rtl">{goal}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-25 md:mt-20 border-t border-gray-100 pt-16 md:pt-20">
                <div className="p-6 md:p-8 bg-gray-50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <Users className="text-blue-600" />
                  </div>
                  <h3 className="font-black text-md md:text-lg mb-2 uppercase text-blue-900">Encadrement</h3>
                  <p className="text-xs md:text-sm text-gray-500 font-bold leading-relaxed">تأطير تربوي هادف للناشئة وفق قيم المواطنة</p>
                </div>
                <div className="p-6 md:p-8 bg-gray-50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <Camera className="text-orange-500" />
                  </div>
                  <h3 className="font-black text-md md:text-lg mb-2 uppercase text-blue-900">Activités</h3>
                  <p className="text-xs md:text-sm text-gray-500 font-bold leading-relaxed">برامج متنوعة : مخيمات، ورشات، أناشيد وخرجات</p>
                </div>
                <div className="p-6 md:p-8 bg-gray-50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <MapPin className="text-green-500" />
                  </div>
                  <h3 className="font-black text-md md:text-lg mb-2 uppercase text-blue-900">Localisation</h3>
                  <p className="text-xs md:text-sm text-gray-500 font-bold leading-relaxed">واد فاس، مدينة فاس - المملكة المغربية</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === 'Gallery' && (
          <section>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-blue-900 uppercase">Aperçu de la Galerie</h2>
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-4 justify-start md:justify-center mb-10 no-scrollbar">
              {categories.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)} className={`px-5 py-2 rounded-full text-[10px] font-black tracking-widest transition-all whitespace-nowrap ${category === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>{cat.toUpperCase()}</button>
              ))}
            </div>
            {galleryItems.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  { id: 1, cat: "Moukhyam", title: "Exemple : Moukhyam Sayfi" },
                  { id: 2, cat: "Events", title: "Exemple : 7aflat l-Mawlid" },
                  { id: 3, cat: "Sessions", title: "Exemple : Atelier Théâtre" },
                  { id: 4, cat: "Trips", title: "Exemple : Kharaja l l'Ghaba" },
                  { id: 5, cat: "Sessions", title: "Exemple : Cours de Soutien" },
                  { id: 6, cat: "Events", title: "Exemple : Compétition Sportive" },
                ].filter(a => category === 'All' || a.cat === category).map(item => (
                  <motion.div layout key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100">
                    <PhotoPlaceholder category={item.cat} />
                    <div className="p-5">
                      <span className="text-[9px] bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-black uppercase italic">{item.cat}</span>
                      <h4 className="font-bold mt-2 text-sm text-gray-800">{item.title}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {galleryItems.filter(a => category === 'All' || a.category === category).map(item => (
                  <motion.div layout key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 group">
                    {item.type === 'video' ? (
                      <video src={item.imageUrl} controls className="h-56 w-full object-cover" />
                    ) : (
                      <img src={item.imageUrl} alt={item.title} className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    )}
                    <div className="p-5">
                      <span className="text-[9px] bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-black uppercase italic">{item.category}</span>
                      <h4 className="font-bold mt-2 text-sm text-gray-800">{item.title}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'Join Us' && (
          <section className="max-w-4xl mx-auto">
            <div className="w-full bg-white rounded-[2rem] shadow-xl overflow-hidden h-[600px] md:h-[800px]">
              <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScVV3zaAroDPA5HNAJtECZpX-yPrA6P8NoS458fz-q7IxWcgw/viewform?embedded=true" className="w-full h-full" frameBorder="0">Chargement…</iframe>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-lg font-black uppercase tracking-tighter mb-4 italic">Al Ichraq <span className="text-orange-500">Oued Fes</span></h3>
          <p className="text-[9px] opacity-40 mb-8 uppercase tracking-widest font-bold italic">© 2026 Association Al Ichraq.</p>
          <div className="flex justify-center opacity-60 font-black text-[10px] tracking-[0.2em]">
            <a href="https://www.instagram.com/al.ichraq_wed_fes/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
          </div>
          {/* Lien admin caché */}
          <Link to="/admin" className="opacity-0 hover:opacity-20 transition-opacity absolute bottom-4 right-4 text-white"><Lock size={12} /></Link>
        </div>
      </footer>
    </div>
  );
};

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
