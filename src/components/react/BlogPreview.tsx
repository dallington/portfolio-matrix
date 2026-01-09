import { useStore } from "@nanostores/react";
import { ArrowRight } from "lucide-react";
import React from "react";
import { mode } from "../../store";
import type { BlogPost } from "../../types";
import { PostListItem } from "./PostListItem";

interface BlogPreviewProps {
	posts: BlogPost[];
}

export const BlogPreview = ({ posts }: BlogPreviewProps) => {
	const currentMode = useStore(mode);
	const isDev = currentMode === "dev";

	// Sort is handled in Astro, but we can double check or just map
	// expect posts to be passed in correctly sorted/sliced

	return (
		<section
			id="blog"
			className={`py-24 px-6 ${isDev ? "bg-gray-50 dark:bg-[#0D0D0D]" : "bg-gray-50 dark:bg-[#0A0A0A]"}`}
		>
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16">
					<div>
						{isDev && (
							<div className="text-[var(--accent)] mono mb-4">
								// CRAFT_INSIGHTS
							</div>
						)}
						<h2
							className={`text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter ${!isDev && "normal-case tracking-normal"}`}
						>
							{isDev ? "Thought_Stream" : "Latest Articles"}
						</h2>
					</div>
					<a
						href="/blog"
						className={`font-black uppercase text-sm flex items-center gap-2 hover:opacity-80 transition-opacity ${isDev ? "mono text-[var(--accent)]" : "text-blue-600"}`}
					>
						{isDev ? "FULL_ARCHIVE_VIEW" : "View All Posts"}{" "}
						<ArrowRight size={16} />
					</a>
				</div>
				<div
					className={`border-t pt-8 ${isDev ? "border-gray-200 dark:border-[#1A1A1A]" : "border-gray-200 dark:border-[#1A1A1A]"}`}
				>
					{posts.map((post) => (
						<PostListItem key={post.id} post={post} />
					))}
				</div>
			</div>
		</section>
	);
};
