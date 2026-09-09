import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Anchor, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  FileCheck, 
  ArrowRight, 
  Download, 
  CheckCircle2
} from 'lucide-react';
import type { AttributionResult } from '@/types';
import { formatConfidence } from '@/utils';
import { Button } from '@/components/common/Button';

interface AttributionSummaryProps {
  attribution: AttributionResult;
  incidentId?: string;
  onExportJson?: () => void;
  className?: string;
}

export const AttributionSummary: React.FC<AttributionSummaryProps> = ({
  attribution,
  incidentId = 'OS-2026-DEMO-041',
  onExportJson,
  className = '',
}) => {
  const navigate = useNavigate();
  const score = attribution.overallScore ?? 87;
  return (
    <div className={`rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-cyan-500/40 p-6 shadow-xs dark:shadow-2xl relative overflow-hidden transition-colors ${className}`}>
      {/* Subtle ambient cyan glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
              INCIDENT {incidentId}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800 font-bold uppercase tracking-wide">
              Priority Case Attribution
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 dark:bg-cyan-950 dark:text-cyan-400 dark:border-cyan-800 font-mono">
              AI Forensic Model v3.2
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Anchor className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            <span>Primary Suspect: {attribution.vesselName}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            IMO 9123456 • Flag: Panama (PA) • Aframax Crude Oil Tanker (105,400 DWT)
          </p>
        </div>

        {/* Big Attribution Gauge */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 px-5 py-3 rounded-xl shadow-xs">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
              Attribution Score
            </span>
            <div className="text-3xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400">
              {formatConfidence(score)}
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 dark:border-t-cyan-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Core Telemetry Snapshot */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-5 border-b border-slate-100 dark:border-slate-800 relative z-10 text-xs">
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1">
            <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Closest Approach
          </span>
          <div className="text-base font-bold font-mono text-amber-600 dark:text-amber-400">2.1 km</div>
          <span className="text-[10px] text-slate-500">From estimated slick origin</span>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1">
            <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Temporal Window
          </span>
          <div className="text-base font-bold font-mono text-slate-800 dark:text-slate-200">-38 mins</div>
          <span className="text-[10px] text-slate-500">Transit before satellite pass</span>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-red-400" /> Speed Anomaly
          </span>
          <div className="text-base font-bold font-mono text-rose-600 dark:text-red-400">-0.7 kts</div>
          <span className="text-[10px] text-slate-500">Slowing pattern detected</span>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1">
            <FileCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Legal Admissibility
          </span>
          <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">Tier 1</div>
          <span className="text-[10px] text-slate-500">Verified AIS & radar records</span>
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="pt-5 flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Case package ready for Coast Guard port interception</span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={onExportJson}
            className="text-xs"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            <span>Export Evidence (.JSON)</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/reports/${incidentId}`)}
            className="text-xs font-semibold shadow-xs"
          >
            <FileCheck className="w-3.5 h-3.5 mr-1.5" />
            <span>Generate Official MARPOL Report</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
