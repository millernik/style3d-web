"use client";

import { useEffect, useMemo, useState } from "react";

const ARTBOARD_WIDTH = 1440;
const ARTBOARD_HEIGHT = 1024;

export function KioskViewport({
  children,
  className = "",
  onPointerDown,
  backdropImage,
}: {
  children: React.ReactNode;
  className?: string;
  onPointerDown?: () => void;
  backdropImage?: string;
}) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      setScale(
        Math.min(
          1,
          window.innerWidth / ARTBOARD_WIDTH,
          window.innerHeight / ARTBOARD_HEIGHT,
        ),
      );
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const viewportStyle = useMemo(
    () => ({
      width: ARTBOARD_WIDTH,
      height: ARTBOARD_HEIGHT,
      transform: `translate(-50%, -50%) scale(${scale})`,
      transformOrigin: "center center" as const,
    }),
    [scale],
  );

  return (
    <main
      className="kiosk-root web-viewport relative flex items-center justify-center bg-black"
      onPointerDown={() => {
        onPointerDown?.();
      }}
    >
      {backdropImage ? (
        <>
          <img
            src={backdropImage}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full scale-[1.08] object-cover opacity-[0.22] blur-[34px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_45%),linear-gradient(180deg,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0.58)_100%)]" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(217,66,255,0.16),transparent_20%),radial-gradient(circle_at_30%_70%,rgba(62,213,255,0.1),transparent_20%),linear-gradient(180deg,#020202_0%,#000_100%)]" />
      )}

      <div
        className={`web-artboard absolute left-1/2 top-1/2 overflow-hidden ${className}`}
        style={viewportStyle}
      >
        {children}
      </div>
    </main>
  );
}
