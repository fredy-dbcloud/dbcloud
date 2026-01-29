import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { useLang } from '@/hooks/useLang';
import { privacyContent } from '@/config/privacy';

export default function PrivacyPage() {
  const { lang } = useLang();
  const content = privacyContent[lang];

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
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              {content.title}
            </h1>
            <p className="text-white/80">
              {content.lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {content.sections.map((section, index) => (
                <div key={index} className="mb-10">
                  <h2 className="font-display text-xl font-bold text-foreground mb-4">
                    {section.title}
                  </h2>
                  <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {section.content.split('**').map((part, i) => 
                      i % 2 === 1 ? (
                        <strong key={i} className="text-foreground font-medium">{part}</strong>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
