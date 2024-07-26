import React, { useContext, useRef } from "react";
import { useStore, type StoreApi } from "zustand";
import { createCartStore, type CartStore } from "./cart-store";
import Cart from "@/components/cart";

const CartContext = React.createContext<StoreApi<CartStore> | null>(null);

const CartProvider = ({ children }: React.PropsWithChildren) => {
  const storeRef = useRef<StoreApi<CartStore>>();
  if (!storeRef.current) {
    storeRef.current = createCartStore({
      open: false,
    });
  }

  return (
    <CartContext.Provider value={storeRef.current}>
      <Cart />
      {children}
    </CartContext.Provider>
  );
};

const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
  const CartStoreContext = useContext(CartContext);

  if (!CartStoreContext) {
    throw new Error(`useCartStore must be use within CartProvider`);
  }
  return useStore(CartStoreContext, selector);
};

export { CartProvider, useCartStore };
