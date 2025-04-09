
import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '@/services/api';
import { Product, Category } from '@/types';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronDown, ChevronUp, FilterX, Search } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>("all"); // Changed from empty string to "all"
  const [selectedCondition, setSelectedCondition] = useState<string>("all"); // Changed from empty string to "all"
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
    
    // Apply category filter - changed to check for "all" instead of empty string
    if (selectedCategory !== "all") {
      results = results.filter(product => product.category === selectedCategory);
    }
    
    // Apply condition filter - changed to check for "all" instead of empty string
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
    setSelectedCategory("all"); // Changed from empty string to "all"
    setSelectedCondition("all"); // Changed from empty string to "all"
    setPriceRange([0, 200]);
    setSortBy('newest');
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Shop Thrift Items</h1>
      
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        </div>
      </div>
      
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button 
          onClick={toggleFilters}
          variant="outline" 
          className="w-full flex justify-between items-center"
        >
          <span className="flex items-center">
            <FilterX className="mr-2 h-4 w-4" />
            Filter & Sort
          </span>
          {showFilters ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters - Desktop always visible, Mobile conditional */}
        <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Filters</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                className="text-xs text-muted-foreground"
              >
                Reset All
              </Button>
            </div>
            
            {/* Categories Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Categories</h3>
              <Select 
                value={selectedCategory} 
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem> {/* Changed from empty string to "all" */}
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Condition Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Condition</h3>
              <RadioGroup 
                value={selectedCondition} 
                onValueChange={setSelectedCondition}
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="condition-all" /> {/* Changed from empty string to "all" */}
                    <Label htmlFor="condition-all">All Conditions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="New" id="condition-new" />
                    <Label htmlFor="condition-new">New</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Like New" id="condition-like-new" />
                    <Label htmlFor="condition-like-new">Like New</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Good" id="condition-good" />
                    <Label htmlFor="condition-good">Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Fair" id="condition-fair" />
                    <Label htmlFor="condition-fair">Fair</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Used" id="condition-used" />
                    <Label htmlFor="condition-used">Used</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 200]}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={200}
                  step={5}
                  className="mb-4"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>
            
            {/* Sort Filter */}
            <div>
              <h3 className="font-medium mb-3">Sort By</h3>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort Items" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="lg:col-span-3">
          {loading ? (
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
          ) : filteredProducts.length === 0 ? (
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
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
