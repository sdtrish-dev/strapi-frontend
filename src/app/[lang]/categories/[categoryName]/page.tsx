'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './../../components/Loader';

export default function CategoryPage() {
  const router = useRouter();
  const { categoryName } = router.query;
  const [categoryData, setCategoryData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryName) {
      const fetchCategoryData = async () => {
        try {
          const response = await axios.get(`/api/categories?slug=${categoryName}`);
          setCategoryData(response.data);
        } catch (error) {
          console.error('Error fetching category data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCategoryData();
    }
  }, [categoryName]);

  if (isLoading) return <Loader />;

  if (!categoryData) return <div>Category not found</div>;

  return (
    <div>
      <h1>hello</h1>
      {/* <ul>
        {categoryData.posts.map((post: any) => (
          <li key={post.id}>{post.attributes.title}</li>
        ))}
      </ul> */}
    </div>
  );
};

