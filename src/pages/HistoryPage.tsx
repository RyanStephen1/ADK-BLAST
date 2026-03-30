import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SEO from '../components/SEO';
import { historyEngagements, historyHighlightedCompanies, historyMilestones } from '../content/history';
import { splitHighlightedText } from '../lib/text';
import type { HistoryEngagement } from '../types/content';

const milestonesPerPage = { desktop: 3, tablet: 2, mobile: 1 };

const HistoryPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedEngagement, setSelectedEngagement] = useState<HistoryEngagement | null>(null);
  const [itemsToShow, setItemsToShow] = useState(milestonesPerPage.desktop);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsToShow(milestonesPerPage.mobile);
      else if (window.innerWidth < 1024) setItemsToShow(milestonesPerPage.tablet);
      else setItemsToShow(milestonesPerPage.desktop);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (selectedEngagement) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedEngagement]);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + itemsToShow, historyMilestones.length - itemsToShow));
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - itemsToShow, 0));
  };

  const isAtEnd = currentIndex >= historyMilestones.length - itemsToShow;
  const isAtStart = currentIndex === 0;

  return (
    <div className="bg-surface text-on-surface antialiased">
      <SEO
        title="History & Legacy | ADK Co., LTD."
        description="Over 40 years of precision engineering excellence and trusted global partnerships."
        path="/history"
      />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-on-background pb-16 pt-28 text-white sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-40">
          <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 xl:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <span className="label-md mb-6 block text-primary sm:mb-8">Precision Since 1985</span>
              <h1 className="display-lg leading-[0.9] mb-12 uppercase italic">
                Our Legacy of <br /><span className="text-white/40 italic font-medium opacity-80">Precision Engineering</span>
              </h1>
              <p className="max-w-2xl border-l border-primary/40 pl-4 text-base font-light leading-relaxed text-white/90 sm:pl-6 sm:text-lg md:pl-8 lg:text-xl">
                Over 40 years of industrial engineering excellence, delivering technical sophistication and unyielding reliability to the world's most demanding sectors.
              </p>
            </motion.div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none">
            <div className="industrial-gradient w-full h-full"></div>
          </div>
        </section>

        {/* Strategic Milestones Carousel */}
        <section className="overflow-hidden bg-surface-container-low py-20 sm:py-24 md:py-32 xl:py-40">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 xl:px-10">
            <div className="mb-12 flex flex-col gap-8 sm:mb-16 md:flex-row md:items-end md:justify-between md:gap-12 xl:mb-24">
              <div className="max-w-xl">
                <span className="label-sm text-primary mb-4 block">Chronological Growth</span>
                <h2 className="text-3xl font-extrabold uppercase italic tracking-tight text-on-surface sm:text-4xl lg:text-5xl xl:text-6xl">Strategic <br />Milestones.</h2>
              </div>
              <div className="flex gap-2 self-start md:self-auto">
                <button
                  onClick={prevSlide}
                  disabled={isAtStart}
                  className={`flex h-12 w-12 items-center justify-center rounded-default border border-outline-variant transition-all sm:h-14 sm:w-14 md:h-16 md:w-16 ${isAtStart ? 'cursor-not-allowed opacity-20' : 'hover:bg-primary hover:text-white'}`}
                >
                  <span className="material-symbols-outlined">west</span>
                </button>
                <button
                  onClick={nextSlide}
                  disabled={isAtEnd}
                  className={`flex h-12 w-12 items-center justify-center rounded-default transition-all sm:h-14 sm:w-14 md:h-16 md:w-16 ${isAtEnd ? 'cursor-not-allowed bg-surface-container-highest text-on-surface/20' : 'bg-primary text-white hover:bg-primary-container'}`}
                >
                  <span className="material-symbols-outlined">east</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="flex gap-8 transition-all duration-700 ease-in-out">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
                  >
                    {historyMilestones.slice(currentIndex, currentIndex + itemsToShow).map((m, i) => (
                      <div key={i} className="flex flex-col h-full">
                        <div className="mb-4 text-4xl font-black leading-none sm:mb-5 sm:text-5xl" style={{ color: '#0047AB' }}>{m.year}</div>
                        <div className="grow rounded-default border-l-2 border-primary bg-surface-container-lowest p-6 shadow-ambient sm:p-8 md:p-10">
                          <span className="label-sm text-primary block mb-4">{m.label}</span>
                          <h4 className="mb-6 text-xl font-bold uppercase leading-tight text-on-surface">
                            {splitHighlightedText(m.title, historyHighlightedCompanies).map((part, partIdx) => (
                              <span
                                key={`${m.year}-${partIdx}`}
                                className={part.highlighted ? 'text-primary' : undefined}
                              >
                                {part.text}
                              </span>
                            ))}
                          </h4>
                          <p className="text-sm text-on-surface-variant leading-relaxed font-medium">{m.desc}</p>
                        </div>
                      </div>
                    ))}
                    {isAtEnd && (
                      <div className="flex flex-col h-full opacity-40">
                        <div className="mb-4 text-4xl font-black italic leading-none text-outline-variant sm:mb-5 sm:text-5xl">END</div>
                        <div className="flex grow flex-col items-center justify-center rounded-default border-l-2 border-outline-variant bg-surface-container-highest p-6 text-center sm:p-8 md:p-10">
                          <span className="label-sm text-on-surface-variant mb-2">Record Terminal</span>
                          <p className="text-xs uppercase tracking-[0.2em]">End of Strategic Timeline</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-3 sm:mt-14 md:mt-16 lg:mt-20">
              <div className="h-1 bg-outline-variant grow relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-primary"
                  animate={{ width: `${((currentIndex + itemsToShow) / historyMilestones.length) * 100}%` }}
                />
              </div>
              <span className="label-sm text-on-surface/30">History Registry: {currentIndex + 1} - {Math.min(currentIndex + itemsToShow, historyMilestones.length)} / {historyMilestones.length}</span>
            </div>
          </div>
        </section>

        {/* Currently Working With */}
        <section className="relative overflow-hidden bg-[#dbe7ff] py-20 sm:py-24 md:py-32 xl:py-40">
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(177,197,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(177,197,255,0.16) 1px, transparent 1px)',
              backgroundSize: '96px 96px'
            }}
          />
          <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-primary/16 to-transparent pointer-events-none"></div>
          <div className="absolute -left-24 bottom-16 h-64 w-64 rounded-full bg-primary/14 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 xl:px-10">
            <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
              <div className="space-y-6 sm:space-y-8 lg:col-span-5">
                <span className="block text-[11px] font-black uppercase tracking-[0.3em] text-primary">Currently Working With:</span>
                <h2 className="text-3xl font-extrabold uppercase italic tracking-tight leading-[0.92] text-on-background sm:text-4xl lg:text-5xl xl:text-6xl">
                  Active Global <br />
                  <span className="text-primary/45">Engagements.</span>
                </h2>
                <p className="body-lg max-w-xl border-l-2 border-primary/30 pl-5 font-light leading-relaxed text-on-surface-variant sm:pl-8">
                  Our legacy is reinforced through active technical engagements with tier-1 industrial partners, combining cross-border compliance, marine precision, and operational reliability.
                </p>

                <div className="space-y-4 sm:space-y-5">
                  {historyEngagements.map((engagement) => (
                    <button
                      key={engagement.name}
                      type="button"
                      onClick={() => setSelectedEngagement(engagement)}
                      className="relative w-full overflow-hidden rounded-2xl bg-[rgba(255,255,255,0.74)] px-6 py-6 text-left shadow-ambient transition-transform duration-300 hover:-translate-y-1 sm:px-8 sm:py-7 md:px-10 md:py-8"
                    >
                      <div className="absolute left-0 top-0 h-full w-1.5 bg-primary/80"></div>
                      <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
                        <div className="shrink-0 rounded-sm bg-primary/12 p-3 text-primary sm:p-4">
                          <engagement.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-base font-black uppercase italic tracking-wide text-on-background">{engagement.name}</h4>
                          <p className="text-sm leading-7 text-on-surface-variant">{engagement.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-[rgba(255,255,255,0.88)] p-4 shadow-[0_28px_90px_rgba(10,17,40,0.12)] sm:p-5 md:p-6 lg:p-7 xl:p-8">
                  <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(177,197,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(177,197,255,0.18) 1px, transparent 1px)',
                      backgroundSize: '80px 80px'
                    }}
                  />

                  <div className="relative z-10 space-y-5 sm:space-y-6">
                    {[
                      { src: historyEngagements[0].logo, alt: 'IMI' },
                      { src: historyEngagements[1].logo, alt: 'Siemens' },
                      { src: historyEngagements[2].logo, alt: '1590 Energy' }
                    ].map((partner, i) => (
                      <button
                        type="button"
                        onClick={() => setSelectedEngagement(historyEngagements[i])}
                        key={partner.alt}
                        className="group w-full rounded-2xl border border-white/60 bg-[rgba(232,240,255,0.96)] px-6 py-5 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-white sm:px-8 sm:py-6 md:px-10 md:py-7"
                      >
                        <div className="flex w-full items-center justify-center h-16 sm:h-20 md:h-24">
                          <img
                            src={partner.src}
                            alt={partner.alt}
                            className="max-h-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AnimatePresence>
          {selectedEngagement && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 lg:p-10"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-on-background/90 backdrop-blur-md"
                onClick={() => setSelectedEngagement(null)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 24 }}
                className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-surface-container-lowest shadow-ambient"
              >
                <button
                  type="button"
                  onClick={() => setSelectedEngagement(null)}
                  className="absolute right-4 top-4 z-20 rounded-full bg-on-background/10 p-3 text-on-background transition-colors hover:bg-on-background/20 sm:right-6 sm:top-6"
                >
                  <X size={20} />
                </button>

                <div className="border-b border-outline-variant/20 bg-[rgba(232,240,255,0.9)] p-6 sm:p-8 md:p-10">
                  <div className="mb-6 flex h-16 sm:h-20 items-center justify-start">
                    <img
                      src={selectedEngagement.logo}
                      alt={selectedEngagement.shortName}
                      className="max-h-full max-w-[200px] sm:max-w-[260px] w-auto object-contain"
                      decoding="async"
                    />
                  </div>
                  <div className="mb-3 text-[11px] font-black uppercase tracking-[0.3em] text-primary">Currently Working With</div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tight text-on-background sm:text-3xl">
                    {selectedEngagement.name}
                  </h3>
                </div>

                <div className="space-y-8 p-6 sm:p-8 md:p-10">
                  <div>
                    <div className="mb-3 text-[11px] font-black uppercase tracking-[0.3em] text-primary">Summary</div>
                    <p className="text-base leading-8 text-on-surface-variant">{selectedEngagement.desc}</p>
                  </div>

                  <div>
                    <div className="mb-3 text-[11px] font-black uppercase tracking-[0.3em] text-primary">Sector</div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-on-background">{selectedEngagement.sector}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Banner */}
        <section className="industrial-gradient py-24 text-center">
          <div className="max-w-4xl mx-auto px-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 uppercase italic tracking-tighter">A Legacy Built Across Continents</h2>
            <p className="text-white/60 label-sm">4 Strategic Hubs • 40 Years • Infinite Precision</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HistoryPage;