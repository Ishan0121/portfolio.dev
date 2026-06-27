import type { Metadata } from "next";
import SkillsClient from "./SkillsClient";

export const metadata: Metadata = {
  title: "Skills",
  description: "A comprehensive overview of Ishan Maiti's technical skills, technology stack, and areas of expertise.",
};

export default function SkillsPage() {
  return <SkillsClient />;
}
