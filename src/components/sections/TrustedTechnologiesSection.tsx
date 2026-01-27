import { motion } from 'framer-motion';
import { useLang } from '@/hooks/useLang';

/**
 * Trusted Technologies Section - SMB-focused trust signals
 * Shows technology logos that US small & mid-sized businesses recognize
 * NOT client logos - these represent technologies we work with
 */

const technologies = [
  // Cloud Platforms - High familiarity for SMBs
  { name: 'AWS', category: 'cloud' },
  { name: 'Microsoft Azure', category: 'cloud' },
  { name: 'Google Cloud', category: 'cloud' },
  // Databases - What SMBs actually use
  { name: 'PostgreSQL', category: 'database' },
  { name: 'MySQL', category: 'database' },
  { name: 'SQL Server', category: 'database' },
  // Business tools SMBs recognize
  { name: 'Microsoft 365', category: 'business' },
  { name: 'GitHub', category: 'business' },
  { name: 'Slack', category: 'business' },
  // Infrastructure
  { name: 'Cloudflare', category: 'infrastructure' },
  { name: 'Linux', category: 'infrastructure' },
  { name: 'Docker', category: 'infrastructure' },
];

const sectionContent = {
  en: {
    title: 'Built on technologies trusted by US businesses',
    subtitle: 'We work with the same platforms your business relies on',
  },
  es: {
    title: 'Construido sobre tecnologías de confianza para empresas en EE.UU.',
    subtitle: 'Trabajamos con las mismas plataformas en las que tu negocio confía',
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
          <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">
            {content.title}
          </p>
          <p className="text-xs text-muted-foreground/70 mb-8">
            {content.subtitle}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="flex items-center justify-center px-4 py-2"
              >
                <span className="text-sm font-medium text-muted-foreground/60 hover:text-foreground transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
