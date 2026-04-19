"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  buildScreenHref,
  type KeyVisualClosingScreen,
  type KeyVisualGalleryOption,
  type KeyVisualGalleryScreen,
  type KeyVisualPromptScreen,
  type KeyVisualSelectorGalleryScreen,
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

function AnimatedWordPrompt({ text }: { text: string }) {
  const tokens = text.split(/(\s+)/);

  return (
    <span>
      {tokens.map((token, index) =>
        /\s+/.test(token) ? (
          <span key={`space-${index}`}>{token}</span>
        ) : (
          <motion.span
            key={`word-${index}-${token}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.24,
              delay: index * 0.045,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {token}
          </motion.span>
        ),
      )}
    </span>
  );
}

function StageLayout({
  workflow,
  screen,
  shared,
  cta,
  stage,
}: SharedProps<
  | KeyVisualStageSwapScreen
  | KeyVisualGalleryScreen
  | KeyVisualSelectorGalleryScreen
  | KeyVisualPromptScreen
> & {
  cta?: ReactNode;
  stage: ReactNode;
}) {
  const { ScreenShell, NarrativeCard } = shared;
  const layoutWidthClassName = screen.layoutWidthClassName ?? "w-[1160px]";
  const narrativeWidthClassName = screen.narrativeWidthClassName ?? "w-[486px]";
  const narrativeCardWidthClassName =
    screen.narrativeCardWidthClassName ?? "w-[486px]";

  return (
    <ScreenShell workflow={workflow} screen={screen} hideFooter disableEntryAnimation>
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div
          className={`flex items-center justify-between gap-[34px] ${layoutWidthClassName}`}
        >
          <div className={`flex flex-col items-center gap-[18px] ${narrativeWidthClassName}`}>
            <NarrativeCard
              className={`relative left-auto top-auto ${narrativeCardWidthClassName}`}
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

function GalleryPreview({
  option,
  imageSrc,
  imageClassName,
}: {
  option: KeyVisualGalleryOption | null;
  imageSrc?: string;
  imageClassName?: string;
}) {
  const resolvedImageSrc = option?.image ?? imageSrc;
  const resolvedClassName =
    option?.imageClassName ?? imageClassName ?? "object-contain p-[12px]";

  if (option?.type === "video" && option.videoSrc) {
    return (
      <motion.video
        key={`video-${option.id}`}
        src={option.videoSrc}
        poster={option.posterSrc ?? option.thumbImage}
        autoPlay
        loop
        muted
        playsInline
        initial={{ opacity: 0.45, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.01 }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-none absolute inset-0 h-full w-full ${resolvedClassName}`}
      />
    );
  }

  if (!resolvedImageSrc) {
    return null;
  }

  return (
    <motion.img
      key={resolvedImageSrc}
      src={resolvedImageSrc}
      alt=""
      initial={{ opacity: 0.45, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.01 }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none absolute inset-0 h-full w-full ${resolvedClassName}`}
    />
  );
}

function GalleryThumb({
  option,
}: {
  option: KeyVisualGalleryOption;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
      <img
        src={option.posterSrc ?? option.thumbImage}
        alt=""
        className={`pointer-events-none h-full w-full ${
          option.thumbClassName ?? "object-contain p-[8px]"
        }`}
      />
      {option.type === "video" ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/18">
          <PlayCircleFilledRoundedIcon
            sx={{ fontSize: 36, color: "rgba(255,255,255,0.96)" }}
          />
        </div>
      ) : null}
    </div>
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
  const isHotspotMode = screen.interactionMode === "hotspot";

  useEffect(() => {
    setShowSwappedImage(false);

    if (isHotspotMode || !screen.swapAfterMs) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowSwappedImage(true);
    }, screen.swapAfterMs);

    return () => window.clearTimeout(timeoutId);
  }, [isHotspotMode, screen.id, screen.swapAfterMs]);

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
              className={`absolute inset-0 h-full w-full ${
                showSwappedImage
                  ? screen.swappedImageClassName ?? "object-cover object-center"
                  : screen.initialImageClassName ?? "object-cover object-center"
              }`}
            />
          </AnimatePresence>

          {!showSwappedImage && isHotspotMode && screen.hotspot ? (
            <button
              type="button"
              onClick={() => setShowSwappedImage(true)}
              className="absolute z-20 flex h-[44px] w-[44px] items-center justify-center rounded-full bg-transparent"
              style={{
                left: `calc(${screen.hotspot.leftPct}% - 22px)`,
                top: `calc(${screen.hotspot.topPct}% - 22px)`,
              }}
              aria-label={screen.hotspot.label}
            >
              <motion.span
                aria-hidden="true"
                animate={{ scale: [1, 1.1, 1], opacity: [0.42, 0.18, 0.42] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[-6px] rounded-full bg-[radial-gradient(circle,rgba(217,66,255,0.52)_0%,rgba(217,66,255,0.22)_48%,transparent_72%)]"
              />
              <span className="absolute inset-[5px] rounded-full bg-[radial-gradient(circle,#f0abff_0%,#d942ff_46%,#9e34ff_100%)] shadow-[0_0_12px_rgba(217,66,255,0.34)]" />
              <span className="absolute inset-[15px] rounded-full bg-white/92" />
            </button>
          ) : null}
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
  const [selectedId, setSelectedId] = useState<string | null>(
    screen.initialImage ? null : screen.options[0]?.id ?? null,
  );
  const [ctaReady, setCtaReady] = useState(
    screen.showCtaOnLoad ? !screen.ctaRevealDelayMs : false,
  );
  const [hasSelectedExplicitly, setHasSelectedExplicitly] = useState(false);

  useEffect(() => {
    setSelectedId(screen.initialImage ? null : screen.options[0]?.id ?? null);
    setHasSelectedExplicitly(false);

    if (!screen.showCtaOnLoad) {
      setCtaReady(false);
      return;
    }

    if (!screen.ctaRevealDelayMs) {
      setCtaReady(true);
      return;
    }

    setCtaReady(false);

    const timeoutId = window.setTimeout(() => {
      setCtaReady(true);
    }, screen.ctaRevealDelayMs);

    return () => window.clearTimeout(timeoutId);
  }, [
    screen.ctaRevealDelayMs,
    screen.id,
    screen.initialImage,
    screen.options,
    screen.showCtaOnLoad,
  ]);

  const activeOption =
    (selectedId ? screen.options.find((option) => option.id === selectedId) : null) ?? null;
  const showCta = screen.showCtaOnLoad ? ctaReady : hasSelectedExplicitly;

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
        <div className={`flex items-start gap-[16px] ${screen.stageClassName ?? ""}`}>
          <FramedStage
            className={`relative h-[520px] overflow-hidden rounded-[34px] border-2 border-[var(--border-frame)] bg-white ${
              screen.mainStageWidthClassName ?? "w-[430px]"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <GalleryPreview
                option={activeOption}
                imageSrc={screen.initialImage}
                imageClassName={screen.initialImageClassName}
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

                  if (!screen.showCtaOnLoad) {
                    setHasSelectedExplicitly(true);
                  }
                }}
                aria-label={option.label}
              >
                <ThumbnailCard
                  active={option.id === selectedId}
                  className="h-[104px] w-[104px] rounded-[20px]"
                >
                  <GalleryThumb option={option} />
                </ThumbnailCard>
              </button>
            ))}
          </div>
        </div>
      }
    />
  );
}

export function KeyVisualSelectorGalleryTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<KeyVisualSelectorGalleryScreen>) {
  const router = useRouter();
  const { FramedStage, SubtleActionPill, ThumbnailCard } = shared;
  const [phase, setPhase] = useState<"selector" | "gallery">("selector");
  const [selectedSelectorId, setSelectedSelectorId] = useState(
    screen.selectorOptions[0]?.id ?? null,
  );
  const [selectedGalleryId, setSelectedGalleryId] = useState(
    screen.galleryOptions[0]?.id ?? null,
  );
  const [hasSelectedSelector, setHasSelectedSelector] = useState(false);

  useEffect(() => {
    setPhase("selector");
    setSelectedSelectorId(screen.selectorOptions[0]?.id ?? null);
    setSelectedGalleryId(screen.galleryOptions[0]?.id ?? null);
    setHasSelectedSelector(false);
  }, [screen.galleryOptions, screen.id, screen.selectorOptions]);

  const activeSelector =
    screen.selectorOptions.find((option) => option.id === selectedSelectorId) ??
    screen.selectorOptions[0];
  const activeGallery =
    screen.galleryOptions.find((option) => option.id === selectedGalleryId) ??
    screen.galleryOptions[0];

  return (
    <StageLayout
      workflow={workflow}
      screen={screen}
      shared={shared}
      cta={
        phase === "gallery" ? (
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
        ) : hasSelectedSelector ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={childTransition}
          >
            <SubtleActionPill
              label={screen.continueLabel}
              onClick={() => setPhase("gallery")}
            />
          </motion.div>
        ) : null
      }
      stage={
        phase === "gallery" ? (
          <div className="flex items-start gap-[16px]">
            <FramedStage className="relative h-[520px] w-[430px] overflow-hidden rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
              <AnimatePresence mode="wait" initial={false}>
                <GalleryPreview option={activeGallery} />
              </AnimatePresence>
            </FramedStage>

            <div className="flex flex-col gap-[12px]">
              {screen.galleryOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedGalleryId(option.id)}
                  aria-label={option.label}
                >
                  <ThumbnailCard
                    active={option.id === selectedGalleryId}
                    className="h-[104px] w-[104px] rounded-[20px]"
                  >
                    <GalleryThumb option={option} />
                  </ThumbnailCard>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex w-[560px] flex-col items-center gap-[18px]">
            <FramedStage className="relative h-[520px] w-[430px] overflow-hidden rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
              {activeSelector ? (
                <img
                  src={activeSelector.image}
                  alt=""
                  className={`absolute inset-0 h-full w-full ${
                    activeSelector.imageClassName ?? "object-cover object-center"
                  }`}
                />
              ) : null}
            </FramedStage>

            <div className="flex items-center gap-[12px]">
              {screen.selectorOptions.map((option) => {
                const isActive = option.id === selectedSelectorId;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setSelectedSelectorId(option.id);
                      setHasSelectedSelector(true);
                    }}
                    className={`min-w-[156px] rounded-full px-[20px] py-[12px] text-[15px] font-[600] tracking-[-0.01em] transition ${
                      isActive
                        ? "bg-white text-[#171717] shadow-[0_10px_26px_rgba(255,255,255,0.18)]"
                        : "border border-white/18 bg-white/10 text-white backdrop-blur-[14px]"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        )
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
                  <AnimatedWordPrompt text={screen.promptBody} />
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
        className="absolute inset-0 z-10 flex items-center justify-center"
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
