import { useCartStore } from "@/store/cart-provider";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import CartItem from "./cart-item";

type Props = {};

const Cart = (props: Props) => {
  const router = useRouter();
  const open = useCartStore((state) => state.open);
  const cart = useCartStore((state) => state.cart);

  const onOpenChange = useCartStore((state) => state.onOpenChange);
  const onCheckoutOpenChange = useCartStore(
    (state) => state.onCheckoutOpenChange,
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-normal">
            Shopping Cart
          </SheetTitle>
          <Separator className="!my-4" />
          <SheetDescription>
            {cart.map((item) => (
              <Fragment key={item.id}>
                <CartItem
                  defaultQuantity={item.quantity}
                  id={item.id}
                  {...item.cartItem}
                />
              </Fragment>
            ))}
          </SheetDescription>
          <Separator className="!my-4" />
          <SheetDescription>
            <div className="flex justify-between text-lg font-semibold text-[#1d1f21]">
              <div>Total</div>
              <div>
                $
                {cart.reduce((total, cart) => {
                  return total + cart.cartItem.price * cart.quantity;
                }, 0)}
              </div>
            </div>
          </SheetDescription>
          <SheetDescription>
            <Button
              variant="default"
              className="w-full"
              onClick={() => {
                onOpenChange(false);
                onCheckoutOpenChange(true);
              }}
            >
              CHECKOUT
            </Button>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
