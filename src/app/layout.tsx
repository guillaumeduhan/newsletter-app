"use client";
import { AppWrapper } from "@/context";
import { Toaster } from "sonner";
import './globals.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <AppWrapper>
          {children}
        </AppWrapper>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
