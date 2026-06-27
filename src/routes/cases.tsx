import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';

// --- Types & Constants ---

type SimulationStep = 'CHART' | 'CHECKLIST' | 'MONITORS' | 'INDUCTION' | 'AIRWAY' | 'MAINTENANCE';

interface VitalSigns {
  hr: number;
  spo2: number;
  bpSys: number;
  bpDia: number;
  rr: number;
  temp: number;
  etco2: number;
  fio2: number;
  mac: number;
  vt: number;
  peep: number;
}

const PATIENT_WEIGHT = 65; // kg

const DRUGS = [
  { id: 'propofol', name: 'Propofol', dosePerKg: 2, unit: 'mg', correct: true },
  { id: 'fentanyl', name: 'Fentanyl', dosePerKg: 2, unit: 'mcg', correct: true },
  { id: 'rocuronium', name: 'Rocuronium', dosePerKg: 0.6, unit: 'mg', correct: true },
  { id: 'ketamine', name: 'Ketamine', dosePerKg: 1.5, unit: 'mg', correct: false },
  { id: 'midazolam', name: 'Midazolam', dosePerKg: 0.05, unit: 'mg', correct: false },
  { id: 'thiopental', name: 'Thiopental', dosePerKg: 4, unit: 'mg', correct: false },
  { id: 'morphine', name: 'Morphine', dosePerKg: 0.1, unit: 'mg', correct: false },
  { id: 'etomidate', name: 'Etomidate', dosePerKg: 0.3, unit: 'mg', correct: false },
  { id: 'atracurium', name: 'Atracurium', dosePerKg: 0.5, unit: 'mg', correct: false },
  { id: 'succinylcholine', name: 'Succinylcholine', dosePerKg: 1.5, unit: 'mg', correct: false },
  { id: 'dexmedetomidine', name: 'Dexmedetomidine', dosePerKg: 0.5, unit: 'mcg', correct: false },
  { id: 'ondansetron', name: 'Ondansetron', dosePerKg: 0.1, unit: 'mg', correct: false },
  { id: 'ephedrine', name: 'Ephedrine', dosePerKg: 0.1, unit: 'mg', correct: false },
  { id: 'phenylephrine', name: 'Phenylephrine', dosePerKg: 1, unit: 'mcg', correct: false },
  { id: 'glycopyrrolate', name: 'Glycopyrrolate', dosePerKg: 0.004, unit: 'mg', correct: false },
  { id: 'lidocaine', name: 'Lidocaine', dosePerKg: 1.5, unit: 'mg', correct: false },
  { id: 'atropine', name: 'Atropine', dosePerKg: 0.01, unit: 'mg', correct: false },
];

const AIRWAY_STEPS = [
  'FACE_MASK',
  'LARYNGOSCOPE',
  'BLADE',
  'ETT_SIZE',
  'INTUBATION',
  'INFLATE_CUFF',
  'CONNECT_CIRCUIT',
  'CAPNOGRAPHY'
];

// --- Components ---

const Waveform = ({ color, type, active }: { color: string, type: 'ecg' | 'pleth' | 'co2', active: boolean }) => {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setOffset(prev => (prev + 2) % 200);
    }, 30);
    return () => clearInterval(interval);
  }, [active]);

  const getPath = () => {
    if (type === 'ecg') {
      return "M 0 25 L 20 25 L 25 10 L 30 40 L 35 25 L 50 25 L 55 5 L 60 45 L 65 25 L 80 25";
    } else if (type === 'pleth') {
      return "M 0 25 Q 15 5 30 25 T 60 25 T 90 25";
    } else {
      return "M 0 45 L 10 45 L 12 10 L 40 10 L 42 45 L 60 45";
    }
  };

  return (
    <svg viewBox="0 0 200 50" className="w-full h-12 overflow-hidden bg-black/20 rounded">
      <path
        d={`${getPath()} ${getPath()} ${getPath()}`}
        fill="none"
        stroke={active ? color : '#333'}
        strokeWidth="1.5"
        style={{ transform: `translateX(-${offset}px)`, transition: 'transform 0.03s linear' }}
      />
    </svg>
  );
};

export const Cases = () => {
  // Simulation State
  const [step, setStep] = useState<SimulationStep>('CHART');
  const [vitals, setVitals] = useState<VitalSigns>({
    hr: 72, spo2: 99, bpSys: 120, bpDia: 80, rr: 14, temp: 36.6, etco2: 0, fio2: 21, mac: 0, vt: 0, peep: 0
  });
  const [checklist, setChecklist] = useState({ id: false, consent: false, site: false, allergies: false, machine: false });
  const [connected, setConnected] = useState({ ecg: false, spo2: false, bp: false, temp: false, co2: false });
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedDrug, setSelectedDrug] = useState<typeof DRUGS[0] | null>(null);
  const [doseInput, setDoseInput] = useState('');
  const [givenDrugs, setGivenDrugs] = useState<string[]>([]);
  const [airwayStage, setAirwayStage] = useState(0);
  const [isAsleep, setIsAsleep] = useState(false);

  // Logic
  const notify = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleMonitorClick = (type: keyof typeof connected) => {
    setActiveTool(type);
    notify(`Click patient to attach ${type.toUpperCase()}`);
  };

  const handlePatientClick = (zone: string) => {
    if (!activeTool) return;
    
    const validMap: Record<string, string> = { ecg: 'chest', spo2: 'hand', bp: 'arm', temp: 'axilla', co2: 'airway' };
    
    if (validMap[activeTool] === zone) {
      setConnected(prev => ({ ...prev, [activeTool!]: true }));
      setActiveTool(null);
      notify(`${activeTool.toUpperCase()} connected successfully.`);
    } else {
      notify(`Incorrect placement for ${activeTool.toUpperCase()}.`);
    }
  };

  const validateDose = () => {
    if (!selectedDrug) return;
    const expected = selectedDrug.dosePerKg * PATIENT_WEIGHT;
    const input = parseFloat(doseInput);
    
    if (Math.abs(input - expected) < 0.1) {
      setGivenDrugs(prev => [...prev, selectedDrug.id]);
      setSelectedDrug(null);
      setDoseInput('');
      notify(`Administered ${selectedDrug.name} correctly.`);
      
      if (givenDrugs.length + 1 === 3) {
        setStep('AIRWAY');
      }
    } else {
      notify(`Incorrect dose. Re-calculate based on ${PATIENT_WEIGHT}kg.`);
    }
  };

  useEffect(() => {
    if (isAsleep) {
      setVitals(v => ({ ...v, hr: 65, bpSys: 105, bpDia: 65, etco2: 38, vt: 450, mac: 1.1, peep: 5, fio2: 50 }));
    }
  }, [isAsleep]);

  return (
    <div className="flex flex-col h-screen w-full bg-slate-900 text-slate-100 font-sans overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-slate-700 bg-slate-800 flex items-center justify-between px-6 z-50 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-white font-bold">H</span>
          </div>
          <h1 className="font-bold text-lg tracking-tight uppercase">OR-SIM High-Fidelity Anesthesia</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-xs uppercase tracking-widest text-slate-400">Status: <span className="text-blue-400">{step}</span></div>
          <div className="px-3 py-1 bg-slate-700 rounded text-sm font-mono">Patient: Male, 65kg, ASA II</div>
        </div>
      </header>

      <main className="flex-1 relative flex overflow-hidden">
        
        {/* Left: OR Environment */}
        <div className="flex-1 relative bg-slate-800 overflow-hidden">
          {/* Wall/Floor Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-700 to-slate-900" />
          <div className="absolute bottom-0 w-full h-1/3 bg-slate-950/30 -skew-y-1 origin-bottom-left" />
          
          {/* Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-20 bg-white/5 blur-3xl rounded-full" />

          {/* Patient SVG */}
          <div className="absolute inset-0 flex items-center justify-center pt-20">
            <div className="relative w-[800px] h-[400px]">
              {/* Floor Shadow */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-black/40 blur-2xl rounded-full" />
              
              {/* Operating Table */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-slate-400 rounded shadow-2xl border-b-4 border-slate-600" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-slate-500 border-x-4 border-slate-600" />
              
              {/* The Patient */}
              <svg viewBox="0 0 800 200" className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full h-auto drop-shadow-2xl">
                <path 
                  d="M100,100 C100,60 140,40 180,40 C220,40 230,80 230,100 L700,100 L700,130 L100,130 Z" 
                  fill={isAsleep ? "#94a3b8" : "#e2e8f0"} 
                  className="transition-colors duration-2000"
                />
                {/* Head Details */}
                <circle cx="160" cy="75" r="30" fill={isAsleep ? "#cbd5e1" : "#f1f5f9"} />
                {/* Interaction Zones */}
                <circle cx="160" cy="75" r="35" className="fill-transparent hover:fill-blue-400/20 cursor-pointer" onClick={() => handlePatientClick('airway')} />
                <rect x="250" y="60" width="100" height="60" className="fill-transparent hover:fill-blue-400/20 cursor-pointer" onClick={() => handlePatientClick('chest')} />
                <rect x="400" y="80" width="150" height="40" className="fill-transparent hover:fill-blue-400/20 cursor-pointer" onClick={() => handlePatientClick('arm')} />
                <rect x="650" y="90" width="40" height="30" className="fill-transparent hover:fill-blue-400/20 cursor-pointer" onClick={() => handlePatientClick('hand')} />
              </svg>

              {/* Connections (Visual feedback) */}
              {connected.ecg && <div className="absolute top-36 left-[300px] w-1 h-20 bg-green-500/50 shadow-[0_0_10px_green]" />}
              {connected.spo2 && <div className="absolute top-44 left-[670px] w-1 h-16 bg-red-500/50 shadow-[0_0_10px_red]" />}
              {connected.bp && <div className="absolute top-36 left-[450px] w-8 h-4 bg-blue-500/50 rounded" />}
            </div>
          </div>

          {/* Anesthesia Machine Overlay */}
          <div className="absolute left-4 bottom-4 w-64 h-96 bg-slate-800 border-2 border-slate-600 rounded-lg shadow-2xl flex flex-col p-3">
             <div className="text-[10px] text-slate-400 mb-2 uppercase font-bold tracking-tighter border-b border-slate-700 pb-1">Anesthesia Workstation</div>
             <div className="flex-1 grid grid-cols-2 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-slate-900 rounded p-1 flex flex-col justify-center items-center border border-slate-700">
                    <div className="w-8 h-8 rounded-full border-2 border-slate-600 flex items-center justify-center">
                      <div className="w-1 h-4 bg-slate-400 origin-bottom transform rotate-45" />
                    </div>
                    <div className="text-[8px] mt-1 text-slate-500">DIAL {i+1}</div>
                  </div>
                ))}
             </div>
             <div className="mt-4 h-24 bg-blue-900/20 rounded border border-blue-500/30 flex items-center justify-center">
                <div className={`w-12 h-12 rounded-full border-4 ${isAsleep ? 'border-green-500 animate-pulse' : 'border-slate-700'}`} />
                <div className="ml-2 text-[10px] text-slate-300 italic">Bellows Active</div>
             </div>
          </div>
        </div>

        {/* Right: UI Panel */}
        <div className="w-96 bg-slate-900 border-l border-slate-700 flex flex-col shadow-2xl z-20">
          
          {/* Vitals Monitor */}
          <div className="h-1/2 bg-black p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-green-500 font-bold">MONITOR - LIVE</span>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-green-900/50 p-2 rounded bg-green-900/10">
                <div className="text-[10px] text-green-500">HR (bpm)</div>
                <div className="text-3xl font-mono text-green-400 font-bold">{connected.ecg ? vitals.hr : '--'}</div>
                <Waveform color="#4ade80" type="ecg" active={connected.ecg} />
              </div>
              <div className="border border-red-900/50 p-2 rounded bg-red-900/10">
                <div className="text-[10px] text-red-500">SpO₂ (%)</div>
                <div className="text-3xl font-mono text-red-400 font-bold">{connected.spo2 ? vitals.spo2 : '--'}</div>
                <Waveform color="#f87171" type="pleth" active={connected.spo2} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <div className="text-[8px] text-blue-400 uppercase">BP (mmHg)</div>
                <div className="text-lg font-mono text-blue-300">{connected.bp ? `${vitals.bpSys}/${vitals.bpDia}` : '--/--'}</div>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <div className="text-[8px] text-yellow-400 uppercase">EtCO₂</div>
                <div className="text-lg font-mono text-yellow-300">{connected.co2 ? vitals.etco2 : '--'}</div>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <div className="text-[8px] text-purple-400 uppercase">MAC</div>
                <div className="text-lg font-mono text-purple-300">{vitals.mac.toFixed(1)}</div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="text-[8px] text-yellow-500 mb-1">CAPNOGRAPHY</div>
              <Waveform color="#facc15" type="co2" active={connected.co2 && isAsleep} />
            </div>
          </div>

          {/* Workflow Controls */}
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            {step === 'CHART' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold border-b border-slate-700 pb-2">Pre-operative Chart</h2>
                <div className="bg-slate-800 p-4 rounded text-sm space-y-2">
                  <p><strong>Name:</strong> John Doe</p>
                  <p><strong>Age:</strong> 45</p>
                  <p><strong>Procedure:</strong> Laparoscopic Cholecystectomy</p>
                  <p><strong>History:</strong> Hypertension, BMI 28</p>
                  <p><strong>Meds:</strong> Lisinopril</p>
                </div>
                <button 
                  onClick={() => setStep('CHECKLIST')}
                  className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-bold transition-all"
                >
                  START PRE-OP CHECKLIST
                </button>
              </div>
            )}

            {step === 'CHECKLIST' && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold border-b border-slate-700 pb-2">Surgical Safety Checklist</h2>
                {Object.keys(checklist).map((key) => (
                  <label key={key} className="flex items-center gap-3 p-3 bg-slate-800 rounded cursor-pointer hover:bg-slate-700 border border-slate-700">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 accent-blue-500" 
                      onChange={() => setChecklist(prev => ({ ...prev, [key]: !prev[key as keyof typeof checklist] }))}
                    />
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')} Verified</span>
                  </label>
                ))}
                <button 
                  disabled={!Object.values(checklist).every(v => v)}
                  onClick={() => setStep('MONITORS')}
                  className="w-full bg-blue-600 disabled:bg-slate-700 hover:bg-blue-700 py-3 rounded font-bold transition-all mt-4"
                >
                  PROCEED TO MONITORING
                </button>
              </div>
            )}

            {step === 'MONITORS' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold border-b border-slate-700 pb-2">Attach Monitors</h2>
                <div className="grid grid-cols-2 gap-3">
                  {(['ecg', 'spo2', 'bp', 'temp'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => handleMonitorClick(m)}
                      className={`p-4 rounded border-2 flex flex-col items-center gap-2 transition-all ${connected[m] ? 'border-green-500 bg-green-500/10' : activeTool === m ? 'border-blue-500 bg-blue-500/20' : 'border-slate-700 bg-slate-800'}`}
                    >
                      <div className="w-8 h-8 rounded bg-slate-600 flex items-center justify-center text-xs font-bold">{m.toUpperCase()}</div>
                      <span className="text-[10px]">{connected[m] ? 'Connected' : 'Available'}</span>
                    </button>
                  ))}
                </div>
                <button 
                  disabled={!connected.ecg || !connected.spo2 || !connected.bp}
                  onClick={() => setStep('INDUCTION')}
                  className="w-full bg-blue-600 disabled:bg-slate-700 hover:bg-blue-700 py-3 rounded font-bold transition-all mt-4"
                >
                  PROCEED TO INDUCTION
                </button>
              </div>
            )}

            {step === 'INDUCTION' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold border-b border-slate-700 pb-2">Drug Administration</h2>
                <p className="text-[10px] text-slate-400 bg-slate-800 p-2 rounded">Select correct induction drugs and calculate dosage for 65kg patient.</p>
                
                <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-60 p-1">
                  {DRUGS.map(drug => (
                    <button
                      key={drug.id}
                      disabled={givenDrugs.includes(drug.id)}
                      onClick={() => {
                        if (!drug.correct) return notify(`Error: ${drug.name} is not standard for this induction sequence.`);
                        setSelectedDrug(drug);
                      }}
                      className={`text-[10px] p-2 rounded border transition-all ${givenDrugs.includes(drug.id) ? 'bg-green-900 border-green-500 opacity-50' : 'bg-slate-800 border-slate-700 hover:border-blue-500'}`}
                    >
                      {drug.name}
                    </button>
                  ))}
                </div>

                {selectedDrug && (
                  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-6">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-600 w-full max-w-sm shadow-2xl">
                      <h3 className="text-xl font-bold mb-2">Calculate Dose</h3>
                      <p className="text-sm text-slate-300 mb-4">Drug: <span className="text-blue-400 font-bold">{selectedDrug.name}</span></p>
                      <p className="text-xs mb-4 text-slate-400">Standard dose: {selectedDrug.dosePerKg}{selectedDrug.unit}/kg. Patient: {PATIENT_WEIGHT}kg.</p>
                      <div className="flex gap-2">
                        <input 
                          type="number" 
                          value={doseInput}
                          onChange={(e) => setDoseInput(e.target.value)}
                          placeholder={`Total ${selectedDrug.unit}...`}
                          className="flex-1 bg-slate-900 border border-slate-700 p-3 rounded text-white"
                        />
                        <button onClick={validateDose} className="bg-blue-600 px-6 rounded font-bold">GIVE</button>
                      </div>
                      <button onClick={() => setSelectedDrug(null)} className="mt-4 text-slate-500 text-xs hover:underline">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 'AIRWAY' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold border-b border-slate-700 pb-2">Airway Management</h2>
                <div className="flex flex-col gap-2">
                  {AIRWAY_STEPS.map((s, idx) => {
                    const isAvailable = airwayStage === idx;
                    const isDone = airwayStage > idx;
                    return (
                      <div 
                        key={s} 
                        className={`p-3 rounded border text-xs flex justify-between items-center transition-all ${isDone ? 'bg-green-900/20 border-green-700 text-green-400' : isAvailable ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                        onClick={() => {
                          if (isAvailable) {
                            if (s === 'CAPNOGRAPHY') {
                               setConnected(prev => ({...prev, co2: true}));
                               setAirwayStage(idx + 1);
                               setIsAsleep(true);
                               setStep('MAINTENANCE');
                            } else {
                               setAirwayStage(idx + 1);
                            }
                          }
                        }}
                      >
                        <span>{s.replace(/_/g, ' ')}</span>
                        {isDone && <span>✓</span>}
                        {isAvailable && <span className="animate-pulse">Select...</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 'MAINTENANCE' && (
              <div className="space-y-4">
                <div className="bg-green-600/20 border border-green-500 p-4 rounded text-green-400 text-sm">
                  <strong>Induction Successful</strong>
                  <p className="text-[10px] mt-1">The patient is now under general anesthesia. Monitor vitals and maintain depth.</p>
                </div>
                <div className="bg-slate-800 p-4 rounded space-y-4">
                   <div className="flex justify-between text-xs">
                      <span>Isoflurane Vaporizer</span>
                      <span className="text-blue-400 font-bold">1.2%</span>
                   </div>
                   <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[60%]" />
                   </div>
                   <div className="flex justify-between text-xs">
                      <span>Oxygen Flow</span>
                      <span className="text-green-400 font-bold">2.0 L/min</span>
                   </div>
                </div>
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full border border-slate-700 hover:bg-slate-800 py-3 rounded font-bold transition-all mt-4 text-xs"
                >
                  RESET SIMULATION
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Feedback */}
      {feedback && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-red-600 text-white font-bold rounded-full shadow-2xl z-[200] animate-bounce">
          {feedback}
        </div>
      )}

      {/* Overlay for specific step tooltips */}
      {activeTool && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 px-4 py-2 bg-blue-600 rounded text-sm font-bold animate-pulse z-40 pointer-events-none">
          Placing {activeTool.toUpperCase()}...
        </div>
      )}
    </div>
  );
};

// Route Export
export const Route = createFileRoute('/cases')({
  component: Cases,
});

export default Cases;