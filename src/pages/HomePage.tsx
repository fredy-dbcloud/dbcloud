import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { EnterpriseStandardsSection } from '@/components/sections/EnterpriseStandardsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TechnologyStackSection } from '@/components/sections/TechnologyStackSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';

/**
 * HomePage - Enterprise B2B Landing Page Structure
 * Following patterns from MongoDB, Snowflake, Datadog, HashiCorp:
 * 1. Hero with clear value proposition + primary CTA
 * 2. Enterprise standards (credibility-driven trust signals)
 * 3. Services overview
 * 4. Technology stack (SEO + credibility)
 * 5. Trust signals (certifications, SLAs)
 * 6. Testimonials with stats
 * 7. Final CTA
 */
export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <EnterpriseStandardsSection />
      <ServicesSection />
      <TechnologyStackSection />
      <TrustSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
}
