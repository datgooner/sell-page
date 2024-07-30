import { Frank_Ruhl_Libre } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Providers from "./providers";

const frl = Frank_Ruhl_Libre({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={frl.className}>
        <Providers>
          {/* <Header /> */}
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
