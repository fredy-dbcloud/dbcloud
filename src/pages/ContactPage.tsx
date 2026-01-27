import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

export default function ContactPage() {
  const { lang, t } = useLang();

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: Phone,
      title: lang === 'es' ? 'Teléfono' : 'Phone',
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone}`,
    },
    {
      icon: MapPin,
      title: lang === 'es' ? 'Ubicación' : 'Location',
      value: lang === 'es' 
        ? 'Empresa registrada en EE.UU. — Operando remotamente'
        : 'US-Registered — Operating Remotely Nationwide',
    },
    {
      icon: Clock,
      title: lang === 'es' ? 'Horario' : 'Hours',
      value: lang === 'es' ? 'Lun-Vie: 9am - 6pm EST' : 'Mon-Fri: 9am - 6pm EST',
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-hero-gradient">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              {t.contact.title}
            </h1>
            <p className="text-lg text-white/80">
              {t.contact.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1 space-y-6"
            >
              {contactInfo.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border"
                >
                  <div className="flex-shrink-0 p-2 rounded-lg bg-accent/10">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">{item.title}</h3>
                    {item.href ? (
                      <a href={item.href} className="text-foreground hover:text-accent transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp */}
              <a
                href={siteConfig.WHATSAPP[lang]?.url || siteConfig.WHATSAPP.en.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-[#25D366] text-white hover:bg-[#25D366]/90 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="font-medium">{t.cta.whatsapp}</span>
              </a>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="p-8 rounded-2xl bg-card border border-border shadow-card">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
