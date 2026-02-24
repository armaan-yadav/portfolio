import { ProjectItem } from "@/components/ProjectItem";
import { OpenSourceItem } from "@/components/OpenSourceItem";
import { Project, projects, openSourceContributions } from "../utils/constants";
import Container from "@/components/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Armaan Yadav",
  description: "Explore my projects and contributions.",
  openGraph: {
    title: "Projects - Armaan Yadav",
    description: "Explore my projects and contributions.",
    url: "https://armaan-yadav.vercel.app/projects",
    images: "https://armaan-yadav.vercel.app/api/og?type=Projects",
  },
};

export default function Page() {
  return (
    <Container as="main" className="flex flex-col items-start">
      {/* Open Source Contributions Section */}
      <section className="w-full mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Open Source</h2>
        <div>
          {openSourceContributions.map((contribution, index) => (
            <OpenSourceItem
              key={index}
              contribution={contribution}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Personal Projects Section */}
      <section className="w-full">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Personal Projects</h2>
        <div>
          {projects.map((project, index) => (
            <ProjectItem key={index} project={project} index={index} />
          ))}
        </div>
      </section>
    </Container>
  );
}
