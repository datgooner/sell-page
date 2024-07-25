"use client";
import { Button } from "@/components/ui/button";
import Tag from "@/components/ui/tag";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";
import { SwiperClass } from "swiper/react";
import ProductDetail from "./product-detail";
import ProductSlide from "./product-slide";

const ProductPage = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <div className="mb-8 bg-[#F6F6F6]">
        <nav className="breadcrumb container py-4 text-sm text-[#999999]">
          <Link href="/">Home</Link> /{" "}
          <span>🥾Dust-Free Portable Shoe Organizer🎁</span>
        </nav>
      </div>

      <div className="container grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
        <ProductSlide onSwiper={setThumbsSwiper} />
        <div className="space-y-8 px-6">
          <h1 className="mb-4 text-center text-[28px] font-bold">
            🥾Dust-Free Portable Shoe Organizer🎁
          </h1>
          <p className="mb-4 text-center text-xl text-[#D21936]">$29.98</p>

          <div className="flex flex-col items-center justify-center">
            <h3 className="mb-4 text-base text-text">Size</h3>
            <div className="grid grid-cols-3 gap-2">
              <Tag>10 layers 40 pairs</Tag>
              <Tag>10 layers 20 pairs</Tag>
              <Tag>8 layers 32 pairs</Tag>
              <Tag>8 layers 16 pairs</Tag>
              <Tag>6 layers 24 pairs</Tag>
              <Tag>6 layers 12 pairs</Tag>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h3 className="mb-4 text-base text-text">Color</h3>
            <div className="grid grid-cols-3 gap-2">
              <Tag>Black</Tag>
              <Tag>Green</Tag>
              <Tag>White</Tag>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h3 className="mb-4 text-base text-text">Quantity</h3>
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setQuantity((prev) => {
                    if (prev <= 1) return prev;
                    return prev - 1;
                  });
                }}
                size="icon"
              >
                <MinusIcon />
              </Button>
              <input
                type="number"
                className="w-[80px] text-center text-[#545454]"
                defaultValue={1}
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
              />
              <Button
                variant="ghost"
                onClick={() => {
                  setQuantity((prev) => {
                    return prev + 1;
                  });
                }}
                size="icon"
              >
                <PlusIcon />
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              Add to Cart
            </Button>
            <Button variant="default" className="flex-1">
              Buy It Now
            </Button>
          </div>
        </div>
      </div>

      <div className="container my-8 py-4">
        <h2 className="mb-4 font-semibold text-[#545454]">Detail</h2>
        <ProductDetail />
      </div>
    </div>
  );
};

export default ProductPage;
