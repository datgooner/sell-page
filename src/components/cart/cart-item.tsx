import Image from "next/image";
import React from "react";
import CartQuantity from "./cart-quantity";
import { useCartStore } from "@/store/cart-provider";

type Props = {
  imageUrl: string;
  name: string;
  color: string;
  size: string;
  price: number;

  defaultQuantity: number;
  id: string;
  readOnlyQuantityEdit?: boolean;
};

const CartItem = ({
  imageUrl,
  name,
  color,
  size,
  price,
  id,
  defaultQuantity,
  readOnlyQuantityEdit,
}: Props) => {
  const removeCartItem = useCartStore((state) => state.removeCartItem);
  const changeCartItemQuantity = useCartStore(
    (state) => state.changeCartItemQuantity,
  );

  return (
    <div>
      <div className="flex gap-4">
        <Image
          width={80}
          height={80}
          alt=""
          src={imageUrl}
          className="size-20"
        />
        <div>
          <div className="mb-2 text-[#1D1F21]">{name}</div>
          <div>Color: {color}</div>
          <div className="mb-2">Size: {size}</div>
          <div className="mb-2 text-[#1d1f21]">${price}</div>
          {!readOnlyQuantityEdit ? (
            <CartQuantity
              defaultQuantity={defaultQuantity}
              onQuantityChange={function (quantity: number): void {
                changeCartItemQuantity(id, quantity);
              }}
              onDelete={function (): void {
                removeCartItem(id);
              }}
            />
          ) : (
            <div>Quantity: {defaultQuantity}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
