import React, { createContext, useContext, useState, useEffect } from 'react';
import { TimelineItem, ServiceItem, ProjectItem, ProcessItem, StatItem, SkillItem, TestimonialItem } from '../types';

export type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  getTimelineData: () => TimelineItem[];
  getServicesData: () => ServiceItem[];
  getProjectsData: () => ProjectItem[];
  getProcessData: () => ProcessItem[];
  getStatsData: () => StatItem[];
  getSkillsData: () => SkillItem[];
  getTestimonialsData: () => TestimonialItem[];
  getToolsData: () => string[];
}

export const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Header
    navAbout: 'About',
    navServices: 'Services',
    navWork: 'Work',
    navProcess: 'Methodology',
    navCredentials: 'Sifaa', // fallback or customized name matching layout: Credentials or Skills
    navSkills: 'Skills',
    navTestimonials: 'Testimonials',
    navContact: "Let's Talk",
    
    // Theme toggle
    themeLight: 'Activate Light Mode',
    themeDark: 'Activate Dark Mode',

    // Hero
    heroBadge: 'Nairobi, Kenya — Available for Projects',
    heroTitlePart1: 'Creative Director',
    heroTitlePart2: '& UI/UX ',
    heroTitlePart3: 'Designer',
    heroDesc: 'Building digital experiences that merge aesthetics with strategy. Specialising in brand identity, UI/UX design, motion graphics, and video production across East Africa and beyond.',
    heroViewWork: 'View Work',
    heroBookConsult: 'Book a Consultation',
    heroActiveStatus: 'Active',
    heroDesignStrategy: 'Design & Strategy',
    heroScroll: 'Scroll',

    // About
    aboutBadge: 'About Me',
    aboutTitle: '10+ Years of Crafting Stories Through Design',
    aboutDesc: 'I am a multidisciplinary creative professional specialising in UI/UX design, video production, animation, and brand development. With a strong foundation from the University of Nairobi and over a decade of industry experience, I bring a user-centred approach to every project — blending functionality with compelling visual storytelling.',
    aboutPlacard: '"Design is the silent ambassador of your brand."',
    aboutPlacardAuthor: 'Paul Rand',
    aboutSeniorDirector: 'Senior Director',
    aboutExpertiseCount: 'Expertise across 5 Disciplines',

    // Services
    servicesBadge: 'Expertise & Services',
    servicesTitle: 'My Craft',
    servicesDesc: 'A cohesive suite of specialized design disciplines tailored to position brands at the pinnacle of their markets.',
    servicesStartProject: 'Start a Project',

    // Work
    workBadge: 'Selected Works',
    workTitlePart1: 'Featured ',
    workTitlePart2: 'Projects',
    workButtonViewCase: 'View Case Study',
    workViewDetails: 'Case Study Details',
    workChallenges: 'The Challenge',
    workSolutions: 'The Solution',
    workImpact: 'The Impact',
    workClient: 'Client',
    workRole: 'Role / Services',
    workYear: 'Year',
    workClose: 'Close Details',
    workBackToPortfolio: 'Back to Portfolio',

    // Process
    processBadge: 'Methodology',
    processTitle: 'Our Process',
    processDesc: 'Every project follows a rigorous, user-centred process — from discovery through to launch — ensuring outcomes that are both beautiful and business-effective.',

    // Stats
    statsYears: 'Years of Experience',
    statsCompleted: 'Projects Completed',
    statsClients: 'Clients Served',
    statsDisciplines: 'Creative Disciplines',

    // Skills
    skillsBadge: 'Expertise',
    skillsTitle: 'Mastery',
    skillsDesc: 'Combining modern tools with foundational principles to craft flawless interactive systems.',
    skillsSoftwareTitle: 'Core Software Competencies',
    skillsAccreditation: 'Special Accreditation',
    skillsAccreditationTitle: 'Canon Wildlife Masterclass',
    skillsAccreditationDesc: 'Professional wildlife imagery under certified direction of conservationist Paras Chandaria — 2023. Dedicated training in extreme lens configurations, field scoping, & light dynamics.',
    skillsEducation: 'Education',
    skillsEducationTitle: 'BA in Design',
    skillsEducationDesc: 'University of Nairobi, School of Art and Design (2011–2015). Graduated specializing in typography architectures, brand creation theory, and user experience methodologies.',

    // Testimonials
    testimonialsBadge: 'Client Feedback',
    testimonialsTitlePart1: 'What Clients ',
    testimonialsTitlePart2: 'Say',

    // Contact
    contactBadge: 'Get in Touch',
    contactTitlePart1: "Let's Build ",
    contactTitlePart2: 'Something Real',
    contactDesc: "Have a project in mind or looking to collaborate? Reach out to start a conversation about design, strategy, and creative execution.",
    contactSectionTitle: 'Direct Channels',
    contactFormTitle: 'Project Intake Form',
    contactPlaceholderName: 'Your Name',
    contactPlaceholderEmail: 'Your Email',
    contactPlaceholderPhone: 'Your Phone (Optional)',
    contactLabelTimeline: 'Estimated Timeline & Budget',
    contactTimelineSelect: 'Select a project size/period...',
    contactTimelineShort: 'Mini Project (< 2 Weeks)',
    contactTimelineMedium: 'Standard Project (1 - 2 Months)',
    contactTimelineLong: 'Enterprise (> 2 Months)',
    contactPlaceholderMessage: 'Tell me about your project, goals, and needs...',
    contactBtnSending: 'Summoning Signals...',
    contactBtnSend: 'Send Message',
    contactSuccessTitle: 'Message Conveyed!',
    contactSuccessDesc: 'Thank you for your transmission. Caleb will review your creative brief and establish first-contact shortly.',
    contactSuccessBtn: 'Send Another Message',
    contactPhoneLabel: 'Direct Line / WhatsApp',
    contactEmailLabel: 'Official Communications',
    contactLocationLabel: 'Office / Creative Lab',

    // WhatsApp
    whatsappTip: 'Chat on WhatsApp',
    whatsappMessage: 'Hi Caleb, I am interested in discussing a design or video project with you!'
  },
  sw: {
    // Header
    navAbout: 'Kuhusu Mimi',
    navServices: 'Huduma',
    navWork: 'Kazi',
    navProcess: 'Mbinu',
    navCredentials: 'Sifaa', 
    navSkills: 'Ujuzi',
    navTestimonials: 'Maoni',
    navContact: 'Wasiliana',

    // Theme toggle
    themeLight: 'Washa Hali ya Mwangaza',
    themeDark: 'Washa Hali ya Kiza',

    // Hero
    heroBadge: 'Nairobi, Kenya — Napatikana kwa Miradi',
    heroTitlePart1: 'Mkurugenzi wa Ubunifu',
    heroTitlePart2: '& Mbunifu wa ',
    heroTitlePart3: 'UI/UX',
    heroDesc: 'Kujenga mifumo ya kidijitali inayounganisha uzuri na ushawishi wa kimkakati. Ninabobea katika utambulisho wa chapa, ubunifu wa UI/UX, picha za mwendo (motion graphics), na utayarishaji wa video kote Afrika Mashariki na kwingineko.',
    heroViewWork: 'Tazama Kazi',
    heroBookConsult: 'Weka Ushauri',
    heroActiveStatus: 'Yuko Kazi',
    heroDesignStrategy: 'Ubunifu & Mkakati',
    heroScroll: 'Sogelea Chini',

    // About
    aboutBadge: 'Kuhusu Mimi',
    aboutTitle: 'Zaidi ya Miaka 10 ya Kujenga Hadithi Kupitia Ubunifu',
    aboutDesc: 'Mimi ni mtaalamu wa ubunifu wa taaluma mbalimbali nikibobea katika ubunifu wa UI/UX, utayarishaji wa video, misebeko, na uboreshaji wa chapa. Nikiwa na msingi thabiti kutoka Chuo Kikuu cha Nairobi na uzoefu wa zaidi ya muongo mmoja katika tasnia, ninaleta mtazamo unaomlenga mtumiaji katika kila mradi — nikichanganya utendaji na usimulizi wa hadithi za picha zenye kuvutia.',
    aboutPlacard: '"Ubunifu ni balozi wa kimyakimya wa chapa yako."',
    aboutPlacardAuthor: 'Paul Rand',
    aboutSeniorDirector: 'Mkurugenzi Mkuu',
    aboutExpertiseCount: 'Utaalamu wa Taaluma 5',

    // Services
    servicesBadge: 'Utaalamu & Huduma',
    servicesTitle: 'Ufundi Wangu',
    servicesDesc: 'Kifurushi thabiti cha taaluma maalum za ubunifu zilizoundwa ili kuweka chapa katika kilele cha masoko yao.',
    servicesStartProject: 'Anza Mradi',

    // Work
    workBadge: 'Kazi Zilizochaguliwa',
    workTitlePart1: 'Miradi ya ',
    workTitlePart2: 'Kipekee',
    workButtonViewCase: 'Tazama Uchambuzi',
    workViewDetails: 'Maelezo ya Kazi',
    workChallenges: 'Changamoto',
    workSolutions: 'Suluhisho',
    workImpact: 'Matokeo',
    workClient: 'Mteja',
    workRole: 'Wajibu / Huduma',
    workYear: 'Mwaka',
    workClose: 'Funga Maelezo',
    workBackToPortfolio: 'Rudi kwenye Kazi',

    // Process
    processBadge: 'Mbinu',
    processTitle: 'Mchakato Wetu',
    processDesc: 'Kila mradi unafuata mchakato mkali, unaomlenga mtumiaji — kuanzia ugunduzi hadi uzinduzi — ili kuhakikisha matokeo ni mazuri na yenye ufanisi wa kibiashara.',

    // Stats
    statsYears: 'Miaka ya Uzoefu',
    statsCompleted: 'Miradi Iliyokamilika',
    statsClients: 'Wateja Waliotumikiwa',
    statsDisciplines: 'Taaluma za Ubunifu',

    // Skills
    skillsBadge: 'Utaalamu',
    skillsTitle: 'Ustadi',
    skillsDesc: 'Kuchanganya zana za kisasa na kanuni za kimsingi ili kuunda mifumo ya mwingiliano isiyo na makosa.',
    skillsSoftwareTitle: 'Uwezo wa Programu za Msingi',
    skillsAccreditation: 'Sifa Maalum',
    skillsAccreditationTitle: 'Mafunzo ya Canon Wildlife',
    skillsAccreditationDesc: 'Picha za wanyamapori za kitaalamu chini ya mwelekeo uliothibitishwa wa mhifadhi Paras Chandaria — 2023. Mafunzo maalum katika mifumo ya lensi kali, upelelezi wa nyanjani, na mienendo ya mwanga.',
    skillsEducation: 'Elimu',
    skillsEducationTitle: 'Shahada ya Ubunifu',
    skillsEducationDesc: 'Chuo Kikuu cha Nairobi, Shule ya Sanaa na Ubunifu (2011–2015). Alihitimu akibobea katika miundo ya uchapaji, nadharia ya uundaji chapa, na mbinu za uzoefu wa mtumiaji.',

    // Testimonials
    testimonialsBadge: 'Maoni ya Wateja',
    testimonialsTitlePart1: 'Wateja Wanavyo',
    testimonialsTitlePart2: 'sema',

    // Contact
    contactBadge: 'Wasiliana',
    contactTitlePart1: 'Tujenge ',
    contactTitlePart2: 'Kitu Halisi',
    contactDesc: 'Je, una mradi akilini au unatafuta kushirikiana? Wasiliana ili kuanzisha mazungumzo kuhusu ubunifu, mkakati na utekelezaji wa ubunifu.',
    contactSectionTitle: 'Njia za Moja kwa Moja',
    contactFormTitle: 'Fomu ya Kuchukua Mradi',
    contactPlaceholderName: 'Jina Lako',
    contactPlaceholderEmail: 'Barua Pepe Yako',
    contactPlaceholderPhone: 'Simu Yako (Hiari)',
    contactLabelTimeline: 'Muda wa Kukadiria na Bajeti',
    contactTimelineSelect: 'Chagua saizi/kipindi cha mradi...',
    contactTimelineShort: 'Mradi Ndogo (< Wiki 2)',
    contactTimelineMedium: 'Mradi wa Kawaida (Mwezi 1 - 2)',
    contactTimelineLong: 'Mradi Mkubwa (> Miezi 2)',
    contactPlaceholderMessage: 'Niambie kuhusu mradi wako, malengo, na mahitaji yako...',
    contactBtnSending: 'Inapakia Ishara...',
    contactBtnSend: 'Tuma Ujumbe',
    contactSuccessTitle: 'Ujumbe Umewasilishwa!',
    contactSuccessDesc: 'Asante kwa ujumbe wako. Caleb atakagua muhtasari wako wa ubunifu na atawasiliana nawe hivi karibuni.',
    contactSuccessBtn: 'Tuma Ujumbe Mwingine',
    contactPhoneLabel: 'Simu ya Moja kwa Moja / WhatsApp',
    contactEmailLabel: 'Mawasiliano Rasmi',
    contactLocationLabel: 'Ofisi / Maabara ya Ubunifu',

    // WhatsApp
    whatsappTip: 'Zungumza kwenye WhatsApp',
    whatsappMessage: 'Habari Caleb, nataka kujadiliana nawe kuhusu mradi wa ubunifu au video!'
  }
};

export const TIMELINE_TRANSLATIONS: Record<Language, TimelineItem[]> = {
  en: [
    { year: "2019 – Present", role: "Lead Creative", company: "Aquila East Africa" },
    { year: "2015 – 2022", role: "UI/UX Designer", company: "Giktek (Remote)" },
    { year: "2015 – 2019", role: "Graphic Designer", company: "Conquest Capital" },
    { year: "2011 – 2015", role: "BA in Design", company: "University of Nairobi" }
  ],
  sw: [
    { year: "2019 – Sasa", role: "Mbunifu Mkuu", company: "Aquila East Africa" },
    { year: "2015 – 2022", role: "Mbunifu wa UI/UX", company: "Giktek (Kazi ya Mbali)" },
    { year: "2015 – 2019", role: "Mbunifu wa Picha", company: "Conquest Capital" },
    { year: "2011 – 2015", role: "Shahada ya Ubunifu", company: "Chuo Kikuu cha Nairobi" }
  ]
};

export const SERVICES_TRANSLATIONS: Record<Language, ServiceItem[]> = {
  en: [
    {
      num: "01",
      name: "UI/UX Design",
      desc: "Intuitive interfaces and seamless user experiences built around your users' real needs and behaviours.",
      tags: ["Wireframes", "Prototypes", "Design Systems"],
      iconName: "Layout"
    },
    {
      num: "02",
      name: "Brand Identity",
      desc: "Comprehensive brand systems that communicate your values, differentiate you, and build lasting recognition.",
      tags: ["Logo Design", "Guidelines", "Strategy"],
      iconName: "Compass"
    },
    {
      num: "03",
      name: "Motion Graphics",
      desc: "Dynamic animations and motion content that bring brands to life across digital channels and screens.",
      tags: ["After Effects", "Animation", "Explainers"],
      iconName: "Film"
    },
    {
      num: "04",
      name: "Video Production",
      desc: "End-to-end video creation from concept through to final edit, including colour grade and professional post-production.",
      tags: ["Premiere Pro", "Colour Grade", "Reels"],
      iconName: "Video"
    },
    {
      num: "05",
      name: "Creative Direction",
      desc: "Strategic creative leadership — shaping visual direction, managing design squads, and aligning outputs with business goals.",
      tags: ["Strategy", "Team Lead", "Art Direction"],
      iconName: "Sparkles"
    },
    {
      num: "06",
      name: "Photography",
      desc: "Professional photography including wildlife, brand, and product shoots, certified with Canon Wildlife Masterclass.",
      tags: ["Wildlife", "Brand", "Product"],
      iconName: "Camera"
    },
    {
      num: "07",
      name: "Web Design",
      desc: "Visually striking websites designed for conversion, combining strong Swiss typography with functional speed and SEO.",
      tags: ["Figma", "Responsive", "CMS-Ready"],
      iconName: "Globe"
    },
    {
      num: "08",
      name: "Social Campaigns",
      desc: "Cohesive visual campaigns across social platforms designed for high organic engagement, recall, and conversions.",
      tags: ["Content", "Strategy", "Templates"],
      iconName: "Users"
    }
  ],
  sw: [
    {
      num: "01",
      name: "Ubunifu wa UI/UX",
      desc: "Mifumo inayoeleweka kwa urahisi na uzoefu usio na mshono inayojengwa kulingana na mahitaji halisi na tabia za watumiaji wako.",
      tags: ["Ramani (Wireframes)", "Mifano Hai", "Mifumo ya Ubunifu"],
      iconName: "Layout"
    },
    {
      num: "02",
      name: "Utambulisho wa Chapa",
      desc: "Mifumo thabiti ya chapa inayowasiliana na maadili yako, inayokutofautisha na kujenga utambuzi endelevu.",
      tags: ["Ubunifu wa Nembo", "Mongozo wa Chapa", "Mkakati"],
      iconName: "Compass"
    },
    {
      num: "03",
      name: "Picha za Mwendo",
      desc: "Michoro yenye nguvu na maudhui ya picha za mwendo yanayofanya chapa ionekane hai kwenye majukwaa ya kidijitali.",
      tags: ["After Effects", "Misebeko", "Video za Maelezo"],
      iconName: "Film"
    },
    {
      num: "04",
      name: "Utayarishaji wa Video",
      desc: "Uundaji kamili wa video kuanzia wazo hadi hariri ya mwisho, ikijumuisha usanifu wa rangi na kazi ya kitaalamu ya baadaye.",
      tags: ["Premiere Pro", "Kurekebisha Rangi", "Reels za Kijamii"],
      iconName: "Video"
    },
    {
      num: "05",
      name: "Uelekezi wa Ubunifu",
      desc: "Uongozi wa kishujaa na kimkakati — kujenga uelekeo wa mwonekano, kusimamia vikosi vya ubunifu, na kuoanisha matokeo na biashara.",
      tags: ["Mkakati", "Kiongozi wa Timu", "Uelekezi wa Sanaa"],
      iconName: "Sparkles"
    },
    {
      num: "06",
      name: "Upigaji Picha",
      desc: "Upigaji picha wa kitaalamu ikijumuisha picha za wanyamapori, chapa na bidhaa, iliyoidhinishwa na Canon Wildlife Masterclass.",
      tags: ["Wanyamapori", "Chapa ya Biashara", "Bidhaa"],
      iconName: "Camera"
    },
    {
      num: "07",
      name: "Ubunifu wa Wavuti",
      desc: "Tovuti zenye kuvutia zilizoundwa kuongeza mauzo, zikiunganisha maandishi ya kishindo ya Uswisi na kasi ya ufanisi pamoja na SEO.",
      tags: ["Figma", "Tovuti inayojibu", "CMS Nyepesi"],
      iconName: "Globe"
    },
    {
      num: "08",
      name: "Kampeni za Kijamii",
      desc: "Kampeni madhubuti kwenye majukwaa ya kijamii zilizolengwa kwa mwingiliano mkubwa wa asili na kubadilisha watazamaji.",
      tags: ["Maudhui", "Mkakati", "Violezo vya Kazi"],
      iconName: "Users"
    }
  ]
};

export const PROJECTS_TRANSLATIONS: Record<Language, ProjectItem[]> = {
  en: [
    {
      id: "aquila-refresh",
      title: "Aquila East Africa — Brand Refresh",
      client: "Aquila East Africa",
      category: "Branding",
      year: "2023",
      role: "Creative Director",
      bgText: "AQUILA",
      bgStyle: "from-amber-950 to-red-950 text-red-600/25",
      tags: ["Brand Audit", "Visual System", "Identity Guidelines"],
      desc: "A comprehensive modernization of the Aquila East Africa corporate identity. Designed to maintain legacy trust while signaling a forward-thinking pivot into digital-first public relations, marketing, and creative activations.",
      challenges: "The previous brand identity had fragmented layouts and inconsistent color systems across digital resources. We needed to unify the design languages across subsidiaries in Tanzania, Kenya, and Uganda while retaining the core eagle emblem representing precision and local mastery.",
      solutions: "Crafted a sleek, geometric emblem nested with fluid lines, coupled with a high-contrast serif/sans typography structure. Provided a comprehensive guidelines asset portal detailing responsive logo usage, bespoke pattern formulations, and modular event templates.",
      impact: "Resulted in a cohesive 100% brand consistency rating across multi-regional activations. The agency's client acquisition cycle improved after presenting the modernized, premium pitch deck systems."
    },
    {
      id: "giktek-platform",
      title: "Giktek — Digital Platform",
      client: "Giktek Technologies",
      category: "UI/UX",
      year: "2022",
      role: "Lead UI/UX Designer",
      bgText: "GIKTEK",
      bgStyle: "from-blue-950 to-indigo-950 text-indigo-500/20",
      tags: ["Dashboard Design", "User Journeys", "Figma Design System"],
      desc: "An intuitive digital operating matrix built for complex cloud orchestration. Replaced a multi-step command system with a streamlined visual workspace that decreases onboarding friction.",
      challenges: "Operations required navigating dense terminal data and multiple sub-pages to deploy features, resulting in elevated operator errors and a slow, painful learning curve.",
      solutions: "Developed a bento-grid based portal featuring prioritized real-time widgets, high-contrast statuses, and fluid keyboard-driven command trays. Validated the micro-interactions using robust high-fidelity prototypes.",
      impact: "Onboarding time for Junior Cloud Engineers dropped from 3 weeks to 4 days, with user error rates during active server deployments going down by 42% after launch."
    },
    {
      id: "conquest-films",
      title: "Conquest Capital — Brand Films",
      client: "Conquest Capital Limited",
      category: "Video",
      year: "2021",
      role: "Lead Motion Designer",
      bgText: "MOTION",
      bgStyle: "from-stone-900 to-amber-900 text-amber-600/20",
      tags: ["Storyboarding", "3D Animation", "Post-Production"],
      desc: "A series of cinematic motion graphics movies and marketing films explaining high-tier investment packages. Distilled dry, complex financial products into visually striking, rhythmic narratives.",
      challenges: "Explainers were traditionally text-heavy PDF files that failed to hook the attention of Millennial high-net-worth investors on social channels.",
      solutions: "Constructed bold typography layout sequences paired with 3D abstract geometric primitives that animated in lockstep with a bespoke musical track.",
      impact: "Achieved over 250,000 localized video views with positive click-through increases of 18% on specific investment registration pages."
    },
    {
      id: "wildlife-series",
      title: "Wildlife Kenya — Photo Series",
      client: "Self-Initiated (Exhibited)",
      category: "Photography",
      year: "2023",
      role: "Photographer",
      bgText: "WILD",
      bgStyle: "from-emerald-950 to-teal-900 text-emerald-500/20",
      tags: ["Canon R5 Specs", "Wildlife Conservation", "Art Prints"],
      desc: "An intimate photographic essay capturing the elusive big cats of Maasai Mara. Focused on high-contrast lighting of golden hours and low-angle physical perspectives.",
      challenges: "Tracking fast subjects in extreme midday light conditions without disturbing habitats, while demanding extreme focal precision for museum-grade resolution prints.",
      solutions: "Utilized long focal prime systems, careful dawn/dusk scouting, and meticulous post-processing workflow leveraging natural warmth color spectrums.",
      impact: "Exhibited locally in Nairobi and featured in digital conservation journals, raising awareness and conservation donations for localized anti-poaching initiatives."
    },
    {
      id: "fintech-ux",
      title: "Fintech App — User Experience Design",
      client: "Ventures Africa Group",
      category: "UI/UX",
      year: "2023",
      role: "Lead UX Researcher",
      bgText: "UX",
      bgStyle: "from-fuchsia-950 to-pink-900 text-fuchsia-500/25",
      tags: ["Fintech Flow", "Micro-interactions", "High Fidelity"],
      desc: "A localized micro-savings application allowing instant conversions of round-up capital into secure digital bonds. Heavily simplified money-transfers with regional integration engines.",
      challenges: "Low trust in automated banking flows and high drop-offs at the identity validation (KYC) steps.",
      solutions: "Redesigned the KYC process into a pleasant 3-step conversational flow. Introduced tactile audio haptics and beautiful animations signaling successful security completions.",
      impact: "Boosted the customer completion conversion rate during sign-up from 54% to 89% in the first three months."
    },
    {
      id: "corp-campaign",
      title: "Corporate Campaign — Video Series",
      client: "Exp Agency / Safaricom",
      category: "Video",
      year: "2022",
      role: "Videographer & Director",
      bgText: "VIDEO",
      bgStyle: "from-sky-950 to-slate-900 text-sky-500/20",
      tags: ["Interviews", "Ad Campaign", "Social Cutdowns"],
      desc: "Strategic video interviews and masterfully graded corporate campaigns showcasing small-business digital transformation in marginalized sectors.",
      challenges: "Working with non-actors in active workplace environments requiring rapid setting adjustments and highly natural sound-bite capture.",
      solutions: "Crafted dual-camera setups with lightweight continuous lighting modules to keep settings unobtrusive, focusing on conversational guidance rather than rigid scripted lines.",
      impact: "Delivered 12 localized story packages, used natively across national channels that generated 1.2M collective impressions."
    }
  ],
  sw: [
    {
      id: "aquila-refresh",
      title: "Aquila East Africa — Uboreshaji wa Chapa",
      client: "Aquila East Africa",
      category: "Branding",
      year: "2023",
      role: "Mkurugenzi wa Ubunifu",
      bgText: "AQUILA",
      bgStyle: "from-amber-950 to-red-950 text-red-600/25",
      tags: ["Uchambuzi wa Chapa", "Mfumo wa Visual", "Mwongozo wa Utambulisho"],
      desc: "Uboreshaji wa kisasa na kamili wa utambulisho wa shirika la Aquila East Africa. Iliyoundwa ili kudumisha uaminifu wa kihistoria huku ikionyesha mabadiliko ya mbeleni kuelekea mahusiano ya umma ya kidijitali kwanza, masoko, na uanzishaji wa ubunifu.",
      challenges: "Utambulisho wa chapa uliopita ulikuwa na mifumo iliyotawanyika na mifumo ya rangi isiyo thabiti katika nyenzo zote za kidijitali. Tulihitaji kuunganisha lugha za ubunifu katika matawi yote nchini Tanzania, Kenya na Uganda huku tukibakiza nembo ya msingi ya tai inayowakilisha umakini na ustadi wa ndani.",
      solutions: "Tulitengeneza nembo nzuri ya kijiometri iliyowekwa na mistari inayotiririka, ikiambatana na muundo wenye utofauti mkubwa wa maandishi. Tulitoa tovuti ya miongozo inayelezea matumizi tofauti ya nembo, michoro maalum, na violezo vya matukio.",
      impact: "Ilipelekea uthabiti wa chapa wa 100% katika matawi yote ya kikanda. Mzunguko wa upataji wa wateja uliimarika baada ya kuwasilisha miongozo hii mipya ya kisasa."
    },
    {
      id: "giktek-platform",
      title: "Giktek — Jukwaa la Kidijitali",
      client: "Giktek Technologies",
      category: "UI/UX",
      year: "2022",
      role: "Mbunifu Mkuu wa UI/UX",
      bgText: "GIKTEK",
      bgStyle: "from-blue-950 to-indigo-950 text-indigo-500/20",
      tags: ["Ubunifu wa Dashibodi", "Safari za Watumiaji", "Mfumo wa Ubunifu wa Figma"],
      desc: "Matumizi rahisi ya kidijitali yaliyoundwa kwa ajili ya mifumo changamano ya wingu. Ilibadilisha mfumo wa zamani wa amri nyingi kwa kuweka uwanja rahisi wa kazi wa mwonekano unaopunguza muda wa kujifunza.",
      challenges: "Shughuli zilichukua muda mrefu kutokana na kuhitaji kusoma data ngumu ya skrini na kukagua kurasa nyingi ndogo ili kutekeleza kazi, na kusababisha makosa mengi ya wafanyakazi na safari ndefu ya kujifunza.",
      solutions: "Tuliunda tovuti ya bento-grid iliyo na zana za wakati halisi, hali zenye utofauti mkubwa, na mwingiliano rahisi. Tulijaribu mwingiliano mdogo kwa mifano hai ya uaminifu wa juu.",
      impact: "Muda wa kujifunza kwa Wahandisi Wadogo wa Wingu ulipungua kutoka wiki 3 hadi siku 4, huku makosa ya watumiaji yakipungua kwa 42% baada ya kuzinduliwa."
    },
    {
      id: "conquest-films",
      title: "Conquest Capital — Filamu za Chapa",
      client: "Conquest Capital Limited",
      category: "Video",
      year: "2021",
      role: "Mbunifu wa Mwendo Mkuu",
      bgText: "MOTION",
      bgStyle: "from-stone-900 to-amber-900 text-amber-600/20",
      tags: ["Bodi za Hadithi", "Misebeko ya 3D", "Kuhariri Video"],
      desc: "Mfululizo wa video za kisanii za picha za mwendo na filamu za masoko zinazoelezea paket za uwekezaji wa kiwango cha juu. Zilichakata bidhaa changamano za kifedha kuwa hadithi zenye kuvutia.",
      challenges: "Video za maelezo hapo awali zilikuwa faili za PDF zenye maandishi mengi ambazo zilishindwa kuvutia umakini wa wawekezaji vijana wenye mitaji mikubwa kwenye mitandao ya kijamii.",
      solutions: "Tuliunda mfululizo wa muundo thabiti wa maandishi uliooanishwa na maumbo ya kijiometri ya 3D yaliyosonga kwa ushirikiano na muziki maalum.",
      impact: "Tulipata zaidi ya mitandamo 250,000 ya video nchini na ongezeko la 18% kwenye kurasa za usajili wa uwekezaji."
    },
    {
      id: "wildlife-series",
      title: "Wildlife Kenya — Mfululizo wa Picha",
      client: "Iliyojitoleaenyewe",
      category: "Photography",
      year: "2023",
      role: "Mpiga Picha",
      bgText: "WILD",
      bgStyle: "from-emerald-950 to-teal-900 text-emerald-500/20",
      tags: ["Lensi ya Canon R5", "Uhifadhi wa Wanyamapori", "Prints za Sanaa"],
      desc: "Insha ya picha za karibu inayofunua wanyama wenye madoadoa kama chui na simba wa Maasai Mara. Iliangazia mwanga mkali wa saa za dhahabu na picha za pembe za chini.",
      challenges: "Kufuatilia wanyama wenye kasi katika hali mbaya halisi ya mwanga bila kusumbua makazi yao, huku ikihitaji usahihi wa lensi kwa picha za ubora wa juu.",
      solutions: "Tilitumia mifumo ya prime lens ndefu, upelelezi thabiti wa alfajiri na jioni, na kazi nzuri ya uhariri iliyotegemea joto na mwanga wa asili.",
      impact: "Zilionyeshwa katika maonyesho ya picha jijini Nairobi na kwenye majarida ya uhifadhi wa wanyamapori, ikikuza uelewa na michango ya kuzuia ujangili."
    },
    {
      id: "fintech-ux",
      title: "Programu ya Kifedha (Fintech) — Ubunifu wa Uzoefu",
      client: "Ventures Africa Group",
      category: "UI/UX",
      year: "2023",
      role: "Mtafiti Mkuu wa UX",
      bgText: "UX",
      bgStyle: "from-fuchsia-950 to-pink-900 text-fuchsia-500/25",
      tags: ["Uchakataji wa Fintech", "Mwingiliano Ndogo", "Muundo wa Uaminifu"],
      desc: "Programu ya kuweka akiba ndogo inayomwezesha mtumiaji kubadilisha mabadiliko ya ununuzi kuwa dhamana za kidijitali mara moja. Imerahisisha mno utumaji pesa kwa mifumo ya kikanda.",
      challenges: "Uaminifu mdogo kwenye mifumo ya huduma za kiotomatiki za benki na kuacha programu ghafla wakati wa uhakiki wa utambulisho (KYC).",
      solutions: "Tulifanyia maboresho mchakato wa KYC kuwa mazungumzo mepesi ya hatua 3. Tuliongeza milio ya faini na miguso pamoja na michoro mizuri ya kusisimua inayoashiria salama.",
      impact: "Kasi ya kukamilisha usajili iliongezeka kutoka 54% hadi 89% katika miezi mitatu ya kwanza."
    },
    {
      id: "corp-campaign",
      title: "Kampeni ya Shirika — Mfululizo wa Video",
      client: "Exp Agency / Safaricom",
      category: "Video",
      year: "2022",
      role: "Mpiga Video & Mwongozaji",
      bgText: "VIDEO",
      bgStyle: "from-sky-950 to-slate-900 text-sky-500/20",
      tags: ["Mahojiano", "Kampeni za Tangazo", "Video Fupi za Kijamii"],
      desc: "Mahojiano ya video ya kimkakati na kampeni zilizopangiliwa vizuri zinazoonyesha mabadiliko ya kidijitali ya biashara ndogo ndogo katika sekta zilizotengwa.",
      challenges: "Kufanya kazi na watu wasio waigizaji katika mazingira yao ya kufanyia kazi inayohitaji urekebishaji wa haraka wa mazingira na kurekodi sauti za kupendeza kama asili.",
      solutions: "Tuliunda mifumo ya kamera mbili yenye taa nyepesi zinazoendelea ili kuhakikisha huduma haisumbui, tukizingatia kuongoza kwa mazungumzo badala ya kukariri mistari ngumu kabisa.",
      impact: "Tulileta vifurushi 12 vya hadithi za ndani ambavyo vilitumika kwenye vituo vya kitaifa na kutengeneza mitazamo milioni 1.2 kwa jumla."
    }
  ]
};

export const PROCESS_TRANSLATIONS: Record<Language, ProcessItem[]> = {
  en: [
    { num: "01", name: "Discovery", desc: "Intensive workshops to uncover goals, brand ethics, user insights, and technical limits." },
    { num: "02", name: "Research", desc: "Competitive scoping, market analysis, and defining specific user personas." },
    { num: "03", name: "Wireframes", desc: "Creating minimal functional blue-prints prioritizing spatial relationships and clear user flows." },
    { num: "04", name: "Prototype", desc: "Developing interactive high-fidelity user workflows to test layouts with actual users." },
    { num: "05", name: "Visual Design", desc: "Perfecting color systems, micro-interactions, custom layouts, and brand assets." },
    { num: "06", name: "Testing", desc: "Behavior testing, fine-tuning typography sizing, accessibility metrics, and responsiveness." },
    { num: "07", name: "Launch", desc: "Developer handoff with robust design systems, assets, launch support, and ongoing iteration." }
  ],
  sw: [
    { num: "01", name: "Ugunduzi", desc: "Warsha kubwa za kufumbua malengo, maadili ya chapa, uelewa wa watumiaji, na mipaka ya kiteknolojia." },
    { num: "02", name: "Utafiti", desc: "Utafiti wa washindani, uchambuzi wa soko, na kubainisha wasifu maalum wa watumiaji wetu." },
    { num: "03", name: "Mifupa (Wireframes)", desc: "Kuunda ramani ndogo fupi zinazolenga mahusiano ya nafasi na utiririshaji wazi wa mtumiaji." },
    { num: "04", name: "Mipango Hai", desc: "Kuendeleza mifano hai ya uaminifu wa juu ili kujaribu mpangilio na watumiaji halisi." },
    { num: "05", name: "Ubunifu wa Visual", desc: "Kukamilisha mifumo ya rangi, mwingiliano mdogo, mpangilio maalum, na rasilimali za chapa." },
    { num: "06", name: "Majaribio", desc: "Majaribio ya tabia za watumiaji, kurekebisha saizi ya maandishi, upatikanaji kirahisi, na mwitikio wa skrini." },
    { num: "07", name: "Uzinduzi", desc: "Kukabidhi kwa watengenezaji programu mifumo thabiti ya ubunifu, rasilimali, msaada, na uboreshaji endelevu." }
  ]
};

export const STATS_TRANSLATIONS: Record<Language, StatItem[]> = {
  en: [
    { num: "10", hasPlus: true, label: "Years of Experience" },
    { num: "100", hasPlus: true, label: "Projects Completed" },
    { num: "50", hasPlus: true, label: "Clients Served" },
    { num: "5", hasPlus: false, label: "Creative Disciplines" }
  ],
  sw: [
    { num: "10", hasPlus: true, label: "Miaka ya Uzoefu" },
    { num: "100", hasPlus: true, label: "Miradi Iliyokamilika" },
    { num: "50", hasPlus: true, label: "Wateja Waliotumikiwa" },
    { num: "5", hasPlus: false, label: "Taaluma za Ubunifu" }
  ]
};

export const SKILLS_TRANSLATIONS: Record<Language, SkillItem[]> = {
  en: [
    { name: "UI/UX Design", percentage: 95 },
    { name: "Brand Identity", percentage: 92 },
    { name: "Motion Graphics", percentage: 88 },
    { name: "Video Production", percentage: 85 },
    { name: "Photography", percentage: 80 }
  ],
  sw: [
    { name: "Ubunifu wa UI/UX", percentage: 95 },
    { name: "Utambulisho wa Chapa", percentage: 92 },
    { name: "Picha za Mwendo", percentage: 88 },
    { name: "Utayarishaji wa Video", percentage: 85 },
    { name: "Upigaji Picha", percentage: 80 }
  ]
};

export const TESTIMONIALS_TRANSLATIONS: Record<Language, TestimonialItem[]> = {
  en: [
    {
      authorInitials: "AK",
      authorName: "Amara K.",
      authorTitle: "Marketing Director, Aquila East Africa",
      text: "Caleb brought a level of creative intelligence and professionalism to our brand that exceeded every expectation. His ability to translate strategy into compelling visuals is unmatched.",
      rating: 5
    },
    {
      authorInitials: "JM",
      authorName: "James M.",
      authorTitle: "CTO, Giktek",
      text: "The UI/UX work Caleb delivered for our platform completely transformed how users interact with it. Clean, intuitive, and beautifully executed from wireframe to final design.",
      rating: 5
    },
    {
      authorInitials: "SN",
      authorName: "Sarah N.",
      authorTitle: "CEO, Conquest Capital",
      text: "Caleb led our creative team with real vision. He doesn't just design — he thinks strategically and delivers work that drives measurable business results. A genuine creative leader.",
      rating: 5
    }
  ],
  sw: [
    {
      authorInitials: "AK",
      authorName: "Amara K.",
      authorTitle: "Mkurugenzi wa Masoko, Aquila East Africa",
      text: "Caleb alileta kiwango kikubwa cha akili ya ubunifu na taaluma kwa chapa yetu ambayo ilizidi kila matarajio yetu. Uwezo wake wa kutafsiri mkakati kuwa picha ni wa kipekee kabisa.",
      rating: 5
    },
    {
      authorInitials: "JM",
      authorName: "James M.",
      authorTitle: "CTO, Giktek",
      text: "Kazi ya UI/UX ambayo Caleb alileta kwa jukwaa letu ilibadilisha kabisa jinsi watumiaji wanavyoingiliana nalo. Safi, rahisi kueleweka, na kufanywa vizuri kutoka mwanzo hadi mwisho.",
      rating: 5
    },
    {
      authorInitials: "SN",
      authorName: "Sarah N.",
      authorTitle: "CEO, Conquest Capital",
      text: "Caleb aliongoza timu yetu ya ubunifu kwa maono makubwa. Yeye hadizaini tu — anafikiri kimkakati na kufanya kazi inayoleta matokeo ya biashara yanayopimika. Kiongozi wa kweli wa ubunifu.",
      rating: 5
    }
  ]
};

export const TOOLS_TRANSLATIONS: Record<Language, string[]> = {
  en: [
    "Photoshop",
    "Illustrator",
    "Premiere Pro",
    "After Effects",
    "InDesign",
    "Figma",
    "Adobe XD",
    "Photography"
  ],
  sw: [
    "Photoshop",
    "Illustrator",
    "Premiere Pro",
    "After Effects",
    "InDesign",
    "Figma",
    "Adobe XD",
    "Upigaji Picha"
  ]
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('language');
      if (stored === 'sw') return 'sw';
    }
    return 'en';
  });

  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [dbServices, setDbServices] = useState<any[]>([]);
  const [dbGlobals, setDbGlobals] = useState<Record<string, any>>({});

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    let unsubscribeProjects: (() => void) | undefined;
    let unsubscribeServices: (() => void) | undefined;
    let unsubscribeGlobals: (() => void) | undefined;

    const setupListeners = async () => {
      try {
        const { collection, onSnapshot } = await import('firebase/firestore');
        const { db, handleFirestoreError, OperationType } = await import('../lib/firebase');

        unsubscribeProjects = onSnapshot(
          collection(db, 'projects'),
          (snapshot) => {
            const items = snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            setDbProjects(items);
          },
          (error) => {
            handleFirestoreError(error, OperationType.GET, 'projects');
          }
        );

        unsubscribeServices = onSnapshot(
          collection(db, 'services'),
          (snapshot) => {
            const items = snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            setDbServices(items);
          },
          (error) => {
            handleFirestoreError(error, OperationType.GET, 'services');
          }
        );

        unsubscribeGlobals = onSnapshot(
          collection(db, 'globals'),
          (snapshot) => {
            const globalsMap: Record<string, any> = {};
            snapshot.docs.forEach((doc) => {
              globalsMap[doc.id] = doc.data().data;
            });
            setDbGlobals(globalsMap);
          },
          (error) => {
            // Log warning but don't crash, gracefully fallback to defaults
            console.warn("Could not read globals collection, using fallback translations.", error);
          }
        );
      } catch (err) {
        console.warn("Firestore listeners initialization failed (running in offline/fallback mode):", err);
      }
    };

    setupListeners();

    return () => {
      if (unsubscribeProjects) unsubscribeProjects();
      if (unsubscribeServices) unsubscribeServices();
      if (unsubscribeGlobals) unsubscribeGlobals();
    };
  }, []);

  // Synchronize CSS Custom Properties from Firestore branding colors dynamically
  useEffect(() => {
    const existingStyle = document.getElementById('custom-branding-colors');
    if (existingStyle) {
      existingStyle.remove();
    }

    if (dbGlobals.colors) {
      const colors = dbGlobals.colors;
      const primaryBrand = colors.primaryBrand || '#7851a9';
      const primaryBrandLight = colors.primaryBrandLight || '#9b6fd6';
      const bgDark = colors.bgDark || '#0a0a0a';
      const bgCharcoalDark = colors.bgCharcoalDark || '#111111';
      const bgPanelDark = colors.bgPanelDark || '#161616';
      const textDark = colors.textDark || '#f5f2ee';

      const primaryBrandLightMode = colors.primaryBrandLightMode || '#5d3f8a';
      const primaryBrandLightModeLight = colors.primaryBrandLightModeLight || '#7851a9';
      const bgLight = colors.bgLight || '#faf9f6';
      const bgCharcoalLight = colors.bgCharcoalLight || '#eeebe5';
      const bgPanelLight = colors.bgPanelLight || '#ffffff';
      const textLight = colors.textLight || '#0f0a0a';

      const styleEl = document.createElement('style');
      styleEl.id = 'custom-branding-colors';
      styleEl.innerHTML = `
        :root {
          --brand-black: ${bgDark};
          --brand-charcoal: ${bgCharcoalDark};
          --brand-panel: ${bgPanelDark};
          --brand-red: ${primaryBrand};
          --brand-red-light: ${primaryBrandLight};
          --brand-white: ${textDark};
          --color-brand-black: ${bgDark};
          --color-brand-charcoal: ${bgCharcoalDark};
          --color-brand-panel: ${bgPanelDark};
          --color-brand-red: ${primaryBrand};
          --color-brand-red-light: ${primaryBrandLight};
          --color-brand-white: ${textDark};
        }
        html.light {
          --brand-black: ${bgLight};
          --brand-charcoal: ${bgCharcoalLight};
          --brand-panel: ${bgPanelLight};
          --brand-red: ${primaryBrandLightMode};
          --brand-red-light: ${primaryBrandLightModeLight};
          --brand-white: ${textLight};
          --color-brand-black: ${bgLight};
          --color-brand-charcoal: ${bgCharcoalLight};
          --color-brand-panel: ${bgPanelLight};
          --color-brand-red: ${primaryBrandLightMode};
          --color-brand-red-light: ${primaryBrandLightModeLight};
          --color-brand-white: ${textLight};
        }
        body {
          background-color: var(--brand-black) !important;
          color: var(--brand-white) !important;
        }
        html {
          background-color: var(--brand-black) !important;
          color: var(--brand-white) !important;
        }
      `;
      document.head.appendChild(styleEl);
    }
  }, [dbGlobals]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'sw' : 'en'));
  };

  const t = (key: string): string => {
    if (dbGlobals.translations) {
      const overridesByLang = dbGlobals.translations[language] || dbGlobals.translations['en'];
      if (overridesByLang && overridesByLang[key] !== undefined) {
        return overridesByLang[key];
      }
    }
    return UI_TRANSLATIONS[language][key] || UI_TRANSLATIONS['en'][key] || key;
  };

  const getTimelineData = (): TimelineItem[] => {
    if (dbGlobals.timeline) {
      return dbGlobals.timeline[language] || dbGlobals.timeline['en'] || TIMELINE_TRANSLATIONS[language];
    }
    return TIMELINE_TRANSLATIONS[language];
  };

  const getServicesData = (): ServiceItem[] => {
    if (dbServices.length > 0) {
      const sorted = [...dbServices].sort((a, b) => {
        return (a.num || '').localeCompare(b.num || '');
      });
      return sorted.map((s) => {
        const isSwahili = language === 'sw';
        return {
          num: s.num,
          name: isSwahili ? (s.name_sw || s.name_en) : s.name_en,
          desc: isSwahili ? (s.desc_sw || s.desc_en) : s.desc_en,
          tags: isSwahili ? (s.tags_sw || s.tags_en || []) : (s.tags_en || []),
          iconName: s.iconName || 'Layout',
        };
      });
    }
    return SERVICES_TRANSLATIONS[language];
  };

  const getProjectsData = (): ProjectItem[] => {
    if (dbProjects.length > 0) {
      return dbProjects.map((p) => {
        const isSwahili = language === 'sw';
        return {
          id: p.id,
          title: isSwahili ? (p.title_sw || p.title_en) : p.title_en,
          client: p.client,
          category: isSwahili ? (p.category_sw || p.category_en) : p.category_en,
          year: p.year,
          role: isSwahili ? (p.role_sw || p.role_en) : p.role_en,
          bgText: p.bgText || '',
          bgStyle: p.bgStyle || 'from-indigo-950 to-slate-900 text-indigo-500/20',
          tags: isSwahili ? (p.tags_sw || p.tags_en || []) : (p.tags_en || []),
          desc: isSwahili ? (p.desc_sw || p.desc_en) : p.desc_en,
          challenges: isSwahili ? (p.challenges_sw || p.challenges_en) : p.challenges_en,
          solutions: isSwahili ? (p.solutions_sw || p.solutions_en) : p.solutions_en,
          impact: isSwahili ? (p.impact_sw || p.impact_en) : p.impact_en,
          imageUrl: p.imageUrl || '',
        };
      });
    }
    return PROJECTS_TRANSLATIONS[language];
  };

  const getProcessData = (): ProcessItem[] => {
    if (dbGlobals.process) {
      return dbGlobals.process[language] || dbGlobals.process['en'] || PROCESS_TRANSLATIONS[language];
    }
    return PROCESS_TRANSLATIONS[language];
  };

  const getStatsData = (): StatItem[] => {
    if (dbGlobals.stats) {
      return dbGlobals.stats[language] || dbGlobals.stats['en'] || STATS_TRANSLATIONS[language];
    }
    return STATS_TRANSLATIONS[language];
  };

  const getSkillsData = (): SkillItem[] => {
    if (dbGlobals.skills) {
      return dbGlobals.skills[language] || dbGlobals.skills['en'] || SKILLS_TRANSLATIONS[language];
    }
    return SKILLS_TRANSLATIONS[language];
  };

  const getTestimonialsData = (): TestimonialItem[] => {
    if (dbGlobals.testimonials) {
      return dbGlobals.testimonials[language] || dbGlobals.testimonials['en'] || TESTIMONIALS_TRANSLATIONS[language];
    }
    return TESTIMONIALS_TRANSLATIONS[language];
  };

  const getToolsData = (): string[] => {
    if (dbGlobals.tools) {
      return dbGlobals.tools[language] || dbGlobals.tools['en'] || TOOLS_TRANSLATIONS[language];
    }
    return TOOLS_TRANSLATIONS[language];
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        getTimelineData,
        getServicesData,
        getProjectsData,
        getProcessData,
        getStatsData,
        getSkillsData,
        getTestimonialsData,
        getToolsData,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
