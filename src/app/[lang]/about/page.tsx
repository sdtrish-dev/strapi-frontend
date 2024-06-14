import AboutClient from './AboutClient';
import { fetchAboutPageData } from '../utils/api-helpers';

export default async function AboutPage() {
    const data = await fetchAboutPageData();
    return (
        <AboutClient initialData={data?.data || null} />
    );
}