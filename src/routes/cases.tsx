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
  { id: "ecg", label: "ECG", value: "HR 82" },
  { id: "spo2", label: "Pulse oximeter", value: "SpO₂ 99%" },
  { id: "bp", label: "BP cuff", value: "BP 118/72" },
  { id: "capno", label: "Capnography", value: "Ready" },
  { id: "temp", label: "Temperature", value: "36.8°C" },
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
  const [msg, setMsg] = useState("Read the case, then open the patient chart.");
  const [tube, setTube] = useState(false);

  const preopDone = selectedPreop.length >= 8;
  const monitoringDone = ["ecg", "spo2", "bp", "capno"].every((x) => connected.includes(x));
  const drugsDone = ["Propofol", "Fentanyl", "Rocuronium"].every((x) => selectedDrugs.includes(x));
  const airwayDone = ["Face mask", "Laryngoscope", "ETT 7.0–7.5", "Suction"].every((x) =>
    selectedAirway.includes(x)
  );

  const vitals = useMemo(() => {
    if (!monitoringDone) return { hr: "--", spo2: "--", bp: "--/--", etco2: "--" };
    if (tube) return { hr: "82", spo2: "99%", bp: "116/70", etco2: "36" };
    return { hr: "82", spo2: "99%", bp: "118/72", etco2: "--" };
  }, [monitoringDone, tube]);

  function next() {
    if (step === "brief") return setStep("preop");

    if (step === "preop" && !preopDone) {
      return setMsg("Incorrect. Complete the essential pre-op assessment first.");
    }

    if (step === "monitoring" && !monitoringDone) {
      return setMsg("Incorrect. ASA basic monitoring must be connected before induction.");
    }

    if (step === "drugs" && !drugsDone) {
      return setMsg("Incorrect. Choose hypnotic + opioid + neuromuscular blocker.");
    }

    if (step === "airway" && !airwayDone) {
      return setMsg("Incorrect. Prepare essential airway equipment before intubation.");
    }

    if (step === "preop") setStep("monitoring");
    else if (step === "monitoring") setStep("drugs");
    else if (step === "drugs") setStep("airway");
    else if (step === "airway") {
      setTube(true);
      setStep("machine");
      setMsg("Correct. ETT placed. Continuous waveform EtCO₂ appears.");
    } else if (step === "machine") setStep("done");
  }

  function chooseWrong(text: string) {
    setMsg(`Incorrect. ${text} Try again.`);
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

      <section className="grid md:grid-cols-5 gap-3 mb-6">
        {["Brief", "Pre-op", "Monitoring", "Drugs", "Airway", "Machine"].map((x, i) => (
          <div
            key={x}
            className={`rounded-2xl p-3 border ${
              ["brief", "preop", "monitoring", "drugs", "airway", "machine"][i] === step
                ? "border-cyan-400 bg-cyan-400/10"
                : "border-slate-800 bg-slate-900/60"
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

      <section className="relative min-h-[520px] rounded-[2rem] border border-slate-800 overflow-hidden bg-[radial-gradient(circle_at_center,rgba(56,189,248,.14),transparent_45%),#0b1120] mb-6">
        <div className="absolute left-5 top-5 w-[280px] rounded-3xl border border-cyan-500/50 bg-black/70 p-4">
          <h3 className="font-black mb-3">Patient Monitor</h3>
          <div className="h-14 rounded-xl bg-[repeating-linear-gradient(90deg,#22c55e_0_8px,transparent_8px_18px)] opacity-80 mb-3" />
          <div className="grid grid-cols-2 gap-2 text-cyan-300 font-mono">
            <span>HR {vitals.hr}</span>
            <span>SpO₂ {vitals.spo2}</span>
            <span>BP {vitals.bp}</span>
            <span>EtCO₂ {vitals.etco2}</span>
          </div>
        </div>

        <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-6xl drop-shadow-[0_0_25px_#38bdf8] mb-2">✦</div>
          <div className="relative mx-auto w-[150px] h-[250px]">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#f2c49f]" />
            <div className="mx-auto mt-2 w-32 h-40 rounded-full bg-gradient-to-b from-blue-200 to-blue-900" />
            <div className="absolute -left-8 top-24 w-10 h-28 rounded-full bg-blue-100 rotate-12" />
            <div className="absolute -right-8 top-24 w-10 h-28 rounded-full bg-blue-100 -rotate-12" />
          </div>
          <div className="mt-[-30px] w-[330px] h-20 rounded-[2rem] bg-slate-700" />
        </div>

        <div className="absolute right-5 top-5 w-[310px] rounded-3xl border border-violet-500/50 bg-black/70 p-4">
          <h3 className="font-black mb-3">Anesthesia Machine</h3>
          <div className="grid grid-cols-2 gap-2 text-cyan-300 font-mono text-sm">
            <span>FiO₂ 50%</span>
            <span>Sevo --</span>
            <span>MAC --</span>
            <span>VT 480</span>
            <span>RR 12</span>
            <span>PEEP 5</span>
          </div>
        </div>

        <div className="absolute bottom-5 left-5 rounded-2xl border border-blue-500/40 bg-slate-900/90 p-4">
          💉 Drug tray
        </div>

        <div className="absolute bottom-5 right-5 rounded-2xl border border-emerald-500/40 bg-slate-900/90 p-4">
          🫁 Airway cart
        </div>
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

        <p className={msg.startsWith("Incorrect") ? "text-red-300 mb-4" : "text-emerald-300 mb-4"}>
          {msg}
        </p>

        {step === "brief" && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            You are the anesthesia student in the OR. Start by reviewing patient information, then complete
            pre-op assessment before induction.
          </div>
        )}

        {step === "preop" && (
          <div className="grid md:grid-cols-3 gap-3">
            {preop.map((x) => (
              <button
                key={x}
                onClick={() => {
                  if (!selectedPreop.includes(x)) setSelectedPreop([...selectedPreop, x]);
                  setMsg("Good. Continue completing the pre-op checklist.");
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

        {step === "monitoring" && (
          <div className="grid md:grid-cols-3 gap-3">
            {monitors.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  if (!connected.includes(m.id)) setConnected([...connected, m.id]);
                  setMsg("Monitor connected.");
                }}
                className={`rounded-2xl border p-4 text-left ${
                  connected.includes(m.id)
                    ? "border-emerald-400 bg-emerald-400/10"
                    : "border-slate-700 bg-slate-900"
                }`}
              >
                <b>{m.label}</b>
                <br />
                <small>{connected.includes(m.id) ? m.value : "Not connected"}</small>
              </button>
            ))}
          </div>
        )}

        {step === "drugs" && (
          <div className="grid md:grid-cols-3 gap-3">
            {drugs.map((d) => (
              <button
                key={d.name}
                onClick={() => {
                  if (!d.correct) return chooseWrong("This is not the best routine choice for this ASA I elective case.");
                  if (!selectedDrugs.includes(d.name)) setSelectedDrugs([...selectedDrugs, d.name]);
                  setMsg("Correct drug choice. Continue.");
                }}
                className={`rounded-2xl border p-4 text-left ${
                  selectedDrugs.includes(d.name)
                    ? "border-emerald-400 bg-emerald-400/10"
                    : "border-slate-700 bg-slate-900"
                }`}
              >
                <b>{d.name}</b>
                <br />
                <small>{d.dose}</small>
              </button>
            ))}
          </div>
        )}

        {step === "airway" && (
          <div className="grid md:grid-cols-3 gap-3">
            {airway.map((a) => (
              <button
                key={a.name}
                onClick={() => {
                  if (!a.correct) return chooseWrong("LMA alone is not the primary airway plan for this intubated laparoscopic case.");
                  if (!selectedAirway.includes(a.name)) setSelectedAirway([...selectedAirway, a.name]);
                  setMsg("Correct airway equipment selected.");
                }}
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