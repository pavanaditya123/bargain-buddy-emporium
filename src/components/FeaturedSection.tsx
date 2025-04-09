
import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { fetchProducts } from '@/services/api';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        // Just get the first 4 for featured
        setProducts(data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Featured Finds</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array(4).fill(0).map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden">
                  <Skeleton className="h-60 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-8 w-20 rounded-md" />
                    </div>
                  </div>
                </div>
              ))
            : products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
          }
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
