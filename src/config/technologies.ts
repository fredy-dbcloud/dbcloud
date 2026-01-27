// Enterprise technology stack references for SEO and credibility
export const technologies = {
  // Cloud Providers
  cloudProviders: [
    { name: "Amazon Web Services (AWS)", shortName: "AWS", category: "cloud" },
    { name: "Microsoft Azure", shortName: "Azure", category: "cloud" },
    { name: "Google Cloud Platform", shortName: "GCP", category: "cloud" },
  ],
  
  // Enterprise Databases
  databases: [
    { name: "PostgreSQL", category: "relational" },
    { name: "MySQL", category: "relational" },
    { name: "Oracle Database", category: "relational" },
    { name: "Microsoft SQL Server", category: "relational" },
    { name: "Amazon Aurora", category: "cloud-native" },
    { name: "Azure SQL", category: "cloud-native" },
    { name: "Google Cloud SQL", category: "cloud-native" },
    { name: "MongoDB", category: "nosql" },
    { name: "Redis", category: "nosql" },
    { name: "Elasticsearch", category: "nosql" },
  ],
  
  // Infrastructure & DevOps
  infrastructure: [
    { name: "Kubernetes", category: "orchestration" },
    { name: "Docker", category: "containers" },
    { name: "Terraform", category: "iac" },
    { name: "VMware", category: "virtualization" },
    { name: "Red Hat OpenShift", category: "platform" },
  ],
  
  // AI & ML Platforms
  aiPlatforms: [
    { name: "Azure OpenAI", category: "llm" },
    { name: "AWS Bedrock", category: "llm" },
    { name: "Google Vertex AI", category: "llm" },
    { name: "OpenAI", category: "llm" },
    { name: "LangChain", category: "framework" },
  ],
  
  // Vector Databases (for AI/RAG)
  vectorDatabases: [
    { name: "pgvector", category: "vector" },
    { name: "Pinecone", category: "vector" },
    { name: "Weaviate", category: "vector" },
  ],
  
  // Security & Compliance
  compliance: [
    { name: "SOC 2 Type II", shortName: "SOC 2", category: "compliance" },
    { name: "HIPAA", category: "compliance" },
    { name: "GDPR", category: "compliance" },
    { name: "PCI-DSS", shortName: "PCI", category: "compliance" },
    { name: "CCPA", category: "compliance" },
  ],
  
  // Security Technologies
  security: [
    { name: "IAM / Identity Management", category: "access" },
    { name: "Zero Trust Architecture", category: "access" },
    { name: "Encryption at Rest", category: "encryption" },
    { name: "Encryption in Transit (TLS)", category: "encryption" },
    { name: "Disaster Recovery (DR)", category: "resilience" },
    { name: "High Availability (HA)", category: "resilience" },
  ],
} as const;

// Technology display groups for different sections
export const technologyGroups = {
  homepage: {
    en: {
      title: "Enterprise-Grade Technology Stack",
      subtitle: "We work with the technologies that power modern enterprises",
    },
    es: {
      title: "Stack Tecnológico de Nivel Empresarial",
      subtitle: "Trabajamos con las tecnologías que impulsan empresas modernas",
    },
  },
  services: {
    en: {
      title: "Supported Technologies",
      subtitle: "Full support for industry-leading platforms",
    },
    es: {
      title: "Tecnologías Soportadas",
      subtitle: "Soporte completo para plataformas líderes de la industria",
    },
  },
};

// SEO-focused technology keywords
export const technologyKeywords = {
  en: "AWS, Azure, GCP, PostgreSQL, MySQL, Oracle, SQL Server, MongoDB, Redis, Kubernetes, Docker, Terraform, VMware, OpenShift, Azure OpenAI, AWS Bedrock, Vertex AI, LangChain, pgvector, Pinecone, SOC 2, HIPAA, GDPR",
  es: "AWS, Azure, GCP, PostgreSQL, MySQL, Oracle, SQL Server, MongoDB, Redis, Kubernetes, Docker, Terraform, VMware, OpenShift, Azure OpenAI, AWS Bedrock, Vertex AI, LangChain, pgvector, Pinecone, SOC 2, HIPAA, GDPR",
};
