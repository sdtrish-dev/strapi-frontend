import { fetchAPI } from "./fetch-api";

export function getStrapiURL(path = '', urlParamsObject = {}) {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${path}`;
}

export function getStrapiMedia(media: any) {
  const url = media?.url || '';
  if (url.startsWith('/')) {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${url}`;
  }
  return url;
}

export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export const fetchAboutPageData = async () => {
    const path = `/about`;
    const urlParamsObject = {
        'populate[aboutHero][populate][title]': '*',
        'populate[aboutHero][populate][heroImage]': '*',
        'populate[twoColAbout][populate][title]': '*',
        'populate[twoColAbout][populate][description]': '*',
        'populate[twoColAbout][populate][content]': '*',
        'populate[twoColAbout][populate][image]': '*',
        'populate[twoColAbout][populate][flip]': '*',
    };
    return fetchAPI(path, urlParamsObject);
};

export const fetchContactPageData = async () => {
    const path = `/contact`;
    const urlParamsObject = {
        'populate[contactSlider][populate][title]': '*',
        'populate[contactSlider][populate][sliderImages]': '*',
    };
    return fetchAPI(path, urlParamsObject);
};