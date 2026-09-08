export const INCIDENT_STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'under_investigation', label: 'Under Investigation' },
  { value: 'vessel_identified', label: 'Vessel Identified' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'false_positive', label: 'False Positive' },
] as const;

export const VESSEL_TYPES = [
  { value: 'tanker', label: 'Tanker' },
  { value: 'cargo', label: 'Cargo' },
  { value: 'container', label: 'Container' },
  { value: 'fishing', label: 'Fishing' },
  { value: 'passenger', label: 'Passenger' },
  { value: 'other', label: 'Other' },
] as const;

export const SATELLITE_SOURCES = [
  { value: 'Sentinel-1', label: 'Sentinel-1', sensor: 'SAR' },
  { value: 'Sentinel-2', label: 'Sentinel-2', sensor: 'EO' },
  { value: 'RADARSAT', label: 'RADARSAT', sensor: 'SAR' },
  { value: 'TerraSAR-X', label: 'TerraSAR-X', sensor: 'SAR' },
] as const;

export const REGIONS = [
  'Arabian Sea',
  'Bay of Bengal',
  'Indian Ocean',
  'Laccadive Sea',
  'Andaman Sea',
  'Strait of Malacca',
] as const;

export const ATTRIBUTION_DISCLAIMER = 'AI-assisted analytical assessment. Results are intended to support investigation and decision-making and do not constitute legal proof of responsibility.';
