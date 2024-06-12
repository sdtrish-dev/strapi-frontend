// create hero block with title and heroImage
import React from 'react';
import Image from "next/image";
const Hero = ({ 
    title, 
    heroImage 
}: { 
    title: string,
    heroImage: string
}) => {

return (
    <section className="hero-container">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <h1 className="hero-title">{title}</h1>
        <Image src={heroImage} width={800} height={400} alt="Hero Image"/>
      </div>
    </section>
    );
};
export default Hero;