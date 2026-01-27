import { motion } from 'framer-motion';
import { useLang } from '@/hooks/useLang';

/**
 * Trusted Technologies Section - SMB-focused trust signals
 * Shows technology logos that US small & mid-sized businesses recognize
 * NOT client logos - these represent technologies we work with
 */

const technologies = [
  // Cloud & Infrastructure - High SMB familiarity
  { name: 'AWS', category: 'cloud' },
  { name: 'Microsoft Azure', category: 'cloud' },
  { name: 'Google Cloud', category: 'cloud' },
  // Databases - High SMB pain & intent
  { name: 'PostgreSQL', category: 'database' },
  { name: 'MySQL', category: 'database' },
  { name: 'SQL Server', category: 'database' },
  { name: 'Oracle Database', category: 'database' },
  // Security & Platform
  { name: 'Cloudflare', category: 'security' },
  { name: 'Red Hat', category: 'platform' },
];

const sectionContent = {
  en: {
    title: 'Technologies trusted by growing US small & mid-sized businesses',
    disclaimer: 'Logos represent the technologies we support and work with.',
  },
  es: {
    title: 'Tecnologías de confianza para pequeñas y medianas empresas en EE.UU.',
    disclaimer: 'Los logos representan las tecnologías que soportamos y con las que trabajamos.',
  },
};

export function TrustedTechnologiesSection() {
  const { lang } = useLang();
  const content = sectionContent[lang];

  return (
    <section className="py-12 bg-muted/20 border-y border-border/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-medium text-muted-foreground mb-8 max-w-2xl mx-auto">
            {content.title}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10 mb-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="flex items-center justify-center px-4 py-2"
              >
                <span className="text-sm font-medium text-muted-foreground/70 hover:text-foreground transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
          
          <p className="text-xs text-muted-foreground/50">
            {content.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
