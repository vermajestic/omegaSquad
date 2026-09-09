import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Satellite, 
  Cpu, 
  Compass, 
  FileCheck, 
  ArrowRight,
  CheckCircle2,
  Network
} from 'lucide-react';
import { Button } from '@/components/common/Button';

export const HowItWorksPage: React.FC = () => {
  const navigate = useNavigate();

  const pipelineSteps = [
    {
      step: '01',
      title: 'Satellite SAR & EO Swath Ingestion',
      subtitle: 'All-Weather Day/Night Radar Surveillance',
      icon: Satellite,
      desc: 'The pipeline ingests Sentinel-1 C-band synthetic aperture radar (SAR) Level-1 Ground Range Detected (GRD) products alongside Sentinel-2 multispectral optical passes. Unlike optical systems, SAR microwave pulses penetrate persistent monsoon cloud cover and operate seamlessly at night, eliminating blindspots.',
      bullets: [
        'Copernicus Open Access Hub automated pipeline',
        'C-band 5.405 GHz microwave backscatter',
        '10m spatial resolution across 250km swath width',
        'Radiometric calibration & Lee speckle filtering'
      ]
    },
    {
      step: '02',
      title: 'Deep AI UNet Anomaly Segmentation',
      subtitle: 'Capillary Wave Damping Detection',
      icon: Cpu,
      desc: 'Mineral oil and petroleum films dampen high-frequency ocean capillary ripples, resulting in dramatic attenuation of radar backscatter (dark surface anomalies). A custom PyTorch UNet deep convolutional network segments slicks while differentiating from biogenic slicks, grease ice, and low-wind areas.',
      bullets: [
        'ResNet-backbone UNet semantic segmentation',
        'Multi-spectral feature extraction & gradient analysis',
        'Wind-window validation (3 - 12 m/s optimal envelope)',
        'Geometric aspect ratio & elongation analysis'
      ]
    },
    {
      step: '03',
      title: 'Spatio-Temporal AIS Trajectory Backtracking',
      subtitle: '72-Hour Maritime Corridor Reconstruction',
      icon: Compass,
      desc: 'Upon slick detection, the spatial engine dynamically initiates a 72-hour AIS transponder historical query centered on the slick coordinates. The trajectory backtracker reconstructs discrete vessel voyages within a 100km corridor, computing high-precision Point of Closest Approach (PCA) metrics.',
      bullets: [
        'Terrestrial & satellite AIS transponder fusion',
        'Great-circle distance-to-slick calculations',
        'Speed pattern anomaly detection (discharge deceleration)',
        'Ocean current & wind drift back-projection'
      ]
    },
    {
      step: '04',
      title: 'Multi-Factor Forensic Attribution',
      subtitle: 'MARPOL Tier-1 Court Admissibility',
      icon: FileCheck,
      desc: 'The attribution matrix evaluates candidates across four mathematically weighted criteria: Spatial Proximity (30%), Temporal Correlation (25%), Trajectory Consistency (25%), and AIS Continuity (20%). It produces an audit-proof dossier ready for Coast Guard port interception.',
      bullets: [
        'Composite probabilistic score calculation',
        'Automatic MARPOL Annex I violation flagging',
        'Automated export of PDF-ready investigation dossiers',
        'Port State Control notification routing'
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
            System Architecture & Methodology
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          How Ocean Sentinel Works
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
          The end-to-end technical methodology linking orbital radar observations with maritime transponder telemetry for automated oil spill detection and forensic vessel attribution.
        </p>
      </div>

      {/* 4 Pipeline Stages */}
      <div className="space-y-6">
        {pipelineSteps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs hover:shadow-md dark:shadow-xl hover:border-cyan-500/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-mono font-bold text-lg flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
                  </div>
                  <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold mt-0.5">
                    {step.subtitle}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4 pl-0 sm:pl-16">
                {step.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-0 sm:pl-16 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                {step.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Architectural Stack Matrix */}
      <div className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs dark:shadow-xl transition-colors">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
          <Network className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          Technical Stack & Microservices Layer
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          High-performance modular architecture engineered for low-latency operational readiness
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-cyan-700 dark:text-cyan-400 font-bold block">1. INGESTION ENGINE</span>
            <div className="text-slate-700 dark:text-slate-300 space-y-1">
              <div>• Copernicus Hub API</div>
              <div>• Sentinel-1 C-SAR GRD</div>
              <div>• Global AIS NMEA Feeds</div>
              <div>• ECMWF Wind Field Data</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-cyan-700 dark:text-cyan-400 font-bold block">2. MACHINE INTELLIGENCE</span>
            <div className="text-slate-700 dark:text-slate-300 space-y-1">
              <div>• PyTorch UNet Model</div>
              <div>• Capillary Damping Mask</div>
              <div>• Biogenic Lookalike Filter</div>
              <div>• Drift Vector Engine</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-cyan-700 dark:text-cyan-400 font-bold block">3. FORENSICS & CLIENT</span>
            <div className="text-slate-700 dark:text-slate-300 space-y-1">
              <div>• React 19 + TypeScript</div>
              <div>• Leaflet Geospatial Engine</div>
              <div>• Multi-Factor Matrix</div>
              <div>• MARPOL PDF Generator</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="rounded-2xl bg-gradient-to-r from-cyan-50 via-white to-blue-50 dark:from-cyan-950/50 dark:via-slate-900 dark:to-blue-950/50 border border-cyan-200 dark:border-cyan-500/30 p-8 shadow-md dark:shadow-2xl text-center space-y-4">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Experience the Ocean Sentinel Platform</h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Explore the live command center dashboard or test the multi-spectral satellite detection studio on active Arabian Sea incidents.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/overview')}
            className="shadow-sm dark:shadow-[0_0_20px_rgba(6,182,212,0.35)]"
          >
            <span>Launch Command Console</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/incidents')}
          >
            <span>View Incident Dossiers</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
