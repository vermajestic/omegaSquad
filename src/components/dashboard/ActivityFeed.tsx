import React from 'react';
import { Activity, Satellite, Navigation, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatTime } from '@/utils';

interface ActivityItem {
  id: string;
  type: 'detection' | 'vessel' | 'alert' | 'resolution';
  timestamp: string;
  title: string;
  description: string;
  badgeText?: string;
  badgeColor?: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'alert',
    timestamp: '2026-09-04T18:42:00Z',
    title: 'High-Confidence Spill Detected',
    description: 'Sentinel-1 SAR detected 12.4 km² slick in Arabian Sea (OS-2026-DEMO-041).',
    badgeText: '94.2% Conf',
    badgeColor: 'text-rose-700 bg-rose-50 border-rose-200 dark:text-red-400 dark:bg-red-950/60 dark:border-red-800/60',
  },
  {
    id: 'act-2',
    type: 'vessel',
    timestamp: '2026-09-04T19:15:00Z',
    title: 'AIS Correlation Triggered',
    description: '12 vessel candidates identified within 100km corridor. Top suspect: MV Ocean Star.',
    badgeText: 'Rank #1',
    badgeColor: 'text-cyan-700 bg-cyan-50 border-cyan-200 dark:text-cyan-400 dark:bg-cyan-950/60 dark:border-cyan-800/60',
  },
  {
    id: 'act-3',
    type: 'detection',
    timestamp: '2026-09-04T18:38:00Z',
    title: 'Sentinel-1 IW Swath Ingested',
    description: 'C-band SAR radar imagery preprocessed for Arabian Sea Sector 4B.',
    badgeText: '10m Res',
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/60 dark:border-blue-800/60',
  },
  {
    id: 'act-4',
    type: 'resolution',
    timestamp: '2026-08-30T14:00:00Z',
    title: 'Incident OS-2026-039 Resolved',
    description: 'Coast Guard confirmed attribution evidence against MT North Star. Case closed.',
    badgeText: 'Resolved',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/60 dark:border-emerald-800/60',
  },
];

interface ActivityFeedProps {
  className?: string;
  onSelectIncidentId?: (id: string) => void;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  className = '',
  onSelectIncidentId,
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-rose-500 dark:text-red-400" />;
      case 'vessel':
        return <Navigation className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />;
      case 'detection':
        return <Satellite className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'resolution':
        return <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Activity className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className={`rounded-xl bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] p-4 shadow-xs dark:shadow-xl transition-colors ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80 mb-3">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
          <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>Live Surveillance Feed</span>
        </div>
        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Updated seconds ago</span>
      </div>

      <div className="space-y-2.5">
        {mockActivities.map((act) => (
          <div
            key={act.id}
            className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-[#151e30] transition group cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
            onClick={() => onSelectIncidentId && onSelectIncidentId('OS-2026-DEMO-041')}
          >
            <div className="mt-0.5 p-1.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex-shrink-0">
              {getIcon(act.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-300">
                  {act.title}
                </span>
                {act.badgeText && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border font-mono font-medium ${act.badgeColor}`}>
                    {act.badgeText}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug line-clamp-2">
                {act.description}
              </p>
              <div className="mt-1 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                {formatTime(act.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
