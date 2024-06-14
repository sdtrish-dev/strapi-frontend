'use client';
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import { fetchContactPageData  } from '../utils/api-helpers';
import styles from './Contact.module.css';
import ImageSlider from '../components/ImageSlider';
import ContactForm from '../components/ContactForm';

interface ContactClientProps {
    initialData: any;
}

export default function ContactClient({ initialData }: ContactClientProps) {
    const [isLoading, setLoading] = useState(!initialData);
    const [pageData, setPageData] = useState(initialData);

    useEffect(() => {
        if (!initialData) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const data = await fetchContactPageData();
                    setPageData(data.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        } else {
            setLoading(false);
        }
    }, [initialData]);

    if (isLoading) return <Loader />;

    if (!pageData) return <div>Post not found</div>;

    const { title, content, contactSlider } = pageData.attributes;
    const sliderImages = contactSlider?.sliderImages?.data || [];
    const sliderTitle = contactSlider?.title;

return (
  <section className={styles.contactContainer}>
    <h1 className={styles.title}>{title}</h1>
    <div className='flex lg:flex-row flex-col gap-8'>
      <div className={styles.content}>
        {content.split('\n').map((paragraph: string, index: any) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <ContactForm />
    </div>
    <div className={styles.slider}>
      <ImageSlider sliderImages={sliderImages} title={sliderTitle} />
    </div>
  </section>
);
}
