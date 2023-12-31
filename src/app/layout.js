import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import "./globals.css";
import { Prompt } from "next/font/google";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const inter = Prompt({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "APP",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="container">
            <Navbar />

            {children}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
