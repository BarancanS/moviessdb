import "./globals.css";
import { Inter } from "next/font/google";
import "react-alice-carousel/lib/alice-carousel.css";
import MainContext from "./components/MainContext";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "MoviesDb",
  description: "MoviesDb",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <MainContext>{children}</MainContext>
      </body>
    </html>
  );
}
