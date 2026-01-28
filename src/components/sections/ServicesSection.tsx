import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cloud, Database, Brain, ArrowUpRight, Server, Shield, Zap } from 'lucide-react';
import { useLang } from '@/hooks/useLang';

export function ServicesSection() {
  const { t, getLocalizedPath } = useLang();

  const services = [
    {
      icon: Cloud,
      title: t.services.cloud.title,
      description: t.services.cloud.description,
      link: getLocalizedPath('/services'),
      color: 'from-blue-500 to-cyan-400',
    },
    {
      icon: Database,
      title: t.services.databases.title,
      description: t.services.databases.description,
      link: getLocalizedPath('/services'),
      color: 'from-emerald-500 to-teal-400',
    },
    {
      icon: Brain,
      title: t.services.ai.title,
      description: t.services.ai.description,
      link: getLocalizedPath('/ai'),
      color: 'from-violet-500 to-purple-400',
    },
    {
      icon: Zap,
      title: t.services.migration.title,
      description: t.services.migration.description,
      link: getLocalizedPath('/services'),
      color: 'from-orange-500 to-amber-400',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={service.link}
                className="group block h-full p-6 rounded-2xl bg-card border border-border hover:border-accent/60 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} mb-4 shadow-md`}>
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="font-display text-xl font-semibold mb-2 text-foreground group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <span className="inline-flex items-center text-sm font-semibold text-accent">
                  {t.cta.learnMore}
                  <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
