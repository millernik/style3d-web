import type {
  FooterConfig,
  OverviewScreen,
  Workflow,
  WorkflowScreen,
  WorkflowSelectionEntry,
} from "@/lib/workflows";
import type { WorkflowLanguage } from "@/lib/workflow-language";

type LocalizedText = {
  de: string;
  en: string;
};

type LocalizedLines = {
  de: string[];
  en: string[];
};

type ScreenLocalePatch = {
  headline?: LocalizedText;
  body?: LocalizedText;
  bodyLines?: LocalizedLines;
  narrative?: LocalizedText;
  footerLabel?: LocalizedText;
  ctaLabel?: LocalizedText;
  statusLabel?: LocalizedText;
  doneLabel?: LocalizedText;
  promptTitle?: LocalizedText;
  promptBody?: LocalizedText;
  generateLabel?: LocalizedText;
  applyLabel?: LocalizedText;
  processingLabel?: LocalizedText;
  annotationLabel?: LocalizedText;
  resultCtaLabel?: LocalizedText;
  continueLabel?: LocalizedText;
  nextCtaLabel?: LocalizedText;
  bookingCtaLabel?: LocalizedText;
  primaryCtaLabel?: LocalizedText;
  secondaryCtaLabel?: LocalizedText;
  leftBubble?: LocalizedText;
  rightBubble?: LocalizedText;
  participants?: Record<string, LocalizedText>;
  optionLabels?: Record<string, LocalizedText>;
  optionTitles?: Record<string, LocalizedText>;
  optionBodies?: Record<string, LocalizedText>;
  branchLabels?: Record<string, LocalizedText>;
  cardTitles?: Record<string, LocalizedText>;
  toggleLabels?: {
    front?: LocalizedText;
    back?: LocalizedText;
    before?: LocalizedText;
    after?: LocalizedText;
  };
};

type WorkflowLocalePatch = {
  title?: LocalizedText;
  selectionCardTitle?: LocalizedText;
  selectionCardSubtitle?: LocalizedText;
  attractTitle?: LocalizedText;
  overviewTitle?: LocalizedText;
  screens?: Record<string, ScreenLocalePatch>;
};

const text = (de: string, en: string): LocalizedText => ({ de, en });
const lines = (de: string[], en: string[]): LocalizedLines => ({ de, en });

const commonUiText = {
  adminEyebrow: text("ADMIN", "ADMIN"),
  adminHeading: text("Workflow Auswahl", "Workflow Selection"),
  adminDescription: text(
    "Wähle die passende Demo aus. Alle vier Showcase-Workflows sind jetzt live und können direkt gestartet werden.",
    "Choose the right demo. All four showcase workflows are live and can be started directly.",
  ),
  workflowEyebrow: text("Workflow", "Workflow"),
  inactive: text("Inaktiv", "Inactive"),
  openWorkflow: text("Workflow öffnen", "Open workflow"),
  comingSoon: text("Demnächst", "Coming soon"),
  startWorkflow: text("Start workflow", "Start workflow"),
  promptLabel: text("Prompt:", "Prompt:"),
  nextStep: text("Zum nächsten Schritt", "Next step"),
  processing: text("Bearbeitung läuft", "Processing"),
  done: text("Fertig", "Done"),
  restart: text("Neu starten", "Restart"),
  overview: text("Overview", "Overview"),
  bookDemoNow: text("Jetzt Demo buchen", "Book demo now"),
};

const workflowLocales: Partial<Record<Workflow["id"], WorkflowLocalePatch>> = {
  workwear: {
    title: text("AI for Workwear", "AI for Workwear"),
    selectionCardTitle: text("Workwear", "Workwear"),
    selectionCardSubtitle: text(
      "Feuerwehr-Workwear vom Sketch bis zur E-Commerce-Vorschau",
      "Firefighter workwear from sketch to e-commerce preview",
    ),
    attractTitle: text("AI for Workwear", "AI for Workwear"),
    overviewTitle: text("AI for Workwear Overview", "AI for Workwear Overview"),
    screens: {
      "step-1": {
        headline: text("Hi, ich bin Nina!", "Hi, I’m Nina!"),
        body: text(
          "Es ist Donnerstag-Nachmittag – eine Ausschreibung für eine Feuerwehr-Jacke kommt rein und es eilt. Ich zeige dir jetzt, wie ich mit KI in kürzester Zeit zu realistischen Design-Vorschlägen komme.",
          "It’s Thursday afternoon – a request for a firefighter jacket just came in, and it’s urgent. I’ll show you how I use AI to quickly create realistic design proposals.",
        ),
        ctaLabel: text("Weiter", "Next"),
      },
      "step-2": {
        narrative: text(
          "Ich starte mit einer groben Skizze. Die KI übersetzt sie direkt in ein realistisches Bild – so sehe ich sofort Proportionen, Linienführung und Grundidee.",
          "I start with a rough sketch. The AI instantly turns it into a realistic image – so I can immediately see proportions, lines, and the overall idea.",
        ),
        footerLabel: text("Sketch to Image", "Sketch to Image"),
        ctaLabel: text("Details hervorheben", "Show details"),
      },
      "step-2-1": {
        narrative: text(
          "Ich starte mit einer groben Skizze. Die KI übersetzt sie direkt in ein realistisches Bild – so sehe ich sofort Proportionen, Linienführung und Grundidee.",
          "I start with a rough sketch. The AI instantly turns it into a realistic image – so I can immediately see proportions, lines, and the overall idea.",
        ),
        footerLabel: text("Sketch to Image", "Sketch to Image"),
        ctaLabel: text("Details hervorheben", "Show details"),
      },
      "step-3": {
        narrative: text(
          "Ich starte mit einer groben Skizze. Die KI übersetzt sie direkt in ein realistisches Bild – so sehe ich sofort Proportionen, Linienführung und Grundidee.",
          "I start with a rough sketch. The AI instantly turns it into a realistic image – so I can immediately see proportions, lines, and the overall idea.",
        ),
        footerLabel: text("Sketch to Image", "Sketch to Image"),
        doneLabel: text("Fertig", "Done"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
      },
      "step-3-1": {
        narrative: text(
          "Ich starte mit einer groben Skizze. Die KI übersetzt sie direkt in ein realistisches Bild – so sehe ich sofort Proportionen, Linienführung und Grundidee.",
          "I start with a rough sketch. The AI instantly turns it into a realistic image – so I can immediately see proportions, lines, and the overall idea.",
        ),
        footerLabel: text("Sketch to Image", "Sketch to Image"),
        doneLabel: text("Fertig", "Done"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
      },
      "step-4": {
        narrative: text(
          "Hier nutze ich den Style Design Agent. Die KI schlägt mir Outfit-Varianten vor, die zum bestehenden Workwear-Style passen und funktional sinnvoll sind. Zum Beispiel eine Hose und Schuhe.",
          "Here I use the Style Design Agent. The AI suggests outfit variations that match the existing workwear style and are functionally appropriate. For example, pants and shoes.",
        ),
        footerLabel: text("Style Design Agent", "Style Design Agent"),
        ctaLabel: text("Outfit anprobieren", "Outfit Try-on"),
      },
      "step-5": {
        narrative: text(
          "Jetzt prüfe ich die Wirkung der Jacke am Modell. Kein Fitting – sondern ein schneller visueller Check: Wie wirkt das Design im Gesamtkontext?",
          "Now I check how the jacket looks on a model. No fitting – just a quick visual check: How does the design work in the overall context?",
        ),
        footerLabel: text("Outfit Try-on", "Outfit Try-on"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
        toggleLabels: {
          front: text("Front", "Front"),
          back: text("Back", "Back"),
        },
      },
      "step-6": {
        narrative: text(
          "Jetzt gehe ich ins Detail. Die KI hilft mir, einzelne Bereiche gezielt zu überarbeiten – ohne das ganze Design neu aufzusetzen.",
          "Now I go into detail. The AI helps me refine specific areas without having to redo the entire design.",
        ),
        footerLabel: text("Style Redraw", "Style Redraw"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
        toggleLabels: {
          before: text("Vorher", "Before"),
          after: text("Nachher", "After"),
        },
      },
      "step-7": {
        narrative: text(
          "Bevor ich ein Logo platziere, lasse ich es von der KI entwickeln. Wichtig sind mir dabei: klare Lesbarkeit, funktionaler Stil und volle Produkttreue. Die KI arbeitet nicht frei, sondern auf Basis unserer bestehenden Designs und klarer Vorgaben.",
          "Before placing a logo, I have the AI develop it. What matters to me: clear readability, functional style, and full product consistency. The AI doesn’t work freely, but based on our existing designs and clear guidelines.",
        ),
        footerLabel: text("Graphic Design Agent", "Graphic Design Agent"),
        promptTitle: text("Prompt:", "Prompt:"),
        promptBody: text(
          "Erstelle mir ein gesticktes Logo in Kreisform mit Feuer und einem Hammer darin. Der Hintergrund darf dunkel sein, mit weißem Rand. Die Objekte sollen klar erkennbar sein.",
          "Please create an embroidered logo for me in the shape of a circle with fire and a hammer inside. The background can be dark with a white border. The objects should be clearly visible.",
        ),
        ctaLabel: text("Generieren", "Create"),
        statusLabel: text("Bearbeitung läuft", "Processing"),
        doneLabel: text("Fertig", "Done"),
        resultCtaLabel: text("Try On!", "Try On!"),
      },
      "step-8": {
        narrative: text(
          "Sobald das Logo steht, prüfe ich, wie es auf der Jacke aussieht.",
          "Once the logo is ready, I check how it looks on the jacket.",
        ),
        footerLabel: text("Graphic Design Agent", "Graphic Design Agent"),
        ctaLabel: text("Place Logo", "Place Logo"),
        nextCtaLabel: text("Zum nächsten Schritt", "Next step"),
      },
      "step-9": {
        narrative: text(
          "Zum Schluss bereite ich das Design für den Kunden vor. Style3D Moda erstellt mir konsistente, hochwertige Bilder und Videos – perfekt für die interne Abstimmung, die Ausschreibung oder unseren Shop.",
          "Finally, I prepare the design for the client. Style3D Moda creates consistent, high-quality images and videos – perfect for internal alignment, tenders, or our shop.",
        ),
        footerLabel: text("E-Commerce Agent", "E-Commerce Agent"),
        ctaLabel: text("Change pose", "Change pose"),
        nextCtaLabel: text("Zum nächsten Schritt", "Next step"),
      },
      "step-10": {
        bodyLines: lines(
          [
            "So, jetzt ist unsere Präsentation für Freitag fertig – mit realistischen, durchdachten Designs. Mit KI ging es diesmal einfach schneller.",
          ],
          [
            "Now our presentation for Friday is ready – with realistic, well-thought-out designs. This time, AI simply made it faster.",
          ],
        ),
        bookingCtaLabel: text("Jetzt Demo buchen", "Book demo now"),
        primaryCtaLabel: text("Neu starten", "Restart"),
        secondaryCtaLabel: text("Overview", "Overview"),
      },
      overview: {
        cardTitles: {
          "step-2": text("Sketch to Image", "Sketch to Image"),
          "step-4": text("Style Design Agent", "Style Design Agent"),
          "step-5": text("Outfit Try-on", "Outfit Try-on"),
          "step-6": text("Style Redraw", "Style Redraw"),
          "step-7": text("Graphic Design Agent", "Graphic Design Agent"),
          "step-9": text("E-Commerce Agent", "E-Commerce Agent"),
        },
      },
    },
  },
  mantel: {
    title: text(
      "AI for Retail | Brand",
      "AI for Retail | Brand",
    ),
    selectionCardTitle: text("AI for Retail | Brand", "AI for Retail | Brand"),
    selectionCardSubtitle: text(
      "Capsule-Mantel von Moodboard bis Campaign Assets",
      "Capsule coat from moodboard to campaign assets",
    ),
    attractTitle: text(
      "AI for Retail | Brand",
      "AI for Retail | Brand",
    ),
    overviewTitle: text(
      "AI for Retail | Brand Overview",
      "AI for Retail | Brand Overview",
    ),
    screens: {
      "step-1": {
        participants: {
          daniel: text(
            "Hi, Adrian! Das Brand-Team braucht bis morgen einen Mantel für unsere neue Capsule-Kollektion der Young Business Women Line. Moodboard, Stoff, Farben anbei. Sorry ist eilig! Präsentation morgen früh im Meeting.",
            "Hi, Adrian! The brand team needs a coat for our new capsule collection for the Young Business Women line by tomorrow. Moodboard, fabrics, colors attached. Sorry, it’s urgent! Presentation tomorrow in the meeting.",
          ),
          "adrian-ok": text("ok geht klar", "ok got it"),
          "adrian-go": text(
            "Lass uns loslegen. Ich will den Fokus auf den Mantel legen und sicherstellen, dass alles zusammenpasst. Deshalb mache ich es mit Style3D Moda AI Agents. Wichtig: Meine Ankerpunkte sind der Mantelstoff und die Colorways - die haben wir schon festgelegt. Auch ein Moodboard für die Story gibt es schon.",
            "Let’s get started. I want to focus on the coat and make sure everything works together. That’s why I’m using Style3D Moda AI Agents. Important: my anchor points are the coat fabric and the colorways. We’ve already defined those. There’s also a moodboard for the story.",
          ),
        },
        primaryCtaLabel: text("Click & Explore", "Click & Explore"),
      },
      "step-2": {
        narrative: text(
          "Der Mantel im Moodboard muss an unsere Designsprache angepasst werden. Ich starte mit einer groben Skizze oder einem Beispielbild. Ich gebe noch den Stoff dazu.",
          "The coat in the moodboard should follow our design language. I’ll start with a rough sketch or an example image. I’ll also add the fabric.",
        ),
        footerLabel: text("Sketch to Image", "Sketch to Image"),
        ctaLabel: text("Details hervorheben", "Show details"),
      },
      "step-3": {
        narrative: text(
          "Mal im Detail sehen - Revers, Knöpfe, Taschen. Weil meine Zeichnung schon so gut war, gibt es für mich nichts zu ändern. Ich könnte aber Edits in der KI machen. Die Details halte ich als Detailshots für das Tech Pack fest.",
          "Let’s take a closer look - lapels, buttons, pockets. Because my drawing was already so good, there’s nothing for me to change. But I could still make edits in the AI. I’ll capture the details as close-up shots for the tech pack.",
        ),
        footerLabel: text("Detail Review", "Detail Review"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
      },
      "step-4": {
        narrative: text(
          "Für das Brand-Team zeige ich noch, wie alles an unseren Hausmodellen in Größe 0 und in einer großen Größe aussieht. Ab ins Techpack damit.",
          "For the brand team, I’ll also show how everything looks on our fit models for the base size and an extended size. Let’s get that into the tech pack.",
        ),
        footerLabel: text("E-Commerce Agent", "E-Commerce Agent"),
        promptBody: text(
          "Zeige mir den Mantel am Model aus der Set Card und kombiniere ihn in einem Outfit für eher kältere Frühlingstage und kombiniere Stiefeletten, Stoffhose und Strickpullover in Beigetönen.",
          "Show me the coat on the model from the set card and combine it in an outfit for colder spring days, pairing it with ankle boots, fabric trousers, and a knit sweater in beige tones.",
        ),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
        generateLabel: text("Generate", "Generate"),
        optionLabels: {
          small: text("Base", "Base Size"),
          large: text("Größer", "Extended Size"),
        },
      },
      "step-5": {
        narrative: text(
          "Sobald das Design steht, lasse ich den Mantel für das Tech Pack aufbereiten. Über unseren Customized Agent kann ich sogar Beschriftungen einfügen.",
          "Now that the design is done, I prepare the coat for the tech pack. With our customized agent, I can even add annotations.",
        ),
        footerLabel: text("Tech Pack Support", "Tech Pack Support"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
        generateLabel: text("Create", "Create"),
        processingLabel: text("Bearbeitung läuft", "Processing"),
        annotationLabel: text("Beschriftung hinzufügen", "Add annotations"),
      },
      "step-6": {
        narrative: text(
          "Ich prüfe den Colorway aus dem Moodboard. Das passt auch gut. Mal sehen. Ich mache aber trotzdem mit dem Braun weiter, wie gehabt.",
          "I check the colorway from the moodboard. That also works well. Let’s see. But I’ll still continue with the brown, as planned.",
        ),
        footerLabel: text("Colorways", "Colorways"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
      },
      "step-7": {
        narrative: text(
          "Ich habe noch Zeit und zeige, wie mein Mantel sich in die Kollektion und ins Store-Konzept einfügt. Letztes Jahr war das Wetter im Frühjahr auf einmal superwarm. Es kann aber auch kalt sein, deshalb zeige ich verschiedene Accessoires.",
          "I still have time and show how my coat fits into the collection and store concept. Last year, spring weather suddenly became very warm. But it can also be cold, so I’m showing different accessories.",
        ),
        footerLabel: text("E-Commerce agent", "E-Commerce agent"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
        optionLabels: {
          rain: text("Regen", "Rain"),
          sun: text("Sonne", "Sun"),
        },
      },
      "step-8": {
        narrative: text(
          "Für das Brand-Team mache ich noch ein paar Profi-Photoshoots, die zu unserer letzten Kampagne passen.",
          "For the brand team, I also create a few professional photoshoots that match our latest campaign.",
        ),
        footerLabel: text("E-Commerce Agent", "E-Commerce Agent"),
        promptBody: text(
          "Fashion model with sleek dark hair, striking confident expression, and intense penetrating eyes, posed dynamically in a high-end studio setting, wearing the coat with minimalist avant-garde clothing, dramatic studio lighting with sharp contrasts, photorealistic detail, professional editorial photography style. Do a light and a dark version",
          "Fashion model with sleek dark hair, striking confident expression, and intense penetrating eyes, posed dynamically in a high-end studio setting, wearing the coat with minimalist avant-garde clothing, dramatic studio lighting with sharp contrasts, photorealistic detail, professional editorial photography style. Do a light and a dark version",
        ),
        processingLabel: text("Bearbeitung läuft", "Processing"),
        generateLabel: text("Generieren", "Create"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
        optionLabels: {
          dark: text("dunkel", "Dark"),
          light: text("hell", "Light"),
        },
      },
      "step-9": {
        narrative: text(
          "Hier sammle ich die finalen Modelshots zusammen mit den wichtigsten Detailansichten vom Mantel. So kann das Team Look und Produktqualität auf einen Blick prüfen.",
          "Here I collect the final model shots together with the most important coat detail views. This lets the team review look and product quality at a glance.",
        ),
        footerLabel: text("Review Gallery", "Review Gallery"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
        optionLabels: {
          "dark-model": text("Model dunkel", "Dark model"),
          "light-model": text("Model hell", "Light model"),
          "collar-detail": text("Revers", "Lapel"),
          "waist-detail": text("Knöpfe", "Buttons"),
          "fabric-detail": text("Stoff", "Fabric"),
          video: text("Video", "Video"),
        },
      },
      "step-10": {
        leftBubble: text(
          "Sieht gut aus - Rack und Video sind tolle extras! Danke dir. Bis morgen",
          "Looks good - rack and video are great extras! Thanks. See you tomorrow.",
        ),
        rightBubble: text(
          "hey Daniel, alles fertig für morgen",
          "hey Daniel, everything ready for tomorrow",
        ),
        bodyLines: lines(
          [
            "Fertig - jetzt schaffe ich es doch noch zum Joggen.",
            "Meine Dateien sind alle im Folder - Daniel ist happy damit.",
          ],
          [
            "Done - now I can still go for a run.",
            "My files are all in the folder. And Daniel is happy with it.",
          ],
        ),
        primaryCtaLabel: text("Neu starten", "Restart"),
        secondaryCtaLabel: text("Folder aufmachen", "Open folder"),
      },
      overview: {
        cardTitles: {
          "step-2": text("Sketch to Image", "Sketch to Image"),
          "step-3": text("Detail Review", "Detail Review"),
          "step-4": text("E-Commerce Agent", "E-Commerce Agent"),
          "step-5": text("Tech Pack Support", "Tech Pack Support"),
          "step-6": text("Colorways", "Colorways"),
          "step-7": text("E-Commerce agent", "E-Commerce agent"),
          "step-8": text("E-Commerce Agent", "E-Commerce Agent"),
          "step-9": text("Review Gallery", "Review Gallery"),
        },
      },
    },
  },
  nachtwaesche: {
    title: text("AI for Branding Campaigns", "AI for Branding Campaigns"),
    selectionCardTitle: text("AI for Branding Campaigns", "AI for Branding Campaigns"),
    selectionCardSubtitle: text(
      "Von Moodboard bis Print-Placement für die Sleepwear-Kapsel",
      "From moodboard to print placement for the sleepwear capsule",
    ),
    attractTitle: text("AI for Branding Campaigns", "AI for Branding Campaigns"),
    overviewTitle: text(
      "AI for Branding Campaigns Overview",
      "AI for Branding Campaigns Overview",
    ),
    screens: {
      "step-1": {
        headline: text("Hi,\nich bin Celina!", "Hi,\nI’m Celina!"),
        body: text(
          "Ich entwickle die Visuals für unsere klassische Pyjama-Kollektion für den Sommer. Das Brand-Team will eine Girls Pyjama-Party als Thema. Unsere beliebte Pyjama-Linie bekommt neue, schöne Sommer-Farben und wir wollen die Vermarktung starten.",
          "I create the visuals for our classic summer pyjama collection. The theme is Girls’ Pyjama Party. Our bestselling line gets fresh summer colors, and we prepare for the campaign.",
        ),
        ctaLabel: text("Workflow starten", "Start workflow"),
      },
      "step-2": {
        narrative: text(
          "Aus dem Moodboard hole ich mir alle Details zu Farben und Story. Der Customized Agent kennt unsere Library und holt mir unsere klassischen Pyjama-Styles mit den neuen Farben und Stoffen an die Puppen. Ich arbeite mit zwei Outfits weiter.",
          "I take colors and story from the moodboard. The Customized Agent applies our classic pyjama styles to avatars with updated colors and fabrics. I continue with two outfits.",
        ),
        footerLabel: text("Customized Agent", "Customized Agent"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
      },
      "step-3": {
        narrative: text(
          "Ich starte mit den Outfit-Varianten aus dem Konzept. So entscheide ich zuerst, welche Richtung wir weiter in die Vermarktung tragen. Zuerst „hole“ ich mir den Pyjama von der Puppe.",
          "I explore outfit variations to define the direction for the campaign. First, I pull the pyjama from the avatar.",
        ),
        footerLabel: text("Garment to Flat", "Garment to Flat"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
        optionLabels: {
          "outfit-1": text("Outfit 1", "Outfit 1"),
          "outfit-2": text("Outfit 2", "Outfit 2"),
        },
      },
      "step-4": {
        narrative: text(
          "Jetzt entscheide ich mich für die finale Bildrichtung. Ich erstelle Models und probiere den Pyjama an. Je nach Prompt wähle ich später die passende Render-Galerie für das Kampagnenmotiv aus. Die Bilder sollen eine Girls' Night-In zeigen - mit den Mädchen zusammen, aber auch jede für sich.",
          "Now, I define the final visual direction. I create models and style the pyjama, then select the best render gallery for the campaign. The visuals capture a Girls’ Night In — showing the girls both together and individually.",
        ),
        footerLabel: text("E-Commerce Agent", "E-Commerce Agent"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
        optionTitles: {
          green: text("Prompt 1", "Prompt 1"),
          pink: text("Prompt 2", "Prompt 2"),
        },
        optionBodies: {
          green: text(
            "African American female model in her early 20s, student age, natural and authentic look, soft light curves, warm and friendly face, open and approachable expression, relaxed and confident demeanor.\n\nClear skin, subtle natural makeup, expressive eyes, gentle smile, youthful energy, effortless beauty. Long, straight hair, smooth and well-kept, with a natural shine. Well-groomed but not overly styled.\n\nCasual, modern appearance with a strong sense of authenticity and relatability, body-positive presence. Conveying ease and genuine emotion.",
            "African American female model in her early 20s, student age, natural and authentic look, soft light curves, warm and friendly face, open and approachable expression, relaxed and confident demeanor.\n\nClear skin, subtle natural makeup, expressive eyes, gentle smile, youthful energy, effortless beauty. Long, straight hair, smooth and well-kept, with a natural shine. Well-groomed but not overly styled.\n\nCasual, modern appearance with a strong sense of authenticity and relatability, body-positive presence. Conveying ease and genuine emotion.",
          ),
          pink: text(
            "White female model in her early 20s, student age, Scandinavian type (fair skin, blonde hair), natural and authentic look, soft light curves, warm and friendly face, open and approachable expression, relaxed and confident demeanor.\n\nClear skin, subtle natural makeup, expressive eyes, gentle smile, youthful energy, effortless beauty. Long, straight blonde hair, smooth and well-kept, with a natural shine.\n\nStrong sense of joy and liveliness, radiating positivity and lightness. Casual, modern appearance with authenticity and relatability, body-positive presence. Comfortable in front of the camera, conveying ease and genuine emotion.",
            "White female model in her early 20s, student age, Scandinavian type (fair skin, blonde hair), natural and authentic look, soft light curves, warm and friendly face, open and approachable expression, relaxed and confident demeanor.\n\nClear skin, subtle natural makeup, expressive eyes, gentle smile, youthful energy, effortless beauty. Long, straight blonde hair, smooth and well-kept, with a natural shine.\n\nStrong sense of joy and liveliness, radiating positivity and lightness. Casual, modern appearance with authenticity and relatability, body-positive presence. Comfortable in front of the camera, conveying ease and genuine emotion.",
          ),
        },
      },
      "step-5": {
        narrative: text(
          "Jetzt sehe ich mir die gerenderten Kampagnenmotive für die gewählte Prompt-Richtung an und prüfe, welche Bildwelt am besten trägt.",
          "I review the rendered visuals and choose the direction that works best.",
        ),
        footerLabel: text("E-Commerce Agent", "E-Commerce Agent"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
        branchLabels: {
          green: text("grün", "green"),
          pink: text("pink", "pink"),
        },
      },
      "step-6": {
        narrative: text(
          "Teil unserer Kampagne ist ein Gewinnspiel. Zu gewinnen gibt es ein Übernachtungspaket - eine Tasche mit Accessoires, die genau zu unserer Kollektion passt. Die Tasche gibt es schon, aber die Grafik fehlt noch.",
          "The campaign includes a giveaway. The prize is a sleepover set with a tote bag and matching accessories. The bag exists — the graphic is still missing.",
        ),
        footerLabel: text("Graphic Design Agent", "Graphic Design Agent"),
        promptBody: text(
          "Create a round playful retro cocktail style logo for the print on the give away tote. Keep the illustration bright, product-friendly to summer night sleepwear and close to the approved pyjama-party color palette. Use a cocktail style design that fits for the girls night in story. Overall look: nostalgic, 70s-inspired, slightly grainy embroidery texture, product-friendly graphic suitable for a tote bag print.",
          "Create a round playful retro cocktail style logo for the print on the give away tote. Keep the illustration bright, product-friendly to summer night sleepwear and close to the approved pyjama-party color palette. Use a cocktail style design that fits for the girls night in story. Overall look: nostalgic, 70s-inspired, slightly grainy embroidery texture, product-friendly graphic suitable for a tote bag print.",
        ),
        generateLabel: text("Generieren", "Create"),
        applyLabel: text("Apply to bag", "Apply to bag"),
      },
      "step-9": {
        bodyLines: lines(
          [
            "Die Summer Pyjama-Kollektion ist bereit für Review und Vermarktung.",
            "Moodboard, Outfit, Renderings und Giveaway-Tasche greifen dank KI nahtlos ineinander.",
          ],
          [
            "The summer pyjama collection is ready for review and launch.",
            "Moodboard, outfits, renderings, and tote are aligned through AI.",
          ],
        ),
        bookingCtaLabel: text("Demo buchen", "Book a demo"),
        primaryCtaLabel: text("Neu starten", "Restart"),
        secondaryCtaLabel: text("Overview", "Overview"),
      },
      "step-7": {
        narrative: text(
          "Ich übertrage die gewählte Artwork jetzt auf das Gewinnspiel-Set und prüfe die finalen Varianten direkt am Bag- und Accessory-Resultat.",
          "I now apply the selected artwork to the giveaway set and review the final bag and accessory variants directly in the result gallery.",
        ),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
        processingLabel: text("Bearbeitung läuft", "Processing"),
      },
      "step-8": {
        narrative: text(
          "Zum Schluss prüfe ich die letzten Kampagnen-Assets noch einmal gemeinsam als Galerie. So sieht das Team Bilder und Motion direkt in einem finalen Review-Schritt.",
          "At the end, I review the final campaign assets together in one gallery. This gives the team images and motion in one final review step.",
        ),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
      },
      overview: {
        cardTitles: {
          "step-2": text("Customized Agent", "Customized Agent"),
          "step-3": text("Garment to Flat", "Garment to Flat"),
          "step-4": text("E-Commerce Agent", "E-Commerce Agent"),
          "step-5": text("E-Commerce Agent", "E-Commerce Agent"),
          "step-6": text("Graphic Design Agent", "Graphic Design Agent"),
          "step-7": text("Bag & Accessories", "Bag & Accessories"),
          "step-8": text("Mixed Assets", "Mixed Assets"),
        },
      },
    },
  },
  "key-visual": {
    title: text("AI for Outdoor Products", "AI for Outdoor Products"),
    selectionCardTitle: text("AI for Outdoor Products", "AI for Outdoor Products"),
    attractTitle: text("AI for Outdoor Products", "AI for Outdoor Products"),
    overviewTitle: text(
      "AI for Outdoor Products Overview",
      "AI for Outdoor Products Overview",
    ),
    screens: {
      "step-1": {
        headline: text("Hi, ich bin Raul.", "Hi, I’m Raul."),
        body: text(
          "Ich arbeite an unserer Outdoor-Kollektion. Fit und Style sind uns wichtig, deshalb achten wir sehr genau auf unsere Schnitte. Wir steuern den ganzen Prozess selbst. 3D gehört für uns dazu - mit KI geht es schneller und sieht besser aus. Unsere letzte Kollektion lief richtig gut. Jetzt wollen wir eine Übergangsjacke nachlegen.",
          "I work on our outdoor collection. Fit and style are very important to us, so we pay close attention to our patterns. We manage the entire process ourselves. 3D is part of our workflow – with AI it’s faster and looks better. Our last collection performed really well. Now we want to add a mid-season jacket.",
        ),
        ctaLabel: text("Workflow starten", "Click & Explore"),
      },
      "step-2": {
        narrative: text(
          "Ich starte in Style3D Studio und suche mir ein passendes WhiteShell in der 3D-Library. Der Schnitt ist direkt dabei.",
          "I start in Style3D Studio and choose a matching WhiteShell from our 3D library. The pattern is already included.",
        ),
        footerLabel: text("Style3D Cloud", "Style3D Cloud"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
      },
      "step-3": {
        narrative: text(
          "Dann wähle ich aus der Stoff-Library den passenden Stoff und passe das WhiteShell an. Fertig ist mein erster Entwurf.",
          "Then I select the right fabric from the fabric library and adapt the WhiteShell. My first design is ready.",
        ),
        footerLabel: text("Style3D Studio", "Style3D Studio"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
      },
      "step-4": {
        narrative: text(
          "Die Passform ist entscheidend. Wir designen von XS bis XXL, aber jede Figur ist anders. Deshalb mache ich eine schnelle 3D-Passformanalyse. Wir berücksichtigen normale Figuren, leichten Bauchansatz und athletische Typen. Beim athletischen Typ spannt die Jacke an den Oberarmen – das passe ich im Schnitt an.",
          "Fit is crucial. We design from XS to XXL, but every body is different. That’s why I run a quick 3D fit analysis. We consider standard body types, slight belly shapes, and athletic builds. For athletic types, the jacket feels tight around the upper arms - I adjust the pattern accordingly.",
        ),
        footerLabel: text("Style3D Studio", "Style3D Studio"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
      },
      "step-5": {
        narrative: text(
          "Jetzt teste ich die Muster auf dem Stoff. So kann ich schnell vergleichen, welche grafische Richtung auf der Jacke am überzeugendsten wirkt. In 3D kann ich das Muster ganz exakt platzieren.",
          "Now I test patterns on the fabric. This helps me quickly compare which graphic direction works best for the jacket. In 3D, I can place designs very precisely.",
        ),
        footerLabel: text("Style3D Studio", "Style3D Studio"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
      },
      "step-6": {
        narrative: text(
          "Als Nächstes erstelle ich Farbvarianten und sehe sofort, welche Richtung für unsere Jacken-Linie am besten passt.",
          "Next, I create color variations and instantly see which direction fits for our new jacket line.",
        ),
        footerLabel: text("Style3D Moda", "Style3D Moda"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
      },
      "step-7": {
        narrative: text(
          "Jetzt mache ich die Fotoshoots für das Store-Konzept fertig und zeige die Jacken am Mannequin und am Rack. Hängt gut. Aber sollte Schwarz lieber außen sein?",
          "I finalize the photoshoots for the store concept and present the jackets on a mannequin and on a rack. Looks good—but should black be on the outside?",
        ),
        footerLabel: text("Style Design Agent", "Style Design Agent"),
        continueLabel: text("Weiter", "Continue"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
      },
      "step-8": {
        narrative: text(
          "Ich will eine klare, kampagnenreife Bildsprache für die freigegebene Jacke. Das ist mein Prompt dafür.",
          "I want to create a clear, campaign-ready visual style for the approved jacket. Here is my final prompt for the model images.",
        ),
        footerLabel: text("E-Commerce Agent", "E-Commerce Agent"),
        generateLabel: text("Generieren", "Create"),
        processingLabel: text("Bearbeitung läuft", "Processing"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
      },
      "step-9": {
        narrative: text(
          "Noch schnell prüfen. Ich bin zufrieden mit meinem Prompt und dem Ergebnis. Die Bilder passen und die Richtung stimmt.",
          "Quick final check. I’m happy with my prompt and the result. The images work well and the direction is right.",
        ),
        footerLabel: text("E-Commerce Agent", "E-Commerce Agent"),
        ctaLabel: text("Zum nächsten Schritt", "Next step"),
      },
      "step-10": {
        bodyLines: lines(
          [
            "Der Look steht – Produkt, Präsentation und Key Visual sind abgestimmt. Die neue Übergangsjacke ist bereit für Review, Entscheidung und Kampagnen-Launch.",
          ],
          [
            "The look is set – product, presentation, and key visual are aligned. My new mid-season jacket is ready for review, decision, and campaign launch.",
          ],
        ),
        primaryCtaLabel: text("Neu starten", "Restart"),
        secondaryCtaLabel: text("Überblick", "Overview"),
      },
      overview: {
        cardTitles: {
          "step-2": text("Style3D Cloud", "Style3D Cloud"),
          "step-3": text("Style3D Studio", "Style3D Studio"),
          "step-4": text("Style3D Studio", "Style3D Studio"),
          "step-5": text("Style3D Studio", "Style3D Studio"),
          "step-6": text("Style3D Moda", "Style3D Moda"),
          "step-7": text("Style Design Agent", "Style Design Agent"),
          "step-8": text("E-Commerce Agent", "E-Commerce Agent"),
          "step-9": text("E-Commerce Agent", "E-Commerce Agent"),
        },
      },
    },
  },
};

function resolveText(
  value: LocalizedText | undefined,
  language: WorkflowLanguage,
  fallback: string,
) {
  return value ? value[language] : fallback;
}

function resolveLines(
  value: LocalizedLines | undefined,
  language: WorkflowLanguage,
  fallback: string[],
) {
  return value ? value[language] : fallback;
}

function localizeFooter(
  footer: FooterConfig | undefined,
  value: LocalizedText | undefined,
  language: WorkflowLanguage,
) {
  if (!footer || !value) {
    return footer;
  }

  return {
    ...footer,
    label: value[language],
  };
}

export function getCommonUiText(language: WorkflowLanguage) {
  return Object.fromEntries(
    Object.entries(commonUiText).map(([key, value]) => [key, value[language]]),
  ) as Record<keyof typeof commonUiText, string>;
}

export function localizeWorkflow(
  workflow: Workflow,
  language: WorkflowLanguage,
): Workflow {
  const locale = workflowLocales[workflow.id];

  if (!locale) {
    return workflow;
  }

  return {
    ...workflow,
    title: resolveText(locale.title, language, workflow.title),
    selectionCard: {
      ...workflow.selectionCard,
      title: resolveText(
        locale.selectionCardTitle,
        language,
        workflow.selectionCard.title,
      ),
      subtitle: resolveText(
        locale.selectionCardSubtitle,
        language,
        workflow.selectionCard.subtitle,
      ),
    },
    attract: {
      ...workflow.attract,
      workflowTitle: resolveText(
        locale.attractTitle,
        language,
        workflow.attract.workflowTitle,
      ),
    },
  };
}

export function localizeWorkflowSelectionEntry(
  entry: WorkflowSelectionEntry,
  language: WorkflowLanguage,
): WorkflowSelectionEntry {
  const locale = workflowLocales[entry.id as Workflow["id"]];

  if (!locale) {
    return entry;
  }

  return {
    ...entry,
    title: resolveText(locale.selectionCardTitle, language, entry.title),
    subtitle: resolveText(locale.selectionCardSubtitle, language, entry.subtitle),
  };
}

export function localizeScreen(
  workflowId: Workflow["id"],
  screen: WorkflowScreen,
  language: WorkflowLanguage,
): WorkflowScreen {
  const workflowLocale = workflowLocales[workflowId];
  const patch = workflowLocale?.screens?.[screen.id];

  if (!patch && screen.kind !== "overview") {
    return screen;
  }

  const localizedScreen: WorkflowScreen = {
    ...screen,
    footer: localizeFooter(screen.footer, patch?.footerLabel, language),
  };

  if ("headline" in localizedScreen && patch?.headline) {
    localizedScreen.headline = patch.headline[language];
  }

  if ("body" in localizedScreen && typeof localizedScreen.body === "string" && patch?.body) {
    localizedScreen.body = patch.body[language];
  }

  if ("body" in localizedScreen && Array.isArray(localizedScreen.body) && patch?.bodyLines) {
    localizedScreen.body = resolveLines(patch.bodyLines, language, localizedScreen.body);
  }

  if ("narrative" in localizedScreen && patch?.narrative) {
    localizedScreen.narrative = patch.narrative[language];
  }

  if ("ctaLabel" in localizedScreen && patch?.ctaLabel) {
    localizedScreen.ctaLabel = patch.ctaLabel[language];
  }

  if ("statusLabel" in localizedScreen && patch?.statusLabel) {
    localizedScreen.statusLabel = patch.statusLabel[language];
  }

  if ("doneLabel" in localizedScreen && patch?.doneLabel) {
    localizedScreen.doneLabel = patch.doneLabel[language];
  }

  if ("promptTitle" in localizedScreen && patch?.promptTitle) {
    localizedScreen.promptTitle = patch.promptTitle[language];
  }

  if ("promptBody" in localizedScreen && patch?.promptBody) {
    localizedScreen.promptBody = patch.promptBody[language];
  }

  if ("generateLabel" in localizedScreen && patch?.generateLabel) {
    localizedScreen.generateLabel = patch.generateLabel[language];
  }

  if ("applyLabel" in localizedScreen && patch?.applyLabel) {
    localizedScreen.applyLabel = patch.applyLabel[language];
  }

  if ("processingLabel" in localizedScreen && patch?.processingLabel) {
    localizedScreen.processingLabel = patch.processingLabel[language];
  }

  if ("annotationLabel" in localizedScreen && patch?.annotationLabel) {
    localizedScreen.annotationLabel = patch.annotationLabel[language];
  }

  if ("resultCtaLabel" in localizedScreen && patch?.resultCtaLabel) {
    localizedScreen.resultCtaLabel = patch.resultCtaLabel[language];
  }

  if ("continueLabel" in localizedScreen && patch?.continueLabel) {
    localizedScreen.continueLabel = patch.continueLabel[language];
  }

  if ("nextCtaLabel" in localizedScreen && patch?.nextCtaLabel) {
    localizedScreen.nextCtaLabel = patch.nextCtaLabel[language];
  }

  if ("bookingCtaLabel" in localizedScreen && patch?.bookingCtaLabel) {
    localizedScreen.bookingCtaLabel = patch.bookingCtaLabel[language];
  }

  if ("primaryCtaLabel" in localizedScreen && patch?.primaryCtaLabel) {
    localizedScreen.primaryCtaLabel = patch.primaryCtaLabel[language];
  }

  if ("secondaryCtaLabel" in localizedScreen && patch?.secondaryCtaLabel) {
    localizedScreen.secondaryCtaLabel = patch.secondaryCtaLabel[language];
  }

  if ("leftBubble" in localizedScreen && patch?.leftBubble) {
    localizedScreen.leftBubble = patch.leftBubble[language];
  }

  if ("rightBubble" in localizedScreen && patch?.rightBubble) {
    localizedScreen.rightBubble = patch.rightBubble[language];
  }

  if ("participants" in localizedScreen && patch?.participants) {
    localizedScreen.participants = localizedScreen.participants.map((participant) => ({
      ...participant,
      bubble: resolveText(
        patch.participants?.[participant.id],
        language,
        participant.bubble,
      ),
    }));
  }

  if ("options" in localizedScreen) {
    localizedScreen.options = localizedScreen.options.map((option) => ({
      ...option,
      label: resolveText(
        patch?.optionLabels?.[option.id],
        language,
        "label" in option ? option.label : "",
      ),
      title:
        "title" in option
          ? resolveText(
              patch?.optionTitles?.[option.id],
              language,
              option.title ?? "",
            )
          : undefined,
      body:
        "body" in option
          ? resolveText(
              patch?.optionBodies?.[option.id],
              language,
              option.body ?? "",
            )
          : undefined,
    }));
  }

  if ("presetOptions" in localizedScreen && patch?.optionLabels) {
    localizedScreen.presetOptions = localizedScreen.presetOptions.map((option) => ({
      ...option,
      label: resolveText(patch.optionLabels?.[option.id], language, option.label),
    }));
  }

  if ("branches" in localizedScreen && patch?.branchLabels) {
    localizedScreen.branches = localizedScreen.branches.map((branch) => ({
      ...branch,
      label: resolveText(patch.branchLabels?.[branch.id], language, branch.label),
    }));
  }

  if ("toggleLabels" in localizedScreen && patch?.toggleLabels) {
    const currentToggleLabels = localizedScreen.toggleLabels;

    if (
      currentToggleLabels &&
      "front" in currentToggleLabels &&
      "back" in currentToggleLabels
    ) {
      localizedScreen.toggleLabels = {
        front: resolveText(
          patch.toggleLabels.front,
          language,
          currentToggleLabels.front,
        ),
        back: resolveText(
          patch.toggleLabels.back,
          language,
          currentToggleLabels.back,
        ),
      };
    } else if (
      currentToggleLabels &&
      "before" in currentToggleLabels &&
      "after" in currentToggleLabels
    ) {
      localizedScreen.toggleLabels = {
        before: resolveText(
          patch.toggleLabels.before,
          language,
          currentToggleLabels.before,
        ),
        after: resolveText(
          patch.toggleLabels.after,
          language,
          currentToggleLabels.after,
        ),
      };
    } else if (patch.toggleLabels.front && patch.toggleLabels.back) {
      localizedScreen.toggleLabels = {
        front: patch.toggleLabels.front[language],
        back: patch.toggleLabels.back[language],
      };
    } else if (patch.toggleLabels.before && patch.toggleLabels.after) {
      localizedScreen.toggleLabels = {
        before: patch.toggleLabels.before[language],
        after: patch.toggleLabels.after[language],
      };
    }
  }

  if (localizedScreen.kind === "overview") {
    const overviewPatch = workflowLocale?.screens?.overview;
    const overviewScreen = localizedScreen as OverviewScreen;

    return {
      ...overviewScreen,
      frameName: resolveText(
        workflowLocale?.overviewTitle,
        language,
        overviewScreen.frameName,
      ),
      cards: overviewScreen.cards.map((card) => ({
        ...card,
        title: resolveText(
          overviewPatch?.cardTitles?.[card.target],
          language,
          card.title,
        ),
      })),
    };
  }

  return localizedScreen;
}
