"use client";

import { AppWrapper } from "@/context";
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
      </body>
    </html>
  )
}
