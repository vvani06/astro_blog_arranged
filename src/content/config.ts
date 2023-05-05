import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
		heroImage: z.string().optional(),
		author: z.string().optional(),
	}),
});

const author = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		name: z.string(),
		description: z.string(),
		image: z.string(),
	}),
});

export const collections = { blog, author };
