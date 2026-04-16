"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const WORKWEAR_TIMEOUT_MS = 60_000;
const WORKWEAR_SCREENSAVER_HREF = "/workflow/workwear/screensaver";

export function WorkwearInactivityWatcher({
  workflowId,
}: {
  workflowId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (workflowId !== "workwear") {
      return;
    }

    const clearExistingTimer = () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const scheduleTimeout = () => {
      clearExistingTimer();
      timeoutRef.current = window.setTimeout(() => {
        if (pathname !== WORKWEAR_SCREENSAVER_HREF) {
          router.push(WORKWEAR_SCREENSAVER_HREF);
        }
      }, WORKWEAR_TIMEOUT_MS);
    };

    const resetTimeout = () => {
      scheduleTimeout();
    };

    const events: Array<keyof WindowEventMap> = [
      "pointerdown",
      "pointermove",
      "touchstart",
      "keydown",
      "wheel",
    ];

    scheduleTimeout();

    events.forEach((eventName) => {
      window.addEventListener(eventName, resetTimeout, { passive: true });
    });

    return () => {
      clearExistingTimer();
      events.forEach((eventName) => {
        window.removeEventListener(eventName, resetTimeout);
      });
    };
  }, [pathname, router, workflowId]);

  return null;
}
