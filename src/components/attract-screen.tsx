"use client";

import TouchAppIcon from "@mui/icons-material/TouchApp";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { KioskViewport } from "@/components/kiosk-viewport";
import type { Workflow } from "@/lib/workflows";

const EXIT_DURATION_MS = 340;

export function AttractScreen({ workflow }: { workflow: Workflow }) {
  const router = useRouter();
  const timeoutRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Keep the poster visible if autoplay still gets blocked.
        });
      }
    };

    tryPlay();
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadedmetadata", tryPlay);

    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadedmetadata", tryPlay);
    };
  }, [workflow.attract.videoSrc]);

  const handleEnter = () => {
    if (isExiting) {
      return;
    }

    setIsExiting(true);
    timeoutRef.current = window.setTimeout(() => {
      router.push(`/workflow/${workflow.id}`);
    }, EXIT_DURATION_MS);
  };

  return (
    <KioskViewport>
      <video
        ref={videoRef}
        src={workflow.attract.videoSrc}
        poster={workflow.attract.posterSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0.78 }}
        animate={{ opacity: isExiting ? 0.94 : 0.78 }}
        transition={{ duration: EXIT_DURATION_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.62)_34%,rgba(0,0,0,0.22)_68%,rgba(0,0,0,0.42)_100%)]"
      />
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0.46, scale: 1 }}
        animate={{ opacity: isExiting ? 0.2 : 0.46, scale: isExiting ? 1.025 : 1 }}
        transition={{ duration: EXIT_DURATION_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 top-[52%] bg-[radial-gradient(circle_at_center,rgba(217,66,255,0.26)_0%,rgba(217,66,255,0.08)_36%,rgba(0,0,0,0)_72%)]"
      />

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{
          opacity: isExiting ? 0 : 1,
          y: isExiting ? -12 : 0,
          scale: isExiting ? 1.02 : 1,
        }}
        transition={{
          duration: isExiting ? EXIT_DURATION_MS / 1000 : 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-[60px] top-[412px] flex flex-col gap-10 text-white"
      >
        <img
          src={workflow.attract.brandLogo}
          alt="Style3D"
          className="pointer-events-none h-[83.823px] w-[318px]"
        />
        <div className="flex items-center gap-[20.374px]">
          <img
            src={workflow.attract.workflowMark}
            alt=""
            className="pointer-events-none h-[75.971px] w-[74.705px]"
          />
          <p className="text-[47.54px] font-medium leading-normal text-white">
            {workflow.attract.workflowTitle}
          </p>
        </div>
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.18 }}
          onClick={handleEnter}
          className="z-20 flex h-[58px] w-fit items-center gap-[12px] rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.12)] px-[28px] text-[22px] font-medium text-white backdrop-blur-[16px]"
        >
          <TouchAppIcon sx={{ fontSize: 28 }} />
          <span>Start workflow</span>
        </motion.button>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 1 : 0 }}
        transition={{ duration: EXIT_DURATION_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-black"
      />

      <button
        type="button"
        aria-label={`Open ${workflow.title}`}
        onPointerUp={handleEnter}
        className="absolute inset-0 z-10 cursor-pointer touch-manipulation bg-transparent"
      />
    </KioskViewport>
  );
}
