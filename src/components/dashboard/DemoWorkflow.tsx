import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle2, X, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface DemoWorkflowProps {
  onSelectDemoIncident?: () => void;
}

export const DemoWorkflow: React.FC<DemoWorkflowProps> = ({ onSelectDemoIncident }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: '1. Incident Anomaly Detected',
      desc: 'Sentinel-1 SAR registers a high-confidence dark surface anomaly in the Arabian Sea (Incident OS-2026-DEMO-041).',
      actionLabel: 'Inspect Incident on Map',
      action: () => {
        if (onSelectDemoIncident) onSelectDemoIncident();
        setCurrentStep(1);
      },
    },
    {
      title: '2. Review SAR Imagery & AI Mask',
      desc: 'Verify the deep learning segmentation mask isolating the 12.4 km² hydrocarbon slick from background sea clutter.',
      actionLabel: 'Open Satellite Detection Studio',
      action: () => {
        navigate('/detection');
      },
    },
    {
      title: '3. AIS Vessel Traffic Correlation',
      desc: 'Query 72-hour AIS transponder historical records within a 100km radius of the slick coordinate center.',
      actionLabel: 'Analyze AIS Candidates',
      action: () => {
        navigate('/vessels');
      },
    },
    {
      title: '4. Forensic Attribution Analysis',
      desc: 'Evaluate spatio-temporal proximity and speed changes. MV Ocean Star flagged with 87% attribution confidence.',
      actionLabel: 'View Attribution Breakdown',
      action: () => {
        navigate('/vessels/attribution/OS-2026-DEMO-041');
      },
    },
    {
      title: '5. Legal Dossier & Regulatory Report',
      desc: 'Generate a court-admissible MARPOL-compliant enforcement dossier with satellite and AIS forensic evidence.',
      actionLabel: 'Open Official Report',
      action: () => {
        navigate('/reports/OS-2026-DEMO-041');
      },
    },
  ];

  return (
    <>
      {/* Banner Trigger */}
      <div className="rounded-xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-blue-950/70 border border-cyan-500/30 p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 text-sm sm:text-base">
                Interactive Judge Walkthrough
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                2-MIN DEMO
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Experience the end-to-end flow: Satellite SAR detection → AIS backtracking → Vessel attribution → Legal report.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="whitespace-nowrap shadow-[0_0_15px_rgba(6,182,212,0.4)]"
        >
          <Play className="w-3.5 h-3.5 fill-current mr-1.5" />
          Run Interactive Demo
        </Button>
      </div>

      {/* Guided Walkthrough Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="bg-[#111827] border border-cyan-500/40 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 transition p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-1 text-cyan-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>GUIDED DEMO SCENARIO</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Investigating Arabian Sea Spill #OS-2026-041
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Step through the exact operational workflow used by Coast Guard environmental response units.
            </p>

            {/* Stepper Timeline */}
            <div className="space-y-4 mb-6">
              {steps.map((step, idx) => {
                const isActive = currentStep === idx;
                const isPast = currentStep > idx;

                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-cyan-950/30 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        : isPast
                        ? 'bg-slate-900/50 border-slate-800 opacity-80'
                        : 'bg-slate-900/20 border-slate-850 opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {isPast ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <span
                            className={`w-4 h-4 rounded-full text-[10px] font-mono flex items-center justify-center font-bold ${
                              isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {idx + 1}
                          </span>
                        )}
                        <h4 className={`text-sm font-semibold ${isActive ? 'text-cyan-300' : 'text-slate-200'}`}>
                          {step.title}
                        </h4>
                      </div>
                      {isActive && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                          Current Step
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 pl-6 leading-relaxed mb-3">
                      {step.desc}
                    </p>
                    {isActive && (
                      <div className="pl-6">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={step.action}
                          className="text-xs font-semibold"
                        >
                          <span>{step.actionLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button variant="secondary" size="sm" onClick={() => setCurrentStep(prev => prev - 1)}>
                    Previous
                  </Button>
                )}
                {currentStep < steps.length - 1 && (
                  <Button variant="ghost" size="sm" onClick={() => setCurrentStep(prev => prev + 1)}>
                    Skip Step
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
