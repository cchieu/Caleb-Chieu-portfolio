import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function SEOManager() {
  const { language, t, getServicesData, getProjectsData } = useLanguage();

  useEffect(() => {
    // 1. Coordinate language tag in the html tag
    document.documentElement.lang = language || 'en';

    // 2. Compute dynamic title based on translation records or default placeholders
    const part1 = t('heroTitlePart1') || 'Creative Director';
    const part2 = t('heroTitlePart2') || '& UI/UX';
    const part3 = t('heroTitlePart3') || 'Designer';
    
    // Clean trailing/leading spaces or special marks
    const cleanTitleParts = [part1, part2, part3]
      .map(p => p.trim())
      .filter(Boolean)
      .join(' ');

    const finalTitle = `Siliana | ${cleanTitleParts} — Nairobi, Kenya`;
    document.title = finalTitle;

    // 3. Coordinate meta description dynamically
    const dynamicDesc = t('heroDesc') || t('aboutDesc') || 'Creative Director & UI/UX Designer portfolio based in Nairobi, Kenya. Expert in brand identity, UI/UX, motion graphics, and video production.';
    
    const updateOrCreateMeta = (nameAttr: string, valueAttr: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${nameAttr}"]` : `meta[name="${nameAttr}"]`;
      let el = document.querySelector(selector) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) {
          el.setAttribute('property', nameAttr);
        } else {
          el.setAttribute('name', nameAttr);
        }
        document.head.appendChild(el);
      }
      el.content = valueAttr;
    };

    // Standard Tags
    const projectsList = getProjectsData();
    const dynamicProjectTags = Array.from(
      new Set(projectsList.flatMap((p) => p.tags || []))
    )
      .map((tag) => String(tag).trim())
      .filter(Boolean);

    const baseKeywords = [
      'UI/UX Design Nairobi',
      'Creative Director Kenya',
      'Video Production East Africa',
      'Brand Identity',
      'Aquila East Africa',
      'Siliana Designer',
      'Web Design Kenya',
      'AI-assisted Web design',
    ];

    const aggregateKeywords = Array.from(
      new Set([...baseKeywords, ...dynamicProjectTags])
    ).join(', ');

    updateOrCreateMeta('description', dynamicDesc);
    updateOrCreateMeta('keywords', aggregateKeywords);
    updateOrCreateMeta('author', 'Siliana (Caleb Chieu)');
    updateOrCreateMeta('application-name', 'Siliana Portfolio');

    // Robot & AI Scraper Specific directives (Perplexity, GPTBot, Google-Extended, etc)
    updateOrCreateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateOrCreateMeta('google-extended', 'index'); // Direct permission guidelines for Google Gemini/Vertex AI agent scraping
    updateOrCreateMeta('ai-agent-index', 'true'); // Custom machine signal of clean schema markup representation

    // OpenGraph Tags (LinkedIn, Facebook, Slack previews)
    updateOrCreateMeta('og:title', finalTitle, true);
    updateOrCreateMeta('og:description', dynamicDesc, true);
    updateOrCreateMeta('og:type', 'profile', true);
    updateOrCreateMeta('og:url', window.location.href, true);
    updateOrCreateMeta('og:locale', language === 'sw' ? 'sw_KE' : 'en_US', true);
    updateOrCreateMeta('og:site_name', 'Siliana Portfolio', true);

    // Twitter / X Premium Previews
    updateOrCreateMeta('twitter:card', 'summary_large_image');
    updateOrCreateMeta('twitter:title', finalTitle);
    updateOrCreateMeta('twitter:description', dynamicDesc);

    // 4. Inject Dynamic Schema.org JSON-LD Structured Data for sophisticated AI Search grounding
    const refreshJSONLD = () => {
      const existingScript = document.getElementById('seo-jsonld-schema');
      if (existingScript) {
        existingScript.remove();
      }

      const services = getServicesData().map((s) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': s.name,
          'description': s.desc,
          'identifier': s.num
        }
      }));

      const projects = getProjectsData().slice(0, 5).map((p) => ({
        '@type': 'CreativeWork',
        'name': p.title,
        'description': p.subtitle,
        'keywords': p.tags.join(', '),
        'creator': {
          '@type': 'Person',
          'name': 'Siliana'
        }
      }));

      const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        'name': 'Siliana Design Studio',
        'alternateName': 'Siliana Creative Portfolio',
        'description': dynamicDesc,
        'url': window.location.origin,
        'logo': `${window.location.origin}/logo.png`,
        'image': `${window.location.origin}/logo.png`,
        'telephone': '+254700000000', // Coordinates
        'email': 'calebchieu@gmail.com',
        'priceRange': '$$$',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Nairobi',
          'addressCountry': 'Kenya'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': -1.2921,
          'longitude': 36.8219
        },
        'founder': {
          '@type': 'Person',
          'name': 'Siliana',
          'jobTitle': 'Lead Creative Director & UI/UX Designer',
          'alumniOf': 'University of Nairobi',
          'email': 'calebchieu@gmail.com'
        },
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Design, Brand and Interactive Development Services',
          'itemListElement': services
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': window.location.href
        },
        'knowsAbout': [
          'UI/UX Design',
          'Brand Strategy',
          'Typography',
          'Motion Graphics',
          'Video Production',
          'Interactive Systems',
          'Figma',
          'Adobe Creative Suite'
        ],
        'workExample': projects
      };

      const script = document.createElement('script');
      script.id = 'seo-jsonld-schema';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schemaData, null, 2);
      document.head.appendChild(script);
    };

    refreshJSONLD();

  }, [language, t, getServicesData, getProjectsData]);

  // Render nothing as this performs head meta side-effects
  return null;
}
