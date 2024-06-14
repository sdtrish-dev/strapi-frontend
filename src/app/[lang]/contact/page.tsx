import ContactClient from './ContactClient';
import { fetchContactPageData } from '../utils/api-helpers';

export default async function ContactPage() {
    const data = await fetchContactPageData();
    return (
        <ContactClient initialData={data?.data || null} />
    );
}