import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Country {
  code: string;
  name: string;
  flag: string;
  prefix: string;
}

const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', prefix: '+1' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', prefix: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', prefix: '+44' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', prefix: '+49' },
  { code: 'FR', name: 'France', flag: '🇫🇷', prefix: '+33' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', prefix: '+39' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', prefix: '+34' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', prefix: '+31' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', prefix: '+32' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', prefix: '+41' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', prefix: '+43' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', prefix: '+46' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', prefix: '+47' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', prefix: '+45' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', prefix: '+358' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', prefix: '+61' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', prefix: '+64' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', prefix: '+81' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', prefix: '+82' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', prefix: '+65' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', prefix: '+60' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', prefix: '+66' },
  { code: 'IN', name: 'India', flag: '🇮🇳', prefix: '+91' },
  { code: 'CN', name: 'China', flag: '🇨🇳', prefix: '+86' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', prefix: '+55' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', prefix: '+54' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', prefix: '+52' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', prefix: '+27' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', prefix: '+20' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', prefix: '+234' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', prefix: '+254' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', prefix: '+212' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', prefix: '+971' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', prefix: '+966' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', prefix: '+90' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', prefix: '+7' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', prefix: '+48' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', prefix: '+420' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', prefix: '+36' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', prefix: '+30' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', prefix: '+351' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', prefix: '+353' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', prefix: '+352' },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const PhoneInput = ({ value, onChange, placeholder = "Enter phone number", className }: PhoneInputProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  
  // Extract country code and number from value
  const getPhoneNumber = () => {
    if (!value) return '';
    return value.replace(selectedCountry.prefix, '').trim();
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    const phoneNumber = getPhoneNumber();
    const newValue = phoneNumber ? `${country.prefix} ${phoneNumber}` : country.prefix;
    onChange(newValue);
    setOpen(false);
  };

  const handlePhoneChange = (phoneNumber: string) => {
    // Remove any non-digit characters except spaces and hyphens
    const cleanNumber = phoneNumber.replace(/[^\d\s-]/g, '');
    const newValue = cleanNumber ? `${selectedCountry.prefix} ${cleanNumber}` : selectedCountry.prefix;
    onChange(newValue);
  };

  return (
    <div className={cn("flex", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[180px] justify-between rounded-r-none border-r-0"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{selectedCountry.flag}</span>
              <span className="text-sm">{selectedCountry.prefix}</span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={`${country.name} ${country.code}`}
                    onSelect={() => handleCountrySelect(country)}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <span className="text-lg">{country.flag}</span>
                      <span className="flex-1">{country.name}</span>
                      <span className="text-sm text-muted-foreground">{country.prefix}</span>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedCountry.code === country.code ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        placeholder={placeholder}
        value={getPhoneNumber()}
        onChange={(e) => handlePhoneChange(e.target.value)}
        className="rounded-l-none"
      />
    </div>
  );
};