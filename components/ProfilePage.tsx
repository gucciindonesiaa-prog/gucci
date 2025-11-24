import React from 'react';
import { User, Share2, Key, ArrowLeft, LogOut } from 'lucide-react';

interface ProfilePageProps {
  onBackToHome: () => void;
  onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBackToHome, onLogout }) => {
  const userId = localStorage.getItem('gucci_user_id') || 'User';
  const phone = localStorage.getItem('gucci_user_phone') || '085256523635';
  const inviteCode = '080900';

  const handleCopyLink = () => {
     const url = "https://gucci-qingfengspan.vercel.app/";
     navigator.clipboard.writeText(url);
     alert("Link aplikasi berhasil disalin!");
  };

  const VIDEO_URL = "https://house-fastly-signed-eu-west-1-prod.brightcovecdn.com/media/v1/pmp4/static/clear/2924921183001/72a0a43c-b6a5-4e83-b80e-f82796b8a315/ab6d51c0-ffbd-47d0-b126-8887bcd0adf5/main.mp4?fastly_token=NjkyNDQwNTlfNjE3OTNmM2NmMmFiMzUwYmU4NzI4MDFmMGEyOGY3YTYzZTJmMjc4ZDI5NjAwZDk3N2EzYmQ1YTg2OTc5Y2I3N18vL2hvdXNlLWZhc3RseS1zaWduZWQtZXUtd2VzdC0xLXByb2QuYnJpZ2h0Y292ZWNkbi5jb20vbWVkaWEvdjEvcG1wNC9zdGF0aWMvY2xlYXIvMjkyNDkyMTE4MzAwMS83MmEwYTQzYy1iNmE1LTRlODMtYjgwZS1mODI3OTZiOGEzMTUvYWI2ZDUxYzAtZmZiZC00N2QwLWIxMjYtODg4N2JjZDBhZGY1L21haW4ubXA0";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col relative pb-8 animate-fadeIn overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-40"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col w-full h-full flex-grow">
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <button 
            onClick={onBackToHome}
            className="p-2 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={24} />
            <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Kembali</span>
          </button>
        </div>

        {/* Profile Header */}
        <div className="pt-16 pb-8 flex flex-col items-center justify-center space-y-3">
          <div className="w-24 h-24 rounded-full border-2 border-[#b89b5e] flex items-center justify-center relative bg-[#111]">
            <User size={40} className="text-[#b89b5e]" />
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[#0a0a0a]"></div>
          </div>
          
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold tracking-wider">{phone}</h2>
            <p className="text-[#b89b5e] font-bold text-lg">{userId}</p>
            <p className="text-xs text-gray-500 tracking-widest uppercase">Level 1 Associate</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-6 space-y-4 w-full max-w-md mx-auto">
          {/* Status Akun */}
          <div className="bg-[#1c1c1c]/80 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-[#2a2a2a] rounded text-[#b89b5e]">
                  <User size={20} />
              </div>
              <span className="font-semibold text-sm">Status Akun</span>
            </div>
            <span className="bg-[#1a3a2a] text-green-500 text-[10px] font-bold px-3 py-1 rounded border border-green-900/50">
              AKTIF
            </span>
          </div>

          {/* Kode Referensi */}
          <div className="bg-[#1c1c1c]/80 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-[#2a2a2a] rounded text-[#b89b5e]">
                  <Key size={20} />
              </div>
              <span className="font-semibold text-sm">Kode Referensi</span>
            </div>
            <span className="text-gray-400 font-mono tracking-widest">{inviteCode}</span>
          </div>

          {/* Bagikan Aplikasi */}
          <div className="bg-[#1c1c1c]/80 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-[#2a2a2a] rounded text-[#b89b5e]">
                  <Share2 size={20} />
              </div>
              <span className="font-semibold text-sm">Bagikan Aplikasi</span>
            </div>
            <button onClick={handleCopyLink} className="text-[#b89b5e] text-[10px] font-bold uppercase tracking-wider hover:text-white transition-colors">
              SALIN LINK
            </button>
          </div>
          
          {/* Logout Button */}
          <button 
            onClick={onLogout}
            className="w-full mt-8 border border-red-900/50 bg-red-900/10 backdrop-blur-sm text-red-500 font-bold text-xs uppercase tracking-widest py-4 rounded-lg hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            KELUAR
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};