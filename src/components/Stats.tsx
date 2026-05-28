import { StaggerContainer, StaggerItem } from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function Stats() {
  const { getStatsData } = useLanguage();
  const statsData = getStatsData();

  return (
    <section id="stats" className="border-t border-b border-brand-border bg-brand-charcoal overflow-hidden py-12 px-6 md:px-16 select-none">
      <div className="max-w-7xl mx-auto">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center divide-y lg:divide-y-0 lg:divide-x divide-brand-border/40">
          {statsData.map((stat, idx) => (
            <StaggerItem
              key={idx}
              variant="scale"
              className={`pt-6 lg:pt-0 ${idx === 0 ? 'pt-0' : ''}`}
            >
              <h3 className="font-display text-5xl md:text-7xl font-bold text-brand-white leading-none tracking-tight mb-2">
                {stat.num}
                {stat.hasPlus && <span className="text-brand-red-light font-sans font-light">+</span>}
              </h3>
              <p className="text-xs uppercase tracking-widest text-brand-muted/80 font-semibold">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
