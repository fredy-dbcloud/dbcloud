import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Home, DollarSign, PlayCircle, Mail, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  // Determine locale from current path, default to 'en'
  const lang = location.pathname.startsWith('/es') ? 'es' : 'en';

  const content = {
    en: {
      title: "Page Not Found",
      subtitle: "Sorry, the page you're looking for doesn't exist or has been moved.",
      helpText: "Here are some helpful links:",
      links: [
        { href: `/${lang}`, label: "Home", icon: Home },
        { href: `/${lang}/pricing`, label: "Pricing", icon: DollarSign },
        { href: `/${lang}/demo/growth`, label: "View Demo", icon: PlayCircle },
        { href: `/${lang}/contact`, label: "Contact Us", icon: Mail },
        { href: `/${lang}/portal`, label: "Client Portal", icon: LogIn },
      ],
    },
    es: {
      title: "Página No Encontrada",
      subtitle: "Lo sentimos, la página que buscas no existe o ha sido movida.",
      helpText: "Aquí tienes algunos enlaces útiles:",
      links: [
        { href: `/${lang}`, label: "Inicio", icon: Home },
        { href: `/${lang}/pricing`, label: "Precios", icon: DollarSign },
        { href: `/${lang}/demo/growth`, label: "Ver Demo", icon: PlayCircle },
        { href: `/${lang}/contact`, label: "Contáctanos", icon: Mail },
        { href: `/${lang}/portal`, label: "Portal de Cliente", icon: LogIn },
      ],
    },
  };

  const c = content[lang];

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center"
              >
                <span className="font-display text-5xl font-bold text-muted-foreground">404</span>
              </motion.div>
              <h1 className="font-display text-3xl font-bold mb-4">{c.title}</h1>
              <p className="text-muted-foreground mb-8">{c.subtitle}</p>
            </div>

            <div className="bg-card border rounded-xl p-6">
              <p className="text-sm text-muted-foreground mb-4">{c.helpText}</p>
              <div className="grid gap-3">
                {c.links.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Link to={link.href}>
                      <link.icon className="mr-2 h-4 w-4" />
                      {link.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
