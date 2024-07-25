import { Metadata } from "next";
import ProductPage from "./product-page";

export const metadata: Metadata = {
  title: "🥾Dust-Free Portable Shoe Organizer🎁",
};

export default function Home() {
  return (
    <main className="">
      <ProductPage />
    </main>
  );
}
