import React from "react";
import Image from "next/image";
import ReactSlider, { Settings } from "react-slick";
import styles from './componentStyles/Slider.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getStrapiMedia } from "../utils/api-helpers";
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} ${styles.nextArrow}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} ${styles.prevArrow}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

interface ImageAttributes {
  url: string;
  [key: string]: any;
}

interface SliderImage {
  id: number;
  attributes: ImageAttributes;
}

interface ImageSliderProps {
  sliderImages: SliderImage[];
  title: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ sliderImages, title }) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section id="imageSlider" className={styles.sliderContainer}>
      <h2 className={styles.sliderText}>{title}</h2>
      <div className={`${styles.container} container mx-auto flex flex-col items-center justify-center`}>
        <ReactSlider {...settings} className={styles.sliderImages}>
          {sliderImages.map((image) => {
            const imageUrl = image.attributes.url;
            const fullImageUrl = getStrapiMedia({ url: imageUrl });
            return (
              <div key={image.id} className={styles.imageContainer}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={fullImageUrl}
                    alt="Slider Image"
                    fill
                    className={styles.image} 
                  />
                </div>
              </div>
            );
          })}
        </ReactSlider>
      </div>
    </section>
  );
};

export default ImageSlider;
