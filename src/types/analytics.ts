export interface TimeSeriesDataPoint {
  date?: string;
  label?: string;
  value: number;
}

export interface DistributionDataPoint {
  range?: string;
  label?: string;
  count?: number;
  value?: number;
}

export interface CategoryDataPoint {
  category?: string;
  label?: string;
  value: number;
  color?: string;
}

export interface AnalyticsData {
  detectionsOverTime: TimeSeriesDataPoint[];
  confidenceDistribution: DistributionDataPoint[];
  spillAreaTrends: TimeSeriesDataPoint[];
  attributionOutcomes: CategoryDataPoint[];
  statusBreakdown: CategoryDataPoint[];
  regionalActivity: CategoryDataPoint[];
}
