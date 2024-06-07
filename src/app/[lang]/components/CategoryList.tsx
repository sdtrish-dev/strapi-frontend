import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <ul>
      {categories.map((category: any) => (
        <li key={category.id}>
          <Link href={`/categories/${category.attributes.slug}`}>
            {category.attributes.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
