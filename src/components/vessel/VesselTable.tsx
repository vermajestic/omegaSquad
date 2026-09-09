import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, ChevronRight } from 'lucide-react';
import type { VesselCandidate } from '@/types';
import { formatDistance, formatConfidence } from '@/utils';

interface VesselTableProps {
  candidates: VesselCandidate[];
  selectedVesselId?: string;
  onSelectVessel: (vessel: VesselCandidate) => void;
  onViewAttribution?: (vessel: VesselCandidate) => void;
}

export const VesselTable: React.FC<VesselTableProps> = ({
  candidates,
  selectedVesselId,
  onSelectVessel,
  onViewAttribution,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [sortField, setSortField] = useState<'rank' | 'distance' | 'score' | 'trackMatch'>('rank');
  const [sortAsc, setSortAsc] = useState(true);

  const filteredCandidates = useMemo(() => {
    return candidates
      .filter((c) => {
        const name = c.name || c.vessel?.name || '';
        const imo = c.imo || c.vessel?.imo || '';
        const matchesSearch =
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          imo.includes(searchTerm);

        const type = c.type || c.vessel?.type || '';
        const matchesType = typeFilter === 'ALL' || type.toLowerCase() === typeFilter.toLowerCase();

        const priority = c.priority || 'low';
        const matchesPriority = priorityFilter === 'ALL' || priority === priorityFilter;

        return matchesSearch && matchesType && matchesPriority;
      })
      .sort((a, b) => {
        let valA = 0;
        let valB = 0;

        if (sortField === 'rank') {
          valA = a.rank ?? 0;
          valB = b.rank ?? 0;
        } else if (sortField === 'distance') {
          valA = a.distanceKm ?? a.distance ?? 0;
          valB = b.distanceKm ?? b.distance ?? 0;
        } else if (sortField === 'score') {
          valA = a.attributionScore ?? 0;
          valB = b.attributionScore ?? 0;
        } else if (sortField === 'trackMatch') {
          valA = a.trackMatchScore ?? a.trackMatch ?? 0;
          valB = b.trackMatchScore ?? b.trackMatch ?? 0;
        }

        return sortAsc ? valA - valB : valB - valA;
      });
  }, [candidates, searchTerm, typeFilter, priorityFilter, sortField, sortAsc]);

  const handleSort = (field: 'rank' | 'distance' | 'score' | 'trackMatch') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(field === 'rank' || field === 'distance');
    }
  };

  const getPriorityBadge = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-red-950/80 dark:text-red-400 dark:border-red-800/80';
      case 'review':
        return 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/80 dark:text-amber-400 dark:border-amber-800/80';
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
    }
  };

  return (
    <div className="rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-xl overflow-hidden transition-colors">
      {/* Table Controls Bar */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50 dark:bg-[#0e1424] transition-colors">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            AIS Vessel Traffic Correlation ({filteredCandidates.length} Candidates)
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search vessel name or IMO..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-48 sm:w-56 shadow-2xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer shadow-2xs"
          >
            <option value="ALL">All Ship Types</option>
            <option value="Tanker">Tankers</option>
            <option value="Cargo">Cargo Vessels</option>
            <option value="Container">Container</option>
            <option value="Fishing">Fishing</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer shadow-2xs"
          >
            <option value="ALL">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="review">Under Review</option>
            <option value="low">Low Risk</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-[#0a0f1e]/60">
            <tr>
              <th
                onClick={() => handleSort('rank')}
                className="py-3 px-3 cursor-pointer hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                <div className="flex items-center gap-1">
                  <span>Rank</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-4">Vessel Name / IMO</th>
              <th className="py-3 px-3">Type</th>
              <th
                onClick={() => handleSort('distance')}
                className="py-3 px-3 cursor-pointer hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                <div className="flex items-center gap-1">
                  <span>Proximity</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3">Time Offset</th>
              <th
                onClick={() => handleSort('trackMatch')}
                className="py-3 px-3 cursor-pointer hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                <div className="flex items-center gap-1">
                  <span>Track Match</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3">Speed Pattern</th>
              <th
                onClick={() => handleSort('score')}
                className="py-3 px-3 cursor-pointer hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                <div className="flex items-center gap-1">
                  <span>Attribution</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3">Priority</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70 font-mono">
            {filteredCandidates.map((c, idx) => {
              const isSelected = c.id === selectedVesselId;
              const isTop = idx === 0 || c.priority === 'high';
              const name = c.name || c.vessel?.name || 'Vessel';
              const imo = c.imo || c.vessel?.imo || 'N/A';
              const type = c.type || c.vessel?.type || 'Tanker';
              const dist = c.distanceKm ?? c.distance ?? 0;
              const score = c.attributionScore ?? 0;
              const rank = c.rank ?? idx + 1;

              return (
                <tr
                  key={c.id || idx}
                  onClick={() => onSelectVessel(c)}
                  className={`cursor-pointer transition ${
                    isSelected
                      ? 'bg-cyan-50/70 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-200'
                      : isTop
                      ? 'bg-cyan-50/30 hover:bg-slate-100/80 dark:bg-cyan-950/10 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                      : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <td className="py-3 px-3 font-bold">
                    <span
                      className={`inline-flex w-5 h-5 rounded-full items-center justify-center text-[10px] ${
                        isTop ? 'bg-cyan-500 text-white dark:text-slate-950 font-extrabold' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {rank}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-sans font-semibold">
                    <div className="text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <span>{name}</span>
                      {isTop && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">IMO {imo}</div>
                  </td>
                  <td className="py-3 px-3 font-sans">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300">
                      {type}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-amber-600 dark:text-amber-400">
                    {formatDistance(dist)}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    {c.timeOffset || c.timeDifference || 'N/A'}
                  </td>
                  <td className="py-3 px-3 text-slate-800 dark:text-slate-200 font-bold">
                    {c.trackMatchScore ?? c.trackMatch ?? 0}%
                  </td>
                  <td className="py-3 px-3 font-sans">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold ${
                        (c.speedPatternScore || c.speedPattern) === 'high'
                          ? 'text-rose-700 bg-rose-50 dark:text-red-400 dark:bg-red-950/50'
                          : (c.speedPatternScore || c.speedPattern) === 'medium'
                          ? 'text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/50'
                          : 'text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-800/50'
                      }`}
                    >
                      {c.speedPatternScore || c.speedPattern || 'low'}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-cyan-600 dark:text-cyan-400">
                        {formatConfidence(score)}
                      </span>
                      <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className={`h-full rounded-full ${
                            score >= 80 ? 'bg-cyan-500' : score >= 50 ? 'bg-amber-500' : 'bg-slate-400'
                          }`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-sans">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold ${getPriorityBadge(c.priority)}`}>
                      {c.priority || 'low'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-sans">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectVessel(c);
                        }}
                        className={`px-2.5 py-1 rounded transition text-xs ${
                          isSelected ? 'bg-cyan-500 text-white dark:text-slate-950 font-bold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300'
                        }`}
                      >
                        Inspect
                      </button>

                      {onViewAttribution && isTop && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewAttribution(c);
                          }}
                          className="px-2.5 py-1 rounded bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100 dark:bg-cyan-950 dark:border-cyan-800 dark:text-cyan-400 dark:hover:bg-cyan-900 transition text-xs font-semibold flex items-center gap-1"
                        >
                          <span>Attribution</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
