import type { LucideIcon } from 'lucide-react';
import type { ResponsiveImageAsset } from '../lib/assets';

export interface Feature {
  name: string;
  detail: string;
}

export interface ServiceContent {
  id: string;
  title: string;
  icon: LucideIcon;
  img: ResponsiveImageAsset;
  description: string;
  features: Feature[];
}

export interface PartnerProfile {
  name: string;
  logo: string;
  coverImg?: string;
  location: string;
  year: string;
  category: string;
  description: string;
  scope: string[];
  website: string;
}

export interface HistoryMilestone {
  year: string;
  label: string;
  title: string;
  desc: string;
}

export interface HistoryEngagement {
  name: string;
  shortName: string;
  desc: string;
  logo: string;
  sector: string;
}

export interface LegalSection {
  id: string;
  title: string;
  body: string[];
}

export interface HomeCompetency {
  id: string;
  displayId: string;
  title: string;
  desc: string;
  img: ResponsiveImageAsset;
}

export interface HomeValue {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export interface NavDropdownItem {
  name: string;
  path: string;
}

export interface NavLinkItem {
  name: string;
  path?: string;
  dropdown?: NavDropdownItem[];
}

export interface FooterLink {
  label: string;
  to: string;
}

export interface OfficeLocation {
  name: string;
  address: string;
  details: string;
  extra?: string;
}
