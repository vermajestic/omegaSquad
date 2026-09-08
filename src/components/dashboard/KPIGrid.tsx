import React from 'react';
import { AlertTriangle, ShieldCheck, Navigation, Globe, CheckCircle2 } from 'lucide-react';
import { KPICard } from './KPICard';

interface KPIGridProps {
  activeIncidentsCount?: number;
  highConfidenceCount?: number;
  vesselsTrackingCount?: number;
  monitoredAreaKm2?: number;
  resolvedCasesCount?: number;
}

export const KPIGrid: React.FC<KPIGridProps> = ({
  activeIncidentsCount = 7,
  highConfidenceCount = 4,
  vesselsTrackingCount = 12,
  monitoredAreaKm2 = 125000,
  resolvedCasesCount = 18,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <KPICard
        title="Active Spill Alerts"
        value={activeIncidentsCount}
        subtext="3 High Priority Spills"
        change="+2 today"
        isPositive={false}
        icon={AlertTriangle}
        variant="red"
      />
      <KPICard
        title="High-Confidence"
        value={highConfidenceCount}
        subtext="SAR verified (>85%)"
        change="94.2% peak"
        isPositive={true}
        icon={ShieldCheck}
        variant="cyan"
      />
      <KPICard
        title="Vessels Under AIS"
        value={vesselsTrackingCount}
        subtext="Spatio-temporal correlation"
        change="72h window"
        isPositive={true}
        icon={Navigation}
        variant="blue"
      />
      <KPICard
        title="Monitored Area"
        value={monitoredAreaKm2 >= 1000 ? `${Math.round(monitoredAreaKm2 / 1000)}K km²` : `${monitoredAreaKm2} km²`}
        subtext="Arabian & Laccadive Seas"
        change="Sentinel-1 SAR"
        isPositive={true}
        icon={Globe}
        variant="amber"
      />
      <KPICard
        title="Cases Resolved"
        value={resolvedCasesCount}
        subtext="92% Attribution accuracy"
        change="+4 this week"
        isPositive={true}
        icon={CheckCircle2}
        variant="emerald"
      />
    </div>
  );
};
