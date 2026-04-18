"use client";

import CloudySnowingIcon from "@mui/icons-material/CloudySnowing";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  buildScreenHref,
  kioskAssets,
  type MantelCampaignScreen,
  type MantelCampaignGenerationScreen,
  type MantelClosingScreen,
  type MantelColorwaysScreen,
  type MantelDetailGalleryScreen,
  type MantelImageToSketchScreen,
  type MantelIntroScreen,
  type MantelReviewGalleryScreen,
  type MantelTechPackScreen,
  type MantelTryOnScreen,
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
    avatarSize?: "sm" | "md";
    avatarGlowPreset?: "default" | "workwear-intro" | "workwear-card" | "workwear-step3";
  }) => ReactNode;
  AvatarDiamond: (props: {
    image: string;
    size: "sm" | "md" | "xl";
    glowPreset?: "default" | "workwear-intro" | "workwear-card" | "workwear-step3";
  }) => ReactNode;
  FramedStage: (props: { children: ReactNode; className: string }) => ReactNode;
  BeforeAfterSlider: (props: {
    sketchSrc: string;
    renderSrc: string;
    position: number;
    onChange?: (position: number) => void;
    className?: string;
    artClassName?: string;
    renderArtClassName?: string;
  }) => ReactNode;
  ComparisonTrack: (props: {
    position: number;
    onChange: (position: number) => void;
    railClassName?: string;
  }) => ReactNode;
  StepThreeStatusPill: (props: {
    state: "processing" | "done";
    label: string;
  }) => React.ReactNode;
  ActionPill: (props: {
    children: React.ReactNode;
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

function PromptWordFade({
  text,
  className,
  keyPrefix,
}: {
  text: string;
  className: string;
  keyPrefix: string;
}) {
  const tokens = text.match(/\S+|\s+/g) ?? [text];
  let wordIndex = 0;

  return (
    <p aria-label={text} className={className}>
      {tokens.map((token, index) => {
        if (/^\s+$/.test(token)) {
          return (
            <span key={`${keyPrefix}-space-${index}`} aria-hidden="true">
              {token}
            </span>
          );
        }

        const delay = wordIndex * 0.045;
        wordIndex += 1;

        return (
          <motion.span
            key={`${keyPrefix}-word-${index}`}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.24,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {token}
          </motion.span>
        );
      })}
    </p>
  );
}

export function MantelIntroTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<MantelIntroScreen>) {
  const router = useRouter();
  const { WorkflowShell, AvatarDiamond, ActionPill, SecondaryPill } = shared;
  const hasSecondaryCta = Boolean(screen.secondaryCtaLabel.trim());

  return (
    <WorkflowShell workflow={workflow} backdropImage={screen.backdropImage}>
      <img
        src={screen.backdropImage}
        alt=""
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.42),rgba(0,0,0,0.72))]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={entryTransition}
        className="pointer-events-none absolute left-1/2 top-[836px] z-[2] h-[92px] w-[236px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-kiosk-gradient opacity-[0.22] blur-[42px]"
      />
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={entryTransition}
        className="absolute inset-x-0 top-[198px] z-10 flex flex-col items-center"
      >
        <div className="relative flex w-[940px] flex-col items-center gap-0">
          {screen.participants.map((participant, index) => {
            const isLeft = participant.align === "left";
            const previousParticipant = screen.participants[index - 1];
            const showIdentity =
              !previousParticipant ||
              previousParticipant.name !== participant.name ||
              previousParticipant.avatar !== participant.avatar ||
              previousParticipant.align !== participant.align;
            const participantSpacingClass = index === 0 ? "" : "-mt-[42px]";
            const conversationOffsetClass = showIdentity
              ? ""
              : isLeft
                ? "pl-[212px] -mt-[36px]"
                : "pr-[212px] -mt-[36px]";

            return (
              <div
                key={participant.id}
                className={`relative flex w-full items-start ${
                  isLeft ? "justify-start" : "justify-end"
                } ${participantSpacingClass} ${conversationOffsetClass}`}
              >
                <div
                  className={`flex items-center gap-[8px] ${
                    isLeft ? "" : "flex-row-reverse"
                  }`}
                >
                  {showIdentity ? (
                    <div className="flex flex-col items-center gap-[2px]">
                      <AvatarDiamond
                        image={participant.avatar}
                        size="md"
                        glowPreset="workwear-card"
                      />
                      <span className="text-[17px] font-medium text-white">
                        {participant.name}
                      </span>
                    </div>
                  ) : null}
                  <div
                    className={`max-w-[424px] rounded-[18px] border px-[22px] py-[14px] text-[17px] leading-[1.36] text-white backdrop-blur-[18px] ${
                      participant.tone === "cool"
                        ? "border-[rgba(129,209,255,0.18)] bg-[rgba(31,58,92,0.46)] shadow-[0_0_38px_rgba(71,169,255,0.08)]"
                        : "border-[rgba(212,130,255,0.18)] bg-[rgba(70,36,77,0.44)] shadow-[0_0_38px_rgba(204,105,255,0.12)]"
                    }`}
                  >
                    {participant.bubble}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="mt-[20px] flex items-center gap-[18px]">
            <ActionPill
              onClick={() =>
                router.push(buildScreenHref(workflow.id, screen.primaryCtaTarget))
              }
            >
              {screen.primaryCtaLabel}
            </ActionPill>
            {hasSecondaryCta ? (
              <SecondaryPill
                workflowId={workflow.id}
                targetId={screen.secondaryCtaTarget}
              >
                {screen.secondaryCtaLabel}
              </SecondaryPill>
            ) : null}
          </div>
        </div>
      </motion.section>
    </WorkflowShell>
  );
}

export function MantelImageToSketchTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<MantelImageToSketchScreen>) {
  const router = useRouter();
  const {
    ScreenShell,
    NarrativeCard,
    FramedStage,
    BeforeAfterSlider,
    ComparisonTrack,
    SubtleActionPill,
  } = shared;
  const [controlsVisible, setControlsVisible] = useState(
    Boolean(screen.controlsVisibleOnLoad),
  );
  const [ctaVisible, setCtaVisible] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(
    screen.controlsVisibleOnLoad ? (screen.initialSliderPosition ?? 52) : 100,
  );

  useEffect(() => {
    setCtaVisible(false);

    if (screen.controlsVisibleOnLoad) {
      setControlsVisible(true);
      setSliderPosition(screen.initialSliderPosition ?? 52);
      const timeoutId = window.setTimeout(() => {
        setCtaVisible(true);
      }, screen.autoRevealMs);

      return () => window.clearTimeout(timeoutId);
    }

    setControlsVisible(false);
    setSliderPosition(100);

    const timeoutId = window.setTimeout(() => {
      setControlsVisible(true);
      setCtaVisible(true);
      setSliderPosition(screen.initialSliderPosition ?? 52);
    }, screen.autoRevealMs);

    return () => window.clearTimeout(timeoutId);
  }, [screen.autoRevealMs, screen.controlsVisibleOnLoad, screen.initialSliderPosition]);

  return (
    <ScreenShell workflow={workflow} screen={screen} hideFooter disableEntryAnimation>
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1136px] items-center justify-between">
          <div className="flex w-[486px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[478px]"
              avatar={kioskAssets.mantel.introAdrian}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />
            {ctaVisible ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={childTransition}
              >
                <SubtleActionPill
                  label={screen.ctaLabel}
                  onClick={() =>
                    router.push(buildScreenHref(workflow.id, screen.ctaTarget))
                  }
                />
              </motion.div>
            ) : null}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={entryTransition}
            className="flex w-[520px] flex-col items-center gap-[18px]"
          >
            <div className="grid grid-cols-[398px_92px] grid-rows-[auto_auto] items-start gap-x-[12px] gap-y-[16px]">
              <div className="col-start-1 row-start-1 w-[398px]">
                <AnimatePresence mode="wait" initial={false}>
                  {controlsVisible ? (
                    <motion.div
                      key="compare-ready"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <BeforeAfterSlider
                        sketchSrc={screen.baseImage}
                        renderSrc={screen.renderImage}
                        position={sliderPosition}
                        onChange={setSliderPosition}
                        className="h-[478px] w-[398px] rounded-[34px]"
                        artClassName="h-full w-full object-cover"
                        renderArtClassName="h-full w-full object-cover"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <FramedStage className="relative h-[478px] w-[398px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
                        <img
                          src={screen.baseImage}
                          alt=""
                          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                        />
                      </FramedStage>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <FramedStage className="relative col-start-2 row-start-1 h-[92px] w-[92px] rounded-[20px] border border-[var(--border-frame)] bg-white">
                <img
                  src={screen.swatchImage}
                  alt=""
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
              </FramedStage>

              <div className={`col-start-1 row-start-2 w-[398px] ${controlsVisible ? "" : "opacity-30"}`}>
                {controlsVisible ? (
                  <ComparisonTrack
                    position={sliderPosition}
                    onChange={setSliderPosition}
                    railClassName={screen.comparisonRailClassName}
                  />
                ) : (
                  <ComparisonTrack
                    position={0}
                    onChange={() => {}}
                    railClassName={screen.comparisonRailClassName}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ScreenShell>
  );
}

export function MantelDetailGalleryTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<MantelDetailGalleryScreen>) {
  const router = useRouter();
  const { ScreenShell, NarrativeCard, FramedStage, ThumbnailCard, SubtleActionPill } =
    shared;
  const [selectedDetailId, setSelectedDetailId] = useState<string | null>(
    screen.detailOptions[0]?.id ?? null,
  );
  const activeDetail = screen.detailOptions.find(
    (detail) => detail.id === selectedDetailId,
  ) ?? screen.detailOptions[0];
  const activeImage = activeDetail?.heroImage ?? screen.heroImage;
  const activeImageClassName =
    activeDetail?.heroImageClassName ??
    "absolute inset-0 h-full w-full object-cover";

  return (
    <ScreenShell workflow={workflow} screen={screen} hideFooter disableEntryAnimation>
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1120px] items-center justify-between">
          <div className="flex w-[486px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[486px]"
              avatar={kioskAssets.mantel.introAdrian}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />
            {selectedDetailId ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={childTransition}
              >
                <SubtleActionPill
                  label={screen.ctaLabel}
                  onClick={() =>
                    router.push(buildScreenHref(workflow.id, screen.ctaTarget))
                  }
                />
              </motion.div>
            ) : null}
          </div>

          <div className="flex w-[520px] flex-col items-center gap-[16px]">
            <FramedStage className="relative h-[474px] w-[398px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt=""
                  initial={{ opacity: 0.45, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className={`pointer-events-none ${activeImageClassName}`}
                />
              </AnimatePresence>
            </FramedStage>

            <div className="grid grid-cols-4 gap-[12px]">
              {screen.detailOptions.map((detail) => (
                <button
                  key={detail.id}
                  type="button"
                  onClick={() => setSelectedDetailId(detail.id)}
                  aria-label={detail.label}
                >
                  <ThumbnailCard
                    active={detail.id === selectedDetailId}
                    className="h-[92px] w-[92px] rounded-[18px]"
                  >
                    <img
                      src={detail.thumbImage}
                      alt=""
                      className={`pointer-events-none ${
                        detail.thumbImageClassName ?? "h-full w-full object-cover"
                      }`}
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

export function MantelTryOnTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<MantelTryOnScreen>) {
  const router = useRouter();
  const { ScreenShell, NarrativeCard, FramedStage, SegmentedStateToggle, SubtleActionPill, ActionPill } =
    shared;
  const [selectedOptionId, setSelectedOptionId] = useState(screen.options[0]?.id);
  const [hasGenerated, setHasGenerated] = useState(
    !screen.requireGenerateBeforeOptions,
  );
  const [showIntroImage, setShowIntroImage] = useState(
    Boolean(screen.introImage) && !screen.requireGenerateBeforeOptions,
  );
  const showCTA = useDelayedReveal(hasGenerated, screen.ctaDelayMs);
  const activeOption = screen.options.find((option) => option.id === selectedOptionId);
  const activeImage =
    !hasGenerated && screen.introImage
      ? screen.introImage
      : showIntroImage && screen.introImage
        ? screen.introImage
        : activeOption?.image;

  useEffect(() => {
    if (!screen.introImage || screen.requireGenerateBeforeOptions) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowIntroImage(false);
    }, screen.introTransitionMs ?? 1200);

    return () => window.clearTimeout(timeoutId);
  }, [screen.introImage, screen.introTransitionMs, screen.requireGenerateBeforeOptions]);

  useEffect(() => {
    setSelectedOptionId(screen.options[0]?.id);
    setHasGenerated(!screen.requireGenerateBeforeOptions);
    setShowIntroImage(Boolean(screen.introImage) && !screen.requireGenerateBeforeOptions);
  }, [screen.id, screen.introImage, screen.options, screen.requireGenerateBeforeOptions]);

  return (
    <ScreenShell workflow={workflow} screen={screen} hideFooter disableEntryAnimation>
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1296px] items-center justify-between">
          <div className="flex w-[646px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[632px]"
              avatar={kioskAssets.mantel.introAdrian}
              text={screen.narrative}
              avatarSize="sm"
              avatarGlowPreset="workwear-card"
            />
            {screen.promptBody && (!screen.requireGenerateBeforeOptions || !hasGenerated) ? (
              <div className="glass-card flex w-[632px] flex-col items-start rounded-[22px] px-[24px] py-[22px] text-left text-white">
                <p className="text-kiosk-label-md font-semibold">
                  {screen.promptTitle ?? "Prompt:"}
                </p>
                <PromptWordFade
                  text={screen.promptBody}
                  className="mt-[14px] text-kiosk-body-md leading-[1.45]"
                  keyPrefix={`mantel-tryon-${screen.id}`}
                />
              </div>
            ) : null}
            {showCTA ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={childTransition}
              >
                <SubtleActionPill
                  label={screen.ctaLabel}
                  onClick={() =>
                    router.push(buildScreenHref(workflow.id, screen.ctaTarget))
                  }
                />
              </motion.div>
            ) : null}
          </div>

          <div className="flex w-[500px] flex-col items-center gap-[18px]">
            <FramedStage className="relative h-[512px] w-[412px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt=""
                  initial={{ opacity: 0.45, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </FramedStage>
            {screen.requireGenerateBeforeOptions && !hasGenerated ? (
              <ActionPill onClick={() => setHasGenerated(true)}>
                {screen.generateLabel ?? "Generate"}
              </ActionPill>
            ) : null}
            {hasGenerated ? (
              <div className="w-[412px]">
                <SegmentedStateToggle
                  className="w-full"
                  options={screen.options.map((option) => ({
                    id: option.id,
                    label: option.label,
                    icon: "human",
                    active: option.id === selectedOptionId,
                    onClick: () => {
                      setShowIntroImage(false);
                      setSelectedOptionId(option.id);
                    },
                  }))}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

export function MantelTechPackTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<MantelTechPackScreen>) {
  const router = useRouter();
  const { ScreenShell, NarrativeCard, FramedStage, StepThreeStatusPill, ActionPill, SubtleActionPill } =
    shared;
  const [phase, setPhase] = useState<"prompt" | "processing" | "plain" | "annotated">(
    "prompt",
  );
  const showCTA = useDelayedReveal(phase === "annotated", screen.resultCtaDelayMs);

  useEffect(() => {
    if (phase !== "processing") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPhase("plain");
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
              avatar={kioskAssets.mantel.introAdrian}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />
            {showCTA ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={childTransition}
              >
                <SubtleActionPill
                  label={screen.ctaLabel}
                  onClick={() =>
                    router.push(buildScreenHref(workflow.id, screen.ctaTarget))
                  }
                />
              </motion.div>
            ) : null}
          </div>

          <div className="flex w-[540px] flex-col items-center gap-[18px]">
            {phase === "prompt" ? (
              <>
                <FramedStage className="relative h-[248px] w-[454px] rounded-[28px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] backdrop-blur-[18px]">
                  <div className="flex h-full items-center gap-[18px] px-[20px] py-[18px]">
                    <div className="h-[170px] w-[132px] overflow-hidden rounded-[20px] border border-[var(--border-frame)] bg-white">
                      <img
                        src={screen.promptReferenceImage}
                        alt=""
                        className="pointer-events-none h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-left text-white">
                      <p className="text-kiosk-label-md font-semibold">
                        {screen.promptTitle}
                      </p>
                      <PromptWordFade
                        text={screen.promptBody}
                        className="mt-[14px] text-kiosk-body-md leading-[1.45]"
                        keyPrefix={`mantel-techpack-${screen.id}`}
                      />
                    </div>
                  </div>
                </FramedStage>
                <ActionPill onClick={() => setPhase("processing")}>
                  {screen.generateLabel}
                </ActionPill>
              </>
            ) : phase === "processing" ? (
              <div className="flex flex-col items-center gap-[16px]">
                <FramedStage className="relative h-[430px] w-[454px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
                  <img
                    src={screen.promptReferenceImage}
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover blur-[16px]"
                  />
                </FramedStage>
                <StepThreeStatusPill state="processing" label={screen.processingLabel} />
              </div>
            ) : (
              <>
                <FramedStage className="relative h-[452px] w-[454px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
                  <img
                    src={phase === "annotated" ? screen.annotatedImage : screen.sketchImage}
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-contain p-[12px]"
                  />
                </FramedStage>
                {phase === "plain" ? (
                  <SubtleActionPill
                    label={screen.annotationLabel}
                    onClick={() => setPhase("annotated")}
                  />
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

export function MantelColorwayTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<MantelColorwaysScreen>) {
  const router = useRouter();
  const { ScreenShell, NarrativeCard, FramedStage, ThumbnailCard, SubtleActionPill } =
    shared;
  const [selectedId, setSelectedId] = useState(screen.options[0]?.id);
  const [hasConfirmedSelection, setHasConfirmedSelection] = useState(false);
  const activeOption = screen.options.find((option) => option.id === selectedId);

  return (
    <ScreenShell workflow={workflow} screen={screen} hideFooter disableEntryAnimation>
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1120px] items-center justify-between">
          <div className="flex w-[486px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[486px]"
              avatar={kioskAssets.mantel.introAdrian}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />
            {hasConfirmedSelection ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={childTransition}
              >
                <SubtleActionPill
                  label={screen.ctaLabel}
                  onClick={() =>
                    router.push(buildScreenHref(workflow.id, screen.ctaTarget))
                  }
                />
              </motion.div>
            ) : null}
          </div>

          <div className="flex w-[556px] items-start justify-center gap-[18px]">
            <FramedStage className="relative h-[548px] w-[438px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={activeOption?.image}
                  src={activeOption?.image}
                  alt=""
                  initial={{ opacity: 0.45, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute inset-[2px] h-[calc(100%-4px)] w-[calc(100%-4px)] scale-[1.14] object-contain"
                />
              </AnimatePresence>
            </FramedStage>
            <div className="flex flex-col gap-[16px]">
              {screen.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(option.id);
                    setHasConfirmedSelection(true);
                  }}
                  aria-label={option.label}
                >
                  <ThumbnailCard
                    active={option.id === selectedId && hasConfirmedSelection}
                    className="h-[128px] w-[128px] rounded-[18px]"
                  >
                    <img
                      src={option.thumbImage}
                      alt=""
                      className="pointer-events-none h-full w-full scale-[1.18] object-contain"
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

export function MantelCampaignTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<MantelCampaignScreen>) {
  const router = useRouter();
  const { ScreenShell, NarrativeCard, FramedStage, SubtleActionPill } = shared;
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const activePreset =
    screen.presetOptions.find((option) => option.id === selectedPresetId) ?? null;
  const activeCampaignImage = activePreset?.image ?? screen.emptyRackImage;

  return (
    <ScreenShell workflow={workflow} screen={screen} hideFooter disableEntryAnimation>
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1160px] items-center justify-between">
          <div className="flex w-[486px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[486px]"
              avatar={kioskAssets.mantel.introAdrian}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />
            {selectedPresetId ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={childTransition}
              >
                <SubtleActionPill
                  label={screen.ctaLabel}
                  onClick={() =>
                    router.push(buildScreenHref(workflow.id, screen.ctaTarget))
                  }
                />
              </motion.div>
            ) : null}
          </div>

          <div className="flex w-[540px] flex-col items-center gap-[18px]">
            <FramedStage className="relative h-[452px] w-[454px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={activeCampaignImage}
                  src={activeCampaignImage}
                  alt=""
                  initial={{ opacity: 0.45, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </FramedStage>
            <div className="flex items-center gap-[18px]">
              {screen.presetOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedPresetId(option.id)}
                  aria-label={option.label}
                  className="flex h-[72px] min-w-[132px] items-center justify-center gap-[10px] rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.12)] px-[20px] text-[18px] font-medium text-white backdrop-blur-[16px] transition hover:bg-[rgba(255,255,255,0.16)]"
                >
                  {option.icon === "rainy" ? (
                    <CloudySnowingIcon sx={{ fontSize: 30 }} />
                  ) : (
                    <WbSunnyIcon sx={{ fontSize: 30 }} />
                  )}
                  <span>{option.id === "rain" ? "regen" : "sonne"}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

export function MantelCampaignGenerationTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<MantelCampaignGenerationScreen>) {
  const router = useRouter();
  const {
    ScreenShell,
    NarrativeCard,
    FramedStage,
    ActionPill,
    SubtleActionPill,
    StepThreeStatusPill,
    SegmentedStateToggle,
  } = shared;
  const [phase, setPhase] = useState<"prompt" | "processing" | "result">("prompt");
  const [selectedOptionId, setSelectedOptionId] = useState(screen.options[0]?.id);
  const showCTA = useDelayedReveal(phase === "result", screen.resultCtaDelayMs);
  const activeOption =
    screen.options.find((option) => option.id === selectedOptionId) ??
    screen.options[0];

  useEffect(() => {
    if (phase !== "processing") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPhase("result");
    }, screen.processingMs);

    return () => window.clearTimeout(timeoutId);
  }, [phase, screen.processingMs]);

  useEffect(() => {
    setSelectedOptionId(screen.options[0]?.id);
    setPhase("prompt");
  }, [screen.id, screen.options]);

  return (
    <ScreenShell workflow={workflow} screen={screen} hideFooter disableEntryAnimation>
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1224px] items-center justify-between">
          <div className="flex w-[548px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[548px]"
              avatar={kioskAssets.mantel.introAdrian}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />
            {showCTA ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={childTransition}
              >
                <SubtleActionPill
                  label={screen.ctaLabel}
                  onClick={() =>
                    router.push(buildScreenHref(workflow.id, screen.ctaTarget))
                  }
                />
              </motion.div>
            ) : null}
          </div>

          <div className="flex w-[560px] flex-col items-center gap-[18px]">
            {phase === "prompt" ? (
              <>
                <div className="glass-card flex w-[516px] flex-col items-start rounded-[22px] px-[24px] py-[22px] text-left text-white">
                  <p className="text-kiosk-label-md font-semibold">Prompt:</p>
                  <PromptWordFade
                    text={screen.promptBody}
                    className="mt-[14px] text-kiosk-body-md leading-[1.45]"
                    keyPrefix={`mantel-campaign-${screen.id}`}
                  />
                </div>
                <ActionPill onClick={() => setPhase("processing")}>
                  {screen.generateLabel}
                </ActionPill>
              </>
            ) : phase === "processing" ? (
              <div className="flex flex-col items-center gap-[16px]">
                <FramedStage className="relative h-[452px] w-[454px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
                  <img
                    src={screen.previewImage}
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover blur-[16px]"
                  />
                </FramedStage>
                <StepThreeStatusPill state="processing" label={screen.processingLabel} />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-[16px]">
                <FramedStage className="relative h-[452px] w-[454px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
                  <img
                    src={activeOption?.image}
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  />
                </FramedStage>
                <div className="w-[454px]">
                  <SegmentedStateToggle
                    className="w-full"
                    options={screen.options.map((option) => ({
                      id: option.id,
                      label: option.label,
                      icon: "human",
                      active: option.id === selectedOptionId,
                      onClick: () => setSelectedOptionId(option.id),
                    }))}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

export function MantelReviewGalleryTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<MantelReviewGalleryScreen>) {
  const router = useRouter();
  const { ScreenShell, NarrativeCard, FramedStage, ThumbnailCard, SubtleActionPill } =
    shared;
  const [selectedId, setSelectedId] = useState(screen.options[0]?.id);
  const activeOption = screen.options.find((option) => option.id === selectedId) ?? screen.options[0];

  return (
    <ScreenShell workflow={workflow} screen={screen} hideFooter disableEntryAnimation>
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1160px] items-center justify-between">
          <div className="flex w-[486px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[486px]"
              avatar={kioskAssets.mantel.introAdrian}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={childTransition}
            >
              <SubtleActionPill
                label={screen.ctaLabel}
                onClick={() =>
                  router.push(buildScreenHref(workflow.id, screen.ctaTarget))
                }
              />
            </motion.div>
          </div>

          <div className="flex w-[556px] items-start justify-center gap-[18px]">
            <FramedStage className="relative h-[548px] w-[438px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={activeOption?.image}
                  src={activeOption?.image}
                  alt=""
                  initial={{ opacity: 0.45, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </FramedStage>
            <div className="flex flex-col gap-[16px]">
              {screen.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedId(option.id)}
                  aria-label={option.label}
                >
                  <ThumbnailCard
                    active={option.id === selectedId}
                    className="h-[92px] w-[92px] rounded-[18px]"
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

export function MantelClosingTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<MantelClosingScreen>) {
  const router = useRouter();
  const { WorkflowShell, AvatarDiamond, SecondaryPill, ActionPill } = shared;

  return (
    <WorkflowShell workflow={workflow} backdropImage={screen.backdropImage}>
      <img
        src={screen.backdropImage}
        alt=""
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-[64%_center]"
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.38),rgba(0,0,0,0.72))]" />
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={entryTransition}
        className="pointer-events-none absolute left-[214px] top-[884px] z-[2] h-[88px] w-[244px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-kiosk-gradient opacity-[0.2] blur-[40px]"
      />

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={entryTransition}
        className="absolute left-[84px] top-[236px] z-10 flex w-[1272px] flex-col gap-[12px]"
      >
        <div className="flex w-[670px] flex-col gap-[2px]">
          <div className="flex items-center gap-[10px]">
            <div className="flex flex-col items-center gap-[2px]">
              <AvatarDiamond
                image={screen.avatarLeft}
                size="md"
                glowPreset="workwear-card"
              />
              <span className="text-[15px] font-medium text-white">Daniel</span>
            </div>
            <div className="max-w-[430px] rounded-[18px] border border-[rgba(129,209,255,0.18)] bg-[rgba(31,58,92,0.42)] px-[20px] py-[14px] text-[16px] leading-[1.38] text-white backdrop-blur-[18px]">
              {screen.leftBubble}
            </div>
          </div>

          <div className="flex w-[670px] items-center justify-end gap-[10px]">
            <div className="max-w-[420px] rounded-[18px] border border-[rgba(212,130,255,0.18)] bg-[rgba(70,36,77,0.42)] px-[20px] py-[14px] text-[16px] leading-[1.38] text-white backdrop-blur-[18px]">
              {screen.rightBubble}
            </div>
            <div className="flex flex-col items-center gap-[2px]">
              <AvatarDiamond
                image={screen.avatarRight}
                size="md"
                glowPreset="workwear-card"
              />
              <span className="text-[15px] font-medium text-white">Adrian</span>
            </div>
          </div>

          <div className="w-[620px] pt-0 text-[20px] leading-[1.32] text-white">
            {screen.body.map((line) => (
              <p key={line} className="mb-[2px] last:mb-0">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="flex w-full items-center justify-start pt-0">
          <div className="flex items-center gap-[16px]">
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
