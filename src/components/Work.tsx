import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { exhibits, notebookUrl } from "../data/exhibition";
import { profile } from "../data/portfolio";
import { collect } from "./Passport";
import ExhibitStage from "./ExhibitStage";
export default function Work({ onStudy }: { onStudy: (i: number) => void }) {
  const [index, setIndex] = useState(0);
  const item = exhibits[index];
  return (
    <section id="work" className="wrap section exhibition">
      <div className="exhibition-heading">
        <div>
          <p className="eyebrow">Project exhibition / Six installations</p>
          <h2>
            On <em>display.</em>
          </h2>
        </div>
        <div className="pager">
          <button
            aria-label="Previous project"
            onClick={() =>
              setIndex((index + exhibits.length - 1) % exhibits.length)
            }
          >
            <ChevronLeft />
          </button>
          <span className="mono" aria-live="polite">
            0{index + 1} / 06
          </span>
          <button
            aria-label="Next project"
            onClick={() => setIndex((index + 1) % exhibits.length)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="gallery-floor">
        <aside className="gallery-directory" aria-label="Exhibit directory">
          {exhibits.map((p, i) => (
            <button
              key={p.art}
              aria-pressed={index === i}
              onClick={() => setIndex(i)}
            >
              <small>0{i + 1}</small>
              <span>{p.title}</span>
            </button>
          ))}
        </aside>
        <article
          className={"project gallery-installation exhibition-" + item.art}
          key={item.art}
        >
          <ExhibitStage art={item.art} />
          <div className="gallery-label">
            <p className="eyebrow">
              {item.category} · {item.year}
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
                Project notes <Plus size={16} />
              </summary>
              <p>{item.notes}</p>
            </details>
            <div className="gallery-actions">
              <a
                className="study-link"
                href={notebookUrl(index).href}
                onClick={(event) => {
                  if (
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey ||
                    event.altKey
                  )
                    return;
                  event.preventDefault();
                  onStudy(index);
                  collect("project");
                }}
              >
                Enter case study ↓
              </a>
              {item.repo && (
                <a href={profile.github + "/" + item.repo}>
                  View repository <ArrowUpRight size={14} />
                </a>
              )}
              {item.demo && (
                <a href={item.demo}>
                  Open live site <ArrowUpRight size={14} />
                </a>
              )}
              {item.art === "commission" && (
                <a href="#commission">Contract brief ↗</a>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
