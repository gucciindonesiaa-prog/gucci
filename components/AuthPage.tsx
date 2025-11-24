import React, { useState } from 'react';
import { Share2, User, Phone, Lock, Key, UserPlus, LogIn, AlertCircle } from 'lucide-react';

interface AuthPageProps {
  onSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    userId: '',
    phone: '',
    password: '',
    inviteCode: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (!formData.userId || !formData.phone || !formData.password || !formData.inviteCode) {
        setError("Mohon lengkapi semua kolom pendaftaran.");
        return;
      }
      if (formData.inviteCode !== '080900') {
        setError("Kode Undangan salah. Gunakan 080900.");
        return;
      }
      
      // Save user info
      localStorage.setItem('gucci_user_id', formData.userId);
      localStorage.setItem('gucci_user_phone', formData.phone);
      
      // Registration successful
      onSuccess();
    } else {
      // Login logic (mock)
       if (!formData.userId || !formData.password) {
        setError("Mohon lengkapi ID dan Kata Sandi.");
        return;
      }
      // Save user info (mocking phone for login since we don't have a real backend)
      localStorage.setItem('gucci_user_id', formData.userId);
      if (!localStorage.getItem('gucci_user_phone')) {
          localStorage.setItem('gucci_user_phone', '085256523635'); // Default if not found
      }
      
      onSuccess();
    }
  };

  const copyLink = () => {
    const url = "https://gucci-qingfengspan.vercel.app/";
    navigator.clipboard.writeText(url);
    alert("Link berhasil disalin");
  };

  const VIDEO_URL = "https://house-fastly-signed-eu-west-1-prod.brightcovecdn.com/media/v1/pmp4/static/clear/2924921183001/72a0a43c-b6a5-4e83-b80e-f82796b8a315/ab6d51c0-ffbd-47d0-b126-8887bcd0adf5/main.mp4?fastly_token=NjkyNDQwNTlfNjE3OTNmM2NmMmFiMzUwYmU4NzI4MDFmMGEyOGY3YTYzZTJmMjc4ZDI5NjAwZDk3N2EzYmQ1YTg2OTc5Y2I3N18vL2hvdXNlLWZhc3RseS1zaWduZWQtZXUtd2VzdC0xLXByb2QuYnJpZ2h0Y292ZWNkbi5jb20vbWVkaWEvdjEvcG1wNC9zdGF0aWMvY2xlYXIvMjkyNDkyMTE4MzAwMS83MmEwYTQzYy1iNmE1LTRlODMtYjgwZS1mODI3OTZiOGEzMTUvYWI2ZDUxYzAtZmZiZC00N2QwLWIxMjYtODg4N2JjZDBhZGY1L21haW4ubXA0";

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white flex flex-col items-center justify-center relative font-sans overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-60"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </div>
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="w-full max-w-md px-6 z-10 relative">
        {/* Copy Link Button */}
        <div className="absolute -top-16 right-6">
           <button 
             onClick={copyLink}
             className="flex items-center gap-2 bg-[#2a2a2a]/80 backdrop-blur border border-[#b89b5e]/30 text-[#b89b5e] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#333] transition-colors"
           >
             Salin Link <Share2 size={12} />
           </button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-serif font-bold tracking-widest text-[#b89b5e] mb-2">GUCCI</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">
            {isRegister ? 'Pendaftaran Akun Kerja' : 'Masuk Akun Kerja'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl animate-fadeIn">
          
          {/* New Instruction Banner */}
          {isRegister && (
            <div className="mb-6 p-4 bg-[#b89b5e]/10 border border-[#b89b5e]/20 rounded-lg flex gap-3 items-start">
               <AlertCircle className="text-[#b89b5e] flex-shrink-0 mt-0.5" size={16} />
               <p className="text-[11px] text-gray-200 leading-relaxed font-medium">
                 Wajib daftarkan <span className="text-[#b89b5e] font-bold">Akun Kerja</span> anda terlebih dahulu untuk masuk ke sistem dan memilih pesanan.
               </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#b89b5e] transition-colors" size={18} />
              <input 
                type="text" 
                name="userId"
                placeholder={isRegister ? "Buat ID Kerja" : "ID Kerja"}
                value={formData.userId}
                onChange={handleInputChange}
                className="w-full bg-[#2a2a2a]/80 text-white border border-gray-700 rounded-lg py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#b89b5e] placeholder-gray-500 transition-colors"
              />
            </div>

            {isRegister && (
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#b89b5e] transition-colors" size={18} />
                <input 
                  type="text" 
                  name="phone"
                  placeholder="Nomor Telepon"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-[#2a2a2a]/80 text-white border border-gray-700 rounded-lg py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#b89b5e] placeholder-gray-500 transition-colors"
                />
              </div>
            )}

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#b89b5e] transition-colors" size={18} />
              <input 
                type="password" 
                name="password"
                placeholder="Kata Sandi"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-[#2a2a2a]/80 text-white border border-gray-700 rounded-lg py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#b89b5e] placeholder-gray-500 transition-colors"
              />
            </div>

            {isRegister && (
              <div className="relative group">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#b89b5e] transition-colors" size={18} />
                <input 
                  type="text" 
                  name="inviteCode"
                  placeholder="Kode Undangan (Wajib)"
                  value={formData.inviteCode}
                  onChange={handleInputChange}
                  className="w-full bg-[#2a2a2a]/80 text-white border border-gray-700 rounded-lg py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#b89b5e] placeholder-gray-500 transition-colors"
                />
              </div>
            )}

            {error && (
              <div className="text-red-500 text-xs font-medium text-center animate-pulse bg-red-900/20 p-2 rounded">
                {error}
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-[#b89b5e] text-[#1c1c1c] font-bold text-sm uppercase tracking-widest py-4 rounded-lg hover:bg-[#c9ad74] transition-all transform active:scale-[0.98] mt-6 flex items-center justify-center gap-2 shadow-lg shadow-[#b89b5e]/20"
            >
              {isRegister ? 'Daftar Akun Kerja' : 'Masuk Kerja'}
              {isRegister ? <UserPlus size={16} /> : <LogIn size={16} />}
            </button>

          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
                setFormData({ userId: '', phone: '', password: '', inviteCode: '' });
              }}
              className="text-[#b89b5e] text-[11px] font-bold uppercase tracking-widest hover:underline hover:text-white transition-colors"
            >
              {isRegister ? 'Sudah punya akun kerja? Masuk' : 'Belum punya akun? Daftar'}
            </button>

            {isRegister && (
              <p className="text-gray-500 text-[10px] mt-4 font-medium">
                Pendaftaran wajib menggunakan Kode Undangan (080900).
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom Background Text */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none flex justify-center opacity-10">
         <span className="text-[150px] md:text-[220px] font-serif font-bold text-white leading-[0.8]">GUCCI</span>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};