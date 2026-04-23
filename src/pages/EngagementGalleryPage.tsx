import { useEffect, useRef, useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react';
import SEO from '../components/SEO';
import { historyGalleryEntries } from '../content/historyGalleries';

const EngagementGalleryPage = () => {
  const { engagementId } = useParams<{ engagementId: string }>();
  const engagement = historyGalleryEntries.find((item) => item.id === engagementId);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedScope, setSelectedScope] = useState('');
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const hasScopes = (engagement?.scopes.length ?? 0) > 0;
  const filteredImages = !engagement
    ? []
    : selectedScope === 'all'
      ? engagement.images
      : selectedScope
        ? engagement.images.filter((image) => image.scopeId === selectedScope)
        : [];
  const filteredImageCount = filteredImages.length;

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

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null || filteredImageCount === 0) return;
    setSelectedIndex((selectedIndex + 1) % filteredImageCount);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null || filteredImageCount === 0) return;
    setSelectedIndex((selectedIndex - 1 + filteredImageCount) % filteredImageCount);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.5, 4));

  const handleZoomOut = () => {
    const newScale = Math.max(scale - 0.5, 1);
    if (newScale === 1) setOffset({ x: 0, y: 0 });
    setScale(newScale);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight' && filteredImageCount > 0) {
        setSelectedIndex((selectedIndex + 1) % filteredImageCount);
        setScale(1);
        setOffset({ x: 0, y: 0 });
      }
      if (e.key === 'ArrowLeft' && filteredImageCount > 0) {
        setSelectedIndex((selectedIndex - 1 + filteredImageCount) % filteredImageCount);
        setScale(1);
        setOffset({ x: 0, y: 0 });
      }
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredImageCount, selectedIndex]);

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
        y: offset.y - (mouseY - offset.y) * (zoomFactor - 1),
      });
      setScale(newScale);
    });
  };

  if (!engagement) {
    return <Navigate to="/history" replace />;
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased">
      <SEO
        title={`${engagement.shortName} Project Gallery | ADK Co., LTD. Jubail, KSA`}
        description={`Project gallery for ${engagement.name}. Industrial engineering services and projects in Jubail, KSA.`}
        keywords="industrial projects Jubail, engineering gallery KSA, ADK projects Saudi Arabia"
        path={engagement.galleryPath}
      />

      <main>
        <section className="relative overflow-hidden bg-on-background pb-16 pt-28 text-white sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-40">
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none">
            <div className="industrial-gradient h-full w-full" />
          </div>

          <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 xl:px-10">
            <Link
              to="/history#active-engagements"
              className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-accent transition-colors hover:text-white sm:mb-10"
            >
              <ArrowLeft size={16} />
              <span>Back to history</span>
            </Link>

            <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <span className="mb-6 block text-[11px] font-black uppercase tracking-[0.34em] text-accent">
                  Active Global Engagement
                </span>
                <h1 className="max-w-4xl text-4xl font-extrabold uppercase italic leading-[0.9] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                  {engagement.name}
                </h1>
                <p className="mt-8 max-w-2xl border-l border-primary/40 pl-5 text-base font-light leading-relaxed text-white/85 sm:pl-6 sm:text-lg">
                  {engagement.galleryIntro}
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="flex min-h-[180px] items-center justify-center rounded-[1.75rem] border border-white/70 bg-white p-8 shadow-[0_24px_80px_rgba(10,17,40,0.18)] sm:min-h-[220px] sm:p-10">
                  <img
                    src={engagement.logo}
                    alt={engagement.shortName}
                    className="max-h-24 w-auto max-w-full object-contain sm:max-h-28 md:max-h-32"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            {engagement.scopes.length > 0 && (
              <div className="mt-10 border-t border-white/10 pt-8 sm:mt-12 sm:pt-10">
                <div className="mb-4 text-[10px] font-black uppercase tracking-[0.32em] text-accent/80">
                  Available Scope
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {engagement.scopes.map((scope, index) => {
                    const isActive = selectedScope === scope.id;
                    const itemNumber = String(index + 1).padStart(2, '0');

                    return (
                      <button
                        key={scope.id}
                        type="button"
                        onClick={() => {
                          setSelectedScope(isActive ? '' : scope.id);
                          setSelectedIndex(null);
                        }}
                        className={`rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                          isActive
                            ? 'border-accent bg-white text-on-background shadow-[0_20px_60px_rgba(0,0,0,0.18)]'
                            : 'border-white/12 bg-white/6 text-white hover:border-white/24 hover:bg-white/10'
                        }`}
                      >
                        <div className="mb-3 flex items-center justify-between gap-4">
                          <span className={`text-[10px] font-black uppercase tracking-[0.28em] ${isActive ? 'text-primary' : 'text-accent'}`}>
                            {itemNumber}
                          </span>
                          <span className={`h-2.5 w-2.5 rounded-full ${isActive ? 'bg-primary' : 'bg-white/30'}`} />
                        </div>
                        <div className={`text-base font-semibold leading-snug sm:text-lg ${isActive ? 'text-on-background' : 'text-white'}`}>
                          {scope.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#dbe7ff] py-16 sm:py-20 md:py-24 xl:py-32">
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(177,197,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(177,197,255,0.16) 1px, transparent 1px)',
              backgroundSize: '96px 96px'
            }}
          />

          <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 xl:px-10">
            <div className="mb-10 space-y-6 sm:mb-12 sm:space-y-8">
              <div>
                <span className="mb-4 block text-[11px] font-black uppercase tracking-[0.3em] text-primary">
                  Gallery
                </span>
                <h2 className="text-3xl font-extrabold uppercase italic tracking-tight text-on-background sm:text-4xl lg:text-5xl">
                  {selectedScope
                    ? `${engagement.scopes.find((scope) => scope.id === selectedScope)?.label ?? 'Selected Scope'} image archive.`
                    : engagement.images.length > 0
                      ? 'Project image archive.'
                      : 'Project gallery ready for uploads.'}
                </h2>
                {hasScopes && (
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant sm:text-base">
                    {selectedScope
                      ? 'Showing images only for the selected work scope.'
                      : 'Select a work scope from the engagement header above to view the related project images.'}
                  </p>
                )}
              </div>
            </div>

            {filteredImages.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredImages.map((image, index) => (
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    key={image.filePath}
                    className="group overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/80 text-left shadow-ambient transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-surface-container-lowest">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="flex items-center justify-between border-t border-outline-variant/10 px-5 py-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-on-surface-variant">
                        Image {index + 1}
                      </span>
                      <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                        <Maximize2 size={15} />
                        View
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : hasScopes && !selectedScope ? (
              <div className="rounded-[1.75rem] border border-white/60 bg-white/80 p-8 shadow-ambient sm:p-10 md:p-12">
                <div className="rounded-[1.5rem] border border-dashed border-primary/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(226,236,255,0.95))] px-6 py-16 text-center sm:px-10">
                  <div className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-primary">Select A Scope</div>
                  <p className="mx-auto max-w-2xl text-sm leading-7 text-on-surface-variant sm:text-base">
                    Choose a scope from the dropdown to view the related project images for {engagement.shortName}.
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-[1.75rem] border border-white/60 bg-white/80 p-8 shadow-ambient sm:p-10 md:p-12">
                <div className="rounded-[1.5rem] border border-dashed border-primary/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(226,236,255,0.95))] px-6 py-16 text-center sm:px-10">
                  <div className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-primary">
                    {selectedScope === 'all' ? 'No Images Yet' : 'No Images For This Scope'}
                  </div>

                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end sm:mt-10">
              <Link
                to="/history#active-engagements"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-primary shadow-ambient transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Return to active engagements</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedIndex !== null && filteredImages[selectedIndex] && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 flex flex-col bg-on-background/98 backdrop-blur-2xl"
            onWheel={handleWheel}
          >
            <div className="flex flex-col gap-4 border-b border-white/5 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6 md:p-8">
              <div className="flex flex-col">
                <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
                  {engagement.shortName} Gallery
                </span>
                <h4 className="text-xl font-bold uppercase italic tracking-tighter text-white">
                  {filteredImages[selectedIndex].alt}
                </h4>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-8">
                <div className="hidden items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-white/30 lg:flex">
                  <span>Scroll to Zoom</span>
                  <span className="mx-2">•</span>
                  <span>Drag to Pan</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2">
                  <button onClick={handleZoomOut} className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white">
                    <ZoomOut size={18} />
                  </button>
                  <span className="w-12 text-center font-mono text-xs text-white/40">{Math.round(scale * 100)}%</span>
                  <button onClick={handleZoomIn} className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white">
                    <ZoomIn size={18} />
                  </button>
                </div>
                <button onClick={closeLightbox} className="rounded-full border border-white/10 p-4 text-white transition-all hover:bg-red-500/20">
                  <X />
                </button>
              </div>
            </div>

            <div className="relative flex-1 overflow-hidden" ref={containerRef}>
              <div className="absolute inset-0 flex cursor-grab items-center justify-center p-4 active:cursor-grabbing sm:p-6 md:p-10 lg:p-20">
                <button
                  onClick={handlePrev}
                  className="absolute left-3 z-30 rounded-full border border-white/10 bg-on-background/40 p-3 text-white backdrop-blur-md transition-all hover:bg-primary sm:left-5 sm:p-4 md:left-8 md:p-6"
                >
                  <ChevronLeft />
                </button>

                <div className="flex h-full w-full items-center justify-center overflow-hidden pointer-events-none">
                  <m.img
                    key={filteredImages[selectedIndex].filePath}
                    src={filteredImages[selectedIndex].src}
                    drag={scale > 1}
                    dragElastic={0}
                    dragMomentum={false}
                    onDragStart={(e) => e.preventDefault()}
                    onDragEnd={(_e, info) => {
                      setOffset({
                        x: offset.x + info.offset.x,
                        y: offset.y + info.offset.y,
                      });
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: 1,
                      scale,
                      x: offset.x,
                      y: offset.y,
                    }}
                    className="pointer-events-auto max-h-full max-w-full select-none object-contain shadow-2xl"
                    alt={filteredImages[selectedIndex].alt}
                    decoding="async"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
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
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
                {selectedIndex + 1} of {filteredImageCount} gallery images
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EngagementGalleryPage;
