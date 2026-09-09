import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Satellite, 
  Search, 
  ArrowRight,
  Cpu
} from 'lucide-react';
import { mockSatelliteScenes } from '@/data/mockSatellite';
import { formatCoordinates, formatDate, formatArea } from '@/utils';
import { Button } from '@/components/common/Button';

export const SatelliteExplorerPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [satelliteFilter, setSatelliteFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredScenes = useMemo(() => {
    return mockSatelliteScenes.filter((scene) => {
      const matchesSearch =
        scene.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scene.region.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSat = satelliteFilter === 'ALL' || scene.satellite === satelliteFilter;
      const matchesStatus = statusFilter === 'ALL' || scene.processingStatus === statusFilter;

      return matchesSearch && matchesSat && matchesStatus;
    });
  }, [searchTerm, satelliteFilter, statusFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
      case 'analyzed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-400 dark:border-emerald-800';
      case 'preprocessed':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/80 dark:text-cyan-400 dark:border-cyan-800';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-6 pb-14">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Satellite Earth Observation Catalog
            </h1>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Copernicus Sentinel-1 SAR and Sentinel-2 optical imagery acquisition archive
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/detection')}
          className="text-xs shadow-xs dark:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          <Cpu className="w-3.5 h-3.5 mr-1.5" />
          <span>Launch Detection Studio</span>
        </Button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search scene ID or region..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 shadow-2xs"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={satelliteFilter}
            onChange={(e) => setSatelliteFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer shadow-2xs"
          >
            <option value="ALL">All Constellations</option>
            <option value="Sentinel-1">Sentinel-1 (C-SAR)</option>
            <option value="Sentinel-2">Sentinel-2 (Optical)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer shadow-2xs"
          >
            <option value="ALL">All Processing Stages</option>
            <option value="completed">Completed</option>
            <option value="analyzed">AI Analyzed</option>
            <option value="preprocessed">Preprocessed</option>
            <option value="raw">Raw Level-1</option>
          </select>
        </div>
      </div>

      {/* Scenes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredScenes.map((scene) => (
          <div
            key={scene.id}
            className="rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 p-4 shadow-xs hover:shadow-sm dark:shadow-xl flex flex-col justify-between transition group"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-1 mb-2">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">{scene.id}</span>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{scene.region}</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-mono font-bold border ${getStatusBadge(scene.processingStatus)}`}>
                  {scene.processingStatus}
                </span>
              </div>

              {/* Sensor Badge */}
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 font-mono mb-3">
                <Satellite className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                <span>{scene.satellite} • {scene.sensor}</span>
              </div>

              {/* Metadata */}
              <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80 font-mono">
                <div className="flex justify-between">
                  <span>Acquisition:</span>
                  <span className="text-slate-800 dark:text-slate-200">{formatDate(scene.acquisitionDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Resolution:</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">{scene.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span>Swath Coverage:</span>
                  <span className="text-slate-800 dark:text-slate-200">{formatArea(scene.coverageArea)}</span>
                </div>
                <div className="flex justify-between text-[10px] pt-1 text-slate-400 dark:text-slate-500">
                  <span>Center:</span>
                  <span>{formatCoordinates(scene.coordinates.lat, scene.coordinates.lng)}</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate('/detection')}
                className="w-full justify-center text-xs group-hover:border-cyan-500/50"
              >
                <span>Inspect in Studio</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 text-slate-400 group-hover:text-cyan-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SatelliteExplorerPage;
