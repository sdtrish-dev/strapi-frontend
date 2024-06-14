'use client';
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import { fetchAboutPageData  } from '../utils/api-helpers';
import styles from './About.module.css';
import { getStrapiMedia } from '../utils/api-helpers';
import Hero from '../components/Hero';
import TwoColTextImg from '../components/TwoColTextImg';

interface AboutClientProps {
    initialData: any;
}

export default function AboutClient({ initialData }: AboutClientProps) {
    const [isLoading, setLoading] = useState(!initialData);
    const [pageData, setPageData] = useState(initialData);

    useEffect(() => {
        if (!initialData) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const data = await fetchAboutPageData();
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

    if (isLoading) {
        return <Loader />;
    }

    if (!pageData) {
        return <div>No data found</div>;
    }
    const { title, content, aboutHero, twoColAbout } = pageData.attributes;
    const heroImage = aboutHero?.heroImage?.data?.attributes?.url;
    const heroImageUrl = getStrapiMedia({ url: heroImage });
    const heroTitle = aboutHero?.title;

    return (
        <>
        <section className={styles.pageContainer}>
            <h1 className={styles.title}>{title}</h1>
            <Hero title={heroTitle} heroImage={heroImageUrl} />
            <div className={styles.contentContainer}>
                <div>
                    {content.split('\n').map((paragraph: string, index: any) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
                <div className={styles.twoCol}>
                    {twoColAbout.map((item: any) => {
                        const imageUrl = item.image?.data?.attributes?.url;
                        const fullImageUrl = getStrapiMedia({ url: imageUrl });
                        
                        return (
                            <TwoColTextImg 
                                key={item.id} 
                                title={item.title} 
                                description={item.description} 
                                content={item.content} 
                                image={fullImageUrl} 
                                flip={item.flip} 
                            />
                        );
                    })}
                </div>
            </div>
        </section>
        </>
    );
}
