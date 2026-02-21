import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Bot, CheckCircle, ArrowRight, Lock, MessageSquare, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

export default function AIAssistantsPage() {
  const { lang } = useLang();

  // Unified CTA across all AI pages
  const unifiedCTA = lang === 'es' ? 'Hablar con un Especialista' : 'Talk to a Specialist';

  const content = {
    en: {
      badge: 'AI Assistants for Teams',
      headline: 'Your company knowledge, instantly accessible.',
      subheadline: 'Private AI assistants that answer questions from your SOPs, documents, and internal data—securely.',
      whoFor: 'Built for US small businesses with documentation, SOPs, and internal processes that need to be searchable.',
      benefits: [
        { icon: MessageSquare, title: 'Instant answers', desc: 'Ask questions, get answers from your internal knowledge base.' },
        { icon: Lock, title: '100% private', desc: 'Your data never leaves your environment. No training on your data.' },
        { icon: FileText, title: 'Works with your docs', desc: 'Connect SOPs, policies, and internal wikis.' },
      ],
      painPoints: [
        'Team keeps asking the same questions repeatedly',
        'Important knowledge locked in documents nobody reads',
        'New hires take too long to get up to speed',
        'Worried about putting company data in public AI tools',
      ],
      howItWorks: [
        { step: '1', title: 'We connect your docs', desc: 'SOPs, wikis, policies—whatever your team uses.' },
        { step: '2', title: 'We build your assistant', desc: 'Custom AI trained only on your internal knowledge.' },
        { step: '3', title: 'Your team gets answers', desc: 'Instant responses without bothering colleagues.' },
      ],
      included: [
        'Chat with your internal documents',
        'Smart search across all company knowledge',
        'Automated responses to common questions',
        'Secure, private deployment',
      ],
      notIncluded: [
        'Custom voice assistants',
        'Multi-language translation',
        'External customer-facing chatbots',
      ],
      pricing: {
        title: 'Simple Pricing',
        price: 'From $299/mo',
        desc: 'Setup included. No AI expertise required. Start in 48 hours.',
      },
    },
    es: {
      badge: 'Asistentes IA para Equipos',
      headline: 'El conocimiento de tu empresa, al instante.',
      subheadline: 'Asistentes de IA privados que responden preguntas desde tus SOPs, documentos y datos internos—de forma segura.',
      whoFor: 'Diseñado para PyMEs en EE.UU. con documentación, SOPs y procesos internos que necesitan ser buscables.',
      benefits: [
        { icon: MessageSquare, title: 'Respuestas instantáneas', desc: 'Haz preguntas, obtén respuestas de tu base de conocimiento.' },
        { icon: Lock, title: '100% privado', desc: 'Tus datos nunca salen de tu ambiente. Sin entrenar con tus datos.' },
        { icon: FileText, title: 'Funciona con tus docs', desc: 'Conecta SOPs, políticas y wikis internos.' },
      ],
      painPoints: [
        'El equipo sigue haciendo las mismas preguntas',
        'Conocimiento importante atrapado en documentos que nadie lee',
        'Nuevos empleados tardan demasiado en adaptarse',
        'Preocupación por poner datos en herramientas IA públicas',
      ],
      howItWorks: [
        { step: '1', title: 'Conectamos tus docs', desc: 'SOPs, wikis, políticas—lo que use tu equipo.' },
        { step: '2', title: 'Construimos tu asistente', desc: 'IA personalizada entrenada solo con tu conocimiento interno.' },
        { step: '3', title: 'Tu equipo obtiene respuestas', desc: 'Respuestas instantáneas sin molestar a colegas.' },
      ],
      included: [
        'Chatea con tus documentos internos',
        'Búsqueda inteligente en todo el conocimiento de la empresa',
        'Respuestas automatizadas a preguntas frecuentes',
        'Despliegue seguro y privado',
      ],
      notIncluded: [
        'Asistentes de voz personalizados',
        'Traducción multi-idioma',
        'Chatbots externos para clientes',
      ],
      pricing: {
        title: 'Precios Simples',
        price: 'Desde $299/mes',
        desc: 'Setup incluido. No requiere expertos en IA. Inicia en 48 horas.',
      },
    },
  };

  const c = content[lang];

  return (
    <Layout>
      {/* Hero - Problem → Outcome */}
      <section className="pt-32 pb-20 bg-hero-gradient">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm mb-6 text-base font-medium">
              <Bot className="h-5 w-5 text-accent" />
              <span>{c.badge}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {c.headline}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-5 leading-relaxed">
              {c.subheadline}
            </p>
            <p className="text-base text-white/75 mb-10">
              {c.whoFor}
            </p>
            {/* ONE Primary CTA */}
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg px-10 py-6 text-base">
              <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                {unifiedCTA}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {c.benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8"
              >
                <div className="inline-flex p-4 rounded-xl bg-accent/10 mb-5">
                  <benefit.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">
              {lang === 'es' ? '¿Te suena familiar?' : 'Sound familiar?'}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-5 text-left">
              {c.painPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-base leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-10">
              {lang === 'es' ? 'Cómo Funciona' : 'How It Works'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {c.howItWorks.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-display text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included / Not Included */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-xl font-bold mb-5 text-foreground">
                {lang === 'es' ? '✓ Incluido' : '✓ Included'}
              </h3>
              <ul className="space-y-4">
                {c.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-display text-xl font-bold mb-5 text-muted-foreground">
                {lang === 'es' ? '○ No Incluido' : '○ Not Included'}
              </h3>
              <ul className="space-y-4">
                {c.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-muted-foreground">
                    <span className="h-5 w-5 flex-shrink-0 mt-0.5">○</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing - ONE CTA */}
      <section className="py-20 bg-background">
        <div className="container max-w-2xl text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">{c.pricing.title}</h2>
          <p className="text-4xl font-bold text-accent mb-3">{c.pricing.price}</p>
          <p className="text-base text-muted-foreground mb-10">{c.pricing.desc}</p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg px-10 py-6 text-base">
            <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              {unifiedCTA}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <p className="mt-5 text-sm text-muted-foreground">
            {lang === 'es' ? '30 min gratis · Sin compromiso' : '30 min free · No commitment'}
          </p>
        </div>
      </section>
    </Layout>
  );
}
