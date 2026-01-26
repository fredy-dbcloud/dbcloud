import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { FloatingButtons } from '@/components/ui/FloatingButtons';
import { SchemaOrg } from '@/components/seo/SchemaOrg';
import { PageMeta } from '@/components/seo/PageMeta';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <PageMeta />
      <SchemaOrg />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </div>
      <FloatingButtons />
    </>
  );
}
