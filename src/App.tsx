/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LogoStrip from './components/LogoStrip';
import About from './components/About';
import Services from './components/Services';
import Work from './components/Work';
import Process from './components/Process';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import AdminPanel from './components/AdminPanel';
import SEOManager from './components/SEOManager';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <LanguageProvider>
      {/* ── DYNAMIC SEO & AI AGENT SCRAPER MANAGER ── */}
      <SEOManager />

      <div className="relative min-h-screen bg-brand-black text-brand-white selection:bg-brand-red selection:text-white">
        {/* ── SOLID NOISE GRAIN BACKGROUND OVERLAY ── */}
        <div className="noise-overlay" />

        {/* ── NAVIGATION HEADER ── */}
        <Header />

        {/* ── CORE SINGLE SCREEN PRESENTATIONS ── */}
        <main>
          {/* HERO SECTION */}
          <Hero />

          {/* BRANDS SPONSOR STRIP */}
          <LogoStrip />

          {/* NARRATIVE ABOUT AND TIMELINE WORK EXPERIENCE */}
          <About />

          {/* WORKSHOP SERVICES INDEX */}
          <Services />

          {/* FILTERABLE PORTFOLIO PORTAL SHOWCASE */}
          <Work />

          {/* HOW I WORK PROCESS MAP */}
          <Process />

          {/* STATISTICS SUMMARY COUNTER */}
          <Stats />

          {/* SKILLS CHIPS AND ANIMATED PROGRESS TRACKS */}
          <Skills />

          {/* TESTIMONIALS & TRUST STATEMENTS */}
          <Testimonials />

          {/* INTERACTIVE FORM REQUIREMENT AND CHANNELS PORTAL */}
          <Contact />
        </main>

        {/* ── FOOTER & COPYRIGHT ANCHORS ── */}
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

        {/* ── FLOATING GREEN CHAT BUBBLE ── */}
        <WhatsAppFAB />

        {/* ── CMS ADMIN PORTAL PANEL ── */}
        <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      </div>
    </LanguageProvider>
  );
}
