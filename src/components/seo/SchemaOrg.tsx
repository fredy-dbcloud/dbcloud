import { useLocation } from 'react-router-dom';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';
import { faqData } from '@/config/faq';

export function SchemaOrg() {
  const { lang } = useLang();
  const location = useLocation();
  const pathname = location.pathname;

  // Organization Schema (site-wide) - Enhanced with more enterprise details
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "name": siteConfig.name,
    "legalName": "DBCloud LLC",
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/logo.png`,
    "description": lang === 'es' 
      ? "Proveedor de servicios de bases de datos administradas, migración cloud y soluciones de IA empresarial en EE.UU. Expertos certificados en AWS, Azure y GCP."
      : "US-based provider of managed database services, cloud migration, and enterprise AI solutions. Certified experts in AWS, Azure, and GCP.",
    "email": siteConfig.email,
    "telephone": siteConfig.phone,
    "foundingDate": "2020",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "39.8283",
        "longitude": "-98.5795"
      },
      "geoRadius": "5000 km"
    },
    "knowsAbout": [
      "Managed Database Services",
      "Cloud Migration",
      "AWS", "Microsoft Azure", "Google Cloud Platform",
      "PostgreSQL", "MySQL", "Oracle Database", "MongoDB", "Redis",
      "Enterprise AI", "Private AI Agents", "RAG Architecture",
      "Kubernetes", "Docker", "Terraform",
      "SOC 2 Compliance", "HIPAA Compliance", "GDPR"
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
      "name": lang === 'es' ? "Servicios DBCloud" : "DBCloud Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": lang === 'es' ? "Bases de Datos Administradas" : "Managed Database Services"
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
            "name": lang === 'es' ? "Soluciones de IA Empresarial" : "Enterprise AI Solutions"
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

  // Enhanced Service Schemas with technology specifics
  const serviceSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": lang === 'es' ? "Bases de Datos Administradas" : "Managed Database Services",
      "name": lang === 'es' ? "Servicios de Bases de Datos Administradas 24/7" : "24/7 Managed Database Services",
      "description": lang === 'es' 
        ? "Administración completa de PostgreSQL, MySQL, Oracle, SQL Server, MongoDB, Redis en AWS, Azure y GCP. Incluye monitoreo 24/7, respaldos automatizados, optimización de rendimiento y recuperación ante desastres."
        : "Complete administration of PostgreSQL, MySQL, Oracle, SQL Server, MongoDB, Redis on AWS, Azure, and GCP. Includes 24/7 monitoring, automated backups, performance optimization, and disaster recovery.",
      "provider": { "@id": siteConfig.url },
      "areaServed": "United States",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Database Platforms",
        "itemListElement": ["PostgreSQL", "MySQL", "Oracle Database", "Microsoft SQL Server", "MongoDB", "Redis", "Amazon Aurora", "Azure SQL"]
      },
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": `${siteConfig.url}/${lang}/services`
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": lang === 'es' ? "Infraestructura Cloud" : "Cloud Infrastructure",
      "name": lang === 'es' ? "Servicios de Infraestructura Cloud Multi-Nube" : "Multi-Cloud Infrastructure Services",
      "description": lang === 'es'
        ? "Diseño, implementación y gestión de arquitecturas cloud en AWS, Azure y GCP. Migración desde on-premises, Kubernetes, Terraform, y cumplimiento SOC 2/HIPAA."
        : "Design, implementation, and management of cloud architectures on AWS, Azure, and GCP. On-premises migration, Kubernetes, Terraform, and SOC 2/HIPAA compliance.",
      "provider": { "@id": siteConfig.url },
      "areaServed": "United States",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Cloud Platforms",
        "itemListElement": ["Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud Platform (GCP)", "VMware", "Kubernetes", "Docker", "Terraform"]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": lang === 'es' ? "Soluciones de IA Empresarial" : "Enterprise AI Solutions",
      "name": lang === 'es' ? "Agentes de IA Privados y Soluciones RAG" : "Private AI Agents and RAG Solutions",
      "description": lang === 'es'
        ? "Despliegue de IA privada usando Azure OpenAI, AWS Bedrock, Google Vertex AI. Arquitecturas RAG con bases de datos vectoriales (pgvector, Pinecone, Weaviate). Cumplimiento HIPAA y SOC 2."
        : "Private AI deployment using Azure OpenAI, AWS Bedrock, Google Vertex AI. RAG architectures with vector databases (pgvector, Pinecone, Weaviate). HIPAA and SOC 2 compliant.",
      "provider": { "@id": siteConfig.url },
      "areaServed": "United States",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI Platforms",
        "itemListElement": ["Azure OpenAI", "AWS Bedrock", "Google Vertex AI", "LangChain", "pgvector", "Pinecone", "Weaviate"]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": lang === 'es' ? "Migración Cloud" : "Cloud Migration",
      "name": lang === 'es' ? "Migración Cloud Sin Tiempo de Inactividad" : "Zero-Downtime Cloud Migration",
      "description": lang === 'es'
        ? "Migración desde on-premises a AWS, Azure o GCP sin tiempo de inactividad. Incluye evaluación, planificación, ejecución y soporte post-migración."
        : "Migration from on-premises to AWS, Azure, or GCP with zero downtime. Includes assessment, planning, execution, and post-migration support.",
      "provider": { "@id": siteConfig.url },
      "areaServed": "United States"
    }
  ];

  // Enhanced Product Schemas (Pricing Plans)
  const productSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "DBCloud Starter Consulting",
      "description": lang === 'es' 
        ? "Asesoría Cloud & AI para pequeñas empresas. 4 horas/mes de consultoría experta, revisión de arquitectura, optimización de costos."
        : "Cloud & AI advisory for small businesses. 4 hours/month of expert consulting, architecture review, cost optimization.",
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
      "name": "DBCloud Growth Consulting",
      "description": lang === 'es'
        ? "Soporte práctico Cloud & AI para empresas en crecimiento. 10 horas/mes de consultoría y ejecución, gestión de base de datos, optimización de rendimiento."
        : "Hands-on Cloud & AI support for growing businesses. 10 hours/month of consulting and execution, database management, performance optimization.",
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
        ? "Soluciones Cloud & AI personalizadas para entornos regulados. SLAs personalizados hasta 99.99%, soporte 24/7, certificaciones SOC 2/HIPAA/PCI."
        : "Custom Cloud & AI solutions for regulated environments. Custom SLAs up to 99.99%, 24/7 support, SOC 2/HIPAA/PCI certifications.",
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
