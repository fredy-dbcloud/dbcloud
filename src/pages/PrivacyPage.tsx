import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

const privacyContent = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated: January 26, 2025",
    sections: [
      {
        title: "1. Introduction",
        content: `${siteConfig.name} ("Company," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. This policy complies with applicable U.S. federal and state privacy laws, including the California Consumer Privacy Act (CCPA), California Privacy Rights Act (CPRA), and other applicable regulations.`
      },
      {
        title: "2. Information We Collect",
        content: `We collect information you provide directly to us, including:

• **Personal Identifiers:** Name, email address, phone number, company name, and mailing address
• **Professional Information:** Job title, company size, and industry
• **Account Information:** Login credentials and account preferences
• **Payment Information:** Billing address and payment method details (processed through secure third-party payment processors)
• **Communications:** Information you provide when contacting us, including support requests and feedback
• **Usage Data:** Information about how you interact with our services, including IP addresses, browser type, operating system, and pages visited`
      },
      {
        title: "3. How We Use Your Information",
        content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Process transactions and send related information
• Send promotional communications (with your consent)
• Respond to your comments, questions, and requests
• Monitor and analyze trends, usage, and activities
• Detect, investigate, and prevent fraudulent transactions and other illegal activities
• Personalize and improve your experience
• Comply with legal obligations`
      },
      {
        title: "4. Information Sharing and Disclosure",
        content: `We may share your information in the following circumstances:

• **Service Providers:** With third-party vendors who perform services on our behalf (e.g., cloud hosting, analytics, payment processing)
• **Business Transfers:** In connection with a merger, acquisition, or sale of assets
• **Legal Compliance:** When required by law or to respond to legal process
• **Protection of Rights:** To protect the rights, property, and safety of ${siteConfig.name}, our users, or others
• **With Your Consent:** When you direct us to share your information

We do not sell your personal information to third parties.`
      },
      {
        title: "5. Data Security",
        content: `We implement industry-standard security measures to protect your personal information, including:

• SOC 2 Type II certified infrastructure
• Encryption of data in transit (TLS 1.3) and at rest (AES-256)
• Regular security audits and penetration testing
• Access controls and authentication mechanisms
• Employee training on data protection

While we strive to protect your information, no method of transmission over the Internet is 100% secure.`
      },
      {
        title: "6. Your Privacy Rights",
        content: `Depending on your location, you may have the following rights:

**For California Residents (CCPA/CPRA):**
• Right to know what personal information we collect
• Right to delete your personal information
• Right to opt-out of the sale of personal information
• Right to non-discrimination for exercising your rights
• Right to correct inaccurate personal information
• Right to limit use of sensitive personal information

**For All Users:**
• Access your personal information
• Request correction of inaccurate data
• Request deletion of your data
• Opt-out of marketing communications

To exercise these rights, contact us at ${siteConfig.email}.`
      },
      {
        title: "7. Cookies and Tracking Technologies",
        content: `We use cookies and similar tracking technologies to:

• Remember your preferences and settings
• Analyze website traffic and usage patterns
• Deliver targeted advertising (with consent where required)
• Improve our services

You can control cookies through your browser settings. Some features may not function properly if cookies are disabled.`
      },
      {
        title: "8. Data Retention",
        content: `We retain personal information for as long as necessary to:

• Provide our services
• Comply with legal obligations
• Resolve disputes
• Enforce our agreements

When data is no longer needed, we securely delete or anonymize it.`
      },
      {
        title: "9. International Data Transfers",
        content: `If you are accessing our services from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States. By using our services, you consent to this transfer.`
      },
      {
        title: "10. Children's Privacy",
        content: `Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If we learn we have collected information from a child, we will delete it promptly.`
      },
      {
        title: "11. Changes to This Policy",
        content: `We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.`
      },
      {
        title: "12. Contact Us",
        content: `If you have questions about this Privacy Policy or our privacy practices, please contact us:

**${siteConfig.name}**
Email: ${siteConfig.email}
Phone: ${siteConfig.phone}
Operating remotely across the United States`
      }
    ]
  },
  es: {
    title: "Política de Privacidad",
    lastUpdated: "Última Actualización: 26 de Enero, 2025",
    sections: [
      {
        title: "1. Introducción",
        content: `${siteConfig.name} ("Empresa," "nosotros," o "nuestro") está comprometido con proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando visita nuestro sitio web o utiliza nuestros servicios. Esta política cumple con las leyes de privacidad federales y estatales aplicables de EE.UU., incluyendo la Ley de Privacidad del Consumidor de California (CCPA), la Ley de Derechos de Privacidad de California (CPRA), y otras regulaciones aplicables.`
      },
      {
        title: "2. Información que Recopilamos",
        content: `Recopilamos información que usted nos proporciona directamente, incluyendo:

• **Identificadores Personales:** Nombre, dirección de correo electrónico, número de teléfono, nombre de empresa y dirección postal
• **Información Profesional:** Cargo, tamaño de la empresa e industria
• **Información de Cuenta:** Credenciales de inicio de sesión y preferencias de cuenta
• **Información de Pago:** Dirección de facturación y detalles del método de pago (procesados a través de procesadores de pago seguros de terceros)
• **Comunicaciones:** Información que proporciona al contactarnos, incluyendo solicitudes de soporte y comentarios
• **Datos de Uso:** Información sobre cómo interactúa con nuestros servicios, incluyendo direcciones IP, tipo de navegador, sistema operativo y páginas visitadas`
      },
      {
        title: "3. Cómo Usamos Su Información",
        content: `Usamos la información que recopilamos para:

• Proporcionar, mantener y mejorar nuestros servicios
• Procesar transacciones y enviar información relacionada
• Enviar comunicaciones promocionales (con su consentimiento)
• Responder a sus comentarios, preguntas y solicitudes
• Monitorear y analizar tendencias, uso y actividades
• Detectar, investigar y prevenir transacciones fraudulentas y otras actividades ilegales
• Personalizar y mejorar su experiencia
• Cumplir con obligaciones legales`
      },
      {
        title: "4. Compartir y Divulgación de Información",
        content: `Podemos compartir su información en las siguientes circunstancias:

• **Proveedores de Servicios:** Con proveedores terceros que realizan servicios en nuestro nombre (ej., alojamiento en la nube, análisis, procesamiento de pagos)
• **Transferencias Comerciales:** En conexión con una fusión, adquisición o venta de activos
• **Cumplimiento Legal:** Cuando lo requiera la ley o para responder a procesos legales
• **Protección de Derechos:** Para proteger los derechos, propiedad y seguridad de ${siteConfig.name}, nuestros usuarios u otros
• **Con Su Consentimiento:** Cuando usted nos indique que compartamos su información

No vendemos su información personal a terceros.`
      },
      {
        title: "5. Seguridad de Datos",
        content: `Implementamos medidas de seguridad estándar de la industria para proteger su información personal, incluyendo:

• Infraestructura certificada SOC 2 Tipo II
• Cifrado de datos en tránsito (TLS 1.3) y en reposo (AES-256)
• Auditorías de seguridad regulares y pruebas de penetración
• Controles de acceso y mecanismos de autenticación
• Capacitación de empleados en protección de datos

Aunque nos esforzamos por proteger su información, ningún método de transmisión por Internet es 100% seguro.`
      },
      {
        title: "6. Sus Derechos de Privacidad",
        content: `Dependiendo de su ubicación, puede tener los siguientes derechos:

**Para Residentes de California (CCPA/CPRA):**
• Derecho a saber qué información personal recopilamos
• Derecho a eliminar su información personal
• Derecho a optar por no participar en la venta de información personal
• Derecho a la no discriminación por ejercer sus derechos
• Derecho a corregir información personal inexacta
• Derecho a limitar el uso de información personal sensible

**Para Todos los Usuarios:**
• Acceder a su información personal
• Solicitar corrección de datos inexactos
• Solicitar eliminación de sus datos
• Optar por no recibir comunicaciones de marketing

Para ejercer estos derechos, contáctenos en ${siteConfig.email}.`
      },
      {
        title: "7. Cookies y Tecnologías de Seguimiento",
        content: `Usamos cookies y tecnologías de seguimiento similares para:

• Recordar sus preferencias y configuraciones
• Analizar el tráfico y patrones de uso del sitio web
• Entregar publicidad dirigida (con consentimiento donde sea requerido)
• Mejorar nuestros servicios

Puede controlar las cookies a través de la configuración de su navegador. Algunas funciones pueden no funcionar correctamente si las cookies están deshabilitadas.`
      },
      {
        title: "8. Retención de Datos",
        content: `Retenemos información personal durante el tiempo necesario para:

• Proporcionar nuestros servicios
• Cumplir con obligaciones legales
• Resolver disputas
• Hacer cumplir nuestros acuerdos

Cuando los datos ya no son necesarios, los eliminamos o anonimizamos de forma segura.`
      },
      {
        title: "9. Transferencias Internacionales de Datos",
        content: `Si está accediendo a nuestros servicios desde fuera de los Estados Unidos, tenga en cuenta que su información puede ser transferida, almacenada y procesada en los Estados Unidos. Al usar nuestros servicios, usted consiente esta transferencia.`
      },
      {
        title: "10. Privacidad de Menores",
        content: `Nuestros servicios no están dirigidos a individuos menores de 18 años. No recopilamos conscientemente información personal de niños. Si descubrimos que hemos recopilado información de un menor, la eliminaremos de inmediato.`
      },
      {
        title: "11. Cambios a Esta Política",
        content: `Podemos actualizar esta Política de Privacidad de vez en cuando. Le notificaremos de cambios materiales publicando la nueva política en esta página y actualizando la fecha de "Última Actualización". Su uso continuado de nuestros servicios después de los cambios constituye aceptación de la política actualizada.`
      },
      {
        title: "12. Contáctenos",
        content: `Si tiene preguntas sobre esta Política de Privacidad o nuestras prácticas de privacidad, contáctenos:

**${siteConfig.name}**
Email: ${siteConfig.email}
Teléfono: ${siteConfig.phone}
Operando remotamente en Estados Unidos`
      }
    ]
  }
};

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
