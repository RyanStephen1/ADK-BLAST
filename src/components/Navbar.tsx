import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navLinks } from '../content/navigation';
import { assetPaths } from '../lib/assets';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setIsOpen(false); setActiveDropdown(null); }, [location]);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setIsOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Trap focus in mobile menu when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const firstFocusable = document.querySelector<HTMLButtonElement>('.mobile-nav-link');
      firstFocusable?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav
      ref={dropdownRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white py-3 sm:py-4 shadow-ambient border-b border-black/5"
      aria-label="Main navigation"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 xl:px-10">
        <div className="flex justify-between items-center">

          {/* Logo - Industrial Architect Specs */}
          <Link to="/" className="flex items-center gap-3 sm:gap-4 group relative shrink-0">
            <div className="h-10 sm:h-12 md:h-14 lg:h-16 flex items-center justify-center relative z-10" style={{ minWidth: 'clamp(180px, 40vw, 320px)', aspectRatio: '400/72' }}>
              <img
                src={assetPaths.brand.logoMark}
                alt="ADK Co., LTD"
                className="h-full w-auto object-contain transition-transform group-hover:scale-105"
                width={400}
                height={72}
                decoding="async"
                fetchPriority="high"
                style={{ aspectRatio: '400/72' }}
              />
            </div>
          </Link>

          {/* Desktop Nav - Editorial Authority */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => {
                  if (window.innerWidth >= 1024 && link.dropdown) setActiveDropdown(link.name);
                }}
                onMouseLeave={() => {
                  if (window.innerWidth >= 1024 && link.dropdown) setActiveDropdown(null);
                }}
              >
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                      onFocus={() => setActiveDropdown(link.name)}
                      aria-expanded={activeDropdown === link.name}
                      aria-haspopup="true"
                      className={`flex items-center gap-2 xl:gap-3 label-md transition-all duration-300 cursor-pointer whitespace-nowrap ${activeDropdown === link.name ? 'text-primary' : 'text-on-surface hover:text-primary'
                        }`}
                    >
                      {link.name}
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-500 opacity-40 ${activeDropdown === link.name ? 'rotate-180 opacity-100' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                    {activeDropdown === link.name && (
                      <div className="absolute top-full left-0 pt-5 min-w-[320px] z-50" role="menu">
                        <div className="bg-white/90 backdrop-blur-2xl shadow-ambient overflow-hidden rounded-sm">
                          {/* Top Detail Line */}
                          <div className="h-1 w-full bg-primary/10"></div>
                          <div className="py-4">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                to={item.path}
                                role="menuitem"
                                className="block px-8 py-4 label-sm text-on-surface/60 hover:text-primary hover:bg-surface-container-low transition-all duration-300 border-b border-outline-variant/5 last:border-0"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.path || '#'}
                    className={`label-md transition-all duration-300 relative group/link whitespace-nowrap ${location.pathname === link.path ? 'text-primary' : 'text-on-surface hover:text-primary'
                      }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-500 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover/link:w-full'}`} aria-hidden="true"></span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions - Industrial Primitives */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            <Link
              to="/#contact"
              className="bg-primary text-on-primary px-4 sm:px-6 xl:px-8 py-2.5 sm:py-3.5 label-md hover:bg-primary-container hover:-translate-y-1 transition-all shadow-lg hidden md:block rounded-sm whitespace-nowrap"
            >
              Consultation
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 sm:p-2.5 transition-all duration-500 text-on-surface"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Tonal Layering */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={`lg:hidden bg-surface-container-lowest overflow-y-auto shadow-ambient transition-[max-height,opacity] duration-500 ease-out no-scrollbar ${isOpen ? 'max-h-[85vh] opacity-100 border-t border-black/5' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
      >
        <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-3 sm:space-y-4">
          {navLinks.map((link, idx) => (
            <div key={link.name} className="space-y-2">
              <div className="flex items-center justify-between">
                {link.dropdown ? (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                    aria-expanded={activeDropdown === link.name}
                    className={`block py-3 label-md flex-1 text-left cursor-pointer ${activeDropdown === link.name ? 'text-primary' : 'text-on-surface/60'}`}
                  >
                    <span className="text-[8px] opacity-30 mr-4 font-mono">0{idx + 1}</span>
                    {link.name}
                  </button>
                ) : (
                  <Link
                    to={link.path || '#'}
                    className="mobile-nav-link block py-3 label-md flex-1 text-left"
                    aria-current={location.pathname === link.path ? 'page' : undefined}
                  >
                    <span className="text-[8px] opacity-30 mr-4 font-mono">0{idx + 1}</span>
                    {link.name}
                  </Link>
                )}
                {link.dropdown && (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                    className="p-2"
                    aria-label={`Toggle ${link.name} submenu`}
                  >
                    <ChevronDown
                      size={16}
                      className={`text-primary transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                )}
              </div>

              {link.dropdown && activeDropdown === link.name && (
                <div className="pl-6 sm:pl-8 border-l-2 border-primary/10 mb-4 sm:mb-6 space-y-1" role="group">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="mobile-nav-link block py-3 label-sm text-on-surface/50 hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-4 sm:pt-6 md:hidden">
            <Link
              to="/#contact"
              className="mobile-nav-link block w-full bg-primary text-on-primary text-center px-8 py-5 label-md rounded-sm"
            >
              Start Project Request
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
