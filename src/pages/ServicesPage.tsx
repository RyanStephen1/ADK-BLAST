import { useEffect, useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import ResponsiveImage from '../components/ResponsiveImage';
import SEO from '../components/SEO';
import { serviceCategories } from '../content/services';
import { getRfqLink } from '../lib/contact';
import type { Feature, ServiceContent } from '../types/content';

const ServicesPage = () => {
  const location = useLocation();
  const [selectedService, setSelectedService] = useState<ServiceContent | null>(null);
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceId = params.get('id');
    const hash = location.hash;

    if (serviceId) {
      const scrollTimer = setTimeout(() => {
        requestAnimationFrame(() => {
          const element = document.getElementById(serviceId);
          if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 120;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        });
      }, 100);
      return () => clearTimeout(scrollTimer);
    } else if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  const handleOpenModal = (service: ServiceContent, feature?: Feature) => {
    setSelectedService(service);
    setActiveFeature(feature || null);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setActiveFeature(null);
  };

  return (
    <div className="bg-surface text-on-surface antialiased">
      <SEO
        title="Services | ADK Co., LTD."
        description="ADK Co., LTD. offers specialized industrial engineering services including Surface Preparation, Treatment, Piping Systems, Structural Steel, Insulation, Scaffolding, and Electromechanical solutions."
        path="/services"
      />

      <main>
        {/* Header Section */}
        <section className="relative overflow-hidden bg-on-background pb-16 pt-28 text-white sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-40">
          <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 xl:px-10">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.4em] text-accent sm:mb-8">Technical Expertise</span>
              <h1 className="mb-8 text-4xl font-extrabold uppercase italic leading-[0.9] tracking-tight sm:text-5xl md:mb-10 md:text-7xl xl:text-8xl">
                Industrial <br /><span className="text-white/40">Capabilities.</span>
              </h1>
              <p className="max-w-2xl border-l border-white/40 pl-4 text-base font-light leading-relaxed text-white/90 sm:pl-6 sm:text-lg md:pl-8 lg:text-xl">
                Providing specialized engineering solutions across the global maritime and industrial infrastructure landscapes since 1985.
              </p>
            </m.div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none">
            <div className="industrial-gradient w-full h-full"></div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="bg-surface py-12 sm:py-20 md:py-32 xl:py-40">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 xl:px-10">
            <div className="grid grid-cols-1 gap-12 sm:gap-20 lg:gap-24 xl:gap-28">
              {serviceCategories.map((service, idx) => (
                <div
                  key={service.id}
                  id={service.id}
                  className={`flex scroll-mt-28 flex-col gap-10 sm:gap-12 lg:gap-16 xl:gap-20 ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start lg:items-center`}
                >
                  <m.div
                    initial={idx === 0 ? false : { opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="group relative w-full cursor-pointer lg:w-1/2 self-stretch"
                    onClick={() => handleOpenModal(service)}
                  >
                    <div className="relative h-full min-h-[300px] sm:min-h-[400px] lg:min-h-0 rounded-default overflow-hidden shadow-ambient bg-on-background">
                      <ResponsiveImage
                        asset={service.img}
                        alt={service.title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        pictureClassName="absolute inset-0"
                        imgClassName="transition-transform duration-700 group-hover:scale-105"
                        fetchPriority={idx === 0 ? 'high' : undefined}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  </m.div>

                  <m.div
                    initial={idx === 0 ? false : { opacity: 0, x: idx % 2 === 0 ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="w-full space-y-8 sm:space-y-10 lg:w-1/2 lg:space-y-12"
                  >
                    <div className="space-y-6">
                      <h2 className="text-3xl font-extrabold uppercase italic tracking-tighter text-on-background sm:text-4xl lg:text-5xl xl:text-6xl">
                        {service.title}
                      </h2>
                      <div className="w-20 h-1 bg-primary"></div>
                      <p className="text-base font-light leading-relaxed text-on-surface-variant sm:text-lg">
                        {service.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-3 pb-4 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-4 sm:pb-6 md:pb-8">
                      {service.features.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center gap-4 group cursor-pointer"
                          onClick={() => handleOpenModal(service, feature)}
                        >
                          <div className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></div>
                          <span className="label-sm text-on-surface-variant group-hover:text-primary transition-colors">{feature.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                      <button
                        onClick={() => handleOpenModal(service)}
                        className="inline-flex min-h-11 items-center justify-center bg-primary px-6 py-3 text-center label-sm text-on-primary transition-all hover:-translate-y-1 hover:bg-primary-container sm:px-8 sm:py-4 md:px-10"
                      >
                        Technical Scope
                      </button>
                      <Link
                        to={getRfqLink(service.title)}
                        className="inline-flex min-h-11 items-center justify-center bg-secondary-container px-6 py-3 text-center label-sm text-on-secondary-container transition-all hover:-translate-y-1 hover:bg-on-background hover:text-white sm:px-8 sm:py-4 md:px-10"
                      >
                        Get A Quote
                      </Link>
                    </div>
                  </m.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal */}
        <AnimatePresence>
          {selectedService && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-4 lg:p-8"
            >
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-on-background/95 backdrop-blur-xl"
                onClick={handleCloseModal}
              />

              <m.div
                initial={{ opacity: 0, scale: 0.97, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 24 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex min-h-[500px] max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-sm bg-surface shadow-ambient lg:min-h-[600px] xl:min-h-[700px] lg:flex-row"
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-on-background/10 text-on-background transition-all hover:bg-on-background/20 sm:right-6 sm:top-6 sm:h-12 sm:w-12"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Left Panel: Visual Impact */}
                <div className="relative min-h-[220px] flex-shrink-0 overflow-hidden bg-on-background sm:min-h-[280px] lg:min-h-0 lg:w-1/2">
                  {/* Background image fills the entire panel */}
                  <div className="absolute inset-0">
                    <ResponsiveImage
                      asset={selectedService.img}
                      alt={selectedService.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      pictureClassName="absolute inset-0"
                      imgClassName="opacity-70"
                      fetchPriority="high"
                    />
                  </div>
                  {/* Architectural Overlays */}
                  <div className="absolute inset-0 bg-linear-to-t from-on-background via-on-background/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-linear-to-r from-transparent to-on-background/20 hidden lg:block"></div>

                  <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8 md:p-12 xl:p-16">

                    <div className="space-y-8">
                      <h2 className="text-3xl font-black uppercase italic leading-none tracking-tighter text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                        {selectedService.title}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Right Panel: Data & Specifications */}
                <div className="flex flex-col overflow-hidden bg-surface-container-lowest lg:w-1/2">
                  <div className="flex-1 overflow-y-auto space-y-10 p-5 sm:p-6 md:space-y-12 md:p-8 lg:space-y-16 lg:p-12 xl:p-16">

                    {/* Overview */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <h3 className="label-md text-primary font-black">OVERVIEW</h3>
                        <div className="h-px flex-1 bg-outline-variant/30"></div>
                      </div>
                      <p className="body-lg border-l-2 border-primary pl-5 font-light italic leading-relaxed text-on-surface sm:pl-6 md:pl-8">
                        {selectedService.description}
                      </p>
                    </div>

                    {/* Specializations */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <h3 className="label-md text-primary font-black">SPECIALIZATIONS</h3>
                        <div className="h-px flex-1 bg-outline-variant/30"></div>
                      </div>

                      <div className="space-y-4">
                        {selectedService.features.map((feature, fIdx) => (
                          <div
                            key={fIdx}
                            onClick={() => setActiveFeature(activeFeature?.name === feature.name ? null : feature)}
                            className={`transition-all duration-500 cursor-pointer rounded-sm overflow-hidden ${activeFeature?.name === feature.name
                              ? 'bg-surface-container-high'
                              : 'bg-surface-container-low hover:bg-surface-container-high'
                              }`}
                          >
                            <div className="flex items-center gap-4 p-4 sm:gap-5 sm:p-5 md:gap-6 md:p-6">
                              <span className={`label-sm font-black tabular-nums transition-colors ${activeFeature?.name === feature.name ? 'text-primary' : 'text-on-surface/30'}`}>
                                0{fIdx + 1}
                              </span>
                              <span className="flex-1 text-sm font-bold text-on-surface uppercase tracking-widest">
                                {feature.name}
                              </span>
                              <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${activeFeature?.name === feature.name ? 'rotate-180 text-primary' : 'text-on-surface/20'}`} />
                            </div>

                            <AnimatePresence>
                              {activeFeature?.name === feature.name && (
                                <m.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                  className="overflow-hidden"
                                >
                                  <div className="ml-8 border-t border-outline-variant/10 px-5 pb-5 pt-4 text-sm font-medium italic leading-relaxed text-on-surface-variant sm:ml-10 sm:px-6 sm:pb-6 sm:pt-5 md:ml-12 md:px-8 md:pb-8 md:pt-6"
                                    dangerouslySetInnerHTML={{ __html: feature.detail }}
                                  />
                                </m.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sticky Footer CTA */}
                  <div className="flex-shrink-0 border-t border-outline-variant/20 bg-white p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                      <Link
                        to={getRfqLink(selectedService.title, activeFeature?.name)}
                        onClick={handleCloseModal}
                        className="inline-flex flex-1 items-center justify-center rounded-sm bg-primary px-8 py-4 font-black text-on-primary shadow-xl transition-all hover:-translate-y-1 hover:bg-on-background md:px-10 md:py-5 lg:px-12 lg:py-6"
                      >
                        Get A Quote
                      </Link>
                    </div>
                  </div>
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </main>
    </div >
  );
};

export default ServicesPage;

