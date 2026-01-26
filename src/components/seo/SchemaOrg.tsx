import { useLocation } from 'react-router-dom';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';
import { faqData } from '@/config/faq';

export function SchemaOrg() {
  const { lang } = useLang();
  const location = useLocation();
  const pathname = location.pathname;

  // Organization Schema (site-wide)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/logo.png`,
    "description": siteConfig.meta[lang].description,
    "email": siteConfig.email,
    "telephone": siteConfig.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address.street,
      "addressLocality": siteConfig.address.city,
      "addressRegion": siteConfig.address.state,
      "postalCode": siteConfig.address.zip,
      "addressCountry": siteConfig.address.country
    },
    "sameAs": [
      siteConfig.linkedIn,
      siteConfig.twitter,
      siteConfig.github
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.phone,
      "contactType": "sales",
      "email": siteConfig.salesEmail,
      "availableLanguage": ["English", "Spanish"]
    }
  };

  // WebSite Schema with SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "inLanguage": lang,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Service Schemas
  const serviceSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": lang === 'es' ? "Infraestructura Cloud" : "Cloud Infrastructure",
      "name": lang === 'es' ? "Servicios de Infraestructura Cloud" : "Cloud Infrastructure Services",
      "description": lang === 'es' 
        ? "Soluciones multi-nube en AWS, Azure y GCP con seguridad empresarial"
        : "Multi-cloud solutions on AWS, Azure, and GCP with enterprise-grade security",
      "provider": organizationSchema,
      "areaServed": "Worldwide",
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": `${siteConfig.url}/${lang}/services`
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": lang === 'es' ? "Bases de Datos Administradas" : "Managed Databases",
      "name": lang === 'es' ? "Servicios de Bases de Datos Administradas" : "Managed Database Services",
      "description": lang === 'es'
        ? "Administración, optimización y soporte 24/7 para PostgreSQL, MySQL, MongoDB"
        : "24/7 database administration, optimization, and support for PostgreSQL, MySQL, MongoDB",
      "provider": organizationSchema,
      "areaServed": "Worldwide"
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": lang === 'es' ? "Servicios de IA" : "AI Services",
      "name": lang === 'es' ? "Soluciones de IA Empresarial" : "Enterprise AI Solutions",
      "description": lang === 'es'
        ? "Agentes de IA privados, pipelines de ML y soluciones de inteligencia de negocios"
        : "Private AI agents, ML pipelines, and business intelligence solutions",
      "provider": organizationSchema,
      "areaServed": "Worldwide"
    }
  ];

  // Product Schemas (Pricing Plans)
  const productSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "DBCloud Starter",
      "description": lang === 'es' 
        ? "Perfecto para equipos pequeños que comienzan"
        : "Perfect for small teams getting started",
      "brand": { "@type": "Brand", "name": siteConfig.name },
      "offers": {
        "@type": "Offer",
        "price": "499",
        "priceCurrency": "USD",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "DBCloud Growth",
      "description": lang === 'es'
        ? "Para empresas en crecimiento con necesidades exigentes"
        : "For growing businesses with demanding needs",
      "brand": { "@type": "Brand", "name": siteConfig.name },
      "offers": {
        "@type": "Offer",
        "price": "1499",
        "priceCurrency": "USD",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "DBCloud Enterprise",
      "description": lang === 'es'
        ? "Soluciones a medida para grandes organizaciones"
        : "Tailored solutions for large organizations",
      "brand": { "@type": "Brand", "name": siteConfig.name }
    }
  ];

  // BreadcrumbList Schema
  const getBreadcrumbs = () => {
    const pathParts = pathname.split('/').filter(Boolean);
    if (pathParts.length <= 1) return null;

    const items = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": lang === 'es' ? "Inicio" : "Home",
        "item": `${siteConfig.url}/${lang}`
      }
    ];

    let currentPath = `/${lang}`;
    for (let i = 1; i < pathParts.length; i++) {
      currentPath += `/${pathParts[i]}`;
      const name = pathParts[i].charAt(0).toUpperCase() + pathParts[i].slice(1);
      items.push({
        "@type": "ListItem",
        "position": i + 1,
        "name": name,
        "item": `${siteConfig.url}${currentPath}`
      });
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items
    };
  };

  // FAQ Schema (only for FAQ pages)
  const getFaqSchema = () => {
    if (!pathname.includes('/faq')) return null;

    const faqs = faqData[lang];
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  };

  // Combine schemas based on current page
  const schemas: Record<string, unknown>[] = [organizationSchema, websiteSchema];

  // Add service schemas on services/ai pages
  if (pathname.includes('/services') || pathname.includes('/ai')) {
    schemas.push(...serviceSchemas);
  }

  // Add product schemas on pricing page
  if (pathname.includes('/pricing')) {
    schemas.push(...productSchemas);
  }

  // Add breadcrumbs for internal pages
  const breadcrumbs = getBreadcrumbs();
  if (breadcrumbs) {
    schemas.push(breadcrumbs);
  }

  // Add FAQ schema
  const faqSchema = getFaqSchema();
  if (faqSchema) {
    schemas.push(faqSchema);
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
