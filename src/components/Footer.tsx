import { Link } from 'react-router-dom';
import { offices, quickLinks } from '../content/navigation';
import { assetPaths } from '../lib/assets';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-navy-900 text-white w-full relative overflow-hidden"
      role="contentinfo"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 -mr-32 -mt-32 rounded-full blur-3xl opacity-20" aria-hidden="true" />

      <div
        className="max-w-screen-2xl mx-auto px-5 sm:px-6 md:px-10 py-16 sm:py-20 lg:py-24 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20">
          <div className="lg:col-span-4 space-y-8 sm:space-y-10">
            <div className="flex items-center gap-4 sm:gap-6">
              <div
                className="flex items-center justify-center brightness-0 invert opacity-80"
              >
                <img
                  src={assetPaths.brand.logoFull}
                  alt="ADK Co., LTD"
                  className="w-48 sm:w-56 h-auto object-contain"
                  width={200}
                  height={80}
                  decoding="async"
                  loading="lazy"
                />
              </div>
            </div>
            <p className="body-lg text-white/40 leading-relaxed max-w-md italic text-sm sm:text-base">
              Global industrial services provider specializing in high-precision engineering, infrastructure maintenance, and maritime operations across international jurisdictions.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h6 className="label-md text-white/40 mb-6 sm:mb-8">Quick Links</h6>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:gap-y-5 lg:grid-cols-1" role="list">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="label-sm text-white/60 hover:text-primary transition-colors leading-relaxed inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h6 className="label-md text-white/40 mb-6 sm:mb-8 uppercase italic">Global Operations</h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              {offices.map((office) => (
                <div
                  key={office.name}
                  className="space-y-3 p-5 sm:p-6 hover:bg-white/5 transition-all duration-500 rounded-sm bg-white/[0.02]"
                >
                  <div className="label-sm text-primary">{office.name}</div>
                  <address className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed not-italic">
                    {office.address}
                  </address>
                  <div className="text-[10px] sm:text-[11px] text-white/35 tracking-[0.16em] uppercase leading-relaxed">
                    {office.details}
                    {office.extra ? (
                      <>
                        <span className="mx-2 hidden sm:inline" aria-hidden="true">|</span>
                        <span className="block sm:inline">{office.extra}</span>
                      </>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/30 py-5 sm:py-6 relative z-10">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6 md:px-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-4 sm:gap-5">
          <p className="label-sm text-white/20 text-center md:text-left">
            Copyright {currentYear} ADK Co., LTD. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 sm:gap-x-8" role="list" aria-label="Certifications">
            <span className="label-sm text-white/30" role="listitem">ISO 9001:2015</span>
            <span className="label-sm text-white/30" role="listitem">ISO 14001:2015</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
