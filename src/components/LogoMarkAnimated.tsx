import {
  LOGO_VIEWBOX,
  LOGO_NAVY_POLYGONS,
  LOGO_SWOOSH_PATH,
  LOGO_SQUARES,
} from "./LogoMark";

const NAVY = "#0f2d4c";
const GREEN = "#547e26";
const LIME = "#769a38";

const squareFill = { green: GREEN, lime: LIME } as const;

/**
 * The header logo. Plain server rendered SVG, no "use client" boundary,
 * so the mark is fully present and visible in the initial HTML and works
 * with JavaScript disabled. The entrance (mark settles, then the four
 * pixel squares fade in one after another) and the hover brighten on the
 * green shape are both driven by plain CSS, defined in globals.css,
 * rather than framer motion, which previously left the mark stuck at
 * opacity 0 in the server render until the animation library hydrated
 * and took over.
 */
export default function LogoMarkAnimated({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      role="img"
      aria-label="Emryz Digital"
      className={`group/logo ${className ?? ""}`}
    >
      <g className="logo-settle">
        {LOGO_NAVY_POLYGONS.map((points) => (
          <polygon key={points} points={points} fill={NAVY} />
        ))}
        <path d={LOGO_SWOOSH_PATH} fill={GREEN} />
        <path
          d={LOGO_SWOOSH_PATH}
          fill="#ffffff"
          className="opacity-0 transition-opacity duration-300 ease-out group-hover/logo:opacity-25"
        />
      </g>
      {LOGO_SQUARES.map((square, i) => (
        <rect
          key={square.id}
          x={square.x}
          y={square.y}
          width={square.size}
          height={square.size}
          fill={squareFill[square.color]}
          className="logo-square-pop"
          style={{ animationDelay: `${0.4 + i * 0.09}s` }}
        />
      ))}
    </svg>
  );
}
