import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip 
} from 'recharts';
import { Activity, AlertCircle } from 'lucide-react';
import type { VesselTrack } from '@/types';
import { formatTime, formatDistance, formatCoordinates } from '@/utils';

interface TrackAnalysisProps {
  track?: VesselTrack | null;
  vesselName?: string;
  className?: string;
}

export const TrackAnalysis: React.FC<TrackAnalysisProps> = ({
  track,
  vesselName = 'MV Ocean Star',
  className = '',
}) => {
  if (!track || !track.points || track.points.length === 0) {
    return (
      <div className={`rounded-xl bg-[#111827] border border-slate-800 p-5 text-center text-slate-400 ${className}`}>
        No trajectory telemetry available for this vessel.
      </div>
    );
  }

  // Format telemetry points for Recharts
  const chartData = track.points.map((pt) => {
    const timeStr = formatTime(pt.timestamp).replace(' UTC', '');
    return {
      time: timeStr,
      timestamp: pt.timestamp,
      speed: pt.speed,
      heading: pt.heading,
      lat: pt.lat,
      lng: pt.lng,
    };
  });

  const closest = track.closestApproach;

  return (
    <div className={`rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] p-5 shadow-xs dark:shadow-xl transition-colors ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            AIS Speed & Trajectory Profile
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Speed anomaly analysis along {vesselName}'s voyage track
          </p>
        </div>
        <span className="text-[11px] font-mono text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/60 dark:border-amber-800/60 px-2 py-0.5 rounded">
          Anomaly Flagged: Speed Dip
        </span>
      </div>

      {/* Speed Telemetry Chart */}
      <div className="h-44 w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="speedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#94a3b8' }}
            />
            <YAxis
              domain={[10, 18]}
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#94a3b8' }}
              unit=" kt"
            />
            <RechartsTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white dark:bg-[#0a0f1e] border border-slate-200 dark:border-slate-700 p-2 rounded-lg shadow-md text-xs font-mono text-slate-800 dark:text-slate-200">
                      <div className="font-bold text-cyan-600 dark:text-cyan-400">{data.time} UTC</div>
                      <div>Speed: <strong className="text-slate-900 dark:text-slate-100">{data.speed} kts</strong></div>
                      <div>Heading: {data.heading}°</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="speed"
              stroke="#06b6d4"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#speedGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Point of Closest Approach Callout */}
      {closest && (
        <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-500/30 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300">
            <div className="font-bold text-amber-800 dark:text-amber-300 mb-0.5">
              Point of Closest Approach (PCA): {formatDistance(closest.distanceKm ?? closest.distance ?? 2.1)}
            </div>
            <div className="text-slate-600 dark:text-slate-400 leading-snug">
              At <strong className="text-slate-900 dark:text-slate-200">{formatTime(closest.timestamp)}</strong>, vessel slowed down to 13.5 kts at coordinates{' '}
              <span className="font-mono text-cyan-700 dark:text-cyan-300">
                {formatCoordinates(closest.point.lat, closest.point.lng)}
              </span>
              , directly coinciding with the up-current origin of the slick.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
