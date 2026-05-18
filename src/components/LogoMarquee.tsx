import fs from "node:fs";
import path from "node:path";

const SCROLLER_DIR = path.join(process.cwd(), "public", "scroller");
const IMAGE_EXT = /\.(png|jpe?g|webp|svg|gif|avif)$/i;
// Repeat the logo set so a single marquee copy stays wide enough to fill the
// viewport even when only a handful of logos exist.
const MIN_ITEMS_PER_COPY = 8;

function getLogos(): string[] {
  try {
    return fs
      .readdirSync(SCROLLER_DIR)
      .filter((file) => IMAGE_EXT.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => `/scroller/${file}`);
  } catch {
    return [];
  }
}

export default function LogoMarquee({
  className = "",
}: {
  className?: string;
}) {
  const logos = getLogos();
  if (logos.length === 0) return null;

  const repeats = Math.max(1, Math.ceil(MIN_ITEMS_PER_COPY / logos.length));
  const copy = Array.from({ length: repeats }, () => logos).flat();
  // Two identical copies let the track loop seamlessly at translateX(-50%).
  const track = [...copy, ...copy];

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-slate-100 px-3 py-3 sm:px-4 sm:py-4 ${className}`}
      role="region"
      aria-label="Insurance carriers we represent"
    >
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused] motion-reduce:animate-none">
          {track.map((src, index) => (
            <div
              key={index}
              aria-hidden={index >= copy.length}
              className="flex shrink-0 items-center justify-center pr-4 sm:pr-5"
            >
              <div className="flex h-20 w-48 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:h-24 sm:w-60 sm:px-6 sm:py-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
