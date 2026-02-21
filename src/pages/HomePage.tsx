import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { MonetizationSection } from '@/components/sections/MonetizationSection';
import { TrustedTechnologiesSection } from '@/components/sections/TrustedTechnologiesSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { UnifiedDifferentiationSection } from '@/components/sections/UnifiedDifferentiationSection';
import { WhyDBCloudSection } from '@/components/sections/WhyDBCloudSection';
import { CTASection } from '@/components/sections/CTASection';

/**
 * HomePage - SMB-focused B2B Landing Page
 * Optimized for cold traffic conversion with reduced cognitive load
 */
export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <MonetizationSection />
      <TrustedTechnologiesSection />
      <ServicesSection />
      <UnifiedDifferentiationSection />
      <WhyDBCloudSection />
      <CTASection />
    </Layout>
  );
}
