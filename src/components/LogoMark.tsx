import { SVGProps } from "react";

/**
 * Traced from public/brand/emryz-digital-icon-mark.webp. Geometry was
 * reconstructed by isolating the navy and green pixels, correcting the
 * photo's camera tilt (a consistent rotation plus a vertical foreshortening,
 * verified against the four accent squares which are true squares in the
 * source design), then tracing the corrected masks. Do not hand edit the
 * coordinates below, they are measured, not designed.
 */

export const LOGO_VIEWBOX = "-6 -6 488 555";

export const LOGO_NAVY_POLYGONS = [
  "9,64 9,153 315,150 288,100 264,78 230,63 45,60",
  "281,216 6,218 1,487 203,483 268,445 302,391 92,394 91,314 100,305 243,304",
];

export const LOGO_SWOOSH_PATH =
  "M 411.00,209.00 L 328.00,186.00 C 317.00,212.67 295.33,252.50 295.00,266.00 C 294.67,279.50 317.17,265.33 326.00,267.00 C 334.83,268.67 340.83,271.17 348.00,276.00 C 355.17,280.83 363.83,289.67 369.00,296.00 C 374.17,302.33 376.17,307.00 379.00,314.00 C 381.83,321.00 384.67,329.50 386.00,338.00 C 387.33,346.50 387.67,355.50 387.00,365.00 C 386.33,374.50 385.50,384.67 382.00,395.00 C 378.50,405.33 373.83,417.50 366.00,427.00 C 358.17,436.50 350.33,442.33 335.00,452.00 C 319.67,461.67 306.00,470.00 274.00,485.00 C 242.00,500.00 186.67,523.00 143.00,542.00 C 212.67,540.33 310.67,540.00 352.00,537.00 C 393.33,534.00 377.83,531.33 391.00,524.00 C 404.17,516.67 420.83,503.33 431.00,493.00 C 441.17,482.67 445.83,473.83 452.00,462.00 C 458.17,450.17 464.00,436.83 468.00,422.00 C 472.00,407.17 474.67,385.67 476.00,373.00 C 477.33,360.33 477.00,357.33 476.00,346.00 C 475.00,334.67 473.00,317.67 470.00,305.00 C 467.00,292.33 463.50,281.67 458.00,270.00 C 452.50,258.33 444.83,245.17 437.00,235.00 C 429.17,224.83 419.67,217.67 411.00,209.00 Z";

export type LogoSquare = {
  id: string;
  x: number;
  y: number;
  size: number;
  color: "green" | "lime";
};

export const LOGO_SQUARES: LogoSquare[] = [
  { id: "square-1", x: 411.25, y: 0, size: 34.5, color: "lime" },
  { id: "square-2", x: 344.0, y: 32.0, size: 34.0, color: "green" },
  { id: "square-3", x: 308.5, y: 70.5, size: 24.0, color: "green" },
  { id: "square-4", x: 383.75, y: 73.25, size: 40.5, color: "green" },
];

const NAVY = "#0f2d4c";
const GREEN = "#547e26";
const LIME = "#769a38";

const squareFill: Record<LogoSquare["color"], string> = {
  green: GREEN,
  lime: LIME,
};

/**
 * Static render of the traced mark. For animated usage (header load in,
 * hero float, hover brighten) see AnimatedLogoMark, which reuses this same
 * geometry with motion applied per part.
 */
export default function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox={LOGO_VIEWBOX} role="img" aria-label="Emryz Digital mark" {...props}>
      {LOGO_NAVY_POLYGONS.map((points) => (
        <polygon key={points} points={points} fill={NAVY} />
      ))}
      <path d={LOGO_SWOOSH_PATH} fill={GREEN} />
      {LOGO_SQUARES.map((square) => (
        <rect
          key={square.id}
          x={square.x}
          y={square.y}
          width={square.size}
          height={square.size}
          fill={squareFill[square.color]}
        />
      ))}
    </svg>
  );
}
