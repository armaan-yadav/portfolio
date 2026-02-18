import CertificateItem from "@/components/CertificateItem";
import EducationItem from "@/components/EducationItem";
import Container from "@/components/Container";
import { Metadata } from "next";
import { certificates, edducation } from "../utils/constants";

export const metadata: Metadata = {
  title: "Education - Armaan Yadav",
  description:
    "Discover my educational background, degrees, the institutions I've attended, and my certifications.",
  openGraph: {
    title: "Education - Armaan Yadav",
    description:
      "Discover my educational background, degrees, the institutions I've attended, and my certifications.",
    url: "https://armaan-yadav.vercel.app/education",
    images: "https://armaan-yadav.vercel.app/api/og?type=Education",
  },
};

export default function Page() {
  return (
    <Container as="main" className="flex flex-col items-start">
      {/* <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
        My Education & Certifications
      </h1> */}

      {/* Education Section */}
      <section className="w-full mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Education</h2>
        <div className="relative">
          {edducation.map((edu, index) => (
            <EducationItem
              key={index}
              education={edu}
              index={index}
              isLast={index === edducation.length - 1}
            />
          ))}
        </div>
      </section>

      {/* Certificates Section */}
      <section className="w-full">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Certificates</h2>
        {certificates.map((cert, index) => (
          <CertificateItem key={index} certificate={cert} index={index} />
        ))}
      </section>
    </Container>
  );
}
