import React, { useState, useRef, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, Paperclip, Globe, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import ResponsiveImage from '../components/ResponsiveImage';
import { homeCompetencies, homeHeroBackgrounds, homePartnerLogos, homeValues } from '../content/home';
import {
  defaultContactService,
  defaultSpecialization,
  getSpecializationOptions,
  normalizeServiceQuery,
  resolveSpecialization,
} from '../lib/contact';

const HomePage: React.FC = () => {
  const location = useLocation();
  const honeypotRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % homeHeroBackgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const [contactForm, setContactForm] = useState<{
    name: string;
    email: string;
    service: string;
    specialization: string;
    message: string;
    file: File | null;
    consent: boolean;
  }>(() => {
    if (typeof window === 'undefined') {
      return { name: '', email: '', service: defaultContactService, specialization: defaultSpecialization, message: '', file: null, consent: false };
    }

    const params = new URLSearchParams(window.location.search);
    const requestedService = params.get('service');
    const normalizedService = requestedService ? normalizeServiceQuery(requestedService) : defaultContactService;
    const requestedSpecialization = params.get('specialization');

    return {
      name: '',
      email: '',
      service: normalizedService,
      specialization: requestedSpecialization ? resolveSpecialization(normalizedService, requestedSpecialization) : defaultSpecialization,
      message: '',
      file: null,
      consent: false,
    };
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(() => {
    if (typeof window === 'undefined') {
      return 'idle';
    }

    return new URLSearchParams(window.location.search).get('success') === 'true' ? 'success' : 'idle';
  });
  const [fileError, setFileError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const successParam = params.get('success');    if (successParam === 'true') {
      window.history.replaceState({}, '', import.meta.env.BASE_URL);
    }

    if (location.hash === '#contact') {
      const scrollTimer = setTimeout(() => {
        requestAnimationFrame(() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            const y = contactSection.getBoundingClientRect().top + window.scrollY - 120;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        });
      }, 100);
      return () => clearTimeout(scrollTimer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    if (formStatus === 'error') {
      setFormStatus('idle');
    }
    if (errorMessage) {
      setErrorMessage('');
    }
    setContactForm(prev => ({
      ...prev,
      [name]: val,
      ...(name === 'service' ? { specialization: defaultSpecialization } : {})
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (formStatus === 'error') {
      setFormStatus('idle');
    }
    if (errorMessage) {
      setErrorMessage('');
    }
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setFileError('File size must be under 10MB');
        setContactForm(prev => ({ ...prev, file: null }));
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setFileError('');
        setContactForm(prev => ({ ...prev, file: selectedFile }));
      }
    }
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (fileError) {
      e.preventDefault();
      setFormStatus('error');
      setErrorMessage('Attachment must be under 10MB before submitting.');
      return;
    }

    if (honeypotRef.current && honeypotRef.current.value) {
      e.preventDefault();
      setFormStatus('success');
      return;
    }

    setFormStatus('loading');
    setErrorMessage('');
  };

  const specializationOptions = getSpecializationOptions(contactForm.service);

  return (
    <div className="bg-surface text-on-surface antialiased">
      <SEO
        title="ADK Co., LTD | Industrial Precision & Engineering Excellence"
        description="Global industrial services provider specializing in precision engineering, infrastructure maintenance, and maritime excellence since 1985."
        path="/"
      />

      <main>
        {/* Hero Section */}
        <section
          className="relative flex h-[100svh] min-h-[700px] items-center overflow-hidden bg-[#0A1128] lg:min-h-[780px]"
          aria-label="Hero"
          style={{ contain: 'layout style' }}
        >
          <div className="absolute inset-0 z-0" style={{ contain: 'strict layout size' }}>
            <AnimatePresence initial={false}>
              <m.img
                key={bgIndex}
                src={homeHeroBackgrounds[bgIndex].src}
                srcSet={homeHeroBackgrounds[bgIndex].srcSet}
                sizes="100vw"
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                fetchPriority={bgIndex === 0 ? 'high' : 'low'}
                loading={bgIndex === 0 ? 'eager' : 'lazy'}
                decoding="async"
                width={1346}
                height={757}
                style={{
                  contain: 'layout strict',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  position: 'absolute',
                  inset: 0
                }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-on-background/60" aria-hidden="true" style={{ contain: 'layout' }}></div>
          </div>
          <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 pt-24 sm:px-6 sm:pt-28 md:px-8 lg:pt-20 xl:px-10">
            <div className="max-w-4xl">
              <m.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mb-8 flex flex-wrap items-center gap-3 sm:mb-10 sm:gap-4"
              >
                <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest text-white/30 sm:gap-4 sm:text-[10px]">
                  <AnimatePresence mode="wait">
                    <m.span
                      key={bgIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-primary font-bold"
                    >
                      {(bgIndex + 1).toString().padStart(2, '0')}
                    </m.span>
                  </AnimatePresence>
                  <span>/</span>
                  <span>{homeHeroBackgrounds.length.toString().padStart(2, '0')}</span>
                </div>
                <span className="h-px w-10 bg-primary/30 sm:w-12" aria-hidden="true"></span>
                <span className="label-md text-on-primary/60">Engineering Excellence since 1985</span>
              </m.div>
              <m.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mb-8 max-w-3xl text-5xl font-black uppercase italic leading-[0.9] tracking-tight text-white sm:text-6xl md:mb-10 md:text-7xl xl:text-8xl"
              >
                Industrial Precision. <br /><span className="text-white/40">Global Trust.</span>
              </m.h1>
              <m.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-10 max-w-2xl border-l border-white/40 pl-4 text-base font-light leading-relaxed text-white/90 sm:pl-6 sm:text-lg md:mb-14 md:pl-8 lg:text-xl"
              >
                Defining the standard of reliability in maritime and heavy industrial sectors through architectural precision and engineering foresight.
              </m.p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link to="/services" className="inline-flex min-h-12 items-center justify-center bg-primary px-6 py-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-on-primary transition-all hover:bg-primary hover:text-white sm:px-10 md:px-12 md:py-5">Our Capabilities</Link>
                <Link to="/history" className="inline-flex min-h-12 items-center justify-center bg-white/10 px-6 py-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-primary hover:text-white sm:px-10 md:px-12 md:py-5">Our Journey</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-on-background py-14 sm:py-16 md:py-20">
          <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 px-4 text-center uppercase tracking-[0.2em] sm:grid-cols-3 sm:gap-10 sm:px-6 md:px-8 md:text-left xl:px-10">
            <div>
              <div className="text-4xl font-extrabold text-white mb-2">40<span className="text-primary">+</span></div>
              <div className="text-[9px] font-bold text-white/70">Years of Leadership</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white mb-2">350<span className="text-primary">+</span></div>
              <div className="text-[9px] font-bold text-white/70">Completed Projects</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white mb-2">100<span className="text-primary">%</span></div>
              <div className="text-[9px] font-bold text-white/70">Safety Record</div>
            </div>
          </div>
        </section>

        {/* About ADK Section (V2) - Redesigned to Industrial Architect Specs */}
        <section className="relative overflow-hidden bg-surface-container-low py-20 sm:py-24 md:py-32 xl:py-40">
          {/* Schematic Grid Background Accent */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(#0047AB 1px, transparent 1px), linear-gradient(90deg, #0047AB 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
          </div>

          <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 xl:px-10">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">

              {/* Left Column: Editorial Authority (Span 5) */}
              <div className="space-y-10 lg:col-span-5">
                <div className="space-y-6 sm:space-y-8">
                  <div className="inline-flex items-center px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-sm">
                    <span className="label-sm font-black">EST. 1985 / BUSAN KOREA</span>
                  </div>

                  <h2 className="text-4xl font-black uppercase italic leading-[0.9] tracking-tighter text-on-background sm:text-5xl lg:text-6xl xl:text-7xl">
                    Forty Years of <br />
                    <span className="text-primary">Industrial</span> <br />
                    Precision.
                  </h2>

                  <p className="body-lg max-w-md border-l-2 border-primary pl-5 leading-relaxed text-on-surface-variant sm:pl-8">
                    ADK Co., LTD. has redefined the standards of global marine engineering through four decades of rigorous technical advancement and field-tested reliability.
                  </p>
                </div>

                {/* Technical Data Points */}
                <div className="grid grid-cols-1 gap-8 border-t border-outline-variant/20 pt-8 sm:grid-cols-2 sm:gap-10">
                  <div className="space-y-4">
                    <div className="label-md text-primary opacity-60">Global Reach</div>
                    <div className="space-y-1">
                      <div className="text-3xl font-black text-on-background tracking-tighter">13+</div>
                      <div className="label-sm text-on-surface-variant font-medium">Nations Reached For Projects</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="label-md text-primary opacity-60">Infrastructure</div>
                    <div className="space-y-1">
                      <div className="text-3xl font-black tracking-tighter text-on-background">50K SQM</div>
                      <div className="label-sm text-on-surface-variant font-medium">Fabrication Capacity</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Tonal Layering & Glass (Span 7) */}
              <div className="lg:col-span-7 relative">
                {/* Level 1: Subtle Offset Base */}
                <div className="absolute -left-6 -top-6 h-32 w-32 rounded-md bg-primary/5 -z-10 sm:-left-12 sm:-top-12 sm:h-64 sm:w-64"></div>

                {/* Level 2: The Primary Showcase Card (surface-container-lowest) */}
                <div className="group relative overflow-hidden rounded-md bg-surface-container-lowest p-6 shadow-ambient sm:p-8 md:p-12 xl:p-16">
                  {/* Decorative Industrial Detail */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rotate-45 transition-transform group-hover:scale-110 duration-700"></div>

                  <div className="relative z-10 space-y-8 sm:space-y-10">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-primary-container text-on-primary-container sm:h-16 sm:w-16">
                        <Globe size={32} strokeWidth={1} />
                      </div>
                      <div className="h-px flex-1 bg-outline-variant/30"></div>
                    </div>

                    <div className="space-y-5 sm:space-y-6">
                      <h3 className="text-2xl font-bold leading-tight tracking-tight text-on-surface sm:text-3xl md:text-4xl">
                        A Global Cornerstone in <br />
                        <span className="text-primary italic">Marine/Oil & Gas Engineering</span>
                      </h3>

                      <div className="grid grid-cols-1 gap-5 text-sm leading-relaxed text-on-surface-variant md:grid-cols-2 md:gap-8">
                        <p>
                          Our specialized shipyard operations and surface treatment solutions are built on the rigorous standards required for massive-scale maritime infrastructure.
                        </p>
                        <p>
                          Strategically located in South Korea, Saudi Arabia, and the Philippines, ADK delivers rapid-response industrial solutions worldwide.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:gap-4 sm:pt-4">
                      <Link
                        to="/services"
                        className="inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-6 py-3 text-center font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-primary-container sm:px-8 sm:py-4"
                      >
                        Technical Services
                      </Link>
                      <Link
                        to="/#contact"
                        className="inline-flex min-h-11 items-center justify-center rounded-sm bg-secondary-container px-6 py-3 text-center text-on-secondary-container transition-all hover:-translate-y-1 hover:bg-on-background hover:text-white sm:px-8 sm:py-4"
                      >
                        Get a Quote
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Level 3: Floating Glass Stat (Glassmorphism Rule) */}
                <div className="glass-nav absolute hidden rounded-md border border-white/20 p-6 shadow-2xl md:block md:-bottom-6 md:right-4 lg:-bottom-12 lg:-right-4 xl:-bottom-6 xl:right-12 max-w-[220px] xl:max-w-[240px] xl:p-8">
                  <div className="space-y-4">
                    <div className="w-10 h-1 bg-accent"></div>
                    <div className="text-4xl font-black text-on-background tracking-tighter italic">40+</div>
                    <div className="label-sm text-primary leading-tight">Years of verified engineering excellence</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Competencies Section - Refined for Uniformity and Clarity */}
        <section className="relative overflow-hidden bg-white py-20 sm:py-24 md:py-32 xl:py-36">
          {/* Section ID or Coordinate Detail */}
          <div className="absolute top-24 right-10 label-sm text-primary/20 rotate-90 origin-right hidden xl:block">
            COORD: 27.01N 49.67E // JUBAIL OPS
          </div>

          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 xl:px-10">
            <div className="mb-14 max-w-5xl sm:mb-16 md:mb-20 xl:mb-24">
              <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,1fr)] lg:gap-16">
                <div>
                  <span className="label-md mb-6 block text-primary sm:mb-8">Technical Prowess</span>
                  <h2 className="text-4xl font-black uppercase italic leading-[0.9] tracking-tighter text-on-background sm:text-5xl lg:text-6xl xl:text-7xl">
                    Industrial Prowess <br />
                    <span className="text-primary/60">at</span> Global Scale.
                  </h2>
                </div>
                <p className="body-lg border-l-2 border-primary/20 pl-5 font-light leading-relaxed text-on-surface-variant sm:pl-6 md:pl-8">
                  Our integrated approach combines field-tested delivery, disciplined execution, and specialized engineering expertise across every major service line.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:gap-10">
              {homeCompetencies.map((comp) => (
                <article
                  key={comp.id}
                  className="group relative flex min-h-[460px] flex-col justify-end overflow-hidden rounded-sm bg-on-background shadow-ambient transition-transform duration-500 hover:-translate-y-1 sm:min-h-[400px] lg:min-h-[500px]"
                >
                  <ResponsiveImage
                    asset={comp.img}
                    alt={comp.title}
                    fill
                    sizes="(min-width: 1280px) 40vw, (min-width: 768px) 50vw, 100vw"
                    pictureClassName="absolute inset-0"
                    imgClassName="transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-on-background/90 via-on-background/20 to-on-background/5"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_70%)]"></div>
                  <div className="absolute inset-y-0 left-4 w-px bg-white/5 sm:left-5"></div>
                  <div className="absolute bottom-8 left-6 right-6 h-px bg-white/5 sm:bottom-10 sm:left-8 sm:right-8"></div>

                  <div className="relative flex h-full flex-col justify-end p-6 sm:p-8 md:p-10">
                    <div className="mb-4 text-[10px] font-black tracking-[0.28em] text-primary sm:mb-6 sm:text-[11px]">
                      {comp.displayId}
                    </div>

                    <div className="max-w-xl space-y-4 sm:space-y-6">
                      <h3 className="text-2xl font-black uppercase tracking-tight leading-[0.95] text-white sm:text-3xl md:text-[2rem]">
                        {comp.title}
                      </h3>
                      <p className="max-w-2xl text-sm leading-7 text-white/88 sm:text-base sm:leading-8">
                        {comp.desc}
                      </p>
                    </div>

                    <div className="mt-8">
                      <Link
                        to={`/services?id=${comp.displayId}`}
                        className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em] text-white transition-colors hover:text-primary"
                      >
                        Learn More
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Logo Marquee */}
        <section className="relative overflow-hidden border-y border-white/5 bg-on-background py-16 sm:py-20 md:py-24">
          <div className="relative z-10 mx-auto mb-12 max-w-screen-2xl px-4 text-center sm:mb-16 sm:px-6 md:mb-20 md:px-8 xl:px-10">
            <span className="label-md text-accent block mb-4">Strategic Alliances</span>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white sm:text-5xl lg:text-6xl xl:text-7xl">Global Partners</h2>
          </div>

          <div className="relative flex overflow-hidden group">
            <m.div
              className="flex gap-8 items-center whitespace-nowrap px-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            >
              {[...homePartnerLogos, ...homePartnerLogos].map((logo, i) => {
                const isBigLogo =
                  logo.includes('1590') ||
                  logo.includes('siemens') ||
                  logo.includes('hanjin') ||
                  logo.includes('qatar') ||
                  logo.includes('imi');

                return (
                  <div
                    key={i}
                    className="flex h-24 w-52 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white p-3 shadow-ambient transition-all duration-500 hover:scale-105 sm:h-28 sm:w-64 sm:p-4 md:h-32 md:w-72 md:p-5"
                    style={{ aspectRatio: '200/96' }}
                  >
                    <img
                      src={logo}
                      alt="Partner Brand"
                      className={`max-h-full max-w-full object-contain transition-transform duration-500 ${isBigLogo ? 'scale-150' : ''}`}
                      width={200}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      style={{ display: 'block', aspectRatio: '200/80' }}
                    />
                  </div>
                );
              })}
            </m.div>

            {/* Gradient Edge Masks */}
            <div className="absolute bottom-0 left-0 top-0 z-20 w-32 bg-linear-to-r from-on-background via-on-background/80 to-transparent pointer-events-none sm:w-48 md:w-80" aria-hidden="true" />
            <div className="absolute bottom-0 right-0 top-0 z-20 w-32 bg-linear-to-l from-on-background via-on-background/80 to-transparent pointer-events-none sm:w-48 md:w-80" aria-hidden="true" />
          </div>
        </section>

        {/* Core Values - "High-Contrast Sky" Redesign */}
        <section className="relative overflow-hidden bg-surface-container-high py-24 sm:py-32 md:py-40">
          {/* Subtle Technical Schematic */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(#0047AB 1px, transparent 1px), linear-gradient(90deg, #0047AB 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
          </div>

          <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 xl:px-10">
            <div className="mb-20 max-w-4xl mx-auto text-center">
              <span className="label-md text-primary mb-6 block font-black tracking-[0.4em] uppercase">The ADK Standard</span>
              <h2 className="text-5xl font-black uppercase italic tracking-tighter text-on-background sm:text-6xl lg:text-7xl xl:text-8xl">
                Core <span className="text-primary">Values.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-8">
              {homeValues.map((v, i) => {
                const ValueIcon = v.icon;

                return (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="group relative flex flex-col items-start overflow-hidden rounded-sm bg-white p-8 shadow-ambient transition-all duration-700 hover:-translate-y-2 lg:p-10"
                  >
                    {/* Industrial Index Detail */}
                    <div className="absolute -right-2 -top-2 text-7xl font-black text-primary/3 font-mono transition-colors group-hover:text-primary/8 select-none">
                      0{i + 1}
                    </div>

                    <div className="mb-10 text-primary transition-transform duration-700 group-hover:scale-110">
                      <ValueIcon size={40} strokeWidth={1.5} />
                    </div>

                    <h3 className="mb-4 text-lg font-black uppercase tracking-tight text-on-background group-hover:text-primary transition-colors sm:text-xl">{v.title}</h3>
                    <p className="text-on-surface-variant text-[11px] leading-relaxed font-medium uppercase tracking-[0.05em]">{v.desc}</p>

                    {/* Glowing Primary Footer Accent */}
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary shadow-[0_0_15px_rgba(0,71,171,0.3)] transition-all duration-700 group-hover:w-full"></div>
                  </m.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Consultation Request Form - Authority, Color, and Clarity */}
        <section id="contact" className="mx-auto max-w-screen-2xl px-4 py-20 sm:px-6 sm:py-24 md:px-8 md:py-32 xl:px-10 xl:py-40">
          <div className="flex flex-col overflow-hidden rounded-sm bg-white shadow-ambient lg:flex-row">

            {/* Left Panel: The Industrial Brief (Restored Original Gradient) */}
            <div className="industrial-gradient relative flex flex-col justify-between p-6 text-white sm:p-8 md:p-12 xl:p-16 lg:w-5/12">
              <div className="relative z-10">
                <span className="mb-6 block text-[10px] font-black uppercase tracking-[0.4em] text-accent sm:mb-8 md:mb-10">Get in Touch</span>
                <h2 className="mb-6 text-4xl font-black uppercase italic tracking-tighter text-white sm:mb-8 sm:text-5xl lg:text-[3.35rem]">
                  Initiate Your <br />
                  <span className="text-accent">Technical</span> <br />
                  Project.
                </h2>
                <p className="mb-10 max-w-sm text-base font-light italic leading-relaxed text-white/70 sm:mb-12 md:mb-16 md:text-lg">
                  Discuss your complex engineering requirements with our senior consultants and receive a comprehensive strategic proposal.
                </p>

                <div className="space-y-8 sm:space-y-10 md:space-y-12">
                  <div className="group flex items-start gap-4 sm:gap-6 md:gap-8">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 transition-all duration-500 group-hover:bg-accent sm:h-14 sm:w-14">
                      <Mail className="h-6 w-6 text-accent group-hover:text-navy-900" />
                    </div>
                    <div>
                      <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 sm:mb-3">Email Us</div>
                      <div className="text-base font-bold tracking-tight text-white sm:text-lg xl:text-xl">sales@adknprotech.com</div>
                    </div>
                  </div>

                  <div className="group flex items-start gap-4 sm:gap-6 md:gap-8">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 transition-all duration-500 group-hover:bg-accent sm:h-14 sm:w-14">
                      <Phone className="h-6 w-6 text-accent group-hover:text-navy-900" />
                    </div>
                    <div>
                      <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 sm:mb-3">Call Us</div>
                      <div className="text-base font-bold tracking-tight text-white sm:text-lg xl:text-xl">+966 62513827</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: The Consultation Form (Clean White Context) */}
            <div className="bg-white p-6 sm:p-8 md:p-12 xl:p-20 lg:w-7/12">
              <div className="max-w-xl">
                {formStatus === 'success' ? (
                  <div className="space-y-6 py-14 text-center sm:space-y-8 sm:py-20">
                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                      <Zap size={40} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black uppercase italic tracking-tighter">Inquiry Received</h3>
                      <p className="body-md text-on-surface-variant max-w-xs mx-auto">Our experts will review your request and contact you as soon as possible.</p>
                    </div>
                    <button onClick={() => setFormStatus('idle')} className="text-primary font-bold uppercase tracking-widest text-xs border-b border-primary pb-1">Submit Another Inquiry</button>
                  </div>
                ) : (
                  <form
                    name="contact-inquiry"
                    method="POST"
                    action="/?success=true#contact"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    encType="multipart/form-data"
                    onSubmit={handleContactSubmit}
                    className="space-y-8 sm:space-y-10 md:space-y-12"
                  >
                    <input type="hidden" name="form-name" value="contact-inquiry" />
                    {formStatus === 'error' && (
                      <div className="bg-red-50 text-red-700 p-4 text-xs font-bold uppercase tracking-widest border-l-2 border-red-500">
                        {errorMessage || 'Submission blocked. Please review the form or contact us directly at sales@adknprotech.com.'}
                      </div>
                    )}
                    <input type="text" name="bot-field" ref={honeypotRef} className="hidden" tabIndex={-1} autoComplete="off" />

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
                      <div className="relative group">
                        <label className="block label-md text-on-surface-variant mb-3 font-black tracking-widest">Full Name</label>
                        <div className="relative">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-focus-within:scale-y-100 transition-transform duration-300"></div>
                          <input name="name" value={contactForm.name} onChange={handleInputChange} required className="w-full bg-surface-container-low border-none focus:ring-0 px-6 py-5 text-on-surface font-bold uppercase text-sm tracking-widest transition-all" placeholder="Enter full name" type="text" />
                        </div>
                      </div>
                      <div className="relative group">
                        <label className="block label-md text-on-surface-variant mb-3 font-black tracking-widest">Work Email</label>
                        <div className="relative">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-focus-within:scale-y-100 transition-transform duration-300"></div>
                          <input name="email" value={contactForm.email} onChange={handleInputChange} required className="w-full bg-surface-container-low border-none focus:ring-0 px-6 py-5 text-on-surface font-bold uppercase text-sm tracking-widest transition-all" placeholder="Enter work email" type="email" />
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      <label htmlFor="service-select" className="block label-md text-on-surface-variant mb-3 font-black tracking-widest">Primary Technical Service</label>
                      <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-focus-within:scale-y-100 transition-transform duration-300"></div>
                        <select id="service-select" name="service" value={contactForm.service} onChange={handleInputChange} className="w-full bg-surface-container-low border-none focus:ring-0 px-6 py-5 text-on-surface font-bold uppercase text-sm tracking-widest appearance-none cursor-pointer">
                          <option>Surface Preparation</option>
                          <option>Surface Treatment</option>
                          <option>Piping Systems</option>
                          <option>Structural Steel Engineering</option>
                          <option>Industrial Insulation</option>
                          <option>Scaffolding</option>
                          <option>Electromechanical</option>
                          <option>Operational Support</option>
                        </select>
                      </div>
                    </div>

                    <div className="relative group">
                      <label htmlFor="specialization-select" className="block label-md text-on-surface-variant mb-3 font-black tracking-widest">Specialization</label>
                      <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-focus-within:scale-y-100 transition-transform duration-300"></div>
                        <select id="specialization-select" name="specialization" value={contactForm.specialization} onChange={handleInputChange} className="w-full bg-surface-container-low border-none focus:ring-0 px-6 py-5 text-on-surface font-bold uppercase text-sm tracking-widest appearance-none cursor-pointer">
                          {specializationOptions.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="relative group">
                      <label className="block label-md text-on-surface-variant mb-3 font-black tracking-widest">Project Overview</label>
                      <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-focus-within:scale-y-100 transition-transform duration-300"></div>
                        <textarea name="message" value={contactForm.message} onChange={handleInputChange} required className="w-full bg-surface-container-low border-none focus:ring-0 px-6 py-5 text-on-surface font-bold uppercase text-sm tracking-widest resize-none min-h-[120px]" placeholder="Describe your technical requirements..."></textarea>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="consent"
                          name="consent"
                          checked={contactForm.consent}
                          onChange={handleInputChange}
                          required
                          className="mt-1 h-4 w-4 rounded border-none bg-surface-container-low text-primary focus:ring-0 cursor-pointer"
                        />
                        <label htmlFor="consent" className="text-[11px] leading-relaxed text-on-surface-variant font-medium uppercase tracking-wider cursor-pointer">
                          I hereby declare my consent for the processing of my personal data for the purpose of this technical inquiry, in accordance with the <Link to="/privacy-policy" className="text-primary font-bold hover:underline underline-offset-4">Privacy Policy</Link>.
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col items-stretch gap-6 pt-4 sm:pt-6 md:flex-row md:items-center md:justify-between md:gap-8 lg:gap-12 md:pt-8">
                      <label className="group/file flex cursor-pointer items-start gap-4 text-primary transition-all hover:text-on-background sm:items-center sm:gap-5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-primary/10 bg-primary/5 transition-all group-hover/file:bg-primary group-hover/file:text-white sm:h-12 sm:w-12">
                          <Paperclip size={20} />
                        </div>
                        <div className="space-y-1">
                          <span className="label-md block break-all text-on-surface">{contactForm.file ? contactForm.file.name : 'Attach Technical Files'}</span>
                          <span className="text-xs uppercase tracking-tighter text-on-surface-variant sm:text-[14px]">PDF / DWG / STEP MAX 10MB</span>
                        </div>
                        <input ref={fileInputRef} type="file" name="attachment" className="hidden" onChange={handleFileChange} />
                      </label>

                      <button className="w-full rounded-sm bg-primary px-8 py-4 text-sm font-black uppercase tracking-widest text-on-primary shadow-xl transition-all hover:-translate-y-1 hover:bg-on-background md:w-auto md:px-12 md:py-5 lg:px-16 lg:py-6" type="submit">
                        {formStatus === 'loading' ? 'Transmitting...' : 'Submit Inquiry'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* Final CTA */}
        <section className="industrial-gradient relative overflow-hidden py-20 text-center sm:py-24 md:py-32">
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 md:px-8 xl:px-10">
            <h2 className="mb-10 text-3xl font-extrabold uppercase italic tracking-tighter text-white sm:text-4xl md:mb-12 md:text-5xl lg:mb-14 lg:text-6xl">Precision-Built for the World's Harshest Environments.</h2>
            <Link to="/#contact" className="inline-flex min-h-12 items-center justify-center bg-white px-8 py-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-on-background transition-all hover:bg-primary">Start a Conversation</Link>
          </div>
          <div className="absolute -bottom-10 right-0 select-none text-[8rem] font-black leading-none text-white/5 sm:-bottom-16 sm:text-[12rem] lg:-right-20 lg:-bottom-20 lg:text-[20rem]">ADK</div>
        </section>
      </main>
    </div >
  );
};

export default HomePage;


