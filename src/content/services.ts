import { Award, Globe, Shield, Target, Zap } from 'lucide-react';
import { assetPaths } from '../lib/assets';
import type { ServiceContent } from '../types/content';

export const serviceCategories: ServiceContent[] = [
  {
    id: '01',
    title: 'Surface Preparation',
    icon: Zap,
    img: assetPaths.services.surfacePreparation,
    description: 'Surface preparation is a foundational process that ensures protective coatings and repair materials form a reliable mechanical bond with steel or concrete substrates. By removing contaminants and establishing a proper profile, this step directly prevents common issues like peeling or premature corrosion, ultimately extending the service life of critical assets.',
    features: [
      { name: 'Dry Blasting', detail: 'Dry blasting is a surface preparation method that uses compressed air to propel abrasive particles at high velocity against a surface. This process removes rust, scale, paint, and other contaminants to create a clean surface profile that promotes strong adhesion for coatings and linings.' },
      { name: 'Power Tooling', detail: 'Where it is not possible to clean by abrasive blasting, hand and power tool methods may be the only acceptable alternative method of preparing and cleaning a surface.' },
      { name: 'Concrete Repair', detail: 'Concrete repair is a precision engineering process that restores structural integrity by removing damaged material and applying advanced, sustainable mortars. By utilizing technologies like hydro-demolition and self-healing materials, these repairs ensure a seamless bond and long-term durability against environmental decay.' },
      { name: 'High Pressure Water Jet Cleaning with abrasive injection kit', detail: 'Introducing water into an abrasive blast stream reduces airborne dust by up to 95%, significantly mitigating respiratory health hazards. It effectively flushes away water-soluble contaminants while operating at pressures and utilizing equipment comparable to traditional dry blasting. By encapsulating particles in water, the process ensures a cleaner surface and a safer environment with minimal containment requirements.' },
    ],
  },
  {
    id: '02',
    title: 'Surface Treatment',
    icon: Shield,
    img: assetPaths.services.surfaceTreatment,
    description: 'Sophisticated chemical and physical barrier solutions designed to protect critical industrial assets from extreme corrosive environments and chemical erosion.',
    features: [
      { name: 'Industrial Coating Solutions', detail: 'Application of high-performance epoxy and polyurethane coatings for tanks, vessels, and refinery infrastructure.' },
      { name: 'Thermal Spray Aluminum (TSA)', detail: 'Specialized arc-wire spray systems for long-term corrosion protection in high-temperature and offshore environments.' },
      { name: 'Intumescent Fireproofing', detail: 'Advanced passive fire protection that expands into insulating char to maintain structural integrity during thermal events.' },
      { name: 'Polyurea Waterproofing', detail: 'Ultra-fast curing elastomeric membranes for robust bridge, roof, and containment secondary lining.' },
    ],
  },
  {
    id: '03',
    title: 'Piping Systems and Integrated Solutions',
    icon: Target,
    img: assetPaths.services.piping,
    description: 'Certified fabrication and installation of mission-critical piping networks using advanced metallurgy and rigorous pressure-testing protocols.',
    features: [
      { name: 'Custom Spool Fabrication', detail: 'High-precision CAD-driven pipe spool manufacturing with certified welding for complex industrial layouts.' },
      { name: 'Boiler Pipe Maintenance', detail: 'Specialized heat-resistant CORTEN steel solutions for thermal plant infrastructure and high-temperature transport.' },
      { name: 'Hydro-testing & Certification', detail: 'Rigorous water flushing and high-pressure verification to ensure 100% leak-free operational performance.' },
      { name: 'On-site Precision Erection', detail: 'Surgical alignment and installation of industrial piping using advanced rigging and hot-work safety standards.' },
    ],
  },
  {
    id: '04',
    title: 'Structural Steel Engineering',
    icon: Award,
    img: assetPaths.services.structural,
    description: 'Large-scale structural fabrication and rectification services, delivering certified load-bearing frameworks for heavy industry.',
    features: [
      { name: 'Structural Rectification', detail: 'On-site structural restoration and reinforcement of legacy industrial assets under rigid shutdown constraints.' },
      { name: 'Advanced Fabrication', detail: 'Heavy-gauge welding and assembly of industrial towers, frames, and complex refinery skeletal systems.' },
      { name: 'Precision Structural Engineering', detail: 'Certified analysis and fabrication of architectural steel frameworks for refineries and power plants.' },
      { name: 'Ship Haul Repair', detail: 'Specialized repair and maintenance services for ship hulls and underwater structures, performed during dry-docking operations.' },
    ],
  },
  {
    id: '05',
    title: 'Industrial Insulation & Operations',
    icon: Shield,
    img: assetPaths.services.insulation,
    description: 'High-performance thermal, acoustic, and cryogenic insulation systems designed to optimize energy efficiency and operator safety across industrial complexes.',
    features: [
      { name: 'Thermal Barrier Systems', detail: 'Implementation of multi-layer hot and cold insulation cladding to minimize thermal leakage in steam and HVAC networks.' },
      { name: 'Cryogenic PFP', detail: 'Specialized insulation for LNG and low-temperature gas systems ensuring structural integrity and process stability.' },
      { name: 'Acoustic Attenuation', detail: 'Engineered sound barriers for high-decibel industrial machinery to meet occupational health and safety standards.' },
    ],
  },
  {
    id: '06',
    title: 'Scaffolding',
    icon: Zap,
    img: assetPaths.services.scaffolding,
    description: 'Specialized industrial access and scaffolding solutions providing safe, load-bearing frameworks for complex maintenance and construction projects.',
    features: [
      { name: 'Industrial Access Systems', detail: 'Certified scaffolding design and erection for refineries, shipyards, and high-rise industrial structures.' },
      { name: 'Load-Bearing Frameworks', detail: 'Engineering of heavy-duty support systems for structural rectification and equipment installation.' },
      { name: 'Rigorous Safety Compliance', detail: 'Strict adherence to global safety protocols (OSHA/Aramco) ensuring zero-incident access operations.' },
    ],
  },
  {
    id: '07',
    title: 'Electromechanical Installation & Commissioning',
    icon: Globe,
    img: assetPaths.services.electromechanical,
    description: 'Integrated mechanical and electrical services for plant equipment installation, commissioning, and optimization.',
    features: [
      { name: 'Plant Equipment Setup', detail: 'Precision and technical foresight are at the heart of every project we oversee, ensuring the seamless integration of complex plant machinery and pipeline networks.' },
      { name: 'Electrical Systems', detail: 'ADK provides end-to-end erection, installation, and commissioning services designed to transform complex electrical infrastructure into fully operational assets.' },
      { name: 'Testing & Verification', detail: 'ADK delivers comprehensive testing and performance verification services designed to ensure the integrity and reliability of your critical infrastructure.' },
    ],
  },
  {
    id: '08',
    title: 'Operational Support & Asset Management',
    icon: Globe,
    img: assetPaths.services.operational,
    description: 'Comprehensive asset integrity and operational support services, including rope access, NDT, and industrial cleaning, ensuring long-term asset performance and safety.',
    features: [
      { name: 'Strategic Material Handling & Logistics', detail: 'We leverage advanced technical oversight and optimized workflows to streamline the movement and storage of industrial materials, ensuring your project remains cost-effective, secure, and on schedule.' },
      { name: 'Critical Maintenance Shutdowns & Turnaround Services', detail: 'Maximize your plantâ€™s uptime and operational safety with our expert-led maintenance shutdowns, designed to deliver precision engineering and rapid turnarounds that minimize costly downtime.' },
      { name: 'Asset Optimization & Industrial Refurbishment', detail: 'Transform aging infrastructure into high-performance assets with our comprehensive refurbishment services, engineered to extend operational life and enhance efficiency.' },
    ],
  },
];
