import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  Legend,
  CartesianGrid 
} from 'recharts';
import { 
  TrendingUp, 
  ShieldCheck, 
  Activity,
  Award
} from 'lucide-react';
import { mockAnalyticsData } from '@/data/mockAnalytics';

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('12 Months');

  const COLORS = ['#06b6d4', '#3b82f6', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6'];

  return (
    <div className="space-y-6 pb-14">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Maritime Analytics & Intelligence Reports
            </h1>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Long-term temporal patterns, detection confidence distributions, and attribution outcomes
          </p>
        </div>

        {/* Time Selector */}
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-700/80 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer shadow-2xs"
        >
          <option value="6 Months">Window: Last 6 Months</option>
          <option value="12 Months">Window: Last 12 Months</option>
          <option value="All Time">Window: Historical All-Time</option>
        </select>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Total Detections
          </span>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">106</div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">+14% vs prior year</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Mean Confidence
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">86.4%</div>
          <span className="text-[10px] text-slate-500">Sentinel-1 C-SAR verified</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1">
            <Activity className="w-3.5 h-3.5 text-rose-600 dark:text-red-400" /> Cumulative Slick Area
          </span>
          <div className="text-2xl font-bold font-mono text-rose-600 dark:text-red-400">142.3 km²</div>
          <span className="text-[10px] text-slate-500">Total detected surface</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1">
            <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Attribution Success
          </span>
          <div className="text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400">78.2%</div>
          <span className="text-[10px] text-slate-500">Vessel identified or confirmed</span>
        </div>
      </div>

      {/* Visualizations Grid (6 Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Detections Over Time */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-xl transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Oil Spill Detections Over Time
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Monthly incident incidence count</p>
            </div>
            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">12 Months Trend</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockAnalyticsData.detectionsOverTime}>
                <defs>
                  <linearGradient id="detGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#cbd5e1" strokeOpacity={0.4} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 12, color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2.5} fill="url(#detGradient)" name="Detections" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Cumulative Area Trends */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-xl transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Monthly Spill Surface Area Trends
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Square kilometers (km²) of hydrocarbons detected</p>
            </div>
            <span className="text-xs font-mono text-rose-600 dark:text-red-400 font-bold">Area (km²)</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockAnalyticsData.spillAreaTrends}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#cbd5e1" strokeOpacity={0.4} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} unit=" km²" />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 12, color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2.5} fill="url(#areaGradient)" name="Area (km²)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Detection Confidence Distribution */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-xl transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Detection Confidence Distribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Incident count across model confidence brackets</p>
            </div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">Model v3</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAnalyticsData.confidenceDistribution}>
                <CartesianGrid stroke="#cbd5e1" strokeOpacity={0.4} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 12, color: '#f8fafc' }}
                />
                <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Incidents" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Vessel Attribution Outcomes */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-xl transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Vessel Attribution Outcomes
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Legal investigation resolution categories</p>
            </div>
            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">56 Total Cases</span>
          </div>

          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockAnalyticsData.attributionOutcomes}
                  dataKey="value"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {mockAnalyticsData.attributionOutcomes.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 12, color: '#f8fafc' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: '#64748b' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 5: Incident Status Breakdown */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-xl transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Incident Lifecycle Status Breakdown
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Current workflow states</p>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">Active Records</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAnalyticsData.statusBreakdown}>
                <CartesianGrid stroke="#cbd5e1" strokeOpacity={0.4} strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="label" 
                  stroke="#64748b" 
                  fontSize={10} 
                  tickLine={false} 
                  tickFormatter={(val) => val.replace('_', ' ').toUpperCase()} 
                />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 12, color: '#f8fafc' }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Incidents" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 6: Regional Maritime Activity */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-xl transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Geographic Incident Density
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Spills detected by maritime basin</p>
            </div>
            <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold">Arabian Sea Peak</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAnalyticsData.regionalActivity} layout="vertical">
                <CartesianGrid stroke="#cbd5e1" strokeOpacity={0.4} strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis dataKey="label" type="category" stroke="#64748b" fontSize={10} tickLine={false} width={90} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 12, color: '#f8fafc' }}
                />
                <Bar dataKey="value" fill="#f59e0b" radius={[0, 4, 4, 0]} name="Incidents" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
