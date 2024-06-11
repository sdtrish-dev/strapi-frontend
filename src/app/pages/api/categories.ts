import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
console.log('API_URL:', API_URL);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Fetch categories from Strapi backend
    const categoriesResponse = await axios.get(`${API_URL}/api/categories?populate=*`);
    const categories = categoriesResponse.data.data;
    console.log('categories:', categories);

    // Fetch posts for each category using your custom Strapi endpoint
    const categoriesWithPosts = await Promise.all(
      categories.map(async (category: any) => {
        const postsResponse = await axios.get(`${API_URL}/api/posts/category/${category.attributes.slug}`);
        const posts = postsResponse.data.data;
    
        return {
          ...category,
          posts,
        };
      })
    );

    // Return the processed data as the API response
    res.status(200).json(categoriesWithPosts);
  } catch (error) {
    console.error('Error fetching category data:', error);
    res.status(500).json({ error: 'Failed to fetch category data' });
  }
}
