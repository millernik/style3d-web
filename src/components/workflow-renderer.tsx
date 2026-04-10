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
  const router = useRouter();
  const isProcessing = screen.variant === "processing";
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    setShowCTA(false);

    if (screen.variant !== "done" || !screen.ctaTarget) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowCTA(true);
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, [screen.variant, screen.ctaTarget]);

  return (
    <WorkflowShell workflow={workflow} backdropImage={screen.backdropImage}>
      <div className="absolute inset-0" data-step-three-state={screen.variant}>
        <div className="absolute left-[50px] top-[310px] flex w-[486px] flex-col items-center gap-[18px]">
          <section className="flex w-full flex-col gap-[24px] overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.1)] px-[28px] py-[24px]">
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

          {showCTA && screen.ctaTarget ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <SubtleActionPill
                label={screen.ctaLabel ?? "Zum nächsten Schritt"}
                onClick={() =>
                  router.push(buildScreenHref(workflow.id, screen.ctaTarget!))
                }
              />
            </motion.div>
          ) : null}
        </div>

        <div className="absolute left-[584px] top-[212px] h-[650px] w-[806px] overflow-visible">
          <div className="absolute left-1/2 top-0 flex h-[650px] w-[388px] -translate-x-1/2 flex-col items-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`image-${screen.id}`}
                initial={{
                  opacity: 0.4,
                  scale: 0.985,
                }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0.72,
                  scale: 1.01,
                }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[578px] w-[388px]"
              >
                <FramedStage className="h-[578px] w-[388px] rounded-[40px] border-2 border-[var(--border-frame)] bg-white">
                  <div className="absolute inset-[0.5px] overflow-hidden rounded-[38px] bg-white">
                    <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
                      <img
                        src={kioskAssets.workwear.sketchFinishedCollage}
                        alt=""
                        className={`pointer-events-none h-full w-full object-cover object-center ${
                          isProcessing ? "blur-[10px]" : ""
                        }`}
                      />
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
  const router = useRouter();
  const variants = [
    {
      id: "sand-jacket",
      thumb: kioskAssets.workwear.styleDesignThumbJacket,
      main: kioskAssets.workwear.styleDesignThumbJacket,
      imageClassName:
        "pointer-events-none h-full w-full object-contain object-center p-[22px]",
    },
    {
      id: "blue-jacket",
      thumb: kioskAssets.workwear.styleDesignThumbHelmet,
      main: kioskAssets.workwear.styleDesignMain,
      imageClassName:
        "pointer-events-none h-full w-full object-contain object-center p-[16px]",
    },
    {
      id: "pants",
      thumb: kioskAssets.workwear.styleDesignThumbPants,
      main: kioskAssets.workwear.styleDesignThumbPants,
      imageClassName:
        "pointer-events-none h-full w-full object-contain object-center p-[22px]",
    },
    {
      id: "boots",
      thumb: kioskAssets.workwear.styleDesignThumbBoots,
      main: kioskAssets.workwear.styleDesignThumbBoots,
      imageClassName:
        "pointer-events-none h-full w-full object-contain object-center p-[22px]",
    },
  ] as const;

  const [selectedVariantId, setSelectedVariantId] = useState<string>("blue-jacket");

  const activeVariant =
    variants.find((variant) => variant.id === selectedVariantId) ?? variants[0];
  const showCTA = selectedVariantId === "pants";

  return (
    <ScreenShell
      workflow={workflow}
      screen={screen}
      hideFooter
      disableEntryAnimation
    >
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1064px] items-center justify-between">
          <div className="flex w-[520px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[520px]"
              avatar={kioskAssets.workwear.introAvatar}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />

            {showCTA && screen.ctaTarget ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                <SubtleActionPill
                  label={screen.ctaLabel ?? "Zum nächsten Schritt"}
                  onClick={() =>
                    router.push(buildScreenHref(workflow.id, screen.ctaTarget!))
                  }
                />
              </motion.div>
            ) : null}
          </div>

          <div className="flex w-[396px] flex-col items-center gap-[16px]">
            <FramedStage className="relative flex h-[440px] w-[396px] items-center justify-center overflow-hidden rounded-[32px] border-2 border-[var(--border-frame)] bg-white shadow-[0_18px_42px_rgba(0,0,0,0.18)]">
              <div className="absolute inset-[0.5px] overflow-hidden rounded-[30px] bg-white">
                <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={activeVariant.id}
                      src={activeVariant.main}
                      alt=""
                      initial={{ opacity: 0.62, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.01 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className={activeVariant.imageClassName}
                    />
                  </AnimatePresence>
                </div>
              </div>
            </FramedStage>

            <div className="flex w-full justify-center gap-[16px]">
              {variants.map((variant) => {
                const isPants = variant.id === "pants";

                return (
                  <motion.button
                    key={variant.id}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setSelectedVariantId(variant.id)}
                    className="rounded-[14px]"
                    aria-label={`Variante ${variant.id}`}
                  >
                    <div className="relative flex h-[86px] w-[86px] items-center justify-center overflow-visible rounded-[14px] border border-[var(--border-frame)] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.12)]">
                      {isPants ? (
                        <motion.div
                          aria-hidden="true"
                          animate={{
                            opacity: [0.34, 0.72, 0.34],
                            scale: [0.98, 1.06, 0.98],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-[-6px] rounded-[18px] bg-kiosk-gradient blur-[18px]"
                        />
                      ) : null}
                      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[12px] bg-white">
                        <img
                          src={variant.thumb}
                          alt=""
                          className="pointer-events-none h-full w-full object-contain"
                        />
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
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
  const router = useRouter();
  const [selectedView, setSelectedView] = useState<"front" | "back">(screen.view);
  const [selectedVariant, setSelectedVariant] = useState<"blue" | "sand" | "grey">(
    "blue",
  );
  const [hasExplicitVariantSelection, setHasExplicitVariantSelection] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowCTA(true);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const previewVariants = [
    {
      id: "blue",
      src: kioskAssets.workwear.tryOnFront,
      thumbImageClassName: "object-cover object-[50%_18%] scale-[1.16]",
      heroFilter: "none",
    },
    {
      id: "sand",
      src: kioskAssets.workwear.tryOnThumbWarm,
      thumbImageClassName: "object-contain p-[6px]",
      heroFilter:
        "sepia(0.56) saturate(1.38) hue-rotate(-8deg) brightness(1.07) contrast(0.94)",
    },
    {
      id: "grey",
      src: kioskAssets.workwear.tryOnThumbCool,
      thumbImageClassName: "object-contain p-[6px]",
      heroFilter: "grayscale(0.46) sepia(0.16) saturate(0.72) brightness(1.02)",
    },
  ] as const;
  const activeVariant = previewVariants.find(
    (variant) => variant.id === selectedVariant,
  )!;
  const activeImage =
    selectedView === "front"
      ? kioskAssets.workwear.tryOnFront
      : kioskAssets.workwear.tryOnBack;

  return (
    <ScreenShell
      workflow={workflow}
      screen={screen}
      hideFooter
      disableEntryAnimation
    >
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1074px] items-center justify-between">
          <div className="flex w-[520px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[520px]"
              avatar={kioskAssets.workwear.introAvatar}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />

            {showCTA && screen.ctaTarget ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                <SubtleActionPill
                  label={screen.ctaLabel ?? "Zum nächsten Schritt"}
                  onClick={() =>
                    router.push(buildScreenHref(workflow.id, screen.ctaTarget!))
                  }
                />
              </motion.div>
            ) : null}
          </div>

          <div className="flex w-[506px] flex-col items-start gap-[16px]">
            <div className="flex items-start gap-[16px]">
              <FramedStage className="relative h-[452px] w-[396px] rounded-[32px] border-2 border-[var(--border-frame)] bg-white">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={`${selectedVariant}-${selectedView}`}
                    src={activeImage}
                    alt=""
                    initial={{ opacity: 0.45, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.01 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    style={{ filter: activeVariant.heroFilter }}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
              </FramedStage>

              <div className="flex flex-col items-start gap-[12px]">
                {previewVariants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => {
                      setSelectedVariant(variant.id);
                      setHasExplicitVariantSelection(true);
                    }}
                  >
                    <ThumbnailCard
                      active={
                        hasExplicitVariantSelection &&
                        variant.id === selectedVariant
                      }
                      className="h-[86px] w-[86px] rounded-[18px] border border-[var(--border-frame)]"
                    >
                      <img
                        src={variant.src}
                        alt=""
                        className={`pointer-events-none h-full w-full ${variant.thumbImageClassName}`}
                      />
                    </ThumbnailCard>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex w-[396px] justify-center">
              <SegmentedStateToggle
                className="w-[360px]"
                options={[
                  {
                    id: "front",
                    label: "Front",
                    icon: "human",
                    active: selectedView === "front",
                    onClick: () => setSelectedView("front"),
                  },
                  {
                    id: "back",
                    label: "Back",
                    icon: "human",
                    active: selectedView === "back",
                    onClick: () => setSelectedView("back"),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
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
  const router = useRouter();
  const [selectedHotspotId, setSelectedHotspotId] = useState<"upper" | "lower" | null>(
    null,
  );
  const [previewMode, setPreviewMode] = useState<"before" | "after">("before");
  const showCTA = useLatchedDelay(true, 5000);
  const isPreviewOpen = selectedHotspotId !== null;

  const hotspotConfig: Record<
    "upper" | "lower",
    {
      buttonLeftPct: number;
      buttonTopPct: number;
      artClassName: string;
      renderArtClassName: string;
    }
  > = {
    upper: {
      buttonLeftPct: 45.15,
      buttonTopPct: 16.67,
      artClassName:
        "h-full w-full object-cover object-[42%_18%] scale-[1.55]",
      renderArtClassName:
        "h-full w-full object-cover object-[42%_18%] scale-[1.55]",
    },
    lower: {
      buttonLeftPct: 60.7,
      buttonTopPct: 45.5,
      artClassName:
        "h-full w-full object-cover object-[58%_67%] scale-[1.52]",
      renderArtClassName:
        "h-full w-full object-cover object-[58%_67%] scale-[1.52]",
    },
  };

  const selectedConfig =
    selectedHotspotId ? hotspotConfig[selectedHotspotId] : null;
  const sourceCardLayout = isPreviewOpen
    ? { width: 320, height: 480, left: 52, top: 6 }
    : { width: 392, height: 492, left: 52, top: 0 };

  return (
    <ScreenShell
      workflow={workflow}
      screen={screen}
      hideFooter
      disableEntryAnimation
    >
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1048px] items-center justify-between">
          <div className="flex w-[520px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[520px]"
              avatar={kioskAssets.workwear.introAvatar}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />

            {showCTA && screen.ctaTarget ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                <SubtleActionPill
                  label={screen.ctaLabel ?? "Zum nächsten Schritt"}
                  onClick={() =>
                    router.push(buildScreenHref(workflow.id, screen.ctaTarget!))
                  }
                />
              </motion.div>
            ) : null}
          </div>

          <div className="relative h-[492px] w-[496px]">
            <motion.div
              className="absolute"
              animate={sourceCardLayout}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <FramedStage className="relative h-full w-full rounded-[32px] border-2 border-[var(--border-frame)] bg-white">
                <img
                  src={kioskAssets.workwear.styleRedrawSource}
                  alt=""
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
                {(["upper", "lower"] as const).map((hotspotId) => {
                  const isActive = selectedHotspotId === hotspotId;

                  return (
                    <button
                      key={hotspotId}
                      type="button"
                      onClick={() => setSelectedHotspotId(hotspotId)}
                      className="absolute z-20 flex h-[46px] w-[46px] items-center justify-center rounded-full bg-transparent"
                      style={{
                        left: `calc(${hotspotConfig[hotspotId].buttonLeftPct}% - 23px)`,
                        top: `calc(${hotspotConfig[hotspotId].buttonTopPct}% - 23px)`,
                      }}
                      aria-label={`Detail ${hotspotId}`}
                    >
                      <motion.span
                        aria-hidden="true"
                        animate={
                          isActive
                            ? { scale: [1, 1.12, 1], opacity: [0.54, 0.28, 0.54] }
                            : { scale: [1, 1.08, 1], opacity: [0.38, 0.18, 0.38] }
                        }
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-[-5px] rounded-full bg-[radial-gradient(circle,rgba(217,66,255,0.56)_0%,rgba(217,66,255,0.28)_42%,rgba(217,66,255,0.1)_60%,transparent_74%)]"
                      />
                      <span
                        className={`absolute inset-[4px] rounded-full bg-[radial-gradient(circle,#f0abff_0%,#d942ff_46%,#9e34ff_100%)] ${
                          isActive
                            ? "shadow-[0_0_16px_rgba(217,66,255,0.44)]"
                            : "shadow-[0_0_12px_rgba(217,66,255,0.32)]"
                        }`}
                      />
                      <span className="absolute inset-[13px] rounded-full bg-white/90" />
                    </button>
                  );
                })}
              </FramedStage>
            </motion.div>

            <div className="absolute left-[390px] top-[52px] flex h-[400px] w-[186px] items-start justify-center">
              <AnimatePresence mode="wait" initial={false}>
                {selectedHotspotId && selectedConfig ? (
                  <motion.div
                    key={selectedHotspotId}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 18 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center gap-[16px]"
                  >
                    <FramedStage className="relative h-[316px] w-[186px] rounded-[24px] border border-[var(--border-frame)] bg-white">
                      <img
                        src={
                          previewMode === "before"
                            ? kioskAssets.workwear.styleRedrawBefore
                            : kioskAssets.workwear.styleRedrawAfter
                        }
                        alt=""
                        className={`pointer-events-none ${
                          previewMode === "before"
                            ? selectedConfig.artClassName
                            : selectedConfig.renderArtClassName
                        }`}
                      />
                    </FramedStage>

                    <div className="flex w-full items-center gap-[10px]">
                      {([
                        { id: "before", label: "Vorher" },
                        { id: "after", label: "Nachher" },
                      ] as const).map((option) => {
                        const isActive = previewMode === option.id;

                        return (
                          <motion.button
                            key={option.id}
                            type="button"
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.18 }}
                            onClick={() => setPreviewMode(option.id)}
                            className={`relative flex h-[50px] flex-1 items-center justify-center rounded-full border px-[18px] text-kiosk-label-md ${
                              isActive
                                ? "border-transparent text-white"
                                : "border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] text-white"
                            }`}
                          >
                            {isActive ? (
                              <span className="absolute inset-[-10px] rounded-full bg-kiosk-gradient blur-[30px] opacity-70" />
                            ) : null}
                            <span
                              className={`absolute inset-0 rounded-full ${
                                isActive
                                  ? "bg-kiosk-gradient"
                                  : "bg-[rgba(255,255,255,0.08)]"
                              }`}
                            />
                            <span className="relative">{option.label}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
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
  const router = useRouter();
  const [phase, setPhase] = useState<"prompt" | "processing" | "gallery">("prompt");
  const [selectedLogoId, setSelectedLogoId] = useState("logo-1");
  const showCTA = useLatchedDelay(phase === "gallery", 5000);

  const logoVariants = [
    { id: "logo-1", src: kioskAssets.workwear.logoThumbOne },
    { id: "logo-2", src: kioskAssets.workwear.logoThumbTwo },
    { id: "logo-3", src: kioskAssets.workwear.logoThumbThree },
    { id: "logo-4", src: kioskAssets.workwear.logoThumbFour },
  ] as const;

  const activeLogo =
    logoVariants.find((variant) => variant.id === selectedLogoId) ?? logoVariants[0];

  useEffect(() => {
    if (phase !== "processing") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPhase("gallery");
    }, 1250);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  return (
    <ScreenShell
      workflow={workflow}
      screen={screen}
      hideFooter
      disableEntryAnimation
    >
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1038px] items-center justify-between">
          <div className="flex w-[520px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[520px]"
              avatar={kioskAssets.workwear.introAvatar}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />

            {showCTA ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                <SubtleActionPill
                  label="Try On!"
                  onClick={() => router.push(buildScreenHref(workflow.id, "step-8"))}
                />
              </motion.div>
            ) : null}
          </div>

          <div className="flex w-[396px] flex-col items-center gap-[16px]">
            {phase === "prompt" ? (
              <>
                <div className="glass-card flex w-[396px] flex-col items-center rounded-[20px] px-[24px] py-[22px] text-center">
                  <p className="text-kiosk-label-md font-semibold">Prompt:</p>
                  <p className="mt-[18px] text-kiosk-body-md leading-[1.45]">
                    Please create an embroidered logo for me in the shape of a circle
                    with fire and a hammer inside. The background can be dark with a
                    white border. The objects should be clearly visible.
                  </p>
                </div>
                <ActionPill onClick={() => setPhase("processing")}>
                  {screen.ctaLabel ?? "Generieren"}
                </ActionPill>
              </>
            ) : phase === "processing" ? (
              <div className="flex flex-col items-center gap-[16px]">
                <FramedStage className="flex h-[452px] w-[396px] items-center justify-center rounded-[32px] border-2 border-[var(--border-frame)] bg-white">
                  <img
                    src={kioskAssets.workwear.logoThumbOne}
                    alt=""
                    className="pointer-events-none h-[260px] w-[260px] scale-[1.05] object-contain blur-[24px]"
                  />
                </FramedStage>
                <StepThreeStatusPill state="processing" label="Bearbeitung Läuft" />
              </div>
            ) : (
              <>
                <FramedStage className="flex h-[452px] w-[396px] items-center justify-center rounded-[32px] border-2 border-[var(--border-frame)] bg-white">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={activeLogo.id}
                      src={activeLogo.src}
                      alt=""
                      initial={{ opacity: 0.55, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.01 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="pointer-events-none h-[260px] w-[260px] object-contain"
                    />
                  </AnimatePresence>
                </FramedStage>

                <div className="grid grid-cols-4 gap-[12px]">
                  {logoVariants.map((variant) => (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedLogoId(variant.id)}
                    >
                      <ThumbnailCard
                        active={variant.id === selectedLogoId}
                        className="h-[86px] w-[86px] rounded-[18px] border border-[var(--border-frame)]"
                      >
                        <img
                          src={variant.src}
                          alt=""
                          className="pointer-events-none h-full w-full object-cover"
                        />
                      </ThumbnailCard>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
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
  const router = useRouter();
  const [phase, setPhase] = useState<"prompt" | "gallery">("prompt");
  const [selectedPlacementId, setSelectedPlacementId] = useState("logo-1");
  const showCTA = useLatchedDelay(phase === "gallery", 5000);
  const placementVariants = [
    { id: "logo-1", src: kioskAssets.workwear.logoThumbOne },
    { id: "logo-2", src: kioskAssets.workwear.logoThumbTwo },
    { id: "logo-3", src: kioskAssets.workwear.logoThumbThree },
    { id: "logo-4", src: kioskAssets.workwear.logoThumbFour },
  ] as const;

  const activePlacement =
    placementVariants.find((variant) => variant.id === selectedPlacementId) ??
    placementVariants[0];

  return (
    <ScreenShell
      workflow={workflow}
      screen={screen}
      hideFooter
      disableEntryAnimation
    >
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1038px] items-center justify-between">
          <div className="flex w-[520px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[520px]"
              avatar={kioskAssets.workwear.introAvatar}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />

            {showCTA ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                <SubtleActionPill
                  label="Zum nächsten Schritt"
                  onClick={() => router.push(buildScreenHref(workflow.id, "step-9"))}
                />
              </motion.div>
            ) : null}
          </div>

          <div className="flex w-[500px] items-start justify-center gap-[14px]">
            <div className="flex flex-col items-center gap-[16px]">
              <FramedStage className="relative h-[452px] w-[396px] rounded-[32px] border-2 border-[var(--border-frame)] bg-white">
                <img
                  src={kioskAssets.workwear.logoMainPlacement}
                  alt=""
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
                {phase === "gallery" ? (
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={activePlacement.id}
                      src={activePlacement.src}
                      alt=""
                      initial={{ opacity: 0.45, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.01 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="pointer-events-none absolute left-[121px] top-[174px] h-[80px] w-[80px] object-contain"
                    />
                  </AnimatePresence>
                ) : null}
              </FramedStage>

              {phase === "prompt" ? (
                <ActionPill onClick={() => setPhase("gallery")}>
                  {screen.ctaLabel ?? "Place Logo"}
                </ActionPill>
              ) : null}
            </div>

            {phase === "gallery" ? (
              <div className="flex flex-col gap-[12px]">
                {placementVariants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedPlacementId(variant.id)}
                  >
                    <ThumbnailCard
                      active={variant.id === selectedPlacementId}
                      className="h-[86px] w-[86px] rounded-[18px] border border-[var(--border-frame)]"
                    >
                      <img
                        src={variant.src}
                        alt=""
                        className="pointer-events-none h-full w-full object-cover"
                      />
                    </ThumbnailCard>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
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
  const router = useRouter();
  const reviewVariants = [
    { id: "scene", src: kioskAssets.workwear.reviewScene },
    { id: "gear", src: kioskAssets.workwear.reviewGear },
    { id: "plain", src: kioskAssets.workwear.reviewPlain },
  ] as const;
  const [hasPoseChanged, setHasPoseChanged] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string>("scene");
  const showCTA = useLatchedDelay(hasPoseChanged, 5000);

  const activeReview =
    reviewVariants.find((variant) => variant.id === selectedReviewId) ??
    reviewVariants[0];

  return (
    <ScreenShell
      workflow={workflow}
      screen={screen}
      hideFooter
      disableEntryAnimation
    >
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <div className="flex w-[1038px] items-center justify-between">
          <div className="flex w-[520px] flex-col items-center gap-[18px]">
            <NarrativeCard
              className="relative left-auto top-auto w-[520px]"
              avatar={kioskAssets.workwear.introAvatar}
              text={screen.narrative}
              avatarGlowPreset="workwear-card"
            />

            {showCTA ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                <SubtleActionPill
                  label="Zum nächsten Schritt"
                  onClick={() => router.push(buildScreenHref(workflow.id, "step-10"))}
                />
              </motion.div>
            ) : null}
          </div>

          <div className="flex w-[500px] items-start gap-[14px]">
            <div className="flex flex-col items-center gap-[16px]">
              <FramedStage className="h-[452px] w-[396px] rounded-[32px] border-2 border-[var(--border-frame)] bg-black">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={activeReview.id}
                    src={activeReview.src}
                    alt=""
                    initial={{ opacity: 0.45, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.01 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
              </FramedStage>

              {!hasPoseChanged ? (
                <ActionPill
                  onClick={() => {
                    setHasPoseChanged(true);
                    setSelectedReviewId("gear");
                  }}
                >
                  {screen.ctaLabel ?? "Change pose"}
                </ActionPill>
              ) : null}
            </div>

            <div className="flex flex-col gap-[12px]">
              {reviewVariants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedReviewId(variant.id)}
                >
                  <ThumbnailCard
                    active={variant.id === selectedReviewId}
                    className="h-[86px] w-[86px] rounded-[18px] border border-[var(--border-frame)]"
                  >
                    <img
                      src={variant.src}
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
        className="pointer-events-none absolute inset-[-24px] z-0 h-[1070px] w-[1504px] object-cover blur-[10px]"
      />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.6)_48.558%,rgba(0,0,0,0.7)_100%)]" />

      <div className="absolute left-[100px] top-[33px] z-20 flex w-[1240px] items-center justify-between">
        <img
          src={kioskAssets.shared.brandLogo}
          alt="Style3D"
          className="h-[38px] w-[146px]"
        />
        <div className="flex items-center gap-[12px]">
          <img
            src={kioskAssets.shared.workflowMark}
            alt=""
            className="h-[44.746px] w-[44px]"
          />
          <span className="text-[28px] font-medium leading-none text-white">
            AI for Workwear
          </span>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={entryTransition}
        className="absolute left-[400px] top-[197px] z-10 flex w-[640px] flex-col items-center gap-[40px]"
      >
        <div className="flex w-full flex-col items-center gap-[24px]">
          <AvatarDiamond
            image={screen.avatar}
            size="xl"
            glowPreset="workwear-intro"
          />
          <div className="w-full text-center text-kiosk-body-lg leading-[1.45] text-white">
            {screen.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="relative h-[50px] w-[569px]">
          <div className="absolute left-[8px] top-[10px] h-[30px] w-[555px] rounded-[100px] bg-kiosk-gradient blur-[50px]" />
          <div className="relative flex h-full w-full items-center justify-center gap-[10px] rounded-[100px] bg-kiosk-gradient px-[40px] py-[10px]">
            <img
              src={kioskAssets.shared.workflowMark}
              alt=""
              className="h-[24px] w-[24px]"
            />
            <span className="text-[19.989px] font-semibold text-white">
              Jetzt Produkt-Demo buchen – hier am Stand
            </span>
          </div>
        </div>
      </motion.section>

      <div className="absolute left-[670px] top-[778px] z-20 h-[100px] w-[100px]">
        <img
          src={kioskAssets.workwear.closingQr}
          alt="QR Code"
          className="block h-full w-full"
        />
      </div>

      <div className="absolute left-[100px] top-[924px] z-20 flex w-[1240px] items-center justify-between">
        <div className="flex items-center gap-[24px]">
          <SecondaryPill href="/">Neustarten</SecondaryPill>
          <SecondaryPill workflowId={workflow.id} targetId="overview">
            Overview
          </SecondaryPill>
        </div>

        <div className="flex items-center gap-[12px] text-[28px] font-[300] leading-none text-white">
          <span>{screen.footer?.current ?? 7}</span>
          <span className="block h-[2px] w-[165px] rounded-[100px] bg-[#757575]" />
          <span>{screen.footer?.total ?? 7}</span>
        </div>
      </div>
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
    <ScreenShell
      workflow={workflow}
      screen={screen}
      hideFooter
      disableEntryAnimation
    >
      <div className="absolute inset-x-0 top-[146px] bottom-[118px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={entryTransition}
          className="grid grid-cols-3 gap-x-[18px] gap-y-[18px]"
        >
          {screen.cards.map((card) => (
            <OverviewCardTile
              key={card.target}
              workflowId={workflow.id}
              card={card}
            />
          ))}
        </motion.div>
      </div>
    </ScreenShell>
  );
}

function ScreenShell({
  workflow,
  screen,
  children,
  hideFooter = false,
  disableEntryAnimation = false,
}: {
  workflow: Workflow;
  screen: WorkflowScreen;
  children: React.ReactNode;
  hideFooter?: boolean;
  disableEntryAnimation?: boolean;
}) {
  return (
    <WorkflowShell workflow={workflow} backdropImage={screen.backdropImage}>
      {disableEntryAnimation ? (
        <div>{children}</div>
      ) : (
        <motion.div
          key={screen.id}
          initial={{ opacity: 0, y: 18, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={entryTransition}
        >
          {children}
        </motion.div>
      )}
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
  avatarGlowPreset = "default",
}: {
  className: string;
  avatar: string;
  text: string;
  cta?: React.ReactNode;
  avatarGlowPreset?: "default" | "workwear-intro" | "workwear-card" | "workwear-step3";
}) {
  return (
    <motion.section
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={childTransition}
      className={`glass-card absolute flex flex-col items-center gap-[24px] rounded-[20px] px-[28px] py-[24px] text-center ${className}`}
    >
      <AvatarDiamond image={avatar} size="md" glowPreset={avatarGlowPreset} />
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
  railClassName,
}: {
  position: number;
  onChange: (position: number) => void;
  railClassName?: string;
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
      <div
        className={`absolute left-1/2 top-[18px] h-[4px] -translate-x-1/2 rounded-full bg-[rgba(255,255,255,0.2)] ${
          railClassName ?? "w-[492px]"
        }`}
      />
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

function useLatchedDelay(active: boolean, delayMs: number) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!active || isVisible) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsVisible(true);
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [active, delayMs, isVisible]);

  return isVisible;
}

function ActionPill({
  children,
  workflowId,
  targetId,
  glowPreset = "default",
  onClick,
}: {
  children: React.ReactNode;
  workflowId?: string;
  targetId?: string;
  glowPreset?: "default" | "workwear-intro";
  onClick?: () => void;
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
      onClick={() => {
        if (onClick) {
          onClick();
          return;
        }

        if (workflowId && targetId) {
          router.push(buildScreenHref(workflowId, targetId));
        }
      }}
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

function VisualActionPill({ label }: { label: string }) {
  return (
    <div className="relative rounded-full px-[40px] py-[10px] text-kiosk-label-md font-semibold text-white">
      <span
        aria-hidden="true"
        className="absolute inset-[-10px] rounded-full bg-kiosk-gradient blur-[40px] opacity-90"
      />
      <span className="relative flex items-center gap-[10px] rounded-full bg-kiosk-gradient px-[40px] py-[10px]">
        {label}
      </span>
    </div>
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

function SegmentedStateToggle({
  options,
  className,
}: {
  options: Array<{
    id: string;
    label: string;
    icon: "human" | "spark";
    active: boolean;
    onClick: () => void;
  }>;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-[10px] ${className ?? ""}`}>
      {options.map((option) => (
        <motion.button
          key={option.id}
          whileTap={{ scale: 0.97 }}
          onClick={option.onClick}
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
