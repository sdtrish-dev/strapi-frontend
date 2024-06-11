'use client';

import React, { useEffect, useState, useCallback } from 'react'; 
import { useParams } from 'next/navigation';
import { fetchAPI } from "../../utils/fetch-api";
import { getStrapiMedia } from '../../utils/api-helpers';
import Loader from './../../components/Loader';
import styles from './Post.module.css';
import Image from "next/image";
import Link from 'next/link';

export default function Post() {
    const { slug } = useParams();

    const [isLoading, setLoading] = useState(true);
    const [postData, setPostData] = useState<any>(null);

    const fetchData = useCallback(async () => {
        if (!slug) return;

        setLoading(true);
        try {
            const path = `/posts`;
            const urlParamsObject = {
                filters: {
                    slug: {
                        $eq: slug,
                    },
                },
                'populate[postHero][populate][title]': '*',
                'populate[postHero][populate][heroImage]': '*',
                'populate[categories]': '*',
            };

            const data = await fetchAPI(path, urlParamsObject);

            if (data.data.length > 0) {
                setPostData(data.data[0]);
            } else {
                setPostData(null);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (isLoading) return <Loader />;

    if (!postData) return <div>Post not found</div>;
    const { title, description, categories, postHero } = postData.attributes;
    const heroImage = postHero?.heroImage?.data?.attributes?.url
    const heroImageUrl = getStrapiMedia({ url: heroImage });
    const heroTitle = postHero?.title;

    return (
        <div className={styles.postContainer}>
            <ul className={styles.categories}>
                {categories.data.map((category: any) => (
                    <li key={category.id}>
                        <Link href={`/categories/${category.attributes.slug}`}>
                            <p>{category.attributes.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.hero}>
                <Image src={heroImageUrl} alt={heroTitle} layout="fill" objectFit="cover" />
            </div>
            <div className={styles.content}>
                <h2>{heroTitle}</h2>
                <p dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        </div>
    );
}
