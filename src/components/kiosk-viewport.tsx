"use client";

import { useEffect, useMemo, useState } from "react";

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 1024;
const WORKFLOW_SAFE_HEIGHT = 900;
const DEFAULT_VIEWPORT = {
  width: DESIGN_WIDTH,
  height: DESIGN_HEIGHT,
};

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
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const isSelectionView = className.includes("selection-viewport");

  useEffect(() => {
    if (isSelectionView) {
      return;
    }

    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, [isSelectionView]);

  const scale = useMemo(
    () =>
      isSelectionView
        ? 1
        : Math.min(viewport.width / DESIGN_WIDTH, viewport.height / WORKFLOW_SAFE_HEIGHT),
    [isSelectionView, viewport.height, viewport.width],
  );

  const virtualWidth = isSelectionView ? viewport.width : viewport.width / scale;
  const virtualHeight = isSelectionView ? viewport.height : viewport.height / scale;
  const contentOffsetX = Math.max(0, (virtualWidth - DESIGN_WIDTH) / 2);

  const contentStyle = useMemo(
    () =>
      isSelectionView
        ? undefined
        : {
            width: virtualWidth,
            minHeight: virtualHeight,
            transform: `scale(${scale})`,
            transformOrigin: "top left" as const,
          },
    [isSelectionView, scale, virtualHeight, virtualWidth],
  );

  const workflowContentStyle = useMemo(
    () =>
      isSelectionView
        ? undefined
        : {
            width: DESIGN_WIDTH,
            minHeight: virtualHeight,
            transform: `translateX(${contentOffsetX}px)`,
          },
    [contentOffsetX, isSelectionView, virtualHeight],
  );

  return (
    <main
      className="kiosk-root web-viewport relative h-[100dvh] overflow-hidden bg-black"
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
      {!isSelectionView ? <div className="absolute inset-0 bg-black" /> : null}

      <div
        className={`web-viewport-content relative z-10 h-[100dvh] w-full overflow-hidden ${className}`}
      >
        <div className="relative min-h-[inherit] w-full" style={contentStyle}>
          <div className="relative min-h-[inherit] w-full" style={workflowContentStyle}>
          {children}
          </div>
        </div>
      </div>
    </main>
  );
}
