import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TwoTree Quote | Affordable Final Expense Coverage",
  description:
    "Speak with a licensed agent about final expense life insurance options that may help cover funeral, burial, medical, and other end-of-life costs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
