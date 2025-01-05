import type { Metadata } from "next";
import { Jaldi } from "next/font/google";
import "./globals.css";

const jaldiFont = Jaldi({
  weight: ["400", "700"],
  variable: "--font-jaldi",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Story No Board",
  description: "Tu historia en un tablero kkkkkkk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${jaldiFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
