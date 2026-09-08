import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Filter, 
  Clock, 
  MapPin, 
  Satellite, 
  ArrowRight, 
  ExternalLink, 
  ShieldAlert, 
  Navigation, 
  Eye, 
  Radio, 
  RotateCcw
} from 'lucide-react';
import { mockIncidents } from '@/data/mockIncidents';
import { mockVesselCandidates, mockVesselTracks } from '@/data/mockVessels';
import type { Incident, VesselCandidate } from '@/types';
import { formatCoordinates, formatArea, formatConfidence, formatStatusLabel, getStatusBgColor } from '@/utils';
import { Button } from '@/components/common/Button';
import { ConfidenceGauge } from '@/components/common/ConfidenceGauge';
import { MapContainer } from '@/components/map/MapContainer';
import { KPIGrid } from '@/components/dashboard/KPIGrid';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { DemoWorkflow } from '@/components/dashboard/DemoWorkflow';

export const OverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('Last 7 Days');
  const [selectedIncident, setSelectedIncident] = useState<Incident>(mockIncidents[0]);
  const [selectedVessel, setSelectedVessel] = useState<VesselCandidate | null>(mockVesselCandidates[0]);

  // Filter incidents based on region
  const filteredIncidents = useMemo(() => {
    if (selectedRegion === 'All Regions') return mockIncidents;
    return mockIncidents.filter(inc => inc.region === selectedRegion);
  }, [selectedRegion]);

  // Active vessel track
  const activeTrack = useMemo(() => {
    if (!selectedVessel || !selectedVessel.id) return mockVesselTracks['v-001'];
    return mockVesselTracks[selectedVessel.id] || mockVesselTracks['v-001'];
  }, [selectedVessel]);

  const handleSelectIncident = (incident: Incident) => {
    setSelectedIncident(incident);
    // Auto-select top suspect vessel for demo if available
    setSelectedVessel(mockVesselCandidates[0]);
  };

  const handleResetFilters = () => {
    setSelectedRegion('All Regions');
    setSelectedTimeRange('Last 7 Days');
    setSelectedIncident(mockIncidents[0]);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Marine Intelligence Overview
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            Real-time multi-spectral satellite surveillance and automated vessel attribution console
          </p>
        </div>

        {/* Global Controls & Region Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Region Dropdown */}
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="appearance-none bg-[#111827] border border-slate-700/80 rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer shadow-sm"
            >
              <option value="All Regions">All Maritime Sectors</option>
              <option value="Arabian Sea">Arabian Sea (Sector 4B)</option>
              <option value="Laccadive Sea">Laccadive Sea</option>
              <option value="Bay of Bengal">Bay of Bengal</option>
            </select>
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Time Range Dropdown */}
          <div className="relative">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="appearance-none bg-[#111827] border border-slate-700/80 rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer shadow-sm"
            >
              <option value="Last 24 Hours">Last 24 Hours</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
            </select>
            <Clock className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={handleResetFilters}
            className="p-2 rounded-lg bg-[#111827] border border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-600 transition"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Guided Walkthrough Banner */}
      <DemoWorkflow onSelectDemoIncident={() => setSelectedIncident(mockIncidents[0])} />

      {/* 5 KPI Metric Cards */}
      <KPIGrid
        activeIncidentsCount={filteredIncidents.length}
        highConfidenceCount={filteredIncidents.filter(i => (i.confidence ?? 0) >= 80).length}
        vesselsTrackingCount={12}
        monitoredAreaKm2={125000}
        resolvedCasesCount={18}
      />

      {/* Main Map & Incident Inspector Split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Map Center Area (2 Cols on XL) */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                Geospatial Surveillance Map
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                {filteredIncidents.length} active alerts
              </span>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Click any spill marker or vessel to inspect
            </span>
          </div>

          <MapContainer
            incidents={filteredIncidents}
            selectedIncident={selectedIncident}
            onSelectIncident={handleSelectIncident}
            vessels={mockVesselCandidates.slice(0, 5)}
            selectedVessel={selectedVessel}
            onSelectVessel={setSelectedVessel}
            activeTrack={activeTrack}
            height="580px"
          />
        </div>

        {/* Selected Incident Detail Inspector (1 Col on XL) */}
        <div className="space-y-6 flex flex-col">
          <div className="rounded-xl bg-[#111827] border border-slate-800 p-5 shadow-2xl flex-1 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-bold text-cyan-400">
                      {selectedIncident.id}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getStatusBgColor(selectedIncident.status)}`}>
                      {formatStatusLabel(selectedIncident.status)}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    {selectedIncident.region} Slick Anomaly
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Confidence</span>
                  <div className="text-xl font-bold font-mono text-emerald-400">
                    {formatConfidence(selectedIncident.confidence)}
                  </div>
                </div>
              </div>

              {/* Confidence Gauge */}
              <div className="py-4 border-b border-slate-800">
                <ConfidenceGauge
                  value={selectedIncident.confidence ?? 85}
                  label="SAR Detection Confidence"
                />
              </div>

              {/* Spatial & Sensor Metadata */}
              <div className="py-4 space-y-2.5 border-b border-slate-800 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Coordinates:
                  </span>
                  <span className="font-mono font-medium text-slate-200">
                    {selectedIncident.coordinates
                      ? formatCoordinates(selectedIncident.coordinates.lat, selectedIncident.coordinates.lng)
                      : '18.7421° N, 67.8214° E'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-400" /> Estimated Area:
                  </span>
                  <span className="font-mono font-bold text-red-400">
                    {formatArea(selectedIncident.estimatedArea ?? selectedIncident.area ?? 12.4)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Satellite className="w-3.5 h-3.5 text-blue-400" /> Satellite Source:
                  </span>
                  <span className="font-medium text-slate-200">
                    {selectedIncident.satellite || 'Sentinel-1'} ({selectedIncident.sensor || 'SAR'})
                  </span>
                </div>
              </div>

              {/* Top Suspect Vessel Mini Card */}
              <div className="py-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                  <span>Correlated Suspect Vessel</span>
                  <span className="text-cyan-400 text-[10px] font-mono">Rank #1 Candidate</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between font-semibold text-slate-200 mb-1">
                    <span className="text-cyan-300">MV Ocean Star</span>
                    <span className="font-mono text-cyan-400">87% Match</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Closest Approach: <strong className="text-slate-300">2.1 km</strong></span>
                    <span>Type: <strong className="text-slate-300">Crude Tanker</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate(`/vessels/attribution/${selectedIncident.id}`)}
                className="w-full justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                <Navigation className="w-4 h-4 mr-2" />
                <span>Analyze Vessel Attribution</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate('/detection')}
                  className="w-full justify-center text-xs"
                >
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  <span>View SAR Mask</span>
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate(`/incidents/${selectedIncident.id}`)}
                  className="w-full justify-center text-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                  <span>Incident Dossier</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Surveillance Activity Feed */}
          <ActivityFeed onSelectIncidentId={(id) => {
            const inc = mockIncidents.find(i => i.id === id);
            if (inc) handleSelectIncident(inc);
          }} />
        </div>
      </div>

      {/* Incident Selection Table Bar */}
      <div className="rounded-xl bg-[#111827] border border-slate-800 p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>Active Incident Log ({filteredIncidents.length} Records)</span>
          </div>
          <button
            onClick={() => navigate('/incidents')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
          >
            <span>View All Incidents</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Incident ID</th>
                <th className="py-2.5 px-3">Region</th>
                <th className="py-2.5 px-3">Coordinates</th>
                <th className="py-2.5 px-3">Estimated Area</th>
                <th className="py-2.5 px-3">Sensor</th>
                <th className="py-2.5 px-3">Confidence</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredIncidents.map(inc => {
                const isSelected = inc.id === selectedIncident.id;
                return (
                  <tr
                    key={inc.id}
                    onClick={() => handleSelectIncident(inc)}
                    className={`cursor-pointer transition ${
                      isSelected ? 'bg-cyan-950/30 text-cyan-200' : 'hover:bg-slate-800/50 text-slate-300'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-cyan-400">{inc.id}</td>
                    <td className="py-2.5 px-3 font-sans">{inc.region}</td>
                    <td className="py-2.5 px-3 text-slate-400">
                      {inc.coordinates ? formatCoordinates(inc.coordinates.lat, inc.coordinates.lng) : 'N/A'}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-red-400">
                      {formatArea(inc.estimatedArea ?? inc.area ?? 10)}
                    </td>
                    <td className="py-2.5 px-3 font-sans text-slate-300">
                      {inc.satellite} {inc.sensor}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-emerald-400">
                      {formatConfidence(inc.confidence)}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold uppercase ${getStatusBgColor(inc.status)}`}>
                        {formatStatusLabel(inc.status)}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-sans">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectIncident(inc);
                        }}
                        className={`text-xs px-2.5 py-1 rounded transition ${
                          isSelected ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Inspect'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
