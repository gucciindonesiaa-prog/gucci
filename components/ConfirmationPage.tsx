import React from 'react';
import { Product } from '../types';
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react';

interface ConfirmationPageProps {
  product: Product;
  onBack: () => void;
  onConfirm: () => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ product, onBack, onConfirm }) => {
  return (
    <div className="animate-fadeIn pb-12">
      {/* Back Navigation */}
      <button
        onClick={onBack}
        className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black mb-8 transition-colors"
      >
        <ArrowLeft size={12} className="mr-2" />
        Kembali ke Agenda
      </button>

      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold font-serif tracking-[0.2em] mb-3 text-black uppercase">
          Konfirmasi Pesanan
        </h1>
        <p className="text-xs text-gray-500 font-light tracking-wide">
          Harap tinjau pilihan Anda di bawah ini sebelum melanjutkan
        </p>
      </div>

      <div className="bg-white border border-gray-100 p-6 md:p-10 max-w-md mx-auto shadow-xl relative overflow-hidden">
        {/* Selected Item Image */}
        <div className="w-full aspect-square bg-[#f9f9f9] mb-8 flex items-center justify-center overflow-hidden relative">
           <div className="absolute top-3 left-3 px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest z-10">
             Selected
           </div>
           <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-3/4 h-3/4 object-contain mix-blend-multiply"
          />
        </div>

        {/* Details */}
        <h2 className="text-sm font-bold uppercase tracking-widest text-black mb-6 text-center leading-relaxed">
          {product.name}
        </h2>

        <div className="space-y-4 border-t border-gray-100 pt-6 mb-8">
          <div className="flex justify-between text-xs tracking-wide">
            <span className="text-gray-500 uppercase">Harga</span>
            <span className="font-bold text-black">IDR {product.price}</span>
          </div>
          <div className="flex justify-between text-xs tracking-wide">
            <span className="text-gray-500 uppercase">Benefit</span>
            <span className="text-black font-medium">{product.benefit}</span>
          </div>
          <div className="flex justify-between text-sm font-bold pt-4 border-t border-gray-100">
             <span className="uppercase tracking-widest text-black">Total Profit</span>
             <span className="text-black">IDR {product.profit}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button 
            onClick={onConfirm}
            className="w-full bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] py-4 hover:bg-gray-800 transition-colors flex items-center justify-center"
          >
            <Check size={14} className="mr-2" />
            Konfirmasi
          </button>
          
          <button 
            onClick={onBack}
            className="w-full bg-transparent border border-gray-200 text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em] py-4 hover:border-black hover:text-black transition-colors"
          >
            Batal
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest">
          <ShieldCheck size={12} />
          <span>Gucci Official Guarantee</span>
        </div>
      </div>
    </div>
  );
};