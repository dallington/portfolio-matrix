import type React from "react";

export interface Challenge {
	title: string;
	description: string;
	solution: string;
}

export interface Project {
	id: string;
	title: string;
	impact: string;
	tags: string[];
	description: string;
	problem: string;
	approach: string;
	challenges?: string; // For minimal layout
	challengesList?: Challenge[]; // For complete layout
	tradeoffs?: string; // For complete layout
	outcome: string[];
	codeSnippet: string;
	metrics: {
		label: string;
		value: string;
	}[];
	layout?: "minimal" | "complete";
}

export interface BlogPost {
	id: string;
	title: string;
	summary: string;
	content?: string; // Optional because we might just link to it
	date: string;
	tags: string[];
	readTime: string;
}

export interface Lab {
	id: string;
	title: string;
	summary: string;
	type: string;
	difficulty: "low" | "medium" | "high";
	tags: string[];
	component: string;
	hypothesis: string;
	findings: string[];
}

export interface Experience {
	company: string;
	role: string;
	period: string;
	description: string[];
	skills: string[];
}

export interface Education {
	degree: string;
	institution: string;
	period: string;
}

export interface Skill {
	name: string;
	level: number; // 0 to 100
	category: "frontend" | "backend" | "devops" | "architecture";
	subcategory?: string;
	icon?: React.ReactNode;
	years?: number;
}

export interface EngineeringPrinciple {
	title: string;
	description: string;
}
