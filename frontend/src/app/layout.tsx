import "./globals.css";
import React from "react";

export const metadata = {
  title: "StartupPilot AI — Autonomous Startup Mentor & Regional Arbitrage Platform",
  description: "Multi-agent AI platform evaluating startup ideas, human-level regional price arbitrage, live real-world news, and generating investor pitch decks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
