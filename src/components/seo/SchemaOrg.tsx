import { useLocation } from 'react-router-dom';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';
import { faqData } from '@/config/faq';

// SMB-focused Organization Schema
function getOrganizationSchema(lang: 'en' | 'es') {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${siteConfig.url}/#organization`,
    "name": siteConfig.name,
    "legalName": "DBCloud LLC",
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/logo.png`,
    "description": lang === 'es' 
      ? "Soporte cloud y bases de datos fraccional para pequeñas y medianas empresas en EE.UU. DBA como servicio, migración cloud, y soluciones de IA práctica. Planes desde $499/mes."
      : "Fractional cloud and database support for US small and mid-sized businesses. DBA as a service, cloud migration, and practical AI solutions. Plans from $499/month.",
    "slogan": lang === 'es'
      ? "Deja de preocuparte por tu base de datos"
      : "Stop worrying about your database",
    "email": siteConfig.email,
    "telephone": siteConfig.phone,
    "foundingDate": "2020",
    "priceRange": "$499 - $1499/month",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "knowsAbout": [
      "DBA as a Service",
      "Fractional Cloud Team",
      "Managed Database Services",
      "Cloud Migration for Small Business",
      "Database Support",
      "AWS", "Microsoft Azure", "Google Cloud",
      "PostgreSQL", "MySQL", "SQL Server", "Oracle",
      "AI Automation for SMBs"
    ],
    "sameAs": [
      siteConfig.linkedin,
      siteConfig.facebook,
      siteConfig.instagram,
      siteConfig.tiktok
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": siteConfig.phone,
        "contactType": "sales",
        "email": siteConfig.salesEmail,
        "availableLanguage": ["English", "Spanish"],
        "areaServed": "US"
      },
      {
        "@type": "ContactPoint",
        "telephone": siteConfig.phone,
        "contactType": "customer support",
        "email": siteConfig.supportEmail,
        "availableLanguage": ["English", "Spanish"]
      }
    ]
  };
}

// LocalBusiness Schema (without exposing address)
function getLocalBusinessSchema(lang: 'en' | 'es') {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#localbusiness`,
    "name": siteConfig.name,
    "description": lang === 'es'
      ? "Equipo de cloud y bases de datos fraccional para PyMEs en EE.UU. Sin contratos largos."
      : "Fractional cloud and database team for US SMBs. No long-term contracts.",
    "url": siteConfig.url,
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "priceRange": "$$",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "serviceArea": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": lang === 'es' ? "Servicios para PyMEs" : "Services for SMBs",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": lang === 'es' ? "DBA como Servicio" : "DBA as a Service"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": lang === 'es' ? "Soporte Cloud Fraccional" : "Fractional Cloud Support"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": lang === 'es' ? "Migración Cloud" : "Cloud Migration"
          }
        }
      ]
    }
  };
}

// WebSite Schema
function getWebsiteSchema(lang: 'en' | 'es') {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    "name": siteConfig.name,
    "url": siteConfig.url,
    "inLanguage": lang === 'es' ? 'es-US' : 'en-US',
    "publisher": { "@id": `${siteConfig.url}/#organization` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

// SMB-focused Service Schemas
function getServiceSchemas(lang: 'en' | 'es') {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": lang === 'es' ? "DBA como Servicio" : "DBA as a Service",
      "name": lang === 'es' ? "Administración de Bases de Datos para PyMEs" : "Database Administration for Small Businesses",
      "description": lang === 'es' 
        ? "Acceso a DBAs senior sin contratar personal de tiempo completo. Administración de PostgreSQL, MySQL, SQL Server, Oracle. Planes desde $499/mes para empresas de 10-200 empleados."
        : "Access to senior DBAs without hiring full-time staff. PostgreSQL, MySQL, SQL Server, Oracle administration. Plans from $499/month for 10-200 employee companies.",
      "provider": { "@id": `${siteConfig.url}/#organization` },
      "areaServed": "United States",
      "offers": {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "499",
          "priceCurrency": "USD",
          "unitText": "per month"
        }
      },
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": `${siteConfig.url}/${lang}/services`
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": lang === 'es' ? "Soporte Cloud Fraccional" : "Fractional Cloud Support",
      "name": lang === 'es' ? "Equipo Cloud para Equipos Pequeños" : "Cloud Team for Small Teams",
      "description": lang === 'es'
        ? "Tu equipo cloud externo para empresas sin departamento de TI. AWS, Azure, GCP. Sin contratos largos, inicia en 48 horas."
        : "Your external cloud team for businesses without IT department. AWS, Azure, GCP. No long contracts, start in 48 hours.",
      "provider": { "@id": `${siteConfig.url}/#organization` },
      "areaServed": "United States"
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": lang === 'es' ? "Migración Cloud" : "Cloud Migration",
      "name": lang === 'es' ? "Migración de On-Prem a Cloud" : "On-Prem to Cloud Migration",
      "description": lang === 'es'
        ? "Migración desde servidores locales a AWS, Azure o GCP. Sin tiempo de inactividad, 2-4 semanas para la mayoría de proyectos."
        : "Migration from on-premises servers to AWS, Azure, or GCP. Zero downtime, 2-4 weeks for most projects.",
      "provider": { "@id": `${siteConfig.url}/#organization` },
      "areaServed": "United States"
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": lang === 'es' ? "IA Práctica" : "Practical AI",
      "name": lang === 'es' ? "Automatización con IA para PyMEs" : "AI Automation for SMBs",
      "description": lang === 'es'
        ? "IA que ahorra tiempo y reduce costos. Automatización de tareas, reportes inteligentes, asistentes privados. Desde $499/mes."
        : "AI that saves time and reduces costs. Task automation, smart reporting, private assistants. From $499/month.",
      "provider": { "@id": `${siteConfig.url}/#organization` },
      "areaServed": "United States"
    }
  ];
}

// SMB-focused Product Schemas (Pricing Plans)
function getProductSchemas(lang: 'en' | 'es') {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": lang === 'es' ? "DBCloud Starter - Asesoría" : "DBCloud Starter - Advisory",
      "description": lang === 'es' 
        ? "Asesoría cloud y bases de datos para pequeñas empresas. 4 horas/mes, sin contratos largos. Ideal para equipos sin TI dedicado."
        : "Cloud and database advisory for small businesses. 4 hours/month, no long contracts. Ideal for teams without dedicated IT.",
      "brand": { "@type": "Brand", "name": siteConfig.name },
      "offers": {
        "@type": "Offer",
        "price": "499",
        "priceCurrency": "USD",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
        "url": `${siteConfig.url}/${lang}/pricing`
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": lang === 'es' ? "DBCloud Growth - Ejecución" : "DBCloud Growth - Execution",
      "description": lang === 'es'
        ? "Soporte práctico cloud y bases de datos. 10 horas/mes de ejecución real. Para empresas en crecimiento."
        : "Hands-on cloud and database support. 10 hours/month of actual execution. For growing businesses.",
      "brand": { "@type": "Brand", "name": siteConfig.name },
      "offers": {
        "@type": "Offer",
        "price": "1499",
        "priceCurrency": "USD",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
        "url": `${siteConfig.url}/${lang}/pricing`
      }
    }
  ];
}

// BreadcrumbList Schema
function getBreadcrumbSchema(pathname: string, lang: 'en' | 'es') {
  const pathParts = pathname.split('/').filter(Boolean);
  if (pathParts.length <= 1) return null;

  const pageNames: Record<string, { en: string; es: string }> = {
    services: { en: "Services", es: "Servicios" },
    ai: { en: "AI Solutions", es: "Soluciones IA" },
    pricing: { en: "Pricing", es: "Precios" },
    faq: { en: "FAQ", es: "Preguntas Frecuentes" },
    contact: { en: "Contact", es: "Contacto" },
    schedule: { en: "Schedule", es: "Agendar" },
    operations: { en: "AI Operations", es: "IA Operaciones" },
    reporting: { en: "AI Reporting", es: "IA Reportes" },
    assistants: { en: "AI Assistants", es: "Asistentes IA" },
  };

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
    const name = pageNames[pathParts[i]]?.[lang] || pathParts[i].charAt(0).toUpperCase() + pathParts[i].slice(1);
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
}

// FAQ Schema (only for FAQ pages)
function getFaqSchema(pathname: string, lang: 'en' | 'es') {
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
}

// WebPage schema for current page
function getWebPageSchema(pathname: string, lang: 'en' | 'es') {
  const pageData: Record<string, { en: { name: string; description: string }; es: { name: string; description: string } }> = {
    '/services': {
      en: { name: "Cloud & Database Services for SMBs", description: "Fractional database and cloud support for US small businesses. No long contracts, start in 48 hours." },
      es: { name: "Servicios Cloud y Bases de Datos para PyMEs", description: "Soporte fraccional de bases de datos y cloud para PyMEs en EE.UU. Sin contratos largos, inicia en 48 horas." }
    },
    '/ai': {
      en: { name: "Practical AI Solutions for Small Business", description: "AI automation, reporting, and assistants designed for SMBs. Save time, reduce costs. From $499/month." },
      es: { name: "Soluciones IA Prácticas para PyMEs", description: "Automatización IA, reportes y asistentes diseñados para PyMEs. Ahorra tiempo, reduce costos. Desde $499/mes." }
    },
    '/ai/operations': {
      en: { name: "AI for Operations - Automate Repetitive Tasks", description: "AI automation for small business operations. Save 10+ hours/week on data entry and workflows." },
      es: { name: "IA para Operaciones - Automatiza Tareas Repetitivas", description: "Automatización IA para operaciones de PyMEs. Ahorra 10+ horas/semana en entrada de datos y flujos." }
    },
    '/ai/reporting': {
      en: { name: "AI for Reporting - Clear Business Insights", description: "AI-powered dashboards and reports for SMBs. No analysts required. Actionable insights automatically." },
      es: { name: "IA para Reportes - Insights de Negocio Claros", description: "Dashboards y reportes con IA para PyMEs. Sin analistas. Insights accionables automáticamente." }
    },
    '/ai/assistants': {
      en: { name: "AI Assistants for Teams - Private Knowledge Base", description: "Private AI assistants that answer questions from your company documents. 100% private, no data leaves your environment." },
      es: { name: "Asistentes IA para Equipos - Base de Conocimiento Privada", description: "Asistentes IA privados que responden desde tus documentos. 100% privado, tus datos nunca salen de tu ambiente." }
    },
    '/pricing': {
      en: { name: "Simple Pricing for SMBs", description: "Cloud and database support from $499/month. No long contracts, no hidden fees. Perfect for small businesses." },
      es: { name: "Precios Simples para PyMEs", description: "Soporte cloud y bases de datos desde $499/mes. Sin contratos largos, sin costos ocultos. Ideal para PyMEs." }
    },
    '/faq': {
      en: { name: "Frequently Asked Questions", description: "Common questions about managed database support, cloud services, and AI for small businesses." },
      es: { name: "Preguntas Frecuentes", description: "Preguntas comunes sobre soporte de bases de datos administradas, servicios cloud e IA para PyMEs." }
    },
    '/contact': {
      en: { name: "Contact Us", description: "Get in touch for cloud, database, or AI support. Free 30-minute consultation. No sales pressure." },
      es: { name: "Contáctanos", description: "Contáctanos para soporte cloud, bases de datos o IA. Consulta gratis de 30 minutos. Sin presión de ventas." }
    }
  };

  const pathWithoutLang = pathname.replace(/^\/(en|es)/, '');
  const data = pageData[pathWithoutLang];
  if (!data) return null;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": data[lang].name,
    "description": data[lang].description,
    "url": `${siteConfig.url}${pathname}`,
    "inLanguage": lang === 'es' ? 'es-US' : 'en-US',
    "isPartOf": { "@id": `${siteConfig.url}/#website` }
  };
}

export function SchemaOrg() {
  const { lang } = useLang();
  const location = useLocation();
  const pathname = location.pathname;

  // Build schemas based on current page
  const schemas: Record<string, unknown>[] = [
    getOrganizationSchema(lang),
    getLocalBusinessSchema(lang),
    getWebsiteSchema(lang)
  ];

  // Add WebPage schema
  const webPageSchema = getWebPageSchema(pathname, lang);
  if (webPageSchema) {
    schemas.push(webPageSchema);
  }

  // Add service schemas on services/ai/home pages
  if (pathname.includes('/services') || pathname.includes('/ai') || pathname === `/${lang}` || pathname === '/') {
    schemas.push(...getServiceSchemas(lang));
  }

  // Add product schemas on pricing page
  if (pathname.includes('/pricing')) {
    schemas.push(...getProductSchemas(lang));
  }

  // Add breadcrumbs for internal pages
  const breadcrumbs = getBreadcrumbSchema(pathname, lang);
  if (breadcrumbs) {
    schemas.push(breadcrumbs);
  }

  // Add FAQ schema
  const faqSchema = getFaqSchema(pathname, lang);
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
