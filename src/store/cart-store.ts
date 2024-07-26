import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartState = {
  open: boolean;
};

export type CartActions = {
  onOpenChange: (open?: boolean) => void;
};

export type CartStore = CartState & CartActions;

export const defaultInitState: CartState = {
  open: false,
};

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()(
    persist(
      (set, get) => ({
        ...initState,
        onOpenChange(open) {
          set({ open });
        },
      }),
      {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
