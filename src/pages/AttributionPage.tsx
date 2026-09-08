import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  FileText, 
  Download, 
  Compass, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { mockAttributionResult } from '@/data/mockAttribution';
import { mockIncidents } from '@/data/mockIncidents';
import { mockVesselCandidates, mockVesselTracks } from '@/data/mockVessels';
import type { AttributionResult } from '@/types';
import { Button } from '@/components/common/Button';
import { MapContainer } from '@/components/map/MapContainer';
import { AttributionSummary } from '@/components/attribution/AttributionSummary';
import { EvidenceCard } from '@/components/attribution/EvidenceCard';
import { ScoreBreakdown } from '@/components/attribution/ScoreBreakdown';
import { Disclaimer } from '@/components/attribution/Disclaimer';

export const AttributionPage: React.FC = () => {
  const { incidentId } = useParams<{ incidentId?: string }>();
  const navigate = useNavigate();
  const currentIncidentId = incidentId || 'OS-2026-DEMO-041';

  const [attribution, setAttribution] = useState<AttributionResult>(mockAttributionResult);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const currentIncident = useMemo(() => {
    return mockIncidents.find(i => i.id === currentIncidentId) || mockIncidents[0];
  }, [currentIncidentId]);

  const targetVessel = mockVesselCandidates[0]; // MV Ocean Star
  const targetTrack = mockVesselTracks['v-001'];

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(attribution, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `evidence-dossier-${currentIncidentId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleScoreUpdate = (newScore: number) => {
    setAttribution(prev => ({
      ...prev,
      overallScore: newScore,
    }));
  };

  return (
    <div className="space-y-6 pb-14">
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Link to="/vessels" className="hover:text-cyan-400 transition flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to Vessel Intelligence
            </Link>
            <span>/</span>
            <span className="text-cyan-400 font-mono">{currentIncidentId}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Forensic Vessel Attribution Studio
          </h1>
          <p className="text-sm text-slate-400">
            Multi-criteria algorithmic correlation linking SAR satellite slicks to responsible vessels
          </p>
        </div>

        {downloadSuccess && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Evidence Dossier Exported Successfully
          </div>
        )}
      </div>

      {/* Primary Suspect Overview Card */}
      <AttributionSummary
        attribution={attribution}
        incidentId={currentIncidentId}
        onExportJson={handleExportJson}
      />

      {/* 4 Multi-Factor Evidence Pillars Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            4 Pillars of Forensic Correlation
          </h3>
          <span className="text-xs text-slate-400 font-mono">Verified Under UNet-SAR & AIS Feeds</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {attribution.evidence.map((ev, idx) => (
            <EvidenceCard key={ev.id || idx} evidence={ev} />
          ))}
        </div>
      </div>

      {/* Interactive Weights Simulator */}
      <ScoreBreakdown
        evidenceList={attribution.evidence}
        initialScore={attribution.overallScore}
        onWeightsChange={handleScoreUpdate}
      />

      {/* Geospatial Verification Map */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Geospatial Trajectory Corroboration
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Point of Closest Approach (PCA): <strong className="text-amber-400">2.1 km</strong> at 16:28 UTC
          </span>
        </div>

        <MapContainer
          incidents={[currentIncident]}
          selectedIncident={currentIncident}
          vessels={[targetVessel]}
          selectedVessel={targetVessel}
          activeTrack={targetTrack}
          height="480px"
        />
      </div>

      {/* Regulatory & Legal Notice */}
      <Disclaimer />

      {/* Bottom Action Footer */}
      <div className="rounded-xl bg-[#111827] border border-slate-800 p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-white">Ready for Maritime Law Enforcement?</div>
          <div className="text-xs text-slate-400 mt-0.5">
            Compile this forensic dossier into an official MARPOL 73/78 compliant inspection report.
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="secondary"
            size="md"
            onClick={handleExportJson}
            className="w-full sm:w-auto"
          >
            <Download className="w-4 h-4 mr-2" />
            <span>Download Evidence .JSON</span>
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate(`/reports/${currentIncidentId}`)}
            className="w-full sm:w-auto shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <FileText className="w-4 h-4 mr-2" />
            <span>Generate Official MARPOL Report</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttributionPage;
