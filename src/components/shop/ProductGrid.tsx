
import { Product } from '@/types';
import { FC } from 'react';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface ProductGridProps {
  loading: boolean;
  filteredProducts: Product[];
  resetFilters: () => void;
}

const ProductGrid: FC<ProductGridProps> = ({ 
  loading, 
  filteredProducts,
  resetFilters 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, i) => (
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
        ))}
      </div>
    );
  }
  
  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-lg">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No items found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your search or filter criteria
        </p>
        <Button onClick={resetFilters}>Clear Filters</Button>
      </div>
    );
  }
  
  return (
    <>
      <p className="mb-4 text-muted-foreground">
        Showing {filteredProducts.length} results
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductGrid;
