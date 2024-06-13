// create hero block with title and heroImage
import React from 'react';
import Image from "next/image";
import styles from './componentStyles/Hero.module.css'
const Hero = ({ 
    title, 
    heroImage 
}: { 
    title: string,
    heroImage: string
}) => {

return (
    <section className={styles.hero}>
      <div>
        <div className={styles.heroImage}>
        <Image src={heroImage} alt="Hero Image" layout="fill" objectFit="cover" />
        </div>
        <h1 className={styles.heroTitle}>{title}</h1>
      </div>
    </section>
    );
};
export default Hero;
