import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { mockIncidents } from '@/data/mockIncidents';
import { mockVesselCandidates, mockVesselTracks } from '@/data/mockVessels';
import type { Incident, VesselCandidate } from '@/types';
import { formatArea, formatConfidence, formatStatusLabel, getStatusBgColor } from '@/utils';
import { MapContainer } from '@/components/map/MapContainer';

export const LiveMonitoringPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [minConfidence] = useState<number>(50);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(mockIncidents[0]);
  const [selectedVessel, setSelectedVessel] = useState<VesselCandidate | null>(mockVesselCandidates[0]);

  const filteredIncidents = useMemo(() => {
    return mockIncidents.filter((inc) => {
      const matchRegion = selectedRegion === 'All Regions' || inc.region === selectedRegion;
      const matchConf = (inc.confidence ?? 0) >= minConfidence;
      return matchRegion && matchConf;
    });
  }, [selectedRegion, minConfidence]);

  const activeTrack = useMemo(() => {
    if (!selectedVessel || !selectedVessel.id) return mockVesselTracks['v-001'];
    return mockVesselTracks[selectedVessel.id] || mockVesselTracks['v-001'];
  }, [selectedVessel]);

  return (
    <div className="relative h-[calc(100vh-8.5rem)] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0a0f1e] shadow-lg dark:shadow-2xl flex flex-col">
      {/* Top Floating Command HUD */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-wrap items-center gap-3">
        <div className="bg-white/95 dark:bg-[#111827]/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-2 shadow-md dark:shadow-2xl flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span className="font-bold text-slate-900 dark:text-white tracking-wider">TACTICAL SURVEILLANCE COCKPIT</span>
          </div>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span className="text-slate-600 dark:text-slate-300 font-mono">
            Active Targets: <strong className="text-rose-600 dark:text-red-400">{filteredIncidents.length}</strong>
          </span>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span className="text-slate-600 dark:text-slate-300 font-mono">
            AIS Fleet: <strong className="text-cyan-600 dark:text-cyan-400">{mockVesselCandidates.length}</strong>
          </span>
        </div>

        {/* Region Quick Toggle */}
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="bg-white/95 dark:bg-[#111827]/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer shadow-md dark:shadow-xl"
        >
          <option value="All Regions">All Maritime Sectors</option>
          <option value="Arabian Sea">Arabian Sea Sector 4B</option>
          <option value="Laccadive Sea">Laccadive Sea</option>
          <option value="Bay of Bengal">Bay of Bengal</option>
        </select>
      </div>

      {/* Main Full-Height Map */}
      <div className="flex-1 w-full h-full relative">
        <MapContainer
          incidents={filteredIncidents}
          selectedIncident={selectedIncident}
          onSelectIncident={setSelectedIncident}
          vessels={mockVesselCandidates}
          selectedVessel={selectedVessel}
          onSelectVessel={setSelectedVessel}
          activeTrack={activeTrack}
          height="100%"
          className="!rounded-none !border-none"
        />

        {/* Selected Incident Floating Tactical Card */}
        {selectedIncident && (
          <div className="absolute bottom-6 right-6 z-[1000] w-80 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md border border-slate-200 dark:border-cyan-500/40 rounded-xl p-4 shadow-xl dark:shadow-2xl text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 mb-2">
              <span className="font-bold font-mono text-cyan-600 dark:text-cyan-400">{selectedIncident.id}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusBgColor(selectedIncident.status)}`}>
                {formatStatusLabel(selectedIncident.status)}
              </span>
            </div>

            <div className="space-y-1 mb-3">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Region:</span>
                <span className="font-medium text-slate-900 dark:text-slate-200">{selectedIncident.region}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Confidence:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {formatConfidence(selectedIncident.confidence)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Estimated Slick:</span>
                <span className="font-mono font-bold text-rose-600 dark:text-red-400">
                  {formatArea(selectedIncident.estimatedArea ?? selectedIncident.area ?? 12.4)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Sensor:</span>
                <span className="text-slate-800 dark:text-slate-200">{selectedIncident.satellite} ({selectedIncident.sensor})</span>
              </div>
              <div className="flex justify-between border-t border-slate-200/50 dark:border-slate-800/50 pt-1 mt-1">
                <span className="text-slate-500 dark:text-slate-400">t0 Origin (Est):</span>
                <span className="font-mono font-medium text-amber-600 dark:text-amber-500">18.7562°, 67.8091°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">+24h Forecast:</span>
                <span className="font-mono font-medium text-red-600 dark:text-red-400">18.3700°, 68.0880°</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => navigate(`/incidents/${selectedIncident.id}`)}
                className="px-2 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-semibold transition text-center"
              >
                Dossier
              </button>
              <button
                onClick={() => navigate(`/vessels/attribution/${selectedIncident.id}`)}
                className="px-2 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold transition text-center flex items-center justify-center gap-1"
              >
                <span>Attribution</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveMonitoringPage;
