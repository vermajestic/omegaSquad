export interface ReportSection {
  title: string;
  content: string;
  type: 'text' | 'data' | 'image' | 'table' | 'timeline';
  data?: Record<string, unknown>;
}

export interface Report {
  id: string;
  incidentId: string;
  title: string;
  generatedAt: string;
  sections: ReportSection[];
  status: 'draft' | 'final';
}
