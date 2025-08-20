import React, { useState, useMemo } from 'react';
import { getCountries, getCountryCallingCode, Country } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';
import flags from 'react-phone-number-input/flags';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { ChevronsUpDown } from 'lucide-react';

interface PhoneFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

const CountrySelect = ({ value, onChange, countries }: { value: Country; onChange: (value: Country) => void; countries: Country[] }) => {
  const countryOptions = useMemo(() => countries.map(country => ({
    value: country,
    label: en[country],
    code: `+${getCountryCallingCode(country)}`
  })), [countries]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="input-field w-[120px] justify-between mr-2">
          <div className="flex items-center">
            {value && <div className="w-6 h-auto mr-2 rounded-sm overflow-hidden flex items-center justify-center">{React.createElement(flags[value])}</div>}
            <span>{value ? `+${getCountryCallingCode(value)}` : "..."}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countryOptions.map(option => (
                <CommandItem
                  key={option.value}
                  value={`${option.label} ${option.value} ${option.code}`}
                  onSelect={() => onChange(option.value)}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-auto mr-2 rounded-sm overflow-hidden flex items-center justify-center">{React.createElement(flags[option.value])}</div>
                    <span>{option.label} ({option.code})</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const PhoneField: React.FC<PhoneFieldProps> = ({ label, value, onChange, error, required }) => {
  const [country, setCountry] = useState<Country>('IN');
  const [number, setNumber] = useState('');

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value;
    setNumber(newNumber);
    onChange(`+${getCountryCallingCode(country)}${newNumber}`);
  };

  const handleCountryChange = (newCountry: Country) => {
    setCountry(newCountry);
    if (number) {
      onChange(`+${getCountryCallingCode(newCountry)}${number}`);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="phone-input">{label}{required && <span className="text-destructive ml-1">*</span>}</Label>
      <div className="flex items-center">
        <CountrySelect value={country} onChange={handleCountryChange} countries={getCountries()} />
        <input
          id="phone-input"
          type="tel"
          placeholder="Phone number"
          value={number}
          onChange={handleNumberChange}
          className="input-field w-full"
        />
      </div>
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
};
