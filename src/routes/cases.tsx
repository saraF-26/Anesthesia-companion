import { useMemo, useState } from "react";

type Step = "preop" | "monitoring" | "induction" | "airway" | "machine";

const patient = {
  age: 27,
  sex: "Female",
  weight: 65,
  height: 165,
  asa: "ASA I",
  surgery: "Elective laparoscopic cholecystectomy",
  allergy: "No known allergies",
  meds: "No regular medications",
  pmh: "No significant past medical history",
  airway: "Mallampati II, mouth opening >3 fingers, normal neck movement",
  lastMeal: "Light meal 8 hours ago, clear fluids 3 hours ago",
};

const monitors = [
  { id: "ecg", label: "ECG", value: "HR 82" },
  { id: "spo2", label: "Pulse Ox", value: "SpO₂ 99%" },
  { id: "bp", label: "NIBP cuff", value: "BP 118/72" },
  { id: "capno", label: "Capnography", value: "Ready" },
  { id: "temp", label: "Temperature", value: "36.8°C" },
];

const preopItems = [
  "Confirm identity",
  "Confirm consent",
  "Check procedure/site",
  "Ask allergies",
  "Ask last oral intake",
  "Review medications",
  "Review PMH",
  "Airway assessment",
  "IV access",
  "Equipment check",
];

const drugs = [
  { name: "Propofol", dose: "1.5–2.5 mg/kg", correct: true },
  { name: "Fentanyl", dose: "1–2 mcg/kg", correct: true },
  { name: "Rocuronium", dose: "0.6–1.2 mg/kg", correct: true },
  { name: "Midazolam", dose: "Not routine for this simple case", correct: false },
  { name: "Ketamine", dose: "Useful in shock/bronchospasm", correct: false },
];

const airway = [
  { name: "Face mask", correct: true },
  { name: "Laryngoscope", correct: true },
  { name: "ETT 7.0–7.5", correct: true },
  { name: "Stylet", correct: true },
  { name: "Suction", correct: true },
  { name: "LMA only", correct: false },
];

export default function Cases() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [step, setStep] = useState<Step>("preop");
  const [donePreop, setDonePreop] = useState<string[]>([]);
  const [connected, setConnected] = useState<string[]>([]);
  const [chosenDrugs, setChosenDrugs] = useState<string[]>([]);
  const [chosenAirway, setChosenAirway] = useState<string[]>([]);
  const [message, setMessage] = useState("Start with pre-op assessment.");
  const [tubePlaced, setTubePlaced] = useState(false);

  const preopComplete = donePreop.length >= 8;
  const monitoringComplete = ["ecg", "spo2", "bp", "capno"].every((x) => connected.includes(x));
  const drugPlanReady = ["Propofol", "Fentanyl", "Rocuronium"].every((x) => chosenDrugs.includes(x));
  const airwayReady = ["Face mask", "Laryngoscope", "ETT 7.0–7.5", "Suction"].every((x) =>
    chosenAirway.includes(x)
  );

  const vitals = useMemo(() => {
    if (!monitoringComplete) return { hr: "--", spo2: "--", bp: "--/--", etco2: "--" };
    if (tubePlaced) return { hr: "82", spo2: "99%", bp: "116/70", etco2: "36" };
    return { hr: "82", spo2: "99%", bp: "118/72", etco2: "--" };
  }, [monitoringComplete, tubePlaced]);

  function togglePreop(item: string) {
    if (donePreop.includes(item)) return;
    setDonePreop([...donePreop, item]);
    setMessage("Good. Keep completing the pre-op checklist.");
  }

  function connectMonitor(id: string) {
    if (connected.includes(id)) return;
    setConnected([...connected, id]);
    setMessage("Monitor connected.");
  }

  function chooseDrug(name: string, correct: boolean) {
    if (!correct) {
      setMessage("Incorrect for this routine ASA I case. Reassess the indication and choose again.");
      return;
    }
    if (!chosenDrugs.includes(name)) setChosenDrugs([...chosenDrugs, name]);
    setMessage("Correct drug choice. Continue building the induction plan.");
  }

  function chooseAirway(name: string, correct: boolean) {
    if (!correct) {
      setMessage("Incorrect. LMA alone is not the primary airway plan for this intubated laparoscopic case.");
      return;
    }
    if (!chosenAirway.includes(name)) setChosenAirway([...chosenAirway, name]);
    setMessage("Correct airway equipment selected.");
  }

  function nextStep() {
    if (step === "preop" && !preopComplete) {
      setMessage("Incorrect. Complete the essential pre-op assessment first.");
      return;
    }
    if (step === "monitoring" && !monitoringComplete) {
      setMessage("Incorrect. ASA basic monitoring must be connected before induction.");
      return;
    }
    if (step === "induction" && !drugPlanReady) {
      setMessage("Incorrect. Complete the induction plan: hypnotic + opioid + paralytic.");
      return;
    }
    if (step === "airway" && !airwayReady) {
      setMessage("Incorrect. Prepare essential airway equipment before intubation.");
      return;
    }

    if (step === "preop") setStep("monitoring");
    else if (step === "monitoring") setStep("induction");
    else if (step === "induction") setStep("airway");
    else if (step === "airway") {
      setTubePlaced(true);
      setStep("machine");
      setMessage("Correct. Tube placed and continuous waveform EtCO₂ appears.");
    }
  }

  return (
    <main style={s.page}>
      <header style={s.header}>
        <div>
          <p style={s.kicker}>Virtual Operating Room</p>
          <h1 style={s.title}>OR Simulator</h1>
          <p style={s.subtitle}>
            A 27-year-old female presents for elective laparoscopic cholecystectomy under general
            anesthesia.
          </p>
        </div>

        <button style={s.infoButton} onClick={() => setInfoOpen(true)}>
          ℹ Patient info
        </button>
      </header>

      <section style={s.preopBox}>
        <h2>Pre-op Essentials</h2>
        <p>
          Before anesthesia: confirm identity, consent, allergies, medications, comorbidities, last
          oral intake, airway assessment, ASA class, IV access, baseline vitals, and equipment check.
        </p>
        <div style={s.fastingGrid}>
          <div>Clear fluids: <b>2 h</b></div>
          <div>Breast milk: <b>4 h</b></div>
          <div>Infant formula / non-human milk: <b>6 h</b></div>
          <div>Light meal: <b>6 h</b></div>
          <div>Fatty/heavy meal: <b>8 h</b></div>
        </div>
      </section>

      <section style={s.room}>
        <div style={s.monitor}>
          <h3>Patient Monitor</h3>
          <div style={s.wave} />
          <div style={s.vitals}>
            <b>HR {vitals.hr}</b>
            <b>SpO₂ {vitals.spo2}</b>
            <b>BP {vitals.bp}</b>
            <b>EtCO₂ {vitals.etco2}</b>
          </div>
        </div>

        <div style={s.patientZone}>
          <div style={s.light}>✦</div>
          <div style={s.patient}>
            <div style={s.head} />
            <div style={s.body} />
            <div style={s.leftArm} />
            <div style={s.rightArm} />
          </div>
          <div style={s.table} />
        </div>

        <div style={s.machine}>
          <h3>Anesthesia Machine</h3>
          <div style={s.machineGrid}>
            <span>FiO₂ 50%</span>
            <span>Sevo --</span>
            <span>MAC --</span>
            <span>VT 480</span>
            <span>RR 12</span>
            <span>PEEP 5</span>
          </div>
        </div>
      </section>

      <section style={s.panel}>
        <h2>
          Step:{" "}
          {step === "preop"
            ? "Pre-op check"
            : step === "monitoring"
            ? "Connect monitors"
            : step === "induction"
            ? "Choose induction plan"
            : step === "airway"
            ? "Prepare airway"
            : "Machine settings"}
        </h2>

        <p style={message.startsWith("Incorrect") ? s.badMsg : s.goodMsg}>{message}</p>

        {step === "preop" && (
          <div style={s.grid}>
            {preopItems.map((item) => (
              <button
                key={item}
                style={donePreop.includes(item) ? s.selected : s.choice}
                onClick={() => togglePreop(item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {step === "monitoring" && (
          <div style={s.grid}>
            {monitors.map((m) => (
              <button
                key={m.id}
                style={connected.includes(m.id) ? s.selected : s.choice}
                onClick={() => connectMonitor(m.id)}
              >
                {m.label}
                <small>{connected.includes(m.id) ? m.value : "Not connected"}</small>
              </button>
            ))}
          </div>
        )}

        {step === "induction" && (
          <div style={s.grid}>
            {drugs.map((d) => (
              <button
                key={d.name}
                style={chosenDrugs.includes(d.name) ? s.selected : s.choice}
                onClick={() => chooseDrug(d.name, d.correct)}
              >
                {d.name}
                <small>{d.dose}</small>
              </button>
            ))}
          </div>
        )}

        {step === "airway" && (
          <div style={s.grid}>
            {airway.map((a) => (
              <button
                key={a.name}
                style={chosenAirway.includes(a.name) ? s.selected : s.choice}
                onClick={() => chooseAirway(a.name, a.correct)}
              >
                {a.name}
              </button>
            ))}
          </div>
        )}

        {step === "machine" && (
          <div style={s.success}>
            ✅ Safe initial setup completed. Tube confirmed with waveform capnography.
          </div>
        )}

        <button style={s.primary} onClick={nextStep}>
          Continue
        </button>
      </section>

      {infoOpen && (
        <aside style={s.drawer}>
          <button style={s.close} onClick={() => setInfoOpen(false)}>×</button>
          <h2>Patient Information</h2>
          {Object.entries(patient).map(([k, v]) => (
            <div key={k} style={s.infoRow}>
              <b>{k}</b>
              <span>{v}</span>
            </div>
          ))}
        </aside>
      )}

      <footer style={s.refs}>
        References: ASA Practice Guidelines for Preoperative Fasting; ASA Standards for Basic
        Anesthetic Monitoring; Morgan & Mikhail’s Clinical Anesthesiology; OpenAnesthesia.
      </footer>
    </main>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", padding: 36, background: "#05070d", color: "#e5eefc" },
  header: { display: "flex", justifyContent: "space-between", gap: 20, alignItems: "start" },
  kicker: { color: "#38bdf8", textTransform: "uppercase", letterSpacing: 2, fontSize: 12 },
  title: { fontSize: 54, margin: "6px 0", fontWeight: 900 },
  subtitle: { color: "#9ca3af", fontSize: 18, maxWidth: 850 },
  infoButton: { padding: "14px 18px", borderRadius: 16, background: "#111827", color: "#e5eefc", border: "1px solid #334155" },
  preopBox: { marginTop: 24, padding: 22, borderRadius: 24, background: "rgba(15,23,42,.8)", border: "1px solid #1e293b" },
  fastingGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 10, marginTop: 14, color: "#bae6fd" },
  room: { position: "relative", minHeight: 500, marginTop: 24, borderRadius: 30, background: "radial-gradient(circle at center, rgba(56,189,248,.12), transparent), #0b1120", border: "1px solid #1e293b", overflow: "hidden" },
  monitor: { position: "absolute", left: 24, top: 24, width: 280, padding: 18, borderRadius: 22, background: "#020617", border: "1px solid #0ea5e9" },
  wave: { height: 50, borderRadius: 10, background: "repeating-linear-gradient(90deg,#22c55e 0 8px,transparent 8px 18px)", opacity: .8 },
  vitals: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, color: "#67e8f9", marginTop: 12 },
  patientZone: { position: "absolute", left: "36%", top: "18%", width: 300, height: 300 },
  light: { textAlign: "center", fontSize: 56, color: "#e0f2fe", filter: "drop-shadow(0 0 28px #38bdf8)" },
  patient: { position: "relative", margin: "0 auto", width: 140, height: 240, zIndex: 2 },
  head: { width: 64, height: 64, borderRadius: "50%", background: "#f2c49f", margin: "0 auto" },
  body: { width: 120, height: 160, borderRadius: 60, background: "linear-gradient(#93c5fd,#1e3a8a)", margin: "8px auto" },
  leftArm: { position: "absolute", left: -30, top: 88, width: 38, height: 120, borderRadius: 20, background: "#bfdbfe", transform: "rotate(18deg)" },
  rightArm: { position: "absolute", right: -30, top: 88, width: 38, height: 120, borderRadius: 20, background: "#bfdbfe", transform: "rotate(-18deg)" },
  table: { position: "absolute", bottom: 0, left: -10, width: 320, height: 80, borderRadius: 30, background: "#334155" },
  machine: { position: "absolute", right: 24, top: 24, width: 300, padding: 18, borderRadius: 22, background: "#020617", border: "1px solid #8b5cf6" },
  machineGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, color: "#67e8f9" },
  panel: { marginTop: 24, padding: 24, borderRadius: 24, background: "rgba(15,23,42,.85)", border: "1px solid #1e293b" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 12 },
  choice: { padding: 15, borderRadius: 16, background: "#020617", color: "#e5eefc", border: "1px solid #334155", textAlign: "left", display: "grid", gap: 5 },
  selected: { padding: 15, borderRadius: 16, background: "rgba(34,197,94,.14)", color: "#e5eefc", border: "1px solid #22c55e", textAlign: "left", display: "grid", gap: 5 },
  goodMsg: { color: "#86efac" },
  badMsg: { color: "#fca5a5" },
  primary: { marginTop: 18, padding: "14px 20px", borderRadius: 16, background: "linear-gradient(135deg,#38bdf8,#818cf8)", border: 0, fontWeight: 800 },
  success: { padding: 18, borderRadius: 16, background: "rgba(34,197,94,.12)", border: "1px solid #22c55e" },
  drawer: { position: "fixed", right: 0, top: 0, height: "100vh", width: "min(430px,92vw)", background: "#020617", borderLeft: "1px solid #334155", padding: 26, zIndex: 50 },
  close: { float: "right", background: "transparent", border: 0, color: "#fff", fontSize: 30 },
  infoRow: { padding: 12, borderBottom: "1px solid #1e293b", display: "grid", gap: 4 },
  refs: { marginTop: 24, color: "#94a3b8", borderTop: "1px solid #1e293b", paddingTop: 16 },
};