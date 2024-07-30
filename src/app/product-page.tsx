"use client";
import { Button } from "@/components/ui/button";
import Tag from "@/components/ui/tag";
import { useCartStore } from "@/store/cart-provider";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SwiperClass } from "swiper/react";
import ProductDetail from "./product-detail";
import ProductSlide from "./product-slide";
import { priceTable } from "./utils";

const sizes = [
  { label: "10 layers 40 pairs", value: "10-40" },
  { label: "10 layers 20 pairs", value: "10-20" },
  { label: "8 layers 32 pairs", value: "8-32" },
  { label: "8 layers 16 pairs", value: "8-16" },
  { label: "6 layers 24 pairs", value: "6-24" },
  { label: "6 layers 12 pairs", value: "6-12" },
];

const colors = [
  { label: "Black", value: "Black" },
  { label: "Green", value: "Green" },
  { label: "White", value: "White" },
];

const ProductPage = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [thumbsSwiper2, setThumbsSwiper2] = useState<SwiperClass | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("10-40");
  const [selectedColor, setSelectedColor] = useState("Black");

  const [productImage, setProductImage] = useState(
    "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/B586B0D2-DF1C-6737-302F-B9A236F96D98.jpeg?x-oss-process=image/resize,m_lfit,w_1248",
  );

  useEffect(() => {
    switch (selectedColor) {
      case "Black":
        thumbsSwiper?.slideTo(0);
        thumbsSwiper2?.slideTo(0);
        setProductImage(
          "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/B586B0D2-DF1C-6737-302F-B9A236F96D98.jpeg?x-oss-process=image/resize,m_lfit,w_1248",
        );
        break;
      case "Green":
        thumbsSwiper?.slideTo(11);
        thumbsSwiper2?.slideTo(11);
        setProductImage(
          "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/04A9E3EA-7DA4-757D-7378-3DF99999C000.png?x-oss-process=image/resize,m_lfit,w_1248",
        );
        break;

      case "White":
        thumbsSwiper?.slideTo(17);
        thumbsSwiper2?.slideTo(17);
        setProductImage(
          "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/49F9DF23-2268-ADDE-5AEC-223660022CCF.png?x-oss-process=image/resize,m_lfit,w_1008",
        );
        break;
    }
  }, [selectedColor, thumbsSwiper, thumbsSwiper2]);

  const onOpenChange = useCartStore((state) => state.onOpenChange);
  const onCheckoutOpenChange = useCartStore(
    (state) => state.onCheckoutOpenChange,
  );

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div>
      <div className="mb-8 bg-[#F6F6F6]">
        <nav className="breadcrumb container flex justify-between py-4 text-sm text-[#999999]">
          <div>
            <Link href="/">Home</Link> /{" "}
            <span>🥾Dust-Free Portable Shoe Organizer🎁</span>
          </div>
          <div>
            <Button
              variant="ghost"
              onClick={() => {
                onOpenChange(true);
              }}
              size="icon"
            >
              <ShoppingCart color="#1d1f21" />
            </Button>
          </div>
        </nav>
      </div>

      <div className="container grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
        <ProductSlide onSwiper={setThumbsSwiper} onSwiper2={setThumbsSwiper2} />
        <div className="space-y-8 px-6">
          <h1 className="mb-4 text-center text-[28px] font-bold">
            🥾Dust-Free Portable Shoe Organizer🎁
          </h1>
          <p className="mb-4 text-center text-xl text-[#D21936]">
            ${priceTable[selectedSize]?.[selectedColor]}
          </p>

          <div className="flex flex-col items-center justify-center">
            <h3 className="mb-4 text-base text-text">Size</h3>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <Tag
                  key={size.value}
                  active={selectedSize === size.value}
                  onClick={() => setSelectedSize(size.value)}
                >
                  {size.label}
                </Tag>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h3 className="mb-4 text-base text-text">Color</h3>
            <div className="grid grid-cols-3 gap-2">
              {colors.map((color) => (
                <Tag
                  key={color.value}
                  active={selectedColor === color.value}
                  onClick={() => setSelectedColor(color.value)}
                >
                  {color.label}
                </Tag>
              ))}
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
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                addToCart(
                  "1",
                  {
                    imageUrl: productImage,
                    name: "🥾Dust-Free Portable Shoe Organizer🎁",
                    color:
                      colors.find((item) => item.value === selectedColor)
                        ?.label || "",
                    size:
                      sizes.find((item) => item.value === selectedSize)
                        ?.label || "",
                    price: priceTable[selectedSize]?.[selectedColor],
                  },
                  quantity,
                );
                onOpenChange(true);
              }}
            >
              Add to Cart
            </Button>
            <Button
              variant="default"
              className="flex-1"
              onClick={() => {
                addToCart(
                  "1",
                  {
                    imageUrl: productImage,
                    name: "🥾Dust-Free Portable Shoe Organizer🎁",
                    color:
                      colors.find((item) => item.value === selectedColor)
                        ?.label || "",
                    size:
                      sizes.find((item) => item.value === selectedSize)
                        ?.label || "",
                    price: priceTable[selectedSize]?.[selectedColor],
                  },
                  quantity,
                );
                onOpenChange(false);
                onCheckoutOpenChange(true);
              }}
            >
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
