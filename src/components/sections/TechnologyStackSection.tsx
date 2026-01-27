import { motion } from 'framer-motion';
import { useLang } from '@/hooks/useLang';
import { Cloud, Database, Shield, Zap, Server, Users } from 'lucide-react';

/**
 * Technology Stack Section - SMB-focused
 * Emphasizes practical technologies that small & mid-sized businesses use
 */
const technologyCategories = {
  en: [
    {
      icon: Cloud,
      title: "Cloud Platforms",
      items: ["AWS", "Microsoft Azure", "Google Cloud"],
    },
    {
      icon: Database,
      title: "Databases We Manage",
      items: ["PostgreSQL", "MySQL", "SQL Server", "Oracle Database", "Redis"],
    },
    {
      icon: Server,
      title: "Infrastructure",
      items: ["Linux", "Docker", "VMware", "Terraform"],
    },
    {
      icon: Zap,
      title: "AI & Automation",
      items: ["Reporting Automation", "AI Assistants", "Process Automation"],
    },
    {
      icon: Users,
      title: "Business Tools",
      items: ["Microsoft 365", "GitHub", "Slack", "Zoom"],
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      items: ["SOC 2", "HIPAA", "GDPR", "Encryption"],
    },
  ],
  es: [
    {
      icon: Cloud,
      title: "Plataformas Cloud",
      items: ["AWS", "Microsoft Azure", "Google Cloud"],
    },
    {
      icon: Database,
      title: "Bases de Datos que Administramos",
      items: ["PostgreSQL", "MySQL", "SQL Server", "Oracle Database", "Redis"],
    },
    {
      icon: Server,
      title: "Infraestructura",
      items: ["Linux", "Docker", "VMware", "Terraform"],
    },
    {
      icon: Zap,
      title: "IA y Automatización",
      items: ["Automatización de Reportes", "Asistentes IA", "Automatización de Procesos"],
    },
    {
      icon: Users,
      title: "Herramientas de Negocio",
      items: ["Microsoft 365", "GitHub", "Slack", "Zoom"],
    },
    {
      icon: Shield,
      title: "Seguridad y Cumplimiento",
      items: ["SOC 2", "HIPAA", "GDPR", "Encriptación"],
    },
  ],
};

const sectionContent = {
  en: {
    title: "Technologies We Work With for Growing SMBs",
    subtitle: "The same platforms your business already trusts — no enterprise complexity",
  },
  es: {
    title: "Tecnologías con las que Trabajamos para PYMEs en Crecimiento",
    subtitle: "Las mismas plataformas que tu negocio ya usa — sin complejidad empresarial",
  },
};

export function TechnologyStackSection() {
  const { lang } = useLang();
  const categories = technologyCategories[lang];
  const content = sectionContent[lang];

  return (
    <section className="py-20 bg-muted/30 border-y border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
            {content.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <category.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
