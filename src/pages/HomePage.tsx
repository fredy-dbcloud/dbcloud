import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { MonetizationSection } from '@/components/sections/MonetizationSection';
import { TrustedTechnologiesSection } from '@/components/sections/TrustedTechnologiesSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { DiscoveryPackagesSection } from '@/components/sections/DiscoveryPackagesSection';
import { WhyDBCloudSection } from '@/components/sections/WhyDBCloudSection';
import { CTASection } from '@/components/sections/CTASection';

/**
 * HomePage - SMB-focused B2B Landing Page
 * Flow: Hero → Pricing anchors → Tech logos → Services → Quick wins → Why us → CTA
 */
export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <MonetizationSection />
      <TrustedTechnologiesSection />
      <ServicesSection />
      <DiscoveryPackagesSection />
      <WhyDBCloudSection />
      <CTASection />
    </Layout>
  );
}
