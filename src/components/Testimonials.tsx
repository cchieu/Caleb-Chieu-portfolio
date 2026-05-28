import { useLanguage } from '../context/LanguageContext';
import { Quote } from 'lucide-react';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

export default function Testimonials() {
  const { t, getTestimonialsData } = useLanguage();
  const testimonialsData = getTestimonialsData();

  return (
    <section id="testimonials" className="py-20 md:py-32 px-6 md:px-16 bg-brand-charcoal overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Headings */}
        <ScrollReveal variant="slideUp">
          <div className="text-xs tracking-[0.2em] uppercase text-brand-red-light mb-4 flex items-center gap-3 font-semibold">
            <span className="inline-block w-8 h-[1px] bg-brand-red-light" />
            {t('testimonialsBadge')}
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-light leading-tight tracking-tight text-brand-white mb-16">
            {t('testimonialsTitlePart1')}<span className="font-serif italic text-brand-muted">{t('testimonialsTitlePart2')}</span>
          </h2>
        </ScrollReveal>

        {/* Testimonials horizontal flex/grid row */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((item, idx) => (
            <StaggerItem
              key={idx}
              variant="scale"
              className="bg-brand-panel border border-brand-border rounded-sm p-8 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:border-brand-muted/15 shadow-xl"
            >
              {/* Giant decorative quotation element inside card limits */}
              <Quote size={50} className="absolute right-6 top-6 text-brand-red/5 group-hover:text-brand-red/10 group-hover:scale-105 pointer-events-none transition-all duration-300" />

              <div>
                {/* Visual score block (Stars) */}
                <div className="flex gap-1 text-xs text-brand-red-light mb-6 select-none font-medium">
                  {"★".repeat(item.rating)}
                </div>

                {/* Copious text testimonial summary */}
                <p className="font-serif italic text-sm md:text-base text-brand-white/90 leading-relaxed mb-8">
                  "{item.text}"
                </p>
              </div>

              {/* Author metadata row */}
              <div className="flex items-center gap-4 border-t border-brand-border/60 pt-6 mt-auto">
                <div className="w-10 h-10 rounded-full bg-brand-red text-brand-white font-semibold text-xs flex items-center justify-center tracking-wider select-none">
                  {item.authorInitials}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-brand-white">
                    {item.authorName}
                  </h4>
                  <p className="text-[10px] uppercase tracking-wider text-brand-muted mt-0.5 animate-pulse">
                    {item.authorTitle}
                  </p>
                </div>
              </div>

            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
