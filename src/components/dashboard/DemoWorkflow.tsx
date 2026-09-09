import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle2, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface DemoWorkflowProps {
  onSelectDemoIncident?: () => void;
}

export const DemoWorkflow: React.FC<DemoWorkflowProps> = ({ onSelectDemoIncident }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  // Close on Escape key and prevent body scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
      <section aria-label="Demo Workflow" className="rounded-lg bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] p-4 shadow-xs dark:shadow-none flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-150">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded bg-sky-50 dark:bg-[#131b2e] border border-sky-100 dark:border-[#1e293b] text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
            <Play className="w-4 h-4 fill-current text-sky-600 dark:text-sky-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm tracking-tight">
                Simulated Operational Walkthrough
              </span>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-sky-50 dark:bg-[#131b2e] text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-[#1e293b]">
                INVESTIGATION SCENARIO
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-normal">
              Autonomous multi-stage pipeline: Sentinel-1 SAR Detection → 72h AIS Corridor Backtracking → MARPOL Forensic Attribution.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="whitespace-nowrap cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current mr-1.5" />
          Launch Scenario
        </Button>
      </section>

      {/* Guided Walkthrough Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-slate-950/60 dark:bg-black/75 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-workflow-title"
        >
          <div 
            className="bg-white dark:bg-[#0d1320] border border-slate-200 dark:border-[#1e293b] rounded-xl max-w-lg w-full p-4 sm:p-5 shadow-2xl relative text-slate-800 dark:text-slate-100 transition-colors duration-150 flex flex-col max-h-[88vh] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#131b2e] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Modal Header */}
            <div className="pr-8">
              <div className="flex items-center gap-1.5 mb-1 text-sky-700 dark:text-sky-400 font-mono text-[11px] font-semibold uppercase tracking-wider">
                <Play className="w-3 h-3 fill-current" />
                <span>Operational Scenario OS-2026-041</span>
              </div>
              <h3 id="demo-workflow-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                Arabian Sea Tanker Spill Investigation
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 mb-3 leading-relaxed">
                Step through the exact procedural workflow executed by Coast Guard environmental response units.
              </p>
            </div>

            {/* Stepper Timeline - Scrollable area */}
            <div className="overflow-y-auto pr-1 -mr-1 space-y-2.5 my-1 max-h-[50vh]">
              {steps.map((step, idx) => {
                const isActive = currentStep === idx;
                const isPast = currentStep > idx;

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border transition-all duration-150 ${
                      isActive
                        ? 'bg-sky-50/90 dark:bg-[#131b2e] border-sky-300 dark:border-sky-600/70 shadow-xs'
                        : isPast
                        ? 'bg-emerald-50/40 dark:bg-[#0a121d] border-emerald-200/70 dark:border-emerald-950/60'
                        : 'bg-slate-50/60 dark:bg-[#080c14]/50 border-slate-200 dark:border-[#1e293b]/60 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        {isPast ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        ) : (
                          <span
                            className={`w-4 h-4 rounded text-[10px] font-mono flex items-center justify-center font-bold flex-shrink-0 ${
                              isActive 
                                ? 'bg-sky-600 text-white' 
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {idx + 1}
                          </span>
                        )}
                        <h4 className={`text-xs sm:text-sm font-semibold ${
                          isActive 
                            ? 'text-sky-900 dark:text-sky-300' 
                            : isPast 
                            ? 'text-slate-800 dark:text-slate-200' 
                            : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {step.title}
                        </h4>
                      </div>
                      {isActive && (
                        <span className="text-[9px] sm:text-[10px] font-mono font-medium uppercase tracking-wider text-sky-700 dark:text-sky-300 px-1.5 py-0.5 rounded bg-sky-100 dark:bg-[#101726] border border-sky-300 dark:border-sky-800/70 flex-shrink-0">
                          Active Phase
                        </span>
                      )}
                    </div>
                    <p className={`text-xs pl-6 leading-relaxed mb-2.5 ${
                      isActive 
                        ? 'text-slate-700 dark:text-slate-300' 
                        : 'text-slate-600 dark:text-slate-400'
                    }`}>
                      {step.desc}
                    </p>
                    {isActive && (
                      <div className="pl-6 pt-0.5">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            setIsOpen(false);
                            step.action();
                          }}
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

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-mono">
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
