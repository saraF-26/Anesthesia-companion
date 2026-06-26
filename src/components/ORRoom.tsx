import { useMemo, useState } from "react";

type MonitorId = "ecg" | "spo2" | "bp" | "temp";
type Phase = "monitoring" | "drugs" | "done";

const patient = {
  name: "Sara M.",
  age: "27 years",
  sex: "Female",
  weight: 65,
  surgery: "Elective laparoscopic cholecystectomy",
};

const monitorItems: { id: MonitorId; label: string; target: string }[] = [
  { id: "ecg", label: "ECG leads", target: "Chest" },
  { id: "spo2", label: "Pulse ox", target: "Finger" },
  { id: "bp", label: "BP cuff", target: "Arm" },
  { id: "temp", label: "Temp probe", target: "Skin" },
];

const drugSteps = [
  { name: "Propofol", doseMgPerKg: 2, answer: 130, unit: "mg", note: "Induction hypnotic" },
  { name: "Fentanyl", doseMcgPerKg: 1, answer: 65, unit: "mcg", note: "Opioid analgesic" },
  { name: "Rocuronium", doseMgPerKg: 0.6, answer: 39, unit: "mg", note: "Neuromuscular blocker" },
];

export default function ORRoom() {
  const [phase, setPhase] = useState<Phase>("monitoring");
  const [connected, setConnected] = useState<MonitorId[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drugIndex, setDrugIndex] = useState(0);
  const [dose, setDose] = useState("");
  const [feedback, setFeedback] = useState("Connect the monitors by tapping the devices in the OR.");
  const [score, setScore] = useState(0);

  const allMonitorsConnected = monitorItems.every((m) => connected.includes(m.id));
  const currentDrug = drugSteps[drugIndex];

  const vitals = useMemo(() => {
    return {
      hr: connected.includes("ecg") ? "82" : "--",
      spo2: connected.includes("spo2") ? "99%" : "--",
      bp: connected.includes("bp") ? "118/72" : "--/--",
      temp: connected.includes("temp") ? "36.8" : "--",
      etco2: phase === "done" ? "36" : "--",
    };
  }, [connected, phase]);

  function connectMonitor(id: MonitorId) {
    if (connected.includes(id)) return;

    setConnected((prev) => [...prev, id]);
    setScore((s) => s + 10);

    const item = monitorItems.find((m) => m.id === id);
    setFeedback(`✅ ${item?.label} connected to the ${item?.target}.`);

    if (connected.length + 1 === monitorItems.length) {
      setFeedback("✅ All basic monitors connected. Open the drug drawer to start induction.");
      setPhase("drugs");
    }
  }

  function chooseDrug(name: string) {
    if (phase !== "drugs") {
      setFeedback("❌ Connect all monitors before giving induction drugs.");
      return;
    }

    if (name !== currentDrug.name) {
      setFeedback(`❌ Not yet. The next correct drug is ${currentDrug.name}.`);
      return;
    }

    setFeedback(`Correct. Calculate the dose for ${currentDrug.name} using weight ${patient.weight} kg.`);
  }

  function submitDose() {
    const numericDose = Number(dose);

    if (!numericDose) {
      setFeedback("Enter a number first.");
      return;
    }

    if (Math.abs(numericDose - currentDrug.answer) <= 2) {
      setScore((s) => s + 15);

      if (drugIndex < drugSteps.length - 1) {
        setFeedback(`✅ Correct dose for ${currentDrug.name}. Move to the next drug.`);
        setDrugIndex((i) => i + 1);
        setDose("");
      } else {
        setFeedback("🎉 Induction drugs completed safely. Great work!");
        setPhase("done");
        setDrawerOpen(false);
      }
    } else {
      setFeedback(`❌ Incorrect dose. Recalculate from patient weight: ${patient.weight} kg.`);
    }
  }

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-slate-800 bg-[#06101d] text-white shadow-2xl">
      <div className="grid grid-cols-12 gap-0 min-h-[760px]">

        {/* LEFT PANEL */}
        <aside className="col-span-12 lg:col-span-2 bg-[#071525] border-r border-cyan-900/50 p-4 space-y-4">
          <div className="rounded-2xl border border-cyan-800 bg-cyan-950/30 p-4">
            <h3 className="font-black text-cyan-200 mb-3">Patient Info</h3>
            <p>Name: {patient.name}</p>
            <p>Age: {patient.age}</p>
            <p>Sex: {patient.sex}</p>
            <p>Weight: {patient.weight} kg</p>
            <p className="mt-2 text-sm text-slate-300">{patient.surgery}</p>
          </div>

          <div className="rounded-2xl border border-yellow-700 bg-yellow-950/20 p-4">
            <h3 className="font-black text-yellow-200">⭐ Score</h3>
            <p className="text-3xl font-black mt-2">{score}%</p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4">
            <h3 className="font-black mb-2">Progress</h3>
            <p className="text-sm text-slate-300">
              {connected.length} / {monitorItems.length} monitors connected
            </p>
          </div>
        </aside>

        {/* CENTER OR */}
        <section className="relative col-span-12 lg:col-span-7 min-h-[760px] overflow-hidden bg-gradient-to-b from-[#b7cce0] via-[#8fb0c8] to-[#6f8798]">

          {/* wall tiles */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(#fff 2px, transparent 2px), linear-gradient(90deg,#fff 2px, transparent 2px)",
              backgroundSize: "90px 90px",
            }}
          />

          {/* surgical light */}
          <div className="absolute left-1/2 top-8 -translate-x-1/2 z-10">
            <div className="mx-auto h-20 w-5 bg-slate-500 rounded-full" />
            <div className="w-72 h-24 rounded-[50%] bg-slate-300 border-4 border-slate-500 shadow-2xl flex items-center justify-center">
              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-7 w-9 rounded-full bg-yellow-100 shadow-[0_0_20px_rgba(254,240,138,.9)]" />
                ))}
              </div>
            </div>
          </div>

          {/* monitor screen */}
          <div className="absolute left-6 top-10 z-20 w-[310px] rounded-3xl border-4 border-slate-500 bg-black p-5 shadow-2xl">
            <h3 className="mb-3 font-black text-slate-200">Patient Monitor</h3>
            <div className="mb-4 h-16 rounded-xl bg-black border border-green-700 overflow-hidden">
              <div className={connected.includes("ecg") ? "h-full bg-[repeating-linear-gradient(90deg,#22c55e_0_8px,transparent_8px_18px)] animate-pulse" : "h-full bg-slate-950"} />
            </div>
            <div className="grid grid-cols-2 gap-3 font-mono text-lg">
              <span className="text-green-400">HR {vitals.hr}</span>
              <span className="text-cyan-300">SpO₂ {vitals.spo2}</span>
              <span className="text-red-400">BP {vitals.bp}</span>
              <span className="text-yellow-300">Temp {vitals.temp}</span>
            </div>
          </div>

          {/* anesthesia machine */}
          <button
            onClick={() => setFeedback("Machine locked for now. Finish induction drugs first.")}
            className="absolute right-6 top-32 z-20 w-[250px] rounded-3xl border border-violet-500 bg-slate-950/90 p-4 text-left shadow-2xl hover:scale-[1.02] transition"
          >
            <h3 className="font-black mb-3">Anesthesia Machine</h3>
            <div className="grid grid-cols-2 gap-2 text-cyan-300 font-mono">
              <span>FiO₂ 50%</span>
              <span>Sevo --</span>
              <span>VT 480</span>
              <span>RR 12</span>
              <span>PEEP 5</span>
              <span>EtCO₂ {vitals.etco2}</span>
            </div>
          </button>

          {/* patient bed */}
          <div className="absolute left-1/2 top-[52%] z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute left-1/2 top-[250px] -translate-x-1/2 w-[430px] h-[100px] rounded-[2rem] bg-slate-600 shadow-2xl" />

              {/* patient */}
              <div className="relative z-20 mx-auto w-[260px] h-[360px]">
                <div className="mx-auto h-24 w-24 rounded-full bg-[#f2c49f] shadow-lg" />
                <div className="mx-auto mt-3 h-52 w-44 rounded-[5rem] bg-gradient-to-b from-blue-200 to-blue-700 shadow-xl" />
                <div className="absolute left-2 top-36 h-36 w-12 -rotate-12 rounded-full bg-blue-100" />
                <div className="absolute right-2 top-36 h-36 w-12 rotate-12 rounded-full bg-blue-100" />

                {/* connected indicators */}
                {connected.includes("ecg") && (
                  <div className="absolute left-[105px] top-36 h-5 w-5 rounded-full bg-green-400 shadow-[0_0_15px_#22c55e]" />
                )}
                {connected.includes("spo2") && (
                  <div className="absolute left-4 top-[265px] h-5 w-5 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
                )}
                {connected.includes("bp") && (
                  <div className="absolute right-0 top-44 h-14 w-10 rounded-xl bg-slate-800 border border-cyan-300" />
                )}
                {connected.includes("temp") && (
                  <div className="absolute right-20 top-32 h-3 w-16 rounded-full bg-yellow-300 shadow-[0_0_12px_#fde047]" />
                )}
              </div>
            </div>
          </div>

          {/* clickable monitor devices */}
          {monitorItems.map((m, index) => {
            const positions = [
              "left-[70px] bottom-[170px]",
              "left-[230px] bottom-[80px]",
              "left-[70px] bottom-[300px]",
              "right-[330px] bottom-[120px]",
            ];

            return (
              <button
                key={m.id}
                onClick={() => connectMonitor(m.id)}
                className={`absolute ${positions[index]} z-30 rounded-2xl border px-4 py-3 shadow-xl transition hover:scale-105 ${
                  connected.includes(m.id)
                    ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                    : "border-cyan-400 bg-slate-950/90 text-white"
                }`}
              >
                {connected.includes(m.id) ? "✅ " : "👆 "}
                {m.label}
              </button>
            );
          })}

          {/* drug drawer */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="absolute right-10 bottom-8 z-30 rounded-2xl border border-blue-400 bg-slate-950/90 px-5 py-4 shadow-xl hover:scale-105 transition"
          >
            💉 Drug Drawer
          </button>

          {/* task card */}
          <div className="absolute left-6 bottom-6 z-30 w-[520px] rounded-3xl bg-slate-950/90 border border-cyan-900 p-5 shadow-2xl">
            <h3 className="font-black text-cyan-200 mb-2">Your Task</h3>
            <p className="text-slate-200">{feedback}</p>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <aside className="col-span-12 lg:col-span-3 bg-[#071525] border-l border-cyan-900/50 p-4">
          <div className="rounded-3xl border border-cyan-800 bg-slate-950/70 p-4">
            <h2 className="text-2xl font-black mb-2">Drug Drawer</h2>
            <p className="text-slate-400 mb-4">
              {phase === "drugs" ? "Select the correct induction drug." : "Locked until monitors are connected."}
            </p>

            <div className="space-y-3">
              {drugSteps.map((drug) => (
                <button
                  key={drug.name}
                  onClick={() => chooseDrug(drug.name)}
                  className={`w-full rounded-2xl border p-4 text-left transition hover:scale-[1.01] ${
                    drug.name === currentDrug.name && phase === "drugs"
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-slate-700 bg-slate-900"
                  }`}
                >
                  <b>{drug.name}</b>
                  <p className="text-sm text-slate-400">{drug.note}</p>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* dose modal */}
      {drawerOpen && phase === "drugs" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-[min(440px,92vw)] rounded-3xl border border-cyan-600 bg-slate-950 p-6 shadow-2xl">
            <button onClick={() => setDrawerOpen(false)} className="float-right text-2xl">×</button>
            <h2 className="text-2xl font-black mb-2">{currentDrug.name} Dose</h2>
            <p className="text-slate-400 mb-4">
              Patient weight: <b>{patient.weight} kg</b>
            </p>
            <p className="mb-3">
              Calculate dose in <b>{currentDrug.unit}</b>.
            </p>
            <input
              value={dose}
              onChange={(e) => setDose(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-4 text-white mb-4"
              placeholder={`Enter dose in ${currentDrug.unit}`}
              inputMode="numeric"
            />
            <button
              onClick={submitDose}
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-4 font-black text-slate-950"
            >
              Submit dose
            </button>
          </div>
        </div>
      )}
    </div>
  );
}