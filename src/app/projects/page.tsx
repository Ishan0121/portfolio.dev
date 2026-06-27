import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of projects showcasing my focus on performance, design, and engineering robust solutions.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
