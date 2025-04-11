
import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '@/services/api';
import { Product, Category } from '@/types';
import SearchBar from '@/components/shop/SearchBar';
import ProductGrid from '@/components/shop/ProductGrid';
import FiltersPanel from '@/components/shop/FiltersPanel';
import MobileFilterToggle from '@/components/shop/MobileFilterToggle';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCondition, setSelectedCondition] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState<string>('newest');
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch shop data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Apply filters whenever filter criteria change
  useEffect(() => {
    let results = [...products];
    
    // Apply search filter
    if (searchQuery) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      results = results.filter(product => product.category === selectedCategory);
    }
    
    // Apply condition filter
    if (selectedCondition !== "all") {
      results = results.filter(product => product.condition === selectedCondition);
    }
    
    // Apply price range filter
    results = results.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        break;
    }
    
    setFilteredProducts(results);
  }, [products, searchQuery, selectedCategory, selectedCondition, priceRange, sortBy]);
  
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory("all");
    setSelectedCondition("all");
    setPriceRange([0, 200]);
    setSortBy('newest');
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Shop Thrift Items</h1>
      
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <MobileFilterToggle 
        showFilters={showFilters} 
        toggleFilters={toggleFilters} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters - Desktop always visible, Mobile conditional */}
        <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <FiltersPanel
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCondition={selectedCondition}
            setSelectedCondition={setSelectedCondition}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
            resetFilters={resetFilters}
          />
        </div>
        
        {/* Product Grid */}
        <div className="lg:col-span-3">
          <ProductGrid 
            loading={loading}
            filteredProducts={filteredProducts}
            resetFilters={resetFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;
