import { useState, useCallback } from 'react';
import { TriggerReason } from '@/components/addons/AddonTriggerModal';

interface AddonTriggerState {
  isOpen: boolean;
  reason: TriggerReason;
}

export function useAddonTrigger() {
  const [triggerState, setTriggerState] = useState<AddonTriggerState>({
    isOpen: false,
    reason: 'hours_exhausted',
  });

  const showAddonTrigger = useCallback((reason: TriggerReason) => {
    setTriggerState({ isOpen: true, reason });
  }, []);

  const closeAddonTrigger = useCallback(() => {
    setTriggerState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Check if hours are exhausted
  const checkHoursExhausted = useCallback((usedHours: number, planHours: number) => {
    const utilizationRate = usedHours / planHours;
    if (utilizationRate >= 0.9) {
      showAddonTrigger('hours_exhausted');
      return true;
    }
    return false;
  }, [showAddonTrigger]);

  // Check if request is urgent/incident type
  const checkUrgentRequest = useCallback((requestType: string, priority: string) => {
    const urgentTypes = ['incident', 'emergency', 'urgent'];
    const isUrgent = urgentTypes.some(t => requestType.toLowerCase().includes(t)) || 
                     (priority === 'high');
    if (isUrgent) {
      showAddonTrigger('urgent_request');
      return true;
    }
    return false;
  }, [showAddonTrigger]);

  // Check if request requires enterprise features
  const checkOutOfScope = useCallback((requestType: string, description: string) => {
    const enterpriseKeywords = ['sla', '24/7', '24x7', 'compliance', 'hipaa', 'soc2', 'pci', 'guaranteed uptime'];
    const lowerDesc = description.toLowerCase();
    const lowerType = requestType.toLowerCase();
    
    const isOutOfScope = enterpriseKeywords.some(kw => 
      lowerDesc.includes(kw) || lowerType.includes(kw)
    );
    
    if (isOutOfScope) {
      showAddonTrigger('out_of_scope');
      return true;
    }
    return false;
  }, [showAddonTrigger]);

  return {
    triggerState,
    showAddonTrigger,
    closeAddonTrigger,
    checkHoursExhausted,
    checkUrgentRequest,
    checkOutOfScope,
  };
}
