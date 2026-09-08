import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from '@/contexts/AppContext';
import { IncidentProvider } from '@/contexts/IncidentContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LandingLayout } from '@/components/layout/LandingLayout';

import LandingPage from '@/pages/LandingPage';
import OverviewPage from '@/pages/OverviewPage';
import LiveMonitoringPage from '@/pages/LiveMonitoringPage';
import SpillDetectionPage from '@/pages/SpillDetectionPage';
import IncidentsPage from '@/pages/IncidentsPage';
import IncidentDetailPage from '@/pages/IncidentDetailPage';
import VesselIntelligencePage from '@/pages/VesselIntelligencePage';
import AttributionPage from '@/pages/AttributionPage';
import SatelliteExplorerPage from '@/pages/SatelliteExplorerPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import ReportsPage from '@/pages/ReportsPage';
import HowItWorksPage from '@/pages/HowItWorksPage';
import SettingsPage from '@/pages/SettingsPage';
import HelpPage from '@/pages/HelpPage';

function App() {
  return (
    <AppProvider>
      <IncidentProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<LandingLayout />}>
              <Route path="/" element={<LandingPage />} />
            </Route>
            <Route element={<DashboardLayout />}>
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="/monitoring" element={<LiveMonitoringPage />} />
              <Route path="/detection" element={<SpillDetectionPage />} />
              <Route path="/incidents" element={<IncidentsPage />} />
              <Route path="/incidents/:id" element={<IncidentDetailPage />} />
              <Route path="/vessels" element={<VesselIntelligencePage />} />
              <Route path="/vessels/attribution/:incidentId" element={<AttributionPage />} />
              <Route path="/satellite" element={<SatelliteExplorerPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/reports/:incidentId" element={<ReportsPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/help" element={<HelpPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </IncidentProvider>
    </AppProvider>
  );
}

export default App;
