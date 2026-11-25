import { useState } from "react";
import {
  Braces,
  Smartphone,
  CheckCheck,
  ShieldCheck,
  ScanLine,
  Repeat2,
  DraftingCompass,
} from "lucide-react";
const workflow = [
  [
    "Understand",
    "Who needs this to work?",
    "Start with the person experiencing the problem. Describe one concrete task and what success looks like.",
  ],
  [
    "Design",
    "What needs to connect?",
    "Sketch the path from input to result. Make responsibilities between the interface and service clear.",
  ],
  [
    "Develop",
    "What is the smallest working path?",
    "Build one complete interaction first. Keep each piece small enough to inspect on its own.",
  ],
  [
    "Test",
    "What happens at the edges?",
    "Try valid, empty and unexpected inputs. Capture the steps, expected result and actual result when they disagree.",
  ],
  [
    "Secure",
    "Who should have access?",
    "Check permissions and handle sensitive data deliberately when defining the boundaries of a feature.",
  ],
  [
    "Improve",
    "Can the fix be verified?",
    "Revisit the original task, repeat the failing case and check nearby behavior for regressions.",
  ],
];
const icons = [
  ScanLine,
  DraftingCompass,
  Braces,
  CheckCheck,
  ShieldCheck,
  Repeat2,
];
export function Commission() {
  const [lens, setLens] = useState(0);
  const lenses = [
    [
      "Development",
      "I worked with other developers on a Flutter mobile application for a BPO company. The contract ran for one month on a hybrid basis in Mandaluyong City.",
    ],
    [
      "Quality assurance",
      "QA was one of my primary responsibilities alongside collaborative Flutter development.",
    ],
    [
      "Backend security",
      "My contributions included backend security features. The client’s implementation details stay private.",
    ],
  ];
  const Icon = [Smartphone, CheckCheck, ShieldCheck][lens];
  return (
    <section id="commission" className="wrap section commission">
      <div className="folder-art">
        <div className="folder-tab">WITHCENTER INC. / KOREA</div>
        <div className="folder-paper">
          <span className="eyebrow">Commission dossier</span>
          <Icon size={63} strokeWidth={1} />
          <strong>
            Mobile
            <br />
            <em>application.</em>
          </strong>
          <span className="mono">Mandaluyong City · Hybrid</span>
        </div>
      </div>
      <div>
        <p className="eyebrow">Professional commission</p>
        <h2>
          Inside the <em>contract.</em>
        </h2>
        <h3>Freelance Flutter Developer</h3>
        <div className="switches">
          {lenses.map(([label], i) => (
            <button
              key={label}
              aria-pressed={lens === i}
              onClick={() => setLens(i)}
            >
              {label}
            </button>
          ))}
        </div>
        <p aria-live="polite">{lenses[lens][1]}</p>
      </div>
    </section>
  );
}
export function Workflow() {
  const [i, setI] = useState(0);
  return (
    <section id="workflow" className="wrap section workflow">
      <p className="eyebrow">Development philosophy</p>
      <h2>
        How I <em>build.</em>
      </h2>
      <div className="assembly">
        {workflow.map(([name], j) => {
          const Icon = icons[j];
          return (
            <button key={name} aria-pressed={i === j} onClick={() => setI(j)}>
              <span>
                <Icon />
              </span>
              {name}
            </button>
          );
        })}
      </div>
      <div key={i} className="work-question">
        <span className="mono">STEP 0{i + 1} / 06</span>
        <h3>{workflow[i][1]}</h3>
        <p>{workflow[i][2]}</p>
      </div>
    </section>
  );
}
