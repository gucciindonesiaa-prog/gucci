import React from 'react';
import { Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 px-4 pb-12 md:px-8 text-gray-500 bg-gucci-grey border-t border-gray-200 pt-8">
      <div className="flex flex-col items-center gap-4 mb-8">
        <Globe size={20} strokeWidth={1} className="text-black" />
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-black mb-1">Gucci</span>
          <span className="text-sm font-serif font-bold uppercase tracking-[0.1em] text-gray-600">OSTERIA PALAZZO</span>
        </div>
      </div>
      <div className="pt-6 border-t border-gray-300/50">
        <p className="text-[10px] font-medium text-gray-500 text-center tracking-wider leading-relaxed">
          © 2016 - 2025 Guccio Gucci S.p.A. - All rights reserved.<br/>
          SIAE LICENCE # 2294/I/1936 and 5647/I/1936
        </p>
      </div>
    </footer>
  );
};