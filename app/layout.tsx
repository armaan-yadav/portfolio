import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GeistMono } from "geist/font";
import { ThemeProvider } from "../components/theme-provider";
import "./globals.css";
import OnekoCat from "@/components/OnekoCat";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics gaId="G-1JY768PP5D" />
      <body className={GeistMono.className}>
        <OnekoCat />
        <SmoothCursor />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
