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

1. Create a new JSON file in the appropriate directory:
   - `/content/official/` for Caido team-created content
   - `/content/community/{author}/` for community-submitted content, where `{author}` is your name or organization

   Example: `/content/community/john-doe/my-workflow.json`

2. Use the following JSON format:

```json
{
  "title": "Your Resource Title",
  "description": "A brief description of the resource.",
  "format": ["article", "video", "lab"],
  "languages": ["en"],
  "tags": ["tag1", "tag2"],
  "author": "Your Name",
  "url": "https://example.com"
}
```

Required fields:

- `title`: The name of your resource
- `description`: A concise description (1-2 sentences)
- `format`: Array of content types (article, video, lab)
- `languages`: Array of language codes (e.g., "en" for English)
- `tags`: Array of relevant tags for discoverability
- `author`: Your name or organization
- `url`: The URL where the content can be found

3. Submit a pull request with your changes.

## Content Guidelines

- Use lowercase kebab-case for filenames (e.g., `aws-signature-workflow.json`)
- Keep descriptions concise (1-2 sentences)
- Use relevant tags to help with discoverability
- Ensure all external links are valid and accessible
- Follow the JSON formatting guidelines

## Development

This project uses:

- Nuxt 3
- @nuxt/content for content management
- TailwindCSS for styling
- PrimeVue for UI components
- Fuse.js for search functionality

## License

MIT
