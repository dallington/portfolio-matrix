import React from 'react';
import { 
  Terminal, 
  Cpu, 
  Code2, 
  FlaskConical, 
  Zap, 
  Box,
  Search,
  Clock,
  Calendar,
  ChevronLeft,
  Share2,
  Bookmark,
  ExternalLink,
  List,
  Coffee,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
  BarChart4,
  Layers,
  Target,
  Trophy,
  Monitor,
  User,
  Database
} from 'lucide-react';
import type { Skill, EngineeringPrinciple, Experience, Education } from './types';

export const Icons = {
  TypeScript: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-.814-.142 6.25 6.25 0 0 0-.815-.053c-.676 0-1.175.101-1.498.303-.323.202-.484.53-.484.983 0 .355.112.623.337.803.224.18.527.346.907.496.38.15.819.297 1.316.441.497.144.991.336 1.481.573.49.238.91.562 1.261.973.35.411.526.971.526 1.682 0 .712-.196 1.291-.589 1.738-.393.447-.92.775-1.58.985-.66.21-1.403.314-2.228.314-.766 0-1.453-.08-2.062-.238a7.14 7.14 0 0 1-1.635-.615v-2.531c.42.333.896.589 1.428.77.532.181 1.1.271 1.706.271.745 0 1.284-.117 1.616-.352.333-.234.499-.597.499-1.087 0-.39-.1-.683-.3-.88-.2-.197-.478-.363-.834-.496-.355-.133-.767-.26-1.236-.381a13.31 13.31 0 0 1-1.44-.457c-.47-.184-.877-.453-1.221-.806-.345-.353-.517-.83-.517-1.431 0-.683.18-1.231.54-1.646.36-.414.86-.713 1.499-.895.639-.182 1.378-.273 2.217-.273zm-10.43 0h7.662v2.164h-2.59v10.32H10.66v-10.32h-2.6V9.75z"/></svg>
  ),
  React: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 11.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zM24 12c0 1.053-.538 2.053-1.444 2.87-1.157 1.037-2.825 1.79-4.73 2.164-1.875.367-3.953.51-6.101.396a20.444 20.444 0 0 1-2.906-.395c-1.921-.368-3.626-1.123-4.81-2.163C3.125 14.053 2.6 13.053 2.6 12c0-1.053.525-2.053 1.41-2.87 1.184-1.04 2.889-1.795 4.81-2.163a20.444 20.444 0 0 1 2.906-.396c2.148-.113 4.226.03 6.101.396 1.905.374 3.573 1.127 4.73 2.164C23.462 9.947 24 10.947 24 12zm-3.136 0c0-.528-.316-1.02-.916-1.503-.943-.762-2.316-1.373-3.94-1.737-1.616-.36-3.418-.49-5.267-.367a18.237 18.237 0 0 0-2.457.367c-1.648.293-3.078.913-4.062 1.696-.644.512-.996 1.026-.996 1.544 0 .518.352 1.032.996 1.544.984.783 2.414 1.403 4.062 1.696a18.237 18.237 0 0 0 2.457.367c1.85.123 3.651-.007 5.267-.367 1.624-.364 2.997-.975 3.94-1.737.6-.483.916-.975.916-1.503z"/></svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C10.337,13.382,8.976,12,6.001,12z"/></svg>
  ),
  Node: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0L3.5 4.9v10.2L12 20l8.5-4.9V4.9L12 0zm6.5 14.1l-6.5 3.8-6.5-3.8V5.9l6.5-3.8 6.5 3.8v8.2z"/></svg>
  ),
  Database: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2c4.418 0 8 1.119 8 2.5s-3.582 2.5-8 2.5-8-1.119-8-2.5 3.582-2.5 8-2.5zm0 17.5c-4.418 0-8-1.119-8-2.5v-2.529c1.664 1.151 4.67 1.862 8 1.862s6.336-.711 8-1.862v2.529c0 1.381-3.582 2.5-8 2.5zm0-5c-4.418 0-8-1.119-8-2.5v-2.529c1.664 1.151 4.67 1.862 8 1.862s6.336-.711 8-1.862v2.529c0 1.381-3.582 2.5-8 2.5zm0-5c-4.418 0-8-1.119-8-2.5v-2.529c1.664 1.151 4.67 1.862 8 1.862s6.336-.711 8-1.862v2.529c0 1.381-3.582 2.5-8 2.5z"/></svg>
  ),
  Cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M17.5 19a5.5 5.5 0 0 0 1-10.9A7.5 7.5 0 0 0 4 11.5A4.5 4.5 0 0 0 4.5 20h11a.5.5 0 0 0 .5-.5z"/></svg>
  ),
  Redis: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 1L3 5.5V18.5L12 23L21 18.5V5.5L12 1ZM19 17.1L12 20.6L5 17.1V6.9L12 3.4L19 6.9V17.1Z"/></svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M13.962 8.893c0-.303.247-.55.55-.55h2.251c.302 0 .55.247.55.55v2.251c0 .302-.248.55-.55.55h-2.251c-.303 0-.55-.248-.55-.55V8.893zm-3.376 0c0-.303.247-.55.55-.55h2.251c.303 0 .55.247.55.55v2.251c0 .302-.247.55-.55.55H11.136c-.303 0-.55-.248-.55-.55V8.893zm-3.376 0c0-.303.247-.55.55-.55h2.251c.303 0 .55.247.55.55v2.251c0 .302-.247.55-.55.55H7.76c-.303 0-.55-.248-.55-.55V8.893zm-3.376 0c0-.303.247-.55.55-.55h2.251c.303 0 .55.247.55.55v2.251c0 .302-.247.55-.55.55H4.384c-.303 0-.55-.248-.55-.55V8.893z"/></svg>
  ),
  PHP: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.8 5.7c.3-.1.6-.1.8 0 .2.1.4.3.5.5l.6 1.7c.2.6.4 1.1.7 1.6.3.5.7.9 1.1 1.2.4.3.9.5 1.5.7l1.7.5c.3.1.5.3.6.5.1.2.1.5 0 .7-.1.2-.3.4-.5.5l-1.7.6c-.6.2-1.1.4-1.6.7-.5.3-.9.7-1.2 1.1-.3.4-.5.9-.7 1.5l-.5 1.7c-.1.3-.3.5-.5.6-.2.1-.5.1-.7 0-.2-.1-.4-.3-.5-.5l-.6-1.7c-.2-.6-.4-1.1-.7-1.6-.3-.5-.7-.9-1.1-1.2-.4-.3-.9-.5-1.5-.7l-1.7-.5c-.3-.1-.5-.3-.6-.5-.1-.2-.1-.5 0-.7.1-.2.3-.4.5-.5l1.7-.6c.6-.2 1.1-.4 1.6-.7.5-.3.9-.7 1.2-1.1.3-.4.5-.9.7-1.5l.6-1.7c0-.2.2-.4.4-.5z"/></svg>
  ),
  Laravel: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.2 17.5c-.7 0-1.4-.2-1.9-.7l-4.5-5c-.4-.5-.4-1.2 0-1.7l4.5-5c.6-.6 1.4-.8 2.2-.5 1.1.3 1.7 1.5 1.3 2.6l-2.4 2.8 2.4 2.8c.4 1.1-.2 2.3-1.3 2.6-.1.1-.2.1-.3.1zm7.6 0c-.1 0-.2 0-.3-.1-1.1-.3-1.7-1.5-1.3-2.6l2.4-2.8-2.4-2.8c-.4-1.1.2-2.3 1.3-2.6.8-.3 1.6 0 2.2.5l4.5 5c.4.5.4 1.2 0 1.7l-4.5 5c-.7.5-1.4.7-1.9.7z"/></svg>
  ),
  Vue: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M2,3H5.5L12,15L18.5,3H22L12,21L2,3M6.5,3H9.5L12,7.58L14.5,3H17.5L12,13.08L6.5,3Z" /></svg>
  ),
  Nuxt: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M2.5 19H21C21.6 19 22 18.6 22 18V6C22 5.4 21.6 5 21 5H2.5C1.9 5 1.5 5.4 1.5 6V18C1.5 18.6 1.9 19 2.5 19Z" /></svg>
  ),
  Astro: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.9 20h2.7l.9-1.3c.7-1 1.7-1.7 2.8-2h1.3L15.4 7c-.6-1.2-2.2-1.2-2.8 0L7.4 16.7h1.3c1.1.3 2.1 1 2.8 2l.9 1.3h2.7L22 4H2l10.9 16z"/></svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
  ),
  MySQL: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2h-4zM4 5h16v11H4V5z"/></svg>
  ),
  ReactNative: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 21.6c-2.4 0-4.6-.8-6.4-2.2-.6-.5-.5-1.3.1-1.7.5-.4 1.3-.4 1.8 0 1.4 1.1 3.1 1.7 5 1.7s3.6-.6 5-1.7c.5-.4 1.3-.4 1.8 0 .6.4.7 1.2.1 1.7-1.8 1.4-4 2.2-6.4 2.2zM12 2.4c2.4 0 4.6.8 6.4 2.2.6.5.5 1.3-.1 1.7-.5.4-1.3.4-1.8 0-1.4-1.1-3.1-1.7-5-1.7s-3.6.6-5 1.7c-.5.4-1.3.4-1.8 0-.6-.4-.7-1.2-.1-1.7C6.4 3.2 9.6 2.4 12 2.4zM2.4 12c0-2.4.8-4.6 2.2-6.4.5-.6 1.3-.5 1.7.1.4.5.4 1.3 0 1.8-1.1 1.4-1.7 3.1-1.7 5s.6 3.6 1.7 5c.4.5.4 1.3 0 1.8-.6.6-1.2.7-1.7.1-1.4-1.8-2.2-4-2.2-6.4zM21.6 12c0 2.4-.8 4.6-2.2 6.4-.5.6-1.3.5-1.7-.1-.4-.5-.4-1.3 0-1.8 1.1-1.4 1.7-3.1 1.7-5s-.6-3.6-1.7-5c-.4-.5-.4-1.3 0-1.8.6-.6 1.2-.7 1.7-.1 1.4 1.8 2.2 4 2.2 6.4zM12 6c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z"/></svg>
  ),
  CICD: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M6 9a6 6 0 1 0 12 0A6 6 0 0 0 6 9v8a6 6 0 1 0 12 0A6 6 0 0 0 6 17Z"/><path d="M12 3v18"/></svg>
  )
};

export const RESUME_SUMMARY = "Senior Fullstack Engineer with a decade of experience building end-to-end systems. Expert in architecting high-frequency event-driven backends and ultra-responsive frontend layers that communicate via robust, type-safe protocols.";

export const PROFESSIONAL_EXPERIENCE: Experience[] = [
  {
    company: "TechFlow Solutions",
    role: "Senior Fullstack Engineer",
    period: "2020 - Present",
    description: [
      "Built a real-time analytics pipeline processing 1M+ events/min using Node.js, Redis, and WebSockets.",
      "Optimized a complex React dashboard reducing TTI by 45% through aggressive code-splitting and state-management overhaul.",
      "Architected an event-driven task queue system that replaced legacy Cron jobs, reducing processing latency by 80%.",
      "Lead a team of 6 engineers across the full stack, establishing CI/CD best practices and end-to-end testing strategies."
    ],
    skills: ["Node.js", "React", "Redis", "WebSockets", "TypeScript", "PostgreSQL"]
  },
  {
    company: "ScaleGrid Systems",
    role: "Backend-Focused Fullstack Developer",
    period: "2017 - 2020",
    description: [
      "Designed and implemented a distributed messaging system handling multi-tenant data synchronization.",
      "Developed a custom design system in React used by 3 separate high-traffic SaaS products.",
      "Migrated legacy monolithic architecture to containerized microservices (Docker), improving deployment frequency by 3x."
    ],
    skills: ["Go", "Docker", "Node.js", "React", "MongoDB", "RabbitMQ"]
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    degree: "B.Sc. in Computer Science",
    institution: "University of Technology",
    period: "2011 - 2015"
  }
];

export const SKILLS: Skill[] = [
  // Fullstack & Systems
  { name: 'Node.js', level: 98, category: 'backend', subcategory: 'NestJS / Express / Hono', years: 10, icon: Icons.Node },
  { name: 'PHP / Laravel', level: 95, category: 'backend', subcategory: 'Enterprise Architectures', years: 8, icon: Icons.Laravel },
  
  // Frontend & UI
  { name: 'React / Next.js', level: 98, category: 'frontend', subcategory: 'Server Components & State', years: 9, icon: Icons.React },
  { name: 'React Native', level: 94, category: 'frontend', subcategory: 'Mobile Cross-Platform', years: 5, icon: Icons.ReactNative },
  { name: 'Vue / Nuxt', level: 92, category: 'frontend', subcategory: 'Reactive Interfaces', years: 6, icon: Icons.Vue },
  { name: 'Astro', level: 90, category: 'frontend', subcategory: 'Islands Architecture', years: 3, icon: Icons.Astro },
  { name: 'Tailwind CSS', level: 96, category: 'frontend', subcategory: 'Design Systems', years: 6, icon: Icons.Tailwind },
  
  // Data & Infrastructure
  { name: 'SQL (Postgres/MySQL)', level: 94, category: 'backend', subcategory: 'Schema & Optimization', years: 9, icon: Icons.Database },
  { name: 'NoSQL (MongoDB)', level: 90, category: 'backend', subcategory: 'Document Stores', years: 7, icon: Icons.MongoDB },
  
  // DevOps & Cloud
  { name: 'Docker / K8s', level: 88, category: 'devops', subcategory: 'Containerization', years: 6, icon: Icons.Docker },
  { name: 'CI/CD Pipelines', level: 92, category: 'devops', subcategory: 'GitHub Actions / CircleCI', years: 6, icon: Icons.CICD },
  { name: 'AWS / Vercel', level: 88, category: 'devops', subcategory: 'Cloud Architecture', years: 7, icon: Icons.Cloud },
];

export const PRINCIPLES: EngineeringPrinciple[] = [
  {
    title: 'The Full-stack Loop',
    description: 'A great product is a conversation between a snappy UI and a predictable API. I optimize the entire loop, not just half of it.'
  },
  {
    title: 'Messaging is the Backbone',
    description: 'In modern systems, how services talk to each other defines their success. I build event-driven architectures that fail gracefully and scale horizontally.'
  },
  {
    title: 'Types are Documentation',
    description: 'I use TypeScript as a bridge between frontend and backend, ensuring that our data structures are contracts that never lie.'
  }
];
