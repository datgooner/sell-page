import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  number: z.string().min(1, "This field is required"),
  month: z.string().min(1, "This field is required"),
  year: z.string().min(1, "This field is required"),
  cvc: z.string().min(1, "This field is required"),
});

type Props = {
  onSubmit?: (value: any) => void;
};

const CheckoutCard = ({ onSubmit }: Props) => {
  const form = useForm({ resolver: zodResolver(formSchema) });

  const submit = (values: any) => {
    onSubmit?.(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card number</FormLabel>
                  <FormControl>
                    <Input placeholder="Card number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <FormField
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expires</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id="month">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="01">January</SelectItem>
                        <SelectItem value="02">February</SelectItem>
                        <SelectItem value="03">March</SelectItem>
                        <SelectItem value="04">April</SelectItem>
                        <SelectItem value="05">May</SelectItem>
                        <SelectItem value="06">June</SelectItem>
                        <SelectItem value="07">July</SelectItem>
                        <SelectItem value="08">August</SelectItem>
                        <SelectItem value="09">September</SelectItem>
                        <SelectItem value="10">October</SelectItem>
                        <SelectItem value="11">November</SelectItem>
                        <SelectItem value="12">December</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormLabel className="invisible">Year</FormLabel>
                      <FormControl>
                        <SelectTrigger id="year">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem
                            key={i}
                            value={`${new Date().getFullYear() + i}`}
                          >
                            {new Date().getFullYear() + i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="CVC"
                        {...field}
                        maxLength={3}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Checkout
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default CheckoutCard;
