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
        <WorkflowLanguageProvider>{children}</WorkflowLanguageProvider>
      </body>
    </html>
  );
}
