import React, { useState } from 'react';
import { fetchAPI } from '../utils/fetch-api';
import styles from './componentStyles/ContactForm.module.css';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const formatPhoneNumber = (phoneNumber: string) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return phoneNumber;
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhoneNumber = formatPhoneNumber(event.target.value);
        setPhone(formattedPhoneNumber);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const data = await fetchAPI('/messages', {}, {}, 'POST', {
            name,
            email,
            phone: phone.replace(/\D/g, ''),
            message,
            });
            setStatus('Great! Your message has been sent successfully. We will respond as quickly as we can.');
            // Clear the form
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
        } catch (error) {
            console.error('Error:', error);
            setStatus('Bummer, something went wrong. Did you fill out all of the fields?');
        }
};



    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                />
            </label>
            <label className={styles.label}>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                />
            </label>
            <label className={styles.label}>
                Phone:
                <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    className={styles.input}
                />
            </label>
            <label className={styles.label}>
                Message:
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={styles.textarea}
                />
            </label>
            <input type="submit" value="Submit" className={styles.submit} />
            {status && <div className={styles.status}>{status}</div>}
        </form>
    );
};

export default ContactForm;