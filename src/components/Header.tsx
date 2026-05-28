import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  // Theme state setup with local storage persistence
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'light') return 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-16 md:py-5 border-b transition-all duration-300 ${
          isScrolled
            ? 'background-blur border-brand-border bg-brand-black/90 backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="font-serif text-xl md:text-2xl font-semibold tracking-wide text-brand-white decoration-0 hover:opacity-90 animate-fade-in"
        >
          Caleb<span className="text-brand-red-light font-sans font-extrabold">.</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 items-center list-none m-0 p-0">
          <li>
            <a
              href="#about"
              onClick={(e) => handleLinkClick(e, '#about')}
              className="text-xs uppercase tracking-widest text-brand-muted hover:text-brand-white transition-colors duration-200 decoration-0"
            >
              {t('navAbout')}
            </a>
          </li>
          <li>
            <a
              href="#services"
              onClick={(e) => handleLinkClick(e, '#services')}
              className="text-xs uppercase tracking-widest text-brand-muted hover:text-brand-white transition-colors duration-200 decoration-0"
            >
              {t('navServices')}
            </a>
          </li>
          <li>
            <a
              href="#work"
              onClick={(e) => handleLinkClick(e, '#work')}
              className="text-xs uppercase tracking-widest text-brand-muted hover:text-brand-white transition-colors duration-200 decoration-0"
            >
              {t('navWork')}
            </a>
          </li>
          <li>
            <a
              href="#process"
              onClick={(e) => handleLinkClick(e, '#process')}
              className="text-xs uppercase tracking-widest text-brand-muted hover:text-brand-white transition-colors duration-200 decoration-0"
            >
              {t('navProcess')}
            </a>
          </li>
          <li>
            <a
              href="#skills"
              onClick={(e) => handleLinkClick(e, '#skills')}
              className="text-xs uppercase tracking-widest text-brand-muted hover:text-brand-white transition-colors duration-200 decoration-0"
            >
              {t('navSkills')}
            </a>
          </li>
          
          {/* Desktop Theme Toggle Button */}
          <li>
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center p-2 text-brand-muted hover:text-brand-white hover:bg-white/5 rounded-full transition-all duration-200 cursor-pointer"
              aria-label="Toggle high contrast mode"
              id="desktop-theme-toggle"
              title={theme === 'light' ? t('themeDark') : t('themeLight')}
            >
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
            </button>
          </li>

          {/* Desktop Language Selector */}
          <li>
            <div className="flex items-center border border-brand-border rounded-sm overflow-hidden p-[2px] bg-brand-panel/60">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-[9px] uppercase font-mono tracking-wider font-semibold rounded-[1px] transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-brand-red text-brand-white'
                    : 'text-brand-muted hover:text-brand-white bg-transparent'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('sw')}
                className={`px-2 py-0.5 text-[9px] uppercase font-mono tracking-wider font-semibold rounded-[1px] transition-all cursor-pointer ${
                  language === 'sw'
                    ? 'bg-brand-red text-brand-white'
                    : 'text-brand-muted hover:text-brand-white bg-transparent'
                }`}
              >
                SW
              </button>
            </div>
          </li>

          <li>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="bg-brand-red hover:bg-brand-red-light text-brand-white px-5 py-2 rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors duration-200 decoration-0"
            >
              {t('navContact')}
            </a>
          </li>
        </ul>

        {/* Mobile controls row containing theme toggle + language selector + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Language Selector */}
          <div className="flex items-center border border-brand-border rounded-sm overflow-hidden p-[2px] bg-brand-panel/60">
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 text-[9px] uppercase font-mono tracking-wider font-bold rounded-[1px] transition-all ${
                language === 'en'
                  ? 'bg-brand-red text-brand-white'
                  : 'text-brand-muted hover:text-brand-white bg-transparent'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('sw')}
              className={`px-1.5 py-0.5 text-[9px] uppercase font-mono tracking-wider font-bold rounded-[1px] transition-all ${
                language === 'sw'
                  ? 'bg-brand-red text-brand-white'
                  : 'text-brand-muted hover:text-brand-white bg-transparent'
              }`}
            >
              SW
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 text-brand-white hover:text-brand-red-light focus:outline-none transition-colors duration-200 cursor-pointer"
            aria-label="Toggle theme switcher"
            id="mobile-theme-toggle"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-brand-white hover:text-brand-red-light focus:outline-none transition-colors p-1"
            aria-label="Toggle Navigation Menu"
            id="nav-toggle-btn"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-black/95 backdrop-blur-lg flex flex-col justify-center items-center md:hidden">
          <ul className="flex flex-col gap-8 items-center list-none text-center p-0 m-0 animate-fade-in">
            <li>
              <a
                href="#about"
                onClick={(e) => handleLinkClick(e, '#about')}
                className="text-lg uppercase tracking-widest text-brand-muted hover:text-brand-white"
              >
                {t('navAbout')}
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => handleLinkClick(e, '#services')}
                className="text-lg uppercase tracking-widest text-brand-muted hover:text-brand-white"
              >
                {t('navServices')}
              </a>
            </li>
            <li>
              <a
                href="#work"
                onClick={(e) => handleLinkClick(e, '#work')}
                className="text-lg uppercase tracking-widest text-brand-muted hover:text-brand-white"
              >
                {t('navWork')}
              </a>
            </li>
            <li>
              <a
                href="#process"
                onClick={(e) => handleLinkClick(e, '#process')}
                className="text-lg uppercase tracking-widest text-brand-muted hover:text-brand-white"
              >
                {t('navProcess')}
              </a>
            </li>
            <li>
              <a
                href="#skills"
                onClick={(e) => handleLinkClick(e, '#skills')}
                className="text-lg uppercase tracking-widest text-brand-muted hover:text-brand-white"
              >
                {t('navSkills')}
              </a>
            </li>
            <li className="mt-4">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="bg-brand-red hover:bg-brand-red-light text-brand-white px-8 py-3 rounded-sm text-sm uppercase tracking-widest font-semibold transition-all shadow-lg text-center"
              >
                {t('navContact')}
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
