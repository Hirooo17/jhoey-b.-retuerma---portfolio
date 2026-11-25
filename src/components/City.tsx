import { memo, useId } from "react";

type Point = [number, number];
const project = (x: number, y: number, z = 0): Point => [
  400 + (x - y) * 0.94,
  9 + (x + y) * 0.46 - z,
];
const poly = (...points: Point[]) =>
  points.map((point) => point.join(",")).join(" ");
function surface(x: number, y: number, w: number, d: number, h = 0) {
  return poly(
    project(x, y, h),
    project(x + w, y, h),
    project(x + w, y + d, h),
    project(x, y + d, h),
  );
}
const materials = [
  ["#e4cba7", "#ccac88", "#f5e3c7"],
  ["#d58b63", "#b56c4b", "#eeb994"],
  ["#b3b6a0", "#909980", "#d7d8bc"],
  ["#e5bb8f", "#c49470", "#f4d6ae"],
];
function Block({
  x,
  y,
  w,
  d,
  h,
  tone = 0,
  windows = true,
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  tone?: number;
  windows?: boolean;
}) {
  const [lit, shade, roof] = materials[tone];
  return (
    <g stroke="#6c5745" strokeWidth=".95" strokeLinejoin="round">
      <polygon
        points={poly(
          project(x, y + d),
          project(x + w, y + d),
          project(x + w, y + d, h),
          project(x, y + d, h),
        )}
        fill={lit}
      />
      <polygon
        points={poly(
          project(x + w, y),
          project(x + w, y + d),
          project(x + w, y + d, h),
          project(x + w, y, h),
        )}
        fill={shade}
      />
      <polygon points={surface(x, y, w, d, h)} fill={roof} />
      {windows && (
        <g stroke="none" fill="#745f4a">
          {Array.from({ length: Math.floor(h / 10) }, (_, r) => (
            <g key={r}>
              {Array.from({ length: Math.floor((w - 3) / 9) }, (_, i) => (
                <polygon
                  key={i}
                  points={poly(
                    project(x + 4 + i * 9, y + d, r * 10 + 3),
                    project(x + 8 + i * 9, y + d, r * 10 + 3),
                    project(x + 8 + i * 9, y + d, r * 10 + 7),
                    project(x + 4 + i * 9, y + d, r * 10 + 7),
                  )}
                />
              ))}
              {Array.from({ length: Math.floor((d - 3) / 10) }, (_, i) => (
                <path
                  key={i}
                  d={"M" + project(x + w, y + 5 + i * 10, r * 10 + 4) + "v-4"}
                  stroke="#71593f"
                  strokeWidth="2.8"
                />
              ))}
            </g>
          ))}
        </g>
      )}
      {windows && (
        <polygon
          points={surface(x + 4, y + 4, w - 8, d - 8, h)}
          fill="none"
          opacity=".55"
        />
      )}
    </g>
  );
}
function Tree({ x, y }: { x: number; y: number }) {
  const [px, py] = project(x, y);
  return (
    <g transform={`translate(${px} ${py})`}>
      <ellipse cx="4" cy="1" rx="8" ry="3" fill="#897957" opacity=".27" />
      <path d="M0 0v-17" stroke="#776347" strokeWidth="2.4" />
      <path
        d="M0-9c-13 1-12-10-6-17 0-9 10-11 13-3 10 9 8 20-7 20"
        fill="#97a17a"
        stroke="#757859"
      />
      <path d="M0-9v-13m0 7 4-5" stroke="#70775b" fill="none" />
    </g>
  );
}
const lots = [
  [12, 38, 31, 32, 28, 3],
  [52, 31, 28, 39, 39, 0],
  [106, 22, 47, 32, 33, 2],
  [169, 18, 28, 37, 34, 1],
  [228, 30, 47, 30, 46, 0],
  [295, 25, 31, 46, 39, 3],
  [346, 32, 30, 35, 56, 0],
  [8, 103, 32, 38, 24, 2],
  [50, 100, 30, 40, 22, 1],
  [112, 95, 37, 43, 47, 0],
  [177, 103, 29, 39, 27, 3],
  [323, 104, 27, 42, 31, 1],
  [354, 98, 24, 31, 28, 3],
  [16, 244, 42, 30, 27, 3],
  [80, 251, 30, 28, 37, 1],
  [132, 248, 28, 25, 24, 0],
  [226, 245, 38, 38, 39, 3],
  [314, 247, 47, 32, 27, 2],
  [7, 323, 36, 36, 19, 2],
  [57, 324, 39, 38, 27, 1],
  [121, 322, 32, 32, 24, 3],
  [179, 326, 30, 31, 35, 0],
  [239, 319, 41, 32, 27, 1],
  [301, 326, 34, 31, 24, 0],
  [353, 324, 30, 30, 21, 3],
];
export const stops = [
  { name: "Mandaluyong", company: "Withcenter Inc.", x: 264, y: 127, h: 49 },
  {
    name: "Circuit Makati",
    company: "PLDT Service Care",
    x: 180,
    y: 265,
    h: 67,
  },
];
export const stationPoint = (i: number) =>
  project(stops[i].x, stops[i].y, stops[i].h);
const roads = [
  ["M-19 79H405", 10],
  ["M-19 297H405", 12],
  ["M96 -7V161 M96 223V392", 10],
  ["M290 -7V162 M290 222V392", 12],
  ["M-19 151H405 M-19 233H405", 6],
] as const;
const route = "M264 132V151H290V232H180V260";
export const City = memo(function City({
  selected,
  onSelect,
  interactive = true,
  touring = false,
}: {
  selected: number | null;
  onSelect: (i: number) => void;
  interactive?: boolean;
  touring?: boolean;
}) {
  const id = useId();
  const objects = lots
    .filter(([x, y]) => !(x === 121 && y === 322) && !(x === 112 && y === 95))
    .map(([x, y, w, d, h, tone], i) => ({
      depth: x + y + w + d,
      node: (
        <g key={"b" + i}>
          <Block {...{ x, y, w, d, h, tone }} />
          {i % 3 === 0 && (
            <g transform={`translate(0 -${h})`}>
              <Block
                x={x + 6}
                y={y + 5}
                w={w * 0.42}
                d={d * 0.43}
                h={8}
                tone={tone}
                windows={false}
              />
            </g>
          )}
        </g>
      ),
    }));
  for (const [x, y] of [
    [6, 13],
    [32, 17],
    [68, 17],
    [150, 68],
    [193, 69],
    [225, 71],
    [324, 75],
    [371, 73],
    [67, 148],
    [132, 147],
    [352, 148],
    [18, 284],
    [43, 284],
    [74, 283],
    [259, 289],
    [337, 289],
    [23, 375],
    [67, 375],
    [117, 374],
    [155, 373],
    [204, 374],
    [247, 373],
    [300, 376],
    [349, 376],
  ]) {
    objects.push({
      depth: x + y,
      node: <Tree key={"t" + x + "," + y} {...{ x, y }} />,
    });
  }
  // An open court, riverside ferry and palms distinguish the illustrated districts.
  objects.push({
    depth: 505,
    node: (
      <g key="arena" transform="matrix(.94 .46 -.94 .46 400 9)">
        <rect
          x="105"
          y="310"
          width="59"
          height="65"
          rx="3"
          fill="#acb795"
          stroke="#94896b"
        />
        <g fill="none" stroke="#f8eed4" strokeWidth="1.7">
          <rect x="109" y="315" width="51" height="54" />
          <path d="M109 342h51m-39-27v10h26v-10m-26 54v-10h26v10" />
          <circle cx="135" cy="342" r="6" />
        </g>
      </g>
    ),
  });
  const [bx, by] = project(115, 112, 26);
  objects.push({
    depth: 292,
    node: (
      <g key="hall">
        <Block x={108} y={90} w={49} d={48} h={22} tone={1} />
        <polygon
          points={poly(
            project(104, 87, 22),
            project(134, 87, 40),
            project(134, 141, 40),
            project(104, 141, 22),
          )}
          fill="#cb8e6e"
          stroke="#82634d"
        />
        <polygon
          points={poly(
            project(134, 87, 40),
            project(160, 87, 22),
            project(160, 141, 22),
            project(134, 141, 40),
          )}
          fill="#a8755d"
          stroke="#82634d"
        />
        <path d={"M" + bx + " " + by + "v-7"} stroke="#8f6f52" />
      </g>
    ),
  });
  for (const [x, y] of [
    [138, 151],
    [157, 149],
    [188, 235],
    [211, 237],
    [275, 367],
  ]) {
    const [px, py] = project(x, y);
    objects.push({
      depth: x + y,
      node: (
        <g key={"palm" + x} transform={`translate(${px} ${py})`}>
          <path
            d="M0 0q3-13 0-25"
            stroke="#836b4c"
            strokeWidth="2.4"
            fill="none"
          />
          {[-65, -35, 0, 35, 65].map((a) => (
            <path
              key={a}
              d="M0-25q-7-13-16-3 10-5 16 3"
              transform={`rotate(${a} 0 -25)`}
              fill="#717e58"
              stroke="#6e7757"
              strokeWidth=".6"
            />
          ))}
        </g>
      ),
    });
  }
  const [fx, fy] = project(168, 191);
  objects.push({
    depth: 359,
    node: (
      <g key="ferry" transform={`translate(${fx} ${fy})`}>
        <g className="ferry">
          <path
            d="M-20-6l34 13 10-4-3 7-9 2-31-14Z"
            fill="#966747"
            stroke="#755a44"
          />
          <path d="M-18-6l10-4 33 13-11 4Z" fill="#e9d5ad" />
          <path d="M-9-7v-5l23 9v5Z" fill="#8c9e91" stroke="#776b57" />
          <path d="M-11-12l7-3 23 9-6 4Z" fill="#e7b683" />
        </g>
      </g>
    ),
  });
  stops.forEach((s, i) => {
    const tower = (
      <g className={"landmark " + (selected === i ? "chosen" : "")}>
        <Block
          x={s.x - 24}
          y={s.y - 18}
          w={48}
          d={36}
          h={s.h - 12}
          tone={i === 0 ? 1 : 2}
        />
        <g transform={`translate(0 -${s.h - 12})`}>
          <Block
            x={s.x - 16}
            y={s.y - 11}
            w={32}
            d={23}
            h={12}
            tone={i === 0 ? 1 : 2}
          />
        </g>
        <path
          d={"M" + project(s.x, s.y, s.h) + "v-14"}
          stroke="#6b5140"
          strokeWidth="2"
        />
      </g>
    );
    objects.push({
      depth: s.x + s.y + 40,
      node: (
        <g key={"s" + i} className="city-stop" onClick={() => onSelect(i)}>
          {tower}
        </g>
      ),
    });
  });
  return (
    <>
      <defs>
        <pattern id={id} width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r=".65" fill="#987c55" opacity=".4" />
        </pattern>
      </defs>
      <g transform="matrix(.94 .46 -.94 .46 400 9)">
        <path
          d="M-19 -7H405V392H-19Z"
          fill="#c5ae8e"
          stroke="#a48b6d"
          strokeWidth="2"
          transform="translate(6 6)"
        />
        <rect
          x="-19"
          y="-7"
          width="424"
          height="399"
          rx="5"
          fill="#e5d3ae"
          stroke="#a48b6d"
        />
        <rect
          x="-19"
          y="-7"
          width="424"
          height="399"
          fill={"url(#" + id + ")"}
        />
        <path
          d="M-19 158 Q59 144 132 164T272 165Q342 148 405 159V219Q335 208 270 222T121 220Q50 202-19 220Z"
          fill="#a5b9ab"
          stroke="#82988b"
          strokeWidth="2"
        />
        {[174, 190, 207].map((v, i) => (
          <path
            key={v}
            d={`M-12 ${v}q63 -13 135 5t136 0t137 -2`}
            fill="none"
            stroke="#dce3cc"
            strokeWidth="1.8"
            strokeDasharray={i === 1 ? "37 16" : "15 26"}
          />
        ))}
        {roads.map(([d, w]) => (
          <g key={d}>
            <path d={d} stroke="#c9b695" strokeWidth={w + 3} fill="none" />
            <path d={d} stroke="#f5e9cc" strokeWidth={w} fill="none" />
          </g>
        ))}
        {[96, 290].map((x) => (
          <g key={x}>
            <path d={`M${x} 150v85`} stroke="#856f56" strokeWidth="17" />
            <path d={`M${x} 151v83`} stroke="#e0c8a4" strokeWidth="12" />
            <path d={`M${x} 151v83`} stroke="#fff3d6" strokeDasharray="5 5" />
          </g>
        ))}
        <g stroke="#9f8f71" strokeWidth="1">
          {[96, 290].map((x) => (
            <path key={x} d={`M${x - 8} 151v80m16 0v-80`} />
          ))}
        </g>
        <path
          className="route-under"
          d={route}
          fill="none"
          stroke="#f4e4c1"
          strokeWidth="9"
        />
        <path
          className="career-route"
          d={route}
          fill="none"
          stroke="#a34f32"
          strokeWidth="4"
          strokeDasharray="6 5"
        />
        {touring && (
          <circle
            className="route-traveller"
            r="5"
            fill="#a34f32"
            stroke="#fff6dc"
            strokeWidth="2"
          />
        )}
        {[
          [36, 79],
          [145, 298],
          [290, 203],
          [95, 315],
          [326, 78],
        ].map(([x, y]) => (
          <g key={x + "," + y}>
            <rect x={x} y={y - 3} width="15" height="6" fill="#9c674b" rx="2" />
            <rect x={x + 3} y={y - 2} width="8" height="4" fill="#f4d79d" />
          </g>
        ))}
      </g>
      {objects.sort((a, b) => a.depth - b.depth).map((o) => o.node)}
      {stops.map((s, i) => {
        const [x, y] = stationPoint(i);
        return (
          <g
            key={s.name}
            transform={`translate(${x} ${y - 17})`}
            className={"map-pin " + (selected === i ? "selected" : "")}
            role={interactive ? "button" : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label={interactive ? "Visit " + s.name : undefined}
            onClick={() => onSelect(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(i);
              }
            }}
          >
            <path d="M0 0v-18" stroke="#4e382a" strokeWidth="2" />
            <g className="pin-label">
              <rect
                x="-15"
                y="-43"
                width={i === 0 ? 132 : 144}
                height="29"
                rx="14.5"
                fill={selected === i ? "#a74f2b" : "#423528"}
                stroke="#fbefd8"
                strokeWidth="1.8"
              />
              <circle
                cx="0"
                cy="-28"
                r="6"
                fill={i === 0 ? "#f5bd86" : "#b8c998"}
              />
              <text
                x="12"
                y="-23"
                fill="#fff4e3"
                fontFamily="Manrope, sans-serif"
                fontWeight="650"
                fontSize="14"
              >
                {s.name}
              </text>
            </g>
          </g>
        );
      })}
    </>
  );
});
