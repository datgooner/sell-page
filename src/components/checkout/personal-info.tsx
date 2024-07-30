import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { CardContent, CardFooter } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import CountriesSelect from "./countries-select";
import StateSelect from "./state-select";

const formSchema = z.object({
  first_name: z.string().min(1, "This field is required"),
  last_name: z.string().min(1, "This field is required"),
  address: z.string().min(1, "This field is required"),
  country: z.string().min(1, "This field is required"),
  state: z.string().min(1, "This field is required"),
  zip: z.string().min(1, "This field is required"),
  phone_number: z.string().min(1, "This field is required"),
  email: z.string().min(1, "This field is required"),
});

type Props = {
  onSubmit?: (value: any) => void;
};

const PersonalInfo = ({ onSubmit }: Props) => {
  const form = useForm({ resolver: zodResolver(formSchema) });

  const submit = (values: any) => {
    onSubmit?.(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <CardContent className="space-y-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name:</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name:</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address:</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CountriesSelect />
          <StateSelect />

          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ZIP Code:</FormLabel>
                <FormControl>
                  <Input placeholder="ZIP Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number:</FormLabel>
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default PersonalInfo;
