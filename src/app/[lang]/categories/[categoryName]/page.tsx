'use client';

import React, { useEffect, useState, useCallback } from 'react'; 
import { useParams } from 'next/navigation';
import axios from 'axios';
import Loader from './../../components/Loader';
import styles from './CategoryPage.module.css';

export default function CategoryPage() {
  const { categoryName } = useParams(); 

  const [isLoading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<any>(null);

  const fetchData = useCallback(async () => {
    if (!categoryName) return; 

    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/api/categories?filters[slug][$eq]=${categoryName}&populate=*`;

      const response = await axios.get(`http://localhost:1337${path}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.data.length > 0) {
        setCategoryData(response.data.data[0]); 
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
    <>
    <div className={styles.postsContainer}>
      <h1 className={styles.title}>{categoryData.attributes.name}</h1>
      <div className={styles.grid}>
        <div className={styles.card}>
        <h2 className={styles.postTitle}>No posts yet!</h2>
        <p className={styles.description}>Coming soon...</p>
        </div>
      </div>
    </div>
      
    </>
  ) 

  return (
    <div className={styles.postsContainer}>
      <h1 className={styles.title}>{categoryData.attributes.name}</h1>
      <div className={styles.grid}>
        {posts.map((post: any) => (
          <div key={post.id} className={styles.card}>
            <h2 className={styles.postTitle}>{post.attributes.title}</h2>
            <p className={styles.description}>{post.attributes.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
