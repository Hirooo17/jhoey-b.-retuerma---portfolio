import { useCallback, useEffect, useRef, useState } from "react";
import {
  Plus,
  Minus,
  Scan,
  Navigation2,
  Route,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { City, stationPoint, stops } from "./City";
import { recordStop } from "./Passport";
import { experience } from "../data/portfolio";

const center = { x: 400, y: 190, z: 1 };
export default function Atlas() {
  const [camera, setCamera] = useState(center);
  const [selection, setSelection] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(true);
  const [tour, setTour] = useState(false);
  const frame = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const drag = useRef<{
    id: number;
    x: number;
    y: number;
    start: typeof center;
  } | null>(null);
  const select = useCallback((i: number) => {
    setSelection(i);
    const [x, y] = stationPoint(i);
    setCamera({ x: x + 15, y: y + 28, z: 1.75 });
    recordStop(i);
  }, []);
  const stopTour = () => {
    clearTimeout(timer.current);
    setTour(false);
  };
  function visit(i: number) {
    stopTour();
    select(i);
  }
  function reset() {
    stopTour();
    setCamera(center);
    setSelection(null);
  }
  function follow() {
    stopTour();
    select(0);
    setCamera({ x: 420, y: 163, z: 1.2 });
    setTour(true);
    timer.current = setTimeout(() => {
      select(1);
      setTour(false);
    }, 2200);
  }
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (frame.current) io.observe(frame.current);
    return () => {
      io.disconnect();
      clearTimeout(timer.current);
    };
  }, []);
  function shift(x: number, y: number) {
    setCamera((c) => ({
      ...c,
      x: Math.min(690, Math.max(110, x)),
      y: Math.min(320, Math.max(60, y)),
    }));
  }
  function zoom(d: number) {
    stopTour();
    setCamera((c) => ({
      ...c,
      z: Math.max(1, Math.min(2.6, +(c.z + d).toFixed(2))),
    }));
  }
  const job = selection === null ? null : experience[selection === 0 ? 1 : 0];
  return (
    <figure
      className={"atlas" + (visible ? " in-view" : "")}
      id="atlas"
      ref={frame}
    >
      <figcaption className="plate-head">
        <span>
          <i /> Interactive career atlas
        </span>
        <span>DRAG TO PAN</span>
      </figcaption>
      <div className="atlas-viewport">
        <span className="north" aria-hidden="true">
          <Navigation2 size={19} />N
        </span>
        <svg
          viewBox="0 -40 800 460"
          className={"atlas-art" + (dragging ? " dragging" : "")}
          aria-label="Stylized Metro Manila career map. Drag to pan or use the arrow keys."
          role="group"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.target !== e.currentTarget) return;
            const v = {
              ArrowLeft: [-30, 0],
              ArrowRight: [30, 0],
              ArrowUp: [0, -24],
              ArrowDown: [0, 24],
            }[e.key];
            if (v) {
              e.preventDefault();
              shift(camera.x + v[0], camera.y + v[1]);
            }
          }}
          onPointerDown={(e) => {
            if (
              e.button !== 0 ||
              (e.target as Element).closest(".city-stop,.map-pin")
            )
              return;
            stopTour();
            drag.current = {
              id: e.pointerId,
              x: e.clientX,
              y: e.clientY,
              start: camera,
            };
            e.currentTarget.setPointerCapture(e.pointerId);
            setDragging(true);
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d || d.id !== e.pointerId) return;
            const scale = (e.currentTarget.getScreenCTM()?.a || 1) * d.start.z;
            shift(
              d.start.x - (e.clientX - d.x) / scale,
              d.start.y - (e.clientY - d.y) / scale,
            );
          }}
          onLostPointerCapture={() => {
            drag.current = null;
            setDragging(false);
          }}
        >
          <g
            className="camera"
            style={{
              transform: `translate(${400 - camera.x * camera.z}px,${190 - camera.y * camera.z}px) scale(${camera.z})`,
            }}
          >
            <City selected={selection} onSelect={visit} touring={tour} />
          </g>
        </svg>
        <div className="map-controls">
          <button
            aria-label="Zoom in"
            disabled={camera.z >= 2.6}
            onClick={() => zoom(0.3)}
          >
            <Plus />
          </button>
          <button
            aria-label="Zoom out"
            disabled={camera.z <= 1}
            onClick={() => zoom(-0.3)}
          >
            <Minus />
          </button>
          <button
            aria-label="Map overview"
            title="Map overview"
            onClick={reset}
          >
            <Scan />
          </button>
        </div>
      </div>
      <div className="map-directory" aria-label="Career locations">
        {stops.map((s, i) => (
          <button
            key={s.name}
            aria-pressed={selection === i}
            onClick={() => visit(i)}
          >
            <b>0{i + 1}</b> {s.name}
          </button>
        ))}
        <button onClick={tour ? stopTour : follow}>
          <Route size={15} />
          {tour ? "Stop tour" : "Trace route"}
        </button>
      </div>
      <div className="map-card" aria-live="polite">
        {job && selection !== null ? (
          <>
            <div className="station-top">
              <span className="eyebrow">
                {stops[selection].name} · {job[0]}
              </span>
              <div>
                <button
                  aria-label="Previous milestone"
                  onClick={() => visit(1 - selection)}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  aria-label="Next milestone"
                  onClick={() => visit(1 - selection)}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <h3>{job[1]}</h3>
            <strong>{job[2]}</strong>
            <p>{job[3]}</p>
            <div className="station-links">
              <span>
                {selection === 0
                  ? "Flutter · QA · Backend security"
                  : "Ticketing · Troubleshooting · Service desk"}
              </span>
              <a href={selection === 0 ? "#commission" : "#experience"}>
                {selection === 0 ? "Open project brief" : "Read field notes"} ↗
              </a>
            </div>
          </>
        ) : (
          <>
            <span className="atlas-key">
              <i /> Career route
            </span>
            <span>Stylized Metro Manila · symbolic route</span>
          </>
        )}
      </div>
    </figure>
  );
}
