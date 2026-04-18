"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  buildScreenHref,
  type NachtwaescheClosingScreen,
  type NachtwaescheGraphicGenerationScreen,
  type NachtwaescheIntroScreen,
  type NachtwaescheMoodboardScreen,
  type NachtwaeschePlacementScreen,
  type NachtwaescheProductConceptScreen,
  type NachtwaescheRenderGalleryScreen,
  type NachtwaescheTryOnScreen,
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
    className?: string;
    contentClassName?: string;
  }) => ReactNode;
  SubtleActionPill: (props: { label: string; onClick: () => void }) => ReactNode;
  SecondaryPill: (props: {
    children: ReactNode;
    workflowId?: string;
    targetId?: string;
    href?: string;
  }) => ReactNode;
  SegmentedStateToggle: (props: {
    options: Array<{
      id: string;
      label: string;
      icon: "human" | "spark";
      active: boolean;
      onClick: () => void;
    }>;
    className?: string;
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

function useDelayedReveal(active: boolean, delayMs: number) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);

    if (!active) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setVisible(true);
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [active, delayMs]);

  return visible;
}

function SelectionPill({
  active,
  title,
  body,
  onClick,
}: {
  active: boolean;
  title: string;
  body?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative overflow-hidden rounded-[22px] border px-[28px] py-[16px] text-left transition duration-200 ${
        active
          ? "border-[#d942ff] bg-[linear-gradient(180deg,rgba(158,52,255,0.24),rgba(217,66,255,0.18))] shadow-[0_18px_42px_rgba(217,66,255,0.18)]"
          : "border-white/12 bg-white/[0.08] hover:border-white/18"
      }`}
    >
      <div className="relative z-10 flex flex-col gap-[6px]">
        <p className={`text-[18px] font-semibold ${active ? "text-white" : "text-white/92"}`}>
          {title}
        </p>
        {body ? (
          <p className={`text-[14px] leading-[1.4] ${active ? "text-white/90" : "text-white/72"}`}>
            {body}
          </p>
        ) : null}
      </div>
    </button>
  );
}

export function NachtwaescheIntroTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<NachtwaescheIntroScreen>) {
  const { WorkflowShell, AvatarDiamond, ActionPill } = shared;

  return (
    <WorkflowShell workflow={workflow} backdropImage={screen.backdropImage}>
      <img
        src={screen.backdropImage}
        alt=""
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.74)_100%)]" />

      <motion.section
        initial={{ opacity: 0, y: 22, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={entryTransition}
        className="absolute inset-x-0 top-[188px] z-10 flex justify-center"
      >
        <div className="flex w-[700px] flex-col items-center gap-[34px] text-center">
          <div className="flex flex-col items-center gap-[24px]">
            <AvatarDiamond image={screen.avatar} size="xl" glowPreset="workwear-intro" />
            <div className="flex flex-col gap-[12px]">
              <h1 className="text-kiosk-title-page">{screen.headline}</h1>
              <p className="text-kiosk-body-lg leading-[1.46] text-white/92">
                {screen.body}
              </p>
            </div>
          </div>

          <ActionPill
            workflowId={workflow.id}
            targetId={screen.ctaTarget}
            glowPreset="workwear-intro"
            className="w-auto min-w-[147px]"
            contentClassName="whitespace-nowrap px-[22px]"
          >
            {screen.ctaLabel}
          </ActionPill>
        </div>
      </motion.section>
    </WorkflowShell>
  );
}

export function NachtwaescheMoodboardTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<NachtwaescheMoodboardScreen>) {
  const router = useRouter();
  const { ScreenShell, NarrativeCard, FramedStage, SubtleActionPill } = shared;

  return (
    <ScreenShell workflow={workflow} screen={screen} hideFooter disableEntryAnimation>
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1218px] items-center justify-between gap-[32px]">
          <div className="flex w-[486px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[486px]"
              avatar={screen.avatar}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={childTransition}>
              <SubtleActionPill
                label={screen.ctaLabel}
                onClick={() => router.push(buildScreenHref(workflow.id, screen.ctaTarget))}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={entryTransition}
            className="relative w-[700px]"
          >
            <FramedStage className="relative h-[520px] w-[700px] rounded-[40px] border-2 border-[var(--border-frame)] bg-white">
              <img
                src={screen.moodboardImage}
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute bottom-[22px] right-[22px] h-[176px] w-[126px] overflow-hidden rounded-[18px] border border-[var(--border-frame)] bg-white shadow-[0_16px_34px_rgba(0,0,0,0.18)]">
                <img
                  src={screen.mannequinImage}
                  alt=""
                  className="pointer-events-none h-full w-full object-cover"
                />
              </div>
            </FramedStage>
          </motion.div>
        </div>
      </div>
    </ScreenShell>
  );
}

export function NachtwaescheProductConceptTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<NachtwaescheProductConceptScreen>) {
  const router = useRouter();
  const {
    ScreenShell,
    NarrativeCard,
    FramedStage,
    SubtleActionPill,
    SegmentedStateToggle,
  } = shared;
  const [selectedId, setSelectedId] = useState(screen.options[0]?.id);
  const [confirmed, setConfirmed] = useState(false);
  const activeOption = screen.options.find((option) => option.id === selectedId);
  const activeImageClassName =
    activeOption?.imageClassName ??
    "pointer-events-none absolute inset-0 h-full w-full object-cover object-center";

  return (
    <ScreenShell workflow={workflow} screen={screen} hideFooter disableEntryAnimation>
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1136px] items-center justify-between gap-[34px]">
          <div className="flex w-[486px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[486px]"
              avatar={screen.avatar}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />
            {confirmed ? (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={childTransition}>
                <SubtleActionPill
                  label={screen.ctaLabel}
                  onClick={() => router.push(buildScreenHref(workflow.id, screen.ctaTarget))}
                />
              </motion.div>
            ) : null}
          </div>

          <div className="flex w-[520px] flex-col items-center gap-[18px]">
            <FramedStage className="relative h-[520px] w-[432px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={activeOption?.image}
                  src={activeOption?.image}
                  alt=""
                  initial={{ opacity: 0.42, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className={activeImageClassName}
                />
              </AnimatePresence>
            </FramedStage>

            <SegmentedStateToggle
              className="w-[392px]"
              options={screen.options.map((option) => ({
                id: option.id,
                label: option.label,
                icon: "spark",
                active: option.id === selectedId,
                onClick: () => {
                  setSelectedId(option.id);
                  setConfirmed(true);
                },
              }))}
            />
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

export function NachtwaescheTryOnTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<NachtwaescheTryOnScreen>) {
  const router = useRouter();
  const { ScreenShell, NarrativeCard, FramedStage, SubtleActionPill } = shared;
  const [selectedId, setSelectedId] = useState(screen.options[0]?.id);
  const [hasSelectedExplicitly, setHasSelectedExplicitly] = useState(false);
  const activeOption = screen.options.find((option) => option.id === selectedId);
  const activeImageClassName =
    activeOption?.imageClassName ??
    "pointer-events-none absolute inset-0 h-full w-full object-cover object-center";
  const showDelayedCTA = useDelayedReveal(
    !hasSelectedExplicitly && !screen.options.some((option) => option.ctaHref),
    screen.ctaDelayMs ?? 0,
  );
  const showCTA = screen.options.some((option) => option.ctaHref)
    ? hasSelectedExplicitly
    : hasSelectedExplicitly || showDelayedCTA;
  const ctaHref = activeOption?.ctaHref;

  return (
    <ScreenShell workflow={workflow} screen={screen} hideFooter disableEntryAnimation>
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1120px] items-center justify-between gap-[28px]">
          <div className="flex w-[486px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[486px]"
              avatar={screen.avatar}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />
            <div className="flex w-full gap-[14px]">
              {screen.options.map((option) => (
                <div key={option.id} className="flex-1">
                  <SelectionPill
                    active={option.id === selectedId}
                    title={option.title}
                    body={option.body}
                    onClick={() => {
                      setSelectedId(option.id);
                      setHasSelectedExplicitly(true);
                    }}
                  />
                </div>
              ))}
            </div>
            {showCTA ? (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={childTransition}>
                <SubtleActionPill
                  label={screen.ctaLabel}
                  onClick={() =>
                    router.push(ctaHref ?? buildScreenHref(workflow.id, screen.ctaTarget))
                  }
                />
              </motion.div>
            ) : null}
          </div>

          <motion.div initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={entryTransition}>
            <FramedStage className="relative h-[600px] w-[480px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={activeOption?.image}
                  src={activeOption?.image}
                  alt=""
                  initial={{ opacity: 0.42, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className={activeImageClassName}
                />
              </AnimatePresence>
            </FramedStage>
          </motion.div>
        </div>
      </div>
    </ScreenShell>
  );
}

export function NachtwaescheRenderGalleryTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<NachtwaescheRenderGalleryScreen>) {
  const router = useRouter();
  const { ScreenShell, NarrativeCard, FramedStage, ThumbnailCard, SubtleActionPill } = shared;
  const [activeBranchId, setActiveBranchId] = useState(screen.defaultBranchId);
  const activeBranch =
    screen.branches.find((branch) => branch.id === activeBranchId) ??
    screen.branches.find((branch) => branch.id === screen.defaultBranchId) ??
    screen.branches[0];
  const [selectedId, setSelectedId] = useState(activeBranch?.options[0]?.id);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedBranchId = params.get(screen.branchQueryParam);
    const nextBranchId = screen.branches.some((branch) => branch.id === requestedBranchId)
      ? requestedBranchId!
      : screen.defaultBranchId;
    setActiveBranchId(nextBranchId);
  }, [screen.branchQueryParam, screen.branches, screen.defaultBranchId]);

  useEffect(() => {
    setSelectedId(activeBranch?.options[0]?.id);
  }, [activeBranch?.id, activeBranch?.options]);

  const activeOption =
    activeBranch?.options.find((option) => option.id === selectedId) ?? activeBranch?.options[0];

  return (
    <ScreenShell workflow={workflow} screen={screen} hideFooter disableEntryAnimation>
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1160px] items-center justify-between">
          <div className="flex w-[486px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[486px]"
              avatar={screen.avatar}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={childTransition}>
              <SubtleActionPill
                label={screen.ctaLabel}
                onClick={() => router.push(buildScreenHref(workflow.id, screen.ctaTarget))}
              />
            </motion.div>
          </div>

          <div className="flex w-[560px] items-start gap-[16px]">
            <FramedStage className="relative h-[560px] w-[432px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={activeOption?.image}
                  src={activeOption?.image}
                  alt=""
                  initial={{ opacity: 0.42, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </FramedStage>

            <div className="flex max-h-[560px] flex-col gap-[12px] overflow-y-auto pr-[2px]">
              {activeBranch?.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedId(option.id)}
                  aria-label={option.label}
                >
                  <ThumbnailCard
                    active={option.id === activeOption?.id}
                    className="h-[104px] w-[104px] rounded-[20px]"
                  >
                    <img
                      src={option.thumbImage}
                      alt=""
                      className="pointer-events-none h-full w-full object-cover"
                    />
                  </ThumbnailCard>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

export function NachtwaescheGraphicGenerationTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<NachtwaescheGraphicGenerationScreen>) {
  const router = useRouter();
  const {
    ScreenShell,
    NarrativeCard,
    FramedStage,
    StepThreeStatusPill,
    ActionPill,
    SubtleActionPill,
    ThumbnailCard,
  } = shared;
  const [phase, setPhase] = useState<"prompt" | "processing" | "resultGallery">("prompt");
  const [selectedId, setSelectedId] = useState(screen.options[0]?.id);
  const showCTA = useDelayedReveal(phase === "resultGallery", screen.resultCtaDelayMs);
  const activeOption = screen.options.find((option) => option.id === selectedId) ?? screen.options[0];

  useEffect(() => {
    if (phase !== "processing") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPhase("resultGallery");
    }, screen.processingMs);

    return () => window.clearTimeout(timeoutId);
  }, [phase, screen.processingMs]);

  return (
    <ScreenShell workflow={workflow} screen={screen} hideFooter disableEntryAnimation>
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1160px] items-center justify-between">
          <div className="flex w-[486px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[486px]"
              avatar={screen.avatar}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />
            {showCTA ? (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={childTransition}>
                <SubtleActionPill
                  label={screen.ctaLabel}
                  onClick={() => router.push(buildScreenHref(workflow.id, screen.ctaTarget))}
                />
              </motion.div>
            ) : null}
          </div>

          <div className="flex w-[500px] flex-col items-center gap-[16px]">
            {phase === "prompt" ? (
              <>
                <FramedStage className="relative h-[300px] w-[420px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
                  <img
                    src={screen.blankBagImage}
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-contain p-[6px]"
                  />
                </FramedStage>

                <div className="flex w-[420px] flex-col items-start gap-[14px] rounded-[22px] border border-white/12 bg-white/[0.08] px-[22px] py-[18px] text-white">
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[22px] font-semibold">{screen.promptTitle}</p>
                    <p className="max-w-[360px] text-[17px] leading-[1.42] text-white/78">
                      {screen.promptBody}
                    </p>
                  </div>
                  <div className="flex w-full justify-center">
                    <ActionPill onClick={() => setPhase("processing")}>{screen.generateLabel}</ActionPill>
                  </div>
                </div>
              </>
            ) : phase === "processing" ? (
              <>
                <FramedStage className="relative h-[300px] w-[420px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
                  <img
                    src={screen.blankBagImage}
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-contain p-[6px] blur-[14px]"
                  />
                </FramedStage>
                <StepThreeStatusPill state="processing" label={screen.processingLabel} />
              </>
            ) : (
              <div className="flex w-[560px] items-start gap-[16px]">
                <FramedStage className="relative h-[560px] w-[432px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={activeOption?.image}
                      src={activeOption?.image}
                      alt=""
                      initial={{ opacity: 0.42, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.01 }}
                      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                      className="pointer-events-none absolute inset-0 h-full w-full object-contain p-[4px]"
                    />
                  </AnimatePresence>
                </FramedStage>

                <div className="flex flex-col gap-[12px]">
                  {screen.options.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedId(option.id)}
                      aria-label={option.label}
                    >
                      <ThumbnailCard
                        active={option.id === activeOption?.id}
                        className="h-[104px] w-[104px] rounded-[20px]"
                      >
                        <img
                          src={option.thumbImage ?? option.image}
                          alt=""
                          className="pointer-events-none h-full w-full object-contain p-[4px]"
                        />
                      </ThumbnailCard>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

export function NachtwaeschePlacementTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<NachtwaeschePlacementScreen>) {
  const router = useRouter();
  const { ScreenShell, NarrativeCard, FramedStage, ThumbnailCard, SubtleActionPill } = shared;
  const [selectedId, setSelectedId] = useState(screen.options[0]?.id);
  const [hasSelectedExplicitly, setHasSelectedExplicitly] = useState(false);
  const activeOption = screen.options.find((option) => option.id === selectedId);

  return (
    <ScreenShell workflow={workflow} screen={screen} hideFooter disableEntryAnimation>
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1160px] items-center justify-between">
          <div className="flex w-[486px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[486px]"
              avatar={screen.avatar}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />
            {hasSelectedExplicitly ? (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={childTransition}>
                <SubtleActionPill
                  label={screen.ctaLabel}
                  onClick={() => router.push(buildScreenHref(workflow.id, screen.ctaTarget))}
                />
              </motion.div>
            ) : null}
          </div>

          <div className="flex w-[792px] items-start gap-[24px]">
            <FramedStage className="relative h-[706px] w-[638px] rounded-[40px] border-2 border-[var(--border-frame)] bg-white">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={activeOption?.image}
                  src={activeOption?.image}
                  alt=""
                  initial={{ opacity: 0.42, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
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
                    active={option.id === selectedId && hasSelectedExplicitly}
                    className="h-[129px] w-[129px] rounded-[14px]"
                  >
                    <img
                      src={option.thumbImage}
                      alt=""
                      className="pointer-events-none h-full w-full object-cover"
                    />
                  </ThumbnailCard>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

export function NachtwaescheClosingTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<NachtwaescheClosingScreen>) {
  const router = useRouter();
  const { WorkflowShell, AvatarDiamond, ActionPill, SecondaryPill } = shared;

  return (
    <WorkflowShell workflow={workflow} backdropImage={screen.backdropImage}>
      <img
        src={screen.backdropImage}
        alt=""
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.78)_100%)]" />

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={entryTransition}
        className="absolute inset-x-0 top-[190px] z-10 flex flex-col items-center"
      >
        <div className="flex w-[806px] flex-col items-center gap-[34px] text-center">
          <div className="flex flex-col items-center gap-[22px]">
            <AvatarDiamond image={screen.avatar} size="xl" glowPreset="workwear-intro" />
            <div className="flex flex-col gap-[8px] text-kiosk-body-lg leading-[1.45] text-white">
              {screen.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          {screen.bookingCtaLabel ? (
            <ActionPill onClick={() => router.push(screen.primaryHref)}>
              {screen.bookingCtaLabel}
            </ActionPill>
          ) : null}

          {screen.qrImage ? (
            <div className="rounded-[10px] bg-white p-[8px] shadow-[0_18px_34px_rgba(0,0,0,0.22)]">
              <img src={screen.qrImage} alt="" className="h-[84px] w-[84px]" />
            </div>
          ) : null}

          <div className="flex items-center gap-[18px]">
            <ActionPill onClick={() => router.push(screen.primaryHref)}>
              {screen.primaryCtaLabel}
            </ActionPill>
            <SecondaryPill workflowId={workflow.id} targetId={screen.secondaryCtaTarget}>
              {screen.secondaryCtaLabel}
            </SecondaryPill>
          </div>
        </div>
      </motion.section>
    </WorkflowShell>
  );
}
