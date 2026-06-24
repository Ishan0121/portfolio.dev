export async function getReadme(username: string, repo: string) {
  try {
    let res = await fetch(`https://raw.githubusercontent.com/${username}/${repo}/main/README.md`);
    if (!res.ok) {
      res = await fetch(`https://raw.githubusercontent.com/${username}/${repo}/master/README.md`);
    }

    if (res.ok) {
      const text = await res.text();
      return { source: text, error: null };
    } else {
      return { source: null, error: "No README found for this repository." };
    }
  } catch (error) {
    console.error("Error fetching README:", error);
    return { source: null, error: "Failed to load README." };
  }
}
