import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Shield, X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import SEO from '../components/SEO';

const certificateAssetBase = `${import.meta.env.BASE_URL}assets/certifications`;
const scannedDocumentStyle: CSSProperties & { WebkitOptimizeContrast?: 'initial' } = {
  imageRendering: 'auto',
  WebkitOptimizeContrast: 'initial',
};

const CertificationsPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex]);

  const documents = [
    { id: 1, title: "ISO 9001:2015", type: "Certification", img: `${certificateAssetBase}/iso-9001-2015-v2.webp` },
    { id: 2, title: "ISO 45001:2018", type: "Certification", img: `${certificateAssetBase}/iso-45001-2018-v2.webp` },
    { id: 3, title: "Investment License", type: "License", img: `${certificateAssetBase}/investment-license-v2.webp` },
    { id: 4, title: "Company Registration", type: "Registration", img: `${certificateAssetBase}/company-registration-v2.webp` },
    { id: 5, title: "Company Registration (Secondary)", type: "Registration", img: `${certificateAssetBase}/company-registration-secondary-v2.webp` },
    { id: 6, title: "Chamber of Commerce", type: "Certificate", img: `${certificateAssetBase}/chamber-of-commerce-v2.webp` },
    { id: 7, title: "GOSI Certificate", type: "Compliance", img: `${certificateAssetBase}/gosi-certificate-v2.webp` },
    { id: 8, title: "Saudi VAT Registration", type: "Tax Certificate", img: `${certificateAssetBase}/saudi-vat-registration-v2.webp` },
    { id: 9, title: "Saudization Certificate", type: "Compliance", img: `${certificateAssetBase}/saudization-certificate-v2.webp` },
  ];

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % documents.length);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, [selectedIndex, documents.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + documents.length) % documents.length);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, [selectedIndex, documents.length]);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => {
    const newScale = Math.max(scale - 0.5, 1);
    if (newScale === 1) setOffset({ x: 0, y: 0 });
    setScale(newScale);
  }

  const closeLightbox = () => {
    setSelectedIndex(null);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    const newScale = Math.min(Math.max(scale + delta, 1), 5);

    if (newScale === scale) return;

    if (newScale === 1) {
      setOffset({ x: 0, y: 0 });
      setScale(1);
      return;
    }

    requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      const zoomFactor = newScale / scale;

      setOffset({
        x: offset.x - (mouseX - offset.x) * (zoomFactor - 1),
        y: offset.y - (mouseY - offset.y) * (zoomFactor - 1)
      });
      setScale(newScale);
    });
  };

  return (
    <div className="bg-surface text-on-surface antialiased">
      <SEO
        title="Certifications & Licenses in Jubail, KSA | ADK Co., LTD."
        description="Official licenses, company registrations, and international ISO certifications supporting high-standard industrial delivery and services in Jubail, KSA."
        keywords="industrial certifications Jubail, ISO certifications KSA, engineering licenses Saudi Arabia, ADK Co. LTD certifications"
        path="/certifications"
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
              <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.5em] text-primary sm:mb-8">Official Credentials</span>
              <h1 className="mb-8 text-4xl font-extrabold uppercase italic leading-[0.9] tracking-tight sm:text-5xl md:mb-10 md:text-7xl xl:text-8xl">
                Licenses & <br /><span className="text-white/40">Standards.</span>
              </h1>
              <p className="max-w-2xl border-l border-white/20 pl-4 text-base font-light leading-relaxed text-white/50 sm:pl-6 sm:text-lg md:pl-8 lg:text-xl">
                Strict adherence to international ISO protocols and regional regulatory frameworks ensures mission-critical reliability.
              </p>
            </m.div>
          </div>
          <div className="absolute top-0 right-0 h-full w-1/3 opacity-5 pointer-events-none">
            <div className="industrial-gradient w-full h-full rotate-180"></div>
          </div>
        </section>

        {/* Documentation Grid */}
        <section className="bg-white py-20 sm:py-24 md:py-32 xl:py-40">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 xl:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5 border border-black/5">
              {documents.map((doc, idx) => (
                <div
                  key={doc.id}
                  className="flex min-h-[360px] flex-col justify-between border-b border-r border-black/5 bg-white p-5 sm:min-h-[420px] sm:p-6 md:p-8 lg:min-h-[500px] lg:p-10"
                >
                  <div className="group flex flex-1 items-center justify-center overflow-hidden bg-surface-container-lowest p-4 sm:p-6 md:p-8">
                    <img
                      src={doc.img}
                      alt={doc.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                      style={{ imageRendering: 'auto' }}
                    />
                  </div>

                  <div className="mt-6 sm:mt-8 md:mt-10">
                    <span className="text-primary font-bold uppercase text-[9px] tracking-[0.3em] block mb-4">{doc.type}</span>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <h3 className="text-xl font-extrabold uppercase italic leading-none tracking-tighter text-on-background sm:text-2xl">{doc.title}</h3>
                      <button onClick={() => setSelectedIndex(idx)} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">
                        <Maximize2 className="w-5 h-5" /> View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Banner */}
        <section className="relative overflow-hidden bg-on-background py-20 sm:py-24 md:py-32">
          <div className="relative z-10 mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-10 px-4 sm:px-6 md:flex-row md:gap-12 md:px-8 xl:gap-16 xl:px-10">
            <div className="max-w-2xl text-center md:text-left">
              <h3 className="mb-6 text-3xl font-extrabold uppercase italic tracking-tighter text-white sm:text-4xl md:mb-8">Mission Critical <br /><span className="text-primary">Compliance</span></h3>
              <p className="mb-8 border-l-2 border-primary/20 pl-5 text-base font-light leading-relaxed text-white/40 sm:mb-10 sm:pl-6 sm:text-lg md:mb-12 md:pl-8">
                Operating with absolute transparency and rigorous adherence to Middle Eastern commercial requirements and global engineering safety codes.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {["ISO 9001:2015", "ISO 45001:2018", "MISA Licensed", "VAT Registered"].map((tag, i) => (
                  <span key={i} className="text-[9px] font-bold uppercase tracking-[0.3em] px-6 py-3 border border-white/10 text-white/60">{tag}</span>
                ))}
              </div>
            </div>
            <div className="shrink-0">
              <Shield size={140} className="text-primary/10 sm:h-[160px] sm:w-[160px] md:h-[180px] md:w-[180px]" strokeWidth={1} />
            </div>
          </div>
        </section>
      </main>

      {/* Advanced Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 bg-on-background/98 backdrop-blur-2xl flex flex-col"
            onWheel={handleWheel}
          >
            <div className="flex flex-col gap-4 border-b border-white/5 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6 md:p-8">
              <div className="flex flex-col">
                <span className="text-primary font-bold uppercase text-[10px] tracking-[0.4em] mb-2">{documents[selectedIndex].type}</span>
                <h4 className="text-xl font-bold text-white uppercase italic tracking-tighter">{documents[selectedIndex].title}</h4>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-8">
                <div className="hidden lg:flex items-center gap-4 text-white/30 text-[9px] font-bold tracking-widest uppercase">
                  <span>Scroll to Zoom</span>
                  <span className="mx-2">•</span>
                  <span>Drag to Pan</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl">
                  <button onClick={handleZoomOut} className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"><ZoomOut size={18} /></button>
                  <span className="text-xs font-mono text-white/40 w-12 text-center">{Math.round(scale * 100)}%</span>
                  <button onClick={handleZoomIn} className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"><ZoomIn size={18} /></button>
                </div>
                <button onClick={closeLightbox} className="p-4 hover:bg-red-500/20 text-white transition-all rounded-full border border-white/10"><X /></button>
              </div>
            </div>

            <div className="flex-1 relative overflow-hidden" ref={containerRef}>
              <div className="absolute inset-0 flex cursor-grab items-center justify-center p-4 active:cursor-grabbing sm:p-6 md:p-10 lg:p-20">
                <button
                  onClick={handlePrev}
                  className="absolute left-3 z-30 rounded-full border border-white/10 bg-on-background/40 p-3 text-white backdrop-blur-md transition-all hover:bg-primary sm:left-5 sm:p-4 md:left-8 md:p-6"
                >
                  <ChevronLeft />
                </button>

                <div className="w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
                  <m.img
                    key={selectedIndex}
                    src={documents[selectedIndex].img}
                    drag={scale > 1}
                    dragElastic={0}
                    dragMomentum={false}
                    onDragStart={(e) => e.preventDefault()}
                    onDragEnd={(_e, info) => {
                      setOffset({
                        x: offset.x + info.offset.x,
                        y: offset.y + info.offset.y
                      });
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: 1,
                      scale,
                      x: offset.x,
                      y: offset.y
                    }}
                    className="max-h-full max-w-full object-contain shadow-2xl pointer-events-auto select-none"
                    alt="Document"
                    decoding="async"
                    style={scannedDocumentStyle}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </div>

                <button
                  onClick={handleNext}
                  className="absolute right-3 z-30 rounded-full border border-white/10 bg-on-background/40 p-3 text-white backdrop-blur-md transition-all hover:bg-primary sm:right-5 sm:p-4 md:right-8 md:p-6"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>

            <div className="relative z-30 border-t border-white/5 bg-on-background/90 p-4 text-center backdrop-blur-xl sm:p-6 md:p-8">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">{selectedIndex + 1} of {documents.length} verified credentials</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertificationsPage;
