import React, { useState, useEffect } from 'react';
import { Save, AlertTriangle, Globe } from 'lucide-react';
import { UI_TRANSLATIONS } from '../context/LanguageContext';

interface GlobalsTextFormProps {
  dbGlobals: Record<string, any>;
  onSave: (docId: string, data: any) => Promise<void>;
  isReadOnly: boolean;
}

export default function GlobalsTextForm({ dbGlobals, onSave, isReadOnly }: GlobalsTextFormProps) {
  const [langTab, setLangTab] = useState<'en' | 'sw'>('en');
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>(() => {
    // Populate with existing Firestore value or fallback to local UI_TRANSLATIONS
    if (dbGlobals && dbGlobals.translations) {
      return JSON.parse(JSON.stringify(dbGlobals.translations));
    }
    return JSON.parse(JSON.stringify(UI_TRANSLATIONS));
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (dbGlobals && dbGlobals.translations) {
      setTranslations(JSON.parse(JSON.stringify(dbGlobals.translations)));
    }
  }, [dbGlobals]);

  const handleFieldChange = (key: string, value: string) => {
    setTranslations((prev) => ({
      ...prev,
      [langTab]: {
        ...prev[langTab],
        [key]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave('translations', translations);
    } finally {
      setSaving(false);
    }
  };

  // Define categorized fields with user-friendly human labels
  const UI_CATEGORIES = [
    {
      title: 'Hero / Header Settings',
      fields: [
        { key: 'heroBadge', label: 'Hero Small Top Badge', type: 'text' },
        { key: 'heroTitlePart1', label: 'Hero Title Paragraph (Part 1)', type: 'text' },
        { key: 'heroTitlePart2', label: 'Hero Title Paragraph (Part 2 - Colored/Highlighted)', type: 'text' },
        { key: 'heroTitlePart3', label: 'Hero Title Paragraph (Part 3)', type: 'text' },
        { key: 'heroDesc', label: 'Hero Subtext Description', type: 'textarea' },
        { key: 'heroViewWork', label: 'Hero Main CTA (View Work Button/Haptic)', type: 'text' },
        { key: 'heroBookConsult', label: 'Hero Secondary CTA (Book Consult Button)', type: 'text' },
      ],
    },
    {
      title: 'About Story & Placard Quote',
      fields: [
        { key: 'aboutBadge', label: 'About Section Small Top Badge', type: 'text' },
        { key: 'aboutTitle', label: 'About Main Heading', type: 'text' },
        { key: 'aboutDesc', label: 'About Body Paragraph / Narrative', type: 'textarea' },
        { key: 'aboutPlacard', label: 'Placard Editorial Block Quote', type: 'textarea' },
        { key: 'aboutPlacardAuthor', label: 'Placard Author Name / Prefix', type: 'text' },
        { key: 'aboutSeniorDirector', label: 'Placard Team Position Label', type: 'text' },
        { key: 'aboutExpertiseCount', label: 'Placard Core Expertise Summary Badge', type: 'text' },
      ],
    },
    {
      title: 'Expertise / Capabilities Section Labels',
      fields: [
        { key: 'servicesBadge', label: 'Services Small Top Badge', type: 'text' },
        { key: 'servicesTitle', label: 'Services Section Title', type: 'text' },
        { key: 'servicesDesc', label: 'Services Subtitle Paragraph', type: 'textarea' },
      ],
    },
    {
      title: 'Showcase Portfolio Section Labels',
      fields: [
        { key: 'workBadge', label: 'Work Small Top Badge', type: 'text' },
        { key: 'workTitlePart1', label: 'Work Section Title (Part 1)', type: 'text' },
        { key: 'workTitlePart2', label: 'Work Section Title (Part 2 - Highlighted)', type: 'text' },
        { key: 'workButtonViewCase', label: 'Case Study Bottom Trigger Button (Vibration Feedback)', type: 'text' },
        { key: 'workViewDetails', label: 'Back to Showcase Details link text', type: 'text' },
      ],
    },
    {
      title: 'Contact Form & Coordinates Labels',
      fields: [
        { key: 'contactBadge', label: 'Contact Section Small Top Badge', type: 'text' },
        { key: 'contactTitlePart1', label: 'Contact Heading (Part 1)', type: 'text' },
        { key: 'contactTitlePart2', label: 'Contact Heading (Part 2 - Colored/Highlighted)', type: 'text' },
        { key: 'contactDesc', label: 'Contact Subtitle Paragraph', type: 'textarea' },
        { key: 'contactSectionTitle', label: 'Contact Coordinates Summary Header', type: 'text' },
        { key: 'contactFormTitle', label: 'Interactive Slate Form Header', type: 'text' },
        { key: 'contactPhoneLabel', label: 'Phone Label', type: 'text' },
        { key: 'contactEmailLabel', label: 'Email Address Label', type: 'text' },
        { key: 'contactLocationLabel', label: 'Location Location Label', type: 'text' },
      ],
    },
    {
      title: 'WhatsApp Sticky Widget Trigger Text',
      fields: [
        { key: 'whatsappTip', label: 'WhatsApp Sticky Tooltip Hint', type: 'text' },
        { key: 'whatsappMessage', label: 'WhatsApp Pre-written Direct Message Template', type: 'textarea' },
      ],
    },
  ];

  return (
    <div className="border border-brand-border bg-brand-charcoal/20 p-6 rounded-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brand-border gap-4">
        <div>
          <h3 className="font-serif text-lg font-light text-brand-white"> BILINGUAL SITEWIDE TEXT & TRANSLATIONS OVERRIDES</h3>
          <p className="text-xs text-brand-muted font-sans mt-1">
            Apply overrides to UI headings, body paragraphs, and direct labels securely across languages.
          </p>
        </div>

        {/* Language selector toggle */}
        <div className="flex border border-brand-border rounded-sm p-1 bg-brand-black/40">
          <button
            type="button"
            onClick={() => setLangTab('en')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-mono uppercase rounded-sm transition-all cursor-pointer ${langTab === 'en' ? 'bg-brand-red text-white' : 'text-brand-muted hover:text-brand-white'}`}
          >
            <Globe size={12} /> English (en)
          </button>
          <button
            type="button"
            onClick={() => setLangTab('sw')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-mono uppercase rounded-sm transition-all cursor-pointer ${langTab === 'sw' ? 'bg-brand-red text-white' : 'text-brand-muted hover:text-brand-white'}`}
          >
            <Globe size={12} /> Swahili (sw)
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {UI_CATEGORIES.map((category, catIdx) => (
          <div key={catIdx} className="border border-brand-border/60 bg-black/15 p-5 rounded-sm space-y-4">
            <h4 className="font-mono text-xs tracking-wider uppercase text-brand-red-light font-bold pb-2 border-b border-brand-border/30">
              {category.title}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.fields.map((field) => {
                const currentValue = (translations[langTab] && translations[langTab][field.key]) || '';

                return (
                  <div key={field.key} className="space-y-1">
                    <label className="block text-[11px] font-mono text-brand-muted uppercase">
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={currentValue}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        rows={3}
                        className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-xs text-brand-white focus:outline-none focus:border-brand-red resize-none"
                        placeholder={`Provide ${langTab === 'en' ? 'English' : 'Swahili'} string override`}
                      />
                    ) : (
                      <input
                        type="text"
                        value={currentValue}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-xs text-brand-white focus:outline-none focus:border-brand-red"
                        placeholder={`Provide ${langTab === 'en' ? 'English' : 'Swahili'} string override`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Submit Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-brand-border">
          <div className="flex items-center gap-2 text-brand-muted text-[11px] font-mono">
            {isReadOnly && (
              <span className="flex items-center gap-1 text-amber-500 bg-amber-950/20 px-2 py-0.5 border border-amber-500/20 rounded-sm">
                <AlertTriangle size={12} /> Read-Only Authorization (calebchieu@gmail.com required)
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isReadOnly || saving}
            className="flex items-center gap-2 px-6 py-2 bg-brand-red hover:bg-brand-red-light disabled:opacity-50 text-white font-medium text-xs tracking-widest uppercase rounded-sm transition-all shadow-md cursor-pointer"
          >
            <Save size={14} className={saving ? 'animate-spin' : ''} />
            {saving ? 'Syncing Translations...' : 'Publish UI Overrides'}
          </button>
        </div>
      </form>
    </div>
  );
}
