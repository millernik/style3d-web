import type { Metadata } from "next";

import "./globals.css";
import { WorkflowLanguageProvider } from "@/lib/workflow-language";

export const metadata: Metadata = {
  title: "Style3D Expo Kiosk",
  description: "Kiosk workflow showcase for expo use.",
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
