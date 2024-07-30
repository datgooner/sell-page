import { useCartStore } from "@/store/cart-provider";
import { useState } from "react";
import { Step, StepItem, Stepper, useStepper } from "../stepper";
import { Dialog, DialogContent } from "../ui/dialog";
import CheckoutCard from "./checkout-card";
import PersonalInfo from "./personal-info";
import axios from "axios";
import { toast } from "react-toastify";
type Props = {};

const steps = [
  { label: "Personal Information" },
  { label: "Payment method" },
] satisfies StepItem[];

const Checkout = (props: Props) => {
  const [val, setVal] = useState<any>({});
  const checkoutOpen = useCartStore((state) => state.checkoutOpen);
  const onCheckoutOpenChange = useCartStore(
    (state) => state.onCheckoutOpenChange,
  );

  const cart = useCartStore((state) => state.cart);

  const checkOutSuccess = async () => {
    const body = {
      payment_info: {
        card_number: val.number,
        card_expiry: `${val.month}/${val.year}`,
        card_cvc: val.cvc,
        billing_first_name: val.first_name,
        billing_last_name: val.first_name,
        billing_address: val.address,
        billing_country: val.country,
        billing_state: val.state,
        billing_postcode: val.zip,
        billing_email: val.email,
        billing_phone: val.phone_number,
      },
      cart: cart.map((item) => ({
        name: item.cartItem.name,
        size: item.cartItem.size,
        color: item.cartItem.color,
        quantity: item.quantity,
      })),
    };
    await axios.post("https://abc.com/api", body);
  };

  return (
    <Dialog open={checkoutOpen} onOpenChange={onCheckoutOpenChange}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div className="pt-4">
          <Stepper initialStep={0} steps={steps}>
            {steps.map((stepProps, index) => {
              return (
                <Step key={stepProps.label} {...stepProps}>
                  <div className="pt-4">
                    <RenderStep
                      index={index}
                      setVal={setVal}
                      checkOutSuccess={checkOutSuccess}
                      onCheckoutOpenChange={onCheckoutOpenChange}
                    />
                  </div>
                </Step>
              );
            })}
          </Stepper>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Checkout;

const RenderStep = ({
  index,
  setVal,
  checkOutSuccess,
  onCheckoutOpenChange,
}: {
  index: number;
  setVal: (val: any) => void;
  checkOutSuccess: any;
  onCheckoutOpenChange: any;
}) => {
  const { nextStep } = useStepper();

  switch (index) {
    case 0:
      return (
        <PersonalInfo
          onSubmit={(value) => {
            setVal((prev: any) => ({ ...prev, ...value }));
            nextStep();
          }}
        />
      );
    case 1:
      return (
        <CheckoutCard
          onSubmit={async (value) => {
            setVal((prev: any) => ({ ...prev, ...value }));
            try {
              await checkOutSuccess();
              toast.success("Checkout successfully.");
              onCheckoutOpenChange(false);
            } catch (error) {
              toast.error("Something went wrong. Please try again later!");
              onCheckoutOpenChange(false);
            }
          }}
        />
      );
    default:
      return null;
  }
};
