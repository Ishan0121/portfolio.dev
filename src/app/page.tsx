import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Identity Website | Ishan Maiti",
  description:
    "Creative developer building systems — portfolio of Ishan Maiti.",
};

export default function HomePage() {
  return <HomeClient />;
}
