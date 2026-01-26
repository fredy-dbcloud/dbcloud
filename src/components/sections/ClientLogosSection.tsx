import { motion } from 'framer-motion';
import { useLang } from '@/hooks/useLang';

/**
 * Client Logos / Social Proof Section
 * Enterprise B2B best practice: Show recognizable client logos to build trust.
 * Companies like MongoDB, Snowflake, Datadog prominently display Fortune 500 logos.
 */
export function ClientLogosSection() {
  const { lang } = useLang();

  // Placeholder logos - replace with actual client logos when available
  const clients = [
    { name: 'Fortune 500 Company', placeholder: true },
    { name: 'Tech Enterprise', placeholder: true },
    { name: 'Financial Services', placeholder: true },
    { name: 'Healthcare Leader', placeholder: true },
    { name: 'Retail Giant', placeholder: true },
    { name: 'Manufacturing Corp', placeholder: true },
  ];

  return (
    <section className="py-16 bg-muted/20 border-y border-border/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-medium text-muted-foreground mb-8 uppercase tracking-wider">
            {lang === 'es' 
              ? 'Empresas que confían en nosotros'
              : 'Trusted by leading enterprises'}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-center h-12 px-6"
              >
                {client.placeholder ? (
                  <div className="h-8 w-32 bg-muted-foreground/10 rounded flex items-center justify-center">
                    <span className="text-xs text-muted-foreground/50 font-medium">
                      {lang === 'es' ? 'Logo Cliente' : 'Client Logo'}
                    </span>
                  </div>
                ) : (
                  <img
                    src={`/logos/${client.name.toLowerCase().replace(/\s+/g, '-')}.svg`}
                    alt={client.name}
                    className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                  />
                )}
              </motion.div>
            ))}
          </div>
          
          <p className="mt-8 text-sm text-muted-foreground">
            {lang === 'es'
              ? 'Más de 500 empresas confían en DBCloud para su infraestructura crítica'
              : 'Over 500 enterprises trust DBCloud for their critical infrastructure'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
