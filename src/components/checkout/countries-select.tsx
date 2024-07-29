import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import countries from "@/data/countries.json";
import { CountryProps } from "@/lib/types";

type Props = {};

const CountriesSelect = (props: Props) => {
  const C = countries as CountryProps[];
  return (
    <FormField
      name="country"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Country:</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger id="country">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {C.map((country) => (
                <SelectItem key={country.name} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CountriesSelect;
