import { Socials } from "@/components/SocialLinkItem";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Socials - Armaan Yadav",
  description:
    "Connect with me on social media and discover my online presence.",
  openGraph: {
    title: "Socials - Armaan Yadav",
    description:
      "Connect with me on social media and discover my online presence.",
    url: "https://armaan-yadav.vercel.app/socials",
    images: "https://armaan-yadav.vercel.app/api/og?type=Socials",
  },
};

export default function SocialLinks() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] p-5 mt-4">
      <Socials />
    </main>
  );
}
