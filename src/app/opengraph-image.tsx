import { ImageResponse } from "next/og";
import {
  LOGO_VIEWBOX,
  LOGO_NAVY_POLYGONS,
  LOGO_SWOOSH_PATH,
  LOGO_SQUARES,
} from "@/components/LogoMark";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY_BG = "#0f2d4c";
const MARK_LIGHT = "#ffffff";
const MARK_GREEN = "#9fc25a";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: NAVY_BG,
        }}
      >
        <svg width="180" height="205" viewBox={LOGO_VIEWBOX}>
          {LOGO_NAVY_POLYGONS.map((points, i) => (
            <polygon key={i} points={points} fill={MARK_LIGHT} />
          ))}
          <path d={LOGO_SWOOSH_PATH} fill={MARK_GREEN} />
          {LOGO_SQUARES.map((square) => (
            <rect
              key={square.id}
              x={square.x}
              y={square.y}
              width={square.size}
              height={square.size}
              fill={MARK_GREEN}
            />
          ))}
        </svg>
        <div
          style={{
            marginTop: 36,
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: -1,
          }}
        >
          Emryz Digital
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 28,
            fontWeight: 600,
            color: "#c7d6a8",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Websites. POS Solutions. Growth.
        </div>
      </div>
    ),
    { ...size }
  );
}
