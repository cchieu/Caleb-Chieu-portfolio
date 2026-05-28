import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, CheckCircle, Loader2, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';

export default function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Provide tactility feedback during submit initiation
    if (typeof window !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(15);
    }

    if (!formData.name || !formData.email || !formData.message) {
      alert(
        language === 'en'
          ? "Please fill in the required fields (Name, Email, and Message)."
          : "Tafadhali jaza sehemu zinazohitajika (Jina, Barua Pepe, na Ujumbe)."
      );
      return;
    }

    setFormStatus('sending');

    // Simulate sending time to give user amazing micro-feedback
    setTimeout(() => {
      setFormStatus('success');
      // Premium double pulse indicating successful delivery
      if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([15, 60, 15]);
      }
    }, 1200);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      projectType: '',
      budget: '',
      message: ''
    });
    setFormStatus('idle');
  };

  const socialLinks = [
    { label: "Be", url: "#", title: "Behance" },
    { label: "in", url: "#", title: "LinkedIn" },
    { label: "Dr", url: "#", title: "Dribbble" },
    { label: "IG", url: "#", title: "Instagram" },
    { label: "Vi", url: "#", title: "Vimeo" }
  ];

  return (
    <section id="contact" className="py-20 md:py-32 px-6 md:px-16 bg-brand-black overflow-hidden relative">
      <div className="absolute inset-0 grid-lines opacity-[0.03] pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* Left column: narrative contact metadata */}
        <ScrollReveal variant="slideRight" className="flex flex-col w-full">
          <div className="text-xs tracking-[0.2em] uppercase text-brand-red-light mb-4 flex items-center gap-3 font-semibold">
            <span className="inline-block w-8 h-[1px] bg-brand-red-light" />
            {t('contactBadge')}
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-light leading-tight tracking-tight text-brand-white mb-6">
            {language === 'en' ? (
              <>
                Let's Build <span className="font-serif italic text-brand-muted">Something</span> Great
              </>
            ) : (
              <>
                Tujenge <span className="font-serif italic text-brand-muted">Kitu</span> Kipekee
              </>
            )}
          </h2>
          <p className="text-sm md:text-base text-brand-muted/95 leading-relaxed mb-10 max-w-lg">
            {language === 'en'
              ? "Available for freelance projects, creative direction roles, and long-term brand partnerships. Based in Nairobi — working globally."
              : "Napatikana kwa ajili ya miradi ya kujitegemea, majukumu ya uelekezi wa ubunifu, na ushirikiano wa chapa wa muda mrefu. Makao yangu yako Nairobi — nafanya kazi kimataifa."}
          </p>

          {/* Quick info grids */}
          <div className="flex flex-col gap-6 mb-10 select-none">
            
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 border border-brand-border group-hover:border-brand-red-light/35 rounded-sm flex items-center justify-center text-brand-red-light transition-all duration-300">
                <Mail size={16} />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-brand-muted block">
                  {language === 'en' ? 'Email Address' : 'Barua Pepe'}
                </span>
                <a
                  href="mailto:caleb@calebchieu.com"
                  className="text-xs md:text-sm font-semibold text-brand-white group-hover:text-brand-red-light transition-colors duration-200 decoration-0 mt-0.5 block"
                >
                  caleb@calebchieu.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 border border-brand-border rounded-sm flex items-center justify-center text-brand-red-light">
                <MapPin size={16} />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-brand-muted block">
                  {language === 'en' ? 'Current Workspace Location' : 'Mahali pa Kazi'}
                </span>
                <span className="text-xs md:text-sm font-semibold text-brand-white mt-0.5 block">
                  Nairobi, Kenya &bull; UTC+3
                </span>
              </div>
            </div>

          </div>

          {/* Handcrafted social links */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-brand-muted/70 font-semibold block mb-4">
              {language === 'en' ? 'Connect Channels' : 'Njia za Kijamii'}
            </span>
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  title={link.title}
                  id={`social-link-${link.label.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      language === 'en'
                        ? `Redirecting to Caleb's ${link.title} channel...`
                        : `Inakupeleka kwenye ukurasa wa ${link.title} wa Caleb...`
                    );
                  }}
                  className="w-10 h-10 border border-brand-border text-xs text-brand-muted flex items-center justify-center rounded-sm tracking-wider hover:border-brand-red-light hover:text-brand-red-light hover:bg-brand-red/5 transition-all select-none duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Right column: Interactive project intake form */}
        <ScrollReveal variant="slideLeft" className="bg-brand-panel/40 border border-brand-border p-6 md:p-8 rounded-sm shadow-2xl relative min-h-[450px] w-full">
          <AnimatePresence mode="wait">
            {formStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-brand-panel rounded-sm animate-fade-in"
              >
                <CheckCircle size={48} className="text-[#27ae60] mb-4 animate-bounce" />
                <h4 className="font-serif text-xl md:text-2xl font-normal text-brand-white mb-2">
                  {language === 'en' ? 'Message Transmitted!' : 'Ujumbe Umewasilishwa!'}
                </h4>
                <p className="text-xs text-brand-muted max-w-xs leading-relaxed mb-6">
                  {language === 'en' ? (
                    <>
                      Thank you, <b>{formData.name}</b>. Your inquiry regarding the <b>{formData.projectType || 'Creative'}</b> consultation project of budget bracket <b>{formData.budget || 'standard'}</b> is successfully queued. Caleb will get in touch within 24 hours.
                    </>
                  ) : (
                    <>
                      Asante sana, <b>{formData.name}</b>. Ombi lako kuhusu mradi wa <b>{formData.projectType || 'Ubunifu'}</b> wa kiwango cha bajeti <b>{formData.budget || 'kawaida'}</b> imepokewa vema. Caleb atawasiliana nawe ndani ya saa 24.
                    </>
                  )}
                </p>
                <button
                  onClick={handleResetForm}
                  className="bg-brand-red hover:bg-brand-red-light text-brand-white px-6 py-3 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer"
                >
                  {language === 'en' ? 'Send another Inquiry' : 'Tuma Ombi Jingine'}
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleFormSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-brand-muted/70 font-semibold">
                      {language === 'en' ? 'Your Name' : 'Jina Lako'} <span className="text-brand-red-light">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={language === 'en' ? "Your full name" : "Jina lako kamili"}
                      className="bg-brand-panel border border-brand-border rounded-sm py-3 px-4 text-xs md:text-sm text-brand-white outline-none focus:border-brand-red-light/50 transition-colors w-full p-2"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-brand-muted/70 font-semibold">
                      {language === 'en' ? 'Company Name' : 'Jina la Kampuni'}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={language === 'en' ? "Company name" : "Jina la kampuni"}
                      className="bg-brand-panel border border-brand-border rounded-sm py-3 px-4 text-xs md:text-sm text-brand-white outline-none focus:border-brand-red-light/50 transition-colors w-full p-2"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-brand-muted/70 font-semibold">
                    {language === 'en' ? 'Email Address' : 'Barua Pepe'} <span className="text-brand-red-light">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="bg-brand-panel border border-brand-border rounded-sm py-3 px-4 text-xs md:text-sm text-brand-white outline-none focus:border-brand-red-light/50 transition-colors w-full p-2"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-brand-muted/70 font-semibold">
                      {language === 'en' ? 'Project Type' : 'Aina ya Mradi'}
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="bg-brand-panel border border-brand-border rounded-sm py-3 px-4 text-xs md:text-sm text-brand-white outline-none focus:border-brand-red-light/50 transition-colors cursor-pointer w-full p-2"
                    >
                      <option value="" disabled>{language === 'en' ? "Select a service" : "Chagua huduma"}</option>
                      <option value="UI/UX Design">{language === 'en' ? "UI/UX Design" : "Ubunifu wa UI/UX"}</option>
                      <option value="Brand Identity">{language === 'en' ? "Brand Identity" : "Utambulisho wa Chapa"}</option>
                      <option value="Motion Graphics">{language === 'en' ? "Motion Graphics" : "Picha za Mwendo"}</option>
                      <option value="Video Production">{language === 'en' ? "Video Production" : "Utayarishaji wa Video"}</option>
                      <option value="Creative Direction">{language === 'en' ? "Creative Direction" : "Uelekezi wa Ubunifu"}</option>
                      <option value="Photography">{language === 'en' ? "Photography" : "Upigaji Picha"}</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-brand-muted/70 font-semibold">
                      {language === 'en' ? 'Budget Range' : 'Kiwango cha Bajeti'}
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="bg-brand-panel border border-brand-border rounded-sm py-3 px-4 text-xs md:text-sm text-brand-white outline-none focus:border-brand-red-light/50 transition-colors cursor-pointer w-full p-2"
                    >
                      <option value="" disabled>{language === 'en' ? "Select budget" : "Chagua bajeti"}</option>
                      <option value="Under $1,000">{language === 'en' ? "Under $1,000" : "Chini ya $1,000"}</option>
                      <option value="$1,000 – $5,000">$1,000 – $5,000</option>
                      <option value="$5,000 – $15,000">$5,000 – $15,000</option>
                      <option value="$15,000+">$15,000+</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-brand-muted/70 font-semibold">
                    {language === 'en' ? 'Message' : 'Ujumbe'} <span className="text-brand-red-light">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={language === 'en' ? "Tell me about your project..." : "Niambie kuhusu mradi wako..."}
                    className="bg-brand-panel border border-brand-border rounded-sm py-3 px-4 text-xs md:text-sm text-brand-white outline-none focus:border-brand-red-light/50 transition-colors min-h-[120px] resize-y w-full p-2"
                  />
                </div>

                <div className="flex justify-start">
                  <button
                    type="submit"
                    id="submit-form-btn"
                    disabled={formStatus === 'sending'}
                    className="group bg-brand-red hover:bg-brand-red-light text-brand-white px-8 py-4 text-xs tracking-widest uppercase font-semibold border border-brand-red hover:border-brand-red-light rounded-sm flex items-center justify-center gap-3 transition-colors duration-200 cursor-pointer disabled:bg-brand-red/50 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        {language === 'en' ? "Transmitting..." : "Inatuma..."}
                      </>
                    ) : (
                      <>
                        {language === 'en' ? 'Send Message' : 'Tuma Ujumbe'}
                        <Send size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </ScrollReveal>

      </div>
    </section>
  );
}
