
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, FilterX } from 'lucide-react';

interface MobileFilterToggleProps {
  showFilters: boolean;
  toggleFilters: () => void;
}

const MobileFilterToggle: FC<MobileFilterToggleProps> = ({ showFilters, toggleFilters }) => {
  return (
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
  );
};

export default MobileFilterToggle;
