import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // fetch posts by slug in strapi backend
    const postsResponse = await axios.get(`${API_URL}/api/posts`);
    const posts = postsResponse.data.data;

    // Return the processed data as the API response
    res.status(200).json(posts);
    }
    catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
    }
}
