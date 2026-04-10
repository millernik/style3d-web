import Link from "next/link";

export default function NotFound() {
  return (
    <main className="kiosk-root flex items-center justify-center bg-black px-8 text-center text-white">
      <div className="screen-fade-in flex max-w-2xl flex-col items-center gap-6">
        <p className="text-sm uppercase tracking-[0.28em] text-white/55">Style3D Kiosk</p>
        <h1 className="text-4xl font-medium">Screen not found</h1>
        <p className="max-w-xl text-xl font-light text-white/76">
          This route is not part of the current kiosk flow. Return to the intro and continue from there.
        </p>
        <Link
          href="/workflow/workwear"
          className="rounded-full bg-kiosk-gradient px-10 py-4 text-lg font-semibold text-white shadow-[var(--shadow-glow-magenta)] transition-transform duration-150 active:scale-95"
        >
          Back to workflow
        </Link>
      </div>
    </main>
  );
}
