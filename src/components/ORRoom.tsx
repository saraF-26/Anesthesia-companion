import { useMemo, useState } from "react";

type MonitorId = "ecg" | "spo2" | "bp" | "temp";

const patient = {
  name: "Sara M.",
  age: "27 years",
  sex: "Female",
  weight: 65,
  surgery: "Elective laparoscopic cholecystectomy",
};

const monitors: { id: MonitorId; label: string; value: string }[] = [
  { id: "ecg", label: "ECG leads", value: "HR 82" },
  { id: "spo2", label: "Pulse Ox", value: "SpO₂ 99%" },
  { id: "bp", label: "BP Cuff", value: "118/72" },
  { id: "temp", label: "Temp Probe", value: "36.8°C" },
];

export default function ORRoom() {
  const [connected, setConnected] = useState<MonitorId[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [msg, setMsg] = useState("Tap the monitors around the patient to connect them.");
  const [score, setScore] = useState(0);

  const vitals = useMemo(() => {
    return {
      hr: connected.includes("ecg") ? "82" : "--",
      spo2: connected.includes("spo2") ? "99%" : "--",
      bp: connected.includes("bp") ? "118/72" : "--/--",
      temp: connected.includes("temp") ? "36.8" : "--",
      etco2: "--",
    };
  }, [connected]);

  function connectMonitor(id: MonitorId) {
    if (connected.includes(id)) return;

    setConnected([...connected, id]);
    setScore(score + 10);

    const item = monitors.find((m) => m.id === id);
    setMsg(`✅ ${item?.label} connected successfully.`);
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-[#06101d] text-white shadow-2xl">
      <div className="grid min-h-[760px] grid-cols-12">

        {/* LEFT INFO */}
        <aside className="col-span-12 border-b border-cyan-900/50 bg-[#071525] p-4 lg:col-span-2 lg:border-b-0 lg:border-r">
          <div className="rounded-2xl border border-cyan-800 bg-cyan-950/30 p-4">
            <h3 className="mb-3 font-black text-cyan-200">Patient Chart</h3>
            <p>Name: {patient.name}</p>
            <p>Age: {patient.age}</p>
            <p>Sex: {patient.sex}</p>
            <p>Weight: {patient.weight} kg</p>
            <p className="mt-3 text-sm text-slate-300">{patient.surgery}</p>
          </div>

          <div className="mt-4 rounded-2xl border border-yellow-700 bg-yellow-950/20 p-4">
            <h3 className="font-black text-yellow-200">Score</h3>
            <p className="mt-2 text-3xl font-black">{score}%</p>
          </div>
        </aside>

        {/* OR ROOM */}
        <div className="relative col-span-12 min-h-[760px] overflow-hidden bg-gradient-to-b from-[#d9e7f0] via-[#9fbdd1] to-[#6f8798] lg:col-span-7">

          {/* tiles */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(#fff 2px, transparent 2px), linear-gradient(90deg,#fff 2px, transparent 2px)",
              backgroundSize: "90px 90px",
            }}
          />

          {/* surgical light */}
          <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2">
            <div className="mx-auto h-20 w-5 rounded-full bg-slate-500" />
            <div className="flex h-24 w-72 items-center justify-center rounded-[50%] border-4 border-slate-500 bg-slate-300 shadow-2xl">
              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-7 w-9 rounded-full bg-yellow-100 shadow-[0_0_20px_rgba(254,240,138,.9)]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* patient monitor */}
          <div className="absolute left-5 top-8 z-20 w-[310px] rounded-3xl border-4 border-slate-500 bg-black p-5 shadow-2xl">
            <h3 className="mb-3 font-black text-slate-100">Patient Monitor</h3>

            <div className="mb-4 h-16 overflow-hidden rounded-xl border border-green-700 bg-black">
              <div
                className={
                  connected.includes("ecg")
                    ? "h-full animate-pulse bg-[repeating-linear-gradient(90deg,#22c55e_0_8px,transparent_8px_18px)]"
                    : "h-full bg-slate-950"
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-lg">
              <span className="text-green-400">HR {vitals.hr}</span>
              <span className="text-cyan-300">SpO₂ {vitals.spo2}</span>
              <span className="text-red-400">BP {vitals.bp}</span>
              <span className="text-yellow-300">T {vitals.temp}</span>
            </div>
          </div>

          {/* anesthesia machine */}
          <div className="absolute right-5 top-24 z-20 w-[270px] rounded-3xl border border-violet-500 bg-slate-950/90 p-4 shadow-2xl">
            <h3 className="mb-3 font-black">Anesthesia Machine</h3>
            <div className="grid grid-cols-2 gap-2 font-mono text-cyan-300">
              <span>FiO₂ 50%</span>
              <span>Sevo --</span>
              <span>MAC --</span>
              <span>VT 480</span>
              <span>RR 12</span>
              <span>PEEP 5</span>
            </div>
          </div>

          {/* bed + patient */}
          <div className="absolute left-1/2 top-[52%] z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute left-1/2 top-[260px] h-[110px] w-[460px] -translate-x-1/2 rounded-[2rem] bg-slate-600 shadow-2xl" />

              <div className="relative z-20 mx-auto h-[380px] w-[270px]">
                <div className="mx-auto h-24 w-24 rounded-full bg-[#f2c49f] shadow-lg" />
                <div className="mx-auto mt-3 h-56 w-44 rounded-[5rem] bg-gradient-to-b from-blue-200 to-blue-700 shadow-xl" />

                <div className="absolute left-2 top-36 h-36 w-12 -rotate-12 rounded-full bg-blue-100" />
                <div className="absolute right-2 top-36 h-36 w-12 rotate-12 rounded-full bg-blue-100" />

                {connected.includes("ecg") && (
                  <div className="absolute left-[112px] top-36 h-5 w-5 rounded-full bg-green-400 shadow-[0_0_15px_#22c55e]" />
                )}

                {connected.includes("spo2") && (
                  <div className="absolute left-4 top-[265px] h-5 w-5 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
                )}

                {connected.includes("bp") && (
                  <div className="absolute right-0 top-44 h-14 w-10 rounded-xl border border-cyan-300 bg-slate-800" />
                )}

                {connected.includes("temp") && (
                  <div className="absolute right-20 top-32 h-3 w-16 rounded-full bg-yellow-300 shadow-[0_0_12px_#fde047]" />
                )}
              </div>
            </div>
          </div>

          {/* clickable monitor tools */}
          {monitors.map((m, index) => {
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

          {/* drug tray */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="absolute right-10 bottom-8 z-30 rounded-2xl border border-blue-400 bg-slate-950/90 px-5 py-4 shadow-xl transition hover:scale-105"
          >
            💉 Drug Drawer
          </button>

          {/* airway cart */}
          <button
            onClick={() => setMsg("Airway cart locked for the next step.")}
            className="absolute left-10 bottom-8 z-30 rounded-2xl border border-emerald-400 bg-slate-950/90 px-5 py-4 shadow-xl transition hover:scale-105"
          >
            🫁 Airway Cart
          </button>

          {/* feedback */}
          <div className="absolute bottom-28 left-6 z-30 w-[520px] rounded-3xl border border-cyan-900 bg-slate-950/90 p-5 shadow-2xl">
            <h3 className="mb-2 font-black text-cyan-200">Your Task</h3>
            <p className="text-slate-200">{msg}</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <aside className="col-span-12 border-t border-cyan-900/50 bg-[#071525] p-4 lg:col-span-3 lg:border-l lg:border-t-0">
          <div className="rounded-3xl border border-cyan-800 bg-slate-950/70 p-4">
            <h2 className="mb-2 text-2xl font-black">Drug Drawer</h2>
            <p className="mb-4 text-slate-400">
              Connect basic monitors before giving drugs.
            </p>

            <div className="space-y-3">
              {["Propofol", "Fentanyl", "Rocuronium", "Ketamine", "Midazolam"].map((drug) => (
                <button
                  key={drug}
                  onClick={() => setMsg("Drug dose calculator will be added in the next step.")}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-4 text-left transition hover:scale-[1.01]"
                >
                  <b>{drug}</b>
                  <p className="text-sm text-slate-400">Tap to calculate dose</p>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-[min(460px,92vw)] rounded-3xl border border-cyan-600 bg-slate-950 p-6 shadow-2xl">
            <button onClick={() => setDrawerOpen(false)} className="float-right text-2xl">
              ×
            </button>
            <h2 className="mb-3 text-2xl font-black">Drug Drawer</h2>
            <p className="text-slate-300">
              Next step: we will add dose calculation for Propofol, Fentanyl, and Rocuronium.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}