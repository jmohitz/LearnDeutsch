import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnDeutsch - Learn German with AI",
  description: "Learn German through AI-powered visual stories and interactive lessons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
