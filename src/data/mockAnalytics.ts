import type { AnalyticsData } from '@/types';

export const mockAnalyticsData: AnalyticsData = {
  detectionsOverTime: [
    { label: 'Oct 25', value: 5 },
    { label: 'Nov 25', value: 8 },
    { label: 'Dec 25', value: 6 },
    { label: 'Jan 26', value: 10 },
    { label: 'Feb 26', value: 7 },
    { label: 'Mar 26', value: 12 },
    { label: 'Apr 26', value: 9 },
    { label: 'May 26', value: 14 },
    { label: 'Jun 26', value: 11 },
    { label: 'Jul 26', value: 8 },
    { label: 'Aug 26', value: 13 },
    { label: 'Sep 26', value: 6 }
  ],
  confidenceDistribution: [
    { label: '0-20%', value: 2 },
    { label: '20-40%', value: 5 },
    { label: '40-60%', value: 12 },
    { label: '60-80%', value: 25 },
    { label: '80-100%', value: 12 }
  ],
  spillAreaTrends: [
    { label: 'Oct 25', value: 6.2 },
    { label: 'Nov 25', value: 8.5 },
    { label: 'Dec 25', value: 7.1 },
    { label: 'Jan 26', value: 10.4 },
    { label: 'Feb 26', value: 9.0 },
    { label: 'Mar 26', value: 12.5 },
    { label: 'Apr 26', value: 11.2 },
    { label: 'May 26', value: 15.8 },
    { label: 'Jun 26', value: 14.1 },
    { label: 'Jul 26', value: 10.5 },
    { label: 'Aug 26', value: 18.2 },
    { label: 'Sep 26', value: 13.0 }
  ],
  attributionOutcomes: [
    { label: 'Vessel Identified', value: 31 },
    { label: 'Under Investigation', value: 12 },
    { label: 'Inconclusive', value: 8 },
    { label: 'False Positive', value: 5 }
  ],
  statusBreakdown: [
    { label: 'new', value: 8 },
    { label: 'under_investigation', value: 15 },
    { label: 'vessel_identified', value: 22 },
    { label: 'resolved', value: 6 },
    { label: 'false_positive', value: 5 }
  ],
  regionalActivity: [
    { label: 'Arabian Sea', value: 18 },
    { label: 'Bay of Bengal', value: 14 },
    { label: 'Indian Ocean', value: 10 },
    { label: 'Laccadive Sea', value: 7 },
    { label: 'Andaman Sea', value: 4 },
    { label: 'Strait of Malacca', value: 3 }
  ]
};
