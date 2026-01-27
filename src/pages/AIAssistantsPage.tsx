import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bot, CheckCircle, ArrowRight, Lock, MessageSquare, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

export default function AIAssistantsPage() {
  const { lang, t, getLocalizedPath } = useLang();

  const content = {
    en: {
      badge: 'AI Assistants for Teams',
      headline: 'Your company knowledge, instantly accessible.',
      subheadline: 'Private AI assistants that answer questions from your SOPs, documents, and internal data—securely.',
      cta: 'Build My AI Assistant',
      ctaSecondary: 'View Pricing',
      benefits: [
        { icon: MessageSquare, title: 'Instant answers', desc: 'Ask questions, get answers from your internal knowledge base.' },
        { icon: Lock, title: '100% private', desc: 'Your data never leaves your environment. No training on your data.' },
        { icon: FileText, title: 'Works with your docs', desc: 'Connect SOPs, policies, and internal wikis.' },
      ],
      features: [
        'Chat with your internal documents',
        'Smart search across all company knowledge',
        'Automated responses to common questions',
        'Secure, private deployment',
      ],
      bestFor: 'Best for: Teams tired of answering the same questions repeatedly.',
      pricing: {
        title: 'Simple Pricing',
        starter: 'From $499/mo',
        desc: 'Setup included. No AI expertise required.',
      },
    },
    es: {
      badge: 'Asistentes IA para Equipos',
      headline: 'El conocimiento de tu empresa, al instante.',
      subheadline: 'Asistentes de IA privados que responden preguntas desde tus SOPs, documentos y datos internos—de forma segura.',
      cta: 'Crear Mi Asistente IA',
      ctaSecondary: 'Ver Precios',
      benefits: [
        { icon: MessageSquare, title: 'Respuestas instantáneas', desc: 'Haz preguntas, obtén respuestas de tu base de conocimiento.' },
        { icon: Lock, title: '100% privado', desc: 'Tus datos nunca salen de tu ambiente. Sin entrenar con tus datos.' },
        { icon: FileText, title: 'Funciona con tus docs', desc: 'Conecta SOPs, políticas y wikis internos.' },
      ],
      features: [
        'Chatea con tus documentos internos',
        'Búsqueda inteligente en todo el conocimiento de la empresa',
        'Respuestas automatizadas a preguntas frecuentes',
        'Despliegue seguro y privado',
      ],
      bestFor: 'Ideal para: Equipos cansados de responder las mismas preguntas una y otra vez.',
      pricing: {
        title: 'Precios Simples',
        starter: 'Desde $499/mes',
        desc: 'Setup incluido. No requiere expertos en IA.',
      },
    },
  };

  const c = content[lang];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero-gradient">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-6 text-sm">
              <Bot className="h-4 w-4 text-accent" />
              <span>{c.badge}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              {c.headline}
            </h1>
            <p className="text-lg text-white/80 mb-8">
              {c.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                  {c.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link to={getLocalizedPath('/pricing')}>
                  {c.ctaSecondary}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {c.benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-4">
                  <benefit.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-muted/30 border-y border-border">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <ul className="grid sm:grid-cols-2 gap-4 text-left">
              {c.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground italic">{c.bestFor}</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-12 bg-background">
        <div className="container max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold mb-2">{c.pricing.title}</h2>
          <p className="text-3xl font-bold text-accent mb-2">{c.pricing.starter}</p>
          <p className="text-sm text-muted-foreground mb-6">{c.pricing.desc}</p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              {c.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
