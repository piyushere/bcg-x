import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FormControl } from './form';

export function DatePicker({
  value,
  onChange,
  disabled = false,
}: {
  value: Date | undefined;
  onChange: React.Dispatch<Date | undefined>;
  disabled?: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            disabled={disabled}
            variant={'outline'}
            className={cn(
              'w-full pl-3 text-left font-normal',
              !value && 'text-muted-foreground'
            )}
          >
            {value ? format(value, 'PPP') : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
