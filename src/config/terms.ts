import { siteConfig } from './site';

export const termsContent = {
  en: {
    title: "Terms of Service",
    lastUpdated: "Last Updated: January 29, 2025",
    sections: [
      {
        title: "1. Acceptance of Terms",
        content: `These Terms of Service ("Terms") govern your access to and use of the services provided by ${siteConfig.name} ("Company," "we," "us," or "our"), including our website, client portal, software, APIs, and any other services we offer (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, do not use our Services.

These Terms constitute a legally binding agreement between you and ${siteConfig.name}. If you are using our Services on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.`
      },
      {
        title: "2. Description of Services",
        content: `${siteConfig.name} provides managed database services, cloud infrastructure solutions, AI-powered services, and related consulting and support for businesses. Our Services include:

• **Managed Database Services:** Administration, monitoring, optimization, and support for database systems including PostgreSQL, MySQL, Oracle Database, and SQL Server
• **Cloud Infrastructure:** Multi-cloud solutions across AWS, Azure, Google Cloud Platform, and Oracle Cloud, including migrations and ongoing management
• **AI Solutions:** Private AI assistants, AI-powered operations automation, and AI-driven reporting and analytics tools
• **Professional Services:** Consulting, training, implementation support, and strategic advisory services
• **Client Portal:** Self-service access to submit requests, view service status, and access reports

Service availability, features, and pricing are subject to change. Current service descriptions and pricing are available on our website.`
      },
      {
        title: "3. Account Registration and Security",
        content: `To access certain Services, you must create an account. You agree to:

• Provide accurate, current, and complete information during registration
• Maintain and promptly update your account information as needed
• Keep your login credentials confidential and secure
• Immediately notify us of any unauthorized access or security breach
• Accept responsibility for all activities that occur under your account

We reserve the right to suspend or terminate accounts that violate these Terms, pose security risks, or remain inactive for extended periods.`
      },
      {
        title: "4. Service Level Agreement (SLA)",
        content: `Service Level Agreements are provided as part of paid subscription plans and are detailed in your specific service agreement. SLA terms may include:

• **Availability Targets:** Service availability commitments as specified in your service agreement
• **Response Times:** Support response time commitments based on priority level and service tier
• **Maintenance Windows:** Advance notification of scheduled maintenance
• **Service Credits:** Credit policies for verified SLA breaches, as defined in your service agreement

**Important:** SLA commitments apply only to paid subscriptions with executed service agreements. SLA terms, including any uptime commitments, are conditional upon the specific plan and terms agreed upon in your service agreement. We do not guarantee uninterrupted service.`
      },
      {
        title: "5. Acceptable Use Policy",
        content: `You agree not to use our Services to:

• Violate any applicable law, regulation, or third-party rights
• Transmit malware, viruses, or other malicious code
• Attempt to gain unauthorized access to our systems, networks, or other users' accounts
• Interfere with or disrupt the integrity or performance of our Services
• Use our Services for cryptocurrency mining without prior written authorization
• Store or transmit content that is defamatory, obscene, illegal, or otherwise objectionable
• Engage in activities that consume excessive resources or negatively impact other customers
• Resell, redistribute, or sublicense our Services without prior written authorization
• Use our Services to develop competing products or services

Violation of this policy may result in immediate service suspension or termination without refund.`
      },
      {
        title: "6. Data Ownership, Processing, and AI Services",
        content: `**Your Data Ownership:** You retain all rights, title, and interest in your data. We do not claim ownership of any data, content, prompts, documents, or materials you store, process, or submit through our Services.

**Data Processing:** We process your data only as necessary to provide our Services and as described in our Privacy Policy. We maintain appropriate technical and organizational security measures to protect your data.

**AI Services and Your Data:** When you use our AI-powered services (including AI assistants, operations automation, and reporting tools):
• Your data, prompts, documents, and content remain your property
• Your data is NOT used to train, develop, or improve public or third-party AI models
• AI processing is customer-scoped, isolated to your account, and treated as confidential
• We process only the data necessary to deliver the requested AI functionality

**Data Portability:** You may export your data at any time using available export tools. Upon termination, you have 30 days to retrieve your data before deletion, unless a longer period is specified in your service agreement.

**Compliance Support:** We use infrastructure and service providers that maintain SOC 2 Type II or equivalent certifications. Specific compliance support (HIPAA, etc.) may be available under separate agreement. Compliance documentation is available upon request for qualified customers.`
      },
      {
        title: "7. Payment Terms",
        content: `**Billing:** Services are billed in advance on a monthly or annual basis as specified in your service agreement. Fees are due upon receipt of invoice unless otherwise agreed.

**Payment Processing:** Payments are processed through secure third-party payment processors (such as Stripe). You authorize us to charge your designated payment method for applicable fees.

**Refund Policy:** Fees are generally non-refundable once a billing period has begun, except as required by law or as specifically provided in your service agreement. Unused portions of prepaid services are not refundable upon early termination for convenience.

**Price Changes:** We may modify pricing with at least 30 days' prior written notice. Price changes apply at your next renewal period unless otherwise agreed.

**Late Payment:** Late payments may incur interest at 1.5% per month or the maximum rate permitted by applicable law, whichever is lower. We may suspend Services for accounts with payments overdue by more than 15 days.

**Taxes:** You are responsible for all applicable taxes, duties, and government charges. Stated prices do not include taxes unless explicitly indicated.`
      },
      {
        title: "8. Intellectual Property",
        content: `**Our Intellectual Property:** ${siteConfig.name} retains all rights, title, and interest in our Services, software, technology, methodologies, branding, and documentation. You receive a limited, non-exclusive, non-transferable license to use our Services during your active subscription.

**Your Intellectual Property:** You retain ownership of your data, applications, custom configurations, and any materials you provide to us.

**Feedback:** If you provide feedback, suggestions, or ideas regarding our Services, you grant us a non-exclusive, royalty-free, perpetual license to use such feedback to improve our Services without obligation or compensation to you.

**Trademarks:** ${siteConfig.name} and our logos are trademarks of the Company. You may not use our trademarks without prior written permission.`
      },
      {
        title: "9. Confidentiality",
        content: `Both parties agree to protect confidential information received from the other party with the same degree of care used to protect their own confidential information, but no less than reasonable care. Confidential information includes:

• Technical and business information not publicly available
• Pricing, contract terms, and commercial arrangements
• Customer data and usage information
• Proprietary methodologies, processes, and know-how
• Any information marked or designated as confidential

This confidentiality obligation survives termination of these Terms for a period of three (3) years. Standard exceptions apply, including information that becomes public through no fault of the receiving party, is independently developed, or must be disclosed by law.`
      },
      {
        title: "10. Warranties and Disclaimers",
        content: `**Limited Warranty:** We warrant that our Services will perform substantially as described in the applicable documentation during your active subscription period.

**DISCLAIMER:** EXCEPT AS EXPRESSLY PROVIDED IN THESE TERMS OR YOUR SERVICE AGREEMENT, OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.

**Third-Party Services:** We are not responsible for third-party services, platforms, or content that may be accessible through or integrated with our Services.

**No Compliance Guarantee:** While we support compliance efforts and use compliant infrastructure, we do not guarantee that use of our Services will make you compliant with any specific regulatory framework. Compliance is a shared responsibility.`
      },
      {
        title: "11. Limitation of Liability",
        content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:

• **Exclusion of Consequential Damages:** NEITHER PARTY SHALL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS OPPORTUNITIES, REGARDLESS OF THE CAUSE OF ACTION OR WHETHER SUCH DAMAGES WERE FORESEEABLE.

• **Liability Cap:** OUR TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICES SHALL NOT EXCEED THE TOTAL AMOUNTS PAID BY YOU TO US IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.

• **Exceptions:** These limitations do not apply to: (a) your payment obligations; (b) either party's indemnification obligations under these Terms; (c) claims arising from a party's gross negligence or willful misconduct; (d) violations of the other party's intellectual property rights; or (e) breaches of confidentiality obligations.

• **Essential Purpose:** The limitations in this section apply even if any limited remedy fails of its essential purpose.`
      },
      {
        title: "12. Indemnification",
        content: `**Your Indemnification:** You agree to indemnify, defend, and hold harmless ${siteConfig.name}, its officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from: (a) your use of our Services; (b) your data or content; (c) your violation of these Terms; or (d) your violation of any third-party rights.

**Our Indemnification:** We will indemnify, defend, and hold you harmless from claims that our Services, as provided to you, infringe a third party's valid intellectual property rights, subject to: (a) prompt written notice of the claim; (b) our sole control over defense and settlement; and (c) your reasonable cooperation. This obligation does not apply to claims arising from your data, modifications you make, or use in combination with third-party products.`
      },
      {
        title: "13. Term and Termination",
        content: `**Term:** These Terms remain in effect while you maintain an active account or use our Services.

**Termination for Convenience:** Either party may terminate services with at least 30 days' prior written notice, effective at the end of the then-current billing period.

**Termination for Cause:** Either party may terminate immediately upon written notice if the other party: (a) materially breaches these Terms and fails to cure within 30 days of written notice; or (b) becomes insolvent, files for bankruptcy, or ceases operations.

**Effect of Termination:** Upon termination:
• Your access to Services will end at the termination effective date
• You remain responsible for all fees incurred through the termination date
• You have 30 days to retrieve your data (unless otherwise specified in your service agreement)
• We will delete your data after the retrieval period, except as required by law
• Provisions that should survive termination (including intellectual property, confidentiality, indemnification, limitation of liability, and dispute resolution) remain in effect`
      },
      {
        title: "14. Dispute Resolution",
        content: `**Governing Law:** These Terms are governed by the laws of the State of California, USA, without regard to conflict of laws principles.

**Informal Resolution:** Before initiating formal dispute resolution, both parties agree to attempt to resolve disputes informally by contacting the other party and negotiating in good faith for at least 30 days.

**Arbitration:** Any dispute not resolved informally shall be resolved by binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. Arbitration shall take place in San Francisco, California, or another mutually agreed location.

**Class Action Waiver:** YOU AND ${siteConfig.name.toUpperCase()} AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. The arbitrator may not consolidate more than one person's claims.

**Exceptions:** Either party may seek injunctive or other equitable relief in any court of competent jurisdiction to protect intellectual property rights or prevent breaches of confidentiality, without first engaging in arbitration.

**Attorneys' Fees:** In any arbitration or litigation, the prevailing party shall be entitled to recover reasonable attorneys' fees and costs from the non-prevailing party.`
      },
      {
        title: "15. General Provisions",
        content: `**Entire Agreement:** These Terms, together with your service agreement and our Privacy Policy, constitute the entire agreement between you and ${siteConfig.name} regarding the subject matter herein and supersede all prior agreements and understandings.

**Amendments:** We may modify these Terms by posting updated versions on our website. We will provide at least 30 days' notice for material changes. Your continued use of our Services after the effective date of changes constitutes acceptance of the modified Terms.

**Assignment:** You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign our rights and obligations under these Terms without restriction.

**Severability:** If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.

**Waiver:** The failure of either party to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.

**Force Majeure:** Neither party shall be liable for any failure or delay in performance due to circumstances beyond reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, labor disputes, government actions, or failures of third-party infrastructure.

**Notices:** Legal notices to ${siteConfig.name} should be sent to ${siteConfig.email} with "Legal Notice" in the subject line. We may provide notices to you via email to your account address or through our Services.

**Relationship:** Nothing in these Terms creates a partnership, joint venture, agency, or employment relationship between the parties.`
      },
      {
        title: "16. Contact Information",
        content: `For questions about these Terms of Service, please contact us:

**${siteConfig.name}**
Email: ${siteConfig.email}
Phone: ${siteConfig.phone}
Operating remotely across the United States

For legal notices or formal correspondence, please send email to ${siteConfig.email} with "Legal Department" in the subject line to ensure proper routing.`
      }
    ]
  },
  es: {
    title: "Términos de Servicio",
    lastUpdated: "Última Actualización: 29 de Enero, 2025",
    sections: [
      {
        title: "1. Aceptación de Términos",
        content: `Estos Términos de Servicio ("Términos") rigen su acceso y uso de los servicios proporcionados por ${siteConfig.name} ("Empresa," "nosotros," o "nuestro"), incluyendo nuestro sitio web, portal de cliente, software, APIs, y cualquier otro servicio que ofrezcamos (colectivamente, los "Servicios"). Al acceder o usar nuestros Servicios, usted acepta estar vinculado por estos Términos. Si no está de acuerdo, no use nuestros Servicios.

Estos Términos constituyen un acuerdo legalmente vinculante entre usted y ${siteConfig.name}. Si está usando nuestros Servicios en nombre de una organización, usted representa y garantiza que tiene la autoridad para vincular a esa organización a estos Términos.`
      },
      {
        title: "2. Descripción de Servicios",
        content: `${siteConfig.name} proporciona servicios de bases de datos administradas, soluciones de infraestructura en la nube, servicios impulsados por IA, y consultoría y soporte relacionados para empresas. Nuestros Servicios incluyen:

• **Servicios de Bases de Datos Administradas:** Administración, monitoreo, optimización y soporte para sistemas de bases de datos incluyendo PostgreSQL, MySQL, Oracle Database y SQL Server
• **Infraestructura Cloud:** Soluciones multi-nube en AWS, Azure, Google Cloud Platform y Oracle Cloud, incluyendo migraciones y gestión continua
• **Soluciones de IA:** Asistentes de IA privados, automatización de operaciones impulsada por IA, y herramientas de informes y análisis con IA
• **Servicios Profesionales:** Consultoría, capacitación, soporte de implementación y servicios de asesoría estratégica
• **Portal de Cliente:** Acceso de autoservicio para enviar solicitudes, ver estado del servicio y acceder a informes

La disponibilidad, características y precios de los servicios están sujetos a cambios. Las descripciones y precios actuales de servicios están disponibles en nuestro sitio web.`
      },
      {
        title: "3. Registro de Cuenta y Seguridad",
        content: `Para acceder a ciertos Servicios, debe crear una cuenta. Usted acepta:

• Proporcionar información precisa, actual y completa durante el registro
• Mantener y actualizar prontamente la información de su cuenta según sea necesario
• Mantener sus credenciales de inicio de sesión confidenciales y seguras
• Notificarnos inmediatamente de cualquier acceso no autorizado o brecha de seguridad
• Aceptar responsabilidad por todas las actividades que ocurran bajo su cuenta

Nos reservamos el derecho de suspender o terminar cuentas que violen estos Términos, representen riesgos de seguridad, o permanezcan inactivas por períodos prolongados.`
      },
      {
        title: "4. Acuerdo de Nivel de Servicio (SLA)",
        content: `Los Acuerdos de Nivel de Servicio se proporcionan como parte de planes de suscripción pagados y se detallan en su acuerdo de servicio específico. Los términos del SLA pueden incluir:

• **Objetivos de Disponibilidad:** Compromisos de disponibilidad del servicio según se especifica en su acuerdo de servicio
• **Tiempos de Respuesta:** Compromisos de tiempo de respuesta de soporte basados en nivel de prioridad y nivel de servicio
• **Ventanas de Mantenimiento:** Notificación anticipada de mantenimiento programado
• **Créditos de Servicio:** Políticas de crédito por incumplimientos verificados del SLA, según se define en su acuerdo de servicio

**Importante:** Los compromisos del SLA aplican solo a suscripciones pagadas con acuerdos de servicio ejecutados. Los términos del SLA, incluyendo cualquier compromiso de disponibilidad, están condicionados al plan específico y términos acordados en su acuerdo de servicio. No garantizamos servicio ininterrumpido.`
      },
      {
        title: "5. Política de Uso Aceptable",
        content: `Usted acepta no usar nuestros Servicios para:

• Violar cualquier ley aplicable, regulación o derechos de terceros
• Transmitir malware, virus u otro código malicioso
• Intentar obtener acceso no autorizado a nuestros sistemas, redes o cuentas de otros usuarios
• Interferir o interrumpir la integridad o rendimiento de nuestros Servicios
• Usar nuestros Servicios para minería de criptomonedas sin autorización previa por escrito
• Almacenar o transmitir contenido difamatorio, obsceno, ilegal u objetable
• Participar en actividades que consuman recursos excesivos o impacten negativamente a otros clientes
• Revender, redistribuir o sublicenciar nuestros Servicios sin autorización previa por escrito
• Usar nuestros Servicios para desarrollar productos o servicios competidores

La violación de esta política puede resultar en suspensión o terminación inmediata del servicio sin reembolso.`
      },
      {
        title: "6. Propiedad de Datos, Procesamiento y Servicios de IA",
        content: `**Propiedad de Sus Datos:** Usted retiene todos los derechos, título e interés en sus datos. No reclamamos propiedad de ningún dato, contenido, prompts, documentos o materiales que almacene, procese o envíe a través de nuestros Servicios.

**Procesamiento de Datos:** Procesamos sus datos solo según sea necesario para proporcionar nuestros Servicios y como se describe en nuestra Política de Privacidad. Mantenemos medidas de seguridad técnicas y organizacionales apropiadas para proteger sus datos.

**Servicios de IA y Sus Datos:** Cuando utiliza nuestros servicios impulsados por IA (incluyendo asistentes de IA, automatización de operaciones y herramientas de informes):
• Sus datos, prompts, documentos y contenido permanecen como su propiedad
• Sus datos NO se utilizan para entrenar, desarrollar o mejorar modelos de IA públicos o de terceros
• El procesamiento de IA está limitado al cliente, aislado a su cuenta, y tratado como confidencial
• Procesamos solo los datos necesarios para entregar la funcionalidad de IA solicitada

**Portabilidad de Datos:** Puede exportar sus datos en cualquier momento usando las herramientas de exportación disponibles. Al terminar, tiene 30 días para recuperar sus datos antes de la eliminación, a menos que se especifique un período más largo en su acuerdo de servicio.

**Soporte de Cumplimiento:** Utilizamos infraestructura y proveedores de servicios que mantienen certificaciones SOC 2 Tipo II o equivalentes. El soporte de cumplimiento específico (HIPAA, etc.) puede estar disponible bajo acuerdo separado. La documentación de cumplimiento está disponible bajo solicitud para clientes calificados.`
      },
      {
        title: "7. Términos de Pago",
        content: `**Facturación:** Los Servicios se facturan por adelantado de forma mensual o anual según se especifica en su acuerdo de servicio. Las tarifas vencen al recibir la factura a menos que se acuerde lo contrario.

**Procesamiento de Pagos:** Los pagos se procesan a través de procesadores de pago seguros de terceros (como Stripe). Usted nos autoriza a cargar su método de pago designado por las tarifas aplicables.

**Política de Reembolso:** Las tarifas generalmente no son reembolsables una vez que ha comenzado un período de facturación, excepto según lo requiera la ley o según se proporcione específicamente en su acuerdo de servicio. Las porciones no utilizadas de servicios prepagados no son reembolsables tras terminación anticipada por conveniencia.

**Cambios de Precio:** Podemos modificar los precios con al menos 30 días de aviso previo por escrito. Los cambios de precio aplican en su próximo período de renovación a menos que se acuerde lo contrario.

**Pago Tardío:** Los pagos tardíos pueden incurrir en intereses del 1.5% por mes o la tasa máxima permitida por la ley aplicable, lo que sea menor. Podemos suspender Servicios para cuentas con pagos vencidos por más de 15 días.

**Impuestos:** Usted es responsable de todos los impuestos, aranceles y cargos gubernamentales aplicables. Los precios indicados no incluyen impuestos a menos que se indique explícitamente.`
      },
      {
        title: "8. Propiedad Intelectual",
        content: `**Nuestra Propiedad Intelectual:** ${siteConfig.name} retiene todos los derechos, título e interés en nuestros Servicios, software, tecnología, metodologías, marca y documentación. Usted recibe una licencia limitada, no exclusiva e intransferible para usar nuestros Servicios durante su suscripción activa.

**Su Propiedad Intelectual:** Usted retiene la propiedad de sus datos, aplicaciones, configuraciones personalizadas y cualquier material que nos proporcione.

**Retroalimentación:** Si proporciona comentarios, sugerencias o ideas sobre nuestros Servicios, usted nos otorga una licencia no exclusiva, libre de regalías y perpetua para usar dicha retroalimentación para mejorar nuestros Servicios sin obligación o compensación hacia usted.

**Marcas Registradas:** ${siteConfig.name} y nuestros logos son marcas registradas de la Empresa. No puede usar nuestras marcas registradas sin permiso previo por escrito.`
      },
      {
        title: "9. Confidencialidad",
        content: `Ambas partes acuerdan proteger la información confidencial recibida de la otra parte con el mismo grado de cuidado usado para proteger su propia información confidencial, pero no menos que cuidado razonable. La información confidencial incluye:

• Información técnica y comercial no disponible públicamente
• Precios, términos de contrato y acuerdos comerciales
• Datos de clientes e información de uso
• Metodologías, procesos y conocimientos propietarios
• Cualquier información marcada o designada como confidencial

Esta obligación de confidencialidad sobrevive la terminación de estos Términos por un período de tres (3) años. Se aplican excepciones estándar, incluyendo información que se vuelve pública sin culpa de la parte receptora, es desarrollada independientemente, o debe ser divulgada por ley.`
      },
      {
        title: "10. Garantías y Descargos",
        content: `**Garantía Limitada:** Garantizamos que nuestros Servicios funcionarán sustancialmente como se describe en la documentación aplicable durante su período de suscripción activa.

**DESCARGO:** EXCEPTO COMO SE PROPORCIONA EXPRESAMENTE EN ESTOS TÉRMINOS O SU ACUERDO DE SERVICIO, NUESTROS SERVICIOS SE PROPORCIONAN "TAL CUAL" Y "SEGÚN DISPONIBILIDAD." EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY, RECHAZAMOS TODAS LAS GARANTÍAS, EXPRESAS O IMPLÍCITAS, INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO PARTICULAR, TÍTULO Y NO INFRACCIÓN. NO GARANTIZAMOS QUE NUESTROS SERVICIOS SERÁN ININTERRUMPIDOS, LIBRES DE ERRORES O COMPLETAMENTE SEGUROS.

**Servicios de Terceros:** No somos responsables de servicios, plataformas o contenido de terceros que puedan ser accesibles a través de o integrados con nuestros Servicios.

**Sin Garantía de Cumplimiento:** Aunque apoyamos esfuerzos de cumplimiento y usamos infraestructura conforme, no garantizamos que el uso de nuestros Servicios lo hará cumplir con cualquier marco regulatorio específico. El cumplimiento es una responsabilidad compartida.`
      },
      {
        title: "11. Limitación de Responsabilidad",
        content: `EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY APLICABLE:

• **Exclusión de Daños Consecuenciales:** NINGUNA DE LAS PARTES SERÁ RESPONSABLE POR DAÑOS INDIRECTOS, INCIDENTALES, ESPECIALES, CONSECUENCIALES O PUNITIVOS, O POR PÉRDIDA DE BENEFICIOS, INGRESOS, DATOS, BUENA VOLUNTAD U OPORTUNIDADES DE NEGOCIO, INDEPENDIENTEMENTE DE LA CAUSA DE ACCIÓN O SI DICHOS DAÑOS ERAN PREVISIBLES.

• **Límite de Responsabilidad:** NUESTRA RESPONSABILIDAD AGREGADA TOTAL DERIVADA DE O RELACIONADA CON ESTOS TÉRMINOS O LOS SERVICIOS NO EXCEDERÁ LOS MONTOS TOTALES PAGADOS POR USTED A NOSOTROS EN LOS DOCE (12) MESES INMEDIATAMENTE ANTERIORES AL EVENTO QUE DA ORIGEN A LA RECLAMACIÓN.

• **Excepciones:** Estas limitaciones no aplican a: (a) sus obligaciones de pago; (b) las obligaciones de indemnización de cualquier parte bajo estos Términos; (c) reclamaciones derivadas de negligencia grave o conducta dolosa de una parte; (d) violaciones de los derechos de propiedad intelectual de la otra parte; o (e) incumplimientos de obligaciones de confidencialidad.

• **Propósito Esencial:** Las limitaciones en esta sección aplican incluso si cualquier remedio limitado falla en su propósito esencial.`
      },
      {
        title: "12. Indemnización",
        content: `**Su Indemnización:** Usted acepta indemnizar, defender y mantener indemne a ${siteConfig.name}, sus funcionarios, directores, empleados y agentes de y contra cualquier reclamación, daño, pérdida, responsabilidad, costo y gasto (incluyendo honorarios razonables de abogados) derivados de: (a) su uso de nuestros Servicios; (b) sus datos o contenido; (c) su violación de estos Términos; o (d) su violación de cualquier derecho de terceros.

**Nuestra Indemnización:** Indemnizaremos, defenderemos y lo mantendremos indemne de reclamaciones de que nuestros Servicios, tal como se le proporcionan, infringen derechos de propiedad intelectual válidos de terceros, sujeto a: (a) notificación escrita pronta de la reclamación; (b) nuestro control exclusivo sobre la defensa y acuerdo; y (c) su cooperación razonable. Esta obligación no aplica a reclamaciones derivadas de sus datos, modificaciones que realice, o uso en combinación con productos de terceros.`
      },
      {
        title: "13. Vigencia y Terminación",
        content: `**Vigencia:** Estos Términos permanecen vigentes mientras mantenga una cuenta activa o use nuestros Servicios.

**Terminación por Conveniencia:** Cualquier parte puede terminar servicios con al menos 30 días de aviso previo por escrito, efectivo al final del período de facturación actual.

**Terminación por Causa:** Cualquier parte puede terminar inmediatamente mediante aviso por escrito si la otra parte: (a) incumple materialmente estos Términos y no subsana dentro de 30 días de aviso por escrito; o (b) se vuelve insolvente, solicita bancarrota, o cesa operaciones.

**Efecto de la Terminación:** Tras la terminación:
• Su acceso a los Servicios terminará en la fecha efectiva de terminación
• Usted sigue siendo responsable de todas las tarifas incurridas hasta la fecha de terminación
• Tiene 30 días para recuperar sus datos (a menos que se especifique lo contrario en su acuerdo de servicio)
• Eliminaremos sus datos después del período de recuperación, excepto según lo requiera la ley
• Las disposiciones que deben sobrevivir la terminación (incluyendo propiedad intelectual, confidencialidad, indemnización, limitación de responsabilidad y resolución de disputas) permanecen vigentes`
      },
      {
        title: "14. Resolución de Disputas",
        content: `**Ley Aplicable:** Estos Términos se rigen por las leyes del Estado de California, EE.UU., sin consideración a principios de conflicto de leyes.

**Resolución Informal:** Antes de iniciar resolución formal de disputas, ambas partes acuerdan intentar resolver disputas informalmente contactando a la otra parte y negociando de buena fe durante al menos 30 días.

**Arbitraje:** Cualquier disputa no resuelta informalmente se resolverá mediante arbitraje vinculante administrado por la Asociación Americana de Arbitraje (AAA) bajo sus Reglas de Arbitraje Comercial. El arbitraje tendrá lugar en San Francisco, California, u otra ubicación mutuamente acordada.

**Renuncia a Acciones Colectivas:** USTED Y ${siteConfig.name.toUpperCase()} ACUERDAN QUE CADA UNO PUEDE PRESENTAR RECLAMACIONES CONTRA EL OTRO SOLO EN SU CAPACIDAD INDIVIDUAL, Y NO COMO DEMANDANTE O MIEMBRO DE CLASE EN CUALQUIER PROCEDIMIENTO COLECTIVO O REPRESENTATIVO PRETENDIDO. El árbitro no puede consolidar las reclamaciones de más de una persona.

**Excepciones:** Cualquier parte puede buscar medidas cautelares u otras medidas equitativas en cualquier tribunal de jurisdicción competente para proteger derechos de propiedad intelectual o prevenir incumplimientos de confidencialidad, sin primero participar en arbitraje.

**Honorarios de Abogados:** En cualquier arbitraje o litigio, la parte prevaleciente tendrá derecho a recuperar honorarios razonables de abogados y costos de la parte no prevaleciente.`
      },
      {
        title: "15. Disposiciones Generales",
        content: `**Acuerdo Completo:** Estos Términos, junto con su acuerdo de servicio y nuestra Política de Privacidad, constituyen el acuerdo completo entre usted y ${siteConfig.name} respecto al tema aquí tratado y reemplazan todos los acuerdos y entendimientos previos.

**Modificaciones:** Podemos modificar estos Términos publicando versiones actualizadas en nuestro sitio web. Proporcionaremos al menos 30 días de aviso para cambios materiales. Su uso continuado de nuestros Servicios después de la fecha efectiva de los cambios constituye aceptación de los Términos modificados.

**Cesión:** Usted no puede ceder o transferir estos Términos o sus derechos bajo ellos sin nuestro consentimiento previo por escrito. Podemos ceder nuestros derechos y obligaciones bajo estos Términos sin restricción.

**Divisibilidad:** Si alguna disposición de estos Términos se encuentra inaplicable o inválida, esa disposición será limitada o eliminada al mínimo necesario, y las disposiciones restantes permanecerán en pleno vigor y efecto.

**Renuncia:** El incumplimiento de cualquier parte de hacer valer cualquier derecho o disposición de estos Términos no constituirá una renuncia a dicho derecho o disposición.

**Fuerza Mayor:** Ninguna de las partes será responsable por cualquier incumplimiento o retraso en el rendimiento debido a circunstancias fuera de control razonable, incluyendo pero no limitado a actos de Dios, desastres naturales, guerra, terrorismo, disputas laborales, acciones gubernamentales, o fallas de infraestructura de terceros.

**Notificaciones:** Las notificaciones legales a ${siteConfig.name} deben enviarse a ${siteConfig.email} con "Aviso Legal" en el asunto. Podemos proporcionarle avisos por correo electrónico a la dirección de su cuenta o a través de nuestros Servicios.

**Relación:** Nada en estos Términos crea una sociedad, empresa conjunta, agencia o relación laboral entre las partes.`
      },
      {
        title: "16. Información de Contacto",
        content: `Para preguntas sobre estos Términos de Servicio, contáctenos:

**${siteConfig.name}**
Email: ${siteConfig.email}
Teléfono: ${siteConfig.phone}
Operando remotamente en Estados Unidos

Para avisos legales o correspondencia formal, envíe correo electrónico a ${siteConfig.email} con "Departamento Legal" en el asunto para asegurar el enrutamiento apropiado.`
      }
    ]
  }
};
