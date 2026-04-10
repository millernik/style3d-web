import type { Metadata } from "next";

import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
