import { useCartStore } from "@/store/cart-provider";
import { useState } from "react";
import { Step, StepItem, Stepper, useStepper } from "../stepper";
import { Dialog, DialogContent } from "../ui/dialog";
import CheckoutCard from "./checkout-card";
import PersonalInfo from "./personal-info";
import axios from "axios";
type Props = {};

const steps = [
  { label: "Personal Information" },
  { label: "Payment method" },
] satisfies StepItem[];

const Checkout = (props: Props) => {
  const [val, setVal] = useState({});
  console.log("🚀 ~ Checkout ~ val:", val);
  const checkoutOpen = useCartStore((state) => state.checkoutOpen);
  const onCheckoutOpenChange = useCartStore(
    (state) => state.onCheckoutOpenChange,
  );

  const cart = useCartStore((state) => state.cart);

  const checkOutSuccess = async () => {
    await axios.post("https://abc.com/api", { payment_info: val });
  };

  return (
    <Dialog open={checkoutOpen} onOpenChange={onCheckoutOpenChange}>
      <DialogContent>
        <Stepper initialStep={0} steps={steps}>
          {steps.map((stepProps, index) => {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <RenderStep
                  index={index}
                  setVal={setVal}
                  checkOutSuccess={checkOutSuccess}
                />
              </Step>
            );
          })}
        </Stepper>
      </DialogContent>
    </Dialog>
  );
};

export default Checkout;

const RenderStep = ({
  index,
  setVal,
  checkOutSuccess,
}: {
  index: number;
  setVal: (val: any) => void;
  checkOutSuccess: () => void;
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
          onSubmit={(value) => {
            setVal((prev: any) => ({ ...prev, ...value }));
            checkOutSuccess();
          }}
        />
      );
    default:
      return null;
  }
};
