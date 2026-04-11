export const kioskAssets = {
  shared: {
    brandLogo: "/assets/shared/style3d-logo.svg",
    workflowMark: "/assets/shared/workwear-mark.svg",
    brandLogoLarge: "/assets/shared/style3d-logo-large.svg",
    workflowMarkLarge: "/assets/shared/workwear-mark-large.svg",
    mantelWorkflowMark: "/assets/shared/mantel-mark.svg",
    mantelWorkflowMarkLarge: "/assets/shared/mantel-mark-large.svg",
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
  mantel: {
    attractBackdrop: "/assets/mantel/intro/moodboard-backdrop.png",
    screensaverPoster: "/assets/mantel/intro/moodboard-backdrop.png",
    introDaniel: "/assets/mantel/intro/daniel.png",
    introAdrian: "/assets/mantel/intro/adrian.png",
    imageToSketchBase: "/assets/mantel/step-2-image-to-sketch/sketch.png",
    imageToSketchRender: "/assets/mantel/step-3-detail-gallery/coat-main.png",
    imageToSketchSwatch: "/assets/mantel/step-2-image-to-sketch/fabric-swatch.png",
    detailHero: "/assets/mantel/step-3-detail-gallery/coat-main.png",
    detailFabric: "/assets/mantel/step-3-detail-gallery/detail-fabric.jpg",
    detailWaist: "/assets/mantel/step-3-detail-gallery/detail-waist.jpg",
    detailCollar: "/assets/mantel/step-3-detail-gallery/detail-collar.jpg",
    detailCuff: "/assets/mantel/step-3-detail-gallery/detail-cuff.jpg",
    tryOnSmall: "/assets/mantel/step-4-try-on/look-small.png",
    tryOnLarge: "/assets/mantel/step-4-try-on/look-large.png",
    techPackPromptReference: "/assets/mantel/step-5-tech-pack/reference.png",
    techPackSketch: "/assets/mantel/step-5-tech-pack/tech-sketch.png",
    techPackImage: "/assets/mantel/step-5-tech-pack/tech-image.png",
    colorwayCamel: "/assets/mantel/step-6-colorways/main-camel.png",
    colorwayNavy: "/assets/mantel/step-6-colorways/main-navy.png",
    colorwayGrey: "/assets/mantel/step-6-colorways/main-grey.png",
    colorwayThumbCamel: "/assets/mantel/step-6-colorways/thumb-camel.png",
    colorwayThumbNavy: "/assets/mantel/step-6-colorways/thumb-navy.png",
    colorwayThumbGrey: "/assets/mantel/step-6-colorways/thumb-grey.png",
    campaignSceneSun: "/assets/mantel/step-7-campaign/preset-sun.png",
    campaignSceneRain: "/assets/mantel/step-7-campaign/preset-rain.png",
    campaignResultFinished: "/assets/mantel/step-7-campaign/result-finished.png",
    campaignResultLight: "/assets/mantel/step-7-campaign/result-light.png",
    campaignResultDark: "/assets/mantel/step-7-campaign/result-dark.png",
    campaignVideoPoster: "/assets/mantel/step-7-campaign/video-poster.png",
    campaignVideoOverlay: "/assets/mantel/step-7-campaign/video-overlay.svg",
    closingBackground: "/assets/mantel/closing/jogger-background.png",
    closingDaniel: "/assets/mantel/closing/daniel.png",
    closingAdrian: "/assets/mantel/closing/adrian.png",
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
    | "overview"
    | "mantel-intro"
    | "mantel-image-to-sketch"
    | "mantel-detail-gallery"
    | "mantel-try-on"
    | "mantel-tech-pack"
    | "mantel-colorways"
    | "mantel-campaign"
    | "mantel-closing";
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
  ctaLabel?: string;
  ctaTarget?: string;
  autoTarget?: string;
};

export type StyleRedrawScreen = BaseScreen & {
  kind: "style-redraw";
  narrative: string;
  variant: "focus" | "before" | "after";
  ctaLabel?: string;
  ctaTarget?: string;
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
  artwork?: string[];
};

export type OverviewScreen = BaseScreen & {
  kind: "overview";
  cards: OverviewCard[];
};

export type MantelIntroParticipant = {
  id: string;
  name: string;
  avatar: string;
  bubble: string;
  align: "left" | "right";
  tone: "cool" | "warm";
};

export type MantelIntroScreen = BaseScreen & {
  kind: "mantel-intro";
  summary: string[];
  participants: MantelIntroParticipant[];
  primaryCtaLabel: string;
  primaryCtaTarget: string;
  secondaryCtaLabel: string;
  secondaryCtaTarget: string;
};

export type MantelImageToSketchScreen = BaseScreen & {
  kind: "mantel-image-to-sketch";
  narrative: string;
  baseImage: string;
  renderImage: string;
  swatchImage: string;
  ctaLabel: string;
  ctaTarget: string;
  autoRevealMs: number;
};

export type MantelDetailOption = {
  id: string;
  label: string;
  thumbImage: string;
  heroImage: string;
};

export type MantelDetailGalleryScreen = BaseScreen & {
  kind: "mantel-detail-gallery";
  narrative: string;
  heroImage: string;
  detailOptions: MantelDetailOption[];
  ctaLabel: string;
  ctaTarget: string;
};

export type MantelTryOnOption = {
  id: string;
  label: string;
  image: string;
};

export type MantelTryOnScreen = BaseScreen & {
  kind: "mantel-try-on";
  narrative: string;
  options: MantelTryOnOption[];
  ctaLabel: string;
  ctaTarget: string;
  ctaDelayMs: number;
};

export type MantelTechPackScreen = BaseScreen & {
  kind: "mantel-tech-pack";
  narrative: string;
  promptTitle: string;
  promptBody: string;
  promptReferenceImage: string;
  sketchImage: string;
  renderImage: string;
  generateLabel: string;
  processingLabel: string;
  resultToggleLabels: [string, string];
  ctaLabel: string;
  ctaTarget: string;
  processingMs: number;
  resultCtaDelayMs: number;
};

export type MantelColorwayOption = {
  id: string;
  label: string;
  image: string;
  thumbImage: string;
};

export type MantelColorwaysScreen = BaseScreen & {
  kind: "mantel-colorways";
  narrative: string;
  options: MantelColorwayOption[];
  ctaLabel: string;
  ctaTarget: string;
};

export type MantelCampaignPreset = {
  id: string;
  label: string;
  image: string;
};

export type MantelCampaignLightingOption = {
  id: string;
  label: string;
  image: string;
};

export type MantelCampaignScreen = BaseScreen & {
  kind: "mantel-campaign";
  narrative: string;
  presetOptions: MantelCampaignPreset[];
  promptBody: string;
  generateLabel: string;
  processingLabel: string;
  finishedLabel: string;
  resultDoneImage: string;
  lightingOptions: MantelCampaignLightingOption[];
  videoPoster: string;
  videoOverlay?: string;
  ctaLabel: string;
  ctaTarget: string;
  processingMs: number;
  lightingRevealMs: number;
  videoAutoAdvanceMs: number;
  resultCtaDelayMs: number;
};

export type MantelClosingScreen = BaseScreen & {
  kind: "mantel-closing";
  avatarLeft: string;
  avatarRight: string;
  leftBubble: string;
  rightBubble: string;
  body: string[];
  primaryCtaLabel: string;
  primaryHref: string;
  secondaryCtaLabel: string;
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
  | OverviewScreen
  | MantelIntroScreen
  | MantelImageToSketchScreen
  | MantelDetailGalleryScreen
  | MantelTryOnScreen
  | MantelTechPackScreen
  | MantelColorwaysScreen
  | MantelCampaignScreen
  | MantelClosingScreen;

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
  selectionCard: {
    title: string;
    subtitle: string;
    previewImage: string;
  };
  screens: WorkflowScreen[];
  overview: OverviewScreen;
};

export type WorkflowSelectionEntry = {
  id: string;
  title: string;
  subtitle: string;
  previewImage?: string;
  workflowIcon?: string;
  status: "active" | "disabled";
  startHref?: string;
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
    ctaLabel: "Zum nächsten Schritt",
    ctaTarget: "step-4",
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
    ctaLabel: "Zum nächsten Schritt",
    ctaTarget: "step-5",
    backdropImage: kioskAssets.workwear.styleDesignMain,
  },
  {
    id: "step-5",
    frameName: "Workwear Step 5",
    kind: "try-on",
    footer: { label: "Outfit Try-on", current: 3, total: 6 },
    narrative:
      "Jetzt prüfe ich die Wirkung der Jacke am Modell. Kein Fitting – sondern ein schneller visueller Check: Wie wirkt das Design im Gesamtkontext?",
    view: "front",
    ctaLabel: "Zum nächsten Schritt",
    ctaTarget: "step-6",
    backdropImage: kioskAssets.workwear.tryOnFront,
  },
  {
    id: "step-6",
    frameName: "Workwear Step 6",
    kind: "style-redraw",
    footer: { label: "Style Redraw (Details)", current: 4, total: 6 },
    narrative:
      "Jetzt gehe ich ins Detail. Die KI hilft mir, einzelne Bereiche gezielt zu überarbeiten – ohne das ganze Design neu aufzusetzen.",
    variant: "focus",
    ctaLabel: "Zum nächsten Schritt",
    ctaTarget: "step-7",
    backdropImage: kioskAssets.workwear.styleRedrawSource,
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
    {
      number: 1,
      title: "Sketch to Image",
      target: "step-2",
      artwork: [kioskAssets.workwear.sketchBase, kioskAssets.workwear.sketchHighlightOverlay],
    },
    {
      number: 2,
      title: "Style Design Agent",
      target: "step-4",
      artwork: [
        kioskAssets.workwear.styleDesignThumbPants,
        kioskAssets.workwear.styleDesignThumbBoots,
      ],
    },
    {
      number: 3,
      title: "Outfit Try-on",
      target: "step-5",
      artwork: [kioskAssets.workwear.tryOnBack, kioskAssets.workwear.tryOnFront],
    },
    {
      number: 4,
      title: "Style Redraw",
      target: "step-6",
      artwork: [kioskAssets.workwear.styleRedrawSource],
    },
    {
      number: 5,
      title: "AI Graphic + Try-on",
      target: "step-7",
      artwork: [kioskAssets.workwear.logoMainPlacement],
    },
    {
      number: 6,
      title: "E-Commerce Agent",
      target: "step-9",
      artwork: [kioskAssets.workwear.reviewScene],
    },
  ],
  backdropImage: kioskAssets.workwear.reviewScene,
};

const mantelScreens: WorkflowScreen[] = [
  {
    id: "step-1",
    frameName: "Mantel 1",
    kind: "mantel-intro",
    summary: [
      "Lass uns loslegen. Ich will im Fokus auf den Mantel bleiben und sicherstellen, dass alles zusammenpasst. Deshalb mache ich es mit Style3D Moda AI Agents.",
      "Wichtig: Meine Ankerpunkte sind der Mantelstoff und die Colorways – die haben wir schon festgelegt. Auch ein Moodboard für die Story gibt es schon.",
    ],
    participants: [
      {
        id: "daniel",
        name: "Daniel",
        avatar: kioskAssets.mantel.introDaniel,
        bubble:
          "Hi, Adrian. Das Brand-Team braucht bis morgen einen Mantel für unsere neue Capsule-Kollektion der Young Business Women Line. Moodboard, Stoff, Farben anbei. Sorry ist eilig! Präsentation morgen früh im Meeting",
        align: "left",
        tone: "cool",
      },
      {
        id: "adrian",
        name: "Adrian",
        avatar: kioskAssets.mantel.introAdrian,
        bubble: "ok geht klar.",
        align: "right",
        tone: "warm",
      },
    ],
    primaryCtaLabel: "Click & Explore",
    primaryCtaTarget: "step-2",
    secondaryCtaLabel: "Overview",
    secondaryCtaTarget: "overview",
    backdropImage: kioskAssets.mantel.attractBackdrop,
  },
  {
    id: "step-2",
    frameName: "Mantel 2 + 2.1",
    kind: "mantel-image-to-sketch",
    footer: { label: "Image to Sketch", current: 1, total: 6 },
    narrative:
      "Der Mantel im Moodboard muss an unsere Designsprache angepasst werden. Ich starte mit einer groben Skizze oder einem Beispielbild. Die KI übersetzt sie direkt in ein realistisches Bild.",
    baseImage: kioskAssets.mantel.imageToSketchBase,
    renderImage: kioskAssets.mantel.imageToSketchRender,
    swatchImage: kioskAssets.mantel.imageToSketchSwatch,
    ctaLabel: "Details hervorheben",
    ctaTarget: "step-3",
    autoRevealMs: 5000,
    backdropImage: kioskAssets.mantel.imageToSketchRender,
  },
  {
    id: "step-3",
    frameName: "Mantel 3 + 3.1",
    kind: "mantel-detail-gallery",
    footer: { label: "Detail Review", current: 2, total: 6 },
    narrative:
      "Hier prüfe ich die entscheidenden Mantel-Details. Mit einem Tap hole ich Kragen, Taille, Ärmel oder Tasche in den Fokus und gleiche sie mit unserer Linie ab.",
    heroImage: kioskAssets.mantel.detailHero,
    detailOptions: [
      {
        id: "fabric",
        label: "Stoff",
        thumbImage: kioskAssets.mantel.detailFabric,
        heroImage: kioskAssets.mantel.detailFabric,
      },
      {
        id: "waist",
        label: "Knopfleiste",
        thumbImage: kioskAssets.mantel.detailWaist,
        heroImage: kioskAssets.mantel.detailWaist,
      },
      {
        id: "collar",
        label: "Kragen",
        thumbImage: kioskAssets.mantel.detailCollar,
        heroImage: kioskAssets.mantel.detailCollar,
      },
      {
        id: "cuff",
        label: "Manschette",
        thumbImage: kioskAssets.mantel.detailCuff,
        heroImage: kioskAssets.mantel.detailCuff,
      },
    ],
    ctaLabel: "Zum nächsten Schritt",
    ctaTarget: "step-4",
    backdropImage: kioskAssets.mantel.detailHero,
  },
  {
    id: "step-4",
    frameName: "Mantel 4",
    kind: "mantel-try-on",
    footer: { label: "Virtual Try-on", current: 3, total: 6 },
    narrative:
      "Jetzt prüfe ich die Silhouette am Modell. Mit einem schnellen Größenwechsel sehe ich sofort, ob der Mantel in der Young Business Women Line die richtige Präsenz hat.",
    options: [
      { id: "small", label: "0-Größe", image: kioskAssets.mantel.tryOnSmall },
      { id: "large", label: "Größer", image: kioskAssets.mantel.tryOnLarge },
    ],
    ctaLabel: "Zum nächsten Schritt",
    ctaTarget: "step-5",
    ctaDelayMs: 5000,
    backdropImage: kioskAssets.mantel.tryOnSmall,
  },
  {
    id: "step-5",
    frameName: "Mantel 5.1 + 5.2 + 5.3",
    kind: "mantel-tech-pack",
    footer: { label: "Tech Pack", current: 4, total: 6 },
    narrative:
      "Sobald die Form steht, lasse ich mir den Mantel als Tech-Pack aufbereiten. So kann ich technische Details und Bildreferenz parallel prüfen, ohne den Schritt in Illustrator neu aufzubauen.",
    promptTitle: "Prompt:",
    promptBody:
      "Please build a clean technical fashion drawing for this double-breasted coat. Keep collar, pockets, button line, hem and waist proportion consistent with the approved concept.",
    promptReferenceImage: kioskAssets.mantel.techPackPromptReference,
    sketchImage: kioskAssets.mantel.techPackSketch,
    renderImage: kioskAssets.mantel.techPackImage,
    generateLabel: "Generieren",
    processingLabel: "Bearbeitung Läuft",
    resultToggleLabels: ["Skizze", "Bild"],
    ctaLabel: "Zum nächsten Schritt",
    ctaTarget: "step-6",
    processingMs: 1250,
    resultCtaDelayMs: 5000,
    backdropImage: kioskAssets.mantel.techPackImage,
  },
  {
    id: "step-6",
    frameName: "Mantel 6",
    kind: "mantel-colorways",
    footer: { label: "Colorways", current: 5, total: 6 },
    narrative:
      "Hier teste ich die finalen Colorways. Die Form bleibt stabil – ich prüfe nur, welche Farbe im Line-up die stärkste Wirkung hat und zur Story passt.",
    options: [
      {
        id: "camel",
        label: "Camel",
        image: kioskAssets.mantel.colorwayCamel,
        thumbImage: kioskAssets.mantel.colorwayThumbCamel,
      },
      {
        id: "navy",
        label: "Navy",
        image: kioskAssets.mantel.colorwayNavy,
        thumbImage: kioskAssets.mantel.colorwayThumbNavy,
      },
      {
        id: "grey",
        label: "Grey",
        image: kioskAssets.mantel.colorwayGrey,
        thumbImage: kioskAssets.mantel.colorwayThumbGrey,
      },
    ],
    ctaLabel: "Zum nächsten Schritt",
    ctaTarget: "step-7",
    backdropImage: kioskAssets.mantel.colorwayCamel,
  },
  {
    id: "step-7",
    frameName: "Mantel 7 + 8 + 9 + 9.1 + 10",
    kind: "mantel-campaign",
    footer: { label: "Campaign Assets", current: 6, total: 6 },
    narrative:
      "Zum Schluss erzeuge ich das Kampagnenmotiv. Erst wähle ich die Szene, dann lasse ich die KI eine Präsentationsfassung erzeugen und prüfe anschließend Licht und Hero-Poster.",
    presetOptions: [
      { id: "sun", label: "Sonne", image: kioskAssets.mantel.campaignSceneSun },
      { id: "rain", label: "Regen", image: kioskAssets.mantel.campaignSceneRain },
    ],
    promptBody:
      "Create a premium campaign visual for the approved coat. Keep the silhouette elegant, editorial and close to the selected capsule moodboard.",
    generateLabel: "Generieren",
    processingLabel: "Bearbeitung Läuft",
    finishedLabel: "Fertig!",
    resultDoneImage: kioskAssets.mantel.campaignResultFinished,
    lightingOptions: [
      { id: "light", label: "Hell", image: kioskAssets.mantel.campaignResultLight },
      { id: "dark", label: "Dunkel", image: kioskAssets.mantel.campaignResultDark },
    ],
    videoPoster: kioskAssets.mantel.campaignVideoPoster,
    videoOverlay: kioskAssets.mantel.campaignVideoOverlay,
    ctaLabel: "Zum nächsten Schritt",
    ctaTarget: "step-8",
    processingMs: 1250,
    lightingRevealMs: 1200,
    videoAutoAdvanceMs: 4000,
    resultCtaDelayMs: 5000,
    backdropImage: kioskAssets.mantel.campaignResultLight,
  },
  {
    id: "step-8",
    frameName: "Mantel 11",
    kind: "mantel-closing",
    footer: { current: 7, total: 7 },
    avatarLeft: kioskAssets.mantel.closingDaniel,
    avatarRight: kioskAssets.mantel.closingAdrian,
    leftBubble: "Sieht gut aus – Rack und Video sind tolle extras! Danke dir. Bis morgen 👍",
    rightBubble: "hey Daniel, alles fertig für morgen",
    body: [
      "Fertig – jetzt schaffe ich es doch noch zum Joggen.",
      "Meine Dateien sind alle im Folder – Daniel hat schon „geliked“.",
    ],
    primaryCtaLabel: "Neustarten",
    primaryHref: "/admin",
    secondaryCtaLabel: "Folder Aufmachen",
    backdropImage: kioskAssets.mantel.closingBackground,
  },
];

const mantelOverview: OverviewScreen = {
  id: "overview",
  frameName: "Mantel Overview",
  kind: "overview",
  cards: [
    {
      number: 1,
      title: "Image to Sketch",
      target: "step-2",
      artwork: [kioskAssets.mantel.imageToSketchBase, kioskAssets.mantel.imageToSketchRender],
    },
    {
      number: 2,
      title: "Detail Review",
      target: "step-3",
      artwork: [kioskAssets.mantel.detailCollar, kioskAssets.mantel.detailWaist],
    },
    {
      number: 3,
      title: "Virtual Try-on",
      target: "step-4",
      artwork: [kioskAssets.mantel.tryOnSmall, kioskAssets.mantel.tryOnLarge],
    },
    {
      number: 4,
      title: "Tech Pack",
      target: "step-5",
      artwork: [kioskAssets.mantel.techPackSketch, kioskAssets.mantel.techPackImage],
    },
    {
      number: 5,
      title: "Colorways",
      target: "step-6",
      artwork: [kioskAssets.mantel.colorwayCamel],
    },
    {
      number: 6,
      title: "Campaign Assets",
      target: "step-7",
      artwork: [kioskAssets.mantel.campaignVideoPoster],
    },
  ],
  backdropImage: kioskAssets.mantel.campaignResultLight,
};

const workwearWorkflow: Workflow = {
  id: "workwear",
  title: "AI for Workwear",
  brandLogo: kioskAssets.shared.brandLogo,
  workflowIcon: kioskAssets.shared.workflowMark,
  selectionCard: {
    title: "Workwear",
    subtitle: "Feuerwehr-Workwear vom Sketch bis zur E-Commerce-Vorschau",
    previewImage: kioskAssets.workwear.reviewScene,
  },
  attract: {
    brandLogo: kioskAssets.shared.brandLogoLarge,
    workflowMark: kioskAssets.shared.workflowMarkLarge,
    workflowTitle: "AI for Workwear",
    videoSrc: kioskAssets.workwear.screensaverVideo,
  },
  screens: workwearScreens,
  overview: workwearOverview,
};

const mantelWorkflow: Workflow = {
  id: "mantel",
  title: "AI.Showcase Mantel",
  brandLogo: kioskAssets.shared.brandLogo,
  workflowIcon: kioskAssets.shared.mantelWorkflowMark,
  selectionCard: {
    title: "Mantel",
    subtitle: "Capsule-Mantel von Moodboard bis Campaign Assets",
    previewImage: kioskAssets.mantel.attractBackdrop,
  },
  attract: {
    brandLogo: kioskAssets.shared.brandLogoLarge,
    workflowMark: kioskAssets.shared.mantelWorkflowMarkLarge,
    workflowTitle: "AI.Showcase Mantel",
    videoSrc: kioskAssets.mantel.screensaverPoster,
    posterSrc: kioskAssets.mantel.screensaverPoster,
  },
  screens: mantelScreens,
  overview: mantelOverview,
};

const workflows: Record<string, Workflow> = {
  [workwearWorkflow.id]: workwearWorkflow,
  [mantelWorkflow.id]: mantelWorkflow,
};

const disabledWorkflowSelections: WorkflowSelectionEntry[] = [
  {
    id: "key-visual",
    title: "Key Visual",
    subtitle: "Demnächst verfügbar",
    status: "disabled",
  },
  {
    id: "nachtwaesche",
    title: "Nachtwäsche",
    subtitle: "Demnächst verfügbar",
    status: "disabled",
  },
];

export function getWorkflow(workflowId: string) {
  return workflows[workflowId] ?? null;
}

export function getDefaultWorkflow() {
  return workwearWorkflow;
}

export function getWorkflowIds() {
  return Object.keys(workflows);
}

export function getWorkflowSelectionEntries(): WorkflowSelectionEntry[] {
  const activeSelections: WorkflowSelectionEntry[] = [
    workwearWorkflow,
    mantelWorkflow,
  ].map((workflow) => ({
    id: workflow.id,
    title: workflow.selectionCard.title,
    subtitle: workflow.selectionCard.subtitle,
    previewImage: workflow.selectionCard.previewImage,
    workflowIcon: workflow.workflowIcon,
    status: "active" as const,
    startHref: `/workflow/${workflow.id}`,
  }));

  return [...activeSelections, ...disabledWorkflowSelections];
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

  return (
    workflow.screens.find((screen) => screen.id === screenId) ??
    (screenId === workflow.overview.id ? workflow.overview : null)
  );
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
