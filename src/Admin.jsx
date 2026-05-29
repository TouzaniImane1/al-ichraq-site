import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, onSnapshot, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { Lock, LogOut, Upload, CheckCircle, Loader, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CLOUD_NAME = 'djp4sybde';
const UPLOAD_PRESET = 'al-ichraq-gallery';

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [galleryItems, setGalleryItems] = useState([]);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Events');
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setGalleryItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
    } catch (err) {
      alert("Erreur de connexion : " + err.message);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const resourceType = file.type.includes('video') ? 'video' : 'image';
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

    try {
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
      };

      const result = await new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status === 200) resolve(JSON.parse(xhr.responseText));
          else reject(new Error('Upload échoué'));
        };
        xhr.onerror = () => reject(new Error('Erreur réseau'));
        xhr.open('POST', url);
        xhr.send(formData);
      });

      await addDoc(collection(db, 'gallery'), {
        title,
        category,
        imageUrl: result.secure_url,
        publicId: result.public_id,
        createdAt: serverTimestamp(),
        type: resourceType,
      });

      setTitle('');
      setFile(null);
      setProgress(0);
      alert('Contenu ajouté avec succès !');
    } catch (err) {
      alert('Erreur upload : ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Supprimer "${item.title}" ?`)) return;
    try {
      await deleteDoc(doc(db, 'gallery', item.id));
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-[2rem] shadow-xl w-full max-w-md border border-gray-100">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-black text-blue-900 uppercase italic">Admin Access</h2>
            <p className="text-gray-400 text-sm">Espace réservé à l'association</p>
          </div>
          <input type="email" placeholder="Email" className="w-full p-4 mb-4 bg-gray-50 rounded-xl border-none outline-blue-500" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Mot de passe" className="w-full p-4 mb-6 bg-gray-50 rounded-xl border-none outline-blue-500" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all">SE CONNECTER</button>
          <button type="button" onClick={() => navigate('/')} className="w-full mt-3 text-gray-400 text-xs font-bold uppercase hover:text-gray-600">← Retour au site</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-black text-blue-900 uppercase italic">Gestion Galerie</h1>
          <button onClick={() => { signOut(auth); setUser(null); }} className="flex items-center gap-2 text-red-500 font-bold text-sm"><LogOut size={18}/> Quitter</button>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Upload className="text-orange-500"/> إضافة محتوى جديد</h2>

          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Titre de l'activité</label>
              <input type="text" placeholder="مثلا: ليلة 27 رمضان" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Catégorie</label>
                <select className="w-full p-4 bg-gray-50 rounded-2xl border-none" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Events">Events</option>
                  <option value="Moukhyam">Moukhyam</option>
                  <option value="Sessions">Sessions</option>
                  <option value="Trips">Trips</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Fichier (Photo/Vidéo)</label>
                <input type="file" accept="image/*,video/*" className="w-full p-3 text-sm" onChange={(e) => setFile(e.target.files[0])} required />
              </div>
            </div>

            {uploading && (
              <div>
                <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-xs text-gray-400 mt-1 text-center">{progress}%</p>
              </div>
            )}

            <button disabled={uploading} className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black shadow-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-3 disabled:opacity-60">
              {uploading ? <Loader className="animate-spin" /> : <CheckCircle />}
              {uploading ? 'ENVOI EN COURS...' : 'PUBLIER SUR LE SITE'}
            </button>
          </form>
        </div>

        {galleryItems.length > 0 && (
          <div className="mt-10 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h2 className="text-lg font-black text-blue-900 uppercase mb-6">Contenus publiés ({galleryItems.length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {galleryItems.map(item => (
                <div key={item.id} className="relative group rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  {item.type === 'video' ? (
                    <video src={item.imageUrl} className="h-32 w-full object-cover" />
                  ) : (
                    <img src={item.imageUrl} alt={item.title} className="h-32 w-full object-cover" />
                  )}
                  <div className="p-2">
                    <p className="text-xs font-bold truncate text-gray-700">{item.title}</p>
                    <span className="text-[9px] text-orange-500 font-bold uppercase">{item.category}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(item)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
