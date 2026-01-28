export const siteConfig = {
  name: "DBCloud",
  url: "https://dbcloud.us",
  ogImage: "https://dbcloud.io/og.png",
  
  // Contact information
  email: "support@dbcloud.us",
  salesEmail: "support@dbcloud.us",
  supportEmail: "support@dbcloud.us",
  phone: "+1 929 733 8260",
  phoneRaw: "19297338260",
  
  // Social links
  facebook: "https://www.facebook.com/dbcloud.academy",
  instagram: "https://www.instagram.com/dbcloudllc/",
  tiktok: "https://www.tiktok.com/@dbcloudllc",
  linkedin: "https://www.linkedin.com/company/dbcloud",
    
  // External URLs
  ACADEMY_URL: "https://dbcloud.academy/",
  // Microsoft Bookings public page (use the exact share link)
  SCHEDULE_URL: "https://outlook.office.com/book/DBCloudSolutions@dbcloud.us/?ismsaljsauthenabled",
  
  // WhatsApp configuration (bilingual)
  WHATSAPP: {
    en: {
      url: "https://wa.me/19297338260?text=Hello%20DBCloud%2C%20I%20am%20interested%20in%20scheduling%20an%20evaluation%20of%20your%20services%20for%20my%20company.",
      tooltip: "Let's talk about your project?"
    },
    es: {
      url: "https://wa.me/19297338260?text=Hola%20DBCloud%2C%20me%20gustar%C3%ADa%20agendar%20una%20evaluaci%C3%B3n%20de%20sus%20servicios%20para%20mi%20empresa.",
      tooltip: "¿Hablamos de tu proyecto?"
    }
  },
  
  // Company info (remote-first, no physical address displayed)
  companyLocation: {
    en: "Operating remotely across the United States",
    es: "Operando remotamente en Estados Unidos"
  },
  
  // Meta descriptions by language - SEO optimized with technology keywords
  meta: {
    en: {
      title: "DBCloud | Managed Database & Cloud Services | AWS, Azure, GCP, Oracle",
      description: "US-based managed database services for PostgreSQL, MySQL, Oracle, SQL Server, MongoDB. Cloud migration to AWS, Azure, GCP, Oracle Cloud. Private AI solutions with SOC 2, HIPAA compliance.",
      keywords: "managed database services USA, PostgreSQL DBA, MySQL administration, Oracle database management, SQL Server support, MongoDB managed, cloud migration AWS Azure GCP Oracle, enterprise AI solutions, database consulting, 24/7 database support, SOC 2 HIPAA compliant, Oracle Cloud, private AI agents, RAG architecture"
    },
    es: {
      title: "DBCloud | Servicios de Bases de Datos y Cloud Administrados | AWS, Azure, GCP, Oracle",
      description: "Servicios de bases de datos administradas en EE.UU. para PostgreSQL, MySQL, Oracle, SQL Server, MongoDB. Migración cloud a AWS, Azure, GCP, Oracle Cloud. Soluciones de IA privadas con cumplimiento SOC 2, HIPAA.",
      keywords: "servicios bases de datos administradas, DBA PostgreSQL, administración MySQL, gestión Oracle, soporte SQL Server, MongoDB administrado, migración cloud AWS Azure GCP Oracle, soluciones IA empresarial, consultoría bases de datos, soporte 24/7, SOC 2 HIPAA, Oracle Cloud, agentes IA privados"
    }
  }
} as const;

export type Lang = 'en' | 'es';

export const defaultLang: Lang = 'en';
