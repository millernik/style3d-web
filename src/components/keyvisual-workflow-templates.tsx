"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  buildScreenHref,
  type KeyVisualClosingScreen,
  type KeyVisualGalleryScreen,
  type KeyVisualPromptScreen,
  type KeyVisualStageSwapScreen,
  type Workflow,
  type WorkflowScreen,
} from "@/lib/workflows";

type SharedUi = {
  ScreenShell: (props: {
    workflow: Workflow;
    screen: WorkflowScreen;
    children: ReactNode;
    hideFooter?: boolean;
    disableEntryAnimation?: boolean;
  }) => ReactNode;
  WorkflowShell: (props: {
    workflow: Workflow;
    backdropImage?: string;
    children: ReactNode;
  }) => ReactNode;
  NarrativeCard: (props: {
    className: string;
    avatar: string;
    text: string;
    cta?: ReactNode;
    avatarGlowPreset?: "default" | "workwear-intro" | "workwear-card" | "workwear-step3";
  }) => ReactNode;
  AvatarDiamond: (props: {
    image: string;
    size: "md" | "xl";
    glowPreset?: "default" | "workwear-intro" | "workwear-card" | "workwear-step3";
  }) => ReactNode;
  FramedStage: (props: { children: ReactNode; className: string }) => ReactNode;
  StepThreeStatusPill: (props: {
    state: "processing" | "done";
    label: string;
  }) => ReactNode;
  ActionPill: (props: {
    children: ReactNode;
    workflowId?: string;
    targetId?: string;
    glowPreset?: "default" | "workwear-intro";
    onClick?: () => void;
  }) => ReactNode;
  SubtleActionPill: (props: { label: string; onClick: () => void }) => ReactNode;
  SecondaryPill: (props: {
    children: ReactNode;
    workflowId?: string;
    targetId?: string;
    href?: string;
  }) => ReactNode;
  ThumbnailCard: (props: {
    children: ReactNode;
    active: boolean;
    className?: string;
  }) => ReactNode;
};

type SharedProps<T extends WorkflowScreen> = {
  workflow: Workflow;
  screen: T;
  shared: SharedUi;
};

const entryTransition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
};

const childTransition = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1] as const,
};

function StageLayout({
  workflow,
  screen,
  shared,
  cta,
  stage,
}: SharedProps<
  KeyVisualStageSwapScreen | KeyVisualGalleryScreen | KeyVisualPromptScreen
> & {
  cta?: ReactNode;
  stage: ReactNode;
}) {
  const { ScreenShell, NarrativeCard } = shared;

  return (
    <ScreenShell workflow={workflow} screen={screen} hideFooter disableEntryAnimation>
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1160px] items-center justify-between gap-[34px]">
          <div className="flex w-[486px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[486px]"
              avatar={screen.avatar}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />
            {cta}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={entryTransition}
            className="flex w-[560px] justify-end"
          >
            {stage}
          </motion.div>
        </div>
      </div>
    </ScreenShell>
  );
}

export function KeyVisualStageSwapTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<KeyVisualStageSwapScreen>) {
  const router = useRouter();
  const { FramedStage, SubtleActionPill } = shared;
  const [showSwappedImage, setShowSwappedImage] = useState(false);

  useEffect(() => {
    setShowSwappedImage(false);

    const timeoutId = window.setTimeout(() => {
      setShowSwappedImage(true);
    }, screen.swapAfterMs);

    return () => window.clearTimeout(timeoutId);
  }, [screen.swapAfterMs]);

  return (
    <StageLayout
      workflow={workflow}
      screen={screen}
      shared={shared}
      cta={
        showSwappedImage ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={childTransition}
          >
            <SubtleActionPill
              label={screen.ctaLabel}
              onClick={() => router.push(buildScreenHref(workflow.id, screen.ctaTarget))}
            />
          </motion.div>
        ) : null
      }
      stage={
        <FramedStage className="relative h-[520px] w-[560px] overflow-hidden rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={showSwappedImage ? screen.swappedImage : screen.initialImage}
              src={showSwappedImage ? screen.swappedImage : screen.initialImage}
              alt=""
              initial={{ opacity: 0.4, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </FramedStage>
      }
    />
  );
}

export function KeyVisualGalleryTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<KeyVisualGalleryScreen>) {
  const router = useRouter();
  const { FramedStage, SubtleActionPill, ThumbnailCard } = shared;
  const [selectedId, setSelectedId] = useState(screen.options[0]?.id);
  const [hasSelectedExplicitly, setHasSelectedExplicitly] = useState(
    screen.showCtaOnLoad ?? false,
  );
  const activeOption =
    screen.options.find((option) => option.id === selectedId) ?? screen.options[0];
  const showCta = (screen.showCtaOnLoad ?? false) || hasSelectedExplicitly;

  return (
    <StageLayout
      workflow={workflow}
      screen={screen}
      shared={shared}
      cta={
        showCta ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={childTransition}
          >
            <SubtleActionPill
              label={screen.ctaLabel}
              onClick={() => router.push(buildScreenHref(workflow.id, screen.ctaTarget))}
            />
          </motion.div>
        ) : null
      }
      stage={
        <div className="flex items-start gap-[16px]">
          <FramedStage className="relative h-[520px] w-[430px] overflow-hidden rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={activeOption.image}
                src={activeOption.image}
                alt=""
                initial={{ opacity: 0.45, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className={`pointer-events-none absolute inset-0 h-full w-full ${
                  activeOption.imageClassName ?? "object-contain p-[12px]"
                }`}
              />
            </AnimatePresence>
          </FramedStage>

          <div className="flex flex-col gap-[12px]">
            {screen.options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setSelectedId(option.id);
                  setHasSelectedExplicitly(true);
                }}
                aria-label={option.label}
              >
                <ThumbnailCard
                  active={option.id === selectedId}
                  className="h-[104px] w-[104px] rounded-[20px]"
                >
                  <img
                    src={option.thumbImage}
                    alt=""
                    className={`pointer-events-none h-full w-full ${
                      option.thumbClassName ?? "object-contain p-[8px]"
                    }`}
                  />
                </ThumbnailCard>
              </button>
            ))}
          </div>
        </div>
      }
    />
  );
}

export function KeyVisualPromptTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<KeyVisualPromptScreen>) {
  const router = useRouter();
  const { FramedStage, ActionPill } = shared;

  return (
    <StageLayout
      workflow={workflow}
      screen={screen}
      shared={shared}
      cta={null}
      stage={
        <div className="flex w-[560px] flex-col items-center gap-[18px]">
          <FramedStage className="relative min-h-[290px] w-[520px] rounded-[30px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] px-[28px] py-[26px] backdrop-blur-[18px]">
            <div className="flex h-full flex-col justify-between gap-[18px] text-white">
              <div>
                <p className="text-kiosk-label-md font-semibold">{screen.promptTitle}</p>
                <p className="mt-[14px] text-kiosk-body-md leading-[1.5]">
                  {screen.promptBody}
                </p>
              </div>
            </div>
          </FramedStage>

          <ActionPill
            onClick={() => router.push(buildScreenHref(workflow.id, screen.ctaTarget))}
          >
            {screen.generateLabel}
          </ActionPill>
        </div>
      }
    />
  );
}

export function KeyVisualClosingTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<KeyVisualClosingScreen>) {
  const router = useRouter();
  const { WorkflowShell, AvatarDiamond, ActionPill, SecondaryPill } = shared;

  return (
    <WorkflowShell workflow={workflow} backdropImage={screen.backdropImage}>
      <img
        src={screen.backdropImage}
        alt=""
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-[80%_28%]"
      />
      {screen.backgroundAccentImage ? (
        <img
          src={screen.backgroundAccentImage}
          alt=""
          className="pointer-events-none absolute bottom-0 left-[-120px] z-0 h-[860px] w-[560px] object-cover opacity-[0.8]"
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.56),rgba(0,0,0,0.78))]" />

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={entryTransition}
        className="absolute inset-x-0 top-[190px] z-10 flex flex-col items-center"
      >
        <div className="flex w-[680px] flex-col items-center gap-[34px] text-center">
          <div className="flex flex-col items-center gap-[22px]">
            <AvatarDiamond
              image={screen.avatar}
              size="xl"
              glowPreset="workwear-intro"
            />
            <div className="flex flex-col gap-[8px] text-kiosk-body-lg leading-[1.45] text-white">
              {screen.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-[18px]">
            <ActionPill onClick={() => router.push(screen.primaryHref)}>
              {screen.primaryCtaLabel}
            </ActionPill>
            <SecondaryPill
              workflowId={workflow.id}
              targetId={screen.secondaryCtaTarget}
            >
              {screen.secondaryCtaLabel}
            </SecondaryPill>
          </div>
        </div>
      </motion.section>
    </WorkflowShell>
  );
}
