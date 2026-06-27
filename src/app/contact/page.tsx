import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ishan Maiti — open for collaborations, projects, and conversations.",
};

export default function ContactPage() {
  return <ContactClient />;
}
