import { motion } from 'framer-motion';
import { useLang } from '@/hooks/useLang';
import { Cloud, Database, Shield, Brain, Server, Container } from 'lucide-react';

const technologyCategories = {
  en: [
    {
      icon: Cloud,
      title: "Cloud Platforms",
      items: ["AWS", "Microsoft Azure", "Google Cloud Platform"],
    },
    {
      icon: Database,
      title: "Enterprise Databases",
      items: ["PostgreSQL", "MySQL", "Oracle", "SQL Server", "MongoDB", "Redis", "Aurora"],
    },
    {
      icon: Server,
      title: "Infrastructure",
      items: ["Kubernetes", "Docker", "Terraform", "VMware", "Red Hat OpenShift"],
    },
    {
      icon: Brain,
      title: "AI & ML Platforms",
      items: ["Azure OpenAI", "AWS Bedrock", "Vertex AI", "LangChain", "RAG"],
    },
    {
      icon: Container,
      title: "Vector Databases",
      items: ["pgvector", "Pinecone", "Weaviate"],
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      items: ["SOC 2", "HIPAA", "GDPR", "PCI-DSS", "Zero Trust", "IAM"],
    },
  ],
  es: [
    {
      icon: Cloud,
      title: "Plataformas Cloud",
      items: ["AWS", "Microsoft Azure", "Google Cloud Platform"],
    },
    {
      icon: Database,
      title: "Bases de Datos Empresariales",
      items: ["PostgreSQL", "MySQL", "Oracle", "SQL Server", "MongoDB", "Redis", "Aurora"],
    },
    {
      icon: Server,
      title: "Infraestructura",
      items: ["Kubernetes", "Docker", "Terraform", "VMware", "Red Hat OpenShift"],
    },
    {
      icon: Brain,
      title: "Plataformas IA & ML",
      items: ["Azure OpenAI", "AWS Bedrock", "Vertex AI", "LangChain", "RAG"],
    },
    {
      icon: Container,
      title: "Bases de Datos Vectoriales",
      items: ["pgvector", "Pinecone", "Weaviate"],
    },
    {
      icon: Shield,
      title: "Seguridad y Cumplimiento",
      items: ["SOC 2", "HIPAA", "GDPR", "PCI-DSS", "Zero Trust", "IAM"],
    },
  ],
};

const sectionContent = {
  en: {
    title: "Enterprise-Grade Technology Stack",
    subtitle: "We partner with industry-leading platforms to deliver secure, scalable solutions",
  },
  es: {
    title: "Stack Tecnológico de Nivel Empresarial",
    subtitle: "Nos asociamos con plataformas líderes de la industria para entregar soluciones seguras y escalables",
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
