import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { collect } from "./Passport";
import { profile, projects } from "../data/portfolio";

const studies: Record<string, [string[], string]> = {
  audio: [
    ["Audio upload", "Flask API", "Hybrid model"],
    "How well does a model trained on one set of voices generalize to unfamiliar recordings?",
  ],
  map: [
    ["Resident report", "Role-based access", "Admin updates"],
    "Can a resident follow an issue while administrative actions stay restricted to the right role?",
  ],
  steps: [
    ["Family routine", "Flutter interface", "Firebase storage"],
    "Does a task survive reopening the app, and can a parent edit it from another device?",
  ],
  dental: [
    ["Clinic tasks", "Visual Basic UI", ".NET desktop app"],
    "Which actions should a clinic user be able to reach in a single step?",
  ],
  type: [
    ["Career data", "React exhibits", "Static deployment"],
    "Can every exhibit still be explored with a keyboard and reduced motion?",
  ],
};
function Cover({ art, dial }: { art: string; dial: number }) {
  return (
    <svg
      className={"cover " + art}
      viewBox="0 0 600 270"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="graph"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M20 0H0v20"
            stroke="currentColor"
            opacity=".13"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="600" height="270" fill="url(#graph)" />
      {art === "audio" && (
        <g fill="none" stroke="currentColor">
          {Array.from({ length: 36 }, (_, i) => {
            const points = Array.from({ length: 141 }, (_, k) => {
              const x = k * 4.4 - 8,
                a = Math.exp(-((x - 285 - i * 2) ** 2) / 9700);
              return (
                x.toFixed(1) +
                "," +
                (
                  64 +
                  i * 4.1 +
                  Math.sin(x / 32 + i * 0.15 + dial / 16) *
                    a *
                    (56 + 12 * Math.cos(i * 0.17))
                ).toFixed(1)
              );
            });
            return <polyline key={i} points={points.join(" ")} />;
          })}
        </g>
      )}
      {art === "map" && (
        <g
          transform={`translate(296 126) rotate(${-28 + dial / 2})`}
          stroke="currentColor"
          fill="none"
        >
          {Array.from({ length: 35 }, (_, i) => (
            <rect
              key={i}
              x={((i % 7) - 3) * 69}
              y={(Math.floor(i / 7) - 2) * 53}
              width="57"
              height="40"
              rx="4"
            />
          ))}
          <path d="M-169 100V-6H110v-53" strokeWidth="7" />
          <circle cx="110" cy="-59" r="13" fill="currentColor" />
        </g>
      )}
      {art === "steps" && (
        <g fill="none" stroke="currentColor" strokeWidth="4">
          {Array.from({ length: 9 }, (_, i) => (
            <path
              key={i}
              d={`M${35 + i * 12} 260v-45h65v-58h65V99h65V41h65v-62`}
              transform={`translate(${i * (15 + dial / 10)} 0)`}
            />
          ))}
        </g>
      )}
      {art === "dental" && (
        <g stroke="currentColor" fill="none">
          {Array.from({ length: 18 }, (_, i) => (
            <path
              key={i}
              transform={`translate(${175 + i * (4 + dial / 40)} ${40 + i * 2}) scale(.9)`}
              d="M77 30C2-14-10 65 20 111c12 19 12 77 35 76 17-2 11-69 34-65s13 73 37 64c17-7 16-54 28-79C193 40 169-8 108 18L77 30Z"
            />
          ))}
        </g>
      )}
      {art === "type" && (
        <text
          x="300"
          y="196"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="Georgia,serif"
          fontStyle="italic"
          fontSize={175 + dial}
          letterSpacing="-17"
        >
          HJBR.
        </text>
      )}
    </svg>
  );
}

export default function Work() {
  const [index, setIndex] = useState(0);
  const item = projects[index];
  const [dial, setDial] = useState(0);
  return (
    <section className="section wrap" id="work">
      <p className="eyebrow">The project exhibition</p>
      <div className="section-title">
        <h2>
          Exhibition <em>hall.</em>
        </h2>
        <div className="pager">
          <button
            aria-label="Previous project"
            onClick={() =>
              setIndex((index + projects.length - 1) % projects.length)
            }
          >
            <ChevronLeft />
          </button>
          <span className="mono" aria-live="polite">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
          <button
            aria-label="Next project"
            onClick={() => setIndex((index + 1) % projects.length)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="work-layout">
        <div className="project-index" aria-label="Choose a project">
          {projects.map((p, i) => (
            <button
              aria-pressed={index === i}
              key={p.art}
              onClick={() => setIndex(i)}
            >
              <small>0{i + 1}</small>
              <span>{p.title}</span>
              <ArrowUpRight size={18} />
            </button>
          ))}
        </div>
        <article key={item.art} className="project">
          <figure className="exhibit-mount">
            <div className="mount-label">
              <span>HJBR COLLECTION</span>
              <span>EXHIBIT 0{index + 1}</span>
            </div>
            <Cover art={item.art} dial={dial} />
            <figcaption>
              <label>
                Art study{" "}
                <input
                  aria-label="Adjust exhibit artwork"
                  type="range"
                  min="0"
                  max="60"
                  value={dial}
                  onChange={(e) => setDial(+e.target.value)}
                />
              </label>
              <small>Interactive illustration</small>
            </figcaption>
          </figure>
          <div className="project-body">
            <p className="eyebrow">
              {item.category} / {item.year}
            </p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="tags">
              {item.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <details
              onToggle={(e) => {
                if (e.currentTarget.open) collect("project");
              }}
            >
              <summary>
                Project notes <Plus size={17} />
              </summary>
              <p>{item.notes}</p>
              <div className="project-chain">
                {studies[item.art][0].map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
              <p>
                <b>Design question</b>
                <br />
                {studies[item.art][1]}
              </p>
            </details>
            <a className="textlink" href={profile.github + "/" + item.repo}>
              View repository <ArrowUpRight size={15} />
            </a>
            {item.demo && (
              <a className="textlink" href={item.demo}>
                Published portfolio <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
