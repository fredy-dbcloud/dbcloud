import { useLocation } from 'react-router-dom';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';
import { faqData } from '@/config/faq';

export function SchemaOrg() {
  const { lang } = useLang();
  const location = useLocation();
  const pathname = location.pathname;

  // Organization Schema - SMB-focused US business
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "name": siteConfig.name,
    "legalName": "DBCloud LLC",
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/logo.png`,
    "description": lang === 'es' 
      ? "Equipo fraccional de cloud y bases de datos para pequeñas y medianas empresas en EE.UU. DBA como servicio, migración cloud, y soluciones de IA práctica."
      : "Fractional cloud and database team for US small and mid-sized businesses. DBA as a service, cloud migration, and practical AI solutions.",
    "slogan": lang === 'es'
      ? "Soporte cloud y bases de datos para PyMEs"
      : "Cloud & database support for SMBs",
    "email": siteConfig.email,
    "telephone": siteConfig.phone,
    "foundingDate": "2020",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "knowsAbout": [
      // SMB-friendly terms first
      "DBA as a Service",
      "Fractional Cloud Team",
      "Managed Database Services for Small Business",
      "Cloud Migration",
      "Database Support",
      // Cloud platforms SMBs use
      "AWS", "Microsoft Azure", "Google Cloud",
      // Databases SMBs use
      "PostgreSQL", "MySQL", "SQL Server", "MongoDB",
      // Practical AI
      "AI Automation", "Business Intelligence", "Reporting Automation"
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
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": lang === 'es' ? "Servicios DBCloud para PyMEs" : "DBCloud Services for SMBs",
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
            "name": lang === 'es' ? "Equipo Cloud Fraccional" : "Fractional Cloud Team"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": lang === 'es' ? "Migración Cloud" : "Cloud Migration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": lang === 'es' ? "IA Práctica para Empresas" : "Practical AI for Business"
          }
        }
      ]
    }
  };

  // WebSite Schema with SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "inLanguage": lang === 'es' ? 'es-US' : 'en-US',
    "publisher": { "@id": siteConfig.url },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // SMB-focused Service Schemas
  const serviceSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": lang === 'es' ? "DBA como Servicio" : "DBA as a Service",
      "name": lang === 'es' ? "Administrador de Bases de Datos para PyMEs" : "Database Administrator for Small Businesses",
      "description": lang === 'es' 
        ? "Acceso a DBAs senior sin contratar personal de tiempo completo. Administración de PostgreSQL, MySQL, SQL Server, MongoDB. Ideal para empresas de 10-200 empleados."
        : "Access to senior DBAs without hiring full-time staff. PostgreSQL, MySQL, SQL Server, MongoDB administration. Ideal for 10-200 employee companies.",
      "provider": { "@id": siteConfig.url },
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
      "serviceType": lang === 'es' ? "Equipo Cloud Fraccional" : "Fractional Cloud Team",
      "name": lang === 'es' ? "Soporte Cloud para Equipos Pequeños" : "Cloud Support for Small Teams",
      "description": lang === 'es'
        ? "Tu equipo cloud externo para empresas sin departamento de TI dedicado. AWS, Azure, GCP. Sin contratos largos, inicio en 48 horas."
        : "Your external cloud team for businesses without a dedicated IT department. AWS, Azure, GCP. No long contracts, start in 48 hours.",
      "provider": { "@id": siteConfig.url },
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
      "provider": { "@id": siteConfig.url },
      "areaServed": "United States"
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": lang === 'es' ? "IA Práctica" : "Practical AI",
      "name": lang === 'es' ? "Automatización con IA para PyMEs" : "AI Automation for SMBs",
      "description": lang === 'es'
        ? "IA que ahorra tiempo y reduce costos. Automatización de tareas, reportes inteligentes, asistentes privados. Sin complejidad innecesaria."
        : "AI that saves time and reduces costs. Task automation, smart reporting, private assistants. No unnecessary complexity.",
      "provider": { "@id": siteConfig.url },
      "areaServed": "United States"
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": lang === 'es' ? "Soporte de Emergencia" : "Emergency Support",
      "name": lang === 'es' ? "Soporte de Base de Datos de Emergencia" : "Emergency Database Support",
      "description": lang === 'es'
        ? "Triaje de incidentes críticos para problemas de base de datos fuera de horario. Disponible como add-on o en plan Enterprise."
        : "Critical incident triage for database issues outside business hours. Available as add-on or on Enterprise plan.",
      "provider": { "@id": siteConfig.url },
      "areaServed": "United States"
    }
  ];

  // SMB-focused Product Schemas (Pricing Plans)
  const productSchemas = [
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
        ? "Soporte práctico cloud y bases de datos. 10 horas/mes de ejecución real, no solo asesoría. Para empresas en crecimiento."
        : "Hands-on cloud and database support. 10 hours/month of actual execution, not just advice. For growing businesses.",
      "brand": { "@type": "Brand", "name": siteConfig.name },
      "offers": {
        "@type": "Offer",
        "price": "1499",
        "priceCurrency": "USD",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
        "url": `${siteConfig.url}/${lang}/pricing`
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "DBCloud Enterprise",
      "description": lang === 'es'
        ? "Soluciones personalizadas con SLAs garantizados, soporte 24/7, y cumplimiento regulatorio (SOC 2, HIPAA). Para cargas de trabajo críticas."
        : "Custom solutions with guaranteed SLAs, 24/7 support, and regulatory compliance (SOC 2, HIPAA). For mission-critical workloads.",
      "brand": { "@type": "Brand", "name": siteConfig.name }
    }
  ];

  // BreadcrumbList Schema
  const getBreadcrumbs = () => {
    const pathParts = pathname.split('/').filter(Boolean);
    if (pathParts.length <= 1) return null;

    const pageNames: Record<string, { en: string; es: string }> = {
      services: { en: "Services", es: "Servicios" },
      ai: { en: "AI Solutions", es: "Soluciones IA" },
      pricing: { en: "Pricing", es: "Precios" },
      faq: { en: "FAQ", es: "Preguntas Frecuentes" },
      contact: { en: "Contact", es: "Contacto" },
      schedule: { en: "Schedule", es: "Agendar" },
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

  // WebPage schema for current page
  const getWebPageSchema = () => {
    const pageData: Record<string, { en: { name: string; description: string }; es: { name: string; description: string } }> = {
      '/services': {
        en: { name: "Managed Database & Cloud Services", description: "Enterprise managed database services, cloud infrastructure, and migration support for AWS, Azure, GCP." },
        es: { name: "Servicios de Bases de Datos y Cloud Administrados", description: "Servicios empresariales de bases de datos administradas, infraestructura cloud y soporte de migración." }
      },
      '/ai': {
        en: { name: "Enterprise AI Solutions", description: "Private AI agents, RAG architectures, and ML solutions using Azure OpenAI, AWS Bedrock, and Vertex AI." },
        es: { name: "Soluciones de IA Empresarial", description: "Agentes de IA privados, arquitecturas RAG y soluciones ML usando Azure OpenAI, AWS Bedrock y Vertex AI." }
      },
      '/pricing': {
        en: { name: "Pricing Plans", description: "Transparent pricing for managed database, cloud, and AI consulting services. Starting at $499/month." },
        es: { name: "Planes de Precios", description: "Precios transparentes para servicios de bases de datos administradas, cloud y consultoría IA. Desde $499/mes." }
      },
      '/faq': {
        en: { name: "Frequently Asked Questions", description: "Answers to common questions about managed databases, cloud migration, AI services, security, and compliance." },
        es: { name: "Preguntas Frecuentes", description: "Respuestas a preguntas comunes sobre bases de datos administradas, migración cloud, servicios IA, seguridad y cumplimiento." }
      },
      '/contact': {
        en: { name: "Contact Us", description: "Get in touch with DBCloud for managed database, cloud, and AI consulting services." },
        es: { name: "Contáctanos", description: "Ponte en contacto con DBCloud para servicios de bases de datos administradas, cloud y consultoría IA." }
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
      "isPartOf": { "@id": siteConfig.url }
    };
  };

  // Combine schemas based on current page
  const schemas: Record<string, unknown>[] = [organizationSchema, websiteSchema];

  // Add WebPage schema
  const webPageSchema = getWebPageSchema();
  if (webPageSchema) {
    schemas.push(webPageSchema);
  }

  // Add service schemas on services/ai pages
  if (pathname.includes('/services') || pathname.includes('/ai') || pathname === `/${lang}` || pathname === '/') {
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
