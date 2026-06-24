"use server";

import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

export async function getReadme(username: string, repo: string) {
  try {
    let res = await fetch(`https://raw.githubusercontent.com/${username}/${repo}/main/README.md`);
    if (!res.ok) {
      res = await fetch(`https://raw.githubusercontent.com/${username}/${repo}/master/README.md`);
    }

    if (res.ok) {
      const text = await res.text();
      
      // Serialize the markdown to MDX
      const mdxSource = await serialize(text, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      });

      return { source: mdxSource, error: null };
    } else {
      return { source: null, error: "No README found for this repository." };
    }
  } catch (error) {
    console.error("Error fetching README:", error);
    return { source: null, error: "Failed to load README." };
  }
}
