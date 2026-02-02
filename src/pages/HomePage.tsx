import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustedTechnologiesSection } from '@/components/sections/TrustedTechnologiesSection';
import { EnterpriseStandardsSection } from '@/components/sections/EnterpriseStandardsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WhyDBCloudSection } from '@/components/sections/WhyDBCloudSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';

/**
 * HomePage - SMB-focused B2B Landing Page
 * Optimized for US small & mid-sized businesses
 * Consolidated trust signals: logos once, expertise once
 */
export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <TrustedTechnologiesSection />
      <EnterpriseStandardsSection />
      <ServicesSection />
      <WhyDBCloudSection />
      <TrustSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
}
