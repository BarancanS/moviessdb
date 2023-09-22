import React from "react";
import AliceCarousel from "react-alice-carousel";
import Link from "next/link";
import Image from "next/image";

const Carousel = () => {
  const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 1,
    },
  };

  const imageSources = [
    "https://images.hdqwalls.com/download/black-panther-wakanda-forever-4k-artwork-zu-1680x1050.jpg",
    "https://images.hdqwalls.com/download/venom-darker-than-night-9e-1680x1050.jpg",
    "https://images.hdqwalls.com/download/iron-woman-face-off-4p-1680x1050.jpg", // Add more image URLs here
    "https://images.hdqwalls.com/download/2023-barbenheimer-bd-1680x1050.jpg",
    "https://images.hdqwalls.com/download/dark-knights-ride-batman-and-the-ford-mustang-up-1680x1050.jpg",
    // Add more image URLs as needed
  ];

  const items = imageSources.map((src, index) => (
    <Image
      key={index}
      width={1920}
      height={960}
      src={src}
      alt=""
      className="mx-auto object-contain object-center pl-10 pr-10"
    />
  ));

  return (
    <div className="w-full flex flex-row gap-5 max-lg:mt-16 mt-24 items-center justify-center">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        autoPlay
        items={items}
        responsive={responsive}
      />
    </div>
  );
};

export default Carousel;
