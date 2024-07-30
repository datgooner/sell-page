import { useCartStore } from "@/store/cart-provider";
import { Fragment, useState } from "react";
import { Step, StepItem, Stepper, useStepper } from "../stepper";
import { Dialog, DialogContent } from "../ui/dialog";
import CheckoutCard from "./checkout-card";
import PersonalInfo from "./personal-info";
import axios from "axios";
import { toast } from "react-toastify";
import CartItem from "../cart/cart-item";
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
    // TODO: update correct body structure
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
    // TODO: replace correct url here
    await axios.post("https://abc.com/api", body);
  };

  return (
    <Dialog open={checkoutOpen} onOpenChange={onCheckoutOpenChange}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="max-h-screen overflow-y-auto"
      >
        <div className="pt-4">
          {cart.map((item) => (
            <div key={item.id} className="mb-2">
              <CartItem
                defaultQuantity={item.quantity}
                id={item.id}
                {...item.cartItem}
                readOnlyQuantityEdit
              />
            </div>
          ))}
          <div className="mb-4 flex justify-end gap-4 text-lg font-semibold text-[#D21936]">
            <div>Total price:</div>
            <div>
              $
              {cart.reduce((total, cart) => {
                return total + cart.cartItem.price * cart.quantity;
              }, 0)}
            </div>
          </div>
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
