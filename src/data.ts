import { TimelineItem, ServiceItem, ProjectItem, ProcessItem, StatItem, SkillItem, TestimonialItem } from './types';

export const timelineData: TimelineItem[] = [
  {
    year: "2019 – Present",
    role: "Lead Creative",
    company: "Aquila East Africa"
  },
  {
    year: "2015 – 2022",
    role: "UI/UX Designer",
    company: "Giktek (Remote)"
  },
  {
    year: "2015 – 2019",
    role: "Graphic Designer",
    company: "Conquest Capital"
  },
  {
    year: "2011 – 2015",
    role: "BA in Design",
    company: "University of Nairobi"
  }
];

export const servicesData: ServiceItem[] = [
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
];

export const projectsData: ProjectItem[] = [
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
];

export const processSteps: ProcessItem[] = [
  {
    num: "01",
    name: "Discovery",
    desc: "Intensive workshops to uncover goals, brand ethics, user insights, and technical limits."
  },
  {
    num: "02",
    name: "Research",
    desc: "Competitive scoping, market analysis, and defining specific user personas."
  },
  {
    num: "03",
    name: "Wireframes",
    desc: "Creating minimal functional blue-prints prioritizing spatial relationships and clear user flows."
  },
  {
    num: "04",
    name: "Prototype",
    desc: "Developing interactive high-fidelity user workflows to test layouts with actual users."
  },
  {
    num: "05",
    name: "Visual Design",
    desc: "Perfecting color systems, micro-interactions, custom layouts, and brand assets."
  },
  {
    num: "06",
    name: "Testing",
    desc: "Behavior testing, fine-tuning typography sizing, accessibility metrics, and responsiveness."
  },
  {
    num: "07",
    name: "Launch",
    desc: "Developer handoff with robust design systems, assets, launch support, and ongoing iteration."
  }
];

export const statsData: StatItem[] = [
  {
    num: "10",
    hasPlus: true,
    label: "Years of Experience"
  },
  {
    num: "100",
    hasPlus: true,
    label: "Projects Completed"
  },
  {
    num: "50",
    hasPlus: true,
    label: "Clients Served"
  },
  {
    num: "5",
    hasPlus: false,
    label: "Creative Disciplines"
  }
];

export const skillsData: SkillItem[] = [
  {
    name: "UI/UX Design",
    percentage: 95
  },
  {
    name: "Brand Identity",
    percentage: 92
  },
  {
    name: "Motion Graphics",
    percentage: 88
  },
  {
    name: "Video Production",
    percentage: 85
  },
  {
    name: "Photography",
    percentage: 80
  }
];

export const testimonialsData: TestimonialItem[] = [
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
];

export const toolsData: string[] = [
  "Photoshop",
  "Illustrator",
  "Premiere Pro",
  "After Effects",
  "InDesign",
  "Figma",
  "Adobe XD",
  "Photography"
];
