import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Briefcase } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Skills() {
  const { t, getSkillsData, getToolsData, language } = useLanguage();
  const skillsData = getSkillsData();
  const toolsData = getToolsData();

  return (
    <section id="skills" className="py-20 md:py-32 px-6 md:px-16 bg-brand-black overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left Block: Narrative list and filled tracks */}
          <ScrollReveal variant="slideRight" className="flex flex-col w-full">
            <div className="text-xs tracking-[0.2em] uppercase text-brand-red-light mb-4 flex items-center gap-3 font-semibold">
              <span className="inline-block w-8 h-[1px] bg-brand-red-light" />
              {t('skillsBadge')}
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light leading-tight tracking-tight text-brand-white mb-6">
              {language === 'en' ? (
                <>
                  Skills & <span className="font-serif italic text-brand-muted">Tools</span>
                </>
              ) : (
                <>
                  Ujuzi & <span className="font-serif italic text-brand-muted">Zana</span>
                </>
              )}
            </h2>
            <p className="text-sm md:text-base text-brand-muted/90 leading-relaxed mb-10 max-w-lg">
              {t('skillsDesc')}
            </p>

            {/* Set of dynamic animated progress bar items */}
            <div className="flex flex-col gap-6">
              {skillsData.map((skill, index) => (
                <div key={skill.name} className="flex flex-col">
                  {/* Metadata labels row */}
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-2 text-brand-white font-mono">
                    <span>{skill.name}</span>
                    <span className="text-brand-muted">{skill.percentage}%</span>
                  </div>
                  {/* Track line background */}
                  <div className="w-full h-[3px] bg-white/10 rounded-sm overflow-hidden animate-pulse">
                    <motion.div
                      className="h-full bg-brand-red rounded-sm"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right Block: Specialized credentials and tech stack */}
          <ScrollReveal variant="slideLeft" className="flex flex-col gap-6 w-full">
            
            {/* Cert 1 card */}
            <div className="bg-brand-panel border border-brand-border rounded-sm p-6 group hover:border-brand-muted/15 transition-all">
              <div className="text-[10px] uppercase tracking-widest text-brand-red-light mb-2 font-semibold flex items-center gap-2 font-sans">
                <Award size={12} /> {t('skillsAccreditation')}
              </div>
              <h4 className="font-serif text-lg font-semibold text-brand-white mb-1.5">
                {t('skillsAccreditationTitle')}
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                {t('skillsAccreditationDesc')}
              </p>
            </div>

            {/* Academic Cred card */}
            <div className="bg-brand-panel border border-brand-border rounded-sm p-6 group hover:border-brand-muted/15 transition-all">
              <div className="text-[10px] uppercase tracking-widest text-brand-red-light mb-2 font-semibold flex items-center gap-2 font-sans">
                <Briefcase size={12} /> {t('skillsEducation')}
              </div>
              <h4 className="font-serif text-lg font-semibold text-brand-white mb-1.5">
                {t('skillsEducationTitle')}
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                {t('skillsEducationDesc')}
              </p>
            </div>

            {/* Chips Grid */}
            <div className="mt-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-muted/70 font-semibold block mb-4 font-mono">
                {t('skillsSoftwareTitle')}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {toolsData.map((tool) => (
                  <motion.div
                    key={tool}
                    whileHover={{ scale: 1.02, borderColor: "rgba(192,57,43,0.45)" }}
                    className="bg-brand-panel border border-brand-border text-xs text-brand-muted text-center py-3.5 rounded-sm uppercase tracking-wider font-semibold hover:text-brand-white transition-all cursor-default font-mono"
                  >
                    {tool}
                  </motion.div>
                ))}
              </div>
            </div>

          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
