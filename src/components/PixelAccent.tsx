type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const positionClass: Record<Corner, string> = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
};

const flip: Record<Corner, string> = {
  "top-left": "scale-x-[-1]",
  "top-right": "",
  "bottom-left": "scale-x-[-1] scale-y-[-1]",
  "bottom-right": "scale-y-[-1]",
};

/**
 * A quiet echo of the logo's pixel square motif, used only as an
 * environmental design detail on section corners and dividers. Never
 * paired with an actual instance of the logo mark itself.
 */
export default function PixelAccent({
  corner = "top-right",
  className = "",
}: {
  corner?: Corner;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${positionClass[corner]} ${flip[corner]} ${className}`}
    >
      <svg width="88" height="88" viewBox="0 0 88 88" fill="none">
        <rect x="48" y="10" width="16" height="16" fill="#547e26" opacity="0.16" />
        <rect x="24" y="28" width="11" height="11" fill="#769a38" opacity="0.2" />
        <rect x="58" y="40" width="22" height="22" fill="#0f2d4c" opacity="0.08" />
      </svg>
    </div>
  );
}
