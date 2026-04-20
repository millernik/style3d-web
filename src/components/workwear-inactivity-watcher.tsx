"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

const INACTIVITY_TIMEOUT_MS = 60_000;
const SCREENSAVER_HREFS: Record<string, string> = {
  workwear: "/workflow/workwear/screensaver",
  mantel: "/workflow/mantel/screensaver",
  "key-visual": "/workflow/key-visual/screensaver",
  nachtwaesche: "/workflow/nachtwaesche/screensaver",
};

function getWorkflowIdFromPathname(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] !== "workflow" || !segments[1]) {
    return null;
  }

  return segments[1];
}

export function WorkwearInactivityWatcher() {
  const router = useRouter();
  const pathname = usePathname();
  const timeoutRef = useRef<number | null>(null);
  const pathnameRef = useRef(pathname);
  const screensaverHrefRef = useRef<string | null>(null);

  const clearExistingTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const scheduleTimeout = useCallback(() => {
    clearExistingTimer();

    if (!screensaverHrefRef.current) {
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      const screensaverHref = screensaverHrefRef.current;

      if (!screensaverHref) {
        return;
      }

      if (pathnameRef.current !== screensaverHref) {
        router.push(screensaverHref);
      }
    }, INACTIVITY_TIMEOUT_MS);
  }, [clearExistingTimer, router]);

  useEffect(() => {
    const resetTimeout = () => {
      scheduleTimeout();
    };

    const events: Array<keyof WindowEventMap> = [
      "pointerdown",
      "touchstart",
      "mousedown",
      "keydown",
    ];

    events.forEach((eventName) => {
      window.addEventListener(eventName, resetTimeout, { passive: true });
    });

    return () => {
      clearExistingTimer();
      events.forEach((eventName) => {
        window.removeEventListener(eventName, resetTimeout);
      });
    };
  }, [clearExistingTimer, scheduleTimeout]);

  useEffect(() => {
    pathnameRef.current = pathname;

    const workflowId = getWorkflowIdFromPathname(pathname);
    screensaverHrefRef.current = workflowId
      ? SCREENSAVER_HREFS[workflowId] ?? null
      : null;

    scheduleTimeout();

    return () => {
      clearExistingTimer();
    };
  }, [clearExistingTimer, pathname, scheduleTimeout]);

  return null;
}
