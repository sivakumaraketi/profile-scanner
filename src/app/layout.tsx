import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Profile Scanner",
  description: "Scann a Bar Code and View my Profile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <main className="flex justify-center mt-8">
          {children}
        </main>
      </body>
    </html>
  );
}
