import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DatePickerFieldProps {
  label: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder: string;
  required?: boolean;
  disabled?: (date: Date) => boolean;
  fromYear?: number;
  toYear?: number;
}

export const DatePickerField = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  disabled,
  fromYear,
  toYear
}: DatePickerFieldProps) => {
  return (
    <div className="space-y-2">
      <Label>{label} {required && '*'}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              format(value, "PPP")
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={disabled}
            initialFocus
            showOutsideDays={false}
            className={cn("p-3 pointer-events-auto")}
            captionLayout="dropdown-buttons"
            fromYear={fromYear}
            toYear={toYear}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};