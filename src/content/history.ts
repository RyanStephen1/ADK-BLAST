import { assetPaths } from '../lib/assets';
import type { HistoryEngagement, HistoryMilestone } from '../types/content';

export const historyMilestones: HistoryMilestone[] = [
  { year: '1985', label: 'Foundation', title: 'Established in Korea', desc: 'Vendor Registered to Keppel, Sembawang, Jurong shipyards.' },
  { year: '2006', label: 'Regional Growth', title: 'Vendor Registered to Dubai Dry Docks', desc: 'Expansion into major maritime infrastructure in the Middle East.' },
  { year: '2007', label: 'Technical Prowess', title: 'Vendor Registered to Hanjin Heavy Industry', desc: 'Scaling industrial capacity for massive manufacturing facilities.' },
  { year: '2009', label: 'Energy Sector', title: 'Vendor Registered to Qatar Petroleum', desc: 'Precision engineering support for global energy conglomerates.' },
  { year: '2013', label: 'Maritime Excellence', title: 'Vendor Registered to AG&P', desc: 'Specialized maritime engineering and fabrication partnerships.' },
  { year: '2014', label: 'Global Energy', title: 'Vendor Registered to SHELL', desc: 'Exhaustive certification for high-risk global energy project implementation.' },
  { year: '2015', label: 'Power Generation', title: 'Vendor Registered to MHPS (MITSUBISHI POWER)', desc: 'Technical excellence in power plant lifecycle management.' },
  { year: '2018', label: 'Strategic Prowess', title: 'Vendor Registered to 1590 Energy', desc: 'Registered for exhaust pipe and fuel line works with 1590 Energy.' },
  { year: '2018', label: 'Strategic Prowess', title: 'Vendor Registered to Siemens Energy', desc: 'Registered for blasting, painting, and shutdown works with Siemens Energy.' },
  { year: '2025', label: 'Future Horizon', title: 'Vendor Registered to IMI', desc: 'Alignment with International Maritime Industries for specialized Structural Steel Engineering and Ship Haul Repair.' },
];

export const historyHighlightedCompanies = [
  'Keppel',
  'Sembawang',
  'Jurong',
  'POSCO',
  'Dubai Dry Docks',
  'Qatar Petroleum',
  'Hanjin Heavy Industry',
  'Hyundai Construction',
  'AG&P',
  'SHELL',
  'MHPS',
  'MITSUBISHI POWER',
  '1590 Energy',
  'Siemens Energy',
  'IMI',
];

export const historyEngagements: HistoryEngagement[] = [
  {
    name: 'IMI (INTERNATIONAL MARITIME INDUSTRIES)',
    shortName: 'IMI',
    desc: 'Ongoing support for large-scale maritime and naval infrastructure projects.',
    logo: assetPaths.partners.logos.imi,
    sector: 'Structural Steel & Ship Repair',
  },
  {
    name: 'SIEMENS ENERGY',
    shortName: 'Siemens Energy',
    desc: 'Engineering maintenance and lifecycle support for turbine systems.',
    logo: assetPaths.partners.logos.siemensEnergy,
    sector: 'Electromechanical Installation',
  },
  {
    name: '1590 ENERGY CORP',
    shortName: '1590 Energy Corp',
    desc: 'Operational support for power generation and grid systems.',
    logo: assetPaths.partners.logos.energy1590,
    sector: 'Power Generation Support',
  },
];
