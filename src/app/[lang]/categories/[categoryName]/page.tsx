'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { fetchAPI } from "../../utils/fetch-api";
import Loader from './../../components/Loader';
import styles from './CategoryPage.module.css';
import Link from 'next/link';

export default function CategoryPage() {
  const { categoryName } = useParams();

  const [isLoading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<any>(null);

  const fetchData = useCallback(async () => {
    if (!categoryName) return;

    setLoading(true);
    try {
      const path = `/categories`;
      const urlParamsObject = {
        filters: {
          slug: {
            $eq: categoryName,
          },
        },
        populate: '*',
      };

      const data = await fetchAPI(path, urlParamsObject);

      if (data.data.length > 0) {
        setCategoryData(data.data[0]);
      } else {
        setCategoryData(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [categoryName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) return <Loader />;

  if (!categoryData) return <div>Category not found</div>;

  const posts = categoryData.attributes.posts.data;

  if (posts.length === 0) return (
    <div className={styles.container}>
      <h1 className={styles.title}>{categoryData.attributes.name}</h1>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.postTitle}>No posts yet!</h2>
          <p className={styles.description}>Coming soon...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{categoryData.attributes.name}</h1>
      <div className={styles.grid}>
        {posts.map((post: any) => (
          <Link href={`/posts/${post.attributes.slug}`} key={post.id}>
            <div className={styles.card}>
              <h2 className={styles.postTitle}>{post.attributes.title}</h2>
              <p className={styles.description}>{post.attributes.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
