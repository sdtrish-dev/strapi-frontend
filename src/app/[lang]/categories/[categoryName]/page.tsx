'use client';

import React, { useEffect, useState, useCallback } from 'react'; 
import { useParams } from 'next/navigation';
import axios from 'axios';
import Loader from './../../components/Loader';

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
    <div>
      <h1>{categoryData.attributes.name}</h1>
      <div>No posts yet!</div>
    </div>
      
    </>
  ) 

  return (
    <div>
      <h1>{categoryData.attributes.name}</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.attributes.title}</li>
        ))}
      </ul>
    </div>
  );
}
