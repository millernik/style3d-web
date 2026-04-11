"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  buildScreenHref,
  kioskAssets,
  type MantelCampaignScreen,
  type MantelClosingScreen,
  type MantelColorwaysScreen,
  type MantelDetailGalleryScreen,
  type MantelImageToSketchScreen,
  type MantelIntroScreen,
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
    avatarGlowPreset?: "default" | "workwear-intro" | "workwear-card" | "workwear-step3";
  }) => ReactNode;
  AvatarDiamond: (props: {
    image: string;
    size: "md" | "xl";
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

export function MantelIntroTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<MantelIntroScreen>) {
  const router = useRouter();
  const { WorkflowShell, AvatarDiamond, ActionPill, SecondaryPill } = shared;

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
        className="absolute inset-x-0 top-[228px] z-10 flex flex-col items-center"
      >
        <div className="relative flex w-[940px] flex-col items-center gap-[4px]">
          {screen.participants.map((participant) => {
            const isLeft = participant.align === "left";

            return (
              <div
                key={participant.id}
                className={`relative flex w-full items-start ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`flex items-center gap-[8px] ${
                    isLeft ? "" : "flex-row-reverse"
                  }`}
                >
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

          <div className="mt-0 w-[748px] text-center text-[20px] leading-[1.36] text-white">
            {screen.summary.map((line) => (
              <p key={line} className="mb-[6px] last:mb-0">
                {line}
              </p>
            ))}
          </div>

          <div className="mt-[2px] flex items-center gap-[18px]">
            <ActionPill
              onClick={() =>
                router.push(buildScreenHref(workflow.id, screen.primaryCtaTarget))
              }
            >
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
  const [controlsVisible, setControlsVisible] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(100);

  useEffect(() => {
    setControlsVisible(false);
    setSliderPosition(100);

    const timeoutId = window.setTimeout(() => {
      setControlsVisible(true);
      setSliderPosition(52);
    }, screen.autoRevealMs);

    return () => window.clearTimeout(timeoutId);
  }, [screen.autoRevealMs]);

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
            {controlsVisible ? (
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
            className="flex w-[520px] flex-col items-end gap-[18px]"
          >
            <div className="flex w-full items-start justify-end gap-[12px]">
              <div className="w-[398px]">
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
                        artClassName="h-full w-full object-contain p-[20px]"
                        renderArtClassName="h-full w-full object-contain p-[20px]"
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
                          className="pointer-events-none absolute inset-0 h-full w-full object-contain p-[20px]"
                        />
                      </FramedStage>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <FramedStage className="relative h-[92px] w-[92px] rounded-[20px] border border-[var(--border-frame)] bg-white">
                <img
                  src={screen.swatchImage}
                  alt=""
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
              </FramedStage>
            </div>

            {controlsVisible ? (
              <div className="w-[398px]">
                <ComparisonTrack position={sliderPosition} onChange={setSliderPosition} />
              </div>
            ) : (
              <div className="w-[398px] opacity-30">
                <ComparisonTrack position={0} onChange={() => {}} />
              </div>
            )}
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
  const [selectedDetailId, setSelectedDetailId] = useState<string | null>(null);
  const activeDetail = screen.detailOptions.find(
    (detail) => detail.id === selectedDetailId,
  );
  const activeImage = activeDetail?.heroImage ?? screen.heroImage;

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
                  className="pointer-events-none absolute inset-0 h-full w-full object-contain p-[16px]"
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

export function MantelTryOnTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<MantelTryOnScreen>) {
  const router = useRouter();
  const { ScreenShell, NarrativeCard, FramedStage, SegmentedStateToggle, SubtleActionPill } =
    shared;
  const [selectedOptionId, setSelectedOptionId] = useState(screen.options[0]?.id);
  const showCTA = useDelayedReveal(true, screen.ctaDelayMs);
  const activeOption = screen.options.find((option) => option.id === selectedOptionId);

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
            <div className="w-[412px]">
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
  const { ScreenShell, NarrativeCard, FramedStage, StepThreeStatusPill, ActionPill, SubtleActionPill, SegmentedStateToggle } =
    shared;
  const [phase, setPhase] = useState<"prompt" | "processing" | "resultCompare">("prompt");
  const [resultView, setResultView] = useState<"sketch" | "image">("sketch");
  const showCTA = useDelayedReveal(phase === "resultCompare", screen.resultCtaDelayMs);

  useEffect(() => {
    if (phase !== "processing") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPhase("resultCompare");
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
                <FramedStage className="relative h-[210px] w-[454px] rounded-[28px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] backdrop-blur-[18px]">
                  <div className="flex h-full items-center gap-[18px] px-[20px]">
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
                      <p className="mt-[14px] text-kiosk-body-md leading-[1.45]">
                        {screen.promptBody}
                      </p>
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
                <div className="flex w-full items-start justify-center gap-[16px]">
                  {[
                    { id: "sketch", image: screen.sketchImage },
                    { id: "image", image: screen.renderImage },
                  ].map((item) => {
                    const isActive = resultView === item.id;

                    return (
                      <FramedStage
                        key={item.id}
                        className={`relative h-[380px] w-[216px] rounded-[28px] border-2 bg-white ${
                          isActive
                            ? "border-[#bb7fff] shadow-[0_0_26px_rgba(193,114,255,0.22)]"
                            : "border-[var(--border-frame)]"
                        }`}
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                        />
                      </FramedStage>
                    );
                  })}
                </div>
                <div className="w-[454px]">
                  <SegmentedStateToggle
                    className="w-full"
                    options={[
                      {
                        id: "sketch",
                        label: screen.resultToggleLabels[0],
                        icon: "spark",
                        active: resultView === "sketch",
                        onClick: () => setResultView("sketch"),
                      },
                      {
                        id: "image",
                        label: screen.resultToggleLabels[1],
                        icon: "spark",
                        active: resultView === "image",
                        onClick: () => setResultView("image"),
                      },
                    ]}
                  />
                </div>
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

          <div className="flex w-[520px] items-start justify-center gap-[16px]">
            <FramedStage className="relative h-[520px] w-[414px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
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
            <div className="flex flex-col gap-[12px]">
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
                    className="h-[96px] w-[96px] rounded-[18px]"
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

export function MantelCampaignTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<MantelCampaignScreen>) {
  const router = useRouter();
  const { ScreenShell, NarrativeCard, FramedStage, ActionPill, SubtleActionPill, SegmentedStateToggle, StepThreeStatusPill } =
    shared;
  const [phase, setPhase] = useState<
    "scenePreset" | "prompt" | "processing" | "resultDone" | "lightingToggle" | "videoPreview"
  >("scenePreset");
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [selectedLightingId, setSelectedLightingId] = useState(
    screen.lightingOptions[0]?.id,
  );
  const showCTA = useDelayedReveal(phase === "videoPreview", screen.resultCtaDelayMs);

  const selectedPreset =
    screen.presetOptions.find((option) => option.id === selectedPresetId) ??
    screen.presetOptions[0];
  const activeLighting =
    screen.lightingOptions.find((option) => option.id === selectedLightingId) ??
    screen.lightingOptions[0];

  useEffect(() => {
    if (phase !== "processing") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPhase("resultDone");
    }, screen.processingMs);

    return () => window.clearTimeout(timeoutId);
  }, [phase, screen.processingMs]);

  useEffect(() => {
    if (phase !== "resultDone") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPhase("lightingToggle");
    }, screen.lightingRevealMs);

    return () => window.clearTimeout(timeoutId);
  }, [phase, screen.lightingRevealMs]);

  useEffect(() => {
    if (phase !== "lightingToggle") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPhase("videoPreview");
    }, screen.videoAutoAdvanceMs);

    return () => window.clearTimeout(timeoutId);
  }, [phase, screen.videoAutoAdvanceMs]);

  const activeCampaignImage = useMemo(() => {
    if (phase === "videoPreview") {
      return screen.videoPoster;
    }

    if (phase === "lightingToggle") {
      return activeLighting.image;
    }

    if (phase === "resultDone") {
      return screen.resultDoneImage;
    }

    return selectedPreset.image;
  }, [
    activeLighting.image,
    phase,
    screen.resultDoneImage,
    screen.videoPoster,
    selectedPreset.image,
  ]);

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
            {phase === "scenePreset" ? (
              <div className="grid w-full grid-cols-2 gap-[16px]">
                {screen.presetOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setSelectedPresetId(option.id);
                      setPhase("prompt");
                    }}
                    className="text-left"
                  >
                    <FramedStage className="relative h-[380px] w-[256px] rounded-[28px] border-2 border-[var(--border-frame)] bg-white">
                      <img
                        src={option.image}
                        alt=""
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute bottom-[18px] left-[18px] rounded-full bg-[rgba(0,0,0,0.46)] px-[16px] py-[8px] text-kiosk-label-md text-white backdrop-blur-[14px]">
                        {option.label}
                      </div>
                    </FramedStage>
                  </button>
                ))}
              </div>
            ) : phase === "prompt" ? (
              <>
                <FramedStage className="relative h-[344px] w-[454px] rounded-[28px] border-2 border-[var(--border-frame)] bg-white">
                  <img
                    src={selectedPreset.image}
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  />
                </FramedStage>
                <div className="glass-card flex w-[454px] flex-col items-start rounded-[22px] px-[24px] py-[22px] text-left text-white">
                  <p className="text-kiosk-label-md font-semibold">Prompt:</p>
                  <p className="mt-[14px] text-kiosk-body-md leading-[1.45]">
                    {screen.promptBody}
                  </p>
                </div>
                <ActionPill onClick={() => setPhase("processing")}>
                  {screen.generateLabel}
                </ActionPill>
              </>
            ) : phase === "processing" ? (
              <div className="flex flex-col items-center gap-[16px]">
                <FramedStage className="relative h-[452px] w-[454px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
                  <img
                    src={selectedPreset.image}
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover blur-[16px]"
                  />
                </FramedStage>
                <StepThreeStatusPill state="processing" label={screen.processingLabel} />
              </div>
            ) : phase === "resultDone" ? (
              <div className="flex flex-col items-center gap-[16px]">
                <FramedStage className="relative h-[452px] w-[454px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
                  <img
                    src={activeCampaignImage}
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  />
                </FramedStage>
                <StepThreeStatusPill state="done" label={screen.finishedLabel} />
              </div>
            ) : phase === "lightingToggle" ? (
              <>
                <FramedStage className="relative h-[452px] w-[454px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
                  <img
                    src={activeCampaignImage}
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  />
                </FramedStage>
                <div className="w-[454px]">
                  <SegmentedStateToggle
                    className="w-full"
                    options={screen.lightingOptions.map((option) => ({
                      id: option.id,
                      label: option.label,
                      icon: "spark",
                      active: option.id === selectedLightingId,
                      onClick: () => {
                        setSelectedLightingId(option.id);
                        setPhase("videoPreview");
                      },
                    }))}
                  />
                </div>
              </>
            ) : (
              <FramedStage className="relative h-[520px] w-[454px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
                <img
                  src={screen.videoPoster}
                  alt=""
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.28))]" />
                {screen.videoOverlay ? (
                  <img
                    src={screen.videoOverlay}
                    alt=""
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2"
                  />
                ) : null}
              </FramedStage>
            )}
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
        className="absolute left-[84px] top-[144px] z-10 flex h-[738px] w-[1272px] flex-col justify-between"
      >
        <div className="flex w-[670px] flex-col gap-[16px]">
          <div className="flex items-start gap-[14px]">
            <div className="flex flex-col items-center gap-[5px]">
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

          <div className="ml-[112px] flex items-start gap-[14px]">
            <div className="max-w-[420px] rounded-[18px] border border-[rgba(212,130,255,0.18)] bg-[rgba(70,36,77,0.42)] px-[20px] py-[14px] text-[16px] leading-[1.38] text-white backdrop-blur-[18px]">
              {screen.rightBubble}
            </div>
            <div className="flex flex-col items-center gap-[5px]">
              <AvatarDiamond
                image={screen.avatarRight}
                size="md"
                glowPreset="workwear-card"
              />
              <span className="text-[15px] font-medium text-white">Adrian</span>
            </div>
          </div>

          <div className="w-[620px] pt-[2px] text-[20px] leading-[1.36] text-white">
            {screen.body.map((line) => (
              <p key={line} className="mb-[8px] last:mb-0">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-[16px]">
            <ActionPill onClick={() => router.push(screen.primaryHref)}>
              {screen.primaryCtaLabel}
            </ActionPill>
            <SecondaryPill>{screen.secondaryCtaLabel}</SecondaryPill>
          </div>
          <div className="flex items-center gap-[12px] text-kiosk-title-shell font-extralight text-white">
            <span>{screen.footer?.current ?? 7}</span>
            <span className="block h-[2px] w-[165px] rounded-[100px] bg-[#757575]" />
            <span>{screen.footer?.total ?? 7}</span>
          </div>
        </div>
      </motion.section>
    </WorkflowShell>
  );
}
