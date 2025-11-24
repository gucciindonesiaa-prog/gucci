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
     const url = window.location.href;
     navigator.clipboard.writeText(url);
     alert("Link aplikasi berhasil disalin!");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col relative pb-8 animate-fadeIn">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
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
        <div className="bg-[#1c1c1c] rounded-lg p-4 flex items-center justify-between border border-white/5">
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
        <div className="bg-[#1c1c1c] rounded-lg p-4 flex items-center justify-between border border-white/5">
          <div className="flex items-center gap-4">
             <div className="p-2 bg-[#2a2a2a] rounded text-[#b89b5e]">
                <Key size={20} />
             </div>
             <span className="font-semibold text-sm">Kode Referensi</span>
          </div>
          <span className="text-gray-400 font-mono tracking-widest">{inviteCode}</span>
        </div>

        {/* Bagikan Aplikasi */}
        <div className="bg-[#1c1c1c] rounded-lg p-4 flex items-center justify-between border border-white/5">
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
          className="w-full mt-8 border border-red-900/50 bg-red-900/10 text-red-500 font-bold text-xs uppercase tracking-widest py-4 rounded-lg hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut size={16} />
          KELUAR
        </button>
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