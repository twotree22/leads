import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Affordable Final Expense Coverage",
  description:
    "Speak with a licensed agent today about final expense life insurance options.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 font-sans text-navy-950 antialiased">
        {children}
      </body>
    </html>
  );
}
