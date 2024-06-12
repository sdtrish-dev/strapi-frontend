import React from "react";
import Image from "next/image";

const Slider = ({
  sliderImages,
  title,
}: {
  sliderImages: any[];
  title: string;
}) => {
  return (
    <section className="slider-container">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <h2 className="slider-text">{title}</h2>
        <div className="slider-images">
          {sliderImages.map((image) => (
            <Image
              key={image.id}
              src={image.url}
              width={800}
              height={400}
              alt="Slider Image"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;