import { useMemo, useState } from "react";
import { Terminal, Shuffle } from "lucide-react";
import { collect } from "./Passport";
import { profile, projects } from "../data/portfolio";

const commands: Record<string, string> = {
  help: "Commands: help, about, skills, projects, experience, contact, clear, surprise",
  about:
    "Hero Jhoey B. Retuerma · Software developer · Makati City, Philippines.",
  skills:
    "Flutter / React / Python / QA automation / backend support. Open the tool tray for the complete inventory.",
  projects: projects.map((p) => p.title).join(" · "),
  experience:
    "Circuit Makati → PLDT Service Care. Mandaluyong → Withcenter Inc. Archive → Infosys BPM.",
  contact: profile.email,
  surprise:
    "✦ Hidden transmission received. A tiny city fits inside this terminal.",
};
function Console() {
  const [input, setInput] = useState(""),
    [history, setHistory] = useState<string[]>([
      "HJBR field console ready. Type help to see commands.",
    ]);
  function run(raw: string) {
    const command = raw.trim().toLowerCase();
    if (!command) return;
    collect("lab");
    if (command === "surprise") collect("secret");
    setHistory((h) =>
      command === "clear"
        ? []
        : [
            ...h.slice(-12),
            "› " + command,
            Object.hasOwn(commands, command)
              ? commands[command]
              : "Unknown command. Try help.",
          ],
    );
    setInput("");
  }
  return (
    <div className="terminal-box">
      <div className="lab-head">
        <Terminal size={16} /> Field console <span>LOCAL</span>
      </div>
      <div
        className="console-log"
        ref={(node) => {
          if (node) node.scrollTop = node.scrollHeight;
        }}
        role="log"
        aria-label="Terminal output"
      >
        {history.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
        }}
      >
        <label htmlFor="cmd">hjbr ›</label>
        <input
          id="cmd"
          autoComplete="off"
          aria-label="Terminal command"
          placeholder="help"
          value={input}
          maxLength={60}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>Run ↵</button>
      </form>
      <div className="command-keys">
        {["help", "projects", "clear"].map((k) => (
          <button key={k} onClick={() => run(k)}>
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}
function PrintPress() {
  const [lobes, setLobes] = useState(5),
    [twist, setTwist] = useState(32);
  const curves = useMemo(
    () =>
      Array.from({ length: 24 }, (_, j) =>
        Array.from({ length: 361 }, (_, i) => {
          const a = (i * Math.PI) / 180,
            r = 65 + 24 * Math.cos(lobes * a + (j * twist) / 420) + j * 0.6;
          return (
            (155 + r * Math.cos(a)).toFixed(1) +
            "," +
            (112 + r * Math.sin(a)).toFixed(1)
          );
        }).join(" "),
      ),
    [lobes, twist],
  );
  return (
    <div className="press-box">
      <div className="lab-head">
        Guilloché press{" "}
        <span>
          STUDY / {lobes}.{twist}
        </span>
      </div>
      <svg
        viewBox="0 0 310 224"
        role="img"
        aria-label={"Generated line engraving with " + lobes + " lobes"}
      >
        <g fill="none" stroke="currentColor" strokeWidth=".85">
          {curves.map((p, i) => (
            <polyline key={i} points={p} />
          ))}
        </g>
      </svg>
      <div className="press-controls">
        <label>
          Lobes <output>{lobes}</output>
          <input
            aria-label="Lobes"
            type="range"
            min="2"
            max="10"
            value={lobes}
            onChange={(e) => {
              setLobes(+e.target.value);
              collect("lab");
            }}
          />
        </label>
        <label>
          Twist <output>{twist}</output>
          <input
            aria-label="Twist"
            type="range"
            min="1"
            max="80"
            value={twist}
            onChange={(e) => {
              setTwist(+e.target.value);
              collect("lab");
            }}
          />
        </label>
        <button
          aria-label="Generate another engraving"
          onClick={() => {
            setLobes((v) => (v === 10 ? 2 : v + 1));
            setTwist((v) => (v % 69) + 11);
            collect("lab");
          }}
        >
          <Shuffle size={17} />
        </button>
      </div>
    </div>
  );
}
export default function Lab() {
  return (
    <div className="lab-pair">
      <PrintPress />
      <Console />
    </div>
  );
}
