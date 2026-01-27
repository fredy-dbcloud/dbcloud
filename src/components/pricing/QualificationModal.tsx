import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useLang } from '@/hooks/useLang';
import { siteConfig } from '@/config/site';
import { AlertTriangle, Users, Clock, Server, ArrowRight, Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQualified: () => void;
  tierName: string;
}

type TeamSize = '1-5' | '6-20' | '20+' | null;
type YesNo = 'yes' | 'no' | null;

export function QualificationModal({ isOpen, onClose, onQualified, tierName }: QualificationModalProps) {
  const { lang, getLocalizedPath } = useLang();
  const [teamSize, setTeamSize] = useState<TeamSize>(null);
  const [needsSLA, setNeedsSLA] = useState<YesNo>(null);
  const [isProduction, setIsProduction] = useState<YesNo>(null);
  const [showBlocker, setShowBlocker] = useState(false);

  const labels = {
    en: {
      title: 'Quick Fit Check',
      description: 'A few quick questions help us optimize your experience',
      teamSizeLabel: 'Team size',
      teamSizeOptions: ['1–5 people', '6–20 people', '20+ people'],
      slaLabel: 'Do you need 24/7 support or formal SLAs?',
      productionLabel: 'Will this cover production environments?',
      yes: 'Yes',
      no: 'No',
      continue: 'Continue Securely',
      blockerTitle: 'Let\'s Find the Right Fit',
      blockerMessage: 'For 24/7 coverage and guaranteed uptime, our Enterprise plan is designed exactly for these needs. Let\'s discuss how we can best support you.',
      contactUs: 'Contact Us',
      scheduleCall: 'Schedule a Call',
      goBack: 'Go Back',
    },
    es: {
      title: 'Verificación Rápida',
      description: 'Algunas preguntas rápidas nos ayudan a optimizar tu experiencia',
      teamSizeLabel: 'Tamaño del equipo',
      teamSizeOptions: ['1–5 personas', '6–20 personas', '20+ personas'],
      slaLabel: '¿Necesitas soporte 24/7 o SLAs formales?',
      productionLabel: '¿Cubrirá ambientes de producción?',
      yes: 'Sí',
      no: 'No',
      continue: 'Continuar de Forma Segura',
      blockerTitle: 'Encontremos la Opción Correcta',
      blockerMessage: 'Para cobertura 24/7 y tiempo de actividad garantizado, nuestro plan Enterprise está diseñado exactamente para estas necesidades. Hablemos de cómo podemos apoyarte mejor.',
      contactUs: 'Contáctanos',
      scheduleCall: 'Agendar Llamada',
      goBack: 'Volver',
    },
  };

  const l = labels[lang];

  const handleContinue = () => {
    if (needsSLA === 'yes') {
      setShowBlocker(true);
    } else {
      onQualified();
    }
  };

  const handleGoBack = () => {
    setShowBlocker(false);
  };

  const handleClose = () => {
    setTeamSize(null);
    setNeedsSLA(null);
    setIsProduction(null);
    setShowBlocker(false);
    onClose();
  };

  const isComplete = teamSize !== null && needsSLA !== null && isProduction !== null;

  if (showBlocker) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary">
              <Users className="h-5 w-5" />
              {l.blockerTitle}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-foreground">
                {l.blockerMessage}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button 
                asChild
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                size="lg"
              >
                <a href={siteConfig.SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4" />
                  {l.scheduleCall}
                </a>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Link to={getLocalizedPath('/contact')}>
                  <Phone className="mr-2 h-4 w-4" />
                  {l.contactUs}
                </Link>
              </Button>

              <Button
                variant="ghost"
                onClick={handleGoBack}
                className="w-full text-muted-foreground"
              >
                {l.goBack}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{l.title}</DialogTitle>
          <DialogDescription>{l.description}</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Question 1: Team Size */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4 text-muted-foreground" />
              {l.teamSizeLabel}
            </Label>
            <RadioGroup
              value={teamSize || ''}
              onValueChange={(value) => setTeamSize(value as TeamSize)}
              className="grid grid-cols-3 gap-2"
            >
              {(['1-5', '6-20', '20+'] as const).map((size, index) => (
                <div key={size}>
                  <RadioGroupItem
                    value={size}
                    id={`team-${size}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`team-${size}`}
                    className="flex items-center justify-center px-3 py-2 text-sm border rounded-md cursor-pointer peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10 peer-data-[state=checked]:text-accent-foreground hover:bg-muted/50 transition-colors"
                  >
                    {l.teamSizeOptions[index]}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Question 2: SLA/24/7 Support */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4 text-muted-foreground" />
              {l.slaLabel}
            </Label>
            <RadioGroup
              value={needsSLA || ''}
              onValueChange={(value) => setNeedsSLA(value as YesNo)}
              className="grid grid-cols-2 gap-2"
            >
              <div>
                <RadioGroupItem value="yes" id="sla-yes" className="peer sr-only" />
                <Label
                  htmlFor="sla-yes"
                  className="flex items-center justify-center px-4 py-2 text-sm border rounded-md cursor-pointer peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10 peer-data-[state=checked]:text-accent-foreground hover:bg-muted/50 transition-colors"
                >
                  {l.yes}
                </Label>
              </div>
              <div>
                <RadioGroupItem value="no" id="sla-no" className="peer sr-only" />
                <Label
                  htmlFor="sla-no"
                  className="flex items-center justify-center px-4 py-2 text-sm border rounded-md cursor-pointer peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10 peer-data-[state=checked]:text-accent-foreground hover:bg-muted/50 transition-colors"
                >
                  {l.no}
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Question 3: Production Environment */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Server className="h-4 w-4 text-muted-foreground" />
              {l.productionLabel}
            </Label>
            <RadioGroup
              value={isProduction || ''}
              onValueChange={(value) => setIsProduction(value as YesNo)}
              className="grid grid-cols-2 gap-2"
            >
              <div>
                <RadioGroupItem value="yes" id="prod-yes" className="peer sr-only" />
                <Label
                  htmlFor="prod-yes"
                  className="flex items-center justify-center px-4 py-2 text-sm border rounded-md cursor-pointer peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10 peer-data-[state=checked]:text-accent-foreground hover:bg-muted/50 transition-colors"
                >
                  {l.yes}
                </Label>
              </div>
              <div>
                <RadioGroupItem value="no" id="prod-no" className="peer sr-only" />
                <Label
                  htmlFor="prod-no"
                  className="flex items-center justify-center px-4 py-2 text-sm border rounded-md cursor-pointer peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10 peer-data-[state=checked]:text-accent-foreground hover:bg-muted/50 transition-colors"
                >
                  {l.no}
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={!isComplete}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            size="lg"
          >
            {l.continue}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
