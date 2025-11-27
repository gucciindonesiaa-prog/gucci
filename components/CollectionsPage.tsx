import React from 'react';
import { COLLECTION_PRODUCTS } from '../constants';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface CollectionsPageProps {
  onSelect: (item: any) => void;
  isApproved: boolean;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({ onSelect, isApproved }) => {
  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold font-serif tracking-[0.2em] uppercase mb-3 text-black">
          Special Collection
        </h1>
        <div className="w-12 h-px bg-black mx-auto mb-3 opacity-20"></div>
        <p className="text-xs text-gray-500 font-light tracking-widest max-w-md mx-auto uppercase">
          Exclusive Weekend Selection
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COLLECTION_PRODUCTS.map((item) => {
              // Adapt to Product interface for display
              const displayProduct: Product = {
                  id: 999, // Dummy ID for display compatibility with ProductCard
                  name: item.name,
                  price: item.price,
                  benefit: item.benefitPercent,
                  profit: item.profitAmount,
                  imageUrl: item.imageUrl
              };
              return (
                  <ProductCard 
                      key={item.id}
                      product={displayProduct}
                      onSelect={() => onSelect(item)} // Pass raw item back
                      isApproved={isApproved}
                      isFullCard={false}
                  />
              )
          })}
      </div>
    </div>
  )
}