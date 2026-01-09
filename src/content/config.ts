import { defineCollection, z } from "astro:content";

const posts = defineCollection({
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		date: z.string(), // YYYY-MM-DD
		tags: z.array(z.string()),
		readTime: z.string(),
	}),
});

const projects = defineCollection({
	schema: z.object({
		title: z.string(),
		impact: z.string(),
		tags: z.array(z.string()),
		description: z.string(),
		problem: z.string(),
		approach: z.string(),
		challengesList: z
			.array(
				z.object({
					title: z.string(),
					description: z.string(),
					solution: z.string(),
				}),
			)
			.optional(),
		tradeoffs: z.string().optional(),
		outcome: z.array(z.string()),
		codeSnippet: z.string().optional(),
		metrics: z.array(
			z.object({
				label: z.string(),
				value: z.string(),
			}),
		),
		projectLayout: z
			.enum(["simple", "extended", "complete", "minimal"])
			.default("simple"),
	}),
});

const labs = defineCollection({
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		type: z.string(),
		difficulty: z.enum(["low", "medium", "high"]),
		tags: z.array(z.string()),
		component: z.string(),
		hypothesis: z.string(),
		findings: z.array(z.string()),
	}),
});

export const collections = { posts, projects, labs };
