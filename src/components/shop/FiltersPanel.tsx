
import { FC } from 'react';
import { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface FiltersPanelProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedCondition: string;
  setSelectedCondition: (condition: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  resetFilters: () => void;
}

const FiltersPanel: FC<FiltersPanelProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedCondition,
  setSelectedCondition,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  resetFilters
}) => {
  return (
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
            <SelectItem value="all">All Categories</SelectItem>
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
              <RadioGroupItem value="all" id="condition-all" />
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
  );
};

export default FiltersPanel;
