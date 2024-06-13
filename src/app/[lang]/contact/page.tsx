'use client';
import React, { useEffect, useState, useCallback } from 'react'; 
import { useParams } from 'next/navigation';
import { fetchAPI } from "../utils/fetch-api";
import { getStrapiMedia } from '../utils/api-helpers';
import Loader from './../components/Loader';
import styles from './Contact.module.css';
import ImageSlider from '../components/ImageSlider';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
    const { slug } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [pageData, setPageData] = useState<any>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const path = `/contact`;
            const urlParamsObject = {
                'populate[contactSlider][populate][title]': '*',
                'populate[contactSlider][populate][sliderImages]': '*',
            };
            const data = await fetchAPI(path, urlParamsObject);

            if (data?.data) {
                setPageData(data.data);
            } else {
                setPageData(null);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
};

