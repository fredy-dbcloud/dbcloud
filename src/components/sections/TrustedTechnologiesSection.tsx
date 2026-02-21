import { motion } from 'framer-motion';
import { useLang } from '@/hooks/useLang';

const technologies = [
  { name: 'AWS', logo: '/logos/aws.svg' },
  { name: 'Microsoft Azure', logo: '/logos/azure.svg' },
  { name: 'Google Cloud', logo: '/logos/gcp.svg' },
  { name: 'PostgreSQL', logo: '/logos/postgresql.svg' },
  { name: 'MySQL', logo: '/logos/mysql.svg' },
  { name: 'SQL Server', logo: '/logos/sqlserver.svg' },
  { name: 'Oracle', logo: '/logos/oracle.svg' },
  { name: 'Cloudflare', logo: '/logos/cloudflare.svg' },
  { name: 'Red Hat', logo: '/logos/redhat.svg' },
];

const titles = {
  en: 'Technologies we work with',
  es: 'Tecnologías con las que trabajamos',
};

export function TrustedTechnologiesSection() {
  const { lang } = useLang();

  return (
    <section className="py-14 bg-muted/30 border-y border-border/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-medium text-muted-foreground mb-10 uppercase tracking-wider">
            {titles[lang]}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={tech.logo}
                  alt={`${tech.name} logo`}
                  className="h-7 w-auto object-contain"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
