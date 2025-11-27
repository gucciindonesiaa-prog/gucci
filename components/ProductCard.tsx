import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  isFullCard?: boolean;
  isApproved?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  isFullCard = false,
  isApproved = false
}) => {
  return (
    <div className="flex flex-col w-full group">
      {/* Image Container */}
      <div className={`relative w-full aspect-square bg-[#f5f5f5] flex items-center justify-center mb-5 overflow-hidden ${!isApproved ? 'cursor-pointer' : ''}`}>
        
        {/* Number Badge */}
        <div className="absolute top-2 left-2 w-6 h-6 border border-black/10 flex items-center justify-center text-[10px] text-gray-400 z-10 font-serif">
          {product.id}
        </div>
        
        {/* Real Product Image */}
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className={`w-full h-full transition-transform duration-700 ease-out ${!isApproved ? 'group-hover:scale-105' : ''} ${
            isFullCard 
              ? 'object-cover' 
              : 'object-contain mix-blend-multiply p-8'
          }`}
        />
        
        {/* Approved Overlay */}
        {isApproved && (
           <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px]">
             <span className="text-black border-2 border-black px-3 py-1 font-bold uppercase tracking-widest text-xs -rotate-12">
               Selected
             </span>
           </div>
        )}
      </div>

      {/* Product Title */}
      <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-4 min-h-[32px] leading-relaxed group-hover:opacity-70 transition-opacity">
        {product.name}
      </h3>

      {/* Product Details Table */}
      <div className="space-y-2 text-[10px] uppercase tracking-wide mb-6 border-t border-gray-200 pt-4">
        <div className="flex justify-between items-end">
          <span className="text-gray-500">Price</span>
          <span className="text-black font-medium">{product.price}</span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-gray-500">Benefit</span>
          <span className="text-black">{product.benefit}</span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-gray-500">Profit</span>
          <span className="text-black font-bold text-xs">{product.profit}</span>
        </div>
      </div>

      {/* Select Button */}
      <button 
        onClick={() => onSelect(product)}
        disabled={isApproved}
        className={`w-full text-[10px] font-bold uppercase tracking-[0.2em] py-3.5 transition-all duration-300 border ${
          isApproved 
            ? 'bg-transparent border-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-black border-black text-white hover:bg-white hover:text-black'
        }`}
      >
        {isApproved ? 'Selesai' : 'Pilih Paket'}
      </button>
    </div>
  );
};