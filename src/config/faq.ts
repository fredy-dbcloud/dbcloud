export const faqData = {
  en: [
    // Managed Databases & Cloud
    {
      question: "What are managed database services and why do enterprises use them?",
      answer: "Managed database services provide complete 24/7 administration, monitoring, optimization, backup, and security for your databases—including PostgreSQL, MySQL, Oracle, SQL Server, MongoDB, and Redis. Enterprises use them to reduce operational overhead, ensure high availability, and focus internal teams on business-critical development rather than infrastructure maintenance.",
      link: "/en/services",
    },
    {
      question: "How much do managed database services cost in the US?",
      answer: "Our managed database services start at $499/month for the Starter advisory plan. The Growth plan with hands-on execution is $1,499/month. Enterprise plans with custom SLAs, 24/7 support, and compliance certifications (SOC 2, HIPAA) are quoted based on your specific requirements. Contact us for a detailed assessment.",
      link: "/en/pricing",
    },
    {
      question: "Which databases does DBCloud support?",
      answer: "We support all major enterprise databases: PostgreSQL, MySQL, MariaDB, Oracle Database, Microsoft SQL Server, MongoDB, Redis, Elasticsearch, Amazon Aurora, Azure SQL, Google Cloud SQL, and more. We also specialize in cloud-native databases and vector databases like pgvector, Pinecone, and Weaviate for AI workloads.",
      link: "/en/services",
    },
    {
      question: "What is the difference between self-managed vs managed databases?",
      answer: "Self-managed databases require your team to handle all administration, patching, backups, monitoring, and scaling. Managed databases shift this responsibility to specialists, providing automated backups, 24/7 monitoring, performance tuning, and disaster recovery—reducing risk and freeing your team to focus on application development.",
      link: "/en/services",
    },
    {
      question: "How do you ensure high availability and disaster recovery?",
      answer: "We implement enterprise-grade HA/DR solutions including automated failover, geo-redundant backups across AWS/Azure/GCP regions, point-in-time recovery (PITR), read replicas, and comprehensive runbooks. Enterprise clients receive custom SLAs up to 99.99% uptime with documented RPO/RTO guarantees.",
      link: "/en/services",
    },
    // Cloud Migration
    {
      question: "How long does a cloud migration take?",
      answer: "Migration timelines vary by complexity. Simple single-database migrations typically take 2-4 weeks. Enterprise migrations involving multiple databases, complex dependencies, or regulatory requirements can take 2-3 months. We provide detailed assessments and migration runbooks before starting any project.",
      link: "/en/services",
    },
    {
      question: "Can migrations be done with zero downtime?",
      answer: "Yes. We specialize in zero-downtime migrations using techniques like logical replication, CDC (Change Data Capture), and blue-green deployments. Our migration methodology includes thorough testing, rollback procedures, and cutover windows optimized for your business requirements.",
      link: "/en/services",
    },
    {
      question: "Do you migrate from on-premises to AWS, Azure, or GCP?",
      answer: "Absolutely. We handle full migrations from on-premises data centers to AWS, Microsoft Azure, and Google Cloud Platform. This includes VMware workloads, Oracle and SQL Server databases, and legacy infrastructure. We also support multi-cloud and hybrid cloud architectures.",
      link: "/en/services",
    },
    {
      question: "How do you reduce cloud costs after migration?",
      answer: "We implement cloud cost optimization strategies including right-sizing instances, reserved capacity planning, auto-scaling configurations, storage tiering, and identifying unused resources. Most clients see 20-40% cost reduction within the first quarter through proper cloud resource management.",
      link: "/en/services",
    },
    // AI & Automation
    {
      question: "What is an AI readiness assessment?",
      answer: "Our AI readiness assessment evaluates your data infrastructure, data quality, security posture, and organizational processes to determine how prepared you are for AI adoption. We identify gaps in data pipelines, recommend necessary infrastructure changes, and create a roadmap for successful AI implementation using platforms like Azure OpenAI, AWS Bedrock, or Google Vertex AI.",
      link: "/en/ai",
    },
    {
      question: "How can AI reduce operational costs?",
      answer: "AI reduces costs through intelligent automation of repetitive tasks, predictive maintenance that prevents downtime, optimized resource allocation, and enhanced decision-making. Our clients typically achieve 30-50% cost reduction in targeted operational processes through AI-powered workflows, document processing, and monitoring systems.",
      link: "/en/ai",
    },
    {
      question: "Can AI be deployed securely with sensitive company data?",
      answer: "Yes. We specialize in private AI deployments within your own infrastructure using VPCs, private endpoints, and encrypted connections on AWS, Azure, or GCP. Your data never leaves your environment. We support compliance requirements including HIPAA, SOC 2, and GDPR for AI workloads.",
      link: "/en/ai",
    },
    {
      question: "What is a private AI agent for enterprises?",
      answer: "A private AI agent is a custom-built AI assistant deployed within your secure infrastructure. It can automate workflows, answer questions from your proprietary knowledge base, integrate with internal systems, and handle sensitive data—all without exposing information to external AI services like public ChatGPT.",
      link: "/en/ai",
    },
    {
      question: "Do you support RAG and private LLM deployments?",
      answer: "Yes. We implement RAG (Retrieval-Augmented Generation) architectures using vector databases like pgvector, Pinecone, and Weaviate combined with LLMs from Azure OpenAI, AWS Bedrock, or open-source models. This enables AI systems that answer questions using your company's specific data while maintaining security.",
      link: "/en/ai",
    },
    // Security & Support
    {
      question: "Do you provide 24/7 enterprise support?",
      answer: "Yes. Our Enterprise plan includes 24/7 on-call support with dedicated response teams. Growth plan clients receive same/next-day priority support during business hours. All support is delivered by senior engineers with direct access to your infrastructure.",
      link: "/en/pricing",
    },
    {
      question: "What SLAs do you offer?",
      answer: "Enterprise clients receive custom SLAs with uptime guarantees up to 99.99%, defined response times, and documented RTO/RPO for disaster recovery. We provide transparent SLA reporting and credits for any service level breaches. Starter and Growth plans operate on best-effort response times without formal SLAs.",
      link: "/en/pricing",
    },
    {
      question: "How is security handled for regulated industries?",
      answer: "We implement security controls aligned with SOC 2 Type II, HIPAA, GDPR, and PCI-DSS requirements. This includes encryption at rest and in transit, IAM/Zero Trust access controls, audit logging, vulnerability management, and regular security assessments. Enterprise clients receive dedicated compliance support.",
      link: "/en/services",
    },
    {
      question: "Is DBCloud compliant with US regulations?",
      answer: "Yes. We're a US-registered company supporting compliance with HIPAA, SOC 2, GDPR, CCPA, and industry-specific regulations. Our infrastructure runs on AWS, Azure, and GCP with data residency options to meet regulatory requirements.",
      link: "/en/services",
    },
    // Onboarding & Engagement
    {
      question: "What does onboarding with DBCloud look like?",
      answer: "Onboarding begins with a discovery call to understand your infrastructure and goals. We then conduct a comprehensive assessment, create an action plan, and execute initial optimizations. Starter clients receive monthly planning sessions; Growth and Enterprise clients get hands-on implementation from day one.",
      link: "/en/contact",
    },
    {
      question: "How fast can we start?",
      answer: "You can start immediately after signing up. Starter and Growth plans are available via instant checkout, with kickoff calls typically scheduled within 48 hours. Enterprise engagements begin with a scoping call and custom proposal, usually starting within 1-2 weeks.",
      link: "/en/pricing",
    },
    {
      question: "What industries do you specialize in?",
      answer: "We serve enterprises across healthcare (HIPAA), fintech (PCI-DSS, SOC 2), SaaS, e-commerce, manufacturing, and government sectors. Our team has direct experience with regulated industries requiring strict data governance and compliance controls.",
      link: "/en/contact",
    },
  ],
  es: [
    // Bases de datos administradas y Cloud
    {
      question: "¿Qué son los servicios de bases de datos administradas y por qué los usan las empresas?",
      answer: "Los servicios de bases de datos administradas proporcionan administración 24/7, monitoreo, optimización, respaldos y seguridad completa para tus bases de datos—incluyendo PostgreSQL, MySQL, Oracle, SQL Server, MongoDB y Redis. Las empresas los usan para reducir la carga operativa, asegurar alta disponibilidad y que sus equipos se enfoquen en desarrollo crítico del negocio.",
      link: "/es/services",
    },
    {
      question: "¿Cuánto cuestan los servicios de bases de datos administradas en EE.UU.?",
      answer: "Nuestros servicios de bases de datos administradas comienzan en $499/mes para el plan Starter de asesoría. El plan Growth con ejecución práctica es $1,499/mes. Los planes Enterprise con SLAs personalizados, soporte 24/7 y certificaciones de cumplimiento (SOC 2, HIPAA) se cotizan según tus requisitos específicos.",
      link: "/es/pricing",
    },
    {
      question: "¿Qué bases de datos soporta DBCloud?",
      answer: "Soportamos todas las bases de datos empresariales principales: PostgreSQL, MySQL, MariaDB, Oracle Database, Microsoft SQL Server, MongoDB, Redis, Elasticsearch, Amazon Aurora, Azure SQL, Google Cloud SQL y más. También nos especializamos en bases de datos cloud-native y vectoriales como pgvector, Pinecone y Weaviate para cargas de trabajo de IA.",
      link: "/es/services",
    },
    {
      question: "¿Cuál es la diferencia entre bases de datos auto-gestionadas vs administradas?",
      answer: "Las bases de datos auto-gestionadas requieren que tu equipo maneje toda la administración, parches, respaldos, monitoreo y escalamiento. Las bases de datos administradas trasladan esta responsabilidad a especialistas, proporcionando respaldos automatizados, monitoreo 24/7, optimización de rendimiento y recuperación ante desastres.",
      link: "/es/services",
    },
    {
      question: "¿Cómo aseguran alta disponibilidad y recuperación ante desastres?",
      answer: "Implementamos soluciones HA/DR de nivel empresarial incluyendo failover automático, respaldos geo-redundantes en regiones de AWS/Azure/GCP, recuperación punto en el tiempo (PITR), réplicas de lectura y runbooks completos. Los clientes Enterprise reciben SLAs personalizados hasta 99.99% de uptime.",
      link: "/es/services",
    },
    // Migración Cloud
    {
      question: "¿Cuánto tiempo toma una migración a la nube?",
      answer: "Los tiempos de migración varían por complejidad. Migraciones simples de una sola base de datos típicamente toman 2-4 semanas. Migraciones empresariales con múltiples bases de datos, dependencias complejas o requisitos regulatorios pueden tomar 2-3 meses. Proporcionamos evaluaciones detalladas antes de comenzar.",
      link: "/es/services",
    },
    {
      question: "¿Se pueden hacer migraciones sin tiempo de inactividad?",
      answer: "Sí. Nos especializamos en migraciones sin tiempo de inactividad usando técnicas como replicación lógica, CDC (Change Data Capture) y despliegues blue-green. Nuestra metodología incluye pruebas exhaustivas, procedimientos de rollback y ventanas de corte optimizadas para tu negocio.",
      link: "/es/services",
    },
    {
      question: "¿Migran desde on-premises a AWS, Azure o GCP?",
      answer: "Absolutamente. Manejamos migraciones completas desde centros de datos on-premises a AWS, Microsoft Azure y Google Cloud Platform. Esto incluye cargas de trabajo VMware, bases de datos Oracle y SQL Server, e infraestructura legacy. También soportamos arquitecturas multi-nube e híbridas.",
      link: "/es/services",
    },
    {
      question: "¿Cómo reducen los costos cloud después de la migración?",
      answer: "Implementamos estrategias de optimización de costos cloud incluyendo right-sizing de instancias, planificación de capacidad reservada, configuraciones de auto-scaling, tiering de almacenamiento e identificación de recursos sin uso. La mayoría de clientes ven 20-40% de reducción de costos en el primer trimestre.",
      link: "/es/services",
    },
    // IA y Automatización
    {
      question: "¿Qué es una evaluación de preparación para IA?",
      answer: "Nuestra evaluación de preparación para IA evalúa tu infraestructura de datos, calidad de datos, postura de seguridad y procesos organizacionales para determinar qué tan preparado estás para adoptar IA. Identificamos brechas en pipelines de datos y creamos una hoja de ruta usando plataformas como Azure OpenAI, AWS Bedrock o Google Vertex AI.",
      link: "/es/ai",
    },
    {
      question: "¿Cómo puede la IA reducir costos operativos?",
      answer: "La IA reduce costos mediante automatización inteligente de tareas repetitivas, mantenimiento predictivo que previene tiempo de inactividad, asignación optimizada de recursos y toma de decisiones mejorada. Nuestros clientes típicamente logran 30-50% de reducción de costos en procesos operativos específicos.",
      link: "/es/ai",
    },
    {
      question: "¿Se puede desplegar IA de forma segura con datos sensibles de la empresa?",
      answer: "Sí. Nos especializamos en despliegues de IA privados dentro de tu propia infraestructura usando VPCs, endpoints privados y conexiones encriptadas en AWS, Azure o GCP. Tus datos nunca salen de tu ambiente. Soportamos requisitos de cumplimiento incluyendo HIPAA, SOC 2 y GDPR para cargas de trabajo de IA.",
      link: "/es/ai",
    },
    {
      question: "¿Qué es un agente de IA privado para empresas?",
      answer: "Un agente de IA privado es un asistente de IA personalizado desplegado dentro de tu infraestructura segura. Puede automatizar flujos de trabajo, responder preguntas de tu base de conocimiento propietaria, integrarse con sistemas internos y manejar datos sensibles—todo sin exponer información a servicios externos.",
      link: "/es/ai",
    },
    {
      question: "¿Soportan RAG y despliegues de LLM privados?",
      answer: "Sí. Implementamos arquitecturas RAG (Retrieval-Augmented Generation) usando bases de datos vectoriales como pgvector, Pinecone y Weaviate combinadas con LLMs de Azure OpenAI, AWS Bedrock o modelos open-source. Esto permite sistemas de IA que responden preguntas usando los datos específicos de tu empresa.",
      link: "/es/ai",
    },
    // Seguridad y Soporte
    {
      question: "¿Ofrecen soporte empresarial 24/7?",
      answer: "Sí. Nuestro plan Enterprise incluye soporte 24/7 de guardia con equipos de respuesta dedicados. Los clientes Growth reciben soporte prioritario el mismo día o al siguiente día hábil. Todo el soporte es entregado por ingenieros senior con acceso directo a tu infraestructura.",
      link: "/es/pricing",
    },
    {
      question: "¿Qué SLAs ofrecen?",
      answer: "Los clientes Enterprise reciben SLAs personalizados con garantías de uptime hasta 99.99%, tiempos de respuesta definidos y RTO/RPO documentados para recuperación ante desastres. Proporcionamos reportes transparentes de SLA y créditos por cualquier incumplimiento.",
      link: "/es/pricing",
    },
    {
      question: "¿Cómo manejan la seguridad para industrias reguladas?",
      answer: "Implementamos controles de seguridad alineados con requisitos SOC 2 Type II, HIPAA, GDPR y PCI-DSS. Esto incluye encriptación en reposo y en tránsito, controles de acceso IAM/Zero Trust, logs de auditoría, gestión de vulnerabilidades y evaluaciones de seguridad regulares.",
      link: "/es/services",
    },
    {
      question: "¿DBCloud cumple con las regulaciones de EE.UU.?",
      answer: "Sí. Somos una empresa registrada en EE.UU. que soporta cumplimiento con HIPAA, SOC 2, GDPR, CCPA y regulaciones específicas de industria. Nuestra infraestructura corre en AWS, Azure y GCP con opciones de residencia de datos para cumplir requisitos regulatorios.",
      link: "/es/services",
    },
    // Onboarding y Compromiso
    {
      question: "¿Cómo es el proceso de incorporación con DBCloud?",
      answer: "La incorporación comienza con una llamada de descubrimiento para entender tu infraestructura y objetivos. Luego realizamos una evaluación integral, creamos un plan de acción y ejecutamos optimizaciones iniciales. Los clientes Starter reciben sesiones de planificación mensual; Growth y Enterprise obtienen implementación práctica desde el día uno.",
      link: "/es/contact",
    },
    {
      question: "¿Qué tan rápido podemos comenzar?",
      answer: "Puedes comenzar inmediatamente después de registrarte. Los planes Starter y Growth están disponibles vía checkout instantáneo, con llamadas de inicio típicamente agendadas dentro de 48 horas. Los compromisos Enterprise comienzan con una llamada de alcance y propuesta personalizada.",
      link: "/es/pricing",
    },
    {
      question: "¿En qué industrias se especializan?",
      answer: "Servimos empresas en salud (HIPAA), fintech (PCI-DSS, SOC 2), SaaS, comercio electrónico, manufactura y sectores gubernamentales. Nuestro equipo tiene experiencia directa con industrias reguladas que requieren gobernanza de datos estricta y controles de cumplimiento.",
      link: "/es/contact",
    },
  ],
} as const;
