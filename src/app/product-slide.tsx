/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "./product-slide.style.css";

const slides: string[] = [
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/B586B0D2-DF1C-6737-302F-B9A236F96D98.jpeg?x-oss-process=image/resize,m_lfit,w_1248",
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/7EAFE335-9B97-62B3-7C76-C4109432B6BF.jpeg?x-oss-process=image/resize,m_lfit,w_1248",
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/D2D6A4F6-FD7D-A9C2-7DF0-9172BD523BF2.jpeg?x-oss-process=image/resize,m_lfit,w_1008",
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/7AF047A3-DD28-CB60-EA74-DFAC7A4505C3.jpeg?x-oss-process=image/resize,m_lfit,w_1008",
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/E62442F0-2BB9-2630-7EFF-A60DBEDFB386.jpeg?x-oss-process=image/resize,m_lfit,w_1008",
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/87E3AE36-D11C-FF56-88D4-BD3CCDB3876D.jpeg?x-oss-process=image/resize,m_lfit,w_1008",
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/5B66CEFF-8356-C814-4499-94F844E4062F.jpeg?x-oss-process=image/resize,m_lfit,w_1008",
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/2F73EAD7-6AFF-E8AB-0A15-50CCBE1011C5.jpeg?x-oss-process=image/resize,m_lfit,w_1008",
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/BE36F70F-E1AC-8DFF-EBA5-00394EAA1DAD.jpeg?x-oss-process=image/resize,m_lfit,w_1008",
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/937C4541-9803-EEA3-C3A9-EA20DD13724F.jpeg?x-oss-process=image/resize,m_lfit,w_1008",
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/C537955C-57F9-53BB-52A6-EA0A3BF8576C.png?x-oss-process=image/resize,m_lfit,w_1248",
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/04A9E3EA-7DA4-757D-7378-3DF99999C000.png?x-oss-process=image/resize,m_lfit,w_1248",
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/9AA7FB5A-81AC-C722-D304-676F1130E00D.png?x-oss-process=image/resize,m_lfit,w_1008",
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/90D80009-FB15-B0A4-8876-F1B6D83483D4.png?x-oss-process=image/resize,m_lfit,w_1008",
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/262BF265-F283-8AC4-6851-819BD105758B.png?x-oss-process=image/resize,m_lfit,w_1008",
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/922B8FA9-6C7B-D41D-5AAB-9C4159F96635.png?x-oss-process=image/resize,m_lfit,w_1008",
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/A86731D3-BD21-A044-72D3-AD7E20258148.png?x-oss-process=image/resize,m_lfit,w_1008",
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/49F9DF23-2268-ADDE-5AEC-223660022CCF.png?x-oss-process=image/resize,m_lfit,w_1008",
  "https://cdn.statics-cdn-amz.com/uploads/98104/cart/resources/20240625/1D7C9930-2D54-3991-564F-09FDC2CC4CBA.png?x-oss-process=image/resize,m_lfit,w_1008",
];

type Props = {
  onSwiper?: (swiper: SwiperClass) => void;
  onSwiper2?: (swiper: SwiperClass) => void;
};
const ProductSlide = ({ onSwiper, onSwiper2 }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const slideItems = (
    <>
      {slides.map((item, index) => (
        <SwiperSlide key={index}>
          <img src={item} alt="🥾Dust-Free Portable Shoe Organizer🎁" />
        </SwiperSlide>
      ))}
    </>
  );
  return (
    <div>
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="swiper-container mb-4"
        onSwiper={onSwiper2}
      >
        {slideItems}
      </Swiper>
      <Swiper
        onSwiper={(_swiper) => {
          onSwiper?.(_swiper);
          setThumbsSwiper(_swiper);
        }}
        spaceBetween={10}
        slidesPerView="auto"
        freeMode={true}
        // watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        navigation={true}
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index} className="!size-[76px]">
            <img
              src={item}
              alt="🥾Dust-Free Portable Shoe Organizer🎁"
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlide;
