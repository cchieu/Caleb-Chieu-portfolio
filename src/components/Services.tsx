import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';
import {
  Layout,
  Compass,
  Film,
  Video,
  Sparkles,
  Camera,
  Globe,
  Users,
  ArrowUpRight
} from 'lucide-react';

const iconMap: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
  Layout,
  Compass,
  Film,
  Video,
  Sparkles,
  Camera,
  Globe,
  Users
};

export default function Services() {
  const { t, getServicesData, language } = useLanguage();
  const servicesData = getServicesData();

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 md:py-32 px-6 md:px-16 bg-brand-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Services Header Row */}
        <ScrollReveal
          variant="slideUp"
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-brand-red-light mb-4 flex items-center gap-3 font-semibold">
              <span className="inline-block w-8 h-[1px] bg-brand-red-light" />
              {t('servicesBadge')}
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light leading-tight tracking-tight text-brand-white">
              {language === 'en' ? (
                <>
                  Services & <span className="font-serif italic text-brand-muted">Disciplines</span>
                </>
              ) : (
                <>
                  Huduma & <span className="font-serif italic text-brand-muted">Taaluma</span>
                </>
              )}
            </h2>
          </div>
          <motion.a
            href="#contact"
            onClick={handleScrollToContact}
            whileHover={{ x: 5 }}
            className="group flex items-center gap-2 bg-transparent text-brand-white hover:text-brand-red-light text-xs font-semibold uppercase tracking-widest border border-white/20 hover:border-brand-red-light/50 px-6 py-3.5 rounded-sm transition-all self-start md:self-auto cursor-pointer"
          >
            {t('servicesStartProject')}
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </ScrollReveal>

        {/* Services Bento-Style Cards Grid */}
        <StaggerContainer 
          staggerChildren={0.15} 
          viewportAmount={0.08}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.iconName] || Layout;
            
            return (
              <StaggerItem
                key={service.num}
                variant="slideUp"
                className="relative bg-brand-panel border border-brand-border rounded-sm p-6 flex flex-col justify-between group overflow-hidden transition-all duration-300 hover:border-brand-muted/20 hover:translate-y-[-4px]"
              >
                {/* Underline decorative bar on card hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />

                <div>
                  {/* Number descriptor and Icon badge */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display text-4xl text-brand-white/5 leading-none group-hover:text-brand-red-light/10 group-hover:scale-105 transition-all duration-300">
                      {service.num}
                    </span>
                    <IconComponent size={22} className="text-brand-red-light group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Service details */}
                  <h3 className="font-serif text-lg font-semibold text-brand-white mb-3 group-hover:text-brand-red-light transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                {/* Micro tagging systems for capability showcase */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] uppercase tracking-wider text-brand-red-light/80 bg-brand-red/5 border border-brand-red/10 px-2 py-0.5 rounded-sm cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
