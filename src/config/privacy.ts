import { siteConfig } from './site';

export const privacyContent = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated: January 29, 2025",
    sections: [
      {
        title: "1. Introduction",
        content: `${siteConfig.name} ("Company," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services, including our cloud infrastructure, managed database, and AI-powered solutions.

This policy is designed to comply with applicable U.S. federal and state privacy laws, including the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA). Even where not legally required, we voluntarily honor applicable privacy rights for all users.`
      },
      {
        title: "2. Information We Collect",
        content: `We collect information you provide directly to us, including:

• **Personal Identifiers:** Name, email address, phone number, company name, and mailing address
• **Professional Information:** Job title, company size, and industry
• **Account Information:** Login credentials and account preferences
• **Payment Information:** Billing address and payment method details (processed through secure third-party payment processors such as Stripe)
• **Communications:** Information you provide when contacting us through our website forms, including support requests and feedback
• **Service Data:** Information related to your use of our cloud infrastructure, managed database services, and AI-powered tools
• **Usage Data:** Information about how you interact with our services, including IP addresses, browser type, operating system, and pages visited`
      },
      {
        title: "3. How We Use Your Information",
        content: `We use the information we collect to:

• Provide, maintain, and improve our cloud infrastructure, database management, and AI services
• Process transactions and send related billing and service information
• Send service-related communications and updates
• Respond to your comments, questions, and support requests
• Monitor and analyze trends, usage, and activities to improve our services
• Detect, investigate, and prevent fraudulent transactions and other illegal activities
• Personalize and improve your experience
• Comply with legal obligations

**AI Services:** When you use our AI-powered services (including AI assistants, operations automation, and reporting tools), we process your data solely to deliver the requested functionality. Your data, prompts, and documents are NOT used to train public or third-party AI models. AI processing is customer-scoped, and data ownership remains with you.`
      },
      {
        title: "4. Information Sharing and Disclosure",
        content: `We may share your information with third-party service providers who perform services on our behalf, including:

• **Cloud Hosting Providers:** For infrastructure and data storage
• **Database Service Providers:** For managed database operations
• **Email Delivery Services:** For transactional and service communications (e.g., Resend)
• **Collaboration Tools:** For internal team notifications and support coordination (e.g., Slack)
• **Analytics Providers:** For website and service usage analysis
• **Payment Processors:** For secure billing and payment processing (e.g., Stripe)

We may also share your information:

• **Business Transfers:** In connection with a merger, acquisition, or sale of assets
• **Legal Compliance:** When required by law or to respond to legal process
• **Protection of Rights:** To protect the rights, property, and safety of ${siteConfig.name}, our users, or others
• **With Your Consent:** When you direct us to share your information

**We do not sell your personal information to third parties.**`
      },
      {
        title: "5. Data Security",
        content: `We implement industry-standard security measures to protect your personal information, including:

• Use of infrastructure and service providers that maintain SOC 2 Type II or equivalent certifications
• Encryption of data in transit using TLS and at rest using AES-256 or equivalent standards
• Regular security assessments and monitoring
• Access controls and authentication mechanisms
• Employee training on data protection best practices

While we strive to protect your information using commercially reasonable measures, no method of transmission over the Internet or electronic storage is completely secure. We cannot guarantee absolute security but are committed to maintaining appropriate safeguards.`
      },
      {
        title: "6. AI Services and Data Ownership",
        content: `When you use ${siteConfig.name}'s AI-powered services:

• **Your Data Remains Yours:** All data, prompts, documents, and outputs generated through our AI services remain your property.
• **No Training on Your Data:** Your data is NOT used to train, improve, or develop public AI models or third-party systems.
• **Customer-Scoped Processing:** AI processing is isolated to your account and used solely to deliver the services you request.
• **Data Minimization:** We process only the data necessary to provide the requested AI functionality.
• **Secure Processing:** AI operations are conducted using secure infrastructure with appropriate access controls.

Our AI services are designed to enhance your operations while respecting your data privacy and ownership rights.`
      },
      {
        title: "7. Your Privacy Rights",
        content: `Depending on your location, you may have the following rights:

**For California Residents (CCPA/CPRA):**
• Right to know what personal information we collect, use, and disclose
• Right to delete your personal information
• Right to opt-out of the sale of personal information (note: we do not sell personal information)
• Right to non-discrimination for exercising your rights
• Right to correct inaccurate personal information
• Right to limit use of sensitive personal information

**For All Users:**
Even where not legally required, we voluntarily honor the following rights:
• Access your personal information upon request
• Request correction of inaccurate data
• Request deletion of your data (subject to legal retention requirements)
• Opt-out of marketing communications at any time

To exercise these rights, contact us at ${siteConfig.email}. We will respond to verified requests within the timeframes required by applicable law.`
      },
      {
        title: "8. Cookies and Tracking Technologies",
        content: `We use cookies and similar tracking technologies to:

• Remember your preferences and settings
• Analyze website traffic and usage patterns
• Improve our services and user experience
• Maintain security and prevent fraud

We do not currently engage in targeted advertising. If this changes in the future, we will update this policy and provide appropriate notice and choices.

You can control cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our services.`
      },
      {
        title: "9. Data Retention",
        content: `We retain personal information for as long as necessary to:

• Provide our services and fulfill the purposes described in this policy
• Comply with legal, accounting, and regulatory obligations
• Resolve disputes and enforce our agreements
• Maintain business records as required by applicable law

When data is no longer needed for these purposes, we securely delete or anonymize it in accordance with our data retention procedures.`
      },
      {
        title: "10. International Data Transfers",
        content: `Our services are primarily operated in the United States. If you are accessing our services from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States or other jurisdictions where our service providers operate.

By using our services, you acknowledge and consent to the transfer and processing of your information in jurisdictions that may have different data protection laws than your country of residence.`
      },
      {
        title: "11. Children's Privacy",
        content: `Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information promptly.

If you are a parent or guardian and believe your child has provided us with personal information, please contact us at ${siteConfig.email}.`
      },
      {
        title: "12. Third-Party Links and Services",
        content: `Our website and services may contain links to third-party websites or integrate with third-party services. This Privacy Policy does not apply to those third-party sites or services. We encourage you to review the privacy policies of any third-party sites or services before providing your information.`
      },
      {
        title: "13. Changes to This Policy",
        content: `We may update this Privacy Policy from time to time to reflect changes in our practices, services, or applicable laws. We will notify you of material changes by:

• Posting the updated policy on this page
• Updating the "Last Updated" date at the top of this policy
• Sending notification through our services where appropriate

Your continued use of our services after any changes constitutes acceptance of the updated policy. We encourage you to review this policy periodically.`
      },
      {
        title: "14. Contact Us",
        content: `If you have questions about this Privacy Policy, our privacy practices, or wish to exercise your privacy rights, please contact us:

**${siteConfig.name}**
Email: ${siteConfig.email}
Phone: ${siteConfig.phone}
Operating remotely across the United States

For privacy-related inquiries, please include "Privacy Request" in the subject line of your email to help us route your request appropriately.`
      }
    ]
  },
  es: {
    title: "Política de Privacidad",
    lastUpdated: "Última Actualización: 29 de Enero, 2025",
    sections: [
      {
        title: "1. Introducción",
        content: `${siteConfig.name} ("Empresa," "nosotros," o "nuestro") está comprometido con proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando visita nuestro sitio web o utiliza nuestros servicios, incluyendo nuestra infraestructura en la nube, bases de datos administradas y soluciones impulsadas por IA.

Esta política está diseñada para cumplir con las leyes de privacidad federales y estatales aplicables de EE.UU., incluyendo la Ley de Privacidad del Consumidor de California (CCPA) y la Ley de Derechos de Privacidad de California (CPRA). Incluso cuando no sea legalmente requerido, honramos voluntariamente los derechos de privacidad aplicables para todos los usuarios.`
      },
      {
        title: "2. Información que Recopilamos",
        content: `Recopilamos información que usted nos proporciona directamente, incluyendo:

• **Identificadores Personales:** Nombre, dirección de correo electrónico, número de teléfono, nombre de empresa y dirección postal
• **Información Profesional:** Cargo, tamaño de la empresa e industria
• **Información de Cuenta:** Credenciales de inicio de sesión y preferencias de cuenta
• **Información de Pago:** Dirección de facturación y detalles del método de pago (procesados a través de procesadores de pago seguros de terceros como Stripe)
• **Comunicaciones:** Información que proporciona al contactarnos a través de nuestros formularios web, incluyendo solicitudes de soporte y comentarios
• **Datos del Servicio:** Información relacionada con su uso de nuestra infraestructura en la nube, servicios de bases de datos administradas y herramientas impulsadas por IA
• **Datos de Uso:** Información sobre cómo interactúa con nuestros servicios, incluyendo direcciones IP, tipo de navegador, sistema operativo y páginas visitadas`
      },
      {
        title: "3. Cómo Usamos Su Información",
        content: `Usamos la información que recopilamos para:

• Proporcionar, mantener y mejorar nuestra infraestructura en la nube, gestión de bases de datos y servicios de IA
• Procesar transacciones y enviar información de facturación y servicio relacionada
• Enviar comunicaciones y actualizaciones relacionadas con el servicio
• Responder a sus comentarios, preguntas y solicitudes de soporte
• Monitorear y analizar tendencias, uso y actividades para mejorar nuestros servicios
• Detectar, investigar y prevenir transacciones fraudulentas y otras actividades ilegales
• Personalizar y mejorar su experiencia
• Cumplir con obligaciones legales

**Servicios de IA:** Cuando utiliza nuestros servicios impulsados por IA (incluyendo asistentes de IA, automatización de operaciones y herramientas de informes), procesamos sus datos únicamente para entregar la funcionalidad solicitada. Sus datos, prompts y documentos NO se utilizan para entrenar modelos de IA públicos o de terceros. El procesamiento de IA está limitado a su cuenta, y la propiedad de los datos permanece con usted.`
      },
      {
        title: "4. Compartir y Divulgación de Información",
        content: `Podemos compartir su información con proveedores de servicios terceros que realizan servicios en nuestro nombre, incluyendo:

• **Proveedores de Alojamiento en la Nube:** Para infraestructura y almacenamiento de datos
• **Proveedores de Servicios de Bases de Datos:** Para operaciones de bases de datos administradas
• **Servicios de Entrega de Correo Electrónico:** Para comunicaciones transaccionales y de servicio (ej., Resend)
• **Herramientas de Colaboración:** Para notificaciones internas del equipo y coordinación de soporte (ej., Slack)
• **Proveedores de Análisis:** Para análisis de uso del sitio web y servicios
• **Procesadores de Pago:** Para facturación segura y procesamiento de pagos (ej., Stripe)

También podemos compartir su información:

• **Transferencias Comerciales:** En conexión con una fusión, adquisición o venta de activos
• **Cumplimiento Legal:** Cuando lo requiera la ley o para responder a procesos legales
• **Protección de Derechos:** Para proteger los derechos, propiedad y seguridad de ${siteConfig.name}, nuestros usuarios u otros
• **Con Su Consentimiento:** Cuando usted nos indique que compartamos su información

**No vendemos su información personal a terceros.**`
      },
      {
        title: "5. Seguridad de Datos",
        content: `Implementamos medidas de seguridad estándar de la industria para proteger su información personal, incluyendo:

• Uso de infraestructura y proveedores de servicios que mantienen certificaciones SOC 2 Tipo II o equivalentes
• Cifrado de datos en tránsito usando TLS y en reposo usando AES-256 o estándares equivalentes
• Evaluaciones de seguridad regulares y monitoreo
• Controles de acceso y mecanismos de autenticación
• Capacitación de empleados en mejores prácticas de protección de datos

Aunque nos esforzamos por proteger su información usando medidas comercialmente razonables, ningún método de transmisión por Internet o almacenamiento electrónico es completamente seguro. No podemos garantizar seguridad absoluta, pero estamos comprometidos a mantener salvaguardas apropiadas.`
      },
      {
        title: "6. Servicios de IA y Propiedad de Datos",
        content: `Cuando utiliza los servicios impulsados por IA de ${siteConfig.name}:

• **Sus Datos Permanecen Suyos:** Todos los datos, prompts, documentos y resultados generados a través de nuestros servicios de IA permanecen como su propiedad.
• **Sin Entrenamiento con Sus Datos:** Sus datos NO se utilizan para entrenar, mejorar o desarrollar modelos de IA públicos o sistemas de terceros.
• **Procesamiento Limitado al Cliente:** El procesamiento de IA está aislado a su cuenta y se usa únicamente para entregar los servicios que solicita.
• **Minimización de Datos:** Procesamos solo los datos necesarios para proporcionar la funcionalidad de IA solicitada.
• **Procesamiento Seguro:** Las operaciones de IA se realizan utilizando infraestructura segura con controles de acceso apropiados.

Nuestros servicios de IA están diseñados para mejorar sus operaciones respetando su privacidad de datos y derechos de propiedad.`
      },
      {
        title: "7. Sus Derechos de Privacidad",
        content: `Dependiendo de su ubicación, puede tener los siguientes derechos:

**Para Residentes de California (CCPA/CPRA):**
• Derecho a saber qué información personal recopilamos, usamos y divulgamos
• Derecho a eliminar su información personal
• Derecho a optar por no participar en la venta de información personal (nota: no vendemos información personal)
• Derecho a la no discriminación por ejercer sus derechos
• Derecho a corregir información personal inexacta
• Derecho a limitar el uso de información personal sensible

**Para Todos los Usuarios:**
Incluso cuando no sea legalmente requerido, honramos voluntariamente los siguientes derechos:
• Acceder a su información personal bajo solicitud
• Solicitar corrección de datos inexactos
• Solicitar eliminación de sus datos (sujeto a requisitos legales de retención)
• Optar por no recibir comunicaciones de marketing en cualquier momento

Para ejercer estos derechos, contáctenos en ${siteConfig.email}. Responderemos a solicitudes verificadas dentro de los plazos requeridos por la ley aplicable.`
      },
      {
        title: "8. Cookies y Tecnologías de Seguimiento",
        content: `Usamos cookies y tecnologías de seguimiento similares para:

• Recordar sus preferencias y configuraciones
• Analizar el tráfico y patrones de uso del sitio web
• Mejorar nuestros servicios y experiencia de usuario
• Mantener la seguridad y prevenir fraudes

Actualmente no realizamos publicidad dirigida. Si esto cambia en el futuro, actualizaremos esta política y proporcionaremos aviso y opciones apropiadas.

Puede controlar las cookies a través de la configuración de su navegador. Tenga en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad de nuestros servicios.`
      },
      {
        title: "9. Retención de Datos",
        content: `Retenemos información personal durante el tiempo necesario para:

• Proporcionar nuestros servicios y cumplir los propósitos descritos en esta política
• Cumplir con obligaciones legales, contables y regulatorias
• Resolver disputas y hacer cumplir nuestros acuerdos
• Mantener registros comerciales según lo requiera la ley aplicable

Cuando los datos ya no son necesarios para estos propósitos, los eliminamos o anonimizamos de forma segura de acuerdo con nuestros procedimientos de retención de datos.`
      },
      {
        title: "10. Transferencias Internacionales de Datos",
        content: `Nuestros servicios se operan principalmente en los Estados Unidos. Si está accediendo a nuestros servicios desde fuera de los Estados Unidos, tenga en cuenta que su información puede ser transferida, almacenada y procesada en los Estados Unidos u otras jurisdicciones donde operan nuestros proveedores de servicios.

Al usar nuestros servicios, usted reconoce y consiente la transferencia y procesamiento de su información en jurisdicciones que pueden tener leyes de protección de datos diferentes a las de su país de residencia.`
      },
      {
        title: "11. Privacidad de Menores",
        content: `Nuestros servicios no están dirigidos a individuos menores de 18 años. No recopilamos conscientemente información personal de niños menores de 18 años. Si descubrimos que hemos recopilado información personal de un menor de 18 años, tomaremos medidas para eliminar dicha información de inmediato.

Si usted es padre o tutor y cree que su hijo nos ha proporcionado información personal, contáctenos en ${siteConfig.email}.`
      },
      {
        title: "12. Enlaces y Servicios de Terceros",
        content: `Nuestro sitio web y servicios pueden contener enlaces a sitios web de terceros o integrarse con servicios de terceros. Esta Política de Privacidad no se aplica a esos sitios o servicios de terceros. Le recomendamos revisar las políticas de privacidad de cualquier sitio o servicio de terceros antes de proporcionar su información.`
      },
      {
        title: "13. Cambios a Esta Política",
        content: `Podemos actualizar esta Política de Privacidad de vez en cuando para reflejar cambios en nuestras prácticas, servicios o leyes aplicables. Le notificaremos de cambios materiales mediante:

• Publicación de la política actualizada en esta página
• Actualización de la fecha de "Última Actualización" en la parte superior de esta política
• Envío de notificación a través de nuestros servicios cuando sea apropiado

Su uso continuado de nuestros servicios después de cualquier cambio constituye aceptación de la política actualizada. Le recomendamos revisar esta política periódicamente.`
      },
      {
        title: "14. Contáctenos",
        content: `Si tiene preguntas sobre esta Política de Privacidad, nuestras prácticas de privacidad, o desea ejercer sus derechos de privacidad, contáctenos:

**${siteConfig.name}**
Email: ${siteConfig.email}
Teléfono: ${siteConfig.phone}
Operando remotamente en Estados Unidos

Para consultas relacionadas con privacidad, incluya "Solicitud de Privacidad" en el asunto de su correo electrónico para ayudarnos a dirigir su solicitud apropiadamente.`
      }
    ]
  }
};
