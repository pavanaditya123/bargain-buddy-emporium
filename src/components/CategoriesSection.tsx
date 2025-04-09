
import { useState, useEffect } from 'react';
import { fetchCategories } from '@/services/api';
import { Link } from 'react-router-dom';
import { Category } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const categoryIcons: Record<Category, string> = {
  'Clothing': '👕',
  'Accessories': '👜',
  'Home Goods': '🏠',
  'Electronics': '📱',
  'Books': '📚',
  'Vintage': '⏰',
  'Collectibles': '🧸',
  'Art': '🎨',
  'Other': '🔍',
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <section className="py-12 px-4 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Browse Categories</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {loading
            ? Array(9).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <Skeleton className="h-16 w-16 rounded-full mb-3" />
                  <Skeleton className="h-5 w-24" />
                </div>
              ))
            : categories.map(category => (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase()}`}
                  className="flex flex-col items-center p-4 rounded-lg bg-background transition-all hover:transform hover:scale-105 hover:shadow-md"
                >
                  <span className="text-4xl mb-3" role="img" aria-label={category}>
                    {categoryIcons[category]}
                  </span>
                  <span className="font-medium text-center">{category}</span>
                </Link>
              ))
          }
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
