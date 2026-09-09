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
    <section aria-label="Surveillance Telemetry Summary" className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Primary Tactical Threat Focal Point - Spans 4 Columns */}
      <article className="lg:col-span-4 rounded-lg bg-white dark:bg-[#0d1320] border border-rose-200 dark:border-rose-950/60 p-5 flex flex-col justify-between relative overflow-hidden shadow-xs dark:shadow-none transition-all duration-150">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span className="text-xs font-semibold tracking-wider text-rose-700 dark:text-rose-300 uppercase">
              Active Threat Alerts
            </span>
          </div>
          <div className="p-1.5 rounded border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>

        <div className="my-4">
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
              {activeIncidentsCount}
            </span>
            <span className="text-xs font-mono font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900/60">
              3 High Priority
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
            Continuous SAR monitoring across Mumbai High & Gulf of Kutch tanker corridors.
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-[#1e293b] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Coast Guard Sector 4B</span>
          <span className="text-rose-600 dark:text-rose-300 font-mono font-semibold">+2 alerts today</span>
        </div>
      </article>

      {/* Secondary Telemetry Strip - Spans 8 Columns in Asymmetrical 4-block layout */}
      <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          title="SAR Verified (>85%)"
          value={highConfidenceCount}
          subtext="Capillary damping confirmed"
          change="94.2% peak"
          isPositive={true}
          icon={ShieldCheck}
          variant="cyan"
        />
        <KPICard
          title="AIS Correlation"
          value={vesselsTrackingCount}
          subtext="72h corridor backtracking"
          change="12 targets"
          isPositive={true}
          icon={Navigation}
          variant="blue"
        />
        <KPICard
          title="Surveillance Zone"
          value={monitoredAreaKm2 >= 1000 ? `${Math.round(monitoredAreaKm2 / 1000)}k km²` : `${monitoredAreaKm2} km²`}
          subtext="Arabian & Laccadive Seas"
          change="Sentinel-1 SAR"
          isPositive={true}
          icon={Globe}
          variant="amber"
        />
        <KPICard
          title="Forensic Dossiers"
          value={resolvedCasesCount}
          subtext="MARPOL Tier-1 Attributed"
          change="+4 this week"
          isPositive={true}
          icon={CheckCircle2}
          variant="emerald"
        />
      </div>
    </section>
  );
};
