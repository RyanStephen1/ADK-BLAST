import { Factory, Ship, Zap } from 'lucide-react';
import { assetPaths } from '../lib/assets';
import type { HistoryEngagement, HistoryMilestone } from '../types/content';

export const historyMilestones: HistoryMilestone[] = [
  { year: '1985', label: 'Foundation', title: 'Established in Korea', desc: 'Vendor Registered to Keppel, Sembawang, Jurong shipyards.' },
  { year: '1994', label: 'Heavy Industry', title: 'Vendor Registered to POSCO', desc: 'Primary mechanical engineering partner for premier steel manufacturing.' },
  { year: '2006', label: 'Regional Growth', title: 'Vendor Registered to Dubai Dry Docks', desc: 'Expansion into major maritime infrastructure in the Middle East.' },
  { year: '2009', label: 'Energy Sector', title: 'Vendor Registered to Qatar Petroleum', desc: 'Precision engineering support for global energy conglomerates.' },
  { year: '2010', label: 'Technical Prowess', title: 'Vendor Registered to Hanjin Heavy Industry', desc: 'Scaling industrial capacity for massive manufacturing facilities.' },
  { year: '2011', label: 'Strategic Alliances', title: 'Vendor Registered to Hyundai Construction', desc: 'Integrated engineering support for heavy domestic infrastructure.' },
  { year: '2013', label: 'Maritime Excellence', title: 'Vendor Registered to AG&P', desc: 'Specialized maritime engineering and fabrication partnerships.' },
  { year: '2014', label: 'Global Energy', title: 'Vendor Registered to SHELL', desc: 'Exhaustive certification for high-risk global energy project implementation.' },
  { year: '2015', label: 'Power Generation', title: 'Vendor Registered to MHPS (MITSUBISHI POWER)', desc: 'Technical excellence in power plant lifecycle management.' },
  { year: '2018', label: 'Strategic Prowess', title: '1590 Energy & Siemens Energy', desc: 'Dual registration for Electromechanical Installation & Commissioning with leading power producers.' },
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
    icon: Ship,
    name: 'IMI (INTERNATIONAL MARITIME INDUSTRIES)',
    shortName: 'IMI',
    desc: 'Strategic partner for large-scale naval infrastructure and maritime engineering excellence.',
    logo: assetPaths.partners.logos.imi,
    sector: 'Structural Steel & Ship Repair',
  },
  {
    icon: Zap,
    name: 'SIEMENS ENERGY',
    shortName: 'Siemens Energy',
    desc: 'Primary engineering maintenance and component lifecycle management for turbine facilities.',
    logo: assetPaths.partners.logos.siemensEnergy,
    sector: 'Electromechanical Installation',
  },
  {
    icon: Factory,
    name: '1590 ENERGY CORP',
    shortName: '1590 Energy Corp',
    desc: 'Strategic operational support for power generation and distribution grid stabilization.',
    logo: assetPaths.partners.logos.energy1590,
    sector: 'Power Generation Support',
  },
];
