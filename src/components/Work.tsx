import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ProjectItem } from '../types';
import { X, ArrowUpRight, Award, HelpCircle, Lightbulb, BarChart2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

function ProjectCardSkeleton({ isWide }: { isWide?: boolean }) {
  return (
    <div
      className={`group bg-brand-panel border border-brand-border rounded-sm overflow-hidden flex flex-col justify-between h-full relative ${
        isWide ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Outer thumbnail placeholder aspect box */}
      <div className="relative aspect-[16/9] overflow-hidden bg-brand-charcoal">
        {/* Modern shifting ambient gradient shimmer */}
        <motion.div
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-white/5 to-transparent skew-x-12"
        />

        {/* Shimmering category tag */}
        <div className="absolute top-4 left-4 bg-brand-black/40 border border-brand-border w-24 h-5 rounded-sm animate-pulse" />
      </div>

      {/* Summary Information Row */}
      <div className="p-5 flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2.5">
          {/* Client & Year mock line */}
          <div className="w-1/3 h-3 bg-brand-border rounded-sm animate-pulse" />
          {/* Title line */}
          <div className="w-3/4 h-5 bg-brand-border rounded-sm animate-pulse" />
        </div>
        
        {/* Circle arrow placeholder shape */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full border border-brand-border bg-brand-border/20 animate-pulse" />
      </div>
    </div>
  );
}

export default function Work() {
  const { t, getProjectsData, language } = useLanguage();
  const projectsData = getProjectsData();
  const [activeFilter, setActiveFilter] = useState<'All' | 'UI/UX' | 'Branding' | 'Video' | 'Photography'>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  const filters: ('All' | 'UI/UX' | 'Branding' | 'Video' | 'Photography')[] = [
    'All',
    'UI/UX',
    'Branding',
    'Video',
    'Photography'
  ];

  const filterLabels: Record<'en' | 'sw', Record<string, string>> = {
    en: {
      All: 'All',
      'UI/UX': 'UI/UX',
      Branding: 'Branding',
      Video: 'Video',
      Photography: 'Photography'
    },
    sw: {
      All: 'Zote',
      'UI/UX': 'UI/UX',
      Branding: 'Chapa',
      Video: 'Video',
      Photography: 'Picha'
    }
  };

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === 'All') return true;
    
    // Check if English categories or Swahili version match. We can easily map checking project.id or using category
    // Under getProjectsData(), we translated category name. Let's make sure our filter compares lower case category smoothly.
    const projectCat = project.category.toLowerCase();
    
    if (activeFilter === 'UI/UX') return projectCat.includes('ui') || projectCat.includes('ux');
    if (activeFilter === 'Branding') return projectCat.includes('brand') || projectCat.includes('chapa');
    if (activeFilter === 'Video') return projectCat.includes('video');
    if (activeFilter === 'Photography') return projectCat.includes('photo') || projectCat.includes('picha');
    
    return projectCat === activeFilter.toLowerCase();
  });

  return (
    <section id="work" className="py-20 md:py-32 px-6 md:px-16 bg-brand-charcoal overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Work Headings and Filters Row with responsive layouts */}
        <ScrollReveal
          variant="slideUp"
          className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-16"
        >
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-brand-red-light mb-4 flex items-center gap-3 font-semibold">
              <span className="inline-block w-8 h-[1px] bg-brand-red-light" />
              {t('workBadge')}
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light leading-tight tracking-tight text-brand-white">
              {t('workTitlePart1')}<span className="font-serif italic text-brand-muted">{t('workTitlePart2')}</span>
            </h2>
          </div>

          {/* Tab Filter Systems */}
          <div className="flex flex-wrap border border-brand-border rounded-sm overflow-hidden self-start">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-3 text-xs tracking-wider uppercase font-semibold border-r border-brand-border last:border-r-0 transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-brand-red text-brand-white'
                    : 'bg-transparent text-brand-muted hover:bg-white/[0.03] hover:text-brand-white'
                }`}
              >
                {filterLabels[language][filter] || filter}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Dynamic Project Grid Layout with custom dimensions */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in"
        >
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              // Display shimmering mockup skeleton project cards during load
              Array.from({ length: filteredProjects.length || 3 }).map((_, idx) => {
                const isWide = idx === 0 && activeFilter === 'All';
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    key={`skeleton-${idx}`}
                    className={isWide ? 'lg:col-span-2' : ''}
                  >
                    <ProjectCardSkeleton isWide={isWide} />
                  </motion.div>
                );
              })
            ) : (
              // Display filtered elements once loaded
              filteredProjects.map((project, idx) => {
                const isFirstWide = idx === 0 && activeFilter === 'All';
                
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    key={project.id}
                    onClick={() => {
                      if (typeof window !== 'undefined' && navigator.vibrate) {
                        navigator.vibrate(15);
                      }
                      setSelectedProject(project);
                    }}
                    className={`group bg-brand-panel border border-brand-border rounded-sm overflow-hidden cursor-pointer flex flex-col justify-between hover:border-brand-muted/20 transition-all duration-300 ${
                      isFirstWide ? 'lg:col-span-2' : ''
                    }`}
                  >
                    {/* Outer thumbnail placeholder gradient container */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#222]">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        /* Stylized text backdrop centered based on Caleb's design */
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.bgStyle} flex items-center justify-center font-display text-7xl md:text-8xl tracking-widest font-extrabold group-hover:scale-105 transition-transform duration-700`}>
                          {project.bgText}
                        </div>
                      )}

                      {/* Dark graphic overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-60" />

                      {/* Work Action Button Hover Display */}
                      <div className="absolute inset-0 bg-brand-black/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-brand-red hover:bg-brand-red-light text-brand-white px-6 py-3 rounded-sm text-xs font-semibold uppercase tracking-widest transition-colors duration-200">
                          {t('workButtonViewCase')}
                        </span>
                      </div>

                      {/* Fast category tag overlays */}
                      <span className="absolute top-4 left-4 bg-brand-black/70 border border-brand-border text-brand-red-light text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm backdrop-blur-sm font-medium">
                        {project.category}
                      </span>
                    </div>

                    {/* Summary Information Row */}
                    <div className="p-5 flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[10px] tracking-wider uppercase text-brand-red-light/85 font-semibold">
                          {project.client} &bull; {project.year}
                        </div>
                        <h4 className="font-serif text-base font-semibold text-brand-white mt-1 group-hover:text-brand-red-light transition-colors">
                          {project.title}
                        </h4>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-muted group-hover:text-brand-red-light group-hover:border-brand-red-light/30 transition-all duration-300">
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>

        {/* Project Case Study Detailed Modal dialog representation */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto select-text">
              {/* Backing screen dimmed overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-brand-black/90 backdrop-blur-md"
              />

              {/* Central layout paper */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative bg-brand-panel border border-brand-border rounded-sm w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 shadow-2xl p-6 md:p-10 my-8 scrollbar-thin"
              >
                {/* Close trigger button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 text-brand-muted hover:text-brand-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer"
                  aria-label="Close Case Study Modal"
                  id="close-modal-btn"
                >
                  <X size={18} />
                </button>

                {/* Project Cover Image inside modal if present */}
                {selectedProject.imageUrl && (
                  <div className="w-full aspect-[21/9] overflow-hidden rounded-sm mb-8 border border-brand-border">
                    <img
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Eyebrow and Title information */}
                <div className="mb-8 pr-12">
                  <span className="text-xs uppercase tracking-widest font-semibold text-brand-red-light bg-brand-red/5 border border-brand-red/15 px-3 py-1 rounded-sm">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-serif text-2xl md:text-4xl text-brand-white font-light mt-4">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Primary project specifications (Grid) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-b border-brand-border py-6 mb-8 bg-brand-charcoal/50 px-4 rounded-sm">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-brand-muted/70 font-medium block">{t('workClient')}</span>
                    <span className="text-xs md:text-sm font-semibold text-brand-white mt-0.5 block">{selectedProject.client}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-brand-muted/70 font-medium block">{language === 'en' ? 'Year Finished' : 'Kukamilika'}</span>
                    <span className="text-xs md:text-sm font-semibold text-brand-white mt-0.5 block">{selectedProject.year}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-brand-muted/70 font-medium block">{t('workRole')}</span>
                    <span className="text-xs md:text-sm font-semibold text-brand-white mt-0.5 block">{selectedProject.role}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-brand-muted/70 font-medium block">{language === 'en' ? 'Deliverables' : 'Vilete vya Kazi'}</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedProject.tags.map((tg) => (
                        <span key={tg} className="text-[9px] uppercase tracking-widest text-brand-red-light bg-brand-red/5 px-1 rounded-sm">
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Narrative split layout columns */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Detailed summary */}
                  <div className="lg:col-span-2">
                    <h5 className="text-xs uppercase tracking-widest text-brand-white font-bold mb-3 flex items-center gap-2">
                      <Award size={14} className="text-brand-red-light" /> {language === 'en' ? 'Project Overview' : 'Muhtasari wa Mradi'}
                    </h5>
                    <p className="text-sm text-brand-muted leading-relaxed mb-6">
                      {selectedProject.desc}
                    </p>

                    {selectedProject.challenges && (
                      <div className="mb-6">
                        <h5 className="text-xs uppercase tracking-widest text-brand-white font-bold mb-3 flex items-center gap-2">
                          <HelpCircle size={14} className="text-brand-red-light" /> {t('workChallenges')}
                        </h5>
                        <p className="text-sm text-brand-muted leading-relaxed">
                          {selectedProject.challenges}
                        </p>
                      </div>
                    )}

                    {selectedProject.solutions && (
                      <div>
                        <h5 className="text-xs uppercase tracking-widest text-brand-white font-bold mb-3 flex items-center gap-2">
                          <Lightbulb size={14} className="text-brand-red-light" /> {t('workSolutions')}
                        </h5>
                        <p className="text-sm text-brand-muted leading-relaxed">
                          {selectedProject.solutions}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right side: Key statistics or call to actions */}
                  <div className="bg-[#121212] border border-brand-border p-6 rounded-sm self-start flex flex-col gap-6">
                    <div>
                      <h5 className="text-xs uppercase tracking-widest text-brand-white font-bold mb-3 flex items-center gap-2 border-b border-brand-border pb-2">
                        <BarChart2 size={14} className="text-brand-red-light" /> {t('workImpact')}
                      </h5>
                      <p className="text-xs text-brand-muted/90 leading-relaxed">
                        {selectedProject.impact || (language === 'en' ? "Provided comprehensive direction and metrics alignments that drove a 100% project compliance and delivery rate across external marketing channels." : "Alitoa mwelekeo kamili na upatanishi wa vipimo vilivyosababisha 100% ya kufuata na kasi ya uwasilishaji wa mradi kwenye njia za uuzaji za nje.")}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        const contactSec = document.getElementById('contact');
                        if (contactSec) {
                          contactSec.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="bg-brand-red hover:bg-brand-red-light text-brand-white w-full py-3.5 rounded-sm text-xs font-semibold uppercase tracking-widest transition-colors duration-200 cursor-pointer text-center"
                    >
                      {language === 'en' ? 'Inquire About Similar Project' : 'Uliza Kuhusu Mradi Sawa'}
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
