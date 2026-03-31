import React, { useEffect } from 'react';
import { motion as m } from 'framer-motion';
import SEO from '../components/SEO';
import { termsOfUseSections } from '../content/legal';

const TermsOfServicePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-surface text-on-surface antialiased">
      <SEO
        title="Terms of Service | ADK Co., LTD."
        description="Standard terms and conditions for industrial service engagements with ADK Co., LTD."
        path="/terms-of-service"
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
              <span className="label-md mb-6 block uppercase tracking-[0.4em] text-primary sm:mb-8">Governance_Framework</span>
              <h1 className="mb-8 text-4xl font-extrabold uppercase italic leading-[0.9] tracking-tight sm:text-5xl md:mb-10 md:text-7xl xl:text-8xl">
                Terms <br /><span className="text-white/40 italic font-medium opacity-80">of Service</span>
              </h1>
              <p className="max-w-2xl border-l border-primary/40 pl-4 text-base font-light leading-relaxed text-white/90 sm:pl-6 sm:text-lg md:pl-8 lg:text-xl">
                Defining the regulatory and operational boundaries governing all professional engagements and technical consultancies with ADK Co., LTD.
              </p>
            </m.div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none">
            <div className="industrial-gradient w-full h-full"></div>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white py-16 sm:py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 xl:px-10">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 border-b border-outline-variant/20 pb-8 sm:mb-12 sm:pb-10"
            >
              <span className="mb-4 block text-[11px] font-black uppercase tracking-[0.3em] text-primary">Terms Of Use</span>
              <h2 className="mb-4 text-3xl font-black tracking-tight text-on-background sm:text-4xl">
                ADK Co., LTD. Website Terms Of Use
              </h2>
              <p className="max-w-3xl text-sm leading-7 text-on-surface-variant sm:text-base sm:leading-8">
                These Terms govern use of this website and its content, including general informational use, business inquiries, and related interactions. They are written for ADK&apos;s Saudi-facing website presence and should be read together with the Privacy Policy and any project-specific contract or commercial agreement.
              </p>
              <p className="mt-4 text-sm font-medium text-on-surface-variant/80">
                Last updated: March 28, 2026
              </p>
            </m.div>

            <div className="mb-10 rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 sm:mb-12 sm:p-8">
              <div className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-on-background">
                In These Terms
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {termsOfUseSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#terms-${section.id}`}
                    className="text-sm leading-6 text-on-surface-variant transition-colors hover:text-primary"
                  >
                    <span className="mr-2 font-bold text-primary">{section.id}.</span>
                    {section.title}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {termsOfUseSections.map((section, idx) => (
                <m.article
                  key={section.id}
                  id={`terms-${section.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.03 }}
                  className="border-b border-outline-variant/20 pb-8 last:border-b-0 last:pb-0"
                >
                  <div className="mb-3 text-[12px] font-black uppercase tracking-[0.22em] text-primary">
                    Section {section.id}
                  </div>
                  <h2 className="mb-5 text-2xl font-black tracking-tight text-on-background sm:text-[1.85rem]">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-7 text-on-surface-variant sm:text-[15px] sm:leading-8"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </m.article>
              ))}

              <div className="mt-2 rounded-xl bg-surface-container-low px-5 py-5 sm:px-6">
                <div className="mb-2 text-[11px] font-black uppercase tracking-[0.24em] text-on-background">
                  Important Note
                </div>
                <p className="text-sm leading-7 text-on-surface-variant">
                  These website terms should be reviewed by qualified Saudi legal counsel before final publication, especially if you want them to reflect a specific Saudi entity name, address, governing law clause, dispute forum, procurement language, or regulated industry requirements.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TermsOfServicePage;
