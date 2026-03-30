import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SEO from '../components/SEO';
import { partnerProfiles } from '../content/partners';
import type { PartnerProfile } from '../types/content';

const PartnersPage = () => {
  const [selectedPartner, setSelectedPartner] = useState<PartnerProfile | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedPartner) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPartner]);

  return (
    <div className="bg-surface text-on-surface antialiased">
      <SEO
        title="Global Partners | ADK Co., LTD."
        description="Explore ADK Co., LTD.'s strategic alliances with global industry leaders across shipbuilding, energy, and maritime sectors."
        path="/partners"
      />

      <main>
        {/* Header Section */}
        <section id="alliances" className="relative overflow-hidden bg-on-background pb-16 pt-28 text-white sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-40">
          <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 xl:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <span className="label-md mb-6 block uppercase tracking-[0.4em] text-primary sm:mb-8">Strategic Alliances</span>
              <h1 className="display-lg leading-[0.9] mb-12 uppercase italic">
                Our Global <br /><span className="text-white/40 italic font-medium opacity-80">Network Architecture</span>
              </h1>
              <p className="max-w-2xl border-l border-primary/40 pl-4 text-base font-light leading-relaxed text-white/90 sm:pl-6 sm:text-lg md:pl-8 lg:text-xl">
                Forging long-term high-precision partnerships with industry leaders to deliver integrated engineering solutions at a planetary scale.
              </p>
            </motion.div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none">
            <div className="industrial-gradient w-full h-full"></div>
          </div>
        </section>

        {/* Partners Grid */}
        <section id="hubs" className="bg-surface-container-high py-20 sm:py-24 md:py-32 xl:py-40">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 xl:px-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {partnerProfiles.map((partner, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedPartner(partner)}
                  className="group flex min-h-[420px] cursor-pointer flex-col justify-between rounded-2xl border border-transparent bg-surface-container-high p-6 shadow-ambient transition-all duration-500 hover:border-primary/10 hover:bg-surface-container-lowest sm:min-h-[460px] sm:p-8 xl:min-h-[500px] xl:p-10"
                >
                  <div className="flex flex-1 flex-col">
                    <div className="mb-8 flex h-40 w-full items-center justify-center overflow-hidden rounded-xl border border-white/5 p-3 transition-colors duration-500 group-hover:border-primary/10 sm:mb-10 sm:h-44 sm:p-4 xl:mb-12 xl:h-48 xl:p-5"
                      style={{ background: 'linear-gradient(135deg, rgba(10,17,40,0.03) 0%, rgba(10,17,40,0.01) 100%)' }}>
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-full w-full object-contain"
                        style={{ maxHeight: '150px', maxWidth: '380px' }}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="space-y-3 sm:space-y-4">
                        <span className="text-primary font-bold uppercase text-[9px] tracking-[0.4em] block">{partner.category}</span>
                        <h3 className="text-2xl font-extrabold uppercase italic leading-none tracking-tighter text-on-background transition-colors duration-500 group-hover:text-primary sm:text-3xl">{partner.name}</h3>
                        <p className="min-h-[72px] text-sm leading-6 text-on-surface-variant line-clamp-3 sm:min-h-[84px] sm:leading-7">
                          {partner.description}
                        </p>
                      </div>

                      <div className="mt-6 border-t border-outline-variant/20 pt-5 sm:mt-8 sm:pt-6">
                        <div className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant/40 mb-2">Partnership Tenure</div>
                        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface">{partner.year}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-outline-variant/30 pt-6 sm:pt-8 xl:pt-10">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant/40 mb-1">Project Hub</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">{partner.location}</span>
                    </div>
                    <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform duration-500">east</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Horizontal Inspection Modal */}
        <AnimatePresence>
          {selectedPartner && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-5 lg:p-10"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-on-background/95 backdrop-blur-xl"
                onClick={() => setSelectedPartner(null)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 40 }}
                className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-surface-container-lowest shadow-ambient"
              >
                <button
                  onClick={() => setSelectedPartner(null)}
                  className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all duration-300 hover:bg-primary sm:right-6 sm:top-6 sm:p-4"
                >
                  <X size={24} />
                </button>

                <div className="relative h-[220px] w-full shrink-0 overflow-hidden bg-on-background sm:h-[280px] md:h-[340px] lg:h-[400px]">
                  <img
                    src={selectedPartner.coverImg ?? selectedPartner.logo}
                    alt="Partner Technical Backdrop"
                    className="w-full h-full object-cover opacity-60"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-on-background via-on-background/20 to-transparent"></div>
                  <div className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-6 p-5 sm:gap-8 sm:p-8 md:flex-row md:items-end md:gap-12 md:p-12 lg:p-16 xl:p-20">
                    <div className="max-w-2xl">
                      <div className="mb-5 flex items-center gap-4 sm:mb-6 sm:gap-5 md:mb-8 md:gap-6">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-4 shadow-ambient sm:h-24 sm:w-24 md:h-28 md:w-28 md:p-5">
                          <img src={selectedPartner.logo} className="max-h-full max-w-full object-contain" alt="Logo" decoding="async" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-extrabold uppercase italic tracking-tighter text-white sm:text-4xl lg:text-5xl xl:text-6xl">{selectedPartner.name}</h2>
                    </div>
                  </div>
                </div>

                <div className="grow overflow-y-auto p-5 sm:p-6 md:p-10 lg:p-12 xl:p-16">
                  <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
                    <div className="space-y-8 sm:space-y-10">
                      <div>
                        <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.5em] text-primary sm:mb-8">Executive Summary</h4>
                        <p className="text-base font-light leading-relaxed text-on-surface-variant sm:text-lg lg:text-xl">{selectedPartner.description}</p>
                      </div>
                      <div className="grid grid-cols-1 gap-6 border-t border-outline-variant/30 pt-6 sm:grid-cols-2 sm:gap-8 sm:pt-8 md:gap-10 md:pt-10">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface-variant/40 mb-3">Strategic Location</div>
                          <div className="text-sm font-bold uppercase text-on-surface">{selectedPartner.location}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface-variant/40 mb-3">Partnership Tenure</div>
                          <div className="text-sm font-bold uppercase text-on-surface">{selectedPartner.year}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 rounded-2xl bg-surface-container-low p-5 sm:space-y-8 sm:p-6 md:p-8 lg:space-y-10 lg:p-10 xl:p-12">
                      <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.5em] text-primary sm:mb-6">Verified Technical Scope</h4>
                      <ul className="space-y-4 sm:space-y-5 md:space-y-6">
                        {selectedPartner.scope.map((item: string, i: number) => (
                          <li key={i} className="flex items-start gap-5 group">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 group-hover:scale-150 transition-transform duration-500"></div>
                            <span className="text-sm text-on-surface-variant font-medium leading-relaxed group-hover:text-on-surface transition-colors">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default PartnersPage;
