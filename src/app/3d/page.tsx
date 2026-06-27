import type { Metadata } from "next";
import ThreeDLabClient from "./ThreeDLabClient";

export const metadata: Metadata = {
  title: "3D Lab",
  description: "Experimental 3D models and interactive WebGL experiences.",
};

export default function ThreeDLabPage() {
  return <ThreeDLabClient />;
}
