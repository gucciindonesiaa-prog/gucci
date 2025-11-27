import React, { useState } from 'react';
import { ShoppingBag, Menu, Plus, X, CheckCircle, Lock } from 'lucide-react';

interface HeaderProps {
  currentAgenda: number;
  onSelectAgenda: (id: number) => void;
  approvedAgendas: number[];
}

export const Header: React.FC<HeaderProps> = ({ currentAgenda, onSelectAgenda, approvedAgendas = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAgendaClick = (id: number, isLocked: boolean) => {
    if (isLocked) return;
    onSelectAgenda(id);
    setIsMenuOpen(false);
  };

  const handleContactClick = () => {
    const phoneNumber = "6281356112840";
    const message = "Hallo , saya peserta Gucci membutuhkan bantuan , terimakasih";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleShopClick = () => {
    window.open('https://www.gucci.com', '_blank');
  };

  // Helper to check if an agenda is locked based on previous approval
  const isLocked = (id: number) => {
    if (id === 1) return false; // Agenda 1 always open
    if (id === 100) return !approvedAgendas.includes(1); // Collection unlocks after Agenda 1
    return !approvedAgendas.includes(id - 1);
  };

  return (
    <>
      <header className="bg-white sticky top-0 z-40 border-b border-gray-100">
        {/* Main Navbar */}
        <div className="flex items-center justify-between px-4 py-5 md:px-8 relative bg-white">
          {/* Logo */}
          <div className="text-3xl tracking-[0.2em] font-serif font-bold text-black cursor-pointer" onClick={() => handleAgendaClick(1, false)}>
            GUCCI
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6 text-black">
            <ShoppingBag size={20} strokeWidth={1.5} className="cursor-pointer hover:text-gray-600 transition-colors" onClick={handleShopClick} />
            <button onClick={toggleMenu} className="focus:outline-none hover:text-gray-600 transition-colors">
              {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Sub-header contact link */}
        <div className="px-4 py-2 md:px-8 bg-gray-50 relative z-10 flex justify-end border-b border-gray-100">
          <button 
            onClick={handleContactClick}
            className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
          >
            <Plus size={10} className="mr-1" strokeWidth={3} />
            Contact Advisor
          </button>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col animate-fadeIn pt-24 px-8 overflow-y-auto">
          {/* Close Button absolute positioned to match header layout */}
          <div className="absolute top-0 left-0 right-0 px-4 py-5 md:px-8 flex justify-end">
             <button onClick={toggleMenu} className="p-1 text-black hover:text-gray-600 transition-colors">
               <X size={28} strokeWidth={1.5} />
             </button>
          </div>

          <div className="flex flex-col items-center space-y-8 pb-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Select Agenda</h2>
            {[1, 2, 3, 4, 5].map((num) => {
              const locked = isLocked(num);
              const approved = approvedAgendas.includes(num);
              return (
                <button
                  key={num}
                  onClick={() => handleAgendaClick(num, locked)}
                  disabled={locked}
                  className={`text-3xl font-serif tracking-widest transition-all flex items-center gap-4 ${
                    currentAgenda === num ? 'text-black scale-110' : 
                    locked ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  <span className={currentAgenda === num ? 'border-b border-black pb-2' : ''}>
                    AGENDA {num}
                  </span>
                  
                  {locked && <Lock size={18} className="text-gray-300" />}
                  
                  {!locked && approved && (
                    <div className="flex items-center text-green-600 text-[10px] font-bold uppercase tracking-wide border border-green-200 bg-green-50 px-2 py-1 rounded">
                      <CheckCircle size={12} className="mr-1" />
                      Done
                    </div>
                  )}
                </button>
              );
            })}
            
            <div className="w-16 h-px bg-gray-200 my-8"></div>
            
            <button 
              onClick={() => handleAgendaClick(100, isLocked(100))}
              disabled={isLocked(100)}
              className={`text-lg font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-3 ${
                currentAgenda === 100 ? 'text-black' : 
                isLocked(100) ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-black'
              }`}
            >
              Collections
              {isLocked(100) && <Lock size={14} />}
              {!isLocked(100) && approvedAgendas.includes(100) && (
                <div className="flex items-center text-green-600 text-[10px] font-bold uppercase tracking-wide border border-green-200 bg-green-50 px-2 py-1 rounded ml-2">
                  <CheckCircle size={12} className="mr-1" />
                  Done
                </div>
              )}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};