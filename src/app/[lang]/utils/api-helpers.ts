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