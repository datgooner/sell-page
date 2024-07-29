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
  checkoutOpen: boolean;
};

export type CartActions = {
  onOpenChange: (open?: boolean) => void;
  addToCart: (id: string, cart: CartItem, quantity: number) => void;
  changeCartItemQuantity: (id: string, quantity: number) => void;
  removeCartItem: (id: string) => void;
  onCheckoutOpenChange: (checkoutOpen?: boolean) => void;
};

export type CartStore = CartState & CartActions;

export const defaultInitState: CartState = {
  open: false,
  cart: [],
  checkoutOpen: false,
};

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()(
    persist(
      (set, get) => ({
        ...initState,
        onOpenChange(open) {
          set({ open });
        },
        onCheckoutOpenChange(checkoutOpen) {
          set({ checkoutOpen });
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
        changeCartItemQuantity(id, quantity) {
          const currentCart = [...get().cart];
          const found = currentCart.find((item) => item.id === id);
          if (found) {
            const newItem = {
              ...found,
              quantity,
            };
            set({
              cart: currentCart.map((item) => {
                if (item.id === id) {
                  return newItem;
                }
                return item;
              }),
            });
          }
        },
        removeCartItem(id) {
          set({
            cart: get().cart.filter((item, index) => item.id !== id),
          });
        },
      }),
      {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
