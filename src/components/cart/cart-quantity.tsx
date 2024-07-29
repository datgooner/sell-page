import { Cross1Icon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "../ui/button";

type Props = {
  defaultQuantity: number;
  onQuantityChange: (quantity: number) => void;
  onDelete: () => void;
};

const CartQuantity = ({
  defaultQuantity,
  onQuantityChange,
  onDelete,
}: Props) => {
  const [quantity, setQuantity] = useState(defaultQuantity);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center gap-2 border border-[#ddd]">
        <Button
          variant="ghost"
          onClick={() => {
            setQuantity((prev) => {
              if (prev <= 1) return prev;
              onQuantityChange(prev - 1);
              return prev - 1;
            });
          }}
          size="icon"
        >
          <MinusIcon />
        </Button>
        <input
          type="number"
          className="w-[40px] text-center text-[#545454]"
          value={quantity}
          onChange={(e) => {
            setQuantity(+e.target.value);
            onQuantityChange(+e.target.value);
          }}
        />
        <Button
          variant="ghost"
          onClick={() => {
            setQuantity((prev) => {
              onQuantityChange(prev + 1);

              return prev + 1;
            });
          }}
          size="icon"
        >
          <PlusIcon />
        </Button>
      </div>
      <div>
        <Button
          variant="ghost"
          onClick={() => {
            onDelete();
          }}
          size="icon"
        >
          <Cross1Icon />
        </Button>
      </div>
    </div>
  );
};

export default CartQuantity;
