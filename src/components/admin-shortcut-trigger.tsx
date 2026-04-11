"use client";

import { startTransition, useEffect, useRef } from "react";
import type { PointerEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";

const HOLD_MS = 1400;
const MOVE_THRESHOLD_PX = 12;

type AdminShortcutTriggerProps = {
  children: ReactNode;
};

export function AdminShortcutTrigger({
  children,
}: AdminShortcutTriggerProps) {
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const originRef = useRef<{ x: number; y: number } | null>(null);
  const triggeredRef = useRef(false);

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    [],
  );

  const clearHold = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    originRef.current = null;
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType !== "touch") {
      return;
    }

    clearHold();
    triggeredRef.current = false;
    originRef.current = { x: event.clientX, y: event.clientY };
    timerRef.current = setTimeout(() => {
      triggeredRef.current = true;
      clearHold();
      startTransition(() => {
        router.push("/admin");
      });
    }, HOLD_MS);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!originRef.current || !timerRef.current) {
      return;
    }

    const deltaX = event.clientX - originRef.current.x;
    const deltaY = event.clientY - originRef.current.y;

    if (Math.hypot(deltaX, deltaY) > MOVE_THRESHOLD_PX) {
      clearHold();
    }
  };

  const handleCancel = () => {
    if (!triggeredRef.current) {
      clearHold();
    }
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handleCancel}
      onPointerCancel={handleCancel}
      onPointerLeave={handleCancel}
      style={{
        display: "flex",
        alignItems: "center",
        pointerEvents: "auto",
        touchAction: "none",
        userSelect: "none",
      }}
    >
      {children}
    </div>
  );
}
