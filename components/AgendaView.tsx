import React from 'react';

interface AgendaViewProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  isApproved: boolean;
  onApprove: () => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({ id, title, description, imageUrl, isApproved, onApprove }) => {
  return (
    <div className="flex flex-col md:flex-row gap-12 items-center animate-fade-in min-h-[60vh]">
      <div className="w-full md:w-1/2 space-y-6">
        <div className="text-gucci-gold uppercase tracking-widest text-sm font-bold">
          Agenda Item {id === 1 ? 'I' : 'II'}
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-gucci-dark leading-tight">
          {title}
        </h1>
        <div className="w-20 h-1 bg-gucci-gold/30"></div>
        <p className="text-lg text-stone-600 font-light leading-relaxed">
          {description}
        </p>
        
        <div className="pt-8">
          {isApproved ? (
             <div className="inline-flex items-center gap-3 px-6 py-3 border border-gucci-green text-gucci-green bg-gucci-green/5 rounded-sm uppercase tracking-widest text-xs font-bold">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
               <span>Approved</span>
             </div>
          ) : (
            <button 
              onClick={onApprove}
              className="px-10 py-4 bg-gucci-dark text-white text-sm uppercase tracking-widest hover:bg-gucci-gold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Approve Agenda
            </button>
          )}
        </div>
      </div>

      <div className="w-full md:w-1/2 relative">
        <div className="relative aspect-[4/5] md:aspect-square overflow-hidden shadow-2xl border-8 border-white">
           <img 
             src={imageUrl} 
             alt={title} 
             className="w-full h-full object-cover"
           />
           <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur p-6 border-l-4 border-gucci-gold">
             <p className="font-serif italic text-stone-800">"Luxury lies not in richness and ornateness but in the absence of vulgarity."</p>
           </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-gucci-gold opacity-50"></div>
        <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-gucci-gold opacity-50"></div>
      </div>
    </div>
  );
};