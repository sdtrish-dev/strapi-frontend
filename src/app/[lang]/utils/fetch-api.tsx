import qs from "qs";
import { getStrapiURL } from "./api-helpers";

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options: RequestInit = {},
  method: "GET" | "POST" = "GET",
  body: Record<string, any> | null = null
) {
  try {
    // Prepare the request body correctly
    const requestBody = body ? JSON.stringify({ data: body }) : null;

    // Merge default and user options
    const mergedOptions: RequestInit = {
      method, // Use the specified method (GET or POST)
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      body: requestBody, // Set the request body
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}
