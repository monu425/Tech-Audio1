import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    template: "%s - Tech Audio Store",
    default: "Tech Audio Store - Your Trusted Online Shopping Destination",
  },
  description:
    "Tech Audio Store is your one-stop shop for high-quality audio equipment. We offer a wide range of products, including headphones, speakers, and audio accessories, all designed to deliver exceptional sound quality and performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(`${poppins.className} h-full antialiased`)}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          {children}
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
