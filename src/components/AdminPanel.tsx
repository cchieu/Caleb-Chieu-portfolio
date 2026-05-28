import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, X, LogOut, Plus, Trash2, Edit, RefreshCw, 
  Database, Image, FileText, LayoutGrid, Check, 
  AlertTriangle, ArrowLeftRight, HelpCircle, Upload, Search
} from 'lucide-react';
import { auth, db, loginWithGoogle, logoutUser, handleFirestoreError, OperationType } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, doc, setDoc, deleteDoc, getDocs, Timestamp } from 'firebase/firestore';
import GlobalsTextForm from './GlobalsTextForm';
import GlobalsListsForm from './GlobalsListsForm';
import GlobalsColorsForm from './GlobalsColorsForm';

// Bounded input validation sizes matching firestore.rules
const VERIFIED_ADMIN_EMAIL = 'calebchieu@gmail.com';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  
  // Tab control: 'projects' | 'services' | 'globals_text' | 'globals_lists' | 'globals_colors'
  const [activeTab, setActiveTab] = useState<'projects' | 'services' | 'globals_text' | 'globals_lists' | 'globals_colors'>('projects');
  
  // Lists from Firestore shadow states to prevent infinite fetching
  const [projects, setProjects] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [dbGlobals, setDbGlobals] = useState<Record<string, any>>({});
  const [listLoading, setListLoading] = useState(false);

  // Form states
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [imageSearchQuery, setImageSearchQuery] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);

  // Default Preset Premium Visual Images
  const PRESET_IMAGES = [
    { name: 'Abstract Purple Tech', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
    { name: 'Minimal Creative Slate', url: 'https://images.unsplash.com/photo-1541462608141-2758a6e4852f?auto=format&fit=crop&w=1200&q=80' },
    { name: 'Brand Storyboards', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80' },
    { name: 'Cinematic Camera Grid', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80' },
    { name: 'High-Altitude Maasai Tiger', url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80' },
  ];

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        if (u.email !== VERIFIED_ADMIN_EMAIL) {
          setAuthError(`Welcome ${u.displayName}. Note: Only ${VERIFIED_ADMIN_EMAIL} is authorized to make write modifications in firestore.`);
        } else {
          setAuthError(null);
        }
        fetchAdminLists();
      }
    });
    return unsub;
  }, []);

  const fetchAdminLists = async () => {
    setListLoading(true);
    try {
      const projectsCol = collection(db, 'projects');
      const servicesCol = collection(db, 'services');
      const globalsCol = collection(db, 'globals');
      
      const [projSnap, servSnap, globalsSnap] = await Promise.all([
        getDocs(projectsCol),
        getDocs(servicesCol),
        getDocs(globalsCol)
      ]);

      const projs = projSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      const servs = servSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      const globs: Record<string, any> = {};
      globalsSnap.docs.forEach(doc => {
        globs[doc.id] = doc.data().data;
      });

      setProjects(projs);
      setServices(servs);
      setDbGlobals(globs);
    } catch (err) {
      console.error("Error retrieving admin lists: ", err);
    } finally {
      setListLoading(false);
    }
  };

  const handleLogin = async () => {
    setAuthError(null);
    try {
      await loginWithGoogle();
      showSuccess("Google Admin login successful!");
    } catch (err: any) {
      setAuthError(err.message || "Failed to authenticate.");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      showSuccess("Sign-out successful.");
    } catch (err: any) {
      console.error(err);
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  const showError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 7000);
  };

  // Seeding Default Data to populate empty collections
  const handleSeedData = async () => {
    if (confirm("Are you sure you want to seed default mock data? This will overwrite collections projects, services, and globals inside Firestore.") === false) return;
    setSeeding(true);
    try {
      const { 
        PROJECTS_TRANSLATIONS, 
        SERVICES_TRANSLATIONS,
        UI_TRANSLATIONS,
        TIMELINE_TRANSLATIONS,
        PROCESS_TRANSLATIONS,
        STATS_TRANSLATIONS,
        SKILLS_TRANSLATIONS,
        TESTIMONIALS_TRANSLATIONS,
        TOOLS_TRANSLATIONS
      } = await import('../context/LanguageContext');
      
      // Save 6 core projects combining translations
      const enProjects = PROJECTS_TRANSLATIONS['en'];
      const swProjects = PROJECTS_TRANSLATIONS['sw'];

      for (let i = 0; i < enProjects.length; i++) {
        const en = enProjects[i];
        const sw = swProjects.find(item => item.id === en.id) || en;
        
        const projDoc = {
          id: en.id,
          title_en: en.title,
          title_sw: sw.title,
          client: en.client,
          category_en: en.category,
          category_sw: sw.category,
          year: en.year,
          role_en: en.role,
          role_sw: sw.role,
          bgText: en.bgText,
          bgStyle: en.bgStyle,
          tags_en: en.tags,
          tags_sw: sw.tags,
          desc_en: en.desc,
          desc_sw: sw.desc,
          challenges_en: en.challenges || "",
          challenges_sw: sw.challenges || "",
          solutions_en: en.solutions || "",
          solutions_sw: sw.solutions || "",
          impact_en: en.impact || "",
          impact_sw: sw.impact || "",
          imageUrl: PRESET_IMAGES[i % PRESET_IMAGES.length].url, // Bind gorgeous realistic preset covers automatically!
          updatedAt: Timestamp.now(),
          updatedBy: auth.currentUser?.uid || 'system_seed'
        };

        await setDoc(doc(db, 'projects', en.id), projDoc);
      }

      // Save 8 core services combining translations
      const enServices = SERVICES_TRANSLATIONS['en'];
      const swServices = SERVICES_TRANSLATIONS['sw'];

      for (let i = 0; i < enServices.length; i++) {
        const en = enServices[i];
        const sw = swServices.find(item => item.num === en.num) || en;

        const servDoc = {
          num: en.num,
          name_en: en.name,
          name_sw: sw.name,
          desc_en: en.desc,
          desc_sw: sw.desc,
          tags_en: en.tags,
          tags_sw: sw.tags,
          iconName: en.iconName,
          updatedAt: Timestamp.now(),
        };

        await setDoc(doc(db, 'services', `service-${en.num}`), servDoc);
      }

      // Save Globals documents inside Firestore
      const globalsToSeed = [
        { id: 'translations', data: UI_TRANSLATIONS },
        { id: 'timeline', data: TIMELINE_TRANSLATIONS },
        { id: 'process', data: PROCESS_TRANSLATIONS },
        { id: 'stats', data: STATS_TRANSLATIONS },
        { id: 'skills', data: SKILLS_TRANSLATIONS },
        { id: 'testimonials', data: TESTIMONIALS_TRANSLATIONS },
        { id: 'tools', data: TOOLS_TRANSLATIONS },
        { id: 'colors', data: {
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
        }}
      ];

      for (const globalItem of globalsToSeed) {
        await setDoc(doc(db, 'globals', globalItem.id), {
          id: globalItem.id,
          data: globalItem.data,
          updatedAt: Timestamp.now()
        });
      }

      showSuccess("Default portfolio data and website globals seeded successfully inside Firestore!");
      fetchAdminLists();
    } catch (err: any) {
      showError("Seed failure: " + err.message);
    } finally {
      setSeeding(false);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1.5 * 1024 * 1024) {
      setImageUploadError('Standard images over 1.5MB should be compressed beforehand to avoid database size limits.');
      return;
    }

    setImageUploadError(null);
    setImageUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === 'string') {
        setEditingProject(prev => prev ? { ...prev, imageUrl: event.target.result } : null);
      }
      setImageUploading(false);
    };
    reader.onerror = () => {
      setImageUploadError('Failed to read local media path.');
      setImageUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleUnsplashSearch = (keyword: string) => {
    if (!keyword.trim()) return;
    const randomSeed = Math.floor(Math.random() * 100000);
    const encoded = encodeURIComponent(keyword.trim().toLowerCase());
    const finalUrl = `https://images.unsplash.com/featured/1200x800/?${encoded}&sig=${randomSeed}`;
    setEditingProject(prev => prev ? { ...prev, imageUrl: finalUrl } : null);
  };

  // Safe action: Project Database operations
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    // Standard client checks before submit
    if (!editingProject.id || !editingProject.title_en || !editingProject.client || !editingProject.category_en || !editingProject.year) {
      showError("Please fill out all required fields: ID slug, Title, Client, Category, and Year.");
      return;
    }

    // Ensure safe alphanumeric slug format
    const slugRegex = /^[a-zA-Z0-9_\-]+$/;
    if (!slugRegex.test(editingProject.id)) {
      showError("ID slug must be alphanumeric, containing only letters, numbers, hyphens or underscores (no spaces!).");
      return;
    }

    try {
      const dataToSave = {
        ...editingProject,
        tags_en: typeof editingProject.tags_en === 'string' ? editingProject.tags_en.split(',').map((t: string) => t.trim()).filter(Boolean) : editingProject.tags_en,
        tags_sw: typeof editingProject.tags_sw === 'string' ? editingProject.tags_sw.split(',').map((t: string) => t.trim()).filter(Boolean) : editingProject.tags_sw,
        updatedAt: Timestamp.now(),
        updatedBy: auth.currentUser?.uid || 'logged_admin'
      };

      await setDoc(doc(db, 'projects', editingProject.id), dataToSave);
      showSuccess(`Project '${editingProject.title_en}' saved successfully.`);
      setEditingProject(null);
      fetchAdminLists();
    } catch (err: any) {
      handleFirestoreError(err, OperationType.UPDATE, `projects/${editingProject.id}`);
    }
  };

  const handleDeleteProject = async (projId: string, title: string) => {
    if (confirm(`Are you absolutely sure you want to delete project: "${title}"? This cannot be undone.`) === false) return;
    try {
      await deleteDoc(doc(db, 'projects', projId));
      showSuccess("Project deleted.");
      fetchAdminLists();
    } catch (err: any) {
      handleFirestoreError(err, OperationType.DELETE, `projects/${projId}`);
    }
  };

  // Safe action: Service Database operations
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    if (!editingService.num || !editingService.name_en || !editingService.desc_en) {
      showError("Please fill out Order Num, English Name, and English Description.");
      return;
    }

    try {
      const dataToSave = {
        ...editingService,
        tags_en: typeof editingService.tags_en === 'string' ? editingService.tags_en.split(',').map((t: string) => t.trim()).filter(Boolean) : editingService.tags_en,
        tags_sw: typeof editingService.tags_sw === 'string' ? editingService.tags_sw.split(',').map((t: string) => t.trim()).filter(Boolean) : editingService.tags_sw,
        updatedAt: Timestamp.now()
      };

      const docId = `service-${editingService.num}`;
      await setDoc(doc(db, 'services', docId), dataToSave);
      showSuccess(`Service '${editingService.name_en}' updated.`);
      setEditingService(null);
      fetchAdminLists();
    } catch (err: any) {
      handleFirestoreError(err, OperationType.UPDATE, `services/service-${editingService.num}`);
    }
  };

  const handleDeleteService = async (servId: string, name: string) => {
    if (confirm(`Are you absolutely sure you want to delete service "${name}"?`) === false) return;
    try {
      await deleteDoc(doc(db, 'services', servId));
      showSuccess("Service deleted.");
      fetchAdminLists();
    } catch (err: any) {
      handleFirestoreError(err, OperationType.DELETE, `services/${servId}`);
    }
  };

  const handleSaveGlobal = async (docId: string, data: any) => {
    try {
      await setDoc(doc(db, 'globals', docId), {
        id: docId,
        data: data,
        updatedAt: Timestamp.now()
      });
      showSuccess(`Global settings for '${docId}' published successfully to Firestore!`);
      fetchAdminLists();
    } catch (err: any) {
      handleFirestoreError(err, OperationType.UPDATE, `globals/${docId}`);
    }
  };

  const startNewProject = () => {
    setEditingProject({
      id: '',
      title_en: '',
      title_sw: '',
      client: '',
      category_en: 'UI/UX',
      category_sw: 'UI/UX',
      year: new Date().getFullYear().toString(),
      role_en: '',
      role_sw: '',
      bgText: '',
      bgStyle: 'from-purple-950 to-indigo-950 text-indigo-500/20',
      tags_en: '',
      tags_sw: '',
      desc_en: '',
      desc_sw: '',
      challenges_en: '',
      challenges_sw: '',
      solutions_en: '',
      solutions_sw: '',
      impact_en: '',
      impact_sw: '',
      imageUrl: ''
    });
  };

  const startNewService = () => {
    setEditingService({
      num: String(services.length + 1).padStart(2, '0'),
      name_en: '',
      name_sw: '',
      desc_en: '',
      desc_sw: '',
      iconName: 'Layout',
      tags_en: '',
      tags_sw: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-black/95 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-brand-panel border border-brand-border rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header bar */}
        <div className="flex items-center justify-between p-6 border-b border-brand-border sticky top-0 bg-brand-panel z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-brand-red/30 bg-brand-red/5 rounded-full text-brand-red-light">
              {user?.email === VERIFIED_ADMIN_EMAIL ? <LayoutGrid size={20} /> : <Lock size={20} />}
            </div>
            <div>
              <h2 className="font-display text-xl uppercase tracking-widest text-brand-white">CMS Admin Control Panel</h2>
              <p className="text-xs text-brand-muted font-mono">Persistence: Google Cloud Firestore</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-brand-muted hover:text-brand-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messaging blocks */}
        {successMsg && (
          <div className="m-6 p-4 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-sm rounded-sm flex items-center gap-2">
            <Check size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="m-6 p-4 bg-red-950/40 border border-red-500/20 text-red-400 text-sm rounded-sm flex items-center gap-2">
            <AlertTriangle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Main Body */}
        <div className="p-6">
          {!user ? (
            /* LOGIN SCREEN */
            <div className="py-20 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
              <Lock size={48} className="text-brand-red-light mb-6 opacity-80 animate-pulse" />
              <h3 className="font-serif text-2xl font-light mb-3 text-brand-white">CMS Access Restricted</h3>
              <p className="text-sm text-brand-muted mb-8 font-sans leading-relaxed">
                Connect your verified credentials via standard Google OAuth Single Sign-on to manage database assets.
              </p>
              
              <button
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-brand-red hover:bg-brand-red-light text-white font-medium text-sm tracking-wider uppercase rounded-sm transition-all shadow-md hover:shadow-brand-red/20 cursor-pointer"
              >
                Sign In with Google Account
              </button>

              {authError && (
                <div className="mt-8 p-3 bg-brand-red/10 border border-brand-red/20 text-brand-red-light text-xs font-mono text-left rounded-sm leading-relaxed">
                  {authError}
                </div>
              )}
            </div>
          ) : (
            /* CONTROL BOARD */
            <div>
              {/* User Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-brand-border bg-brand-charcoal/50 rounded-sm mb-8 gap-4">
                <div className="flex items-center gap-3">
                  {user.photoURL && (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-9 h-9 rounded-full border border-brand-border" referrerPolicy="no-referrer" />
                  )}
                  <div>
                    <h4 className="text-sm font-semibold text-brand-white">{user.displayName}</h4>
                    <p className="text-xs text-brand-muted font-mono">{user.email}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {user.email === VERIFIED_ADMIN_EMAIL ? (
                    <span className="text-[10px] font-mono uppercase tracking-widest bg-emerald-950 border border-emerald-500/30 text-emerald-400 px-2 py-1 rounded-sm">
                      Verified Director Write Privileges
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono uppercase tracking-widest bg-amber-950 border border-amber-500/30 text-amber-400 px-2 py-1 rounded-sm flex items-center gap-1">
                      <AlertTriangle size={12} /> Read-Only Mode
                    </span>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-brand-border hover:border-brand-white/20 text-xs tracking-wider uppercase rounded-sm transition-colors text-brand-white font-mono cursor-pointer"
                  >
                    <LogOut size={13} /> Sign Out
                  </button>
                </div>
              </div>

              {authError && (
                <div className="mb-6 p-4 bg-amber-950/20 border border-amber-500/20 text-amber-300 text-xs rounded-sm leading-relaxed leading-5">
                  <strong>Security Context Statement:</strong> {authError}
                </div>
              )}

              {/* Db controls */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
                {/* Custom Tab Toggles */}
                <div className="flex flex-wrap border border-brand-border rounded-sm p-1 bg-brand-black/30 w-fit gap-1">
                  <button
                    onClick={() => { setActiveTab('projects'); setEditingProject(null); }}
                    className={`px-4 py-2 text-xs tracking-widest uppercase rounded-sm font-medium transition-colors cursor-pointer ${activeTab === 'projects' ? 'bg-brand-red text-white' : 'text-brand-muted hover:text-brand-white'}`}
                  >
                    Showcase Projects ({projects.length})
                  </button>
                  <button
                    onClick={() => { setActiveTab('services'); setEditingService(null); }}
                    className={`px-4 py-2 text-xs tracking-widest uppercase rounded-sm font-medium transition-colors cursor-pointer ${activeTab === 'services' ? 'bg-brand-red text-white' : 'text-brand-muted hover:text-brand-white'}`}
                  >
                    Capabilities & Services ({services.length})
                  </button>
                  <button
                    onClick={() => { setActiveTab('globals_text'); setEditingProject(null); setEditingService(null); }}
                    className={`px-4 py-2 text-xs tracking-widest uppercase rounded-sm font-medium transition-colors cursor-pointer ${activeTab === 'globals_text' ? 'bg-brand-red text-white' : 'text-brand-muted hover:text-brand-white'}`}
                  >
                    UI Text & Translations
                  </button>
                  <button
                    onClick={() => { setActiveTab('globals_lists'); setEditingProject(null); setEditingService(null); }}
                    className={`px-4 py-2 text-xs tracking-widest uppercase rounded-sm font-medium transition-colors cursor-pointer ${activeTab === 'globals_lists' ? 'bg-brand-red text-white' : 'text-brand-muted hover:text-brand-white'}`}
                  >
                    Timeline & Lists
                  </button>
                  <button
                    onClick={() => { setActiveTab('globals_colors'); setEditingProject(null); setEditingService(null); }}
                    className={`px-4 py-2 text-xs tracking-widest uppercase rounded-sm font-medium transition-colors cursor-pointer ${activeTab === 'globals_colors' ? 'bg-brand-red text-white' : 'text-brand-muted hover:text-brand-white'}`}
                  >
                    Theme Colors & Branding
                  </button>
                </div>

                {/* Seed button */}
                <button
                  onClick={handleSeedData}
                  disabled={seeding}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-950/50 hover:bg-purple-950 border border-purple-500/30 text-purple-300 text-xs tracking-wider uppercase font-mono rounded-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Database size={13} className={seeding ? "animate-spin" : ""} />
                  {seeding ? "Injecting Mock Seeds..." : "Reset / Seed Default Portfolio"}
                </button>
              </div>

              {/* LIST / FORM VIEWS */}
              {activeTab === 'projects' && (
                /* PROJECTS SUBSECTION */
                <div>
                  {!editingProject ? (
                    <div>
                      {/* Projects List header */}
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-serif text-lg text-brand-white font-light">Showcase Collections</h3>
                        <button
                          onClick={startNewProject}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-red hover:bg-brand-red-light text-white font-serif text-xs px-4 py-2 tracking-wider rounded-sm cursor-pointer"
                        >
                          <Plus size={15} /> Add New Project Piece
                        </button>
                      </div>

                      {listLoading ? (
                        <div className="py-12 text-center text-brand-muted font-mono text-sm animate-pulse flex items-center justify-center gap-2">
                          <RefreshCw size={16} className="animate-spin" /> Querying Firestore documents...
                        </div>
                      ) : projects.length === 0 ? (
                        <div className="py-16 text-center border border-dashed border-brand-border rounded-sm">
                          <HelpCircle size={32} className="mx-auto text-brand-muted mb-4 opacity-40" />
                          <h4 className="text-brand-white font-medium mb-1">No Projects Declared</h4>
                          <p className="text-xs text-brand-muted mb-4 max-w-sm mx-auto">
                            The Cloud database is currently empty. Tap "Reset / Seed Default Portfolio" above to pre-populate with mock cases instantly!
                          </p>
                        </div>
                      ) : (
                        /* Projects Table Grid */
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {projects.map((proj) => (
                            <div key={proj.id} className="p-4 border border-brand-border bg-brand-charcoal/30 hover:border-brand-white/10 rounded-sm flex items-start justify-between gap-4 transition-all">
                              <div className="flex gap-3">
                                <div className="w-14 h-14 bg-brand-black/50 border border-brand-border rounded-sm flex-shrink-0 overflow-hidden flex items-center justify-center text-brand-muted relative">
                                  {proj.imageUrl ? (
                                    <img src={proj.imageUrl} alt={proj.title_en} className="w-full h-full object-cover" />
                                  ) : (
                                    <span className="text-[10px] font-mono font-bold">{proj.bgText || 'T'}</span>
                                  )}
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold text-brand-white line-clamp-1">{proj.title_en}</h4>
                                  <p className="text-xs text-brand-muted font-mono">{proj.client} • {proj.year}</p>
                                  <span className="text-[10px] font-mono uppercase bg-white/5 border border-brand-border text-brand-muted px-1.5 py-0.5 rounded-sm inline-block mt-2">
                                    {proj.category_en}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setEditingProject(proj)}
                                  className="p-1.5 text-brand-muted hover:text-brand-white hover:bg-white/5 rounded-sm transition-colors cursor-pointer"
                                  title="Edit project"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(proj.id, proj.title_en)}
                                  disabled={user.email !== VERIFIED_ADMIN_EMAIL}
                                  className="p-1.5 text-brand-muted hover:text-red-400 hover:bg-red-950/10 rounded-sm disabled:opacity-30 transition-colors cursor-pointer"
                                  title="Delete project"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* EDIT / CREATE PROJECT FORM */
                    <form onSubmit={handleSaveProject} className="border border-brand-border rounded-sm bg-brand-charcoal/20 p-6 space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                        <h3 className="font-serif text-lg font-light text-brand-white">
                          {editingProject.id ? `Edit Model: ${editingProject.id}` : 'Create Showcase Masterpiece'}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="text-xs font-mono tracking-widest uppercase hover:text-brand-white text-brand-muted flex items-center gap-1 cursor-pointer"
                        >
                          Cancel / Back
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Required IDs & Titles */}
                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">Unique ID Slug (URL slug, write once)*</label>
                          <input
                            type="text"
                            disabled={!!editingProject.updatedAt} // Lock slug in updates
                            value={editingProject.id}
                            onChange={(e) => setEditingProject({ ...editingProject, id: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red disabled:opacity-50 font-mono"
                            placeholder="e.g. aquila-refresh-2023"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">Client Name*</label>
                          <input
                            type="text"
                            value={editingProject.client || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red"
                            placeholder="e.g. Aquila East Africa"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">English Title*</label>
                          <input
                            type="text"
                            value={editingProject.title_en || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, title_en: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red"
                            placeholder="e.g. Aquila East Africa — Corporate Rebrand"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">Swahili Title</label>
                          <input
                            type="text"
                            value={editingProject.title_sw || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, title_sw: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red"
                            placeholder="e.g. Aquila East Africa — Uboreshaji wa Chapa"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">English Category*</label>
                          <select
                            value={editingProject.category_en || 'UI/UX'}
                            onChange={(e) => setEditingProject({ ...editingProject, category_en: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red"
                          >
                            <option value="UI/UX">UI/UX</option>
                            <option value="Branding">Branding</option>
                            <option value="Video">Video Production</option>
                            <option value="Photography">Photography</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">Swahili Category</label>
                          <input
                            type="text"
                            value={editingProject.category_sw || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, category_sw: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red"
                            placeholder="e.g. Ubunifu wa Chapa (sw)"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">Year (e.g. 2023)*</label>
                          <input
                            type="text"
                            value={editingProject.year || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red"
                          />
                        </div>

                        <div className="space-y-2 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 p-3.5 rounded-sm">
                          <label className="block text-xs font-mono uppercase text-amber-500 font-bold">Image Cover Setup Required*</label>
                          <p className="text-[11px] text-brand-muted leading-relaxed">
                            Use the dedicated <strong className="text-white">Premium Cover Visual Manager</strong> below to upload custom files or search thematic imagery from Unsplash in one click.
                          </p>
                        </div>
                      </div>

                      {/* INTEGRATED HIGH-FIDELITY MEDIA MANAGER */}
                      <div className="border border-brand-border bg-brand-charcoal/30 p-5 rounded-sm space-y-5">
                        <div className="border-b border-brand-border/50 pb-3 flex items-center justify-between">
                          <h4 className="font-mono text-xs tracking-wider uppercase text-brand-red-light font-bold flex items-center gap-1.5">
                            <Image size={14} className="text-brand-red" />
                            Premium Cover Visual Manager
                          </h4>
                          <span className="text-[10px] font-mono text-brand-muted">Frontend WYSIWYG Mockup Control</span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                          {/* Image controls: Left 7 cols */}
                          <div className="lg:col-span-7 space-y-4">
                            
                            {/* Method 1: Desktop Drag & Drop / File Select */}
                            <div className="space-y-1.5 animate-fade-in">
                              <span className="block text-[11px] font-mono text-brand-muted uppercase tracking-wider">Method A: Upload Local Image (Desktop)</span>
                              <div className="relative border border-dashed border-brand-border hover:border-brand-red-light/40 rounded-sm bg-brand-black/40 p-5 transition-all group text-center flex flex-col items-center justify-center gap-2">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageFileChange}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                  title="Click or drag image file here"
                                />
                                {imageUploading ? (
                                  <RefreshCw size={24} className="text-brand-red-light animate-spin" />
                                ) : (
                                  <Upload size={24} className="text-brand-muted group-hover:text-brand-red-light transition-colors" />
                                )}
                                <div className="space-y-1">
                                  <p className="text-xs font-semibold text-brand-white">Drag & drop image here or click to browse</p>
                                  <p className="text-[10px] text-brand-muted font-sans font-light">Accepts PNG, JPG, WEBP. Supports instant inline compression (Max 1.5MB)</p>
                                </div>
                              </div>
                              {imageUploadError && (
                                <p className="text-[10px] text-amber-500 font-mono mt-1 flex items-center gap-1">
                                  <AlertTriangle size={10} /> {imageUploadError}
                                </p>
                              )}
                            </div>

                            {/* Method 2: Keyword Unsplash Search */}
                            <div className="space-y-1.5">
                              <span className="block text-[11px] font-mono text-brand-muted uppercase tracking-wider">Method B: Search Aesthetic Covers (Unsplash)</span>
                              <div className="flex gap-2">
                                <div className="relative flex-1">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted">
                                    <Search size={14} />
                                  </span>
                                  <input
                                    type="text"
                                    value={imageSearchQuery}
                                    onChange={(e) => setImageSearchQuery(e.target.value)}
                                    placeholder="e.g. moody cyberpunk, luxury architectural, camera film"
                                    className="w-full bg-brand-black/60 border border-brand-border rounded-sm pl-9 pr-3 py-2 text-xs text-brand-white focus:outline-none focus:border-brand-red font-mono"
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleUnsplashSearch(imageSearchQuery);
                                      }
                                    }}
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleUnsplashSearch(imageSearchQuery)}
                                  className="px-4 py-2 bg-brand-red hover:bg-brand-red-light text-white rounded-sm text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer h-full"
                                >
                                  Fetch Image
                                </button>
                              </div>
                              {/* Search Suggestion Pills */}
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {['Nairobi', 'Abstract Tech', 'Cinematography', 'Minimalist', 'Creative Studio', 'Branding Design'].map((suggestKeyword) => (
                                  <button
                                    key={suggestKeyword}
                                    type="button"
                                    onClick={() => {
                                      setImageSearchQuery(suggestKeyword);
                                      handleUnsplashSearch(suggestKeyword);
                                    }}
                                    className="text-[9px] font-mono text-brand-muted hover:text-brand-white px-2 py-0.5 bg-white/5 border border-brand-border rounded-sm hover:border-brand-white/20 transition-all cursor-pointer"
                                  >
                                    #{suggestKeyword}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Method 3: Direct URL Paste */}
                            <div className="space-y-1.5">
                              <span className="block text-[11px] font-mono text-brand-muted uppercase tracking-wider">Method C: Paste Direct Custom URL</span>
                              <input
                                type="text"
                                value={editingProject.imageUrl || ''}
                                onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                                className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-xs text-brand-white focus:outline-none focus:border-brand-red font-mono"
                                placeholder="https://images.unsplash.com/photo-..."
                              />
                            </div>

                          </div>

                          {/* Preview container: Right 5 cols */}
                          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
                            <div>
                              <span className="block text-[11px] font-mono text-brand-muted uppercase tracking-wider mb-1.5">Live Mockup Preview</span>
                              <div className="relative aspect-[16/9] w-full rounded-sm border border-brand-border bg-gradient-to-br from-[#1a1a1a] to-[#222] overflow-hidden group/preview">
                                {editingProject.imageUrl ? (
                                  <>
                                    <img
                                      src={editingProject.imageUrl}
                                      alt="Cover Preview"
                                      className="absolute inset-0 w-full h-full object-cover animate-fade-in"
                                      referrerPolicy="no-referrer"
                                    />
                                    {/* Mock overlay descriptors */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-3.5">
                                      <span className="text-[8px] font-mono uppercase tracking-widest text-brand-red-light">
                                        {editingProject.client || 'Client Name'} &bull; {editingProject.year || '2026'}
                                      </span>
                                      <h5 className="font-serif text-xs font-semibold text-brand-white truncate mt-0.5">
                                        {editingProject.title_en || 'Project Title Headline'}
                                      </h5>
                                      <span className="absolute top-3 left-3 bg-brand-black/80 border border-brand-border/40 text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm font-mono scale-90 origin-top-left text-brand-red-light">
                                        {editingProject.category_en || 'UI/UX'}
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                    <Image size={24} className="text-brand-muted mb-2 animate-pulse" />
                                    <p className="text-[10px] text-brand-muted uppercase font-mono tracking-wider">No Image Set Yet</p>
                                    <p className="text-[9px] text-brand-muted font-sans mt-0.5">Use upload, search, or preset to add cover art</p>
                                  </div>
                                )}
                              </div>
                            </div>

                            {editingProject.imageUrl && (
                              <button
                                type="button"
                                onClick={() => setEditingProject({ ...editingProject, imageUrl: '' })}
                                className="w-full py-1.5 border border-brand-border hover:border-brand-red/40 hover:text-brand-red text-center text-[10px] font-mono uppercase text-brand-muted rounded-sm transition-colors cursor-pointer"
                              >
                                Clear Cover Image URL
                              </button>
                            )}

                            {/* Info Callout */}
                            <div className="bg-brand-red/5 border border-brand-red/10 p-3 rounded-sm leading-relaxed text-[10px] text-brand-muted leading-4">
                              💡 Changes are synchronized locally in form state instantly. Complete editing your fields, then hit <strong className="text-brand-white font-mono">"Save Project Elements"</strong> below to write permanently to Cloud Firestore!
                            </div>
                          </div>
                        </div>

                        {/* Preset Quick Actions Row */}
                        <div className="pt-3 border-t border-brand-border/40 space-y-2">
                          <span className="block text-[10px] font-mono uppercase tracking-wider text-brand-muted">
                            Quick Premium Preset Selectors
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {PRESET_IMAGES.map((img) => (
                              <button
                                key={img.url}
                                type="button"
                                onClick={() => setEditingProject({ ...editingProject, imageUrl: img.url })}
                                className={`px-2.5 py-1 text-[10px] border rounded-sm font-mono cursor-pointer transition-all ${editingProject.imageUrl === img.url ? 'bg-brand-red text-white border-brand-red' : 'bg-brand-black/40 text-brand-muted border-brand-border hover:border-brand-white/10'}`}
                              >
                                {img.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">English Role (e.g. Creative Director)</label>
                          <input
                            type="text"
                            value={editingProject.role_en || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, role_en: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">Swahili Role</label>
                          <input
                            type="text"
                            value={editingProject.role_sw || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, role_sw: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">Fallback Backdrop Label Code (e.g. AQUILA)</label>
                          <input
                            type="text"
                            value={editingProject.bgText || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, bgText: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red font-mono"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">Fallback Style Gradient Code Classes</label>
                          <input
                            type="text"
                            value={editingProject.bgStyle || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, bgStyle: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red font-mono"
                          />
                        </div>
                      </div>

                      {/* Lists */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">English Tags (comma separated)</label>
                          <input
                            type="text"
                            value={Array.isArray(editingProject.tags_en) ? editingProject.tags_en.join(', ') : editingProject.tags_en || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, tags_en: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red"
                            placeholder="e.g. Branding, Strategy, Assets"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">Swahili Tags (comma separated)</label>
                          <input
                            type="text"
                            value={Array.isArray(editingProject.tags_sw) ? editingProject.tags_sw.join(', ') : editingProject.tags_sw || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, tags_sw: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red"
                            placeholder="e.g. Sifaa, Mkakati"
                          />
                        </div>
                      </div>

                      {/* Text areas descriptions */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted font-bold text-violet-400">English Narrative Overview</label>
                          <textarea
                            value={editingProject.desc_en || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, desc_en: e.target.value })}
                            rows={3}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red resize-none"
                            placeholder="Add core client narrative..."
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted font-bold text-violet-400">Swahili Narrative Overview</label>
                          <textarea
                            value={editingProject.desc_sw || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, desc_sw: e.target.value })}
                            rows={3}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red resize-none"
                            placeholder="Add Swahili narrative description..."
                          />
                        </div>
                      </div>

                      {/* Challenges solutions impact */}
                      <div className="border border-brand-border bg-black/25 p-4 rounded-sm space-y-4">
                        <h4 className="font-mono text-xs tracking-widest text-brand-muted uppercase flex items-center gap-1.5"><FileText size={13} /> Detailed Case Study Segments</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-brand-muted block uppercase">English Challenge</span>
                            <textarea
                              value={editingProject.challenges_en || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, challenges_en: e.target.value })}
                              rows={2}
                              className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-2 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red resize-none"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-brand-muted block uppercase">Swahili Challenge</span>
                            <textarea
                              value={editingProject.challenges_sw || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, challenges_sw: e.target.value })}
                              rows={2}
                              className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-2 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red resize-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-brand-muted block uppercase">English Solution</span>
                            <textarea
                              value={editingProject.solutions_en || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, solutions_en: e.target.value })}
                              rows={2}
                              className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-2 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red resize-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-brand-muted block uppercase">Swahili Solution</span>
                            <textarea
                              value={editingProject.solutions_sw || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, solutions_sw: e.target.value })}
                              rows={2}
                              className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-2 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red resize-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-brand-muted block uppercase">English Impact</span>
                            <textarea
                              value={editingProject.impact_en || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, impact_en: e.target.value })}
                              rows={2}
                              className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-2 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red resize-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-brand-muted block uppercase">Swahili Impact</span>
                            <textarea
                              value={editingProject.impact_sw || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, impact_sw: e.target.value })}
                              rows={2}
                              className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-2 py-1.5 text-xs text-brand-white focus:outline-none focus:border-brand-red resize-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Submit Footer */}
                      <div className="flex justify-end gap-3 pt-4 border-t border-brand-border">
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="px-4 py-2 border border-brand-border text-brand-muted hover:text-brand-white hover:bg-white/5 rounded-sm text-xs font-mono uppercase tracking-widest cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={user.email !== VERIFIED_ADMIN_EMAIL}
                          className="px-6 py-2 bg-brand-red hover:bg-brand-red-light disabled:opacity-50 text-white font-medium text-xs tracking-widest uppercase rounded-sm transition-all shadow-md cursor-pointer"
                        >
                          Save Document in Firestore
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {activeTab === 'services' && (
                /* SERVICES SUBSECTION */
                <div>
                  {!editingService ? (
                    <div>
                      {/* Services List header */}
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-serif text-lg text-brand-white font-light">Design Capabilities</h3>
                        <button
                          onClick={startNewService}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-red hover:bg-brand-red-light text-white font-serif text-xs px-4 py-2 tracking-wider rounded-sm cursor-pointer"
                        >
                          <Plus size={15} /> Add Service Competency
                        </button>
                      </div>

                      {listLoading ? (
                        <div className="py-12 text-center text-brand-muted font-mono text-sm animate-pulse flex items-center justify-center gap-2">
                          <RefreshCw size={16} className="animate-spin" /> Fetching Services database...
                        </div>
                      ) : services.length === 0 ? (
                        <div className="py-16 text-center border border-dashed border-brand-border rounded-sm">
                          <HelpCircle size={32} className="mx-auto text-brand-muted mb-4 opacity-40" />
                          <h4 className="text-brand-white font-medium mb-1">No Services declared</h4>
                          <p className="text-xs text-brand-muted mb-4 max-w-sm mx-auto">
                            The Cloud space shows zero services. Pop with "Reset / Seed Default Portfolio" above to setup automatically!
                          </p>
                        </div>
                      ) : (
                        /* Services List Grid */
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {services.map((serv) => (
                            <div key={serv.id} className="p-4 border border-brand-border bg-brand-charcoal/30 hover:border-brand-white/10 rounded-sm flex items-start justify-between gap-4 transition-all">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-mono font-semibold text-brand-red-light bg-brand-red/5 border border-brand-red/15 px-2 py-0.5 rounded-sm">
                                    {serv.num}
                                  </span>
                                  <h4 className="text-sm font-semibold text-brand-white leading-none">{serv.name_en}</h4>
                                </div>
                                <p className="text-xs text-brand-muted mt-2 line-clamp-2 pr-6 leading-relaxed font-sans">{serv.desc_en}</p>
                              </div>

                              <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                  onClick={() => setEditingService(serv)}
                                  className="p-1.5 text-brand-muted hover:text-brand-white hover:bg-white/5 rounded-sm transition-colors cursor-pointer"
                                  title="Edit service"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteService(serv.id, serv.name_en)}
                                  disabled={user.email !== VERIFIED_ADMIN_EMAIL}
                                  className="p-1.5 text-brand-muted hover:text-red-400 hover:bg-red-950/10 rounded-sm disabled:opacity-30 transition-colors cursor-pointer"
                                  title="Delete service"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* EDIT / CREATE SERVICE FORM */
                    <form onSubmit={handleSaveService} className="border border-brand-border rounded-sm bg-brand-charcoal/20 p-6 space-y-6 animate-fadeIn">
                      <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                        <h3 className="font-serif text-lg font-light text-brand-white">
                          {editingService.id ? `Edit Service Num: ${editingService.num}` : 'Create Service Entry'}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setEditingService(null)}
                          className="text-xs font-mono tracking-widest uppercase hover:text-brand-white text-brand-muted flex items-center gap-1 cursor-pointer"
                        >
                          Cancel / Back
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">Order Index Num (e.g. 01, 02)*</label>
                          <input
                            type="text"
                            value={editingService.num || ''}
                            onChange={(e) => setEditingService({ ...editingService, num: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red font-mono"
                            placeholder="e.g. 01"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">Lucide Icon name string</label>
                          <input
                            type="text"
                            value={editingService.iconName || 'Layout'}
                            onChange={(e) => setEditingService({ ...editingService, iconName: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red font-mono"
                            placeholder="Layout, Compass, Film, Video, Sparkles, Camera, Globe, Users"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">English name*</label>
                          <input
                            type="text"
                            value={editingService.name_en || ''}
                            onChange={(e) => setEditingService({ ...editingService, name_en: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red"
                            placeholder="e.g. Creative Direction"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">Swahili name</label>
                          <input
                            type="text"
                            value={editingService.name_sw || ''}
                            onChange={(e) => setEditingService({ ...editingService, name_sw: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red"
                            placeholder="e.g. Uelekezi wa Ubunifu (sw)"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">English Capabilities (comma separated)</label>
                          <input
                            type="text"
                            value={Array.isArray(editingService.tags_en) ? editingService.tags_en.join(', ') : editingService.tags_en || ''}
                            onChange={(e) => setEditingService({ ...editingService, tags_en: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red"
                            placeholder="Strategy, Team Lead, Art Direction"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">Swahili Capabilities (comma-separated)</label>
                          <input
                            type="text"
                            value={Array.isArray(editingService.tags_sw) ? editingService.tags_sw.join(', ') : editingService.tags_sw || ''}
                            onChange={(e) => setEditingService({ ...editingService, tags_sw: e.target.value })}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red"
                            placeholder="Mkakati, Kiongozi wa Timu, Uelekezi"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">English service description*</label>
                          <textarea
                            value={editingService.desc_en || ''}
                            onChange={(e) => setEditingService({ ...editingService, desc_en: e.target.value })}
                            rows={4}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red resize-none"
                            placeholder="Provide deep description..."
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase text-brand-muted">Swahili Service description</label>
                          <textarea
                            value={editingService.desc_sw || ''}
                            onChange={(e) => setEditingService({ ...editingService, desc_sw: e.target.value })}
                            rows={4}
                            className="w-full bg-brand-black/60 border border-brand-border rounded-sm px-3 py-2 text-sm text-brand-white focus:outline-none focus:border-brand-red resize-none"
                            placeholder="Toa maelezo ya kina (sw)..."
                          />
                        </div>
                      </div>

                      {/* Submit Footer */}
                      <div className="flex justify-end gap-3 pt-4 border-t border-brand-border">
                        <button
                          type="button"
                          onClick={() => setEditingService(null)}
                          className="px-4 py-2 border border-brand-border text-brand-muted hover:text-brand-white hover:bg-white/5 rounded-sm text-xs font-mono uppercase tracking-widest cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={user.email !== VERIFIED_ADMIN_EMAIL}
                          className="px-6 py-2 bg-brand-red hover:bg-brand-red-light disabled:opacity-50 text-white font-medium text-xs tracking-widest uppercase rounded-sm transition-all shadow-md cursor-pointer"
                        >
                          Save Service in Firestore
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {activeTab === 'globals_text' && (
                <GlobalsTextForm 
                  dbGlobals={dbGlobals} 
                  onSave={handleSaveGlobal} 
                  isReadOnly={user.email !== VERIFIED_ADMIN_EMAIL} 
                />
              )}

              {activeTab === 'globals_lists' && (
                <GlobalsListsForm 
                  dbGlobals={dbGlobals} 
                  onSave={handleSaveGlobal} 
                  isReadOnly={user.email !== VERIFIED_ADMIN_EMAIL} 
                />
              )}

              {activeTab === 'globals_colors' && (
                <GlobalsColorsForm 
                  dbGlobals={dbGlobals} 
                  onSave={handleSaveGlobal} 
                  isReadOnly={user.email !== VERIFIED_ADMIN_EMAIL} 
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
