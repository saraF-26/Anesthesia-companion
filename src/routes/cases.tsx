import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

type Step = "brief" | "preop" | "monitoring" | "drugs" | "airway" | "machine" | "done";

const patient = {
  age: "27 years",
  sex: "Female",
  weight: 65,
  height: "165 cm",
  asa: "ASA I",
  surgery: "Elective laparoscopic cholecystectomy",
  allergies: "None",
  pmh: "No significant past medical history",
  meds: "No regular medications",
  airway: "Mallampati II, mouth opening >3 fingers, normal neck movement",
  lastMeal: "Light meal 8 hours ago, clear fluids 3 hours ago",
};

const preop = [
  "Confirm identity",
  "Confirm consent",
  "Confirm procedure/site",
  "Check allergies",
  "Ask last oral intake",
  "Review medications",
  "Review PMH",
  "Airway assessment",
  "IV access",
  "Equipment check",
];

const monitors = [
  { id: "ecg", label: "ECG leads", value: "HR 82" },
  { id: "spo2", label: "Pulse ox", value: "SpO₂ 99%" },
  { id: "bp", label: "BP cuff", value: "BP 118/72" },
  { id: "temp", label: "Temp probe", value: "36.8°C" },
  { id: "capno", label: "Capnography", value: "Ready" },
];

const drugs = [
  { name: "Propofol", dose: "1.5–2.5 mg/kg", correct: true },
  { name: "Fentanyl", dose: "1–2 mcg/kg", correct: true },
  { name: "Rocuronium", dose: "0.6–1.2 mg/kg", correct: true },
  { name: "Ketamine", dose: "Not first choice here", correct: false },
  { name: "Midazolam", dose: "Not routine induction plan", correct: false },
];

const airway = [
  { name: "Face mask", correct: true },
  { name: "Laryngoscope", correct: true },
  { name: "ETT 7.0–7.5", correct: true },
  { name: "Stylet", correct: true },
  { name: "Suction", correct: true },
  { name: "LMA only", correct: false },
];

export const Route = createFileRoute("/cases")({
  component: Cases,
});

function Cases() {
  const [step, setStep] = useState<Step>("brief");
  const [chart, setChart] = useState(false);
  const [selectedPreop, setSelectedPreop] = useState<string[]>([]);
  const [connected, setConnected] = useState<string[]>([]);
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [selectedAirway, setSelectedAirway] = useState<string[]>([]);
  const [msg, setMsg] = useState("Open the patient chart, then start the OR simulation.");
  const [tube, setTube] = useState(false);
  const [drugDrawer, setDrugDrawer] = useState(false);
  const [airwayDrawer, setAirwayDrawer] = useState(false);

  const expectedDrugs = ["Propofol", "Fentanyl", "Rocuronium"];

  const preopDone = selectedPreop.length >= 8;
  const monitoringDone = ["ecg", "spo2", "bp", "temp"].every((x) => connected.includes(x));
  const drugsDone = expectedDrugs.every((x) => selectedDrugs.includes(x));
  const airwayDone = ["Face mask", "Laryngoscope", "ETT 7.0–7.5", "Suction"].every((x) =>
    selectedAirway.includes(x)
  );

  const vitals = useMemo(() => {
    return {
      hr: connected.includes("ecg") ? "82" : "--",
      spo2: connected.includes("spo2") ? "99%" : "--",
      bp: connected.includes("bp") ? "118/72" : "--/--",
      temp: connected.includes("temp") ? "36.8" : "--",
      etco2: tube ? "36" : "--",
    };
  }, [connected, tube]);

  function wrong(text: string) {
    setMsg(`❌ Incorrect. ${text}`);
  }

  function connectMonitor(id: string, label: string) {
    if (step !== "monitoring") {
      wrong("Start the monitoring step before connecting equipment.");
      return;
    }

    if (!connected.includes(id)) {
      setConnected([...connected, id]);
      setMsg(`✅ ${label} connected. Monitor updated.`);
    }
  }

  function chooseDrug(name: string, correct: boolean) {
    if (step !== "drugs") {
      wrong("Complete basic monitoring before choosing induction drugs.");
      return;
    }

    const nextDrug = expectedDrugs[selectedDrugs.length];

    if (!correct || name !== nextDrug) {
      wrong(`Choose the next appropriate induction drug. Expected sequence: hypnotic → opioid → neuromuscular blocker.`);
      return;
    }

    if (!selectedDrugs.includes(name)) {
      setSelectedDrugs([...selectedDrugs, name]);
      setMsg(`✅ ${name} selected correctly.`);
    }
  }

  function chooseAirway(name: string, correct: boolean) {
    if (step !== "airway") {
      wrong("Induction drugs should be selected before preparing the airway.");
      return;
    }

    if (!correct) {
      wrong("LMA alone is not the primary airway plan for this laparoscopic intubated case.");
      return;
    }

    if (!selectedAirway.includes(name)) {
      setSelectedAirway([...selectedAirway, name]);
      setMsg(`✅ ${name} prepared.`);
    }
  }

  function next() {
    if (step === "brief") {
      setStep("preop");
      setMsg("Complete the essential pre-op checks.");
      return;
    }

    if (step === "preop") {
      if (!preopDone) {
        wrong("Complete at least 8 essential pre-op checks first.");
        return;
      }
      setStep("monitoring");
      setMsg("Now connect ASA basic monitors directly on the OR scene.");
      return;
    }

    if (step === "monitoring") {
      if (!monitoringDone) {
        wrong("ECG, pulse ox, BP cuff, and temperature probe are required before induction.");
        return;
      }
      setStep("drugs");
      setMsg("Monitoring complete. Open the drug tray and choose the induction drugs in order.");
      return;
    }

    if (step === "drugs") {
      if (!drugsDone) {
        wrong("Choose Propofol, Fentanyl, and Rocuronium in the correct order.");
        return;
      }
      setStep("airway");
      setMsg("Drug plan complete. Open the airway cart and prepare intubation equipment.");
      return;
    }

    if (step === "airway") {
      if (!airwayDone) {
        wrong("Prepare face mask, laryngoscope, ETT, and suction before intubation.");
        return;
      }
      setTube(true);
      setStep("machine");
      setMsg("✅ ETT placed. Continuous waveform EtCO₂ appears.");
      return;
    }

    if (step === "machine") {
      setStep("done");
      setMsg("Simulation completed.");
    }
  }

  return (
    <main className="min-h-screen bg-[#05070d] text-slate-100 p-6 md:p-10">
      <section className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-cyan-400 text-xs tracking-[0.25em] uppercase">Virtual Operating Room</p>
          <h1 className="text-4xl md:text-6xl font-black mt-2">OR Simulator</h1>
          <p className="text-slate-400 mt-3 max-w-3xl">
            A 27-year-old female presents for elective laparoscopic cholecystectomy under general anesthesia.
          </p>
        </div>

        <button
          onClick={() => setChart(true)}
          className="rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 font-bold hover:border-cyan-400"
        >
          ℹ Patient Chart
        </button>
      </section>

      <section className="grid md:grid-cols-6 gap-3 mb-6">
        {["brief", "preop", "monitoring", "drugs", "airway", "machine"].map((x) => (
          <div
            key={x}
            className={`rounded-2xl p-3 border capitalize ${
              x === step ? "border-cyan-400 bg-cyan-400/10" : "border-slate-800 bg-slate-900/60"
            }`}
          >
            {x}
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-5 mb-6">
        <h2 className="text-xl font-black mb-2">Pre-op essentials</h2>
        <p className="text-slate-400">
          Confirm patient identity, consent, allergies, medications, comorbidities, last oral intake,
          airway assessment, IV access, baseline vitals, and equipment readiness.
        </p>

        <div className="grid md:grid-cols-5 gap-3 mt-4 text-sm">
          <div className="rounded-xl bg-slate-900 p-3">Clear fluids: <b>2 h</b></div>
          <div className="rounded-xl bg-slate-900 p-3">Breast milk: <b>4 h</b></div>
          <div className="rounded-xl bg-slate-900 p-3">Formula/milk: <b>6 h</b></div>
          <div className="rounded-xl bg-slate-900 p-3">Light meal: <b>6 h</b></div>
          <div className="rounded-xl bg-slate-900 p-3">Fatty meal: <b>8 h</b></div>
        </div>
      </section>

      <section className="relative min-h-[760px] rounded-[2rem] border border-slate-800 overflow-hidden mb-6 bg-[#07111f]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.16),transparent_45%)]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-slate-700/30" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-slate-800/50" />

        <div className="absolute left-1/2 top-10 -translate-x-1/2">
          <div className="mx-auto w-24 h-8 rounded-full bg-slate-400" />
          <div className="mt-2 grid grid-cols-4 gap-2 bg-slate-300/20 rounded-full p-3 border border-white/20">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-8 h-5 rounded-full bg-yellow-100 shadow-[0_0_25px_rgba(254,249,195,.8)]" />
            ))}
          </div>
        </div>

        <div className="absolute left-6 top-6 w-[320px] rounded-3xl border border-cyan-500/60 bg-black/85 p-5 shadow-[0_0_30px_rgba(34,211,238,.15)]">
          <h3 className="font-black mb-3">Patient Monitor</h3>
          <div className="h-12 rounded-xl bg-black border border-emerald-400/30 mb-4 overflow-hidden">
            <div className="h-full bg-[repeating-linear-gradient(90deg,#22c55e_0_7px,transparent_7px_20px)] opacity-80" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-cyan-300 font-mono">
            <span>HR {vitals.hr}</span>
            <span>SpO₂ {vitals.spo2}</span>
            <span>BP {vitals.bp}</span>
            <span>Temp {vitals.temp}</span>
            <span>EtCO₂ {vitals.etco2}</span>
          </div>
        </div>

        <div className="absolute right-6 top-6 w-[330px] rounded-3xl border border-violet-500/60 bg-black/85 p-5 shadow-[0_0_30px_rgba(139,92,246,.15)]">
          <h3 className="font-black mb-3">Anesthesia Machine</h3>
          <div className="grid grid-cols-2 gap-2 text-cyan-300 font-mono text-sm">
            <span>FiO₂ 50%</span>
            <span>Sevo --</span>
            <span>MAC --</span>
            <span>VT 480</span>
            <span>RR 12</span>
            <span>PEEP 5</span>
          </div>
          <div className="mt-4 h-24 rounded-2xl bg-slate-800 border border-slate-600" />
        </div>

        <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-[460px] h-[390px]">
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[430px] h-28 rounded-[2rem] bg-slate-600 shadow-2xl" />
            <div className="absolute left-1/2 bottom-16 -translate-x-1/2 w-[360px] h-24 rounded-[2rem] bg-slate-700" />
            <div className="absolute left-1/2 top-4 -translate-x-1/2 w-20 h-20 rounded-full bg-[#f2c49f] shadow-lg" />
            <div className="absolute left-1/2 top-24 -translate-x-1/2 w-44 h-56 rounded-[45%] bg-gradient-to-b from-blue-100 to-blue-800 shadow-xl" />
            <div className="absolute left-[98px] top-112 w-16 h-36 rounded-full bg-blue-100 rotate-12" />
            <div className="absolute right-[98px] top-112 w-16 h-36 rounded-full bg-blue-100 -rotate-12" />

            <button
              onClick={() => connectMonitor("ecg", "ECG leads")}
              className={`absolute left-[185px] top-[150px] w-20 h-12 rounded-full border text-xs ${
                connected.includes("ecg") ? "border-emerald-300 bg-emerald-400/30" : "border-white/40 bg-white/10"
              }`}
            >
              ECG
            </button>

            <button
              onClick={() => connectMonitor("spo2", "Pulse oximeter")}
              className={`absolute right-[85px] top-[210px] w-16 h-10 rounded-full border text-xs ${
                connected.includes("spo2") ? "border-emerald-300 bg-emerald-400/30" : "border-white/40 bg-white/10"
              }`}
            >
              SpO₂
            </button>

            <button
              onClick={() => connectMonitor("bp", "BP cuff")}
              className={`absolute left-[65px] top-[205px] w-20 h-12 rounded-xl border text-xs ${
                connected.includes("bp") ? "border-emerald-300 bg-emerald-400/30" : "border-white/40 bg-white/10"
              }`}
            >
              BP
            </button>

            <button
              onClick={() => connectMonitor("temp", "Temperature probe")}
              className={`absolute left-[190px] top-[250px] w-20 h-10 rounded-full border text-xs ${
                connected.includes("temp") ? "border-emerald-300 bg-emerald-400/30" : "border-white/40 bg-white/10"
              }`}
            >
              Temp
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            if (step !== "drugs") {
              wrong("Complete monitoring first, then open the drug tray.");
              return;
            }
            setDrugDrawer(true);
          }}
          className="absolute bottom-8 left-8 rounded-2xl border border-blue-500/60 bg-slate-900 px-5 py-3 font-bold hover:border-cyan-300"
        >
          💉 Drug tray
        </button>

        <button
          onClick={() => {
            if (step !== "airway") {
              wrong("Choose induction drugs before opening the airway cart.");
              return;
            }
            setAirwayDrawer(true);
          }}
          className="absolute bottom-8 right-8 rounded-2xl border border-emerald-500/60 bg-slate-900 px-5 py-3 font-bold hover:border-emerald-300"
        >
          🫁 Airway cart
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[min(560px,80vw)] rounded-2xl border border-slate-700 bg-black/75 p-4">
          <p className={msg.startsWith("❌") ? "text-red-300" : "text-emerald-300"}>{msg}</p>
        </div>

        {drugDrawer && (
          <div className="absolute right-0 top-0 h-full w-[min(430px,92vw)] bg-slate-950/95 border-l border-slate-700 p-6 z-40">
            <button onClick={() => setDrugDrawer(false)} className="float-right text-3xl">×</button>
            <h2 className="text-2xl font-black mb-4">Drug Tray</h2>
            <p className="text-slate-400 mb-4">Choose the induction drugs in correct order.</p>
            <div className="grid gap-3">
              {drugs.map((d) => (
                <button
                  key={d.name}
                  onClick={() => chooseDrug(d.name, d.correct)}
                  className={`rounded-2xl border p-4 text-left ${
                    selectedDrugs.includes(d.name)
                      ? "border-emerald-400 bg-emerald-400/10"
                      : "border-slate-700 bg-slate-900"
                  }`}
                >
                  <b>💉 {d.name}</b>
                  <br />
                  <small>{d.dose}</small>
                </button>
              ))}
            </div>
          </div>
        )}

        {airwayDrawer && (
          <div className="absolute right-0 top-0 h-full w-[min(430px,92vw)] bg-slate-950/95 border-l border-slate-700 p-6 z-40">
            <button onClick={() => setAirwayDrawer(false)} className="float-right text-3xl">×</button>
            <h2 className="text-2xl font-black mb-4">Airway Cart</h2>
            <div className="grid gap-3">
              {airway.map((a) => (
                <button
                  key={a.name}
                  onClick={() => chooseAirway(a.name, a.correct)}
                  className={`rounded-2xl border p-4 text-left ${
                    selectedAirway.includes(a.name)
                      ? "border-emerald-400 bg-emerald-400/10"
                      : "border-slate-700 bg-slate-900"
                  }`}
                >
                  {a.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-5">
        <h2 className="text-2xl font-black mb-3">
          {step === "brief" && "Case Brief"}
          {step === "preop" && "Step 1 — Pre-op check"}
          {step === "monitoring" && "Step 2 — Connect monitors"}
          {step === "drugs" && "Step 3 — Choose induction plan"}
          {step === "airway" && "Step 4 — Prepare airway"}
          {step === "machine" && "Step 5 — Machine setup"}
          {step === "done" && "Debrief"}
        </h2>

        {step === "brief" && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            You are the anesthesia student in the OR. Start by reviewing patient information.
          </div>
        )}

        {step === "preop" && (
          <div className="grid md:grid-cols-3 gap-3">
            {preop.map((x) => (
              <button
                key={x}
                onClick={() => {
                  if (!selectedPreop.includes(x)) setSelectedPreop([...selectedPreop, x]);
                  setMsg("✅ Good. Continue completing the pre-op checklist.");
                }}
                className={`rounded-2xl border p-4 text-left ${
                  selectedPreop.includes(x)
                    ? "border-emerald-400 bg-emerald-400/10"
                    : "border-slate-700 bg-slate-900"
                }`}
              >
                {x}
              </button>
            ))}
          </div>
        )}

        {step === "machine" && (
          <div className="rounded-2xl border border-emerald-400 bg-emerald-400/10 p-5">
            ✅ Safe induction completed. ETT confirmed with waveform capnography. Initial ventilator settings:
            VT 6–8 mL/kg, RR 10–14/min, PEEP 5, FiO₂ adjusted to oxygenation.
          </div>
        )}

        {step === "done" && (
          <div className="rounded-2xl border border-cyan-400 bg-cyan-400/10 p-5">
            Score: Excellent. You completed pre-op assessment, ASA monitoring, induction plan, airway
            preparation, and post-intubation confirmation.
          </div>
        )}

        <button
          onClick={next}
          className="mt-5 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-400 text-slate-950 font-black px-6 py-3"
        >
          Continue
        </button>
      </section>

      {chart && (
        <aside className="fixed top-0 right-0 h-screen w-[min(430px,92vw)] bg-slate-950 border-l border-slate-700 p-6 z-50">
          <button onClick={() => setChart(false)} className="float-right text-3xl">×</button>
          <h2 className="text-2xl font-black mb-5">Patient Chart</h2>
          {Object.entries(patient).map(([k, v]) => (
            <div key={k} className="border-b border-slate-800 py-3">
              <b className="capitalize text-cyan-300">{k}</b>
              <p className="text-slate-300">{v}</p>
            </div>
          ))}
        </aside>
      )}

      <footer className="mt-8 border-t border-slate-800 pt-4 text-slate-400 text-sm">
        References: ASA Practice Guidelines for Preoperative Fasting; ASA Standards for Basic Anesthetic
        Monitoring; Morgan & Mikhail’s Clinical Anesthesiology; OpenAnesthesia.
      </footer>
    </main>
  );
}