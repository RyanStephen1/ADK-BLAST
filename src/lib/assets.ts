const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;

export interface ResponsiveImageAsset {
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

const responsiveAsset = (
  path: string,
  width: number,
  height: number,
  variants: number[],
): ResponsiveImageAsset => {
  const extensionIndex = path.lastIndexOf('.');
  const basePath = extensionIndex >= 0 ? path.slice(0, extensionIndex) : path;
  const extension = extensionIndex >= 0 ? path.slice(extensionIndex) : '';

  return {
    src: asset(path),
    srcSet: [
      ...variants.map((variant) => `${asset(`${basePath}-${variant}${extension}`)} ${variant}w`),
      `${asset(path)} ${width}w`,
    ].join(', '),
    width,
    height,
  };
};

const serviceImage = (name: string) => responsiveAsset(`services/${name}.webp`, 1346, 757, [480, 768]);

export const assetPaths = {
  brand: {
    logoFull: asset('brand/logo-full.svg'),
    logoMark: asset('brand/logo-mark.svg'),
  },
  home: {
    heroBackgrounds: [
      responsiveAsset('home/hero/hero-1.webp', 1920, 1080, [480, 768]),
      responsiveAsset('home/hero/hero-2.webp', 1920, 1080, [480, 768]),
      responsiveAsset('home/hero/hero-3.webp', 1920, 1080, [480, 768]),
      responsiveAsset('home/hero/hero-4.webp', 1920, 1080, [480, 768]),
      responsiveAsset('home/hero/hero-5.webp', 1920, 1080, [480, 768]),
      responsiveAsset('home/hero/hero-6.webp', 1920, 1080, [480, 768]),
    ],
  },
  services: {
    surfacePreparation: serviceImage('surface-preparation'),
    surfaceTreatment: serviceImage('surface-treatment'),
    piping: serviceImage('piping'),
    structural: serviceImage('structural'),
    insulation: serviceImage('insulation'),
    scaffolding: serviceImage('scaffolding'),
    electromechanical: serviceImage('electromechanical'),
    operational: serviceImage('operational'),
  },
  partners: {
    logos: {
      energy1590: asset('partners/logos/1590-energy.svg'),
      agnp: asset('partners/logos/agnp.svg'),
      dubaiWorld: asset('partners/logos/dubai-world.svg'),
      hanjin: asset('partners/logos/hanjin.svg'),
      imi: asset('partners/logos/imi.svg'),
      jgSummit: asset('partners/logos/jg-summit.svg'),
      mitsubishiPower: asset('partners/logos/mitsubishi-power.svg'),
      qatarPetroleum: asset('partners/logos/qatar-petroleum.svg'),
      shell: asset('partners/logos/shell.svg'),
      siemensEnergy: asset('partners/logos/siemens-energy.svg'),
    },
    covers: {
      energy1590: asset('partners/covers/1590-energy.webp'),
      agp: asset('partners/covers/agp.webp'),
      dubaiWorld: asset('partners/covers/dubai-world.webp'),
      hanjin: asset('partners/covers/hanjin.webp'),
      hanjinDetail: asset('partners/covers/hanjin-detail.webp'),
      imi: asset('partners/covers/imi.webp'),
      jgSummit: asset('partners/covers/jg-summit.webp'),
      mitsubishiPower: asset('partners/covers/mitsubishipower.webp'),
      qatarPetroleum: asset('partners/covers/qatar-petroleum.webp'),
      shell: asset('partners/covers/shell.webp'),
      siemensEnergy: asset('partners/covers/siemens-energy.webp'),
    },
  },
  certifications: {
    iso9001: asset('certifications/iso-9001-2015.webp'),
    iso45001: asset('certifications/iso-45001-2018.webp'),
    investmentLicense: asset('certifications/investment-license.webp'),
    companyRegistration: asset('certifications/company-registration.webp'),
    companyRegistrationSecondary: asset('certifications/company-registration-secondary.webp'),
    chamberOfCommerce: asset('certifications/chamber-of-commerce.webp'),
    gosiCertificate: asset('certifications/gosi-certificate.webp'),
    saudiVatRegistration: asset('certifications/saudi-vat-registration.webp'),
    saudizationCertificate: asset('certifications/saudization-certificate.webp'),
  },
} as const;


