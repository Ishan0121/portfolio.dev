import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Ishan Maiti | Developer Portfolio",
  description:
    "Creative developer building systems — portfolio of Ishan Maiti.",
  verification: {
    google: "mb816ScIIgwp3_pAT4228WxqE9xSk0yW01PLkPiDARg",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
