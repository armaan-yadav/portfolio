import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Armaan Yadav",
  description: "I know how to figure things out.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
  },
  openGraph: {
    title: "Armaan Yadav",
    description: "I know how to figure things out.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://armaanyadav.site",
    siteName: "Armaan Yadav",
    locale: "en_US",
    type: "website",
  },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col p-5">
      <div className="flex justify-center items-center mb-14">
        <Header />
      </div>
      <div className="flex justify-center items-center">{children}</div>
      <div className="mt-10">
        <Footer />
      </div>
    </main>
  );
}
