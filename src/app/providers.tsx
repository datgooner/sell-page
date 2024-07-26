"use client";
import { CartProvider } from "@/store/cart-provider";

export default function Providers({ children }: React.PropsWithChildren) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary

  return <CartProvider>{children}</CartProvider>;
}
