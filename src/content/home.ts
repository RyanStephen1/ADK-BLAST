import { Gavel, Handshake, ShieldCheck, TrendingUp, Zap } from 'lucide-react';
import { assetPaths } from '../lib/assets';
import type { HomeCompetency, HomeValue } from '../types/content';

export const homeHeroBackgrounds = assetPaths.home.heroBackgrounds;

export const homeCompetencies: HomeCompetency[] = [
  {
    id: 'surface-preparation',
    displayId: '01',
    title: 'Surface Preparation',
    desc: 'Foundational process ensuring protective coatings form a reliable bond with substrates to prevent corrosion and extend asset life.',
    img: assetPaths.services.surfacePreparation,
  },
  {
    id: 'surface-treatment',
    displayId: '02',
    title: 'Surface Treatment',
    desc: 'Advanced treatments providing robust resistance against environmental oxidation while maintaining substrate mechanical integrity.',
    img: assetPaths.services.surfaceTreatment,
  },
  {
    id: 'piping-systems',
    displayId: '03',
    title: 'Piping Systems and Integrated Solutions',
    desc: 'Precision industrial piping fabrication, certified installation, and comprehensive lifecycle testing solutions.',
    img: assetPaths.services.piping,
  },
  {
    id: 'structural-steel',
    displayId: '04',
    title: 'Structural Steel Engineering',
    desc: 'Large-scale structural fabrication and rectification services, delivering certified load-bearing frameworks.',
    img: assetPaths.services.structural,
  },
  {
    id: 'industrial-insulation',
    displayId: '05',
    title: 'Industrial Insulation',
    desc: 'High-performance thermal, acoustic, and cryogenic insulation systems for optimal energy efficiency and worksite safety.',
    img: assetPaths.services.insulation,
  },
  {
    id: 'scaffolding',
    displayId: '06',
    title: 'Scaffolding',
    desc: 'Certified industrial access solutions providing safe, load-bearing frameworks for maintenance and construction.',
    img: assetPaths.services.scaffolding,
  },
  {
    id: 'electromechanical',
    displayId: '07',
    title: 'Electromechanical Installation & Commissioning',
    desc: 'Integrated mechanical and electrical services for plant equipment installation, commissioning, and optimization.',
    img: assetPaths.services.electromechanical,
  },
  {
    id: 'operational-support',
    displayId: '08',
    title: 'Operational Support & Asset Management',
    desc: 'Comprehensive asset integrity and operational support services, including rope access, NDT, and industrial cleaning, ensuring long-term asset performance and safety.',
    img: assetPaths.services.operational,
  },
];

export const homePartnerLogos = [
  assetPaths.partners.logos.dubaiWorld,
  assetPaths.partners.logos.mitsubishiPower,
  assetPaths.partners.logos.jgSummit,
  assetPaths.partners.logos.energy1590,
  assetPaths.partners.logos.siemensEnergy,
  assetPaths.partners.logos.shell,
  assetPaths.partners.logos.qatarPetroleum,
  assetPaths.partners.logos.imi,
  assetPaths.partners.logos.hanjin,
  assetPaths.partners.logos.agnp,
];

export const homeValues: HomeValue[] = [
  { icon: Zap, title: 'Performance', desc: 'Focusing on excellence through constant advancement and fulfilling commitments' },
  { icon: Gavel, title: 'Business Practice', desc: 'Upholding the highest standards of integrity and ethical conduct in all operations' },
  { icon: ShieldCheck, title: 'Safety & HSE', desc: 'Upholding a culture of safety and environmental obligations across every worksite' },
  { icon: TrendingUp, title: 'Development', desc: 'Promoting growth through continuous learning and engineering improvement' },
  { icon: Handshake, title: 'Customer Care', desc: 'Providing exceptional service with a strong dedication to client relationships' },
];
