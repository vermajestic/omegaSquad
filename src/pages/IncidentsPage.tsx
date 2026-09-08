import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Download,
  ExternalLink
} from 'lucide-react';
import { mockIncidents } from '@/data/mockIncidents';
import { 
  formatCoordinates, 
  formatArea, 
  formatConfidence, 
  formatDate, 
  formatStatusLabel, 
  getStatusBgColor 
} from '@/utils';
import { Button } from '@/components/common/Button';

export const IncidentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [regionFilter, setRegionFilter] = useState<string>('ALL');
  const [sensorFilter, setSensorFilter] = useState<string>('ALL');

  const filteredIncidents = useMemo(() => {
    return mockIncidents.filter((inc) => {
      const matchesSearch =
        inc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inc.region.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'ALL' || inc.status === statusFilter;
      const matchesRegion = regionFilter === 'ALL' || inc.region === regionFilter;
      const matchesSensor = sensorFilter === 'ALL' || inc.sensor === sensorFilter;

      return matchesSearch && matchesStatus && matchesRegion && matchesSensor;
    });
  }, [searchTerm, statusFilter, regionFilter, sensorFilter]);

  // Counts for metric badges
  const stats = useMemo(() => {
    return {
      total: mockIncidents.length,
      investigating: mockIncidents.filter(i => i.status === 'under_investigation').length,
      identified: mockIncidents.filter(i => i.status === 'vessel_identified').length,
      resolved: mockIncidents.filter(i => i.status === 'resolved').length,
      falsePositives: mockIncidents.filter(i => i.status === 'false_positive').length,
    };
  }, []);

  const handleExportCSV = () => {
    const headers = ['IncidentID', 'Region', 'Latitude', 'Longitude', 'Area_km2', 'Confidence', 'Satellite', 'Sensor', 'Status'];
    const rows = filteredIncidents.map(i => [
      i.id,
      i.region,
      i.coordinates?.lat ?? '',
      i.coordinates?.lng ?? '',
      i.estimatedArea ?? i.area ?? '',
      i.confidence ?? '',
      i.satellite ?? '',
      i.sensor ?? '',
      i.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ocean-sentinel-incidents.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Incident Registry & Surveillance Dossiers
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            Official operational log of satellite-detected marine hydrocarbon discharge incidents
          </p>
        </div>

        <Button
          variant="secondary"
          size="md"
          onClick={handleExportCSV}
          className="text-xs"
        >
          <Download className="w-3.5 h-3.5 mr-1.5" />
          <span>Export Registry (.CSV)</span>
        </Button>
      </div>

      {/* KPI Status Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-[#111827] border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Incidents</span>
          <div className="text-xl font-bold font-mono text-white mt-1">{stats.total}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#111827] border border-amber-500/30 bg-amber-950/10">
          <span className="text-[10px] uppercase font-bold text-amber-400">Investigating</span>
          <div className="text-xl font-bold font-mono text-amber-400 mt-1">{stats.investigating}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#111827] border border-blue-500/30 bg-blue-950/10">
          <span className="text-[10px] uppercase font-bold text-blue-400">Vessel Identified</span>
          <div className="text-xl font-bold font-mono text-blue-400 mt-1">{stats.identified}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#111827] border border-emerald-500/30 bg-emerald-950/10">
          <span className="text-[10px] uppercase font-bold text-emerald-400">Resolved Cases</span>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-1">{stats.resolved}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#111827] border border-slate-700 bg-slate-900/30">
          <span className="text-[10px] uppercase font-bold text-slate-400">False Positives</span>
          <div className="text-xl font-bold font-mono text-slate-400 mt-1">{stats.falsePositives}</div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search incident ID, sector, or region..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="new">New Alerts</option>
            <option value="under_investigation">Under Investigation</option>
            <option value="vessel_identified">Vessel Identified</option>
            <option value="resolved">Resolved</option>
            <option value="false_positive">False Positive</option>
          </select>

          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="ALL">All Maritime Regions</option>
            <option value="Arabian Sea">Arabian Sea</option>
            <option value="Laccadive Sea">Laccadive Sea</option>
            <option value="Bay of Bengal">Bay of Bengal</option>
          </select>

          <select
            value={sensorFilter}
            onChange={(e) => setSensorFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="ALL">All Sensors</option>
            <option value="SAR">Sentinel-1 (SAR)</option>
            <option value="EO">Sentinel-2 (Optical)</option>
          </select>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="rounded-xl bg-[#111827] border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800 bg-[#0a0f1e]/60 font-semibold">
              <tr>
                <th className="py-3 px-4">Incident ID</th>
                <th className="py-3 px-3">Date Detected</th>
                <th className="py-3 px-3">Maritime Region</th>
                <th className="py-3 px-3">Coordinates</th>
                <th className="py-3 px-3">Estimated Area</th>
                <th className="py-3 px-3">Satellite & Sensor</th>
                <th className="py-3 px-3">AI Confidence</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 font-mono">
              {filteredIncidents.map((inc) => {
                const conf = inc.confidence ?? 85;
                const isPrimary = inc.id === 'OS-2026-DEMO-041';

                return (
                  <tr
                    key={inc.id}
                    onClick={() => navigate(`/incidents/${inc.id}`)}
                    className={`cursor-pointer transition ${
                      isPrimary
                        ? 'bg-cyan-950/20 hover:bg-cyan-950/30 text-cyan-200'
                        : 'hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-cyan-400 flex items-center gap-1.5">
                      <span>{inc.id}</span>
                      {isPrimary && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                          Demo Case
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-sans text-slate-400">
                      {formatDate(inc.detectionTime || '2026-09-04T18:42:00Z')}
                    </td>
                    <td className="py-3 px-3 font-sans text-slate-200 font-semibold">
                      {inc.region}
                    </td>
                    <td className="py-3 px-3 text-slate-400">
                      {inc.coordinates ? formatCoordinates(inc.coordinates.lat, inc.coordinates.lng) : 'N/A'}
                    </td>
                    <td className="py-3 px-3 font-bold text-red-400">
                      {formatArea(inc.estimatedArea ?? inc.area ?? 12.4)}
                    </td>
                    <td className="py-3 px-3 font-sans">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px]">
                        {inc.satellite} ({inc.sensor})
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-400">{formatConfidence(conf)}</span>
                        <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className={`h-full rounded-full ${
                              conf >= 80 ? 'bg-emerald-500' : conf >= 50 ? 'bg-amber-500' : 'bg-slate-500'
                            }`}
                            style={{ width: `${conf}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-sans">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${getStatusBgColor(inc.status)}`}>
                        {formatStatusLabel(inc.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-sans">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/incidents/${inc.id}`);
                          }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition text-xs font-semibold"
                        >
                          Dossier
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/vessels/attribution/${inc.id}`);
                          }}
                          className="p-1 rounded bg-cyan-950 border border-cyan-800 text-cyan-400 hover:bg-cyan-900 transition"
                          title="Attribution Analysis"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
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

export default IncidentsPage;
