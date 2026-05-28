import React, { useState, useEffect } from 'react';
import { Save, AlertTriangle, RotateCcw, Palette, Sparkles, RefreshCw } from 'lucide-react';

interface GlobalsColorsFormProps {
  dbGlobals: Record<string, any>;
  onSave: (docId: string, data: any) => Promise<void>;
  isReadOnly: boolean;
}

interface BrandingColors {
  primaryBrand: string;
  primaryBrandLight: string;
  bgDark: string;
  bgCharcoalDark: string;
  bgPanelDark: string;
  textDark: string;

  primaryBrandLightMode: string;
  primaryBrandLightModeLight: string;
  bgLight: string;
  bgCharcoalLight: string;
  bgPanelLight: string;
  textLight: string;
}

const DEFAULT_COLORS: BrandingColors = {
  primaryBrand: '#7851a9',
  primaryBrandLight: '#9b6fd6',
  bgDark: '#0a0a0a',
  bgCharcoalDark: '#111111',
  bgPanelDark: '#161616',
  textDark: '#f5f2ee',

  primaryBrandLightMode: '#5d3f8a',
  primaryBrandLightModeLight: '#7851a9',
  bgLight: '#faf9f6',
  bgCharcoalLight: '#eeebe5',
  bgPanelLight: '#ffffff',
  textLight: '#0f0a0a',
};

const PRESETS = [
  {
    name: 'Royal Violet (Default)',
    description: 'The elegant original theme with regal purples and rich Obsidian canvas tones.',
    colors: { ...DEFAULT_COLORS }
  },
  {
    name: 'Emerald Cyberpunk',
    description: 'High-tech terminal aesthetic with striking neon green accents and absolute deep-space onyx colors.',
    colors: {
      primaryBrand: '#10b981',
      primaryBrandLight: '#34d399',
      bgDark: '#030712',
      bgCharcoalDark: '#0b0f19',
      bgPanelDark: '#0f172a',
      textDark: '#e2e8f0',

      primaryBrandLightMode: '#059669',
      primaryBrandLightModeLight: '#10b981',
      bgLight: '#f0fdf4',
      bgCharcoalLight: '#e6f4ea',
      bgPanelLight: '#ffffff',
      textLight: '#064e3b',
    }
  },
  {
    name: 'Volcanic Crimson',
    description: 'Hot ember, blood-crimson reds paired with lava-ash volcanic elements and high-energy contrasts.',
    colors: {
      primaryBrand: '#dc2626',
      primaryBrandLight: '#f87171',
      bgDark: '#0a0505',
      bgCharcoalDark: '#140c0c',
      bgPanelDark: '#1c1212',
      textDark: '#fef2f2',

      primaryBrandLightMode: '#991b1b',
      primaryBrandLightModeLight: '#dc2626',
      bgLight: '#fff5f5',
      bgCharcoalLight: '#ffe3e3',
      bgPanelLight: '#ffffff',
      textLight: '#450a0a',
    }
  },
  {
    name: 'Helvetica Blue Modern',
    description: 'Clean mid-century Swiss modernism. Deep cobalt accents, matte industrial black, and high-contrast whites.',
    colors: {
      primaryBrand: '#2563eb',
      primaryBrandLight: '#60a5fa',
      bgDark: '#000000',
      bgCharcoalDark: '#0d0d0d',
      bgPanelDark: '#171717',
      textDark: '#f8fafc',

      primaryBrandLightMode: '#1d4ed8',
      primaryBrandLightModeLight: '#2563eb',
      bgLight: '#f8fafc',
      bgCharcoalLight: '#f1f5f9',
      bgPanelLight: '#ffffff',
      textLight: '#0f172a',
    }
  },
  {
    name: 'Nairobi Amber Sunrise',
    description: 'Warm gold-amber skies paired with rich chocolate-charcoal elements and savannah dust tones.',
    colors: {
      primaryBrand: '#d97706',
      primaryBrandLight: '#fbbf24',
      bgDark: '#0c0702',
      bgCharcoalDark: '#140c03',
      bgPanelDark: '#1d1205',
      textDark: '#fefdfb',

      primaryBrandLightMode: '#b45309',
      primaryBrandLightModeLight: '#d97706',
      bgLight: '#fffdfa',
      bgCharcoalLight: '#fdf6ed',
      bgPanelLight: '#ffffff',
      textLight: '#2c1502',
    }
  }
];

export default function GlobalsColorsForm({ dbGlobals, onSave, isReadOnly }: GlobalsColorsFormProps) {
  const [colors, setColors] = useState<BrandingColors>(() => {
    if (dbGlobals && dbGlobals.colors) {
      return { ...DEFAULT_COLORS, ...dbGlobals.colors };
    }
    return { ...DEFAULT_COLORS };
  });

  const [saving, setSaving] = useState(false);
  const [activeThemeTab, setActiveThemeTab] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (dbGlobals && dbGlobals.colors) {
      setColors({ ...DEFAULT_COLORS, ...dbGlobals.colors });
    }
  }, [dbGlobals]);

  const handleColorChange = (key: keyof BrandingColors, value: string) => {
    setColors(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyPreset = (presetColors: BrandingColors) => {
    if (isReadOnly) return;
    if (confirm("Applying this preset will update all values in the editors. Don't forget to click 'Save Branding Theme Colors' to publish!")) {
      setColors({ ...presetColors });
    }
  };

  const handleResetToDefault = () => {
    if (isReadOnly) return;
    if (confirm("Reset current color variables back to standard Royal Purple default?")) {
      setColors({ ...DEFAULT_COLORS });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave('colors', colors);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border border-brand-border bg-brand-charcoal/20 p-6 rounded-sm space-y-6">
      <div className="pb-4 border-b border-brand-border">
        <h3 className="font-serif text-lg font-light text-brand-white flex items-center gap-2">
          <Palette size={18} className="text-brand-red" />
          BRANDING IDENTITY & THEME COLOR CUSTOMIZER
        </h3>
        <p className="text-xs text-brand-muted font-sans mt-1">
          Dynamically tune standard color accents, backgrounds, text-weights, and canvas colors of your portfolio in real-time.
        </p>
      </div>

      {/* Preset Cards Selection */}
      <div className="space-y-3">
        <span className="text-[11px] font-mono uppercase tracking-wider text-brand-red-light font-bold flex items-center gap-1">
          <Sparkles size={11} /> High-Fidelity Custom Theme Presets
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {PRESETS.map((p, idx) => {
            const isMatch = colors.primaryBrand === p.colors.primaryBrand && colors.bgDark === p.colors.bgDark;
            return (
              <button
                key={idx}
                type="button"
                disabled={isReadOnly}
                onClick={() => applyPreset(p.colors)}
                className={`text-left p-3.5 border transition-all rounded-sm bg-black/30 hover:bg-black/40 flex flex-col justify-between h-full gap-2 cursor-pointer ${
                  isMatch 
                    ? 'border-brand-red ring-1 ring-brand-red' 
                    : 'border-brand-border hover:border-brand-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 justify-between">
                    <span className="text-xs font-mono font-bold text-brand-white truncate">{p.name}</span>
                    <div 
                      className="w-3.5 h-3.5 rounded-full border border-white/20" 
                      style={{ backgroundColor: p.colors.primaryBrand }} 
                    />
                  </div>
                  <p className="text-[10px] text-brand-muted leading-relaxed leading-4 mt-1 line-clamp-3">
                    {p.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-1.5 pt-1 mt-auto border-t border-brand-border/40 justify-between">
                  {/* Miniature color dots banner */}
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: p.colors.bgDark }} title="Dark BG" />
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: p.colors.bgPanelDark }} title="Dark Panel" />
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: p.colors.bgLight }} title="Light BG" />
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: p.colors.primaryBrandLightMode }} title="Light Accent" />
                  </div>
                  {isMatch && (
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-brand-red">Active</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border border-brand-border/60 bg-black/15 p-5 rounded-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-brand-border/30">
            <h4 className="font-mono text-xs tracking-wider uppercase text-brand-red-light font-bold">
              Dynamic Elements Palette Editors
            </h4>

            {/* Sub Theme switch selector tab toggles */}
            <div className="flex border border-brand-border rounded-sm p-0.5 bg-brand-black/40">
              <button
                type="button"
                onClick={() => setActiveThemeTab('dark')}
                className={`px-3 py-1 text-[11px] font-mono uppercase rounded-sm transition-all cursor-pointer ${activeThemeTab === 'dark' ? 'bg-brand-red text-white' : 'text-brand-muted hover:text-brand-white'}`}
              >
                Dark Mode Palette (Default)
              </button>
              <button
                type="button"
                onClick={() => setActiveThemeTab('light')}
                className={`px-3 py-1 text-[11px] font-mono uppercase rounded-sm transition-all cursor-pointer ${activeThemeTab === 'light' ? 'bg-brand-red text-white' : 'text-brand-muted hover:text-brand-white'}`}
              >
                Light Mode Palette Overrides
              </button>
            </div>
          </div>

          {activeThemeTab === 'dark' ? (
            /* DARK THEME EDITORS */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* BRAND COLOR ACCENTS */}
              <div className="space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-brand-muted block">Accent Elements</span>
                
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-brand-muted uppercase flex justify-between">
                    <span>Primary Accent Color</span>
                    <span className="font-bold text-brand-white">{colors.primaryBrand}</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={colors.primaryBrand}
                      onChange={(e) => handleColorChange('primaryBrand', e.target.value)}
                      disabled={isReadOnly}
                      className="w-10 h-8 rounded-sm bg-transparent border border-brand-border p-0.5 cursor-pointer"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={colors.primaryBrand}
                      onChange={(e) => handleColorChange('primaryBrand', e.target.value)}
                      disabled={isReadOnly}
                      className="flex-1 bg-brand-black/60 border border-brand-border rounded-sm px-3 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-brand-muted uppercase flex justify-between">
                    <span>Glow/Light Accent Color</span>
                    <span className="font-bold text-brand-white">{colors.primaryBrandLight}</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={colors.primaryBrandLight}
                      onChange={(e) => handleColorChange('primaryBrandLight', e.target.value)}
                      disabled={isReadOnly}
                      className="w-10 h-8 rounded-sm bg-transparent border border-brand-border p-0.5 cursor-pointer"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={colors.primaryBrandLight}
                      onChange={(e) => handleColorChange('primaryBrandLight', e.target.value)}
                      disabled={isReadOnly}
                      className="flex-1 bg-brand-black/60 border border-brand-border rounded-sm px-3 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* BACKGROUND CANVAS TONES */}
              <div className="space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-brand-muted block">Canvas Surfaces</span>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-brand-muted uppercase flex justify-between">
                    <span>Core Dark Canvas Background</span>
                    <span className="font-bold text-brand-white">{colors.bgDark}</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={colors.bgDark}
                      onChange={(e) => handleColorChange('bgDark', e.target.value)}
                      disabled={isReadOnly}
                      className="w-10 h-8 rounded-sm bg-transparent border border-brand-border p-0.5 cursor-pointer"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={colors.bgDark}
                      onChange={(e) => handleColorChange('bgDark', e.target.value)}
                      disabled={isReadOnly}
                      className="flex-1 bg-brand-black/60 border border-brand-border rounded-sm px-3 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-brand-muted uppercase flex justify-between">
                    <span>Charcoal Highlight Surface</span>
                    <span className="font-bold text-brand-white">{colors.bgCharcoalDark}</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={colors.bgCharcoalDark}
                      onChange={(e) => handleColorChange('bgCharcoalDark', e.target.value)}
                      disabled={isReadOnly}
                      className="w-10 h-8 rounded-sm bg-transparent border border-brand-border p-0.5 cursor-pointer"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={colors.bgCharcoalDark}
                      onChange={(e) => handleColorChange('bgCharcoalDark', e.target.value)}
                      disabled={isReadOnly}
                      className="flex-1 bg-brand-black/60 border border-brand-border rounded-sm px-3 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-brand-muted uppercase flex justify-between">
                    <span>Elevated Widget Card Panel Color</span>
                    <span className="font-bold text-brand-white">{colors.bgPanelDark}</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={colors.bgPanelDark}
                      onChange={(e) => handleColorChange('bgPanelDark', e.target.value)}
                      disabled={isReadOnly}
                      className="w-10 h-8 rounded-sm bg-transparent border border-brand-border p-0.5 cursor-pointer"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={colors.bgPanelDark}
                      onChange={(e) => handleColorChange('bgPanelDark', e.target.value)}
                      disabled={isReadOnly}
                      className="flex-1 bg-brand-black/60 border border-brand-border rounded-sm px-3 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* TYPOGRAPHY COLORS */}
              <div className="space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-brand-muted block">Typography Elements</span>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-brand-muted uppercase flex justify-between">
                    <span>Primary High-Contrast Foreground Text</span>
                    <span className="font-bold text-brand-white">{colors.textDark}</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={colors.textDark}
                      onChange={(e) => handleColorChange('textDark', e.target.value)}
                      disabled={isReadOnly}
                      className="w-10 h-8 rounded-sm bg-transparent border border-brand-border p-0.5 cursor-pointer"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={colors.textDark}
                      onChange={(e) => handleColorChange('textDark', e.target.value)}
                      disabled={isReadOnly}
                      className="flex-1 bg-brand-black/60 border border-brand-border rounded-sm px-3 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* LIGHT THEME EDITORS */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* BRAND COLOR ACCENTS */}
              <div className="space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-brand-muted block">Light Mood Accents</span>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-brand-muted uppercase flex justify-between">
                    <span>Accent Base (Light Mode)</span>
                    <span className="font-bold text-brand-white">{colors.primaryBrandLightMode}</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={colors.primaryBrandLightMode}
                      onChange={(e) => handleColorChange('primaryBrandLightMode', e.target.value)}
                      disabled={isReadOnly}
                      className="w-10 h-8 rounded-sm bg-transparent border border-brand-border p-0.5 cursor-pointer"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={colors.primaryBrandLightMode}
                      onChange={(e) => handleColorChange('primaryBrandLightMode', e.target.value)}
                      disabled={isReadOnly}
                      className="flex-1 bg-brand-black/60 border border-brand-border rounded-sm px-3 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-brand-muted uppercase flex justify-between">
                    <span>Glow/Light Accent (Light Mode)</span>
                    <span className="font-bold text-brand-white">{colors.primaryBrandLightModeLight}</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={colors.primaryBrandLightModeLight}
                      onChange={(e) => handleColorChange('primaryBrandLightModeLight', e.target.value)}
                      disabled={isReadOnly}
                      className="w-10 h-8 rounded-sm bg-transparent border border-brand-border p-0.5 cursor-pointer"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={colors.primaryBrandLightModeLight}
                      onChange={(e) => handleColorChange('primaryBrandLightModeLight', e.target.value)}
                      disabled={isReadOnly}
                      className="flex-1 bg-brand-black/60 border border-brand-border rounded-sm px-3 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* BACKGROUND CANVAS TONES */}
              <div className="space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-brand-muted block">Light Mood Canvas</span>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-brand-muted uppercase flex justify-between">
                    <span>Soft Warm Alabaster Background</span>
                    <span className="font-bold text-brand-white">{colors.bgLight}</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={colors.bgLight}
                      onChange={(e) => handleColorChange('bgLight', e.target.value)}
                      disabled={isReadOnly}
                      className="w-10 h-8 rounded-sm bg-transparent border border-brand-border p-0.5 cursor-pointer"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={colors.bgLight}
                      onChange={(e) => handleColorChange('bgLight', e.target.value)}
                      disabled={isReadOnly}
                      className="flex-1 bg-brand-black/60 border border-brand-border rounded-sm px-3 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-brand-muted uppercase flex justify-between">
                    <span>Charcoal/Warm Gray Surface</span>
                    <span className="font-bold text-brand-white">{colors.bgCharcoalLight}</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={colors.bgCharcoalLight}
                      onChange={(e) => handleColorChange('bgCharcoalLight', e.target.value)}
                      disabled={isReadOnly}
                      className="w-10 h-8 rounded-sm bg-transparent border border-brand-border p-0.5 cursor-pointer"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={colors.bgCharcoalLight}
                      onChange={(e) => handleColorChange('bgCharcoalLight', e.target.value)}
                      disabled={isReadOnly}
                      className="flex-1 bg-brand-black/60 border border-brand-border rounded-sm px-3 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-brand-muted uppercase flex justify-between">
                    <span>Pure White Elevated Panel Color</span>
                    <span className="font-bold text-brand-white">{colors.bgPanelLight}</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={colors.bgPanelLight}
                      onChange={(e) => handleColorChange('bgPanelLight', e.target.value)}
                      disabled={isReadOnly}
                      className="w-10 h-8 rounded-sm bg-transparent border border-brand-border p-0.5 cursor-pointer"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={colors.bgPanelLight}
                      onChange={(e) => handleColorChange('bgPanelLight', e.target.value)}
                      disabled={isReadOnly}
                      className="flex-1 bg-brand-black/60 border border-brand-border rounded-sm px-3 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* TYPOGRAPHY COLORS */}
              <div className="space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-brand-muted block">Light Mood Typography</span>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-brand-muted uppercase flex justify-between">
                    <span>Contrast Dark Foreground Typography</span>
                    <span className="font-bold text-brand-white">{colors.textLight}</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={colors.textLight}
                      onChange={(e) => handleColorChange('textLight', e.target.value)}
                      disabled={isReadOnly}
                      className="w-10 h-8 rounded-sm bg-transparent border border-brand-border p-0.5 cursor-pointer"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={colors.textLight}
                      onChange={(e) => handleColorChange('textLight', e.target.value)}
                      disabled={isReadOnly}
                      className="flex-1 bg-brand-black/60 border border-brand-border rounded-sm px-3 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-brand-border">
          <div className="flex items-center gap-2">
            {!isReadOnly && (
              <button
                type="button"
                onClick={handleResetToDefault}
                className="flex items-center gap-1.5 px-3.5 py-1.5 border border-brand-border text-brand-muted hover:text-brand-white hover:border-brand-white/20 rounded-sm text-xs font-mono transition-colors cursor-pointer"
              >
                <RotateCcw size={12} /> Reset to Royal Purple Theme
              </button>
            )}
            {isReadOnly && (
              <span className="flex items-center gap-1 text-amber-500 bg-amber-950/20 px-2.5 py-1 border border-amber-500/20 rounded-sm text-[11px] font-mono">
                <AlertTriangle size={12} /> Read-Only Mode (Auth privileges required to publish changes)
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isReadOnly || saving}
            className="flex items-center gap-2 px-6 py-2 bg-brand-red hover:bg-brand-red-light disabled:opacity-50 text-white font-medium text-xs tracking-widest uppercase rounded-sm transition-all shadow-md cursor-pointer"
          >
            {saving ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            {saving ? 'Syncing Custom Branding Colors...' : 'Save Branding Theme Colors'}
          </button>
        </div>
      </form>
    </div>
  );
}
