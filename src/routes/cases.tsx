import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Wind, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  Syringe,
  Stethoscope,
  XCircle,
  Zap,
  Droplet,
  ArrowRight
} from 'lucide-react';

// --- Route Definition ---
export const Route = createFileRoute('/cases')({
  component: ORSimulator,
});

// --- Types & Data ---

type Phase = 'PREPARATION' | 'INDUCTION' | 'INTUBATION' | 'MAINTENANCE';

interface Drug {
  id: string;
  name: string;
  concentration: number; // mg/ml
  dosePerKg: number; // mg/kg
  color: string;
}

const DRUGS: Drug[] = [
  { id: 'propofol', name: 'Propofol', concentration: 10, dosePerKg: 2.0, color: '#FFFFFF' },
  { id: 'fentanyl', name: 'Fentanyl', concentration: 0.05, dosePerKg: 0.002, color: '#7EB6FF' },
  { id: 'rocuronium', name: 'Rocuronium', concentration: 10, dosePerKg: 0.6, color: '#FF9E9E' },
  { id: 'succinylcholine', name: 'Succinylcholine', concentration: 20, dosePerKg: 1.0, color: '#FF4500' },
  { id: 'atracurium', name: 'Atracurium', concentration: 10, dosePerKg: 0.5, color: '#FFB3BA' },
  { id: 'midazolam', name: 'Midazolam', concentration: 1, dosePerKg: 0.05, color: '#FFD700' },
  { id: 'ketamine', name: 'Ketamine', concentration: 50, dosePerKg: 1.5, color: '#90EE90' },
  { id: 'ephedrine', name: 'Ephedrine', concentration: 5, dosePerKg: 0.1, color: '#DEB887' },
  { id: 'atropine', name: 'Atropine', concentration: 0.5, dosePerKg: 0.01, color: '#E0E0E0' },
];

const AIRWAY_ITEMS = [
  { id: 'handle', label: 'Laryngoscope Handle' },
  { id: 'mac3', label: 'Macintosh Blade 3' },
  { id: 'miller2', label: 'Miller Blade 2' },
  { id: 'stylet', label: 'Stylet' },
  { id: 'ett70', label: 'ETT 7.0' },
  { id: 'ett75', label: 'ETT 7.5' },
  { id: 'ett80', label: 'ETT 8.0' },
  { id: 'syringe', label: 'Syringe' },
  { id: 'suction', label: 'Suction' },
];

// --- UI Components ---

const MonitorWaveform = ({ color, speed, amplitude }: { color: string, speed: number, amplitude: number }) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let frame = requestAnimationFrame(function animate() {
      setOffset(prev => (prev + speed) % 200);
      frame = requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(frame);
  }, [speed]);

  const points = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => {
      const x = i * 5;
      const y = 25 + Math.sin((x + offset) * 0.2) * amplitude;
      return `${x},${y}`;
    }).join(' ');
  }, [offset, amplitude]);

  return (
    <svg viewBox="0 0 200 50" className="w-full h-12">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

const EquipmentIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'ECG Leads':
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12">
          <circle cx="32" cy="32" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M10 32 L22 32 M42 32 L54 32 M32 10 L32 22 M32 42 L32 54" stroke="currentColor" strokeWidth="2" />
          <circle cx="32" cy="32" r="3" fill="currentColor" />
        </svg>
      );
    case 'BP Cuff':
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12">
          <rect x="12" y="20" width="40" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M52 32 L60 32" stroke="currentColor" strokeWidth="2" />
          <rect x="20" y="25" width="24" height="14" fill="currentColor" opacity="0.2" />
        </svg>
      );
    case 'Pulse Oximeter':
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12">
          <rect x="20" y="15" width="24" height="34" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="24" y="19" width="16" height="10" fill="red" opacity="0.5" />
          <path d="M32 49 L32 60" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'Temperature Probe':
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12">
          <path d="M32 10 L32 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="32" cy="54" r="4" fill="currentColor" />
        </svg>
      );
    case 'Capnography':
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12">
          <circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M32 20 L32 10 M20 32 L10 32" stroke="currentColor" strokeWidth="2" />
          <path d="M32 32 L45 45" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    default: return null;
  }
};

// --- Main Simulator ---

function ORSimulator() {
  const [phase, setPhase] = useState<Phase>('PREPARATION');
  const [attached, setAttached] = useState<string[]>([]);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [logs, setLogs] = useState<{ msg: string; type: 'success' | 'error' | 'info' }[]>([]);
  const [patientStatus, setPatientStatus] = useState({ isAsleep: false, isIntubated: false });
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [drugDose, setDrugDose] = useState("");
  const [airwaySequence, setAirwaySequence] = useState<string[]>([]);
  
  const patientWeight = 80;

  const [vitals, setVitals] = useState({
    hr: 75, spo2: 98, bpSys: 120, bpDia: 80, bpMap: 93, rr: 14, temp: 36.5,
    etco2: 0, fio2: 21, mac: 0.0, tv: 0, peep: 0
  });

  const addLog = (msg: string, type: 'success' | 'error' | 'info' = 'info') => {
    setLogs(prev => [{ msg, type }, ...prev].slice(0, 5));
  };

  const handleToolSelection = (tool: string) => {
    setActiveTool(tool);
    addLog(`Tool selected: ${tool}. Click on the patient to attach.`, 'info');
  };

  const handlePatientInteraction = (zone: string) => {
    if (!activeTool) return;

    const correctMap: Record<string, string> = {
      'ECG Leads': 'chest',
      'BP Cuff': 'arm',
      'Pulse Oximeter': 'finger',
      'Temperature Probe': 'head',
      'Capnography': 'head'
    };

    if (correctMap[activeTool] === zone) {
      if (!attached.includes(activeTool)) {
        setAttached(prev => [...prev, activeTool]);
        addLog(`✅ ${activeTool} correctly attached.`, 'success');
      }
    } else {
      addLog(`❌ Incorrect placement for ${activeTool}.`, 'error');
    }
    setActiveTool(null);
  };

  const handleDrugAdmin = () => {
    if (!selectedDrug) return;
    const dose = parseFloat(drugDose);
    const target = selectedDrug.dosePerKg * patientWeight;

    if (Math.abs(dose - target) <= target * 0.1) {
      addLog(`✅ Administered ${dose}mg of ${selectedDrug.name}.`, 'success');
      if (selectedDrug.id === 'propofol') {
        setPatientStatus(p => ({ ...p, isAsleep: true }));
        setVitals(v => ({ ...v, rr: 0, hr: 65, bpSys: 100, bpDia: 60 }));
        addLog("Patient is now unconscious. Onset of apnea.", 'info');
      }
      setSelectedDrug(null);
      setDrugDose("");
    } else {
      addLog(`❌ Calculation Error. Target was ${target.toFixed(1)}mg.`, 'error');
    }
  };

  const handleAirwayStep = (stepId: string) => {
    const last = airwaySequence[airwaySequence.length - 1];
    
    // Logic: Handle -> Blade -> ETT
    if (stepId.includes('mac') || stepId.includes('miller')) {
      if (!airwaySequence.includes('handle')) {
        addLog("❌ You need the laryngoscope handle first.", "error"); return;
      }
    }
    if (stepId.includes('ett')) {
      if (!airwaySequence.some(s => s.includes('mac') || s.includes('miller'))) {
        addLog("❌ Perform laryngoscopy before intubation.", "error"); return;
      }
    }

    setAirwaySequence(prev => [...prev, stepId]);
    addLog(`Action: ${stepId} performed.`, 'info');

    if (stepId.includes('ett')) {
      setPatientStatus(p => ({ ...p, isIntubated: true }));
      setVitals(v => ({ ...v, etco2: 38, fio2: 100, tv: 480, mac: 1.0, rr: 12 }));
      setPhase('MAINTENANCE');
      addLog("✅ Intubation successful. EtCO2 confirmed.", "success");
    }
  };

  const monitorReady = attached.includes('ECG Leads') && attached.includes('BP Cuff') && attached.includes('Pulse Oximeter');

  return (
    <div className="flex flex-col h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans">
      {/* Header */}
      <header className="h-16 bg-[#1e293b] border-b border-slate-700 flex items-center justify-between px-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 p-2 rounded-lg shadow-lg shadow-blue-500/20">
            <Stethoscope className="text-white" size={24} />
          </div>
          <div>
            <h1 className="font-black text-lg tracking-tight">VIRTUAL OR SIMULATOR</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Clinical Training Module</p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-500 uppercase">Phase</span>
            <span className="text-blue-400 font-bold text-sm">{phase}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-500 uppercase">Patient</span>
            <span className="text-slate-200 font-bold text-sm">Adult Male (80kg)</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex p-4 gap-4 overflow-hidden">
        
        {/* Left: Interactive Room */}
        <div className="flex-[3] relative bg-[#1e293b] rounded-3xl border border-slate-700 shadow-inner overflow-hidden">
          {/* OR Background Graphics */}
          <div className="absolute top-10 left-10 w-48 h-72 bg-slate-800 rounded-lg border border-slate-700 p-2">
            <div className="h-24 bg-black rounded p-1 flex flex-col gap-1">
              <div className="h-1 bg-green-500 w-1/2 rounded" />
              <div className="h-1 bg-blue-500 w-2/3 rounded" />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="h-4 bg-slate-700 rounded" />
              <div className="h-4 bg-slate-700 rounded" />
              <div className="flex-1 flex items-end gap-2 mt-10">
                <div className="w-2 h-16 bg-blue-600 rounded-t" />
                <div className="w-2 h-12 bg-green-600 rounded-t" />
              </div>
            </div>
          </div>

          {/* Patient SVG */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg viewBox="0 0 800 400" className="w-[90%] h-[90%] drop-shadow-2xl">
              <rect x="100" y="280" width="600" height="20" fill="#475569" rx="4" />
              <rect x="380" y="300" width="40" height="100" fill="#334155" />
              
              {/* Patient Body */}
              <g transform="translate(150, 150)">
                <rect x="20" y="100" width="80" height="25" rx="10" fill="#f8fafc" /> {/* Pillow */}
                <ellipse cx="60" cy="75" rx="35" ry="45" fill="#fde68a" /> {/* Head */}
                <path d="M25 70 Q60 20 95 70" fill="#0891b2" /> {/* Cap */}
                
                {/* Eyes */}
                {patientStatus.isAsleep ? (
                  <path d="M45 75 Q52 75 60 75 M70 75 Q77 75 85 75" stroke="#475569" strokeWidth="2" fill="none" />
                ) : (
                  <>
                    <circle cx="52" cy="75" r="2" fill="#1e293b" />
                    <circle cx="77" cy="75" r="2" fill="#1e293b" />
                  </>
                )}

                {/* Body & Drapes */}
                <path d="M95 120 L500 120 L500 220 L95 220 Z" fill="#0e7490" />
                <path d="M95 120 Q300 110 500 120" stroke="#155e75" strokeWidth="2" fill="none" />

                {/* Visible Equipment */}
                {attached.includes('ECG Leads') && (
                  <g transform="translate(130, 140)">
                    <circle cx="10" cy="10" r="5" fill="white" stroke="gray" />
                    <circle cx="40" cy="30" r="5" fill="white" stroke="gray" />
                    <path d="M10 10 L-50 -50" stroke="#ef4444" strokeWidth="1" />
                    <path d="M40 30 L-50 -50" stroke="#22c55e" strokeWidth="1" />
                  </g>
                )}
                {attached.includes('BP Cuff') && <rect x="220" y="120" width="60" height="40" fill="#334155" rx="4" />}
                {attached.includes('Pulse Oximeter') && <rect x="490" y="160" width="12" height="8" fill="#ef4444" rx="2" className="animate-pulse" />}
              </g>
            </svg>
          </div>

          {/* Interaction Zones (Hitboxes) */}
          <button onClick={() => handlePatientInteraction('head')} className="absolute top-[35%] left-[20%] w-24 h-24 rounded-full hover:bg-white/5 transition-all cursor-crosshair" title="Head Area" />
          <button onClick={() => handlePatientInteraction('chest')} className="absolute top-[45%] left-[32%] w-32 h-32 rounded-xl hover:bg-white/5 transition-all cursor-crosshair" title="Chest Area" />
          <button onClick={() => handlePatientInteraction('arm')} className="absolute top-[55%] left-[45%] w-40 h-20 rounded-xl hover:bg-white/5 transition-all cursor-crosshair" title="Right Arm" />
          <button onClick={() => handlePatientInteraction('finger')} className="absolute top-[68%] left-[75%] w-12 h-12 rounded-full hover:bg-white/5 transition-all cursor-crosshair" title="Finger" />

          {/* Logs Overlay */}
          <div className="absolute bottom-6 left-6 w-80 space-y-2 pointer-events-none">
            {logs.map((log, i) => (
              <div key={i} className={`p-2 rounded-lg text-xs border flex items-center gap-2 backdrop-blur-md animate-in slide-in-from-left duration-300 ${
                log.type === 'success' ? 'bg-emerald-900/40 border-emerald-500/50 text-emerald-200' :
                log.type === 'error' ? 'bg-red-900/40 border-red-500/50 text-red-200' : 'bg-slate-900/80 border-slate-700 text-slate-300'
              }`}>
                {log.type === 'success' ? <CheckCircle2 size={14}/> : <AlertCircle size={14}/>}
                {log.msg}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Controls & Monitor */}
        <div className="flex-[2] flex flex-col gap-4 overflow-y-auto">
          
          {/* Patient Monitor */}
          <div className="h-80 bg-black rounded-3xl border-4 border-slate-800 p-5 font-mono shadow-2xl relative overflow-hidden">
            {!monitorReady ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-700">
                <Zap size={48} className="animate-pulse mb-2" />
                <p className="text-xs font-bold tracking-widest uppercase">System Standby: Connect Monitors</p>
              </div>
            ) : (
              <div className="grid grid-cols-12 h-full gap-4">
                <div className="col-span-8 space-y-4">
                  <div className="text-emerald-400">
                    <div className="flex justify-between items-center text-xs"><span>ECG II</span><span className="text-xl font-bold">{vitals.hr}</span></div>
                    <MonitorWaveform color="#10b981" speed={15} amplitude={12} />
                  </div>
                  <div className="text-blue-400">
                    <div className="flex justify-between items-center text-xs"><span>SpO2 %</span><span className="text-xl font-bold">{vitals.spo2}</span></div>
                    <MonitorWaveform color="#3b82f6" speed={10} amplitude={8} />
                  </div>
                  <div className="text-yellow-500">
                    <div className="flex justify-between items-center text-xs"><span>EtCO2</span><span className="text-xl font-bold">{vitals.etco2}</span></div>
                    <MonitorWaveform color="#eab308" speed={5} amplitude={10} />
                  </div>
                </div>
                <div className="col-span-4 bg-slate-900/50 rounded-xl p-3 flex flex-col justify-between border border-slate-800">
                  <div className="text-red-500">
                    <p className="text-[10px]">NIBP</p>
                    <p className="text-2xl font-black">{vitals.bpSys}/{vitals.bpDia}</p>
                    <p className="text-xs">MAP: {vitals.bpMap}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div><p className="text-slate-500">RR</p><p className="text-white text-sm">{vitals.rr}</p></div>
                    <div><p className="text-slate-500">TEMP</p><p className="text-orange-400 text-sm">{vitals.temp}</p></div>
                    <div><p className="text-slate-500">FiO2</p><p className="text-blue-300 text-sm">{vitals.fio2}%</p></div>
                    <div><p className="text-slate-500">MAC</p><p className="text-purple-400 text-sm">{vitals.mac}</p></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interaction Cards */}
          <div className="flex-1 bg-[#1e293b] rounded-3xl border border-slate-700 p-5 flex flex-col shadow-xl">
            <nav className="flex gap-1 bg-slate-950 p-1 rounded-xl mb-6">
              {['PREPARATION', 'INDUCTION', 'INTUBATION'].map(p => (
                <button key={p} className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${phase === p ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
                  {p}
                </button>
              ))}
            </nav>

            <div className="flex-1 overflow-y-auto pr-2">
              {phase === 'PREPARATION' && (
                <div className="grid grid-cols-2 gap-4">
                  {['ECG Leads', 'BP Cuff', 'Pulse Oximeter', 'Temperature Probe', 'Capnography'].map(tool => (
                    <button key={tool} onClick={() => handleToolSelection(tool)} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                      attached.includes(tool) ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 
                      activeTool === tool ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-slate-800 border-slate-700 hover:border-slate-500'
                    }`}>
                      <EquipmentIcon type={tool} />
                      <span className="text-[10px] font-bold uppercase">{tool}</span>
                    </button>
                  ))}
                  {monitorReady && (
                    <button onClick={() => setPhase('INDUCTION')} className="col-span-2 bg-blue-600 hover:bg-blue-500 p-4 rounded-2xl font-black text-sm uppercase tracking-widest mt-4 flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20">
                      START INDUCTION <ArrowRight size={20} />
                    </button>
                  )}
                </div>
              )}

              {phase === 'INDUCTION' && (
                <div className="space-y-4">
                  {!selectedDrug ? (
                    <div className="grid grid-cols-2 gap-2">
                      {DRUGS.map(d => (
                        <button key={d.id} onClick={() => setSelectedDrug(d)} className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-left hover:border-blue-500 transition-all group">
                          <div className="w-8 h-1 mb-2 rounded-full" style={{ background: d.color }} />
                          <p className="text-xs font-bold group-hover:text-blue-400">{d.name}</p>
                          <p className="text-[10px] text-slate-500">{d.concentration} mg/ml</p>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-950 p-6 rounded-2xl border border-blue-500/50 animate-in zoom-in-95">
                      <div className="flex justify-between mb-4">
                        <h3 className="font-black text-blue-400 uppercase tracking-tight">{selectedDrug.name}</h3>
                        <button onClick={() => setSelectedDrug(null)}><XCircle className="text-slate-500" /></button>
                      </div>
                      <div className="text-[10px] text-slate-500 mb-4 bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <p>PATIENT WEIGHT: {patientWeight}kg</p>
                        <p>RECOMMENDED DOSE: {selectedDrug.dosePerKg} mg/kg</p>
                      </div>
                      <label className="text-[10px] text-slate-500 uppercase font-bold mb-2 block">Enter Dose (mg)</label>
                      <input 
                        type="number" value={drugDose} onChange={(e) => setDrugDose(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl text-xl font-bold mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="0.0"
                      />
                      <button onClick={handleDrugAdmin} className="w-full bg-blue-600 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-500 shadow-xl shadow-blue-600/20">
                        INJECT BOLUS
                      </button>
                    </div>
                  )}
                  {patientStatus.isAsleep && !selectedDrug && (
                    <button onClick={() => setPhase('INTUBATION')} className="w-full bg-orange-600 hover:bg-orange-500 p-4 rounded-2xl font-black text-sm uppercase mt-4 flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20">
                      SECURE AIRWAY <Wind size={20} />
                    </button>
                  )}
                </div>
              )}

              {phase === 'INTUBATION' && (
                <div className="grid grid-cols-2 gap-2">
                  {AIRWAY_ITEMS.map(item => (
                    <button key={item.id} onClick={() => handleAirwayStep(item.id)} className={`p-3 rounded-xl border text-[10px] font-black uppercase transition-all ${
                      airwaySequence.includes(item.id) ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-800 border-slate-700 hover:border-slate-500'
                    }`}>
                      {item.label}
                    </button>
                  ))}
                </div>
              )}

              {phase === 'MAINTENANCE' && (
                <div className="text-center p-8 space-y-6">
                  <div className="bg-emerald-500/20 p-6 rounded-full inline-block animate-bounce">
                    <CheckCircle2 size={48} className="text-emerald-500" />
                  </div>
                  <h2 className="text-xl font-black tracking-tight uppercase">Case Stabilized</h2>
                  <p className="text-sm text-slate-400">The patient is secured and vitals are stable. You have successfully completed the induction sequence.</p>
                  <button onClick={() => window.location.reload()} className="bg-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-600 transition-all">
                    RESTART SIMULATION
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Info Bar */}
      <footer className="h-10 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        <div className="flex gap-6">
          <span className="flex items-center gap-1"><Droplet size={12} className="text-blue-500"/> IV Access: 18G Left Hand</span>
          <span className="flex items-center gap-1"><Wind size={12} className="text-emerald-500"/> Gas: O2 100% 6L/m</span>
        </div>
        <div>
          SIMULATION_TIME: <span className="text-slate-300 font-mono">00:14:22</span>
        </div>
      </footer>
    </div>
  );
}