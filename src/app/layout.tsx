"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import ToasterContext from "./api/contex/ToasetContex";
import { useEffect, useState } from "react";
import PreLoader from "@/components/Common/PreLoader";
import { usePathname } from "next/navigation";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Determine if the current route is the dashboard
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      <head />
      <body>
        {loading ? (
          <PreLoader />
        ) : (
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="dark"
            >
              <ToasterContext />
              {!isDashboard && <Header />}
              <Providers>{children}</Providers>
              {!isDashboard && <Footer />}
              <ScrollToTop />
            </ThemeProvider>
          </SessionProvider>
        )}
      </body>
    </html>
  );
}
