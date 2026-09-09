import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Printer, 
  FileText
} from 'lucide-react';
import { mockIncidents } from '@/data/mockIncidents';
import { mockVesselCandidates, mockVesselTracks } from '@/data/mockVessels';
import { mockAttributionResult } from '@/data/mockAttribution';
import { 
  formatCoordinates, 
  formatArea, 
  formatConfidence, 
  formatDateTime
} from '@/utils';
import { Button } from '@/components/common/Button';

export const ReportsPage: React.FC = () => {
  const { incidentId } = useParams<{ incidentId?: string }>();
  const [selectedId, setSelectedId] = useState<string>(incidentId || 'OS-2026-DEMO-041');

  const incident = useMemo(() => {
    return mockIncidents.find((i) => i.id === selectedId) || mockIncidents[0];
  }, [selectedId]);

  const topVessel = mockVesselCandidates[0]; // MV Ocean Star
  const track = mockVesselTracks['v-001'];
  const attribution = mockAttributionResult;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Top Action Bar (hidden on print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5 print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 tracking-wider">MARPOL ANNEX I ENFORCEMENT REPORT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Forensic Investigation Dossier
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Incident Selector */}
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-700/80 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500 shadow-xs cursor-pointer"
          >
            {mockIncidents.map(inc => (
              <option key={inc.id} value={inc.id}>
                Report: {inc.id}
              </option>
            ))}
          </select>

          <Button
            variant="primary"
            size="md"
            onClick={handlePrint}
            className="shadow-xs dark:shadow-[0_0_15px_rgba(6,182,212,0.3)] text-xs"
          >
            <Printer className="w-3.5 h-3.5 mr-1.5" />
            <span>Print / Save as PDF</span>
          </Button>
        </div>
      </div>

      {/* Official Report Document Container */}
      <div className="bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] rounded-2xl p-8 sm:p-12 shadow-sm dark:shadow-2xl space-y-8 text-slate-800 dark:text-slate-200 print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 print:border-black">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[11px] font-mono tracking-widest text-cyan-600 dark:text-cyan-400 font-bold uppercase print:text-black">
                GOVERNMENT OF INDIA • COAST GUARD SURVEILLANCE FLEET
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mt-1 print:text-black">
                MARINE HYDROCARBON SPILL ATTRIBUTION DOSSIER
              </h2>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1 print:text-gray-600">
                Official Case File: <strong className="text-slate-900 dark:text-slate-200 print:text-black">{incident.id}</strong> • Sector: {incident.region}
              </div>
            </div>

            <div className="text-right">
              <span className="px-3 py-1 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-800 text-xs font-mono font-bold uppercase print:border-black print:text-black print:bg-gray-100">
                MARPOL TIER 1 EVIDENCE
              </span>
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-2 print:text-gray-600">
                Generated: {formatDateTime(new Date().toISOString())}
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 border-b border-slate-200 dark:border-slate-800 pb-1 print:text-black print:border-black">
            1. Executive Summary & Incident Classification
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed print:text-black">
            On <strong>{formatDateTime(incident.detectionTime || '2026-09-04T18:42:00Z')}</strong>, the Ocean Sentinel autonomous marine surveillance platform detected a high-confidence hydrocarbon slick anomaly measuring approximately <strong>{formatArea(incident.estimatedArea ?? 12.4)}</strong> in the <strong>{incident.region}</strong> basin. Multi-factor algorithmic correlation with 72-hour historical AIS transponder telemetry identified <strong>{topVessel.name}</strong> (IMO: {topVessel.imo}, Flag: Panama) as the most probable responsible vessel with an overall attribution confidence of <strong>{formatConfidence(attribution.overallScore)}</strong>.
          </p>
        </section>

        {/* Section 2: Earth Observation Satellite Acquisition */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 border-b border-slate-200 dark:border-slate-800 pb-1 print:text-black print:border-black">
            2. Satellite Earth Observation Parameters
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 print:bg-gray-50 print:border-gray-300">
              <span className="text-slate-500 dark:text-slate-400">Constellation:</span>
              <div className="font-bold text-slate-900 dark:text-slate-200 print:text-black">{incident.satellite || 'Sentinel-1A'}</div>
            </div>
            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 print:bg-gray-50 print:border-gray-300">
              <span className="text-slate-500 dark:text-slate-400">Instrument:</span>
              <div className="font-bold text-slate-900 dark:text-slate-200 print:text-black">{incident.sensor || 'C-SAR'} (Interferometric Wide)</div>
            </div>
            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 print:bg-gray-50 print:border-gray-300">
              <span className="text-slate-500 dark:text-slate-400">Spatial Resolution:</span>
              <div className="font-bold text-cyan-600 dark:text-cyan-400 print:text-black">10 meters / pixel</div>
            </div>
            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 print:bg-gray-50 print:border-gray-300">
              <span className="text-slate-500 dark:text-slate-400">Polarization:</span>
              <div className="font-bold text-slate-900 dark:text-slate-200 print:text-black">VV + VH Dual-Pol</div>
            </div>
          </div>
        </section>

        {/* Section 3: Slick Spatial Geometry */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 border-b border-slate-200 dark:border-slate-800 pb-1 print:text-black print:border-black">
            3. Oil Slick Spatial Characteristics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 print:bg-gray-50 print:border-gray-300">
              <span className="text-slate-500 dark:text-slate-400">Center Geographic Coordinates:</span>
              <div className="font-bold text-slate-900 dark:text-slate-200 print:text-black">
                {incident.coordinates ? formatCoordinates(incident.coordinates.lat, incident.coordinates.lng) : '18.7421° N, 67.8214° E'}
              </div>
            </div>
            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 print:bg-gray-50 print:border-gray-300">
              <span className="text-slate-500 dark:text-slate-400">Surface Area:</span>
              <div className="font-bold text-red-600 dark:text-red-400 print:text-black">
                {formatArea(incident.estimatedArea ?? 12.4)}
              </div>
            </div>
            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 print:bg-gray-50 print:border-gray-300">
              <span className="text-slate-500 dark:text-slate-400">Drift Vector:</span>
              <div className="font-bold text-slate-900 dark:text-slate-200 print:text-black">1.2 kts @ 142° SE</div>
            </div>
          </div>
        </section>

        {/* Section 4: AI Model Anomaly Segmentation */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 border-b border-slate-200 dark:border-slate-800 pb-1 print:text-black print:border-black">
            4. Deep Learning Anomaly Segmentation & Verification
          </h3>
          <div className="space-y-1 text-xs">
            {(incident.analysisIndicators || []).map((ind, idx) => (
              <div key={idx} className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/60 print:border-gray-200">
                <span className="text-slate-700 dark:text-slate-300 print:text-black">{ind.name.replace(/_/g, ' ').toUpperCase()}</span>
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400 print:text-black">{ind.score}%</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Primary Suspect Vessel Profile */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 border-b border-slate-200 dark:border-slate-800 pb-1 print:text-black print:border-black">
            5. Primary Suspect Vessel Specifications
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 print:bg-gray-50 print:border-gray-300">
              <span className="text-slate-500 dark:text-slate-400">Vessel Name:</span>
              <div className="font-bold text-cyan-700 dark:text-cyan-300 print:text-black">{topVessel.name}</div>
            </div>
            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 print:bg-gray-50 print:border-gray-300">
              <span className="text-slate-500 dark:text-slate-400">IMO / MMSI:</span>
              <div className="font-bold text-slate-900 dark:text-slate-200 print:text-black">{topVessel.imo} / 354892000</div>
            </div>
            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 print:bg-gray-50 print:border-gray-300">
              <span className="text-slate-500 dark:text-slate-400">Flag State:</span>
              <div className="font-bold text-slate-900 dark:text-slate-200 print:text-black">Panama (Callsign: 3E2144)</div>
            </div>
            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 print:bg-gray-50 print:border-gray-300">
              <span className="text-slate-500 dark:text-slate-400">Classification:</span>
              <div className="font-bold text-slate-900 dark:text-slate-200 print:text-black">Crude Oil Tanker (105,400 DWT)</div>
            </div>
          </div>
        </section>

        {/* Section 6: Forensic Attribution Analysis */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 border-b border-slate-200 dark:border-slate-800 pb-1 print:text-black print:border-black">
            6. Multi-Factor Forensic Attribution Scoring
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {attribution.evidence.map((ev, idx) => (
              <div key={idx} className="p-3 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 print:bg-gray-50 print:border-gray-300 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-900 dark:text-slate-200 print:text-black">{ev.name}</span>
                  <span className="text-cyan-700 dark:text-cyan-400 font-mono print:text-black">{ev.score}% (Weight: {Math.round(ev.weight * 100)}%)</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed print:text-gray-700">{ev.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Point of Closest Approach */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 border-b border-slate-200 dark:border-slate-800 pb-1 print:text-black print:border-black">
            7. Point of Closest Approach (PCA) & Speed Profile
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed print:text-black">
            AIS trajectory interpolation recorded the vessel at closest approach of <strong>2.1 km</strong> at <strong>16:28:00 UTC</strong> ({formatCoordinates(track.closestApproach.point.lat, track.closestApproach.point.lng)}). The vessel experienced a temporary speed drop from <strong>14.2 knots to 13.5 knots</strong> at this juncture, corroborating illegal bilge water or oily mixture discharge in breach of MARPOL Annex I, Regulation 15.
          </p>
        </section>

        {/* Section 8: Legal Recommendations */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 border-b border-slate-200 dark:border-slate-800 pb-1 print:text-black print:border-black">
            8. Enforcement Recommendations & Notice
          </h3>
          <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1.5 print:text-black">
            <li>Dispatch Coast Guard Fast Interceptor Craft (FIC) or Dornier maritime patrol aircraft for physical sampling.</li>
            <li>Notify Port State Control at reported destination (Mundra Port, Gujarat) to board vessel upon docking.</li>
            <li>Request Oil Record Book (Part II - Cargo/Ballast Operations) inspection under MARPOL 73/78.</li>
            <li>Initiate proceedings under the Merchant Shipping Act and Environmental Protection Act.</li>
          </ul>
        </section>

        {/* Document Footer */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-end text-[11px] text-slate-500 font-mono print:border-black print:text-gray-600">
          <div>
            Certified by Ocean Sentinel AI Intelligence Engine • Case File #{incident.id}
          </div>
          <div className="text-right">
            Page 1 of 1 • Official Law Enforcement Record
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
