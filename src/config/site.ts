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
      title: "DBCloud | Cloud Infrastructure, Managed Databases & AI Solutions | AWS, Azure, GCP, Oracle",
      description: "US-based cloud infrastructure, managed database services, and AI solutions for small businesses. AWS, Azure, GCP, Oracle Cloud. PostgreSQL, MySQL, SQL Server support. Private AI, automation, and reporting. SOC 2, HIPAA ready.",
      keywords: "cloud infrastructure SMB, managed database services USA, PostgreSQL DBA, MySQL administration, Oracle database management, SQL Server support, cloud migration AWS Azure GCP Oracle, AI solutions for small business, DevOps support, database consulting, SOC 2 HIPAA compliant, Oracle Cloud, private AI agents, business automation"
    },
    es: {
      title: "DBCloud | Infraestructura Cloud, Bases de Datos Administradas y Soluciones IA | AWS, Azure, GCP, Oracle",
      description: "Infraestructura cloud, bases de datos administradas y soluciones de IA para pequeñas empresas en EE.UU. AWS, Azure, GCP, Oracle Cloud. PostgreSQL, MySQL, SQL Server. IA privada, automatización y reportes. SOC 2, HIPAA ready.",
      keywords: "infraestructura cloud PyMEs, servicios bases de datos administradas, DBA PostgreSQL, administración MySQL, gestión Oracle, soporte SQL Server, migración cloud AWS Azure GCP Oracle, soluciones IA pequeñas empresas, soporte DevOps, consultoría bases de datos, SOC 2 HIPAA, Oracle Cloud, agentes IA privados"
    }
  }
} as const;

export type Lang = 'en' | 'es';

export const defaultLang: Lang = 'en';
