import { motion } from 'framer-motion';
import { useLang } from '@/hooks/useLang';

/**
 * Trusted Technologies Section - SMB-focused trust signals
 * Shows technology logos that US small & mid-sized businesses recognize
 * NOT client logos - these represent technologies we work with
 */

const technologies = [
  // Cloud & Infrastructure - High SMB familiarity
  { name: 'AWS', logo: '/logos/aws.svg', category: 'cloud' },
  { name: 'Microsoft Azure', logo: '/logos/azure.svg', category: 'cloud' },
  { name: 'Google Cloud', logo: '/logos/gcp.svg', category: 'cloud' },
  // Databases - High SMB pain & intent
  { name: 'PostgreSQL', logo: '/logos/postgresql.svg', category: 'database' },
  { name: 'MySQL', logo: '/logos/mysql.svg', category: 'database' },
  { name: 'SQL Server', logo: '/logos/sqlserver.svg', category: 'database' },
  { name: 'Oracle', logo: '/logos/oracle.svg', category: 'database' },
  // Security & Platform
  { name: 'Cloudflare', logo: '/logos/cloudflare.svg', category: 'security' },
  { name: 'Red Hat', logo: '/logos/redhat.svg', category: 'platform' },
];

const sectionContent = {
  en: {
    title: 'Cloud platforms, databases, and tools we work with every day',
    disclaimer: 'We provide infrastructure, database, and AI support across these technologies.',
  },
  es: {
    title: 'Plataformas cloud, bases de datos y herramientas con las que trabajamos',
    disclaimer: 'Proveemos soporte de infraestructura, bases de datos e IA en estas tecnologías.',
  },
};

export function TrustedTechnologiesSection() {
  const { lang } = useLang();
  const content = sectionContent[lang];

  return (
    <section className="py-16 bg-muted/30 border-y border-border/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-base font-medium text-muted-foreground mb-12 max-w-2xl mx-auto">
            {content.title}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-14 mb-10">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-center justify-center gap-3 group"
              >
                <div className="h-12 w-auto flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  <img 
                    src={tech.logo} 
                    alt={`${tech.name} logo`}
                    className="h-10 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="text-sm font-medium text-muted-foreground/70 group-hover:text-foreground transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground/60">
            {content.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
