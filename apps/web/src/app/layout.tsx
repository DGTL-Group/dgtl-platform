import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DGTL Group — Digital Agency",
    template: "%s · DGTL Group",
  },
  description:
    "DGTL Group is a digital agency building modern web, AI automation, content, and growth strategy for ambitious brands.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
