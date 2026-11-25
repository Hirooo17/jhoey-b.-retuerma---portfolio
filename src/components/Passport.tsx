import { useSyncExternalStore } from "react";
const names = {
  map: "Both city stops",
  project: "Exhibition notes",
  tools: "Tool tinkerer",
  lab: "Lab visitor",
  secret: "Hidden transmission",
};
type Stamp = keyof typeof names;
const key = "hjbr-atlas-stamps-v1";
const listeners = new Set<() => void>();
function read(): Stamp[] {
  try {
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(stored)
      ? (Object.keys(names).filter((k) => stored.includes(k)) as Stamp[])
      : [];
  } catch {
    return [];
  }
}
let stamps = read();
const visitedStops = new Set<number>();
export function recordStop(index: number) {
  visitedStops.add(index);
  if (visitedStops.size === 2) collect("map");
}
function reset() {
  visitedStops.clear();
  save([]);
}
function save(next: Stamp[]) {
  stamps = next;
  try {
    localStorage.setItem(key, JSON.stringify(next));
  } catch {
    /* Session-only when storage is unavailable. */
  }
  listeners.forEach((fn) => fn());
}
export function collect(stamp: Stamp) {
  if (!stamps.includes(stamp)) save([...stamps, stamp]);
}
function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
export default function Passport() {
  const list = useSyncExternalStore(subscribe, () => stamps);
  return (
    <div className="passport">
      <div>
        <span className="eyebrow">Your field passport</span>
        <strong aria-live="polite">{list.length} / 5 discovered</strong>
      </div>
      <ul>
        {Object.entries(names).map(([k, label]) => (
          <li key={k} className={list.includes(k as Stamp) ? "earned" : ""}>
            {list.includes(k as Stamp) ? "✦" : "◇"} {label}
          </li>
        ))}
      </ul>
      <button onClick={reset} disabled={!list.length}>
        Reset stamps
      </button>
    </div>
  );
}
