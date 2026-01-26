import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';

const termsContent = {
  en: {
    title: "Terms of Service",
    lastUpdated: "Last Updated: January 26, 2025",
    sections: [
      {
        title: "1. Acceptance of Terms",
        content: `These Terms of Service ("Terms") govern your access to and use of the services provided by ${siteConfig.name} ("Company," "we," "us," or "our"), including our website, software, APIs, and any other services we offer (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, do not use our Services.

These Terms constitute a legally binding agreement between you and ${siteConfig.name}. If you are using our Services on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.`
      },
      {
        title: "2. Description of Services",
        content: `${siteConfig.name} provides enterprise-grade managed database services, cloud infrastructure solutions, AI/ML services, and related consulting and support services. Our Services include:

• **Managed Database Services:** Administration, monitoring, optimization, and support for database systems
• **Cloud Infrastructure:** Multi-cloud solutions across AWS, Azure, and Google Cloud Platform
• **AI & Analytics:** Private AI agents, ML pipelines, and business intelligence solutions
• **Migration Services:** Database and application migration to cloud environments
• **Professional Services:** Consulting, training, and implementation support

Service availability, features, and pricing are subject to change. Current service descriptions are available on our website.`
      },
      {
        title: "3. Account Registration and Security",
        content: `To access certain Services, you must create an account. You agree to:

• Provide accurate, current, and complete information
• Maintain and promptly update your account information
• Keep your login credentials confidential
• Immediately notify us of any unauthorized access
• Accept responsibility for all activities under your account

We reserve the right to suspend or terminate accounts that violate these Terms or pose security risks.`
      },
      {
        title: "4. Service Level Agreement (SLA)",
        content: `Our Services are provided with a Service Level Agreement that specifies:

• **Uptime Commitment:** Up to 99.99% availability depending on your service tier
• **Response Times:** Priority-based support response times
• **Maintenance Windows:** Scheduled maintenance notifications
• **Credit Policy:** Service credits for SLA breaches

Specific SLA terms are detailed in your service agreement. The SLA applies only to services purchased under an active subscription.`
      },
      {
        title: "5. Acceptable Use Policy",
        content: `You agree not to use our Services to:

• Violate any applicable law, regulation, or third-party rights
• Transmit malware, viruses, or other malicious code
• Attempt to gain unauthorized access to our systems or other users' accounts
• Interfere with or disrupt the integrity or performance of our Services
• Use our Services for cryptocurrency mining without authorization
• Store or transmit content that is defamatory, obscene, or otherwise objectionable
• Engage in activities that consume excessive resources or negatively impact other customers
• Resell or redistribute our Services without authorization

Violation of this policy may result in immediate service termination without refund.`
      },
      {
        title: "6. Data Ownership and Processing",
        content: `**Your Data:** You retain all rights to your data. We do not claim ownership of any data you store or process through our Services.

**Data Processing:** We process your data only as necessary to provide our Services and as described in our Privacy Policy. We maintain appropriate security measures to protect your data.

**Data Portability:** You may export your data at any time. Upon termination, you have 30 days to retrieve your data before deletion.

**Compliance:** We support compliance with SOC 2, HIPAA, GDPR, and other regulatory frameworks. Specific compliance documentation is available upon request.`
      },
      {
        title: "7. Payment Terms",
        content: `**Billing:** Services are billed in advance on a monthly or annual basis. All fees are non-refundable unless otherwise specified.

**Payment Methods:** We accept major credit cards and ACH/wire transfers for enterprise accounts.

**Price Changes:** We may modify pricing with 30 days' notice. Price changes apply at your next renewal period.

**Late Payment:** Late payments may incur interest at 1.5% per month or the maximum rate permitted by law. We may suspend Services for overdue accounts.

**Taxes:** You are responsible for all applicable taxes. Prices do not include taxes unless stated.`
      },
      {
        title: "8. Intellectual Property",
        content: `**Our IP:** ${siteConfig.name} retains all rights to our Services, software, technology, branding, and documentation. You receive a limited, non-exclusive license to use our Services during your subscription.

**Your IP:** You retain ownership of your data, applications, and custom configurations.

**Feedback:** If you provide feedback or suggestions, we may use them without obligation or compensation to you.

**Trademarks:** ${siteConfig.name} and our logos are trademarks. You may not use them without written permission.`
      },
      {
        title: "9. Confidentiality",
        content: `Both parties agree to protect confidential information received from the other party. Confidential information includes:

• Technical and business information
• Pricing and contract terms
• Customer data and usage patterns
• Proprietary methodologies and processes

This obligation survives termination for 3 years. Standard exceptions apply (public information, independent development, required disclosures).`
      },
      {
        title: "10. Warranties and Disclaimers",
        content: `**Limited Warranty:** We warrant that our Services will perform substantially as described in the applicable documentation during your subscription.

**DISCLAIMER:** EXCEPT AS EXPRESSLY PROVIDED, OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT UNINTERRUPTED OR ERROR-FREE SERVICE.

**Third-Party Services:** We are not responsible for third-party services or content accessible through our Services.`
      },
      {
        title: "11. Limitation of Liability",
        content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW:

• **Consequential Damages:** NEITHER PARTY SHALL BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES.

• **Liability Cap:** OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU IN THE 12 MONTHS PRECEDING THE CLAIM.

• **Exceptions:** These limitations do not apply to: (a) your payment obligations; (b) either party's indemnification obligations; (c) violations of the other party's intellectual property rights; or (d) gross negligence or willful misconduct.`
      },
      {
        title: "12. Indemnification",
        content: `**Your Indemnification:** You agree to indemnify and defend ${siteConfig.name} against claims arising from: (a) your use of our Services; (b) your data or content; (c) your violation of these Terms; or (d) your violation of third-party rights.

**Our Indemnification:** We will indemnify you against claims that our Services infringe third-party intellectual property rights, subject to standard conditions and limitations.`
      },
      {
        title: "13. Term and Termination",
        content: `**Term:** These Terms remain in effect while you use our Services.

**Termination for Convenience:** Either party may terminate with 30 days' written notice.

**Termination for Cause:** Either party may terminate immediately if the other party materially breaches these Terms and fails to cure within 30 days of notice.

**Effect of Termination:** Upon termination:
• Your access to Services ends
• You must pay all outstanding fees
• You have 30 days to retrieve your data
• Provisions that should survive (IP, confidentiality, indemnification, limitation of liability) remain in effect`
      },
      {
        title: "14. Dispute Resolution",
        content: `**Governing Law:** These Terms are governed by the laws of the State of California, USA, without regard to conflict of laws principles.

**Arbitration:** Any dispute shall be resolved by binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. Arbitration shall take place in San Francisco, California.

**Class Action Waiver:** You agree to resolve disputes individually and waive any right to participate in class actions.

**Exceptions:** Either party may seek injunctive relief in court for IP infringement or confidentiality breaches.`
      },
      {
        title: "15. General Provisions",
        content: `**Entire Agreement:** These Terms, together with your service agreement and our Privacy Policy, constitute the entire agreement between you and ${siteConfig.name}.

**Amendments:** We may modify these Terms by posting updated versions on our website. Material changes take effect 30 days after posting. Continued use constitutes acceptance.

**Assignment:** You may not assign these Terms without our consent. We may assign our rights and obligations freely.

**Severability:** If any provision is found unenforceable, the remaining provisions continue in effect.

**Waiver:** Failure to enforce any right does not constitute a waiver.

**Force Majeure:** Neither party is liable for delays due to circumstances beyond reasonable control.`
      },
      {
        title: "16. Contact Information",
        content: `For questions about these Terms, please contact us:

**${siteConfig.name}**
Email: ${siteConfig.email}
Phone: ${siteConfig.phone}
Address: ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}

For legal notices, please send correspondence to our address above with "Legal Department" in the attention line.`
      }
    ]
  },
  es: {
    title: "Términos de Servicio",
    lastUpdated: "Última Actualización: 26 de Enero, 2025",
    sections: [
      {
        title: "1. Aceptación de Términos",
        content: `Estos Términos de Servicio ("Términos") rigen su acceso y uso de los servicios proporcionados por ${siteConfig.name} ("Empresa," "nosotros," o "nuestro"), incluyendo nuestro sitio web, software, APIs, y cualquier otro servicio que ofrezcamos (colectivamente, los "Servicios"). Al acceder o usar nuestros Servicios, usted acepta estar vinculado por estos Términos. Si no está de acuerdo, no use nuestros Servicios.

Estos Términos constituyen un acuerdo legalmente vinculante entre usted y ${siteConfig.name}. Si está usando nuestros Servicios en nombre de una organización, usted representa que tiene la autoridad para vincular a esa organización a estos Términos.`
      },
      {
        title: "2. Descripción de Servicios",
        content: `${siteConfig.name} proporciona servicios de bases de datos administradas de nivel empresarial, soluciones de infraestructura en la nube, servicios de IA/ML, y servicios relacionados de consultoría y soporte. Nuestros Servicios incluyen:

• **Servicios de Bases de Datos Administradas:** Administración, monitoreo, optimización y soporte para sistemas de bases de datos
• **Infraestructura Cloud:** Soluciones multi-nube en AWS, Azure y Google Cloud Platform
• **IA y Analítica:** Agentes de IA privados, pipelines de ML y soluciones de inteligencia de negocios
• **Servicios de Migración:** Migración de bases de datos y aplicaciones a entornos en la nube
• **Servicios Profesionales:** Consultoría, capacitación y soporte de implementación

La disponibilidad, características y precios de los servicios están sujetos a cambios. Las descripciones actuales de servicios están disponibles en nuestro sitio web.`
      },
      {
        title: "3. Registro de Cuenta y Seguridad",
        content: `Para acceder a ciertos Servicios, debe crear una cuenta. Usted acepta:

• Proporcionar información precisa, actual y completa
• Mantener y actualizar prontamente la información de su cuenta
• Mantener sus credenciales de inicio de sesión confidenciales
• Notificarnos inmediatamente de cualquier acceso no autorizado
• Aceptar responsabilidad por todas las actividades bajo su cuenta

Nos reservamos el derecho de suspender o terminar cuentas que violen estos Términos o representen riesgos de seguridad.`
      },
      {
        title: "4. Acuerdo de Nivel de Servicio (SLA)",
        content: `Nuestros Servicios se proporcionan con un Acuerdo de Nivel de Servicio que especifica:

• **Compromiso de Disponibilidad:** Hasta 99.99% de disponibilidad dependiendo de su nivel de servicio
• **Tiempos de Respuesta:** Tiempos de respuesta de soporte basados en prioridad
• **Ventanas de Mantenimiento:** Notificaciones de mantenimiento programado
• **Política de Créditos:** Créditos de servicio por incumplimientos del SLA

Los términos específicos del SLA se detallan en su acuerdo de servicio. El SLA aplica solo a servicios comprados bajo una suscripción activa.`
      },
      {
        title: "5. Política de Uso Aceptable",
        content: `Usted acepta no usar nuestros Servicios para:

• Violar cualquier ley aplicable, regulación o derechos de terceros
• Transmitir malware, virus u otro código malicioso
• Intentar obtener acceso no autorizado a nuestros sistemas o cuentas de otros usuarios
• Interferir o interrumpir la integridad o rendimiento de nuestros Servicios
• Usar nuestros Servicios para minería de criptomonedas sin autorización
• Almacenar o transmitir contenido difamatorio, obsceno u objetable
• Participar en actividades que consuman recursos excesivos o impacten negativamente a otros clientes
• Revender o redistribuir nuestros Servicios sin autorización

La violación de esta política puede resultar en terminación inmediata del servicio sin reembolso.`
      },
      {
        title: "6. Propiedad y Procesamiento de Datos",
        content: `**Sus Datos:** Usted retiene todos los derechos sobre sus datos. No reclamamos propiedad de ningún dato que almacene o procese a través de nuestros Servicios.

**Procesamiento de Datos:** Procesamos sus datos solo según sea necesario para proporcionar nuestros Servicios y como se describe en nuestra Política de Privacidad. Mantenemos medidas de seguridad apropiadas para proteger sus datos.

**Portabilidad de Datos:** Puede exportar sus datos en cualquier momento. Al terminar, tiene 30 días para recuperar sus datos antes de la eliminación.

**Cumplimiento:** Apoyamos el cumplimiento de SOC 2, HIPAA, GDPR y otros marcos regulatorios. La documentación de cumplimiento específica está disponible bajo solicitud.`
      },
      {
        title: "7. Términos de Pago",
        content: `**Facturación:** Los Servicios se facturan por adelantado de forma mensual o anual. Todas las tarifas no son reembolsables a menos que se especifique lo contrario.

**Métodos de Pago:** Aceptamos tarjetas de crédito principales y transferencias ACH/bancarias para cuentas empresariales.

**Cambios de Precio:** Podemos modificar los precios con 30 días de aviso. Los cambios de precio aplican en su próximo período de renovación.

**Pago Tardío:** Los pagos tardíos pueden incurrir en intereses del 1.5% por mes o la tasa máxima permitida por ley. Podemos suspender Servicios para cuentas vencidas.

**Impuestos:** Usted es responsable de todos los impuestos aplicables. Los precios no incluyen impuestos a menos que se indique.`
      },
      {
        title: "8. Propiedad Intelectual",
        content: `**Nuestra PI:** ${siteConfig.name} retiene todos los derechos sobre nuestros Servicios, software, tecnología, marca y documentación. Usted recibe una licencia limitada y no exclusiva para usar nuestros Servicios durante su suscripción.

**Su PI:** Usted retiene la propiedad de sus datos, aplicaciones y configuraciones personalizadas.

**Retroalimentación:** Si proporciona comentarios o sugerencias, podemos usarlos sin obligación o compensación hacia usted.

**Marcas Registradas:** ${siteConfig.name} y nuestros logos son marcas registradas. No puede usarlos sin permiso escrito.`
      },
      {
        title: "9. Confidencialidad",
        content: `Ambas partes acuerdan proteger la información confidencial recibida de la otra parte. La información confidencial incluye:

• Información técnica y comercial
• Precios y términos de contrato
• Datos de clientes y patrones de uso
• Metodologías y procesos propietarios

Esta obligación sobrevive la terminación por 3 años. Se aplican excepciones estándar (información pública, desarrollo independiente, divulgaciones requeridas).`
      },
      {
        title: "10. Garantías y Descargos",
        content: `**Garantía Limitada:** Garantizamos que nuestros Servicios funcionarán sustancialmente como se describe en la documentación aplicable durante su suscripción.

**DESCARGO:** EXCEPTO COMO SE PROPORCIONA EXPRESAMENTE, NUESTROS SERVICIOS SE PROPORCIONAN "TAL CUAL" Y "SEGÚN DISPONIBILIDAD." RECHAZAMOS TODAS LAS GARANTÍAS, EXPRESAS O IMPLÍCITAS, INCLUYENDO COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. NO GARANTIZAMOS SERVICIO ININTERRUMPIDO O LIBRE DE ERRORES.

**Servicios de Terceros:** No somos responsables de servicios o contenido de terceros accesibles a través de nuestros Servicios.`
      },
      {
        title: "11. Limitación de Responsabilidad",
        content: `EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY:

• **Daños Consecuentes:** NINGUNA PARTE SERÁ RESPONSABLE POR DAÑOS INDIRECTOS, INCIDENTALES, ESPECIALES, CONSECUENTES O PUNITIVOS, O PÉRDIDA DE GANANCIAS, INGRESOS, DATOS U OPORTUNIDADES COMERCIALES.

• **Límite de Responsabilidad:** NUESTRA RESPONSABILIDAD TOTAL NO EXCEDERÁ EL MONTO PAGADO POR USTED EN LOS 12 MESES ANTERIORES A LA RECLAMACIÓN.

• **Excepciones:** Estas limitaciones no aplican a: (a) sus obligaciones de pago; (b) las obligaciones de indemnización de cualquier parte; (c) violaciones de los derechos de propiedad intelectual de la otra parte; o (d) negligencia grave o conducta intencional.`
      },
      {
        title: "12. Indemnización",
        content: `**Su Indemnización:** Usted acepta indemnizar y defender a ${siteConfig.name} contra reclamaciones que surjan de: (a) su uso de nuestros Servicios; (b) sus datos o contenido; (c) su violación de estos Términos; o (d) su violación de derechos de terceros.

**Nuestra Indemnización:** Le indemnizaremos contra reclamaciones de que nuestros Servicios infringen derechos de propiedad intelectual de terceros, sujeto a condiciones y limitaciones estándar.`
      },
      {
        title: "13. Plazo y Terminación",
        content: `**Plazo:** Estos Términos permanecen en efecto mientras use nuestros Servicios.

**Terminación por Conveniencia:** Cualquier parte puede terminar con 30 días de aviso escrito.

**Terminación por Causa:** Cualquier parte puede terminar inmediatamente si la otra parte incumple materialmente estos Términos y no cura dentro de 30 días del aviso.

**Efecto de la Terminación:** Al terminar:
• Su acceso a los Servicios termina
• Debe pagar todas las tarifas pendientes
• Tiene 30 días para recuperar sus datos
• Las disposiciones que deben sobrevivir (PI, confidencialidad, indemnización, limitación de responsabilidad) permanecen en efecto`
      },
      {
        title: "14. Resolución de Disputas",
        content: `**Ley Aplicable:** Estos Términos se rigen por las leyes del Estado de California, EE.UU., sin considerar principios de conflicto de leyes.

**Arbitraje:** Cualquier disputa será resuelta por arbitraje vinculante administrado por la Asociación Americana de Arbitraje (AAA) bajo sus Reglas de Arbitraje Comercial. El arbitraje tendrá lugar en San Francisco, California.

**Renuncia a Demanda Colectiva:** Usted acepta resolver disputas individualmente y renuncia a cualquier derecho de participar en acciones colectivas.

**Excepciones:** Cualquier parte puede buscar medidas cautelares en tribunales por infracción de PI o violaciones de confidencialidad.`
      },
      {
        title: "15. Disposiciones Generales",
        content: `**Acuerdo Completo:** Estos Términos, junto con su acuerdo de servicio y nuestra Política de Privacidad, constituyen el acuerdo completo entre usted y ${siteConfig.name}.

**Enmiendas:** Podemos modificar estos Términos publicando versiones actualizadas en nuestro sitio web. Los cambios materiales entran en vigor 30 días después de la publicación. El uso continuado constituye aceptación.

**Cesión:** No puede ceder estos Términos sin nuestro consentimiento. Podemos ceder nuestros derechos y obligaciones libremente.

**Divisibilidad:** Si alguna disposición se encuentra inaplicable, las disposiciones restantes continúan en efecto.

**Renuncia:** El no hacer cumplir cualquier derecho no constituye una renuncia.

**Fuerza Mayor:** Ninguna parte es responsable por retrasos debido a circunstancias fuera de control razonable.`
      },
      {
        title: "16. Información de Contacto",
        content: `Para preguntas sobre estos Términos, por favor contáctenos:

**${siteConfig.name}**
Email: ${siteConfig.email}
Teléfono: ${siteConfig.phone}
Dirección: ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}

Para avisos legales, por favor envíe correspondencia a nuestra dirección arriba con "Departamento Legal" en la línea de atención.`
      }
    ]
  }
};

export default function TermsPage() {
  const { lang } = useLang();
  const content = termsContent[lang];

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
