import { motion } from 'framer-motion';
import { Users, Globe, FileText, Shield } from 'lucide-react';
import { useLang } from '@/hooks/useLang';

const content = {
  en: {
    title: 'Why Growing Businesses Choose DBCloud',
    items: [
      { icon: Users, text: 'Senior engineers only' },
      { icon: Globe, text: 'Real multi-cloud (AWS, Azure, GCP, Oracle)' },
      { icon: FileText, text: 'No long-term contracts' },
      { icon: Shield, text: 'Team structure — no single point of failure' },
    ],
  },
  es: {
    title: 'Por Qué Empresas en Crecimiento Eligen DBCloud',
    items: [
      { icon: Users, text: 'Ingenieros senior solamente' },
      { icon: Globe, text: 'Multi-cloud real (AWS, Azure, GCP, Oracle)' },
      { icon: FileText, text: 'Sin contratos largos' },
      { icon: Shield, text: 'Estructura de equipo — sin punto único de falla' },
    ],
  },
};

export function UnifiedDifferentiationSection() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            {t.title}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {t.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex flex-col items-center text-center gap-3 p-6 rounded-xl bg-card border border-border"
            >
              <div className="p-3 rounded-lg bg-accent/10">
                <item.icon className="h-6 w-6 text-accent" />
              </div>
              <p className="text-sm font-medium text-foreground leading-snug">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
