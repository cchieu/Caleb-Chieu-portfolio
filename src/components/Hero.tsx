import { motion } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "tween", duration: 0.6, ease: "easeOut" } }
  };

  const handleScrollToSection = (targetId: string) => {
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-height-screen min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center px-6 md:px-16 pt-32 pb-16 overflow-hidden select-none"
    >
      {/* Dynamic background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(192,57,43,0.08)_0%,transparent_70%),radial-gradient(ellipse_40%_60%_at_20%_80%,rgba(192,57,43,0.04)_0%,transparent_60%)] pointer-events-none" />
      
      {/* Tech grid lines */}
      <div className="absolute inset-0 grid-lines pointer-events-none" />

      {/* Hero content */}
      <motion.div
        className="relative z-10 max-w-2xl lg:max-w-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="text-xs md:text-sm tracking-[0.25em] uppercase text-brand-red-light mb-6 flex items-center gap-3 font-medium"
          variants={itemVariants}
        >
          <span className="inline-block w-10 h-[1px] bg-brand-red-light" />
          {t('heroBadge')}
        </motion.div>

        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight mb-6"
          variants={itemVariants}
        >
          {t('heroTitlePart1')}<br />
          <span className="font-serif italic text-brand-muted/70 block md:inline">{t('heroTitlePart2')}</span>
          {t('heroTitlePart3')}
        </motion.h1>

        <motion.p
          className="text-sm md:text-base text-brand-muted/90 max-w-lg leading-relaxed mb-10"
          variants={itemVariants}
        >
          {t('heroDesc')}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4"
          variants={itemVariants}
        >
          <button
            onClick={() => handleScrollToSection('#work')}
            id="hero-view-work-btn"
            className="group flex items-center gap-2 bg-brand-red hover:bg-brand-red-light text-brand-white px-8 py-4 text-xs tracking-widest uppercase font-semibold border border-brand-red hover:border-brand-red-light rounded-sm transition-all shadow-md cursor-pointer"
          >
            {t('heroViewWork')}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => handleScrollToSection('#contact')}
            id="hero-book-consult-btn"
            className="group flex items-center gap-2 bg-transparent text-brand-white px-8 py-4 text-xs tracking-widest uppercase font-semibold border border-white/20 hover:border-white hover:bg-white/5 rounded-sm transition-all cursor-pointer"
          >
            {t('heroBookConsult')}
            <Calendar size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>
      </motion.div>

      {/* Hero layout right column: Portrait placeholder with responsive adaptation */}
      <div className="relative z-10 hidden lg:flex flex-col items-center xl:items-end justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-80 h-96 xl:w-96 xl:h-[480px]"
        >
          {/* Neon red frame backdrop */}
          <div className="absolute top-[-10px] right-[-10px] w-full h-full border border-brand-red/30 rounded-sm z-0" />
          
          {/* Main design canvas */}
          <div className="relative w-full h-full bg-gradient-to-br from-[#1a1a1a] via-[#222222] to-[#181818] rounded-sm flex items-center justify-center overflow-hidden z-10 border border-brand-border group shadow-2xl">
            {/* Elegant large monogram */}
            <span className="font-display text-9xl text-brand-red/10 tracking-widest select-none group-hover:scale-105 group-hover:text-brand-red/15 transition-all duration-700">
              CC
            </span>
            
            {/* Modern caption label overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-brand-black/90 border border-brand-border rounded-sm p-4 flex items-center justify-between backdrop-blur-md shadow-lg">
              <div>
                <h4 className="font-serif text-sm font-semibold text-brand-white">Caleb Chieu</h4>
                <p className="text-[10px] uppercase tracking-widest text-brand-muted/70 mt-0.5">{t('heroDesignStrategy')}</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold text-[#27ae60]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27ae60] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#27ae60] shadow-[0_0_6px_rgba(39,174,96,0.6)]"></span>
                </span>
                {t('heroActiveStatus')}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-brand-muted select-none">
        <span>{t('heroScroll')}</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-muted/30 to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-brand-red-light"
            animate={{
              y: ["0%", "200%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </section>
  );
}
