import { useState, useEffect } from 'react';
import { HeaderLogo } from './HeaderLogo';
import { HeaderNav } from './HeaderNav';
import { HeaderActions } from './HeaderActions';
import { HeaderMobileToggle, HeaderMobileMenu } from './HeaderMobile';
import { cn } from '@/lib/utils';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Sticky header behavior with scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50" 
          : "bg-background/80 backdrop-blur-sm"
      )}
    >
      <div 
        className={cn(
          "container flex items-center justify-between transition-all duration-300",
          isScrolled ? "h-14" : "h-16"
        )}
      >
        {/* Logo - Top Left (icon + name) */}
        <div className="flex-shrink-0">
          <HeaderLogo isScrolled={isScrolled} />
        </div>

        {/* Navigation - Center with proper spacing */}
        <div className="hidden lg:flex flex-1 justify-center ml-8">
          <HeaderNav />
        </div>

        {/* Right Side - Conversion Zone */}
        <div className="flex items-center gap-2">
          <HeaderActions />
          <HeaderMobileToggle 
            isOpen={mobileOpen} 
            onToggle={() => setMobileOpen(!mobileOpen)} 
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <HeaderMobileMenu 
        isOpen={mobileOpen} 
        onClose={() => setMobileOpen(false)} 
      />
    </header>
  );
}
