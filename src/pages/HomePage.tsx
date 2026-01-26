import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { ClientLogosSection } from '@/components/sections/ClientLogosSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';

/**
 * HomePage - Enterprise B2B Landing Page Structure
 * Following patterns from MongoDB, Snowflake, Datadog, HashiCorp:
 * 1. Hero with clear value proposition + primary CTA
 * 2. Client logos (social proof)
 * 3. Services overview
 * 4. Trust signals (certifications, SLAs)
 * 5. Testimonials with stats
 * 6. Final CTA
 */
export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <ClientLogosSection />
      <ServicesSection />
      <TrustSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
}
