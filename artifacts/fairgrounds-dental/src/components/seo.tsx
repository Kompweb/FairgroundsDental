import { useEffect } from 'react';

type SeoProps = {
  title: string;
  description: string;
  path: string;
};

const practiceSchema = {
  '@context': 'https://schema.org',
  '@type': ['Dentist', 'LocalBusiness'],
  name: 'Fairgrounds Dental Practice',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '200 Fairgrounds Dr',
    addressLocality: 'Vallejo',
    addressRegion: 'CA',
    postalCode: '94589',
    addressCountry: 'US',
  },
  telephone: '+1-707-552-8195',
  email: 'office@fairgroundsdental.com',
  openingHours: 'Mo-Th 08:00-17:00',
  url: 'https://fairgroundsdental.com',
};

export function PageMeta({ title, description, path }: SeoProps) {
  useEffect(() => {
    document.title = title;
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', `https://fairgroundsdental.com${path}`, true);
    setMeta('og:site_name', 'Fairgrounds Dental Practice', true);
    let schema = document.head.querySelector('#fairgrounds-schema');
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'fairgrounds-schema';
      schema.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(practiceSchema);
  }, [title, description, path]);
  return null;
}