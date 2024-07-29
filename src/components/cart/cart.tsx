import { useCartStore } from "@/store/cart-provider";
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
  const open = useCartStore((state) => state.open);
  const cart = useCartStore((state) => state.cart);

  const onOpenChange = useCartStore((state) => state.onOpenChange);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-normal">
            Shopping Cart
          </SheetTitle>
          <Separator />
          <SheetDescription>
            {cart.map((item) => (
              <CartItem key={item.id} {...item.cartItem} />
            ))}
          </SheetDescription>
          <Separator />
          <SheetDescription>
            <div className="flex justify-between">
              <div>Total</div>
              <div>
                $
                {cart.reduce((total, cart) => {
                  return total + cart.cartItem.price * cart.quantity;
                }, 0)}
              </div>
            </div>
            <div></div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
