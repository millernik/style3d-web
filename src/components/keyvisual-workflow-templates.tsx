"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  buildScreenHref,
  type KeyVisualCampaignScreen,
  type KeyVisualClosingScreen,
  type KeyVisualLookbookScreen,
  type KeyVisualProductVariantsScreen,
  type KeyVisualReferenceScreen,
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

export function KeyVisualReferenceTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<KeyVisualReferenceScreen>) {
  const router = useRouter();
  const { ScreenShell, NarrativeCard, FramedStage, SubtleActionPill } = shared;

  return (
    <ScreenShell workflow={workflow} screen={screen} hideFooter disableEntryAnimation>
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1160px] items-center justify-between">
          <div className="flex w-[486px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[478px]"
              avatar={screen.avatar}
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

          <motion.div
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={entryTransition}
            className="relative flex w-[560px] justify-end"
          >
            <FramedStage className="relative h-[498px] w-[494px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
              <img
                src={screen.stageImage}
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              />
            </FramedStage>

            <FramedStage className="absolute left-0 top-[24px] h-[204px] w-[156px] rounded-[24px] border border-[var(--border-frame)] bg-white shadow-[0_16px_34px_rgba(0,0,0,0.18)]">
              <img
                src={screen.referenceImage}
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-contain p-[10px]"
              />
            </FramedStage>
          </motion.div>
        </div>
      </div>
    </ScreenShell>
  );
}

export function KeyVisualProductVariantsTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<KeyVisualProductVariantsScreen>) {
  const router = useRouter();
  const { ScreenShell, NarrativeCard, FramedStage, ThumbnailCard, SubtleActionPill } =
    shared;
  const [selectedId, setSelectedId] = useState(screen.options[0]?.id);
  const [hasSelectedExplicitly, setHasSelectedExplicitly] = useState(false);
  const activeOption = screen.options.find((option) => option.id === selectedId);

  return (
    <ScreenShell workflow={workflow} screen={screen} hideFooter disableEntryAnimation>
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1120px] items-center justify-between">
          <div className="flex w-[486px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[486px]"
              avatar={screen.avatar}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />
            {hasSelectedExplicitly ? (
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
                  className={`pointer-events-none absolute inset-0 h-full w-full ${
                    activeOption?.imageClassName ?? "object-cover"
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
                    active={option.id === selectedId && hasSelectedExplicitly}
                    className="h-[92px] w-[92px] rounded-[18px]"
                  >
                    <img
                      src={option.thumbImage}
                      alt=""
                      className={`pointer-events-none h-full w-full ${
                        option.thumbClassName ?? "object-cover"
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

export function KeyVisualLookbookTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<KeyVisualLookbookScreen>) {
  const router = useRouter();
  const { ScreenShell, NarrativeCard, FramedStage, SubtleActionPill } = shared;
  const showCTA = useDelayedReveal(true, screen.ctaDelayMs);

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
            className="w-[560px]"
          >
            <FramedStage className="relative h-[450px] w-[560px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white px-[22px] py-[20px]">
              <div className="flex h-full items-center justify-center gap-[18px]">
                {screen.spreadImages.map((image, index) => (
                  <div
                    key={image}
                    className={`relative h-[390px] overflow-hidden rounded-[22px] border border-[var(--border-frame)] bg-white shadow-[0_14px_28px_rgba(0,0,0,0.12)] ${
                      index === 0 ? "w-[214px]" : "w-[272px]"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </FramedStage>
          </motion.div>
        </div>
      </div>
    </ScreenShell>
  );
}

export function KeyVisualCampaignTemplate({
  workflow,
  screen,
  shared,
}: SharedProps<KeyVisualCampaignScreen>) {
  const router = useRouter();
  const { ScreenShell, NarrativeCard, FramedStage, StepThreeStatusPill, ActionPill, SubtleActionPill } =
    shared;
  const [phase, setPhase] = useState<"prompt" | "processing" | "result">("prompt");
  const showCTA = useDelayedReveal(phase === "result", screen.resultCtaDelayMs);

  useEffect(() => {
    if (phase !== "processing") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPhase("result");
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
                <FramedStage className="relative h-[220px] w-[454px] rounded-[28px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] backdrop-blur-[18px]">
                  <div className="flex h-full items-center gap-[18px] px-[20px]">
                    <div className="h-[176px] w-[132px] overflow-hidden rounded-[20px] border border-[var(--border-frame)] bg-white">
                      <img
                        src={screen.promptReferenceImage}
                        alt=""
                        className="pointer-events-none h-full w-full object-contain p-[8px]"
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
                    src={screen.resultImage}
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover blur-[18px]"
                  />
                </FramedStage>
                <StepThreeStatusPill state="processing" label={screen.processingLabel} />
              </div>
            ) : (
              <div className="flex w-full items-start justify-center gap-[16px]">
                <FramedStage className="relative h-[454px] w-[368px] rounded-[34px] border-2 border-[var(--border-frame)] bg-white">
                  <img
                    src={screen.resultImage}
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  />
                </FramedStage>

                <div className="flex flex-col gap-[12px]">
                  <FramedStage className="relative h-[170px] w-[140px] rounded-[24px] border border-[var(--border-frame)] bg-white">
                    <img
                      src={screen.promptReferenceImage}
                      alt=""
                      className="pointer-events-none absolute inset-0 h-full w-full object-contain p-[10px]"
                    />
                  </FramedStage>
                  {screen.alternateResultImage ? (
                    <FramedStage className="relative h-[272px] w-[140px] rounded-[24px] border border-[var(--border-frame)] bg-white">
                      <img
                        src={screen.alternateResultImage}
                        alt=""
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                      />
                    </FramedStage>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ScreenShell>
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
