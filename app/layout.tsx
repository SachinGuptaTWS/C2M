import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Connect to Mentor",
  description: "Unlock your potential with expert guidance from industry leaders. Join live mentoring sessions and accelerate your career growth.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
