import { Metadata } from "next";
import { Mona_Sans } from "next/font/google"; // Correct import
import "./globals.css";
import { Toaster } from "sonner";

const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona-sans",
});

export const metadata: Metadata = {
  title: "Prepmaster",
  description: "An AI-powered platform for mock interviews.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.className} antialiased pattern`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
