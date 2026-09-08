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
    <div className="relative h-[calc(100vh-8.5rem)] rounded-2xl overflow-hidden border border-slate-800 bg-[#0a0f1e] shadow-2xl flex flex-col">
      {/* Top Floating Command HUD */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-wrap items-center gap-3">
        <div className="bg-[#111827]/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-4 py-2 shadow-2xl flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white tracking-wider">TACTICAL SURVEILLANCE COCKPIT</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 font-mono">
            Active Targets: <strong className="text-red-400">{filteredIncidents.length}</strong>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 font-mono">
            AIS Fleet: <strong className="text-cyan-400">{mockVesselCandidates.length}</strong>
          </span>
        </div>

        {/* Region Quick Toggle */}
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="bg-[#111827]/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer shadow-xl"
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
          <div className="absolute bottom-6 right-6 z-[1000] w-80 bg-[#111827]/95 backdrop-blur-md border border-cyan-500/40 rounded-xl p-4 shadow-2xl text-xs text-slate-300">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
              <span className="font-bold font-mono text-cyan-400">{selectedIncident.id}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusBgColor(selectedIncident.status)}`}>
                {formatStatusLabel(selectedIncident.status)}
              </span>
            </div>

            <div className="space-y-1 mb-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Region:</span>
                <span className="font-medium text-slate-200">{selectedIncident.region}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Confidence:</span>
                <span className="font-mono font-bold text-emerald-400">
                  {formatConfidence(selectedIncident.confidence)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Slick:</span>
                <span className="font-mono font-bold text-red-400">
                  {formatArea(selectedIncident.estimatedArea ?? selectedIncident.area ?? 12.4)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sensor:</span>
                <span>{selectedIncident.satellite} ({selectedIncident.sensor})</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => navigate(`/incidents/${selectedIncident.id}`)}
                className="px-2 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition text-center"
              >
                Dossier
              </button>
              <button
                onClick={() => navigate(`/vessels/attribution/${selectedIncident.id}`)}
                className="px-2 py-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition text-center flex items-center justify-center gap-1"
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
