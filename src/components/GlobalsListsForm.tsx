import React, { useState, useEffect } from 'react';
import { Save, AlertTriangle, Plus, Trash2, Globe, Star } from 'lucide-react';
import { 
  TIMELINE_TRANSLATIONS, 
  PROCESS_TRANSLATIONS, 
  STATS_TRANSLATIONS, 
  SKILLS_TRANSLATIONS, 
  TESTIMONIALS_TRANSLATIONS, 
  TOOLS_TRANSLATIONS 
} from '../context/LanguageContext';

interface GlobalsListsFormProps {
  dbGlobals: Record<string, any>;
  onSave: (docId: string, data: any) => Promise<void>;
  isReadOnly: boolean;
}

type ListType = 'timeline' | 'process' | 'stats' | 'skills' | 'testimonials' | 'tools';

export default function GlobalsListsForm({ dbGlobals, onSave, isReadOnly }: GlobalsListsFormProps) {
  const [activeList, setActiveList] = useState<ListType>('timeline');
  const [langTab, setLangTab] = useState<'en' | 'sw'>('en');
  const [saving, setSaving] = useState(false);

  // States for each collection - synced from Firestore or locale fallback
  const [listData, setListData] = useState<Record<string, any>>({
    timeline: {},
    process: {},
    stats: {},
    skills: {},
    testimonials: {},
    tools: {},
  });

  useEffect(() => {
    // Populate with existing Firestore db values or fall back to local translation files
    const getInitial = (key: ListType, fallback: any) => {
      if (dbGlobals && dbGlobals[key]) {
        return JSON.parse(JSON.stringify(dbGlobals[key]));
      }
      return JSON.parse(JSON.stringify(fallback));
    };

    setListData({
      timeline: getInitial('timeline', TIMELINE_TRANSLATIONS),
      process: getInitial('process', PROCESS_TRANSLATIONS),
      stats: getInitial('stats', STATS_TRANSLATIONS),
      skills: getInitial('skills', SKILLS_TRANSLATIONS),
      testimonials: getInitial('testimonials', TESTIMONIALS_TRANSLATIONS),
      tools: getInitial('tools', TOOLS_TRANSLATIONS),
    });
  }, [dbGlobals]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(activeList, listData[activeList]);
    } finally {
      setSaving(false);
    }
  };

  const updateItems = (newItems: any[]) => {
    setListData((prev) => ({
      ...prev,
      [activeList]: {
        ...prev[activeList],
        [langTab]: newItems,
      },
    }));
  };

  const handleAddItem = () => {
    const currentItems = listData[activeList][langTab] || [];
    let newItem: any;

    if (activeList === 'timeline') {
      newItem = { year: '2024', role: 'Designer', company: 'Company Name' };
    } else if (activeList === 'process') {
      newItem = { num: String(currentItems.length + 1).padStart(2, '0'), name: 'New Step', desc: 'Enter description text' };
    } else if (activeList === 'stats') {
      newItem = { num: '1', hasPlus: true, label: 'Standard Count Indicator' };
    } else if (activeList === 'skills') {
      newItem = { name: 'New Skill Name', percentage: 90 };
    } else if (activeList === 'testimonials') {
      newItem = { authorInitials: 'JD', authorName: 'John Doe', authorTitle: 'Marketing Director', text: 'Enter review', rating: 5 };
    } else if (activeList === 'tools') {
      newItem = 'New Tool';
    }

    updateItems([...currentItems, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    const currentItems = listData[activeList][langTab] || [];
    const updated = currentItems.filter((_: any, i: number) => i !== index);
    updateItems(updated);
  };

  const handleFieldChange = (index: number, fieldKey: string, val: any) => {
    const currentItems = listData[activeList][langTab] || [];
    const updated = currentItems.map((item: any, i: number) => {
      if (i === index) {
        if (typeof item === 'object') {
          return { ...item, [fieldKey]: val };
        }
        return val; // Simple string in array
      }
      return item;
    });
    updateItems(updated);
  };

  const LIST_TABS: { key: ListType; label: string }[] = [
    { key: 'timeline', label: 'Milestones & Timeline' },
    { key: 'process', label: 'Design Process Steps' },
    { key: 'stats', label: 'Company Stats Counter' },
    { key: 'skills', label: 'Skills Mastery Sliders' },
    { key: 'testimonials', label: 'Testimonials / Reviews' },
    { key: 'tools', label: 'Tech Stack & Software Tools' },
  ];

  const currentListItems = (listData[activeList] && listData[activeList][langTab]) || [];

  return (
    <div className="border border-brand-border bg-brand-charcoal/20 p-6 rounded-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-brand-border gap-4">
        <div>
          <h3 className="font-serif text-lg font-light text-brand-white"> BILINGUAL DYNAMIC STRUCTURAL LISTS EDITOR</h3>
          <p className="text-xs text-brand-muted font-sans mt-1">
            Reorder, add, or customize complex structural elements inside Firestore instantly.
          </p>
        </div>

        {/* Global lists selector toggle */}
        <div className="flex border border-brand-border rounded-sm p-1 bg-brand-black/40">
          <button
            type="button"
            onClick={() => setLangTab('en')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-mono uppercase rounded-sm transition-all cursor-pointer ${langTab === 'en' ? 'bg-brand-red text-white' : 'text-brand-muted hover:text-brand-white'}`}
          >
            <Globe size={11} /> EN
          </button>
          <button
            type="button"
            onClick={() => setLangTab('sw')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-mono uppercase rounded-sm transition-all cursor-pointer ${langTab === 'sw' ? 'bg-brand-red text-white' : 'text-brand-muted hover:text-brand-white'}`}
          >
            <Globe size={11} /> SW
          </button>
        </div>
      </div>

      {/* Sub menu lists */}
      <div className="flex flex-wrap border-b border-brand-border/30 pb-4 gap-2">
        {LIST_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveList(tab.key)}
            className={`px-3 py-1.5 text-xs font-mono rounded-sm border transition-all cursor-pointer ${activeList === tab.key ? 'bg-brand-red text-white border-brand-red' : 'bg-brand-black/30 text-brand-muted border-brand-border hover:text-brand-white'}`}
          >
            {tab.label} ({listData[tab.key][langTab]?.length || 0})
          </button>
        ))}
      </div>

      {/* Dynamic List Renders */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono tracking-widest text-brand-red-light uppercase font-bold">
            Editing {LIST_TABS.find((t) => t.key === activeList)?.label} [Language: {langTab.toUpperCase()}]
          </span>
          <button
            type="button"
            onClick={handleAddItem}
            className="flex items-center gap-1.5 px-3 py-1 px-4 py-1.5 bg-brand-red hover:bg-brand-red-light text-white font-serif text-xs tracking-wider rounded-sm cursor-pointer"
          >
            <Plus size={14} /> Add Raw Entry
          </button>
        </div>

        <div className="space-y-4">
          {currentListItems.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-brand-border/60 text-brand-muted rounded-sm font-sans text-xs">
              No entries found. Tap "Add Raw Entry" to insert.
            </div>
          ) : (
            currentListItems.map((item: any, idx: number) => (
              <div key={idx} className="p-4 border border-brand-border bg-black/20 rounded-sm flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* (1) TIMELINE VIEW COMPONENT */}
                  {activeList === 'timeline' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-brand-muted uppercase block">Year / Period</span>
                        <input
                          type="text"
                          value={item.year || ''}
                          onChange={(e) => handleFieldChange(idx, 'year', e.target.value)}
                          className="w-full bg-brand-black/40 border border-brand-border rounded-sm px-2.5 py-1 text-xs text-brand-white focus:outline-none focus:border-brand-red"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-brand-muted uppercase block">Professional Role</span>
                        <input
                          type="text"
                          value={item.role || ''}
                          onChange={(e) => handleFieldChange(idx, 'role', e.target.value)}
                          className="w-full bg-brand-black/40 border border-brand-border rounded-sm px-2.5 py-1 text-xs text-brand-white focus:outline-none focus:border-brand-red"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-brand-muted uppercase block">Studio / Agency / Company</span>
                        <input
                          type="text"
                          value={item.company || ''}
                          onChange={(e) => handleFieldChange(idx, 'company', e.target.value)}
                          className="w-full bg-brand-black/40 border border-brand-border rounded-sm px-2.5 py-1 text-xs text-brand-white focus:outline-none focus:border-brand-red"
                        />
                      </div>
                    </div>
                  )}

                  {/* (2) PROCESS STEPS */}
                  {activeList === 'process' && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div className="space-y-1 md:col-span-1">
                        <span className="text-[10px] font-mono text-brand-muted uppercase block">Num Index (01, 02)</span>
                        <input
                          type="text"
                          value={item.num || ''}
                          onChange={(e) => handleFieldChange(idx, 'num', e.target.value)}
                          className="w-full bg-brand-black/40 border border-brand-border rounded-sm px-2.5 py-1 text-xs text-brand-white focus:outline-none focus:border-brand-red font-mono"
                        />
                      </div>
                      <div className="space-y-1 md:col-span-1">
                        <span className="text-[10px] font-mono text-brand-muted uppercase block">Step Name</span>
                        <input
                          type="text"
                          value={item.name || ''}
                          onChange={(e) => handleFieldChange(idx, 'name', e.target.value)}
                          className="w-full bg-brand-black/40 border border-brand-border rounded-sm px-2.5 py-1 text-xs text-brand-white focus:outline-none focus:border-brand-red"
                        />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <span className="text-[10px] font-mono text-brand-muted uppercase block">Short Summary Explanation</span>
                        <input
                          type="text"
                          value={item.desc || ''}
                          onChange={(e) => handleFieldChange(idx, 'desc', e.target.value)}
                          className="w-full bg-brand-black/40 border border-brand-border rounded-sm px-2.5 py-1 text-xs text-brand-white focus:outline-none focus:border-brand-red"
                        />
                      </div>
                    </div>
                  )}

                  {/* (3) STATS COUNTERS */}
                  {activeList === 'stats' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-brand-muted uppercase block">Value Number / Figure</span>
                        <input
                          type="text"
                          value={item.num || ''}
                          onChange={(e) => handleFieldChange(idx, 'num', e.target.value)}
                          className="w-full bg-brand-black/40 border border-brand-border rounded-sm px-2.5 py-1 text-xs text-brand-white focus:outline-none focus:border-brand-red"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-brand-muted uppercase block">Plus Suffix Flag (+)</span>
                        <select
                          value={String(item.hasPlus)}
                          onChange={(e) => handleFieldChange(idx, 'hasPlus', e.target.value === 'true')}
                          className="w-full bg-brand-black/40 border border-brand-border rounded-sm px-2.5 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red font-mono"
                        >
                          <option value="true">Include Plus (+)</option>
                          <option value="false">Exact Number Only</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-brand-muted uppercase block">Metrics Label Caption</span>
                        <input
                          type="text"
                          value={item.label || ''}
                          onChange={(e) => handleFieldChange(idx, 'label', e.target.value)}
                          className="w-full bg-brand-black/40 border border-brand-border rounded-sm px-2.5 py-1 text-xs text-brand-white focus:outline-none focus:border-brand-red"
                        />
                      </div>
                    </div>
                  )}

                  {/* (4) SKILLS MASTERY */}
                  {activeList === 'skills' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-brand-muted uppercase block">Skill / Competency Discipline</span>
                        <input
                          type="text"
                          value={item.name || ''}
                          onChange={(e) => handleFieldChange(idx, 'name', e.target.value)}
                          className="w-full bg-brand-black/40 border border-brand-border rounded-sm px-2.5 py-1 text-xs text-brand-white focus:outline-none focus:border-brand-red"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-brand-muted uppercase block">Proficiency Margin Percentage ({item.percentage}%)</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={item.percentage || 0}
                            onChange={(e) => handleFieldChange(idx, 'percentage', parseInt(e.target.value))}
                            className="w-full accent-brand-red cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* (5) TESTIMONIALS */}
                  {activeList === 'testimonials' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="space-y-1 md:col-span-1">
                          <span className="text-[10px] font-mono text-brand-muted uppercase block">Author Name</span>
                          <input
                            type="text"
                            value={item.authorName || ''}
                            onChange={(e) => handleFieldChange(idx, 'authorName', e.target.value)}
                            className="w-full bg-brand-black/40 border border-brand-border rounded-sm px-3 py-1 text-xs text-brand-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1 md:col-span-1">
                          <span className="text-[10px] font-mono text-brand-muted uppercase block">Initials Avatar</span>
                          <input
                            type="text"
                            maxLength={3}
                            value={item.authorInitials || ''}
                            onChange={(e) => handleFieldChange(idx, 'authorInitials', e.target.value)}
                            className="w-full bg-brand-black/40 border border-brand-border rounded-sm px-3 py-1 text-xs text-brand-white focus:outline-none font-mono text-center"
                          />
                        </div>
                        <div className="space-y-1 md:col-span-1">
                          <span className="text-[10px] font-mono text-brand-muted uppercase block">Designation Title</span>
                          <input
                            type="text"
                            value={item.authorTitle || ''}
                            onChange={(e) => handleFieldChange(idx, 'authorTitle', e.target.value)}
                            className="w-full bg-brand-black/40 border border-brand-border rounded-sm px-3 py-1 text-xs text-brand-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1 md:col-span-1">
                          <span className="text-[10px] font-mono text-brand-muted uppercase block flex items-center gap-0.5"><Star size={10} /> Star Rating</span>
                          <select
                            value={item.rating || 5}
                            onChange={(e) => handleFieldChange(idx, 'rating', parseInt(e.target.value))}
                            className="w-full bg-brand-black/40 border border-brand-border rounded-sm px-2.5 py-1 text-xs text-brand-white focus:outline-none"
                          >
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-brand-muted uppercase block">Bilingual Editorial Quote Content</span>
                        <textarea
                          value={item.text || ''}
                          onChange={(e) => handleFieldChange(idx, 'text', e.target.value)}
                          rows={2}
                          className="w-full bg-brand-black/40 border border-brand-border rounded-sm px-3 py-1 text-xs text-brand-white focus:outline-none resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* (6) TECH TOOLS */}
                  {activeList === 'tools' && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-brand-muted uppercase block">Tool / Technology Brand String</span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleFieldChange(idx, '', e.target.value)}
                        className="w-full bg-brand-black/40 border border-brand-border rounded-sm px-3 py-2 text-xs text-brand-white focus:outline-none focus:border-brand-red font-mono"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveItem(idx)}
                  className="mt-5 p-1 text-brand-muted hover:text-red-400 hover:bg-white/5 rounded-sm transition-colors cursor-pointer"
                  title="Remove segment"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Save Settings Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-brand-border">
        <div className="flex items-center gap-2 text-brand-muted text-[11px] font-mono">
          {isReadOnly && (
            <span className="flex items-center gap-1 text-amber-500 bg-amber-950/20 px-2 py-0.5 border border-amber-500/20 rounded-sm">
              <AlertTriangle size={12} /> Read-Only Mode (Owner clearance required)
            </span>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={isReadOnly || saving || currentListItems.length === 0}
          className="flex items-center gap-2 px-6 py-2 bg-brand-red hover:bg-brand-red-light disabled:opacity-50 text-white font-medium text-xs tracking-widest uppercase rounded-sm transition-all shadow-md cursor-pointer"
        >
          <Save size={14} className={saving ? 'animate-spin' : ''} />
          {saving ? 'Syncing Collection...' : `Publish List Overrides`}
        </button>
      </div>
    </div>
  );
}
