export const siteConfig = {
  name: "DBCloud",
  url: "https://dbcloud.io",
  ogImage: "https://dbcloud.io/og.png",
  
  // Contact information
  email: "contact@dbcloud.io",
  salesEmail: "sales@dbcloud.io",
  supportEmail: "support@dbcloud.io",
  phone: "+1 (888) 555-DBCL",
  
  // Social links
  linkedIn: "https://linkedin.com/company/dbcloud",
  twitter: "https://twitter.com/dbcloud",
  github: "https://github.com/dbcloud",
  
  // External URLs
  ACADEMY_URL: "https://academy.dbcloud.io",
  SCHEDULE_URL: "/schedule",
  WHATSAPP_URL: "https://wa.me/18885553225?text=Hi%20DBCloud%2C%20I%27m%20interested%20in%20your%20services",
  
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
