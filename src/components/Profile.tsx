import { useState } from "react";
import { Plus, RotateCcw } from "lucide-react";
import { experience, toolbox } from "../data/portfolio";

export default function Profile() {
  const [category, setCategory] = useState("Web");
  return (
    <>
      <section id="experience" className="dark">
        <div className="section wrap">
          <p className="eyebrow">02 / Field notes</p>
          <h2>
            Working <em>experience.</em>
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
                <p>{copy}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
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
          <p className="eyebrow">03 / Behind the keyboard</p>
          <h2>
            Hi, I’m <em>Hero.</em>
          </h2>
          <p>
            I like the moment a bug starts making sense. That curiosity has
            taken me from training a model to spot synthetic speech to testing a
            Flutter app with a team in Korea.
          </p>
          <p>
            These days I work in backend support. Whether I’m tracing a ticket
            or building an interface, I keep coming back to the same question.
            What does the person on the other side need?
          </p>
          <p>Off the keyboard, it’s music, games and a good cup of coffee.</p>
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
      <section id="toolbox" className="tool-section">
        <div className="section wrap">
          <p className="eyebrow">04 / Technology playground</p>
          <h2>
            Inside my <em>toolbox.</em>
          </h2>
          <div className="tool-panel">
            <div
              className="tool-select"
              role="group"
              aria-label="Technology category"
            >
              {Object.keys(toolbox).map((k) => (
                <button
                  key={k}
                  aria-pressed={k === category}
                  onClick={() => setCategory(k)}
                >
                  {k}
                </button>
              ))}
              <button
                title="Reset to Web"
                aria-label="Reset to Web"
                onClick={() => setCategory("Web")}
              >
                <RotateCcw size={16} />
              </button>
            </div>
            <ul
              key={category}
              className="tools"
              aria-label={category + " tools"}
            >
              {toolbox[category].map((t, i) => (
                <li key={t} style={{ animationDelay: i * 15 + "ms" }}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <details>
            <summary>
              Read the full technology list <Plus size={17} />
            </summary>
            {Object.entries(toolbox).map(([k, list]) => (
              <p key={k}>
                <b>{k}</b> · {list.join(", ")}
              </p>
            ))}
          </details>
        </div>
      </section>
      <section id="certifications" className="wrap section">
        <p className="eyebrow">05 / Credentials</p>
        <h2>
          Certifications <em>& training.</em>
        </h2>
        <details>
          <summary>
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
      </section>
    </>
  );
}
