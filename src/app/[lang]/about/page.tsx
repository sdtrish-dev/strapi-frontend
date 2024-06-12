'use client';
import React, { useEffect, useState, useCallback } from 'react'; 
import { useParams } from 'next/navigation';
import { fetchAPI } from "../utils/fetch-api";
import { getStrapiMedia } from '../utils/api-helpers';
import Loader from './../components/Loader';
import styles from './About.module.css';
import Hero from '../components/Hero';
import TwoColTextImg from '../components/TwoColTextImg';

export default function AboutPage() {
    const { slug } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [pageData, setPageData] = useState<any>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const path = `/about`;
            const urlParamsObject = {
                'populate[aboutHero][populate][title]': '*',
                'populate[aboutHero][populate][heroImage]': '*',
                'populate[twoColAbout][populate][title]': '*',
                'populate[twoColAbout][populate][description]': '*',
                'populate[twoColAbout][populate][content]': '*',
                'populate[twoColAbout][populate][image]': '*',
                'populate[twoColAbout][populate][flip]': '*',
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

    const { title, content, aboutHero, twoColAbout } = pageData.attributes;
    const heroImage = aboutHero?.heroImage?.data?.attributes?.url;
    const heroImageUrl = getStrapiMedia({ url: heroImage });
    const heroTitle = aboutHero?.title;


    return (
        <>
        <section className={styles.pageContainer}>
            <h1 className={styles.title}>{title}</h1>
            <Hero title={heroTitle} heroImage={heroImageUrl} />
            <div className={styles.container}>
                <div>
                    {content.split('\n').map((paragraph: string, index: any) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
                <div className={styles.grid}>
                    {twoColAbout.map((item: any) => (
                        <TwoColTextImg 
                            key={item.id} 
                            title={item.title} 
                            description={item.description} 
                            content={item.content} 
                            image={item.image} 
                            flip={item.flip} 
                        />
                    ))}
                </div>
            </div>
        </section>
        </>
    );
};
