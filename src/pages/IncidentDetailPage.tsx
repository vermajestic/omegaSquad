import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Satellite, 
  ShieldAlert, 
  Navigation, 
  FileCheck, 
  Eye, 
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { mockIncidents } from '@/data/mockIncidents';
import { mockVesselCandidates, mockVesselTracks } from '@/data/mockVessels';
import { 
  formatCoordinates, 
  formatArea, 
  formatConfidence, 
  formatDateTime, 
  formatStatusLabel, 
  getStatusBgColor 
} from '@/utils';
import { Button } from '@/components/common/Button';
import { MapContainer } from '@/components/map/MapContainer';

export const IncidentDetailPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const incident = useMemo(() => {
    return mockIncidents.find((i) => i.id === id) || mockIncidents[0];
  }, [id]);

  const targetVessel = mockVesselCandidates[0];
  const targetTrack = mockVesselTracks['v-001'];

  return (
    <div className="space-y-6 pb-14">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/incidents" className="hover:text-cyan-400 transition flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Incident Registry
          </Link>
          <span>/</span>
          <span className="font-mono text-cyan-400 font-bold">{incident.id}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${getStatusBgColor(incident.status)}`}>
            {formatStatusLabel(incident.status)}
          </span>
        </div>
      </div>

      {/* Incident Header Dossier Card */}
      <div className="rounded-xl bg-[#111827] border border-slate-800 p-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400">MARITIME SURVEILLANCE DOSSIER</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Incident {incident.id} • {incident.region}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Detected by {incident.satellite || 'Sentinel-1'} ({incident.sensor || 'SAR'} C-Band) at {formatDateTime(incident.detectionTime || '2026-09-04T18:42:00Z')}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400">AI Confidence</span>
              <div className="text-2xl font-bold font-mono text-emerald-400">
                {formatConfidence(incident.confidence)}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-emerald-500/30 flex items-center justify-center bg-emerald-950/40 text-emerald-400 font-bold">
              ✓
            </div>
          </div>
        </div>

        {/* Spatial & Physical Parameters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 text-xs">
          <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
            <span className="text-slate-400 flex items-center gap-1 mb-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Center Coordinates
            </span>
            <div className="font-mono font-bold text-slate-200">
              {incident.coordinates ? formatCoordinates(incident.coordinates.lat, incident.coordinates.lng) : 'N/A'}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
            <span className="text-slate-400 flex items-center gap-1 mb-1">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" /> Estimated Slick Area
            </span>
            <div className="font-mono font-bold text-red-400">
              {formatArea(incident.estimatedArea ?? incident.area ?? 12.4)}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
            <span className="text-slate-400 flex items-center gap-1 mb-1">
              <Satellite className="w-3.5 h-3.5 text-blue-400" /> Earth Observation
            </span>
            <div className="font-mono font-bold text-slate-200">
              {incident.satellite} (10m Res)
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
            <span className="text-slate-400 flex items-center gap-1 mb-1">
              <Navigation className="w-3.5 h-3.5 text-amber-400" /> Primary Candidate
            </span>
            <div className="font-mono font-bold text-cyan-300">
              MV Ocean Star (87%)
            </div>
          </div>
        </div>
      </div>

      {/* 4 Action Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => navigate('/detection')}
          className="p-4 rounded-xl bg-[#111827] border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Eye className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">SAR Detection Studio</h4>
          <p className="text-xs text-slate-400">Inspect microwave backscatter mask & capillary wave damping</p>
        </div>

        <div
          onClick={() => navigate('/vessels')}
          className="p-4 rounded-xl bg-[#111827] border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Navigation className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">AIS Corridor Search</h4>
          <p className="text-xs text-slate-400">Review 12 candidate vessels in 100km corridor</p>
        </div>

        <div
          onClick={() => navigate(`/vessels/attribution/${incident.id}`)}
          className="p-4 rounded-xl bg-[#111827] border border-cyan-500/40 hover:border-cyan-400 cursor-pointer transition group shadow-[0_0_15px_rgba(6,182,212,0.15)]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </div>
          <h4 className="text-sm font-bold text-cyan-300 mb-1">Forensic Attribution</h4>
          <p className="text-xs text-slate-400">MV Ocean Star 87% multi-factor legal evidence</p>
        </div>

        <div
          onClick={() => navigate(`/reports/${incident.id}`)}
          className="p-4 rounded-xl bg-[#111827] border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FileCheck className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">MARPOL Report</h4>
          <p className="text-xs text-slate-400">Generate 10-section official Coast Guard dossier</p>
        </div>
      </div>

      {/* Main Split: Geospatial Map & Investigation Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geospatial Map */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Slick Geometry & Corridor Map
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Center: {incident.coordinates ? formatCoordinates(incident.coordinates.lat, incident.coordinates.lng) : ''}
            </span>
          </div>

          <MapContainer
            incidents={[incident]}
            selectedIncident={incident}
            vessels={[targetVessel]}
            selectedVessel={targetVessel}
            activeTrack={targetTrack}
            height="460px"
          />
        </div>

        {/* Chronological Investigation Timeline */}
        <div className="rounded-xl bg-[#111827] border border-slate-800 p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                  Operational Investigation Chronology
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">UTC Timestamps</span>
            </div>

            <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {(incident.timeline || []).map((ev, idx) => (
                <div key={ev.id || idx} className="relative pl-7 group">
                  <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-slate-900 bg-cyan-400 group-hover:scale-125 transition-transform" />
                  <div className="text-xs text-cyan-400 font-mono font-semibold">
                    {formatDateTime(ev.timestamp)}
                  </div>
                  <div className="text-xs text-slate-200 mt-0.5 leading-snug">
                    {ev.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Chain-of-custody recorded and timestamped</span>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(`/vessels/attribution/${incident.id}`)}
              className="text-xs"
            >
              <span>Attribution Studio</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailPage;
