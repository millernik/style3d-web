import type { Metadata } from "next";

import "./globals.css";
import { WorkflowLanguageProvider } from "@/lib/workflow-language";

export const metadata: Metadata = {
  title: "Style3D Web Showcase",
  description: "Responsive Style3D workflow showcase for the browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <div className="desktop-app-shell">
          <WorkflowLanguageProvider>{children}</WorkflowLanguageProvider>
        </div>
        <div className="desktop-only-guard" aria-live="polite">
          <div>
            <div className="desktop-only-guard__mark">Style3D</div>
            <p>
              Diese Demo ist für Desktop-Ansichten optimiert. Bitte öffne sie auf
              einem Laptop oder Desktop.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
