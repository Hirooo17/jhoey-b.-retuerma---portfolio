import { useRef, useState } from "react";
import { Code2, Activity, CheckCheck, RotateCcw } from "lucide-react";

const modes = [
  {
    label: "Build",
    Icon: Code2,
    status: "Compiler ready",
    screen: "HELLO, WORLD!",
  },
  {
    label: "Test",
    Icon: CheckCheck,
    status: "Checks passed",
    screen: "TESTS PASSED",
  },
  {
    label: "Support",
    Icon: Activity,
    status: "Signal online",
    screen: "SIGNAL ONLINE",
  },
];

function PixelFace({ mode }: { mode: number }) {
  return (
    <g fill="#f4c188">
      {mode === 2 ? (
        <path
          d="M82 111h18l9-22 14 49 13-61 14 43 7-9h26"
          fill="none"
          stroke="#f4c188"
          strokeWidth="5"
        />
      ) : (
        <>
          <path
            d={
              mode === 1
                ? "M91 103l9 9 17-20 M145 103l9 9 17-20"
                : "M99 94h11v17H99z M149 94h11v17h-11z"
            }
            stroke="#f4c188"
            fill={mode === 1 ? "none" : undefined}
            strokeWidth="4"
          />
          <path
            d="M104 125v7h10v6h32v-6h10v-7"
            fill="none"
            stroke="#f4c188"
            strokeWidth="6"
          />
        </>
      )}
    </g>
  );
}

function Machine({ mode }: { mode: number }) {
  return (
    <svg
      viewBox="0 0 470 362"
      role="img"
      aria-label={
        "Illustrated desktop computer displaying " + modes[mode].screen
      }
    >
      <defs>
        <linearGradient
          id="case"
          x2=".8"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop stopColor="#f3ddba" />
          <stop offset=".65" stopColor="#dfbf96" />
          <stop offset="1" stopColor="#c79a72" />
        </linearGradient>
        <linearGradient id="side" x2="1" y2="1">
          <stop stopColor="#ba906d" />
          <stop offset="1" stopColor="#946b51" />
        </linearGradient>
        <radialGradient id="glass">
          <stop stopColor="#664435" />
          <stop offset="1" stopColor="#332923" />
        </radialGradient>
        <pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse">
          <path d="M0 0h4" stroke="#ddad7c" opacity=".13" />
        </pattern>
        <filter id="shadow" x="-35%" y="-100%" width="170%" height="300%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <ellipse
        cx="237"
        cy="298"
        rx="143"
        ry="17"
        fill="#785337"
        opacity=".24"
        filter="url(#shadow)"
      />
      <g fill="none" stroke="#a88d72" strokeWidth=".8" aria-hidden="true">
        <path d="M59 142h29l19 14M351 99l18-16h33" />
        <circle cx="108" cy="157" r="2.3" />
        <circle cx="350" cy="100" r="2.3" />
      </g>
      <g
        fontFamily="monospace"
        fontSize="8"
        letterSpacing=".8"
        fill="#765e48"
        aria-hidden="true"
      >
        <text x="57" y="137">
          CRT
        </text>
        <text x="368" y="78">
          SHELL
        </text>
      </g>
      <g
        transform="matrix(.97 .215 0 1 85 31)"
        stroke="#674834"
        strokeWidth="1.7"
        strokeLinejoin="round"
      >
        <path d="M50 208l48-32 161 2-49 33z" fill="#eedabb" />
        <path d="M50 208l160 3v12l-160-3z" fill="#b18c68" />
        <path d="M210 211l49-33v12l-49 33z" fill="#926d52" />
        <path d="M80 180l104 1-2 22-9 6-93-2z" fill="#a37e5d" />
        <path d="M79 182l94 3v24l-94-2z" fill="url(#case)" />
        <path
          d="M27 43q0-6 6-9l48-32q4-3 11-3l165 1q10 0 10 10v144q0 6-6 10l-43 31-9-149z"
          fill="url(#side)"
        />
        <path d="M31 35l48-32q4-4 12-4l165 1q7 0 9 5l-51 38z" fill="#f1daba" />
        <rect
          x="25"
          y="34"
          width="195"
          height="167"
          rx="10"
          fill="url(#case)"
        />
        <rect x="37" y="45" width="169" height="125" rx="12" fill="#c4a17c" />
        <path
          d="M46 55q2-5 12-5h127q12 0 13 11l-3 90q-1 9-12 10H58q-12 0-13-10z"
          fill="url(#glass)"
          stroke="#79583f"
          strokeWidth="4"
        />
        <path
          d="M47 58q42-12 140-4l-137 48z"
          fill="#fff2d9"
          opacity=".06"
          stroke="none"
        />
        <g transform="translate(-6 -12)" stroke="none">
          <PixelFace mode={mode} />
        </g>
        <text
          x="121"
          y="147"
          textAnchor="middle"
          fill="#f7ce95"
          stroke="none"
          fontFamily="monospace"
          fontSize="9"
          letterSpacing="2"
        >
          {modes[mode].screen}
        </text>
        <rect
          x="48"
          y="54"
          width="145"
          height="102"
          rx="8"
          fill="url(#scan)"
          stroke="none"
        />
        <rect x="40" y="178" width="29" height="10" rx="2" fill="#f4dfbd" />
        <path d="M45 185v-5m4 5v-5m4 5v-5m4 5v-5" strokeWidth="2" />
        <circle cx="153" cy="184" r="3" fill="#9fa16d" />
        <rect x="166" y="180" width="37" height="5" rx="2" fill="#6d503d" />
        {Array.from({ length: 10 }, (_, i) => (
          <path
            key={i}
            d={`M229 ${93 + i * 5}l27-19`}
            stroke="#73533f"
            strokeWidth="2.4"
          />
        ))}
        <path
          d="M222 192q60 18 18 35t16 19"
          fill="none"
          stroke="#765740"
          strokeWidth="3"
        />
        <g transform="matrix(1 0 -.82 .72 20 232)">
          <rect width="184" height="60" y="5" rx="5" fill="#ad8865" />
          <rect width="184" height="59" rx="4" fill="url(#case)" />
          {Array.from({ length: 40 }, (_, i) => (
            <rect
              key={i}
              x={7 + (i % 10) * 17.1}
              y={5 + Math.floor(i / 10) * 10.5}
              width="13.6"
              height="7.8"
              rx="1.4"
              fill={i === 29 ? "#ba7552" : "#eed5af"}
              strokeWidth=".9"
            />
          ))}
          <rect
            x="48"
            y="47"
            width="82"
            height="7"
            rx="1"
            fill="#eed5af"
            strokeWidth=".9"
          />
        </g>
        <g transform="matrix(1 0 -.62 .85 244 236)">
          <rect width="29" height="39" rx="11" fill="url(#case)" />
          <path d="M1 16h27M14 2v14" fill="none" />
        </g>
      </g>
    </svg>
  );
}

export default function Workbench() {
  const [mode, setMode] = useState(0);
  const [turned, setTurned] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  return (
    <figure className="instrument">
      <figcaption className="mono instrument-heading">
        <span>
          <i className="led" />
          Interactive object
        </span>
        <span>HJ—01</span>
      </figcaption>
      <div
        className="stage"
        ref={stage}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty(
            "--lean",
            ((e.clientX - rect.left) / rect.width) * 10 - 5 + "deg",
          );
        }}
        onPointerLeave={() => stage.current?.style.removeProperty("--lean")}
      >
        <div className={"model " + (turned ? "turned" : "")}>
          <Machine mode={mode} />
        </div>
        <button
          className="turn"
          onClick={() => setTurned(!turned)}
          aria-label="Tilt the computer"
          aria-pressed={turned}
          title="Tilt the computer"
        >
          <RotateCcw size={17} />
        </button>
      </div>
      <div className="instrument-controls">
        <div role="group" aria-label="Computer mode">
          {modes.map(({ label, Icon }, i) => (
            <button
              key={label}
              aria-pressed={mode === i}
              onClick={() => setMode(i)}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="caption">
        <span>Fig. 01 — The workbench</span>
        <span aria-live="polite">{modes[mode].status}</span>
      </div>
    </figure>
  );
}
