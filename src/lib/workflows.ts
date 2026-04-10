export const kioskAssets = {
  shared: {
    brandLogo: "/assets/shared/style3d-logo.svg",
    workflowMark: "/assets/shared/workwear-mark.svg",
    brandLogoLarge: "/assets/shared/style3d-logo-large.svg",
    workflowMarkLarge: "/assets/shared/workwear-mark-large.svg",
  },
  workwear: {
    attractBackdrop: "/assets/workwear/review-3.png",
    attractFigure: "/assets/workwear/firefighter-side.png",
    screensaverVideo: "/assets/workwear/screensaver/workwear-screensaver.mp4",
    introAvatar: "/assets/workwear/nina-intro.png",
    sketchBase: "/assets/workwear/sketch-base.png",
    sketchRender: "/assets/workwear/sketch-highlight-overlay.png",
    sketchHighlightOverlay: "/assets/workwear/sketch-highlight-overlay.png",
    sketchFinishedCollage: "/assets/workwear/sketch-finished-collage.png",
    styleDesignMain: "/assets/workwear/style-design-main.png",
    styleDesignThumbJacket: "/assets/workwear/style-design-thumb-jacket.png",
    styleDesignThumbHelmet: "/assets/workwear/style-design-thumb-helmet.png",
    styleDesignThumbPants: "/assets/workwear/style-design-thumb-pants.png",
    styleDesignThumbBoots: "/assets/workwear/style-design-thumb-boots.png",
    tryOnFront: "/assets/workwear/style-redraw-source.png",
    tryOnBack: "/assets/workwear/tryon-hero.png",
    tryOnThumbWarm: "/assets/workwear/tryon-detail-1.png",
    tryOnThumbCool: "/assets/workwear/tryon-detail-2.png",
    styleRedrawSource: "/assets/workwear/style-redraw-source.png",
    styleRedrawBefore: "/assets/workwear/style-redraw-before.png",
    styleRedrawAfter: "/assets/workwear/style-redraw-after.png",
    logoMainPlacement: "/assets/workwear/logo-main.png",
    logoThumbOne: "/assets/workwear/logo-thumb-1.png",
    logoThumbTwo: "/assets/workwear/logo-thumb-2.png",
    logoThumbThree: "/assets/workwear/logo-thumb-3.png",
    logoThumbFour: "/assets/workwear/logo-thumb-4.png",
    reviewPlain: "/assets/workwear/review-1.png",
    reviewGear: "/assets/workwear/review-2.png",
    reviewScene: "/assets/workwear/review-3.png",
    closingBackground: "/assets/workwear/closing-background.png",
    closingQr: "/assets/workwear/closing-qr.png",
  },
} as const;

export type FooterConfig = {
  label?: string;
  current: number;
  total: number;
};

export type BaseScreen = {
  id: string;
  frameName: string;
  kind:
    | "intro"
    | "sketch"
    | "style-design"
    | "try-on"
    | "style-redraw"
    | "ai-graphic"
    | "logo-placement"
    | "ecommerce"
    | "closing"
    | "overview";
  footer?: FooterConfig;
  autoAdvanceMs?: number;
  backdropImage?: string;
};

export type IntroScreen = BaseScreen & {
  kind: "intro";
  headline: string;
  body: string;
  avatar: string;
  leftAmbient: string;
  rightAmbient: string;
  ctaLabel: string;
  ctaTarget: string;
};

export type SketchScreen = BaseScreen & {
  kind: "sketch";
  narrative: string;
  variant: "interactive" | "processing" | "done";
  ctaLabel?: string;
  ctaTarget?: string;
  statusLabel?: string;
  autoTarget?: string;
  controlsVisibleOnLoad?: boolean;
};

export type StyleDesignScreen = BaseScreen & {
  kind: "style-design";
  narrative: string;
  variant: "selection" | "confirmed";
  ctaLabel?: string;
  ctaTarget?: string;
  autoTarget?: string;
};

export type TryOnScreen = BaseScreen & {
  kind: "try-on";
  narrative: string;
  view: "front" | "back";
  autoTarget?: string;
};

export type StyleRedrawScreen = BaseScreen & {
  kind: "style-redraw";
  narrative: string;
  variant: "focus" | "before" | "after";
  autoTarget?: string;
};

export type AiGraphicScreen = BaseScreen & {
  kind: "ai-graphic";
  narrative: string;
  variant: "prompt" | "processing" | "done" | "try-on";
  ctaLabel?: string;
  ctaTarget?: string;
  statusLabel?: string;
  autoTarget?: string;
};

export type LogoPlacementScreen = BaseScreen & {
  kind: "logo-placement";
  narrative: string;
  variant: "place" | "placed";
  ctaLabel?: string;
  ctaTarget?: string;
  autoTarget?: string;
};

export type EcommerceScreen = BaseScreen & {
  kind: "ecommerce";
  narrative: string;
  variant: "change-pose" | "result";
  ctaLabel?: string;
  ctaTarget?: string;
  autoTarget?: string;
};

export type ClosingScreen = BaseScreen & {
  kind: "closing";
  avatar: string;
  body: string[];
};

export type OverviewCard = {
  number: number;
  title: string;
  target: string;
};

export type OverviewScreen = BaseScreen & {
  kind: "overview";
  cards: OverviewCard[];
};

export type WorkflowScreen =
  | IntroScreen
  | SketchScreen
  | StyleDesignScreen
  | TryOnScreen
  | StyleRedrawScreen
  | AiGraphicScreen
  | LogoPlacementScreen
  | EcommerceScreen
  | ClosingScreen
  | OverviewScreen;

export type Workflow = {
  id: string;
  title: string;
  attract: {
    brandLogo: string;
    workflowMark: string;
    workflowTitle: string;
    videoSrc: string;
    posterSrc?: string;
  };
  brandLogo: string;
  workflowIcon: string;
  screens: WorkflowScreen[];
  overview: OverviewScreen;
};

const workwearScreens: WorkflowScreen[] = [
  {
    id: "step-1",
    frameName: "Workwear Step 1",
    kind: "intro",
    headline: "Hi, ich bin Nina!",
    body:
      "Es ist Donnerstag Nachmittag – eine Ausschreibung für eine Feuerwehr-Jacke kommt rein und es eilt. Ich zeige dir jetzt, wie ich mit KI in kürzester Zeit zu realistischen Design-Vorschlägen komme.",
    avatar: kioskAssets.workwear.introAvatar,
    leftAmbient: kioskAssets.workwear.attractFigure,
    rightAmbient: kioskAssets.workwear.attractFigure,
    ctaLabel: "Weiter",
    ctaTarget: "step-2",
    backdropImage: kioskAssets.workwear.attractBackdrop,
  },
  {
    id: "step-2",
    frameName: "Workwear Step 2",
    kind: "sketch",
    footer: { label: "Sketch to Image", current: 1, total: 6 },
    narrative:
      "Ich starte mit einer groben Skizze. Die KI übersetzt sie direkt in ein realistisches Bild – so sehe ich sofort Proportionen, Linienführung und Grundidee.",
    variant: "interactive",
    ctaLabel: "Details hervorheben",
    ctaTarget: "step-3",
    backdropImage: kioskAssets.workwear.sketchBase,
  },
  {
    id: "step-2-1",
    frameName: "Workwear Step 2.1",
    kind: "sketch",
    footer: { label: "Sketch to Image", current: 1, total: 6 },
    narrative:
      "Ich starte mit einer groben Skizze. Die KI übersetzt sie direkt in ein realistisches Bild – so sehe ich sofort Proportionen, Linienführung und Grundidee.",
    variant: "interactive",
    ctaLabel: "Details hervorheben",
    ctaTarget: "step-3",
    controlsVisibleOnLoad: true,
    backdropImage: kioskAssets.workwear.sketchRender,
  },
  {
    id: "step-3",
    frameName: "Workwear Step 3",
    kind: "sketch",
    footer: { label: "Sketch to Image", current: 1, total: 6 },
    narrative:
      "Ich starte mit einer groben Skizze. Die KI übersetzt sie direkt in ein realistisches Bild – so sehe ich sofort Proportionen, Linienführung und Grundidee.",
    variant: "processing",
    statusLabel: "Bearbeitung Läuft",
    autoAdvanceMs: 1250,
    autoTarget: "step-3-1",
    backdropImage: kioskAssets.workwear.sketchFinishedCollage,
  },
  {
    id: "step-3-1",
    frameName: "Workwear Step 3.1",
    kind: "sketch",
    footer: { label: "Sketch to Image", current: 1, total: 6 },
    narrative:
      "Ich starte mit einer groben Skizze. Die KI übersetzt sie direkt in ein realistisches Bild – so sehe ich sofort Proportionen, Linienführung und Grundidee.",
    variant: "done",
    statusLabel: "Fertig!",
    backdropImage: kioskAssets.workwear.sketchFinishedCollage,
  },
  {
    id: "step-4",
    frameName: "Workwear Step 4",
    kind: "style-design",
    footer: { label: "Style Design Agent", current: 2, total: 6 },
    narrative:
      "Hier nutze ich den Style Design Agent. Die KI schlägt mir Outfit-Varianten vor, die zum bestehenden Workwear-Style passen und funktional sinnvoll sind. Zum Beispiel eine Hose und Schuhe",
    variant: "selection",
    autoAdvanceMs: 1100,
    autoTarget: "step-4-1",
    backdropImage: kioskAssets.workwear.styleDesignMain,
  },
  {
    id: "step-4-1",
    frameName: "Workwear Step 4.1",
    kind: "style-design",
    footer: { label: "Style Design Agent", current: 2, total: 6 },
    narrative:
      "Hier nutze ich den Style Design Agent. Die KI schlägt mir Outfit-Varianten vor, die zum bestehenden Workwear-Style passen und funktional sinnvoll sind. Zum Beispiel eine Hose und Schuhe",
    variant: "confirmed",
    ctaLabel: "Zum nächsten Schritt",
    ctaTarget: "step-5",
    backdropImage: kioskAssets.workwear.styleDesignThumbPants,
  },
  {
    id: "step-5",
    frameName: "Workwear Step 5",
    kind: "try-on",
    footer: { label: "Outfit Try-on", current: 3, total: 6 },
    narrative:
      "Jetzt prüfe ich die Wirkung der Jacke am Modell. Kein Fitting – sondern ein schneller visueller Check: Wie wirkt das Design im Gesamtkontext?",
    view: "front",
    autoAdvanceMs: 1250,
    autoTarget: "step-5-1",
    backdropImage: kioskAssets.workwear.tryOnFront,
  },
  {
    id: "step-5-1",
    frameName: "Workwear Step 5.1",
    kind: "try-on",
    footer: { label: "Outfit Try-on", current: 3, total: 6 },
    narrative:
      "Jetzt prüfe ich die Wirkung der Jacke am Modell. Kein Fitting – sondern ein schneller visueller Check: Wie wirkt das Design im Gesamtkontext?",
    view: "back",
    autoAdvanceMs: 1250,
    autoTarget: "step-6",
    backdropImage: kioskAssets.workwear.tryOnBack,
  },
  {
    id: "step-6",
    frameName: "Workwear Step 6",
    kind: "style-redraw",
    footer: { label: "Style Redraw (Details)", current: 4, total: 6 },
    narrative:
      "Jetzt gehe ich ins Detail. Die KI hilft mir, einzelne Bereiche gezielt zu überarbeiten – ohne das ganze Design neu aufzusetzen.",
    variant: "focus",
    autoAdvanceMs: 1100,
    autoTarget: "step-6-1",
    backdropImage: kioskAssets.workwear.styleRedrawSource,
  },
  {
    id: "step-6-1",
    frameName: "Workwear Step 6.1",
    kind: "style-redraw",
    footer: { label: "Style Redraw (Details)", current: 4, total: 6 },
    narrative:
      "Jetzt gehe ich ins Detail. Die KI hilft mir, einzelne Bereiche gezielt zu überarbeiten – ohne das ganze Design neu aufzusetzen.",
    variant: "before",
    autoAdvanceMs: 1200,
    autoTarget: "step-6-2",
    backdropImage: kioskAssets.workwear.styleRedrawBefore,
  },
  {
    id: "step-6-2",
    frameName: "Workwear Step 6.2",
    kind: "style-redraw",
    footer: { label: "Style Redraw (Details)", current: 4, total: 6 },
    narrative:
      "Jetzt gehe ich ins Detail. Die KI hilft mir, einzelne Bereiche gezielt zu überarbeiten – ohne das ganze Design neu aufzusetzen.",
    variant: "after",
    autoAdvanceMs: 1200,
    autoTarget: "step-7",
    backdropImage: kioskAssets.workwear.styleRedrawAfter,
  },
  {
    id: "step-7",
    frameName: "Workwear Step 7",
    kind: "ai-graphic",
    footer: { label: "AI Graphic + AI Graphic Try-on", current: 5, total: 6 },
    narrative:
      "Bevor ich ein Logo platziere, lasse ich es von der KI entwickeln. Wichtig ist mir dabei: klare Lesbarkeit, funktionaler Stil und volle Produkttreue. Die KI arbeitet nicht frei, sondern auf Basis unserer bestehenden Designs und klarer Vorgaben.",
    variant: "prompt",
    ctaLabel: "Generieren",
    ctaTarget: "step-7-1",
  },
  {
    id: "step-7-1",
    frameName: "Workwear Step 7.1",
    kind: "ai-graphic",
    footer: { label: "AI Graphic + AI Graphic Try-on", current: 5, total: 6 },
    narrative:
      "Bevor ich ein Logo platziere, lasse ich es von der KI entwickeln. Wichtig ist mir dabei: klare Lesbarkeit, funktionaler Stil und volle Produkttreue. Die KI arbeitet nicht frei, sondern auf Basis unserer bestehenden Designs und klarer Vorgaben.",
    variant: "processing",
    statusLabel: "Bearbeitung Läuft",
    autoAdvanceMs: 1250,
    autoTarget: "step-7-2",
    backdropImage: kioskAssets.workwear.logoThumbOne,
  },
  {
    id: "step-7-2",
    frameName: "Workwear Step 7.2",
    kind: "ai-graphic",
    footer: { label: "AI Graphic + AI Graphic Try-on", current: 5, total: 6 },
    narrative:
      "Bevor ich ein Logo platziere, lasse ich es von der KI entwickeln. Wichtig ist mir dabei: klare Lesbarkeit, funktionaler Stil und volle Produkttreue. Die KI arbeitet nicht frei, sondern auf Basis unserer bestehenden Designs und klarer Vorgaben.",
    variant: "done",
    statusLabel: "Fertig!",
    autoAdvanceMs: 1250,
    autoTarget: "step-7-3",
    backdropImage: kioskAssets.workwear.logoThumbOne,
  },
  {
    id: "step-7-3",
    frameName: "Workwear Step 7.3",
    kind: "ai-graphic",
    footer: { label: "AI Graphic + AI Graphic Try-on", current: 5, total: 6 },
    narrative:
      "Branding ist wichtig – aber es darf die Funktion nicht stören. Die KI zeigt mir verschiedene Logo-Varianten und Platzierungen.",
    variant: "try-on",
    ctaLabel: "Try On!",
    ctaTarget: "step-8",
    backdropImage: kioskAssets.workwear.logoThumbOne,
  },
  {
    id: "step-8",
    frameName: "Workwear Step 8",
    kind: "logo-placement",
    footer: { label: "AI Graphic + AI Graphic Try-on", current: 5, total: 6 },
    narrative:
      "Sobald das Logo steht, prüfe ich, wo es auf der Jacke am besten funktioniert.",
    variant: "place",
    ctaLabel: "Place Logo",
    ctaTarget: "step-8-1",
    backdropImage: kioskAssets.workwear.logoMainPlacement,
  },
  {
    id: "step-8-1",
    frameName: "Workwear Step 8.1",
    kind: "logo-placement",
    footer: { label: "AI Graphic + AI Graphic Try-on", current: 5, total: 6 },
    narrative:
      "Sobald das Logo steht, prüfe ich, wo es auf der Jacke am besten funktioniert.",
    variant: "placed",
    autoAdvanceMs: 1100,
    autoTarget: "step-9",
    backdropImage: kioskAssets.workwear.logoMainPlacement,
  },
  {
    id: "step-9",
    frameName: "Workwear Step 9",
    kind: "ecommerce",
    footer: { label: "E-Commerce Agent", current: 6, total: 6 },
    narrative:
      "Zum Schluss bereite ich die Designs für den Kunden vor. Die KI erstellt konsistente, hochwertige Präsentationen – perfekt für Review, Ausschreibung oder Shop",
    variant: "change-pose",
    ctaLabel: "Change pose",
    ctaTarget: "step-9-1",
    backdropImage: kioskAssets.workwear.reviewScene,
  },
  {
    id: "step-9-1",
    frameName: "Workwear Step 9.1",
    kind: "ecommerce",
    footer: { label: "AI Graphic + AI Graphic Try-on", current: 6, total: 6 },
    narrative:
      "Zum Schluss bereite ich die Designs für den Kunden vor. Die KI erstellt konsistente, hochwertige Präsentationen – perfekt für Review, Ausschreibung oder Shop",
    variant: "result",
    autoAdvanceMs: 1250,
    autoTarget: "step-10",
    backdropImage: kioskAssets.workwear.reviewScene,
  },
  {
    id: "step-10",
    frameName: "Workwear Step 10",
    kind: "closing",
    footer: { current: 7, total: 7 },
    avatar: kioskAssets.workwear.introAvatar,
    body: [
      "So sind wir am Freitagmorgen bereit –",
      "mit realistischen, durchdachten Designs.",
      "Schnell. Kontrolliert. Produktnah.",
    ],
    backdropImage: kioskAssets.workwear.closingBackground,
  },
];

const workwearOverview: OverviewScreen = {
  id: "overview",
  frameName: "Workwear Overview",
  kind: "overview",
  cards: [
    { number: 1, title: "Sketch to Image", target: "step-2" },
    { number: 2, title: "Style Design Agent", target: "step-4" },
    { number: 3, title: "Outfit Try-on", target: "step-5" },
    { number: 4, title: "Style Redraw", target: "step-6" },
    { number: 5, title: "AI Graphic + Try-on", target: "step-7" },
    { number: 6, title: "E-Commerce Agent", target: "step-9" },
  ],
  backdropImage: kioskAssets.workwear.reviewScene,
};

const workwearWorkflow: Workflow = {
  id: "workwear",
  title: "AI for Workwear",
  brandLogo: kioskAssets.shared.brandLogo,
  workflowIcon: kioskAssets.shared.workflowMark,
  attract: {
    brandLogo: kioskAssets.shared.brandLogoLarge,
    workflowMark: kioskAssets.shared.workflowMarkLarge,
    workflowTitle: "AI for Workwear",
    videoSrc: kioskAssets.workwear.screensaverVideo,
  },
  screens: workwearScreens,
  overview: workwearOverview,
};

const workflows: Record<string, Workflow> = {
  [workwearWorkflow.id]: workwearWorkflow,
};

export function getWorkflow(workflowId: string) {
  return workflows[workflowId] ?? null;
}

export function getDefaultWorkflow() {
  return workwearWorkflow;
}

export function getWorkflowIds() {
  return Object.keys(workflows);
}

export function getOrderedScreens(workflowId: string) {
  const workflow = getWorkflow(workflowId);

  if (!workflow) {
    return [];
  }

  return workflow.screens;
}

export function getStartScreen(workflowId: string) {
  return getOrderedScreens(workflowId)[0] ?? null;
}

export function getScreen(workflowId: string, screenId: string) {
  const workflow = getWorkflow(workflowId);

  if (!workflow) {
    return null;
  }

  return workflow.screens.find((screen) => screen.id === screenId) ??
    (screenId === workflow.overview.id ? workflow.overview : null);
}

export function getScreenIds(workflowId: string) {
  const workflow = getWorkflow(workflowId);

  if (!workflow) {
    return [];
  }

  return [...workflow.screens.map((screen) => screen.id), workflow.overview.id];
}

export function buildScreenHref(workflowId: string, screenId: string) {
  return `/workflow/${workflowId}/${screenId}`;
}
