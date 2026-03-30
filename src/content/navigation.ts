import type { FooterLink, NavLinkItem, OfficeLocation } from '../types/content';

export const navLinks: NavLinkItem[] = [
  {
    name: 'Expertise',
    dropdown: [
      { name: 'Surface Preparation', path: '/services?id=01' },
      { name: 'Surface Treatment', path: '/services?id=02' },
      { name: 'Piping Systems And Integrated Solutions', path: '/services?id=03' },
      { name: 'Structural Steel Engineering', path: '/services?id=04' },
      { name: 'Industrial Insulation & Operations', path: '/services?id=05' },
      { name: 'Scaffolding', path: '/services?id=06' },
      { name: 'Electromechanical Installation & Commissioning', path: '/services?id=07' },
      { name: 'Operational Support & Asset Management', path: '/services?id=08' },
    ],
  },
  { name: 'Partners', path: '/partners' },
  { name: 'Our Legacy', path: '/history' },
  { name: 'Standards', path: '/certifications' },
];

export const quickLinks: FooterLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Partners', to: '/partners' },
  { label: 'Our Legacy', to: '/history' },
  { label: 'Standards', to: '/certifications' },
  { label: 'Start Project Request', to: '/#contact' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service', to: '/terms-of-service' },
];

export const offices: OfficeLocation[] = [
  {
    name: 'Korea Office',
    address: '19, Beobwonnam-ro 15beon-gil, Yeonje-gu, Busan, S. Korea',
    details: 'TEL: +82-10-4198-2440',
    extra: 'EMAIL: stonyk@adknprotech.com',
  },
  {
    name: 'Saudi Arabia Office',
    address: '2837, B13, Tebah District, Al Jubail, Saudi Arabia',
    details: 'TEL: +966-50-285-4880',
    extra: 'EMAIL: stonyk@adknprotech.com',
  },
  {
    name: 'Philippine Office',
    address: 'Sitio Bulihan, Tabangao Ambulong, Batangas City, Philippines',
    details: 'TEL: +63-917-117-6242',
    extra: 'EMAIL: stonyk@adknprotech.com',
  },
  {
    name: 'Bahrain Office',
    address: 'Office 31 - Al Tajer Building 2582, 3rd Floor, Road 3647, Block 436, Seef Area',
    details: 'Global Service Hub',
  },
];
