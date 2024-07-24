import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/header/Header";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import Transition from "@/components/transition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WolfPath",
  description: "Przejdź przez wilczą ścieżkę",
};

export default  async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            >
          <Toaster/>
          <Transition>
            <Header/>
            <div className="pt-[10vh]">
              {children}
            </div>
          </Transition>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
