import { useState, useMemo } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import countriesWithFlags, { getCountryByName, Country } from '@/data/countries';
import { cn } from '@/lib/utils';

interface CountrySelectorProps {
  value: string;
  onChange: (value: string, country?: Country) => void;
  label: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

const CountrySelector = ({
  value,
  onChange,
  label,
  placeholder = "Select a country...",
  error,
  required = false,
  className = ""
}: CountrySelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const selectedCountry = useMemo(() => {
    return getCountryByName(value) || countriesWithFlags.find(c => c.code === value);
  }, [value]);

  const filteredCountries = useMemo(() => {
    if (!searchValue) return countriesWithFlags;
    
    const lowercaseSearch = searchValue.toLowerCase();
    return countriesWithFlags.filter(country =>
      country.name.toLowerCase().includes(lowercaseSearch) ||
      country.code.toLowerCase().includes(lowercaseSearch)
    );
  }, [searchValue]);

  const handleSelect = (country: Country) => {
    onChange(country.name, country);
    setOpen(false);
    setSearchValue("");
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between h-11 px-3 rounded-lg",
              "border-border hover:border-accent transition-all duration-200",
              "focus:border-accent focus:ring-2 focus:ring-accent/20",
              error && "border-destructive hover:border-destructive focus:border-destructive focus:ring-destructive/20",
              !selectedCountry && "text-muted-foreground"
            )}
          >
            <div className="flex items-center space-x-2">
              {selectedCountry && (
                <span className="text-lg" role="img" aria-label={selectedCountry.name}>
                  {selectedCountry.flag}
                </span>
              )}
              <span className="truncate">
                {selectedCountry ? selectedCountry.name : placeholder}
              </span>
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-full p-0" align="start" sideOffset={4}>
          <Command>
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input
                placeholder="Search countries..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            
            <CommandList className="max-h-60">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {filteredCountries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={`${country.name} ${country.code}`}
                    onSelect={() => handleSelect(country)}
                    className="flex items-center space-x-2 px-3 py-2 cursor-pointer"
                  >
                    <span className="text-lg" role="img" aria-label={country.name}>
                      {country.flag}
                    </span>
                    <span className="flex-1 truncate">{country.name}</span>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedCountry?.code === country.code ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && (
        <p className="text-sm text-destructive mt-1 flex items-center">
          <span className="animate-pulse mr-1">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default CountrySelector;