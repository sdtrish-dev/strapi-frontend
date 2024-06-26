import React from 'react';
import Image from "next/image";
import styles from './componentStyles/TwoColTextImg.module.css';

interface ContentItem {
  children: { text: string }[];
}

const TwoColTextImg = ({
  title,
  description,
  content,
  image,
  flip
}: {
  title: string;
  description: string;
  content: ContentItem[];
  image: string;
  flip: boolean;
}) => {

  return (
    <section className={styles.twoColTextImgContainer}>
      <div className={`${styles.twoColFlip} ${flip ? styles.flip : ''}`}>
        <div className={styles.twoColText}>
            <h2>{title}</h2>
            <p>{description}</p>
            {content.map((contentItem, index) => (
                <p key={index}>{contentItem.children[0].text}</p>
            ))}
        </div>
        <div className={styles.twoColImage}>
            <Image src={image} width={800} height={400} alt="Two Col Image" />
        </div>
      </div>
    </section>
  );
};

export default TwoColTextImg;