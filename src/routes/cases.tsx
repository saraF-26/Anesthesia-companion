import React, { useState, useEffect, useMemo } from 'react';

/**
 * ANESTHESIA SIMULATOR - ADVANCED CLINICAL MODULE
 * Features: High-fidelity SVG visuals, procedural logic, drug calculations, 
 * and interactive equipment placement.
 */

// --- Types & Interfaces ---
interface Vitals {
  hr: number;
  spo2: number;
  bp: { sys: number; dia: number };
  rr: number;
  etco2: number;
  temp: number;
}

type ToolType = 'ECG' | 'BP_CUFF' | 'PULSE_OX' | 'TEMP_PROBE' | 'LARYNGOSCOPE' | 'ETT' | 'MASK' | 'STIGMA' | 'SYRINGE_CUFF' | 'CIRCUIT' | 'SUCTION' | 'PROPOFOL' | 'ROCURONIUM' | 'FENTANYL' | null;

interface EquipmentState {
  ecgConnected: boolean;
  bpConnected: boolean;
  oximeterConnected: boolean;
  tempConnected: boolean;
  ivPlaced: boolean;
  maskApplied: boolean;
  intubated: boolean;
  cuffInflated: boolean;
  circuitConnected: boolean;
}

// --- Constants ---
const PATIENT_WEIGHT = 65; // kg

// --- Sub-Components (Visuals) ---

const MonitorDisplay = ({ vitals, active }: { vitals: Vitals; active: boolean }) => (
  <div className="bg-black border-4 border-gray-700 rounded-lg p-3 w-64 shadow-2xl font-mono relative overflow-hidden">
    <div className="flex justify-between items-start mb-2">
      <span className="text-green-500 text-xs font-bold uppercase tracking-widest">HR</span>
      <span className="text-green-400 text-3xl">{active ? vitals.hr : '--'}</span>
    </div>
    <div className="h-8 border-b border-green-900 mb-2 relative">
      {active && (
        <svg viewBox="0 0 100 20" className="absolute inset-0 w-full h-full">
          <path d="M0 10 L10 10 L12 2 L15 18 L18 10 L30 10 L40 10 L42 2 L45 18 L48 10 L60 10 L70 10 L72 2 L75 18 L78 10 L100 10" 
                fill="none" stroke="#22c55e" strokeWidth="0.5" className="animate-pulse" />
        </svg>
      )}
    </div>
    <div className="flex justify-between items-start mb-2">
      <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">SpO₂</span>
      <span className="text-blue-300 text-3xl">{active ? vitals.spo2 : '--'}</span>
    </div>
    <div className="flex justify-between items-start mb-2">
      <span className="text-red-500 text-xs font-bold uppercase tracking-widest">BP</span>
      <span className="text-red-400 text-xl">{active ? `${vitals.bp.sys}/${vitals.bp.dia}` : '--/--'}</span>
    </div>
    <div className="flex justify-between items-start">
      <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest">EtCO₂</span>
      <span className="text-yellow-400 text-xl">{active && vitals.etco2 > 0 ? vitals.etco2 : '--'}</span>
    </div>
    {active && vitals.etco2 > 0 && (
       <div className="h-6 mt-1 border-t border-yellow-900">
          <svg viewBox="0 0 100 20" className="w-full h-full">
            <path d="M0 18 Q 5 18 10 5 L 25 5 Q 30 18 35 18 L 100 18" fill="none" stroke="#eab308" strokeWidth="1" />
          </svg>
       </div>
    )}
  </div>
);

const RealisticPatientSVG = ({ equipment }: { equipment: EquipmentState }) => (
  <svg viewBox="0 0 800 400" className="w-full h-full drop-shadow-2xl">
    <defs>
      <radialGradient id="skinGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f5d0b4" />
        <stop offset="100%" stopColor="#d2a688" />
      </radialGradient>
      <linearGradient id="drapeGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2d5a5e" />
        <stop offset="100%" stopColor="#1e3d40" />
      </linearGradient>
    </defs>
    
    {/* Operating Table */}
    <rect x="100" y="280" width="600" height="40" fill="#4a5568" rx="5" />
    <rect x="150" y="320" width="20" height="80" fill="#2d3748" />
    <rect x="530" y="320" width="20" height="80" fill="#2d3748" />

    {/* Body (Draped) */}
    <path d="M150 280 Q 400 240 650 280 L 650 310 L 150 310 Z" fill="url(#drapeGrad)" />
    
    {/* Head & Neck Area */}
    <ellipse cx="140" cy="250" rx="35" ry="45" fill="url(#skinGrad)" /> {/* Face */}
    <path d="M110 220 Q 140 200 170 220" fill="#4299e1" stroke="#2b6cb0" /> {/* Surgical Cap */}
    <rect x="110" y="295" width="60" height="15" rx="5" fill="#e2e8f0" /> {/* Pillow */}

    {/* Equipment Visual Overlay */}
    {equipment.ecgConnected && (
      <g>
        <circle cx="145" cy="265" r="3" fill="white" stroke="gray" strokeWidth="0.5" />
        <path d="M145 265 L 80 200" stroke="white" strokeWidth="0.5" strokeDasharray="2" />
      </g>
    )}
    {equipment.oximeterConnected && (
      <rect x="580" y="270" width="10" height="5" fill="red" opacity="0.6" />
    )}
    {equipment.bpConnected && (
      <rect x="500" y="255" width="40" height="30" fill="#2d3748" rx="2" transform="rotate(-10 500 255)" />
    )}
    {equipment.maskApplied && !equipment.intubated && (
      <ellipse cx="140" cy="265" rx="15" ry="20" fill="rgba(255,255,255,0.4)" stroke="white" />
    )}
    {equipment.intubated && (
      <g>
        <rect x="135" y="255" width="6" height="40" fill="#cbd5e0" transform="rotate(20 135 255)" />
        <circle cx="155" cy="290" r="4" fill="#f56565" /> {/* Pilot balloon */}
      </g>
    )}
    {equipment.circuitConnected && (
      <path d="M140 270 Q 200 350 300 350" fill="none" stroke="#90cdf4" strokeWidth="8" strokeLinecap="round" />
    )}
  </svg>
);

// --- Main Component ---

export default function AnesthesiaModule() {
  const [equipment, setEquipment] = useState<EquipmentState>({
    ecgConnected: false,
    bpConnected: false,
    oximeterConnected: false,
    tempConnected: false,
    ivPlaced: false,
    maskApplied: false,
    intubated: false,
    cuffInflated: false,
    circuitConnected: false,
  });

  const [vitals, setVitals] = useState<Vitals>({
    hr: 82,
    spo2: 98,
    bp: { sys: 122, dia: 78 },
    rr: 14,
    etco2: 0,
    temp: 36.8
  });

  const [selectedTool, setSelectedTool] = useState<ToolType>(null);
  const [activePanel, setActivePanel] = useState<'NONE' | 'AIRWAY' | 'DRUGS'>('NONE');
  const [logs, setLogs] = useState<string[]>(["Patient arrived in OR. 65kg Adult Male."]);
  const [drugDose, setDrugDose] = useState("");
  const [simulationStep, setSimulationStep] = useState(0);

  const monitorActive = equipment.ecgConnected && equipment.oximeterConnected;

  // Simulation Logic
  useEffect(() => {
    if (monitorActive) {
      const interval = setInterval(() => {
        setVitals(prev => ({
          ...prev,
          hr: prev.hr + (Math.random() > 0.5 ? 1 : -1),
          spo2: equipment.intubated ? 100 : (equipment.maskApplied ? 99 : 97),
          etco2: equipment.circuitConnected ? 38 : 0
        }));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [monitorActive, equipment.intubated, equipment.maskApplied, equipment.circuitConnected]);

  const addLog = (msg: string) => setLogs(prev => [msg, ...prev].slice(0, 5));

  const handlePatientClick = (area: string) => {
    if (!selectedTool) return;

    if (selectedTool === 'ECG' && area === 'chest') {
      setEquipment(e => ({ ...e, ecgConnected: true }));
      addLog("ECG leads placed.");
    } else if (selectedTool === 'BP_CUFF' && area === 'arm') {
      setEquipment(e => ({ ...e, bpConnected: true }));
      addLog("NIBP cuff attached.");
    } else if (selectedTool === 'PULSE_OX' && area === 'finger') {
      setEquipment(e => ({ ...e, oximeterConnected: true }));
      addLog("Pulse oximeter attached.");
    } else if (selectedTool === 'MASK' && area === 'face') {
      setEquipment(e => ({ ...e, maskApplied: true }));
      addLog("Pre-oxygenation started via mask.");
    } else if (selectedTool === 'LARYNGOSCOPE' && area === 'face') {
      if (!equipment.maskApplied) {
        addLog("Error: Must pre-oxygenate and remove mask first.");
      } else {
        setEquipment(e => ({ ...e, maskApplied: false }));
        addLog("Laryngoscopy performed. Grade I view.");
      }
    } else if (selectedTool === 'ETT' && area === 'face') {
      setEquipment(e => ({ ...e, intubated: true }));
      addLog("ETT passed through vocal cords.");
    } else if (selectedTool === 'CIRCUIT' && area === 'face') {
      if (equipment.intubated) {
        setEquipment(e => ({ ...e, circuitConnected: true }));
        addLog("Breathing circuit connected. Capnography active.");
      } else {
        addLog("Error: Connect circuit to ETT or Mask.");
      }
    }
    setSelectedTool(null);
  };

  const administerDrug = (name: string, dose: number, concentration: number) => {
    const requiredDose = parseFloat(drugDose);
    if (isNaN(requiredDose)) {
      alert("Enter a numeric dose.");
      return;
    }
    addLog(`Administered ${name}: ${requiredDose}mg (${(requiredDose/concentration).toFixed(1)}ml)`);
    setDrugDose("");
    setActivePanel('NONE');
    
    if (name === 'Propofol') {
        setTimeout(() => {
            setVitals(v => ({...v, hr: v.hr - 10, bp: {sys: v.bp.sys - 15, dia: v.bp.dia - 10}}));
            addLog("Patient is unconscious. Apnea noted.");
        }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans">
      
      {/* Top Header / Status */}
      <div className="h-14 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6 shadow-md">
        <h1 className="text-xl font-bold tracking-tight text-blue-400">OR-SIM: ADVANCED ANESTHESIA</h1>
        <div className="flex gap-4 items-center">
          <div className="bg-slate-900 px-3 py-1 rounded border border-slate-600">
            <span className="text-xs text-slate-400 mr-2">PATIENT:</span>
            <span className="font-mono text-sm">65kg Adult Male</span>
          </div>
          <div className="text-sm font-bold text-red-400 animate-pulse">LIVE SIMULATION</div>
        </div>
      </div>

      <div className="flex-1 flex relative">
        
        {/* Left Interaction: Equipment Station */}
        <div className="w-80 bg-slate-800/50 p-4 border-r border-slate-700 flex flex-col gap-4 overflow-y-auto">
          
          <section>
            <h3 className="text-xs font-bold text-slate-400 mb-2 uppercase">Mayo Stand (Monitoring)</h3>
            <div className="grid grid-cols-2 gap-2">
              <EquipmentButton 
                label="ECG Leads" 
                active={equipment.ecgConnected} 
                selected={selectedTool === 'ECG'}
                onClick={() => setSelectedTool('ECG')} 
              />
              <EquipmentButton 
                label="NIBP Cuff" 
                active={equipment.bpConnected} 
                selected={selectedTool === 'BP_CUFF'}
                onClick={() => setSelectedTool('BP_CUFF')} 
              />
              <EquipmentButton 
                label="Pulse Ox" 
                active={equipment.oximeterConnected} 
                selected={selectedTool === 'PULSE_OX'}
                onClick={() => setSelectedTool('PULSE_OX')} 
              />
              <EquipmentButton 
                label="Temp Probe" 
                active={equipment.tempConnected} 
                selected={selectedTool === 'TEMP_PROBE'}
                onClick={() => setSelectedTool('TEMP_PROBE')} 
              />
            </div>
          </section>

          <section className="mt-4">
            <h3 className="text-xs font-bold text-slate-400 mb-2 uppercase">Equipment Carts</h3>
            <button 
                onClick={() => setActivePanel('AIRWAY')}
                className="w-full mb-2 bg-blue-600 hover:bg-blue-500 p-3 rounded-lg flex items-center justify-between transition-colors shadow-lg group">
                <span className="font-bold">Airway Cart</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button 
                onClick={() => setActivePanel('DRUGS')}
                className="w-full bg-emerald-600 hover:bg-emerald-500 p-3 rounded-lg flex items-center justify-between transition-colors shadow-lg group">
                <span className="font-bold">Drug Drawer</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </section>

          {/* Logs */}
          <div className="mt-auto pt-4 border-t border-slate-700">
            <h3 className="text-[10px] font-bold text-slate-500 mb-2 uppercase">Clinical Log</h3>
            <div className="bg-black/40 p-2 rounded text-xs font-mono h-32 overflow-y-auto">
                {logs.map((log, i) => (
                    <div key={i} className="mb-1 text-slate-300 border-l-2 border-blue-500 pl-2">
                        {log}
                    </div>
                ))}
            </div>
          </div>
        </div>

        {/* Center: Main OR View */}
        <div className="flex-1 bg-slate-950 relative flex items-center justify-center p-8">
            
            {/* Background OR Elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-10 left-20 w-32 h-32 bg-white rounded-full blur-3xl" />
                <div className="absolute top-40 right-20 w-48 h-48 bg-blue-500 rounded-full blur-3xl" />
                {/* Wall outlets */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 pl-4">
                    <div className="w-8 h-8 rounded-full bg-green-600 border-2 border-slate-400 shadow-inner" />
                    <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-slate-400 shadow-inner" />
                    <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-slate-400 shadow-inner" />
                </div>
            </div>

            {/* Surgical Light (Above Patient) */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-8 bg-slate-800 rounded-full border-4 border-slate-600 shadow-[0_0_100px_rgba(255,255,255,0.2)] flex justify-around items-center px-4">
                <div className="w-6 h-6 bg-yellow-100 rounded-full blur-[2px]" />
                <div className="w-6 h-6 bg-yellow-100 rounded-full blur-[2px]" />
                <div className="w-6 h-6 bg-yellow-100 rounded-full blur-[2px]" />
            </div>

            {/* Patient Interaction Layer */}
            <div className="relative w-full max-w-4xl aspect-[2/1] group">
                <RealisticPatientSVG equipment={equipment} />
                
                {/* Clickable Zones */}
                <button 
                  onClick={() => handlePatientClick('face')}
                  className="absolute left-[12%] top-[55%] w-24 h-24 rounded-full hover:bg-white/10 border-2 border-transparent hover:border-blue-400 transition-all cursor-crosshair group-active:scale-95"
                  title="Face/Airway"
                />
                <button 
                  onClick={() => handlePatientClick('chest')}
                  className="absolute left-[20%] top-[65%] w-32 h-20 rounded-lg hover:bg-white/10 border-2 border-transparent hover:border-blue-400 transition-all cursor-crosshair"
                  title="Chest"
                />
                <button 
                  onClick={() => handlePatientClick('arm')}
                  className="absolute left-[50%] top-[65%] w-40 h-16 hover:bg-white/10 border-2 border-transparent hover:border-blue-400 transition-all cursor-crosshair"
                  title="Arm"
                />
                <button 
                  onClick={() => handlePatientClick('finger')}
                  className="absolute left-[65%] top-[68%] w-12 h-12 rounded-full hover:bg-white/10 border-2 border-transparent hover:border-blue-400 transition-all cursor-crosshair"
                  title="Hand"
                />
            </div>

            {/* Floating Monitor (Realism) */}
            <div className="absolute top-20 right-20">
                <MonitorDisplay vitals={vitals} active={monitorActive} />
                <div className="mt-4 bg-slate-800 p-2 rounded text-[10px] text-slate-400 text-center uppercase tracking-tighter">
                   Anesthesia Workstation V2.4
                </div>
            </div>

            {/* Interaction State Hint */}
            {selectedTool && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-blue-600 px-6 py-3 rounded-full shadow-2xl animate-bounce flex items-center gap-3">
                    <span className="font-bold">PLACE {selectedTool.replace('_', ' ')} ON PATIENT</span>
                    <button onClick={() => setSelectedTool(null)} className="bg-black/20 rounded-full p-1 text-xs">ESC</button>
                </div>
            )}
        </div>
      </div>

      {/* Overlays / Zoom views */}
      {activePanel === 'AIRWAY' && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-10">
              <div className="bg-slate-800 w-full max-w-4xl rounded-2xl p-8 border border-slate-600 shadow-2xl relative">
                  <button onClick={() => setActivePanel('NONE')} className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl">×</button>
                  <h2 className="text-2xl font-bold mb-6 text-blue-400 flex items-center gap-2">
                      <div className="w-2 h-8 bg-blue-400" /> Airway Equipment Cart
                  </h2>
                  <div className="grid grid-cols-4 gap-6">
                      <ToolCard 
                        title="Face Mask" 
                        desc="Sized for adult male" 
                        icon={<MaskIcon />} 
                        onClick={() => { setSelectedTool('MASK'); setActivePanel('NONE'); }} 
                      />
                      <ToolCard 
                        title="Laryngoscope" 
                        desc="Mac 3 blade attached" 
                        icon={<LaryngoscopeIcon />} 
                        onClick={() => { setSelectedTool('LARYNGOSCOPE'); setActivePanel('NONE'); }} 
                      />
                      <ToolCard 
                        title="Endotracheal Tube" 
                        desc="7.5mm Cuffed" 
                        icon={<ETTIcon />} 
                        onClick={() => { setSelectedTool('ETT'); setActivePanel('NONE'); }} 
                      />
                      <ToolCard 
                        title="Circuit" 
                        desc="Anesthesia Circuit (Y-Piece)" 
                        icon={<CircuitIcon />} 
                        onClick={() => { setSelectedTool('CIRCUIT'); setActivePanel('NONE'); }} 
                      />
                  </div>
              </div>
          </div>
      )}

      {activePanel === 'DRUGS' && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-10">
              <div className="bg-slate-800 w-full max-w-2xl rounded-2xl p-8 border border-slate-600 shadow-2xl relative">
                  <button onClick={() => setActivePanel('NONE')} className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl">×</button>
                  <h2 className="text-2xl font-bold mb-2 text-emerald-400">Anesthesia Drug Drawer</h2>
                  <p className="text-slate-400 mb-6 text-sm italic">Note: Patient weight is {PATIENT_WEIGHT}kg. Calculate dose precisely.</p>
                  
                  <div className="space-y-4">
                      <DrugEntry 
                        name="Propofol" 
                        concentration="10mg/ml" 
                        suggested="2mg/kg"
                        value={drugDose}
                        onChange={setDrugDose}
                        onAdminister={() => administerDrug('Propofol', 130, 10)}
                      />
                      <DrugEntry 
                        name="Fentanyl" 
                        concentration="50mcg/ml" 
                        suggested="1-2mcg/kg"
                        value={drugDose}
                        onChange={setDrugDose}
                        onAdminister={() => administerDrug('Fentanyl', 100, 50)}
                      />
                      <DrugEntry 
                        name="Rocuronium" 
                        concentration="10mg/ml" 
                        suggested="0.6mg/kg"
                        value={drugDose}
                        onChange={setDrugDose}
                        onAdminister={() => administerDrug('Rocuronium', 40, 10)}
                      />
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}

// --- Internal UI Helpers ---

function EquipmentButton({ label, active, selected, onClick }: { label: string, active: boolean, selected: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`p-3 rounded border text-xs font-bold transition-all ${
        active 
        ? 'bg-green-900/40 border-green-500 text-green-400' 
        : selected 
          ? 'bg-blue-600 border-blue-400 text-white animate-pulse'
          : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
      }`}
    >
      {label}
      {active && <span className="block text-[8px] mt-1 text-green-300 opacity-70">CONNECTED</span>}
    </button>
  );
}

function ToolCard({ title, desc, icon, onClick }: { title: string, desc: string, icon: React.ReactNode, onClick: () => void }) {
  return (
    <button 
        onClick={onClick}
        className="bg-slate-700/50 p-4 rounded-xl border border-slate-600 hover:bg-slate-600 hover:border-blue-400 transition-all text-left flex flex-col items-center gap-4 group">
        <div className="w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-sm text-slate-100">{title}</h4>
            <p className="text-[10px] text-slate-400 mt-1">{desc}</p>
        </div>
    </button>
  );
}

function DrugEntry({ name, concentration, suggested, value, onChange, onAdminister }: any) {
  return (
    <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-lg border border-slate-700">
      <div>
        <div className="font-bold text-slate-100">{name}</div>
        <div className="text-[10px] text-slate-500 uppercase">{concentration} | Goal: {suggested}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end">
            <input 
                type="number" 
                placeholder="mg"
                className="bg-slate-800 border border-slate-600 rounded px-2 py-1 w-20 text-right text-emerald-400 focus:outline-none focus:border-emerald-500"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <span className="text-[8px] text-slate-500 mt-1 uppercase tracking-tighter">Enter Dose (mg)</span>
        </div>
        <button 
            onClick={onAdminister}
            className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded font-bold text-sm transition-colors shadow-lg active:scale-95">
            PUSH
        </button>
      </div>
    </div>
  );
}

// --- Icons (Detailed SVG) ---

const MaskIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full">
    <ellipse cx="32" cy="32" rx="20" ry="24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="3" />
    <circle cx="32" cy="20" r="4" fill="rgba(255,255,255,0.3)" />
  </svg>
);

const LaryngoscopeIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" transform="rotate(-45)">
    <rect x="28" y="30" width="8" height="30" fill="#a0aec0" rx="2" />
    <path d="M30 30 Q 30 10 60 10" fill="none" stroke="#cbd5e0" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

const ETTIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full">
    <path d="M10 50 Q 30 30 50 10" fill="none" stroke="#90cdf4" strokeWidth="4" />
    <circle cx="15" cy="55" r="4" fill="#f56565" />
    <path d="M15 55 L 20 40" stroke="#f56565" strokeWidth="1" />
  </svg>
);

const CircuitIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full">
    <path d="M10 32 L 30 32 M 30 32 L 50 12 M 30 32 L 50 52" fill="none" stroke="#4299e1" strokeWidth="6" strokeLinecap="round" />
    <rect x="5" y="24" width="8" height="16" fill="#2b6cb0" />
  </svg>
);