"use client";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImage_1 from "@/assets/banner-image-1.jpg";
import bannerImage_2 from "@/assets/banner-image-2.jpg";
import bannerImage_3 from "@/assets/banner-image-3.jpg";

const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}>
        <div>
          <Image src={bannerImage_1} alt="Banner Image 1" />
        </div>
        <div>
          <Image src={bannerImage_2} alt="Banner Image 2" />
        </div>
        <div>
          <Image src={bannerImage_3} alt="Banner Image 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
