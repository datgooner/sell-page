import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type CartItem = {
  imageUrl: string;
  name: string;
  color: string;
  size: string;
  price: number;
};

export type CartState = {
  open: boolean;
  cart: {
    id: string;
    cartItem: CartItem;
    quantity: number;
  }[];
};

export type CartActions = {
  onOpenChange: (open?: boolean) => void;
  addToCart: (id: string, cart: CartItem, quantity: number) => void;
};

export type CartStore = CartState & CartActions;

export const defaultInitState: CartState = {
  open: false,
  cart: [],
};

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()(
    persist(
      (set, get) => ({
        ...initState,
        onOpenChange(open) {
          set({ open });
        },
        addToCart(id, cartItem, quantity) {
          const currentCart = [...get().cart];
          const foundIndex = currentCart.findIndex((item) => item.id === id);
          if (foundIndex === -1) {
            set({ cart: [...currentCart, { id, cartItem, quantity }] });
          } else {
            const currentItem = currentCart[foundIndex];
            const newItem = {
              ...currentItem,
              cartItem,
              quantity: currentItem.quantity + quantity,
            };
            set({
              cart: currentCart.map((item, index) => {
                if (index !== foundIndex) {
                  return item;
                }
                return newItem;
              }),
            });
          }
        },
      }),
      {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
