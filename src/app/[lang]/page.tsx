"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "./utils/fetch-api";
import Loader from "./components/Loader";

export default function HomePage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/page`;
      const urlParamsObject = {
        populate: {
          content: "*", 
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);
      setData(responseData.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) return <Loader />;

  if (!data) return <div>Failed to load content</div>;

  const { title, content } = data.attributes;

  return (
    <>
      <h1 className="md:w-1/3">{title}</h1>
      <div className="md:w-2/3" dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}
