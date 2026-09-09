import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Navigation, 
  Search, 
  RefreshCw, 
  Radio
} from 'lucide-react';
import { mockIncidents } from '@/data/mockIncidents';
import { mockVesselCandidates, mockVesselTracks } from '@/data/mockVessels';
import type { VesselCandidate } from '@/types';
import { Button } from '@/components/common/Button';
import { MapContainer } from '@/components/map/MapContainer';
import { VesselTable } from '@/components/vessel/VesselTable';
import { VesselDetail } from '@/components/vessel/VesselDetail';
import { TrackAnalysis } from '@/components/vessel/TrackAnalysis';

export const VesselIntelligencePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('OS-2026-DEMO-041');
  const [searchRadius, setSearchRadius] = useState<string>('100 km');
  const [timeWindow, setTimeWindow] = useState<string>('72 Hours');
  const [selectedVessel, setSelectedVessel] = useState<VesselCandidate>(mockVesselCandidates[0]);
  const [isQueryingAIS, setIsQueryingAIS] = useState<boolean>(false);
  const [queryProgress, setQueryProgress] = useState<number>(0);

  const currentIncident = useMemo(() => {
    return mockIncidents.find(i => i.id === selectedIncidentId) || mockIncidents[0];
  }, [selectedIncidentId]);

  const activeTrack = useMemo(() => {
    if (!selectedVessel || !selectedVessel.id) return mockVesselTracks['v-001'];
    return mockVesselTracks[selectedVessel.id] || mockVesselTracks['v-001'];
  }, [selectedVessel]);

  // Simulate AIS querying
  const handleQueryAIS = () => {
    setIsQueryingAIS(true);
    setQueryProgress(20);

    const t1 = setTimeout(() => setQueryProgress(60), 400);
    const t2 = setTimeout(() => setQueryProgress(90), 800);
    const t3 = setTimeout(() => {
      setQueryProgress(100);
      setIsQueryingAIS(false);
    }, 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              AIS Vessel Intelligence & Traffic Correlation
            </h1>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Autonomous spatio-temporal correlation of maritime transponder telemetry against spill coordinates
          </p>
        </div>

        {/* Global Controls & Corridor Filter */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Incident Selector */}
          <select
            value={selectedIncidentId}
            onChange={(e) => setSelectedIncidentId(e.target.value)}
            className="bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-700/80 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer shadow-2xs"
          >
            {mockIncidents.map(inc => (
              <option key={inc.id} value={inc.id}>
                {inc.id} ({inc.region})
              </option>
            ))}
          </select>

          {/* Search Radius */}
          <select
            value={searchRadius}
            onChange={(e) => setSearchRadius(e.target.value)}
            className="bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-700/80 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer shadow-2xs"
          >
            <option value="25 km">Corridor: 25 km</option>
            <option value="50 km">Corridor: 50 km</option>
            <option value="100 km">Corridor: 100 km</option>
            <option value="200 km">Corridor: 200 km</option>
          </select>

          {/* Time Window */}
          <select
            value={timeWindow}
            onChange={(e) => setTimeWindow(e.target.value)}
            className="bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-700/80 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer shadow-2xs"
          >
            <option value="24 Hours">Window: 24 Hours</option>
            <option value="48 Hours">Window: 48 Hours</option>
            <option value="72 Hours">Window: 72 Hours</option>
          </select>

          <Button
            variant="primary"
            size="md"
            onClick={handleQueryAIS}
            disabled={isQueryingAIS}
            className="shadow-xs text-xs"
          >
            {isQueryingAIS ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1.5" />
                <span>Querying AIS ({queryProgress}%)...</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5 mr-1.5" />
                <span>Re-query AIS Feeds</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Query Banner */}
      {isQueryingAIS && (
        <div className="rounded-xl bg-white dark:bg-[#111827] border border-cyan-300 dark:border-cyan-500/40 p-4 shadow-xs dark:shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-cyan-700 dark:text-cyan-400 flex items-center gap-2 font-medium">
              <Radio className="w-4 h-4 animate-pulse text-cyan-600 dark:text-cyan-400" />
              Ingesting global terrestrial and satellite AIS transponder packets for {searchRadius} corridor...
            </span>
            <span className="text-slate-800 dark:text-slate-300 font-bold">{queryProgress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 rounded-full"
              style={{ width: `${queryProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Search Corridor Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] shadow-xs">
          <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400">Vessels in Corridor</span>
          <div className="mt-1 text-2xl font-bold font-mono text-slate-900 dark:text-white">12 Candidates</div>
          <span className="text-[10px] text-slate-500">Within {searchRadius} radius</span>
        </div>

        <div className="p-4 rounded-xl bg-rose-50/60 dark:bg-[#0d1320] border border-rose-200 dark:border-red-500/20 shadow-xs">
          <span className="text-[11px] uppercase font-bold text-rose-700 dark:text-red-400">Priority Suspects</span>
          <div className="mt-1 text-2xl font-bold font-mono text-rose-600 dark:text-red-400">1 Flagged</div>
          <span className="text-[10px] text-rose-600/80 dark:text-red-400/80">MV Ocean Star (87% Match)</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] shadow-xs">
          <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400">Telemetry Volume</span>
          <div className="mt-1 text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400">14,820 AIS Points</div>
          <span className="text-[10px] text-slate-500">{timeWindow} time-depth</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] shadow-xs">
          <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400">Incident Target</span>
          <div className="mt-1 text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">{currentIncident.id}</div>
          <span className="text-[10px] text-slate-500">{currentIncident.region}</span>
        </div>
      </div>

      {/* Main Split: Geospatial Map & Vessel Inspector */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Geospatial Map (2 Cols on XL) */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                Corridor Trajectory Tracking Map
              </span>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Active Focus: <strong className="text-cyan-300">{selectedVessel.name || 'MV Ocean Star'}</strong>
            </span>
          </div>

          <MapContainer
            incidents={[currentIncident]}
            selectedIncident={currentIncident}
            vessels={mockVesselCandidates}
            selectedVessel={selectedVessel}
            onSelectVessel={setSelectedVessel}
            activeTrack={activeTrack}
            height="560px"
          />
        </div>

        {/* Vessel Inspector & Speed Chart (1 Col on XL) */}
        <div className="space-y-6">
          <VesselDetail
            vessel={selectedVessel}
            incidentId={selectedIncidentId}
          />

          <TrackAnalysis
            track={activeTrack}
            vesselName={selectedVessel.name || 'MV Ocean Star'}
          />
        </div>
      </div>

      {/* Full Width Vessel Ranking Table */}
      <VesselTable
        candidates={mockVesselCandidates}
        selectedVesselId={selectedVessel.id}
        onSelectVessel={setSelectedVessel}
        onViewAttribution={() => navigate(`/vessels/attribution/${selectedIncidentId}`)}
      />
    </div>
  );
};

export default VesselIntelligencePage;
