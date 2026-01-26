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
  ACADEMY_URL: "https://academy.dbcloud.io",
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
  
  // Company info
  address: {
    street: "100 Innovation Drive, Suite 400",
    city: "San Francisco",
    state: "CA",
    zip: "94107",
    country: "USA"
  },
  
  // Meta descriptions by language
  meta: {
    en: {
      title: "DBCloud | Enterprise Cloud & Database Solutions",
      description: "Enterprise-grade managed database services, cloud migration, and AI solutions. 24/7 support, 99.99% uptime SLA. Trusted by Fortune 500 companies.",
      keywords: "managed database services, cloud migration, database management, AI services, enterprise cloud, AWS, Azure, GCP"
    },
    es: {
      title: "DBCloud | Soluciones Cloud y Bases de Datos Empresariales",
      description: "Servicios de bases de datos administradas empresariales, migración a la nube y soluciones de IA. Soporte 24/7, SLA 99.99% de tiempo de actividad.",
      keywords: "servicios de bases de datos administradas, migración a la nube, gestión de bases de datos, servicios de IA, nube empresarial"
    }
  }
} as const;

export type Lang = 'en' | 'es';

export const defaultLang: Lang = 'en';
