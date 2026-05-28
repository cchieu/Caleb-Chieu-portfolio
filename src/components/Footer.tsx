import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ onOpenAdmin }: { onOpenAdmin?: () => void }) {
  const { t, language } = useLanguage();

  const handleScrollToSegment = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-charcoal border-t border-brand-border py-12 px-6 md:px-16 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo label */}
        <a
          href="#hero"
          onClick={(e) => handleScrollToSegment(e, '#hero')}
          className="font-serif text-lg md:text-xl font-semibold tracking-wide text-brand-white decoration-none hover:opacity-90"
        >
          Caleb<span className="text-brand-red-light font-sans font-extrabold font-black">.</span>
        </a>

        {/* Copywrite legal info */}
        <p className="text-[11px] text-brand-muted/70 text-center font-medium max-w-sm md:max-w-none leading-relaxed">
          &copy; 2026 Caleb Chieu. {language === 'en' ? "Creative Director & UI/UX Designer." : "Mkurugenzi wa Ubunifu & Mbunifu wa UI/UX."} Nairobi, Kenya.
        </p>

        {/* Floating mini navigation anchors */}
        <div className="flex gap-6 items-center">
          <a
            href="#about"
            onClick={(e) => handleScrollToSegment(e, '#about')}
            className="text-[10px] uppercase tracking-widest text-brand-muted hover:text-brand-white transition-colors decoration-none"
          >
            {t('navAbout')}
          </a>
          <a
            href="#work"
            onClick={(e) => handleScrollToSegment(e, '#work')}
            className="text-[10px] uppercase tracking-widest text-brand-muted hover:text-brand-white transition-colors decoration-none"
          >
            {t('navWork')}
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScrollToSegment(e, '#contact')}
            className="text-[10px] uppercase tracking-widest text-brand-muted hover:text-brand-white transition-colors decoration-none"
          >
            {language === 'en' ? 'Contact' : 'Siliana'}
          </a>
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-[10px] uppercase tracking-widest text-brand-muted hover:text-brand-white transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 inline-block"
              title="Content Administration Portal"
            >
              • &nbsp;CMS Admin
            </button>
          )}
        </div>

      </div>
    </footer>
  );
}
