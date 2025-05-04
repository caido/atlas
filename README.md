# Caido Atlas

A public directory of learning resources related to Caido, helping users explore tutorials, labs, videos, and other educational content.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```

## Contributing Content

To contribute content to Caido Atlas:

1. Create a new Markdown file in the appropriate directory:
   - `/content/official/` for Caido team-created content
   - `/content/community/` for community-submitted content

2. Use the following frontmatter format:

```yaml
---
title: "Your Resource Title"
description: "A brief description of the resource."
format: [article, video, lab]
language: ["en"]
tags: [tag1, tag2]
source: https://example.com
author: "Your Name"
platform: "Platform Name" # Optional
---
```

3. If the content is hosted externally, leave the body empty. If you're providing the content directly, write it in Markdown format below the frontmatter.

4. Submit a pull request with your changes.

## Content Guidelines

- Use lowercase kebab-case for filenames (e.g., `httpql-guide.md`)
- Keep descriptions concise (1-2 sentences)
- Use relevant tags to help with discoverability
- Ensure all external links are valid and accessible
- Follow the Markdown formatting guidelines

## Development

This project uses:
- Nuxt 3
- @nuxt/content for content management
- TailwindCSS for styling
- PrimeVue for UI components
- Fuse.js for search functionality

## License

MIT
