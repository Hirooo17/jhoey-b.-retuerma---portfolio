import { useState } from "react";
import {
  AudioLines,
  Server,
  BrainCircuit,
  Monitor,
  ClipboardList,
  Users,
  ListChecks,
  Flag,
  CircleCheck,
  Camera,
  Database,
  MousePointer2,
  Save,
  Braces,
  PanelsTopLeft,
  Boxes,
  Smartphone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { exhibits, studies } from "../data/exhibition";
import { profile } from "../data/portfolio";
import { collect } from "./Passport";
const symbols: Record<string, LucideIcon[]> = {
  audio: [AudioLines, Server, BrainCircuit, Monitor],
  map: [ClipboardList, Users, ListChecks],
  steps: [Flag, CircleCheck, Camera],
  dental: [Database, MousePointer2, Save],
  type: [Braces, PanelsTopLeft, Boxes],
  commission: [Smartphone, ListChecks, ShieldCheck],
};
function Notebook({ index }: { index: number }) {
  const [step, setStep] = useState(0);
  const item = exhibits[index],
    study = studies[item.art];
  return (
    <div className="notebook">
      <div className="study-front">
        <div>
          <p className="eyebrow">
            {item.category} / {item.year}
          </p>
          <h3>{item.title}</h3>
          <p className="study-question">{study.question}</p>
        </div>
        <div>
          <h4>
            {item.art === "dental"
              ? "Documented project scope"
              : "My contribution"}
          </h4>
          <p>{study.contribution}</p>
          <div className="study-materials">{item.tags.join(" · ")}</div>
        </div>
      </div>
      <div className="diagram study-diagram">
        <div className="diagram-title">
          {study.caption} <small>Select a stage</small>
        </div>
        <div
          className={
            "diagram-flow stage-track " +
            (item.art === "commission" ? "role-track" : "")
          }
        >
          {study.stages.map(([name], i) => {
            const Symbol = symbols[item.art][i];
            return (
              <button
                key={name}
                aria-pressed={step === i}
                onClick={() => {
                  setStep(i);
                  collect("project");
                }}
              >
                <span className="node-icon">
                  <Symbol size={20} aria-hidden="true" />
                </span>
                <span>
                  <small>0{i + 1}</small> {name}
                </span>
              </button>
            );
          })}
        </div>
        <article key={step} aria-live="polite">
          <b aria-hidden="true">0{step + 1}</b>
          <div>
            <h4>{study.stages[step][1]}</h4>
            <p>{study.stages[step][2]}</p>
          </div>
        </article>
      </div>
      <dl className="engineering-notes">
        {[
          ["Development approach", study.approach],
          ["Technical challenge", study.challenge],
          [study.testLabel, study.testing],
          ["Engineering takeaway", study.takeaway],
          ["Documented outcome", study.outcome],
        ].map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      {item.repo && (
        <a
          className="notebook-source"
          href={
            profile.github +
            "/" +
            item.repo +
            (study.source ? "/blob/HEAD/" + study.source : "")
          }
        >
          {study.source ? "Inspect " + study.source : "Inspect project source"}{" "}
          ↗
        </a>
      )}
    </div>
  );
}
export default function StudyRoom({
  index,
  onSelect,
}: {
  index: number;
  onSelect: (i: number) => void;
}) {
  return (
    <section
      id="case-study"
      tabIndex={-1}
      aria-labelledby="study-title"
      className="case-study dark"
    >
      <div className="wrap section">
        <p className="eyebrow">Behind the build / Technical notebooks</p>
        <div className="study-heading">
          <h2 id="study-title">
            Under the <em>surface.</em>
          </h2>
          <label>
            Open a notebook
            <select
              aria-label="Open a case study"
              value={index}
              onChange={(e) => {
                onSelect(+e.target.value);
                collect("project");
              }}
            >
              {exhibits.map((item, i) => (
                <option key={item.art} value={i}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
        </div>
        <Notebook key={index} index={index} />
      </div>
    </section>
  );
}
