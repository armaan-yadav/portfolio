import { WorkExperienceItem } from "@/components/WorkExperienceItem";
import { workExperiences } from "../utils/constants";
import Container from "@/components/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work - Armaan Yadav",
  description:
    "Discover my work experience and the companies I've collaborated with.",
  openGraph: {
    title: "Work - Armaan Yadav",
    description:
      "Discover my work experience and the companies I've collaborated with.",
    url: "https://armaan-yadav.vercel.app/work",
    images: "https://armaan-yadav.vercel.app/api/og?type=Work",
  },
};

export default function Page() {
  return (
    <Container as="main" className="flex flex-col items-start">
      <div className="relative">
        {workExperiences.map((experience, index) => (
          <WorkExperienceItem
            key={index}
            experience={experience}
            index={index}
            isLast={index === workExperiences.length - 1}
          />
        ))}
      </div>
    </Container>
  );
}
