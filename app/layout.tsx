import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EXCUSE™ — Why didn't you do it?",
  description:
    "Submit your excuse. Our completely unnecessary investigation department will determine what really happened.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%230A0A0A%22/><text x=%2250%22 y=%2268%22 font-size=%2270%22 text-anchor=%22middle%22 fill=%22%23C7F000%22>?</text></svg>",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
