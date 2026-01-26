import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { CTASection } from '@/components/sections/CTASection';
import { TrustSection } from '@/components/sections/TrustSection';

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <TrustSection />
      <CTASection />
    </Layout>
  );
}
