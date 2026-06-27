import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Ishan Maiti — CS student, developer, and builder of digital experiences.",
};

export default function AboutPage() {
  return <AboutClient />;
}
