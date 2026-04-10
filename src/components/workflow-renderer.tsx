"use client";

import { useEffect, useRef, useState } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { KioskViewport } from "@/components/kiosk-viewport";
import {
  buildScreenHref,
  getOrderedScreens,
  kioskAssets,
  type AiGraphicScreen,
  type ClosingScreen,
  type EcommerceScreen,
  type IntroScreen,
  type LogoPlacementScreen,
  type OverviewScreen,
  type SketchScreen,
  type StyleDesignScreen,
  type StyleRedrawScreen,
  type TryOnScreen,
  type Workflow,
  type WorkflowScreen,
} from "@/lib/workflows";

type WorkflowRendererProps = {
  workflow: Workflow;
  screen: WorkflowScreen;
};

const entryTransition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
};

const childTransition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function WorkflowRenderer({ workflow, screen }: WorkflowRendererProps) {
  useAutoAdvance(workflow.id, screen);

  switch (screen.kind) {
    case "intro":
      return <IntroTemplate workflow={workflow} screen={screen} />;
    case "sketch":
      return <SketchTemplate workflow={workflow} screen={screen} />;
    case "style-design":
      return <StyleDesignTemplate workflow={workflow} screen={screen} />;
    case "try-on":
      return <TryOnTemplate workflow={workflow} screen={screen} />;
    case "style-redraw":
      return <StyleRedrawTemplate workflow={workflow} screen={screen} />;
    case "ai-graphic":
      return <AiGraphicTemplate workflow={workflow} screen={screen} />;
    case "logo-placement":
      return <LogoPlacementTemplate workflow={workflow} screen={screen} />;
    case "ecommerce":
      return <EcommerceTemplate workflow={workflow} screen={screen} />;
    case "closing":
      return <ClosingTemplate workflow={workflow} screen={screen} />;
    case "overview":
      return <OverviewTemplate workflow={workflow} screen={screen} />;
    default:
      return null;
  }
}

function IntroTemplate({
  workflow,
  screen,
}: {
  workflow: Workflow;
  screen: IntroScreen;
}) {
  return (
    <WorkflowShell workflow={workflow} backdropImage={screen.backdropImage}>
      <img
        src={screen.leftAmbient}
        alt=""
        className="pointer-events-none absolute left-[-271px] top-[100px] h-[963px] w-[541px] scale-x-[-1] object-cover opacity-[0.24] blur-[22px]"
      />
      <img
        src={screen.rightAmbient}
        alt=""
        className="pointer-events-none absolute left-[1185px] top-[100px] h-[963px] w-[541px] object-cover opacity-[0.92] blur-[18px]"
      />

      <motion.section
        initial={{ opacity: 0, y: 22, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={entryTransition}
        className="absolute left-[404px] top-[197px] flex w-[640px] flex-col items-center gap-[42px]"
      >
        <div className="flex w-full flex-col items-center gap-[24px] text-center">
          <AvatarDiamond image={screen.avatar} size="xl" glowPreset="workwear-intro" />
          <div className="relative z-20 flex flex-col gap-[12px]">
            <h1 className="text-kiosk-title-page">{screen.headline}</h1>
            <p className="text-kiosk-body-lg leading-[1.5]">{screen.body}</p>
          </div>
        </div>
        <ActionPill
          workflowId={workflow.id}
          targetId={screen.ctaTarget}
          glowPreset="workwear-intro"
        >
          {screen.ctaLabel}
        </ActionPill>
      </motion.section>
    </WorkflowShell>
  );
}

function SketchTemplate({
  workflow,
  screen,
}: {
  workflow: Workflow;
  screen: SketchScreen;
}) {
  if (screen.variant === "interactive") {
    return <InteractiveSketchTemplate workflow={workflow} screen={screen} />;
  }

  return <StepThreeSketchTemplate workflow={workflow} screen={screen} />;
}

function StepThreeSketchTemplate({
  workflow,
  screen,
}: {
  workflow: Workflow;
  screen: SketchScreen;
}) {
  const isProcessing = screen.variant === "processing";

  return (
    <WorkflowShell workflow={workflow} backdropImage={screen.backdropImage}>
      <div className="absolute inset-0" data-step-three-state={screen.variant}>
        <section
          className="absolute left-[50px] top-[310px] flex w-[486px] flex-col gap-[24px] overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.1)] px-[28px] py-[24px]"
        >
          <div className="flex w-full items-center justify-center">
            <AvatarDiamond
              image={kioskAssets.workwear.introAvatar}
              size="md"
              glowPreset="workwear-step3"
            />
          </div>
          <p className="w-full whitespace-pre-wrap text-center text-[22px] font-light leading-[1.5] text-white">
            {screen.narrative}
          </p>
        </section>

        <div className="absolute left-[584px] top-[212px] h-[650px] w-[806px] overflow-visible">
          <div className="absolute left-1/2 top-0 flex h-[650px] w-[388px] -translate-x-1/2 flex-col items-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`image-${screen.id}`}
                initial={{
                  opacity: 0.4,
                  scale: 0.985,
                  filter: isProcessing ? "blur(3px)" : "blur(8px)",
                }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{
                  opacity: 0.72,
                  scale: 1.01,
                  filter: isProcessing ? "blur(0px)" : "blur(6px)",
                }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[578px] w-[388px]"
              >
                <FramedStage className="h-[578px] w-[388px] rounded-[40px] border-2 border-[var(--border-frame)] bg-white">
                  <div className="absolute inset-[0.5px] overflow-hidden rounded-[38px] bg-white">
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[38px]">
                      {isProcessing ? (
                        <img
                          src={kioskAssets.workwear.sketchFinishedCollage}
                          alt=""
                          className="pointer-events-none h-[768px] w-[512px] max-w-none object-cover blur-[10px]"
                        />
                      ) : (
                        <img
                          src={kioskAssets.workwear.sketchFinishedCollage}
                          alt=""
                          className="pointer-events-none h-[582px] w-[388px] max-w-none object-cover"
                        />
                      )}
                    </div>
                  </div>
                </FramedStage>
              </motion.div>
            </AnimatePresence>

            <div className="relative mt-[42px] h-[30px] w-[246px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`status-${screen.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <StepThreeStatusPill
                    state={isProcessing ? "processing" : "done"}
                    label={
                      screen.statusLabel ??
                      (isProcessing ? "Bearbeitung Läuft" : "Fertig!")
                    }
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </WorkflowShell>
  );
}

function InteractiveSketchTemplate({
  workflow,
  screen,
}: {
  workflow: Workflow;
  screen: SketchScreen;
}) {
  const router = useRouter();
  const [sliderPosition, setSliderPosition] = useState(
    screen.controlsVisibleOnLoad ? 50 : 100,
  );
  const [hasDelayPassed, setHasDelayPassed] = useState(
    Boolean(screen.controlsVisibleOnLoad),
  );

  useEffect(() => {
    if (screen.controlsVisibleOnLoad) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setHasDelayPassed(true);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [screen.controlsVisibleOnLoad]);

  const controlsVisible = hasDelayPassed;
  const advanceTarget = screen.ctaTarget ?? "step-3";

  return (
    <WorkflowShell workflow={workflow} backdropImage={screen.backdropImage}>
      <motion.div
        key={screen.id}
        initial={{ opacity: 0, y: 18, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={entryTransition}
      >
        <div className="absolute left-[78px] top-[304px] flex w-[580px] flex-col items-center gap-[18px]">
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={childTransition}
            className="glass-card relative flex w-full flex-col items-center gap-[22px] rounded-[20px] px-[28px] py-[24px] text-center"
          >
            <AvatarDiamond
              image={kioskAssets.workwear.introAvatar}
              size="md"
              glowPreset="workwear-card"
            />
            <p className="text-[22px] font-[300] leading-[1.45] text-white">
              {screen.narrative}
            </p>
          </motion.section>

          {controlsVisible ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <SubtleActionPill
                label={screen.ctaLabel ?? "Details hervorheben"}
                onClick={() => router.push(buildScreenHref(workflow.id, advanceTarget))}
              />
            </motion.div>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={childTransition}
          className="absolute left-[876px] top-[222px] flex w-[456px] flex-col gap-[22px]"
        >
          <div className="relative h-[566px] w-[456px]">
            <BeforeAfterSlider
              sketchSrc={kioskAssets.workwear.sketchBase}
              renderSrc={kioskAssets.workwear.sketchRender}
              position={sliderPosition}
              onChange={setSliderPosition}
              className="h-[566px] w-[456px] rounded-[34px]"
              artClassName="h-[100%] w-[100%] object-contain"
              renderArtClassName="h-[100%] w-[100%] object-contain scale-[1.065] -translate-y-[10px]"
            />

            {controlsVisible ? (
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => router.push(buildScreenHref(workflow.id, advanceTarget))}
                className="absolute left-[150px] top-[156px] z-20 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-transparent"
                aria-label="Details hervorheben"
              >
                <motion.span
                  aria-hidden="true"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.38, 0.16, 0.38] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-[-5px] rounded-full bg-[radial-gradient(circle,rgba(217,66,255,0.56)_0%,rgba(217,66,255,0.28)_42%,rgba(217,66,255,0.1)_60%,transparent_74%)]"
                />
                <span className="absolute inset-[4px] rounded-full bg-[radial-gradient(circle,#f0abff_0%,#d942ff_46%,#9e34ff_100%)] shadow-[0_0_12px_rgba(217,66,255,0.32)]" />
                <span className="absolute inset-[13px] rounded-full bg-white/90" />
              </motion.button>
            ) : null}
          </div>

          <ComparisonTrack position={sliderPosition} onChange={setSliderPosition} />
        </motion.div>
      </motion.div>
    </WorkflowShell>
  );
}

function StyleDesignTemplate({
  workflow,
  screen,
}: {
  workflow: Workflow;
  screen: StyleDesignScreen;
}) {
  const selectedIndex = 2;
  const heroImage =
    screen.variant === "selection"
      ? kioskAssets.workwear.styleDesignMain
      : kioskAssets.workwear.styleDesignThumbPants;

  return (
    <ScreenShell workflow={workflow} screen={screen}>
      <NarrativeCard
        className="left-[50px] top-[217px] w-[670px]"
        avatar={kioskAssets.workwear.introAvatar}
        text={screen.narrative}
        cta={
          screen.ctaTarget && screen.ctaLabel ? (
            <ActionPill workflowId={workflow.id} targetId={screen.ctaTarget}>
              {screen.ctaLabel}
            </ActionPill>
          ) : null
        }
      />

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={childTransition}
        className="absolute left-[848px] top-[144px] flex w-[542px] flex-col gap-[12px]"
      >
        <FramedStage className="flex h-[601px] w-[542px] items-center justify-center rounded-[40px] border-2 border-[var(--border-frame)] bg-white">
          <img
            src={heroImage}
            alt=""
            className={
              screen.variant === "selection"
                ? "pointer-events-none h-[629px] w-[420px] object-cover"
                : "pointer-events-none h-[560px] w-[378px] object-contain"
            }
          />
        </FramedStage>
        <div className="grid grid-cols-4 gap-[8.367px]">
          {[
            kioskAssets.workwear.styleDesignThumbJacket,
            kioskAssets.workwear.styleDesignThumbHelmet,
            kioskAssets.workwear.styleDesignThumbPants,
            kioskAssets.workwear.styleDesignThumbBoots,
          ].map((src, index) => (
            <ThumbnailCard key={src} active={index === selectedIndex}>
              <img
                src={src}
                alt=""
                className="pointer-events-none h-full w-full object-contain"
              />
            </ThumbnailCard>
          ))}
        </div>
      </motion.div>
    </ScreenShell>
  );
}

function TryOnTemplate({
  workflow,
  screen,
}: {
  workflow: Workflow;
  screen: TryOnScreen;
}) {
  const activeImage =
    screen.view === "front"
      ? kioskAssets.workwear.tryOnFront
      : kioskAssets.workwear.tryOnBack;

  return (
    <ScreenShell workflow={workflow} screen={screen}>
      <NarrativeCard
        className="left-[50px] top-[229px] w-[670px]"
        avatar={kioskAssets.workwear.introAvatar}
        text={screen.narrative}
      />

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={childTransition}
        className="absolute left-[848px] top-[144px] flex flex-col gap-[18px]"
      >
        <div className="flex items-start gap-[18px]">
          <FramedStage className="h-[671px] w-[484px] rounded-[40px] border-2 border-[var(--border-frame)] bg-white">
            <img
              src={activeImage}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
          </FramedStage>
          <div className="flex flex-col gap-[18px]">
            {[kioskAssets.workwear.tryOnThumbWarm, kioskAssets.workwear.tryOnThumbCool].map(
              (src) => (
                <ThumbnailCard key={src} active={false} className="h-[174px] w-[129px] rounded-[20px] border border-[var(--border-frame)]">
                  <img src={src} alt="" className="pointer-events-none h-full w-full object-cover" />
                </ThumbnailCard>
              ),
            )}
          </div>
        </div>

        <SegmentedRouteToggle
          options={[
            {
              id: "front",
              label: "Front",
              icon: "human",
              targetId: "step-5",
              active: screen.view === "front",
            },
            {
              id: "back",
              label: "Back",
              icon: "human",
              targetId: "step-5-1",
              active: screen.view === "back",
            },
          ]}
          workflowId={workflow.id}
          className="ml-[24px] w-[392px]"
        />
      </motion.div>
    </ScreenShell>
  );
}

function StyleRedrawTemplate({
  workflow,
  screen,
}: {
  workflow: Workflow;
  screen: StyleRedrawScreen;
}) {
  return (
    <ScreenShell workflow={workflow} screen={screen}>
      <NarrativeCard
        className="left-[50px] top-[229px] w-[670px]"
        avatar={kioskAssets.workwear.introAvatar}
        text={screen.narrative}
      />

      {screen.variant === "focus" ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={childTransition}
          className="absolute left-[770px] top-[129px]"
        >
          <FramedStage className="h-[671px] w-[590px] rounded-[40px] border-2 border-[var(--border-frame)] bg-white">
            <img
              src={kioskAssets.workwear.styleRedrawSource}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute left-[296px] top-[134px] h-[55px] w-[55px] rounded-full bg-[radial-gradient(circle,rgba(219,98,255,0.85)_0%,rgba(185,89,255,0.32)_46%,transparent_72%)]" />
            <div className="absolute left-[384px] top-[387px] h-[55px] w-[55px] rounded-full bg-[radial-gradient(circle,rgba(219,98,255,0.85)_0%,rgba(185,89,255,0.32)_46%,transparent_72%)]" />
          </FramedStage>
        </motion.div>
      ) : null}

      {screen.variant !== "focus" ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={childTransition}
          className="absolute left-[557px] top-[129px] flex items-end gap-[28px]"
        >
          <FramedStage className="h-[671px] w-[385px] rounded-[40px] border-2 border-[var(--border-frame)] bg-white">
            <img
              src={kioskAssets.workwear.styleRedrawSource}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute left-[153px] top-[134px] h-[55px] w-[55px] rounded-full bg-[radial-gradient(circle,rgba(219,98,255,0.85)_0%,rgba(185,89,255,0.32)_46%,transparent_72%)]" />
            <div className="absolute left-[236px] top-[387px] h-[55px] w-[55px] rounded-full bg-[radial-gradient(circle,rgba(219,98,255,0.85)_0%,rgba(185,89,255,0.32)_46%,transparent_72%)]" />
          </FramedStage>

          <div className="flex flex-col gap-[18px]">
            <FramedStage className="h-[357px] w-[380px] rounded-[40px] border border-[var(--border-frame)] bg-white">
              <img
                src={
                  screen.variant === "before"
                    ? kioskAssets.workwear.styleRedrawBefore
                    : kioskAssets.workwear.styleRedrawAfter
                }
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              />
            </FramedStage>
            <SegmentedRouteToggle
              workflowId={workflow.id}
              className="w-[380px]"
              options={[
                {
                  id: "before",
                  label: "Vorher",
                  icon: "spark",
                  targetId: "step-6-1",
                  active: screen.variant === "before",
                },
                {
                  id: "after",
                  label: "Nachher",
                  icon: "spark",
                  targetId: "step-6-2",
                  active: screen.variant === "after",
                },
              ]}
            />
          </div>
        </motion.div>
      ) : null}
    </ScreenShell>
  );
}

function AiGraphicTemplate({
  workflow,
  screen,
}: {
  workflow: Workflow;
  screen: AiGraphicScreen;
}) {
  if (screen.variant === "prompt") {
    return (
      <ScreenShell workflow={workflow} screen={screen}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={entryTransition}
          className="absolute left-[384px] top-[95px] flex w-[672px] flex-col items-center gap-[18px]"
        >
          <NarrativeCard
            className="relative left-auto top-auto w-[672px]"
            avatar={kioskAssets.workwear.introAvatar}
            text={screen.narrative}
          />

          <div className="glass-card flex w-[672px] flex-col items-center rounded-[20px] px-[28px] py-[24px] text-center">
            <p className="text-kiosk-label-md font-semibold">Prompt:</p>
            <p className="mt-[18px] text-kiosk-body-md leading-[1.45]">
              Please create an embroidered logo for me in the shape of a circle
              with fire and a hammer inside. The background can be dark with a
              white border. The objects should be clearly visible.
            </p>
          </div>

          {screen.ctaTarget ? (
            <ActionPill workflowId={workflow.id} targetId={screen.ctaTarget}>
              {screen.ctaLabel ?? "Generieren"}
            </ActionPill>
          ) : null}
        </motion.div>
      </ScreenShell>
    );
  }

  const statusImage =
    screen.variant === "processing" || screen.variant === "done"
      ? kioskAssets.workwear.logoThumbOne
      : kioskAssets.workwear.logoThumbOne;

  return (
    <ScreenShell workflow={workflow} screen={screen}>
      <NarrativeCard
        className="left-[50px] top-[209px] w-[670px]"
        avatar={kioskAssets.workwear.introAvatar}
        text={screen.narrative}
      />

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={childTransition}
        className="absolute left-[848px] top-[129px] flex flex-col items-center gap-[18px]"
      >
        <FramedStage className="flex h-[671px] w-[542px] items-center justify-center rounded-[40px] border-2 border-[var(--border-frame)] bg-white">
          <img
            src={statusImage}
            alt=""
            className={
              screen.variant === "processing"
                ? "pointer-events-none h-[420px] w-[420px] scale-[1.05] object-contain blur-[24px]"
                : "pointer-events-none h-[420px] w-[420px] object-contain"
            }
          />
        </FramedStage>

        {screen.variant === "try-on" ? (
          <>
            <div className="grid grid-cols-4 gap-[12px]">
              {[
                kioskAssets.workwear.logoThumbOne,
                kioskAssets.workwear.logoThumbTwo,
                kioskAssets.workwear.logoThumbThree,
                kioskAssets.workwear.logoThumbFour,
              ].map((src, index) => (
                <ThumbnailCard key={src} active={index === 1} className="h-[90px] w-[90px] rounded-[18px] border border-[var(--border-frame)]">
                  <img src={src} alt="" className="pointer-events-none h-full w-full object-cover" />
                </ThumbnailCard>
              ))}
            </div>
            {screen.ctaTarget ? (
              <ActionPill workflowId={workflow.id} targetId={screen.ctaTarget}>
                {screen.ctaLabel ?? "Try On!"}
              </ActionPill>
            ) : null}
          </>
        ) : (
          <StatusPill>{screen.statusLabel ?? "Fertig!"}</StatusPill>
        )}
      </motion.div>
    </ScreenShell>
  );
}

function LogoPlacementTemplate({
  workflow,
  screen,
}: {
  workflow: Workflow;
  screen: LogoPlacementScreen;
}) {
  return (
    <ScreenShell workflow={workflow} screen={screen}>
      <NarrativeCard
        className="left-[50px] top-[242px] w-[670px]"
        avatar={kioskAssets.workwear.introAvatar}
        text={screen.narrative}
      />

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={childTransition}
        className="absolute left-[848px] top-[168px] flex items-start gap-[18px]"
      >
        <div className="flex flex-col items-center gap-[18px]">
          <FramedStage className="h-[579px] w-[484px] rounded-[40px] border-2 border-[var(--border-frame)] bg-white">
            <img
              src={kioskAssets.workwear.logoMainPlacement}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
          </FramedStage>
          {screen.ctaTarget ? (
            <ActionPill workflowId={workflow.id} targetId={screen.ctaTarget}>
              {screen.ctaLabel ?? "Place Logo"}
            </ActionPill>
          ) : null}
        </div>
        <div className="flex flex-col gap-[12px]">
          {[
            kioskAssets.workwear.logoThumbOne,
            kioskAssets.workwear.logoThumbTwo,
            kioskAssets.workwear.logoThumbThree,
            kioskAssets.workwear.logoThumbFour,
          ].map((src, index) => (
            <ThumbnailCard key={src} active={index === 0} className="h-[90px] w-[90px] rounded-[18px] border border-[var(--border-frame)]">
              <img src={src} alt="" className="pointer-events-none h-full w-full object-cover" />
            </ThumbnailCard>
          ))}
        </div>
      </motion.div>
    </ScreenShell>
  );
}

function EcommerceTemplate({
  workflow,
  screen,
}: {
  workflow: Workflow;
  screen: EcommerceScreen;
}) {
  return (
    <ScreenShell workflow={workflow} screen={screen}>
      <NarrativeCard
        className="left-[50px] top-[231px] w-[670px]"
        avatar={kioskAssets.workwear.introAvatar}
        text={screen.narrative}
      />

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={childTransition}
        className="absolute left-[848px] top-[129px] flex items-start gap-[18px]"
      >
        <div className="flex flex-col items-center gap-[18px]">
          <FramedStage className="h-[671px] w-[484px] rounded-[40px] border-2 border-[var(--border-frame)] bg-black">
            <img
              src={kioskAssets.workwear.reviewScene}
              alt=""
              className={
                screen.variant === "change-pose"
                  ? "pointer-events-none absolute inset-0 h-full w-full object-cover"
                  : "pointer-events-none absolute inset-0 h-full w-full object-cover"
              }
            />
          </FramedStage>
          {screen.ctaTarget ? (
            <ActionPill workflowId={workflow.id} targetId={screen.ctaTarget}>
              {screen.ctaLabel ?? "Change pose"}
            </ActionPill>
          ) : null}
        </div>

        <div className="flex flex-col gap-[12px]">
          {[kioskAssets.workwear.reviewGear, kioskAssets.workwear.reviewPlain].map((src) => (
            <ThumbnailCard key={src} active={false} className="h-[90px] w-[90px] rounded-[18px] border border-[var(--border-frame)]">
              <img src={src} alt="" className="pointer-events-none h-full w-full object-cover" />
            </ThumbnailCard>
          ))}
        </div>
      </motion.div>
    </ScreenShell>
  );
}

function ClosingTemplate({
  workflow,
  screen,
}: {
  workflow: Workflow;
  screen: ClosingScreen;
}) {
  return (
    <WorkflowShell workflow={workflow} backdropImage={screen.backdropImage}>
      <img
        src={kioskAssets.workwear.closingBackground}
        alt=""
        className="pointer-events-none absolute inset-[-24px] h-[1070px] w-[1504px] object-cover blur-[10px]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.6)_48.558%,rgba(0,0,0,0.7)_100%)]" />

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={entryTransition}
        className="absolute left-1/2 top-[197px] flex w-[910px] -translate-x-1/2 flex-col items-center gap-[40px]"
      >
        <div className="flex flex-col items-center gap-[24px]">
          <AvatarDiamond image={screen.avatar} size="xl" />
          <div className="text-center text-kiosk-body-lg leading-[1.45] text-white">
            {screen.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-[20px]">
          <ActionPill workflowId={workflow.id} targetId="overview">
            Jetzt Produkt-Demo buchen – hier am Stand
          </ActionPill>
          <SecondaryPill workflowId={workflow.id} targetId="overview">
            Overview
          </SecondaryPill>
        </div>

        <img
          src={kioskAssets.workwear.closingQr}
          alt="QR Code"
          className="h-[100px] w-[100px] rounded-[8px]"
        />
      </motion.section>

      <div className="absolute left-[50px] top-[924px] flex items-center gap-[24px]">
        <SecondaryPill href="/">Neustarten</SecondaryPill>
        <SecondaryPill workflowId={workflow.id} targetId="overview">
          Overview
        </SecondaryPill>
      </div>

      <FooterProgress
        className="left-auto right-[50px] top-[924px]"
        label={screen.footer?.label}
        current={screen.footer?.current ?? 7}
        total={screen.footer?.total ?? 7}
      />
    </WorkflowShell>
  );
}

function OverviewTemplate({
  workflow,
  screen,
}: {
  workflow: Workflow;
  screen: OverviewScreen;
}) {
  return (
    <ScreenShell workflow={workflow} screen={screen}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={entryTransition}
        className="absolute left-[71px] top-[171px] grid grid-cols-3 gap-x-[20px] gap-y-[20px]"
      >
        {screen.cards.map((card) => (
          <OverviewCardTile
            key={card.target}
            workflowId={workflow.id}
            card={card}
          />
        ))}
      </motion.div>
    </ScreenShell>
  );
}

function ScreenShell({
  workflow,
  screen,
  children,
  hideFooter = false,
}: {
  workflow: Workflow;
  screen: WorkflowScreen;
  children: React.ReactNode;
  hideFooter?: boolean;
}) {
  return (
    <WorkflowShell workflow={workflow} backdropImage={screen.backdropImage}>
      <motion.div
        key={screen.id}
        initial={{ opacity: 0, y: 18, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={entryTransition}
      >
        {children}
      </motion.div>
      {screen.footer && !hideFooter ? (
        <FooterProgress
          label={screen.footer.label}
          current={screen.footer.current}
          total={screen.footer.total}
        />
      ) : null}
    </WorkflowShell>
  );
}

function WorkflowShell({
  workflow,
  backdropImage,
  children,
}: {
  workflow: Workflow;
  backdropImage?: string;
  children: React.ReactNode;
}) {
  return (
    <KioskViewport backdropImage={backdropImage}>
      <div className="absolute inset-0 z-0 bg-black" />
      {children}
    </KioskViewport>
  );
}

function NarrativeCard({
  className,
  avatar,
  text,
  cta,
}: {
  className: string;
  avatar: string;
  text: string;
  cta?: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={childTransition}
      className={`glass-card absolute flex flex-col items-center gap-[24px] rounded-[20px] px-[28px] py-[24px] text-center ${className}`}
    >
      <AvatarDiamond image={avatar} size="md" />
      <p className="text-kiosk-body-lg leading-[1.5]">{text}</p>
      {cta}
    </motion.section>
  );
}

function AvatarDiamond({
  image,
  size,
  glowPreset = "default",
}: {
  image: string;
  size: "md" | "xl";
  glowPreset?: "default" | "workwear-intro" | "workwear-card" | "workwear-step3";
}) {
  const dimensions =
    size === "xl"
      ? {
          wrapper: "h-[282.843px] w-[282.843px]",
          glow: "h-[240.315px] w-[240.315px]",
          inner: "h-[200px] w-[200px] rounded-[40px]",
          image: "h-[285px] w-[264px]",
        }
      : {
          wrapper: "h-[203.647px] w-[203.647px]",
          glow: "h-[173.026px] w-[173.026px]",
          inner: "h-[144px] w-[144px] rounded-[28.8px]",
          image: "h-[205.2px] w-[190.08px]",
        };

  const glowConfig =
    glowPreset === "workwear-intro" && size === "xl"
      ? {
          container: "left-[21.264px] top-[21.264px] h-[240.315px] w-[240.315px]",
          source: "h-[169.928px] w-[169.928px] rounded-[40px] bg-kiosk-gradient blur-[50px]",
        }
      : glowPreset === "workwear-card" && size === "md"
      ? {
          container: "left-[21px] top-[21px] h-[160px] w-[160px]",
          source:
              "h-[112px] w-[112px] rounded-[28px] bg-kiosk-gradient opacity-[0.58] blur-[26px]",
          }
        : glowPreset === "workwear-step3" && size === "md"
          ? {
              container: "left-[15.31px] top-[15.31px] h-[173.026px] w-[173.026px]",
              source:
                "h-[122.348px] w-[122.348px] rounded-[28.8px] bg-kiosk-gradient blur-[36px]",
            }
      : {
          container: "left-[15px] top-[15px] h-full w-full",
          source: `${dimensions.glow} rounded-[40px] bg-kiosk-gradient blur-[38px]`,
        };

  return (
    <div className={`relative isolate ${dimensions.wrapper}`}>
      <div
        className={`absolute z-0 flex items-center justify-center ${glowConfig.container}`}
        aria-hidden="true"
      >
        <div className="-rotate-45">
          <div className={glowConfig.source} />
        </div>
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div
          className={`-rotate-45 overflow-hidden bg-white shadow-[0_18px_48px_rgba(0,0,0,0.28)] ${dimensions.inner}`}
        >
          <div className="relative flex h-full w-full items-center justify-center">
            <img
              src={image}
              alt=""
              className={`pointer-events-none rotate-45 object-cover ${dimensions.image}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FramedStage({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return <div className={`relative overflow-hidden ${className}`}>{children}</div>;
}

function BeforeAfterSlider({
  sketchSrc,
  renderSrc,
  position,
  onChange,
  className,
  artClassName,
  renderArtClassName,
}: {
  sketchSrc: string;
  renderSrc: string;
  position: number;
  onChange?: (position: number) => void;
  className?: string;
  artClassName?: string;
  renderArtClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activePointerId = useRef<number | null>(null);

  const updatePosition = (clientX: number) => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const nextPosition = Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100),
    );

    onChange?.(nextPosition);
  };

  return (
    <FramedStage
      className={`border-2 border-[var(--border-frame)] bg-white p-0 ${className ?? "h-[671px] w-[542px] rounded-[40px]"}`}
    >
      <div
        ref={containerRef}
        className="relative h-full w-full cursor-col-resize touch-none"
        onPointerDown={(event) => {
          activePointerId.current = event.pointerId;
          event.currentTarget.setPointerCapture(event.pointerId);
          updatePosition(event.clientX);
        }}
        onPointerMove={(event) => {
          if (activePointerId.current !== event.pointerId) {
            return;
          }

          updatePosition(event.clientX);
        }}
        onPointerUp={(event) => {
          if (activePointerId.current !== event.pointerId) {
            return;
          }

          activePointerId.current = null;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        onPointerCancel={(event) => {
          if (activePointerId.current !== event.pointerId) {
            return;
          }

          activePointerId.current = null;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        >
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={sketchSrc}
            alt=""
            className={`pointer-events-none ${artClassName ?? "h-[604px] w-auto max-w-none"}`}
          />
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <img
            src={renderSrc}
            alt=""
            className={`pointer-events-none ${renderArtClassName ?? artClassName ?? "h-[604px] w-auto max-w-none"}`}
          />
        </div>

        <div
          className="absolute inset-y-[12px] z-10 w-[2px] bg-[#232323]"
          style={{ left: `calc(${position}% - 1px)` }}
        />

        <div
          className="absolute top-1/2 z-20 h-[34px] w-[34px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#f0abff_0%,#d942ff_50%,#9827f7_100%)] shadow-[0_0_18px_rgba(217,66,255,0.38)]"
          style={{ left: `${position}%` }}
        >
          <div className="absolute inset-[10px] rounded-full bg-white/92" />
        </div>
      </div>
    </FramedStage>
  );
}

function ComparisonTrack({
  position,
  onChange,
}: {
  position: number;
  onChange: (position: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activePointerId = useRef<number | null>(null);

  const updatePosition = (clientX: number) => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const nextPosition = Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100),
    );

    onChange(nextPosition);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[44px] w-full touch-none"
      onPointerDown={(event) => {
        activePointerId.current = event.pointerId;
        event.currentTarget.setPointerCapture(event.pointerId);
        updatePosition(event.clientX);
      }}
      onPointerMove={(event) => {
        if (activePointerId.current !== event.pointerId) {
          return;
        }

        updatePosition(event.clientX);
      }}
      onPointerUp={(event) => {
        if (activePointerId.current !== event.pointerId) {
          return;
        }

        activePointerId.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      }}
      onPointerCancel={(event) => {
        if (activePointerId.current !== event.pointerId) {
          return;
        }

        activePointerId.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      }}
    >
      <div className="absolute left-1/2 top-[18px] h-[4px] w-[492px] -translate-x-1/2 rounded-full bg-[rgba(255,255,255,0.2)]" />
      <div
        className="absolute top-0 h-[37px] w-[6px] rounded-full bg-kiosk-gradient"
        style={{ left: `calc(${position}% - 3px)` }}
      />
    </div>
  );
}

function ProgressBar({ marker }: { marker: "start" | "mid" | number }) {
  const markerStyle =
    typeof marker === "number"
      ? {
          left: `calc(${marker}% - 3px)`,
          transform: "none",
        }
      : marker === "start"
        ? {
            left: 0,
            transform: "none",
          }
        : {
            left: "50%",
            transform: "translateX(-50%)",
          };

  return (
    <div className="relative h-[37px] w-full">
      <div className="absolute left-1/2 top-[17px] h-[4px] w-[536px] -translate-x-1/2 rounded-full bg-[rgba(255,255,255,0.2)]" />
      <div
        className="absolute top-0 h-[37px] w-[6px] rounded-full bg-kiosk-gradient"
        style={markerStyle}
      />
    </div>
  );
}

function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex items-center gap-[10px]">
      <div className="absolute left-1/2 top-1/2 h-[30px] w-[246px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-kiosk-gradient blur-[50px]" />
      <div className="relative flex items-center gap-[10px] text-kiosk-label-md text-white">
        <span className="text-[24px] leading-none">✦</span>
        <span>{children}</span>
      </div>
    </div>
  );
}

function StepThreeStatusPill({
  state,
  label,
}: {
  state: "processing" | "done";
  label: string;
}) {
  return (
    <div className="relative flex h-[30px] w-[246px] items-center justify-center gap-[10px] overflow-visible">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30px] w-[246px] -translate-x-1/2 -translate-y-1/2 rounded-[100px] bg-kiosk-gradient blur-[50px]" />
      <div className="relative flex items-center gap-[10px] text-[19.989px] font-normal text-white">
        {state === "processing" ? <ProcessingIcon /> : <DoneIcon />}
        <span>{label}</span>
      </div>
    </div>
  );
}

function ProcessingIcon() {
  return <AutorenewIcon sx={{ fontSize: 24, color: "#fff" }} aria-hidden="true" />;
}

function DoneIcon() {
  return <CelebrationIcon sx={{ fontSize: 24, color: "#fff" }} aria-hidden="true" />;
}

function ActionPill({
  children,
  workflowId,
  targetId,
  glowPreset = "default",
}: {
  children: React.ReactNode;
  workflowId: string;
  targetId: string;
  glowPreset?: "default" | "workwear-intro";
}) {
  const router = useRouter();

  const isIntroPreset = glowPreset === "workwear-intro";

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18 }}
      className={
        isIntroPreset
          ? "relative isolate z-10 h-[50px] w-[147px] rounded-full bg-transparent text-kiosk-label-md font-semibold text-white"
          : "relative rounded-full px-[40px] py-[10px] text-kiosk-label-md font-semibold text-white"
      }
      onClick={() => router.push(buildScreenHref(workflowId, targetId))}
    >
      <span
        aria-hidden="true"
        className={
          isIntroPreset
            ? "absolute left-1/2 top-1/2 z-0 h-[30px] w-[214px] -translate-x-1/2 -translate-y-1/2 rounded-[100px] bg-kiosk-gradient opacity-[0.72] blur-[50px]"
            : "absolute inset-[-10px] rounded-full bg-kiosk-gradient blur-[40px] opacity-90"
        }
      />
      <span
        className={
          isIntroPreset
            ? "relative z-10 flex h-full w-full items-center justify-center rounded-full bg-kiosk-gradient"
            : "relative flex items-center gap-[10px] rounded-full bg-kiosk-gradient px-[40px] py-[10px]"
        }
      >
        {children}
      </span>
    </motion.button>
  );
}

function SubtleActionPill({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18 }}
      onClick={onClick}
      className="relative isolate h-[50px] w-[287px] rounded-full bg-transparent text-kiosk-label-md font-semibold text-white"
    >
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 z-0 h-[22px] w-[194px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-kiosk-gradient opacity-[0.5] blur-[26px]"
      />
      <span className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-kiosk-gradient">
        {label}
      </span>
    </motion.button>
  );
}

function SecondaryPill({
  children,
  workflowId,
  targetId,
  href,
}: {
  children: React.ReactNode;
  workflowId?: string;
  targetId?: string;
  href?: string;
}) {
  const router = useRouter();

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18 }}
      onClick={() => {
        if (href) {
          router.push(href);
          return;
        }

        if (workflowId && targetId) {
          router.push(buildScreenHref(workflowId, targetId));
        }
      }}
      className="rounded-full border border-[rgba(255,255,255,0.22)] bg-[rgba(255,255,255,0.12)] px-[40px] py-[10px] text-kiosk-label-md text-white backdrop-blur-[16px]"
    >
      {children}
    </motion.button>
  );
}

function SegmentedRouteToggle({
  options,
  workflowId,
  className,
}: {
  options: Array<{
    id: string;
    label: string;
    icon: "human" | "spark";
    targetId: string;
    active: boolean;
  }>;
  workflowId: string;
  className?: string;
}) {
  const router = useRouter();

  return (
    <div className={`flex items-center gap-[10px] ${className ?? ""}`}>
      {options.map((option) => (
        <motion.button
          key={option.id}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push(buildScreenHref(workflowId, option.targetId))}
          className={`relative flex h-[50px] flex-1 items-center justify-center rounded-full border px-[28px] ${
            option.active
              ? "border-transparent text-white"
              : "border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] text-white"
          }`}
        >
          {option.active ? (
            <span className="absolute inset-[-12px] rounded-full bg-kiosk-gradient blur-[34px] opacity-70" />
          ) : null}
          <span
            className={`absolute inset-0 rounded-full ${
              option.active ? "bg-kiosk-gradient" : "bg-[rgba(255,255,255,0.08)]"
            }`}
          />
          <span className="relative flex items-center gap-[10px] text-kiosk-label-md">
            <span className="text-[18px]">{option.icon === "human" ? "🧍" : "◌"}</span>
            <span>{option.label}</span>
          </span>
        </motion.button>
      ))}
    </div>
  );
}

function ThumbnailCard({
  children,
  active,
  className,
}: {
  children: React.ReactNode;
  active: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-visible ${className ?? "h-[129px] w-[129px] rounded-[14px] border border-[var(--border-frame)] bg-white"}`}>
      {active ? (
        <div className="absolute inset-[-8px] rounded-[20px] bg-kiosk-gradient blur-[24px] opacity-75" />
      ) : null}
      <div
        className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-[inherit] bg-white ${
          active ? "border border-[#bb7fff]" : "border border-[var(--border-frame)]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function FooterProgress({
  label,
  current,
  total,
  className,
}: {
  label?: string;
  current: number;
  total: number;
  className?: string;
}) {
  return (
    <div className={`absolute left-[50px] top-[924px] flex w-[1340px] items-center justify-between ${className ?? ""}`}>
      <p className="text-kiosk-title-shell font-extralight">{label ?? ""}</p>
      <div className="flex items-center gap-[12px] text-kiosk-title-shell font-extralight">
        <span>{current}</span>
        <div className="h-[2px] w-[165px] rounded-full bg-[var(--border-progress)]" />
        <span>{total}</span>
      </div>
    </div>
  );
}

function OverviewCardTile({
  workflowId,
  card,
}: {
  workflowId: string;
  card: { number: number; title: string; target: string };
}) {
  const router = useRouter();

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(buildScreenHref(workflowId, card.target))}
      className="relative h-[183px] w-[280px] overflow-hidden rounded-[18px] border border-[rgba(255,255,255,0.25)]"
    >
      <OverviewArtwork step={card.number} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.38)_100%)]" />
      <div className="absolute bottom-[18px] left-[18px] flex items-end gap-[14px] text-left text-white">
        <span className="text-[54px] font-medium leading-none">{card.number}</span>
        <span className="text-kiosk-title-shell font-medium">{card.title}</span>
      </div>
    </motion.button>
  );
}

function OverviewArtwork({ step }: { step: number }) {
  switch (step) {
    case 1:
      return (
        <div className="absolute inset-0 flex">
          <img src={kioskAssets.workwear.sketchBase} alt="" className="h-full w-1/2 object-cover" />
          <img src={kioskAssets.workwear.sketchHighlightOverlay} alt="" className="h-full w-1/2 object-cover" />
        </div>
      );
    case 2:
      return (
        <div className="absolute inset-0 flex">
          <img src={kioskAssets.workwear.styleDesignThumbPants} alt="" className="h-full w-1/2 object-cover" />
          <img src={kioskAssets.workwear.styleDesignThumbBoots} alt="" className="h-full w-1/2 object-cover" />
        </div>
      );
    case 3:
      return (
        <div className="absolute inset-0 flex">
          <img src={kioskAssets.workwear.tryOnBack} alt="" className="h-full w-1/2 object-cover" />
          <img src={kioskAssets.workwear.tryOnFront} alt="" className="h-full w-1/2 object-cover" />
        </div>
      );
    case 4:
      return (
        <div className="absolute inset-0">
          <img src={kioskAssets.workwear.styleRedrawSource} alt="" className="h-full w-full object-cover" />
        </div>
      );
    case 5:
      return (
        <div className="absolute inset-0">
          <img src={kioskAssets.workwear.logoMainPlacement} alt="" className="h-full w-full object-cover" />
        </div>
      );
    default:
      return (
        <div className="absolute inset-0">
          <img src={kioskAssets.workwear.reviewScene} alt="" className="h-full w-full object-cover" />
        </div>
      );
  }
}

function useAutoAdvance(workflowId: string, screen: WorkflowScreen) {
  const router = useRouter();

  useEffect(() => {
    const targetId =
      "autoTarget" in screen && typeof screen.autoTarget === "string"
        ? screen.autoTarget
        : undefined;

    if (!targetId || !screen.autoAdvanceMs) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      router.push(buildScreenHref(workflowId, targetId));
    }, screen.autoAdvanceMs);

    return () => window.clearTimeout(timeoutId);
  }, [router, screen, workflowId]);

  useEffect(() => {
    const ordered = getOrderedScreens(workflowId);
    const currentIndex = ordered.findIndex((item) => item.id === screen.id);

    if (currentIndex === -1) {
      return;
    }

    const next = ordered[currentIndex + 1];
    const previous = ordered[currentIndex - 1];

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && next) {
        router.push(buildScreenHref(workflowId, next.id));
      }

      if (event.key === "ArrowLeft" && previous) {
        router.push(buildScreenHref(workflowId, previous.id));
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router, screen.id, workflowId]);
}
