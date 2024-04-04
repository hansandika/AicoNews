import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AicoNews",
  description: "Read financial news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any"/>
      <body>
        <Navbar/>
          <main>
            {children}
          </main>
        <Footer/>
      </body>
    </html>
  );
}
