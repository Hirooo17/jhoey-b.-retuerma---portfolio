import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { collect } from "./Passport";
import { toolbox } from "../data/portfolio";

const prompts: Record<string, string> = {
  React:
    "Components and state connect these atlas controls to the city illustration.",
  TypeScript:
    "Types keep the data shared by controls, projects and panels consistent.",
  Flutter:
    "The framework used for GoParent and the Withcenter BPO mobile application.",
  Dart: "The language behind Flutter widgets and application logic.",
  Python: "Used in the synthetic voice detection capstone.",
  TensorFlow: "Part of the deep learning stack in the audio capstone.",
  Playwright:
    "Drives the browser tests for this portfolio, including touch and keyboard checks.",
  Selenium: "A browser automation tool in my QA toolkit.",
};
const context: Record<string, string> = {
  Web: "Web application development",
  Mobile: "Cross-platform application development",
  Data: "Data and machine learning",
  Quality: "Quality assurance and verification",
  Support: "Technical support and service operations",
};
export default function StickerTray() {
  const [category, setCategory] = useState("Web"),
    [paused, setPaused] = useState(
      () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  const [generation, setGeneration] = useState(0),
    [picked, setPicked] = useState("");
  const box = useRef<HTMLDivElement>(null),
    pause = useRef(paused);
  const control = useRef<{
    hold: (i: number, x: number, y: number) => void;
    move: (x: number, y: number) => void;
    release: () => void;
    wake: () => void;
  } | null>(null);
  const labels = toolbox[category].slice(0, 6);
  useEffect(() => {
    pause.current = paused;
    control.current?.wake();
  }, [paused]);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let disposed = false,
      teardown = () => {};
    const target = el;
    async function start() {
      const { Engine, Bodies, Composite, Body, Constraint, Sleeping } =
        await import("matter-js");
      if (disposed) return;
      const buttons = Array.from(target.querySelectorAll("button"));
      const engine = Engine.create({ enableSleeping: true });
      engine.gravity.y = 0.7;
      let raf = 0,
        last = 0,
        active = false,
        w = 0,
        h = 0;
      let bodies: ReturnType<typeof Bodies.rectangle>[] = [];
      let grip: ReturnType<typeof Constraint.create> | null = null;
      function draw() {
        bodies.forEach((b, i) => {
          const node = buttons[i];
          node.style.transform = `translate(${b.position.x - node.offsetWidth / 2}px,${b.position.y - node.offsetHeight / 2}px) rotate(${b.angle}rad)`;
        });
      }
      function tick(now: number) {
        raf = 0;
        if (!active || pause.current || document.hidden) return;
        Engine.update(
          engine,
          Math.min(1000 / 60, last ? now - last : 1000 / 60),
        );
        last = now;
        draw();
        if (grip || bodies.some((b) => !b.isSleeping))
          raf = requestAnimationFrame(tick);
      }
      function wake() {
        if (active && !raf && !pause.current && !document.hidden) {
          last = 0;
          raf = requestAnimationFrame(tick);
        }
      }
      function layout() {
        const width = target.clientWidth,
          height = target.clientHeight;
        if (width === w && height === h) return;
        w = width;
        h = height;
        grip = null;
        Composite.clear(engine.world, false);
        Engine.clear(engine);
        target.classList.add("simulated");
        const cols = w < 420 ? 2 : 3;
        bodies = buttons.map((node, i) =>
          Bodies.rectangle(
            (((i % cols) + 0.5) * w) / cols,
            40 + Math.floor(i / cols) * 65,
            node.offsetWidth,
            node.offsetHeight,
            {
              chamfer: { radius: 7 },
              restitution: 0.48,
              friction: 0.5,
              angle: ((i % 3) - 1) * 0.07,
            },
          ),
        );
        const wall = { isStatic: true };
        Composite.add(engine.world, [
          ...bodies,
          Bodies.rectangle(w / 2, h + 20, w + 80, 40, wall),
          Bodies.rectangle(-20, h / 2, 40, h + 80, wall),
          Bodies.rectangle(w + 20, h / 2, 40, h + 80, wall),
          Bodies.rectangle(w / 2, -20, w + 80, 40, wall),
        ]);
        draw();
        wake();
      }
      control.current = {
        hold(i, x, y) {
          if (!bodies[i]) return;
          this.release();
          const b = bodies[i];
          Sleeping.set(b, false);
          grip = Constraint.create({
            pointA: { x, y },
            bodyB: b,
            length: 0,
            stiffness: 0.15,
            damping: 0.12,
          });
          Composite.add(engine.world, grip);
          wake();
        },
        move(x, y) {
          if (!grip) return;
          grip.pointA = {
            x: Math.min(w - 20, Math.max(20, x)),
            y: Math.min(h - 20, Math.max(20, y)),
          };
          if (pause.current) {
            Body.setPosition(grip.bodyB!, grip.pointA);
            Body.setVelocity(grip.bodyB!, { x: 0, y: 0 });
            draw();
          }
          wake();
        },
        release() {
          if (grip) {
            Composite.remove(engine.world, grip);
            grip = null;
          }
          wake();
        },
        wake,
      };
      const io = new IntersectionObserver(([entry]) => {
        active = entry.isIntersecting;
        wake();
      });
      io.observe(target);
      const ro = new ResizeObserver(layout);
      ro.observe(target);
      layout();
      document.addEventListener("visibilitychange", wake);
      teardown = () => {
        active = false;
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", wake);
        control.current = null;
        Composite.clear(engine.world, false);
        Engine.clear(engine);
        target.classList.remove("simulated");
        buttons.forEach((b) => b.style.removeProperty("transform"));
      };
    }
    start().catch(() => {});
    return () => {
      disposed = true;
      teardown();
    };
  }, [category, generation]);
  const pick = (s: string) => {
    setPicked(s);
    collect("tools");
  };
  return (
    <>
      <div className="tool-panel toy-panel">
        <div
          className="tool-select"
          role="group"
          aria-label="Technology category"
        >
          {Object.keys(toolbox).map((k) => (
            <button
              key={k}
              aria-pressed={k === category}
              onClick={() => {
                setCategory(k);
                setPicked("");
              }}
            >
              {k}
            </button>
          ))}
          <button
            aria-label="Reset to Web"
            title="Reset tray"
            onClick={() => {
              setCategory("Web");
              setPicked("");
              setGeneration((g) => g + 1);
            }}
          >
            <RotateCcw size={16} />
          </button>
        </div>
        <div className="tray-bar">
          <span>Drag a key. Tap to inspect.</span>
          <button onClick={() => setPaused(!paused)}>
            {paused ? <Play size={14} /> : <Pause size={14} />}{" "}
            {paused ? "Resume gravity" : "Pause gravity"}
          </button>
        </div>
        <div key={category} className="tools sticker-tray" ref={box}>
          {labels.map((s, i) => (
            <button
              key={s}
              className={"keycap tone-" + (i % 3)}
              onClick={() => pick(s)}
              onPointerDown={(e) => {
                const rect = box.current!.getBoundingClientRect();
                e.currentTarget.setPointerCapture(e.pointerId);
                control.current?.hold(
                  i,
                  e.clientX - rect.left,
                  e.clientY - rect.top,
                );
                pick(s);
              }}
              onPointerMove={(e) => {
                if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
                const rect = box.current!.getBoundingClientRect();
                control.current?.move(
                  e.clientX - rect.left,
                  e.clientY - rect.top,
                );
              }}
              onLostPointerCapture={() => control.current?.release()}
            >
              <small>KEY / 0{i + 1}</small>
              {s}
            </button>
          ))}
        </div>
        <div className="key-info" aria-live="polite">
          {picked ? (
            <>
              <b>{picked}</b> · {prompts[picked] || context[category]}
            </>
          ) : (
            <>
              <b>{category} tray</b> · {labels.length} movable keys
            </>
          )}
        </div>
      </div>
      <details>
        <summary>
          Read the full technology list <span>＋</span>
        </summary>
        {Object.entries(toolbox).map(([k, list]) => (
          <p key={k}>
            <b>{k}</b> · {list.join(", ")}
          </p>
        ))}
      </details>
    </>
  );
}
