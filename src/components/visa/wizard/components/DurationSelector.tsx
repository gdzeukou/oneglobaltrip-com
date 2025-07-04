
import React from 'react';
import { Check, ChevronsUpDown, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DurationOption {
  value: string;
  label: string;
  description: string;
  icon: string;
}

interface DurationSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

const durationOptions: DurationOption[] = [
  {
    value: 'short-single',
    label: 'Less than 90 days (Single entry)',
    description: 'Perfect for vacations and short business trips',
    icon: '📅'
  },
  {
    value: 'short-multiple',
    label: 'Less than 90 days (Multiple entries)',
    description: 'Multiple trips within 180-day period',
    icon: '🔄'
  },
  {
    value: 'long-stay',
    label: 'More than 90 days',
    description: 'Work, study, or long-term residence',
    icon: '🏠'
  },
  {
    value: 'transit',
    label: 'Transit (Less than 24 hours)',
    description: 'Airport layover or connecting flights',
    icon: '✈️'
  }
];

const DurationSelector = ({ value, onValueChange, placeholder, className }: DurationSelectorProps) => {
  const [open, setOpen] = React.useState(false);
  const selectedOption = durationOptions.find(option => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <div className="flex items-center gap-2">
            {selectedOption?.icon && (
              <span className="text-lg">{selectedOption.icon}</span>
            )}
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search duration..." className="h-9" />
          <CommandList>
            <CommandEmpty>No duration found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {durationOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="flex flex-col items-start gap-1 p-3"
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-lg">{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </div>
                  <span className="text-sm text-gray-600 ml-8">{option.description}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DurationSelector;
