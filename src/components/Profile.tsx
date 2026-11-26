import { Plus, Music2, Gamepad2, Coffee, Cpu, Headset } from "lucide-react";
import { useState } from "react";
import { experience } from "../data/portfolio";
const deskObjects = [
  { label: "Music", Icon: Music2, note: "A good playlist keeps me company while I code." },
  { label: "Games", Icon: Gamepad2, note: "After a long coding session, I unwind with a game." },
  { label: "Coffee", Icon: Coffee, note: "Coffee earns a spot on my desk." },
];
export function Archive() {
  return (
    <section id="experience" className="dark">
      <div className="section wrap">
        <p className="eyebrow">Career archive / Reading view</p>
        <h2>
          Field <em>notes.</em>
        </h2>
        <div className="timeline">
          {experience.map(([date, company, role, copy], i) => (
            <details key={company} open={i === 0}>
              <summary>
                <span className="mono">{date}</span>
                <span>
                  <strong>{company}</strong>
                  <small>{role}</small>
                </span>
                <Plus />
              </summary>
              <p>
                {i === 0
                  ? "Circuit Makati. "
                  : i === 1
                    ? "Mandaluyong City. "
                    : ""}
                {copy}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
export function About() {
  const [pick, setPick] = useState(0);
  return (
    <section id="about" className="wrap section about">
      <figure>
        <img
          src="/hero%201x1.jpg"
          alt="Portrait of Hero Jhoey B. Retuerma"
          width="400"
          height="400"
          loading="lazy"
        />
        <figcaption className="mono">HJBR / Makati City, PH</figcaption>
      </figure>
      <div>
        <p className="eyebrow">Behind the keyboard</p>
        <h2>
          Hi, I’m <em>Hero.</em>
        </h2>
        <p>
          I like the moment a bug starts making sense. That curiosity has taken
          me from training a model to spot synthetic speech to testing a Flutter
          app with a team in Korea.
        </p>
        <p>
          These days I work in backend support. Whether I’m tracing a ticket or
          building an interface, I keep coming back to the same question. What
          does the person on the other side need?
        </p>
        <div className="desk-shelf">
          <span className="eyebrow">Off the keyboard</span>
          <div>
            {deskObjects.map(({ Icon, label }, i) => (
              <button
                key={label}
                aria-pressed={pick === i}
                aria-label={label}
                onClick={() => setPick(i)}
              >
                <Icon />
              </button>
            ))}
          </div>
          <p aria-live="polite">{deskObjects[pick].note}</p>
        </div>
        <details>
          <summary>
            Education <Plus size={17} />
          </summary>
          <p>
            BS in Computer Science · EARIST, 2022–2026. GWA 1.4, academic
            achiever from first through fourth year. My capstone explored
            deepfake audio detection.
          </p>
          <p>Senior High School · STEM strand, Makati City.</p>
        </details>
      </div>
    </section>
  );
}
export function Credentials() {
  return (
    <section id="certifications" className="wrap section">
      <p className="eyebrow">Credential collection</p>
      <h2>
        Certifications <em>& training.</em>
      </h2>
      <div className="credential-shelf">
        <details>
          <summary>
            <i className="credential-seal" aria-hidden="true"><Cpu /></i>
            <span>
              CompTIA A+ <small>Certification · 2026</small>
            </span>
            <Plus />
          </summary>
          <p>
            Foundations of hardware, networking, operating systems and IT
            troubleshooting.
          </p>
        </details>
        <details>
          <summary>
            <i className="credential-seal" aria-hidden="true"><Headset /></i>
            <span>
              Infosys BGC IT Helpdesk{" "}
              <small>Trainee & IT internship · 2026</small>
            </span>
            <Plus />
          </summary>
          <p>
            IT service desk and helpdesk training through Infosys BPM Limited’s
            SKIPP program.
          </p>
        </details>
      </div>
    </section>
  );
}
