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
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold font-serif tracking-widest uppercase mb-2">
          Special Collection
        </h1>
        <p className="text-xs text-gray-500 font-medium max-w-md mx-auto">
          Exclusive weekend selection
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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