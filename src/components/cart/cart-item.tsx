import Image from "next/image";
import React from "react";

type Props = {
  imageUrl: string;
  name: string;
  color: string;
  size: string;
  price: number;
};

const CartItem = ({ imageUrl, name, color, size, price }: Props) => {
  return (
    <div>
      <div className="flex gap-4">
        <Image width={80} height={80} alt="" src={imageUrl} className="size-20" />
        <div>
          <div className="mb-2 text-[#1D1F21]">{name}</div>
          <div>Color: {color}</div>
          <div className="mb-2">Size: {size}</div>
          <div className="text-[#545454]">{price}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
