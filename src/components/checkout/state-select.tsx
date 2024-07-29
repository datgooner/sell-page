import { StateProps } from "@/lib/types";
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
import states from "@/data/states.json";
import { sentenceCase } from "@/lib/utils";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";

type Props = {};

const StateSelect = (props: Props) => {
  const countryValue = useWatch({ name: "country" });
  const { setValue, formState } = useFormContext();
  const SD = states as StateProps[];
  const S = SD.filter(
    (state) => state.country_name === sentenceCase(countryValue || ""),
  );

  useEffect(() => {
    setValue("state", undefined);
  }, [countryValue, setValue]);

  return (
    <FormField
      name="state"
      render={({ field }) => (
        <FormItem>
          <FormLabel>State:</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={S.length === 0}
          >
            <FormControl>
              <SelectTrigger id="state">
                <SelectValue placeholder="State" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {S.map((state) => (
                <SelectItem key={state.name} value={state.name}>
                  {state.name}
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

export default StateSelect;
