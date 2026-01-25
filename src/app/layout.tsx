
import { Inter } from 'next/font/google';
import './globals.css';
import 'antd/dist/reset.css';
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
   variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} >
      <body  className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
