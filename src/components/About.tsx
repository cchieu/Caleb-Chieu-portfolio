import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Award, GraduationCap } from 'lucide-react';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

export default function About() {
  const { t, getTimelineData, language } = useLanguage();
  const timelineData = getTimelineData();

  return (
    <section id="about" className="relative py-20 md:py-32 px-6 md:px-16 bg-brand-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left column: Visual identity / Quote Frame */}
        <ScrollReveal
          variant="slideRight"
          className="relative group w-full max-w-md mx-auto lg:max-w-none"
        >
          {/* Main graphic container */}
          <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-brand-charcoal to-brand-panel rounded-sm flex flex-col justify-end p-8 overflow-hidden border border-brand-border shadow-2xl">
            {/* Elegant grid alignment detail */}
            <div className="absolute inset-0 grid-lines opacity-20" />
            
            {/* Massive typographic overlay */}
            <div className="absolute top-10 left-10 font-display text-8xl md:text-9xl text-brand-red-light/5 select-none leading-none">
              STUDIO
            </div>

            {/* Vertically rotated name label to duplicate original design */}
            <div className="absolute right-6 bottom-12 writing-mode-vertical text-[10px] tracking-[0.25em] text-brand-red-light/50 select-none hidden sm:block uppercase font-medium">
              CALEB CHIEU &bull; DESIGN LAB
            </div>

            {/* Initials center Graphic */}
            <div className="m-auto text-center select-none">
              <span className="font-display text-[8rem] md:text-[10rem] font-bold text-brand-red/10 leading-none block">
                CC
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-muted/40 block mt-2">
                Nairobi, KE
              </span>
            </div>

            {/* Interactive metadata badge */}
            <div className="relative z-10 flex gap-2 items-center bg-brand-panel/90 border border-brand-border p-3 rounded-sm backdrop-blur-md">
              <Award className="text-brand-red-light w-5 h-5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs font-semibold text-brand-white">{t('aboutSeniorDirector')}</p>
                <p className="text-[10px] text-brand-muted uppercase tracking-wider">{t('aboutExpertiseCount')}</p>
              </div>
            </div>
          </div>

          {/* Floating black/red quote placard matching Caleb's custom HTML layout */}
          <ScrollReveal
            variant="scale"
            delay={0.4}
            className="absolute -bottom-6 -right-4 sm:-right-8 bg-brand-red border border-brand-red-light/20 p-6 rounded-sm shadow-xl max-w-[240px] z-20 hover:scale-105 transition-transform cursor-default"
          >
            <p className="font-serif italic text-sm md:text-base text-brand-white font-light leading-relaxed">
              {t('aboutPlacard')}
            </p>
            <span className="block text-[9px] uppercase tracking-widest text-brand-white/75 mt-3 text-right">
              &mdash; {t('aboutPlacardAuthor')}
            </span>
          </ScrollReveal>
        </ScrollReveal>

        {/* Right column: Copious narrative and Timeline tracking */}
        <ScrollReveal variant="slideLeft" className="flex flex-col">
          <div className="text-xs tracking-[0.2em] uppercase text-brand-red-light mb-4 flex items-center gap-3 font-semibold">
            <span className="inline-block w-8 h-[1px] bg-brand-red-light" />
            {t('aboutBadge')}
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-light leading-tight tracking-tight text-brand-white mb-6">
            {language === 'en' ? (
              <>
                10+ Years of <span className="font-serif italic text-brand-muted">Crafting Stories</span> Through Design
              </>
            ) : (
              <>
                Zaidi ya Miaka 10 ya <span className="font-serif italic text-brand-muted">Kujenga Hadithi</span> Kupitia Ubunifu
              </>
            )}
          </h2>
          <p className="text-sm md:text-base text-brand-muted/95 leading-relaxed mb-8">
            {t('aboutDesc')}
          </p>

          {/* Chronological career milestones */}
          <StaggerContainer className="flex flex-col border-t border-brand-border mt-4">
            {timelineData.map((item, index) => (
              <StaggerItem
                key={index}
                className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-6 py-5 border-b border-brand-border items-center group hover:bg-white/[0.01] transition-colors rounded-sm px-2"
              >
                <div className="text-xs font-semibold tracking-wider text-brand-red-light flex items-center gap-1.5">
                  {item.company.includes('University') || item.company.includes('Chuo') ? <GraduationCap size={12} /> : null}
                  {item.year}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-white group-hover:text-brand-red-light transition-colors">
                    {item.role}
                  </h4>
                  <p className="text-xs text-brand-muted mt-1">
                    {item.company}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </ScrollReveal>

      </div>
    </section>
  );
}
