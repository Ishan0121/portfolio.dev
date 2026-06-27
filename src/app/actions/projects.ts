"use server";

import { fetchGitHubProjects, GitHubFetcherConfig, Project } from "@/lib/github-projects-fetcher";
import { unstable_cache, updateTag } from "next/cache";

export type ProjectCacheMetadata = {
  fingerprint: string;
  repoCount: number;
  latestUpdatedRepo: string;
};

export type SyncResponse = {
  updated: boolean;
  projects?: Project[];
  metadata?: ProjectCacheMetadata;
};

// Wrap the heavy fetch in Next.js Data Cache
const getProjectsFromCache = unstable_cache(
  async (config: GitHubFetcherConfig, metadata: ProjectCacheMetadata) => {
    console.log("[Server Cache Miss] Heavy fetching & formatting projects...");
    const projects = await fetchGitHubProjects(config);
    return { projects, metadata };
  },
  ['github-projects-global-cache'],
  { tags: ['github-projects'] }
);

// Global lock to prevent simultaneous cache regeneration in the same Node process
let regenerationPromise: Promise<{ projects: Project[], metadata: ProjectCacheMetadata }> | null = null;

export async function syncProjects(
  config: GitHubFetcherConfig,
  clientFingerprint: string | null
): Promise<SyncResponse> {
  const { username } = config;
  
  try {
    // 1. Lightweight freshness check (uncached)
    // Fetch profile and latest repo to create a strong fingerprint
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { cache: 'no-store' }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=1&sort=updated`, { cache: 'no-store' })
    ]);

    if (!profileRes.ok || !reposRes.ok) {
      console.error("Failed to verify GitHub freshness");
      return { updated: false };
    }

    const profileData = await profileRes.json();
    const reposData = await reposRes.json();

    const repoCount = profileData.public_repos || 0;
    const latestRepo = reposData[0];
    
    const liveMetadata: ProjectCacheMetadata = {
      fingerprint: `${repoCount}-${latestRepo?.id || 'none'}-${latestRepo?.updated_at || 'none'}`,
      repoCount: repoCount,
      latestUpdatedRepo: latestRepo?.updated_at || "",
    };

    // 2. Compare with Client
    if (clientFingerprint === liveMetadata.fingerprint) {
      return { updated: false };
    }

    // 3. Client is out of date. Check Server Cache.
    let cachedPayload = await getProjectsFromCache(config, liveMetadata);

    // 4. Simultaneous Regeneration Protection / Cache Invalidation
    if (cachedPayload.metadata.fingerprint !== liveMetadata.fingerprint) {
      console.log("Server cache outdated, checking regeneration lock...");
      
      if (!regenerationPromise) {
        regenerationPromise = (async () => {
          console.log("Acquired lock. Invalidating old cache tag...");
          updateTag('github-projects');
          const newPayload = await getProjectsFromCache(config, liveMetadata);
          regenerationPromise = null; // Release lock
          return newPayload;
        })();
      } else {
        console.log("Another request is already regenerating the cache. Waiting...");
      }

      cachedPayload = await regenerationPromise;
    } else {
      console.log("Server cache is already up to date.");
    }

    return {
      updated: true,
      projects: cachedPayload.projects,
      metadata: cachedPayload.metadata
    };
  } catch (error) {
    console.error("Error in syncProjects:", error);
    return { updated: false };
  }
}
