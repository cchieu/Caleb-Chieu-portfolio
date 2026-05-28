import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function Process() {
  const { t, getProcessData, language } = useLanguage();
  const processSteps = getProcessData();

  return (
    <section id="process" className="py-20 md:py-32 px-6 md:px-16 bg-brand-black overflow-hidden relative">
      <div className="absolute inset-0 grid-lines opacity-[0.05] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        
        {/* Section Headings */}
        <ScrollReveal
          variant="slideUp"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-16"
        >
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-brand-red-light mb-4 flex items-center gap-3 font-semibold">
              <span className="inline-block w-8 h-[1px] bg-brand-red-light" />
              {t('processBadge')}
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light leading-tight tracking-tight text-brand-white">
              {language === 'en' ? (
                <>
                  My Creative <span className="font-serif italic text-brand-muted">Process</span>
                </>
              ) : (
                <>
                  Mchakato wa <span className="font-serif italic text-brand-muted">Ubunifu</span>
                </>
              )}
            </h2>
          </div>
          <p className="text-sm md:text-base text-brand-muted leading-relaxed max-w-lg mb-2">
            {t('processDesc')}
          </p>
        </ScrollReveal>

        {/* Seamless step chain timeline */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 border border-brand-border rounded-sm overflow-hidden bg-brand-panel/30">
          {processSteps.map((step) => (
            <StaggerItem
              key={step.num}
              variant="slideUp"
              className="p-6 border-b border-r border-brand-border last:border-b-0 sm:last:border-r-0 lg:border-b-0 md:last:border-r-0 group hover:bg-brand-red/[0.03] transition-colors duration-300"
            >
              <div className="font-display text-4xl text-brand-white/5 group-hover:text-brand-red-light/10 select-none mb-4 transition-all duration-300">
                {step.num}
              </div>
              <h4 className="font-serif text-sm font-semibold text-brand-white group-hover:text-brand-red-light mb-2 transition-colors duration-200">
                {step.name}
              </h4>
              <p className="text-[11px] text-brand-muted leading-relaxed">
                {step.desc}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
