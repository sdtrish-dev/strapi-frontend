import "./globals.css";
import { fetchAPI } from "./utils/fetch-api";
import { i18n } from "../../../i18n-config";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import { getStrapiMedia } from "./utils/api-helpers";

const FALLBACK_SEO = {
  title: "Strapi Starter Next Blog",
  description: "Strapi Starter Next Blog",
}

async function getPage(): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token) {
    console.error("The Strapi API Token environment variable is not set.");
    return null;
  }

  // Construct the query string with population for relations
  const queryString = new URLSearchParams({
    'populate[pageFooter][populate][categories]': '*',
    'populate[pageFooter][populate][menuLinks]': '*',
    'populate[pageFooter][populate][footerLogo][populate]': 'logoImage',
    'populate[pageLogo][populate]': 'logoImage',
    'populate[categories]': '*',
  }).toString();

  const path = `/page?${queryString}`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  try {
    const response = await fetchAPI(path, options);
    return response;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const page = await getPage();

  // Default content in case of data fetching failure
  const defaultContent = (
    <html lang={params.lang}>
      <body>
        <main className="dark:bg-black dark:text-gray-100 min-h-screen">
          We're sorry, but we are experiencing some difficulties at the moment.
        </main>
      </body>
    </html>
  );

  if (!page || !page.data) {
    console.error("Page data is not available.");
    return defaultContent;
  }

  const { attributes } = page.data;
  const { title, seo_meta, content, categories, pageFooter, pageLogo } = attributes;

  // Set metadata using the fetched SEO meta
  const metadata = {
    title: seo_meta?.title || FALLBACK_SEO.title,
    description: seo_meta?.description || FALLBACK_SEO.description,
  };
  // Extract media URLs
  const footerLogoUrl = pageFooter.footerLogo?.logoImage?.data?.attributes?.url
    ? getStrapiMedia(pageFooter.footerLogo.logoImage.data.attributes)
    : '';
  const pageLogoUrl = pageLogo.logoImage?.data?.attributes?.url
    ? getStrapiMedia(pageLogo.logoImage.data.attributes)
    : '';

  return (
    <html lang={params.lang}>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="min-h-screen flex flex-col">
        <nav>
          {pageLogo && (
            <Logo
              logoUrl={pageLogoUrl}
              logoText={pageLogo.logoText || ''}
            />
          )}
        </nav>
        <main className="dark:bg-black dark:text-gray-100 flex-grow container my-8">
          {children}
        </main>
        {pageFooter && (
          <Footer
            logoUrl={footerLogoUrl}
            logoText={pageFooter.footerLogo?.logoText || ''}
            menuLinks={pageFooter.menuLinks}
            categoryLinks={pageFooter.categories.data}
            lang={params.lang as string}
          />
        )}
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
