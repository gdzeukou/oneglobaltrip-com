import { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { searchCities, getCityDisplay, City } from '@/data/cities';
import { cn } from '@/lib/utils';

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string, city?: City) => void;
  label: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

const CityAutocomplete = ({
  value,
  onChange,
  label,
  placeholder = "Search for a city...",
  error,
  required = false,
  className = ""
}: CityAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value && value.length >= 2) {
      const results = searchCities(value, 8);
      setSearchResults(results);
      setIsOpen(results.length > 0);
    } else {
      setSearchResults([]);
      setIsOpen(false);
    }
    setHighlightedIndex(-1);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  };

  const handleSelectCity = (city: City) => {
    const displayValue = getCityDisplay(city);
    onChange(displayValue, city);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelectCity(searchResults[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <div className={cn("relative space-y-2", className)}>
      <Label htmlFor="city-input" className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <Input
          ref={inputRef}
          id="city-input"
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (searchResults.length > 0) {
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          className={cn(
            "pl-10 rounded-lg border-border transition-all duration-200",
            "focus:border-accent focus:ring-2 focus:ring-accent/20",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20"
          )}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
        />
      </div>

      {isOpen && searchResults.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          {searchResults.map((city, index) => (
            <div
              key={`${city.name}-${city.countryCode}`}
              className={cn(
                "flex items-center px-3 py-2 cursor-pointer transition-colors",
                "hover:bg-accent/10",
                highlightedIndex === index && "bg-accent/20",
                "border-b border-border/50 last:border-b-0"
              )}
              onClick={() => handleSelectCity(city)}
              role="option"
              aria-selected={highlightedIndex === index}
            >
              <MapPin className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground truncate">
                  {city.name}
                </div>
                <div className="text-sm text-muted-foreground truncate">
                  {city.country} • {city.population.toLocaleString()} residents
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive mt-1 flex items-center">
          <span className="animate-pulse mr-1">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default CityAutocomplete;