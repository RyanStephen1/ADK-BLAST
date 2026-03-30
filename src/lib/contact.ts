export const defaultContactService = 'Surface Preparation';
export const defaultSpecialization = 'General';

export const serviceOptionMap: Record<string, string> = {
  'surface preparation': 'Surface Preparation',
  'surface treatment': 'Surface Treatment',
  'piping systems': 'Piping Systems',
  'piping systems and integrated solutions': 'Piping Systems',
  'structural steel engineering': 'Structural Steel Engineering',
  'industrial insulation': 'Industrial Insulation',
  'industrial insulation & operations': 'Industrial Insulation',
  scaffolding: 'Scaffolding',
  electromechanical: 'Electromechanical',
  'electromechanical installation & commissioning': 'Electromechanical',
  'operational support & asset management': 'Operational Support',
};

export const specializationOptionsMap: Record<string, string[]> = {
  'Surface Preparation': [
    'Dry Blasting',
    'Power Tooling',
    'Concrete Repair',
    'High Pressure Water Jet Cleaning with abrasive injection kit',
  ],
  'Surface Treatment': [
    'Industrial Coating Solutions',
    'Thermal Spray Aluminum (TSA)',
    'Intumescent Fireproofing',
    'Polyurea Waterproofing',
  ],
  'Piping Systems': [
    'Custom Spool Fabrication',
    'Boiler Pipe Maintenance',
    'Hydro-testing & Certification',
    'On-site Precision Erection',
  ],
  'Structural Steel Engineering': [
    'Structural Rectification',
    'Advanced Fabrication',
    'Precision Structural Engineering',
    'Ship Haul Repair',
  ],
  'Industrial Insulation': [
    'Thermal Barrier Systems',
    'Cryogenic PFP',
    'Acoustic Attenuation',
  ],
  Scaffolding: [
    'Industrial Access Systems',
    'Load-Bearing Frameworks',
    'Rigorous Safety Compliance',
  ],
  Electromechanical: [
    'Plant Equipment Setup',
    'Electrical Systems',
    'Testing & Verification',
  ],
  'Operational Support': [
    'Strategic Material Handling & Logistics',
    'Critical Maintenance Shutdowns & Turnaround Services',
    'Asset Optimization & Industrial Refurbishment',
  ],
};

export const normalizeServiceQuery = (service: string | null) => {
  if (!service) return defaultContactService;
  return serviceOptionMap[decodeURIComponent(service).toLowerCase()] ?? defaultContactService;
};

export const getSpecializationOptions = (service: string) => [
  defaultSpecialization,
  ...(specializationOptionsMap[service] ?? []),
];

export const resolveSpecialization = (service: string, specialization: string | null) => {
  if (!specialization) return defaultSpecialization;
  const decoded = decodeURIComponent(specialization);
  return specializationOptionsMap[service]?.includes(decoded) ? decoded : defaultSpecialization;
};

export const getRfqLink = (serviceTitle: string, specialization?: string) => {
  const params = new URLSearchParams({ service: serviceTitle });
  if (specialization) params.set('specialization', specialization);
  return `/?${params.toString()}#contact`;
};
