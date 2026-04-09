import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Camera, Image as ImageIcon, CheckCircle, Target } from 'lucide-react';

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

  const scrollToAbout = () => {
    setActiveTab('Home');
    setTimeout(() => {
      const element = document.getElementById('about-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const goals = [
    "الاهتمام بالتخييم والتكوين التربوي والتدريب وتطوير الكفاءات ذاتيا وعلميا، اجتماعيا، ثقافيا، فنيا، رياضيا، صحيا، وبيئيا.",
    "العمل على تطبيق شريعة الكشاف، ونشر المناهج الكشفية، والخضوع للقسم وفق خطة المكتب الكشفي العالمي والمنظمة الكشفية العربية.",
    "خدمة الطفولة والشباب بجنسيهما، لتحقيق الغايات الكشفية التربوية والتنموية المستدامة.",
    "تأطير المواطنين وتحسين أدائهم اقتصاديا، اجتماعيا وثقافيا وبيئيا من أجل إدماجهم في التنمية.",
    "تقوية أسس التضامن والتعاون بربط علاقات الصداقة والشراكة على المستوى المحلي والوطني والدولي بين مختلف الهيئات والجمعيات ذات الاهتمام المشترك قصد تفعيل الدبلوماسية الموازية.",
    "المساهمة في العمل التنموي باعتماد وسائل وآليات فعالة؛ الانخراط الفاعل في التنمية البشرية المستدامة.",
    "التربية والتنمية الشاملة:(الفكرية، والرياضية، والاجتماعية، والفنية، والثقافية والبيئية) للطفولة والشباب وفق قيم المقدسات الوطنية.",
    "تقوية النسيج التربوي والاهتمام بالمرأة وتعزيز دور الأسرة؛ والاهتمام بالشباب العاطل مع مراعاة مقاربة النوع في كافة البرامج والمشاريع.",
    "محاربة الأمية والتربية غير النظامية والتعليم الأولي وإدماج ذوي الاحتياجات الخاصة.",
    "الاهتمام بالفنون المسرحية و السينمائية و الموسيقية و الفن التشكيلي.",
    "تعزيز قيم المواطنة والديموقراطية، والتعاون والتسامح، لتكوين عالم أفضل يتمتع فيه الأفراد بالاستقلال الذاتي والفعالية في بناء المجتمع."
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
        <div className="flex flex-col">
          <h1 className="text-xl font-black text-blue-800 tracking-tighter uppercase leading-none">Al Ichraq</h1>
          <span className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em]">Oued Fes Section</span>
        </div>
        
        <div className="hidden md:flex space-x-8 font-bold text-xs uppercase tracking-widest">
          <button onClick={() => setActiveTab('Home')} className={`${activeTab === 'Home' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'} pb-1`}>Home</button>
          <button onClick={scrollToAbout} className="text-gray-400 hover:text-blue-500 transition-all pb-1">About</button>
          <button onClick={() => setActiveTab('Gallery')} className={`${activeTab === 'Gallery' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'} pb-1`}>Gallery</button>
          <button onClick={() => setActiveTab('Join Us')} className={`${activeTab === 'Join Us' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'} pb-1`}>Join Us</button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        
        {/* --- HOME & ABOUT --- */}
        {activeTab === 'Home' && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            
            {/* LOGO */}
            <div className="mb-12 flex justify-center">
                <img src="/logo.jpeg" alt="Logo Al Ichraq" className="w-64 h-64 md:w-80 md:h-80 object-cover" style={{ clipPath: 'circle(38%)' }} />
            </div>
            
            {/* DEFINITION */}
            <div className="max-w-4xl mx-auto mb-20">
              <h2 className="text-4xl font-black text-blue-900 mb-8 underline decoration-orange-500 decoration-4 underline-offset-8">التعريف</h2>
              <p className="text-xl text-gray-700 leading-relaxed rtl font-medium bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100 text-right">
                جمعية وطنية كشفية تربوية تنموية تهتم بمجال الطفولة والشباب والتخييم والتكوين التربوي والتدريب وتطوير القيادات والكفاءات علميا، اجتماعيا، ثقافيا، فنيا، رياضيا، صحيا، وبيئيا، تهتدي بمبادئ التربية المغربية وفق مقومات الهوية الإسلامية، وقيمها الرامية لتكوين مجتمع متصف بالاستقامة والصلاح، المتسم بالتسامح والتعايش، والمطبوع بروح المبادرة الإيجابية والإنتاج النافع.
              </p>
            </div>

            {/* GOALS SECTION */}
            <div id="about-section" className="py-10">
              <div className="flex items-center justify-center gap-3 mb-12">
                <Target className="text-orange-500" size={32} />
                <h3 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">الأهداف</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {goals.map((goal, index) => (
                  <div key={index} className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm flex flex-row-reverse items-start gap-4 text-right hover:shadow-md transition-shadow">
                    <div className="bg-orange-100 p-2 rounded-xl mt-1 shrink-0">
                      <CheckCircle size={18} className="text-orange-600" />
                    </div>
                    <p className="text-gray-700 font-bold text-sm leading-relaxed rtl">{goal}</p>
                  </div>
                ))}
              </div>

              {/* 3 BOXES EN BAS - AVEC MARGE ET STYLE CORRIGÉS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 border-t border-gray-100 pt-20">
                <div className="p-8 bg-gray-50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                     <Users className="text-blue-600" />
                  </div>
                  <h3 className="font-black text-lg mb-3 uppercase tracking-tighter text-blue-900">Encadrement</h3>
                  <p className="text-sm text-gray-500 font-bold leading-relaxed">تأطير تربوي هادف للناشئة وفق قيم المواطنة</p>
                </div>

                <div className="p-8 bg-gray-50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                     <Camera className="text-orange-500" />
                  </div>
                  <h3 className="font-black text-lg mb-3 uppercase tracking-tighter text-blue-900">Activités</h3>
                  <p className="text-sm text-gray-500 font-bold leading-relaxed">برامج متنوعة : مخيمات، ورشات، أناشيد وخرجات</p>
                </div>

                <div className="p-8 bg-gray-50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                     <MapPin className="text-green-500" />
                  </div>
                  <h3 className="font-black text-lg mb-3 uppercase tracking-tighter text-blue-900">Localisation</h3>
                  <p className="text-sm text-gray-500 font-bold leading-relaxed">واد فاس، مدينة فاس - المملكة المغربية</p>
                </div>
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
                <button key={cat} onClick={() => setCategory(cat)} className={`px-6 py-2 rounded-full text-xs font-black tracking-widest transition-all ${category === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>{cat.toUpperCase()}</button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {activities.filter(a => category === 'All' || a.cat === category).map(item => (
                <motion.div layout key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 group">
                  <PhotoPlaceholder category={item.cat} />
                  <div className="p-6">
                    <span className="text-[10px] bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-black uppercase tracking-tighter italic">{item.cat}</span>
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
            <div className="w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden h-[800px]">
              <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScVV3zaAroDPA5HNAJtECZpX-yPrA6P8NoS458fz-q7IxWcgw/viewform?embedded=true" className="w-full h-full" frameBorder="0">Chargement…</iframe>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-black uppercase tracking-tighter mb-4 italic text-white">Al Ichraq <span className="text-orange-500">Oued Fes</span></h3>
          <p className="text-[10px] opacity-40 mb-8 uppercase tracking-widest font-bold italic">© 2026 Association Al Ichraq.</p>
          <div className="flex justify-center opacity-60 font-black text-[11px] tracking-[0.3em]">
            <a href="https://www.instagram.com/al.ichraq_wed_fes/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">INSTAGRAM</a>
          </div>
        </div>
      </footer>
    </div>
  );
}