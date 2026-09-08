import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  RefreshCw, 
  Layers, 
  UploadCloud,
  X
} from 'lucide-react';
import type { SatelliteScene, SpillDetection } from '@/types';
import { mockSatelliteScenes } from '@/data/mockSatellite';
import { mockIncidents } from '@/data/mockIncidents';
import { Button } from '@/components/common/Button';
import { ImageViewer } from '@/components/detection/ImageViewer';
import { DetectionResult } from '@/components/detection/DetectionResult';
import { AnalysisIndicators } from '@/components/detection/AnalysisIndicators';
import { SceneSelector } from '@/components/detection/SceneSelector';

export const SpillDetectionPage: React.FC = () => {
  const [selectedScene, setSelectedScene] = useState<SatelliteScene>(mockSatelliteScenes[0]);
  const [isInferencing, setIsInferencing] = useState<boolean>(false);
  const [inferenceProgress, setInferenceProgress] = useState<number>(0);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [activeIncident, setActiveIncident] = useState(mockIncidents[0]);

  // Handle scene switch
  const handleSelectScene = (scene: SatelliteScene) => {
    setSelectedScene(scene);
    // Switch to corresponding incident or fallback to primary
    const matched = mockIncidents.find(i => i.satellite === scene.satellite && i.region === scene.region) || mockIncidents[0];
    setActiveIncident(matched);
  };

  // Run AI inference simulation
  const handleRunInference = () => {
    setIsInferencing(true);
    setInferenceProgress(10);

    const step1 = setTimeout(() => setInferenceProgress(45), 400);
    const step2 = setTimeout(() => setInferenceProgress(80), 900);
    const step3 = setTimeout(() => {
      setInferenceProgress(100);
      setIsInferencing(false);
    }, 1400);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  };

  const detectionData: SpillDetection = {
    id: activeIncident.id,
    confidence: activeIncident.confidence ?? 94.2,
    coordinates: activeIncident.coordinates ?? { lat: 18.7421, lng: 67.8214 },
    estimatedArea: activeIncident.estimatedArea ?? 12.4,
    detectionTime: activeIncident.detectionTime ?? '2026-09-04T18:42:00Z',
    satellite: selectedScene.satellite,
    sensor: selectedScene.sensor as 'SAR' | 'EO',
    analysisIndicators: activeIncident.analysisIndicators || [],
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Satellite Spill Detection Studio
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            Copernicus C-SAR & Multispectral optical imagery anomaly segmentation pipeline
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={handleRunInference}
            disabled={isInferencing}
            className="shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            {isInferencing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                <span>Running Inference ({inferenceProgress}%)...</span>
              </>
            ) : (
              <>
                <Cpu className="w-4 h-4 mr-2" />
                <span>Run AI UNet Inference</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Inference Progress Banner */}
      {isInferencing && (
        <div className="rounded-xl bg-[#111827] border border-cyan-500/40 p-4 shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-cyan-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Applying Convolutional UNet Segmentation on Sentinel-1 C-SAR level-1 product...
            </span>
            <span className="text-slate-300 font-bold">{inferenceProgress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"
              style={{ width: `${inferenceProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Scene Repository Selector */}
      <SceneSelector
        selectedSceneId={selectedScene.id}
        onSelectScene={handleSelectScene}
        onSimulateUpload={() => setIsUploadModalOpen(true)}
      />

      {/* Main Imagery Viewer & Analysis Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Satellite Viewer (2 cols on LG) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                Multi-Spectral Scene Analyzer
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Scene: <strong className="text-slate-200">{selectedScene.id}</strong> • Res: <strong className="text-cyan-400">{selectedScene.resolution}</strong>
            </div>
          </div>

          <ImageViewer detection={detectionData} />
        </div>

        {/* Verification Indicators & Model Metrics (1 col on LG) */}
        <div className="space-y-6">
          <AnalysisIndicators indicators={activeIncident.analysisIndicators} />
        </div>
      </div>

      {/* Detection Result Summary Bar */}
      <DetectionResult
        detection={detectionData}
        incidentId={activeIncident.id}
      />

      {/* Upload GeoTIFF Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="bg-[#111827] border border-cyan-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-1">
              <UploadCloud className="w-5 h-5" />
              <span>INGEST SATELLITE PRODUCT</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Upload Sentinel-1 SAR / Sentinel-2 GeoTIFF
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Supports Level-1 GRD, SLC products, or calibrated GeoTIFF files with embedded geospatial coordinates.
            </p>

            <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-xl p-8 text-center bg-slate-900/50 cursor-pointer transition">
              <UploadCloud className="w-10 h-10 text-cyan-400 mx-auto mb-3 opacity-80" />
              <div className="text-sm font-semibold text-slate-200 mb-1">
                Drag and drop your GeoTIFF or SAFE package here
              </div>
              <p className="text-xs text-slate-400">
                Max file size 500MB • Formats: .tif, .tiff, .safe, .h5
              </p>
            </div>

            <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-800">
              <span className="text-xs text-slate-400">Or use simulated test product</span>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => setIsUploadModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setIsUploadModalOpen(false);
                    handleRunInference();
                  }}
                >
                  Load Sample SAR Scene
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpillDetectionPage;
