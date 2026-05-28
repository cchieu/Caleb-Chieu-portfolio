import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function LogoStrip() {
  const { language } = useLanguage();
  const brands = [
    "Aquila East Africa",
    "Conquest Capital",
    "Giktek",
    "Exp Agency",
    "Safaricom PLC",
    "Conquest Limited"
  ];

  return (
    <div className="border-t border-b border-brand-border py-6 px-6 md:px-16 bg-brand-black overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-12">
        <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-brand-muted/70 whitespace-nowrap md:pr-12 md:border-r border-brand-border h-full flex items-center">
          {language === 'en' ? 'Trusted by Industry Leaders' : 'Inaaminika na Viongozi wa Sekta'}
        </span>
        
        {/* Infinite slider ticker row */}
        <div className="w-full overflow-hidden relative">
          <motion.div
            className="flex gap-12 md:gap-20 items-center justify-between pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {brands.map((brand, idx) => (
              <span
                key={idx}
                className="font-serif text-sm md:text-base font-semibold text-brand-white/30 hover:text-brand-white/80 transition-colors duration-300 whitespace-nowrap cursor-default"
                title={brand}
              >
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
