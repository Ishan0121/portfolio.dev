
# Project Metadata (.project.yml) Integration — Implementation Plan

## Goal

Add optional repository-level metadata support without breaking the existing server-side GitHub fetching and caching architecture.

The GitHub API fetching must remain entirely server-side.

The client should only receive the final formatted project payload from the server cache.

The purpose of `.project.yml` is to provide project information that GitHub cannot know, such as:
- custom live deployment URL (Vercel, custom domains, etc.)
- custom preview image
- custom stack
- custom description
- featured/status flags

---

# Architecture

## Current Flow

Client
→ Server Action
→ Server cache check
→ GitHub fetch only when required
→ Format projects
→ Store cache
→ Return formatted data


## New Flow

Client
→ Server Action
→ Server cache check
→ GitHub freshness check
→ If cache is valid:
    return cached formatted projects

→ If regeneration required:
    fetch repository data
    fetch optional `.project.yml` metadata
    merge metadata
    validate metadata
    generate final project objects
    update server cache
    return formatted projects


---

# Metadata Fetching Rules

## Important

Do NOT create a separate existence check for `.project.yml`.

Avoid:

1. Check if `.project.yml` exists
2. Fetch `.project.yml`

This creates unnecessary GitHub API calls.

Instead:

During cache regeneration:
- Attempt to fetch `.project.yml` directly.
- If found:
    parse and use it.
- If missing:
    ignore and fallback to GitHub data.

A missing file should be treated as normal.

---

# Metadata Priority

The final project data should follow this priority:

1. Valid `.project.yml`
2. GitHub repository data
3. Existing fallback behavior


Example:

If `.project.yml` contains:

```yaml
links:
  live: https://example.vercel.app
````

Use it.

If `.project.yml` is missing:

Use existing GitHub detection.

If both have no live URL:

Do not show the live button.

---

# Validation

Use the existing Zod dependency.

Create a schema for `.project.yml`.

The schema should support:

```yaml
name:
description:

preview:

links:
  live:
  github:

stack:

featured:

status:
```

All fields should be optional.

Invalid cases:

* invalid YAML
* wrong field types
* malformed structure

should never break fetching.

If validation fails:

* ignore metadata
* fallback to GitHub data

---

# Cache Integration

The server cache must store only the final resolved project object.

Do not cache:

* raw GitHub responses
* raw YAML
* intermediate processing data

The cache should contain:

```ts
{
 projects: [
   {
     name,
     description,
     image,
     githubUrl,
     liveUrl,
     stack,
     featured,
     status
   }
 ]
}
```

---

# Reduce Future API Usage

When cache regeneration happens:

Store metadata state internally.

Example:

```ts
{
 repoName: {
   hasProjectMetadata: true/false
 }
}
```

Use this information to avoid repeatedly checking repositories that previously had no `.project.yml`.

Only re-check metadata when that repository has changed.

---

# Preview Image Handling

If:

```yaml
preview: preview.png
```

exists:

Generate the raw GitHub URL using:

* repository owner
* repository name
* repository default branch

Do not assume `main`.

If preview metadata is missing:
use existing preview fallback behavior.

---

# Expected Result

The system should support:

Normal GitHub repositories:

* automatic project detection

Custom repositories:

* `.project.yml` controls metadata

Deployment platforms:

* GitHub Pages
* Vercel
* custom domains

while maintaining:

* server-side fetching
* shared cache
* minimal GitHub API usage
* minimal server data transfer
* instant client rendering
