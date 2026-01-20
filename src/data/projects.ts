import type { Project } from "@/types";

export const HERO_PROJECTS: Project[] = [
  {
    id: 'b2b-perf',
    category: 'showcase',
    layout: 'complete',
    title: 'B2B E-commerce Performance Overhaul',
    impact: 'Conversion rate increased by 23% via Core Web Vitals optimization',
    tags: ['Performance', 'PHP', 'JavaScript', 'Lighthouse'],
    description: 'A high-impact performance strategy for a large-scale B2B platform handling thousands of daily transactions and $2,500+ average order values.',
    problem: 'A large-scale B2B e-commerce platform was hemorrhaging conversions due to performance issues. Despite handling thousands of daily transactions, the frontend was legacy PHP server-side rendering with poor Core Web Vitals (Desktop: 60%, Mobile: 40%). Slow pages were leaving millions on the table.',
    approach: 'Progressive Enhancement Within Constraints. Since a full rewrite wasn\'t an option, we implemented a multi-layered optimization strategy: Critical CSS extraction, aggressive WebP conversion, and deferred JS loading.',
    challengesList: [
      {
        title: 'Legacy PHP SSR Constraints',
        description: 'Most modern optimization guides assume a SPA framework. We had traditional page loads with PHP templating.',
        solution: 'Inlined critical path CSS (extracted with PurgeCSS), preloaded key resources, and minimized render-blocking scripts at the template level.'
      },
      {
        title: 'Blocking Third-Party Scripts',
        description: 'The site had 12 integrations (analytics, chat, A/B testing) all loading synchronously.',
        solution: 'Implemented a requestIdleCallback wrapper to defer all non-critical scripts until the main thread was free.'
      },
      {
        title: 'Mobile on 4G Performance',
        description: 'Desktop improvements were easier, but mobile remained unstable on slow connections.',
        solution: 'Implemented adaptive loading via Network Information API to serve lower-res assets on slow connections and lazy-loaded product grids.'
      }
    ],
    tradeoffs: 'We sacrificed fancy parallax animations and auto-playing videos to prioritize TTI. Performance was chosen over "flashy" features to stabilize the revenue funnel.',
    outcome: [
      'Desktop Lighthouse: 60% → 90%',
      'Mobile Lighthouse: 40% → 85%',
      'Conversion rate increased by 23% (2.1% → 2.6%)',
      'Estimated revenue impact: $840K annually'
    ],
    codeSnippet: `// Performance optimization hook snippet...`,
    metrics: [
      { label: 'Lighthouse', value: '90/100' },
      { label: 'Conv. Lift', value: '+23%' },
      { label: 'Rev. Impact', value: '$840k' }
    ]
  },
  {
    id: 'atomic-ui-showcase',
    category: 'showcase',
    layout: 'complete',
    title: 'Atomic UI 2.0 Design System',
    impact: 'Reduced frontend development time by 60% across 12 product teams',
    tags: ['React', 'TypeScript', 'Tailwind', 'A11y'],
    description: 'An enterprise-grade design system focused on accessibility, performance, and developer experience.',
    problem: 'Multiple teams were creating inconsistent UI components, leading to brand drift and accessibility issues.',
    approach: 'Built a headless-first component library using Radix UI and Tailwind CSS with strict TypeScript definitions.',
    outcome: [
      'Successfully adopted by 12 internal products',
      '100% WCAG 2.1 AA Compliance across core components',
      'Zero production bugs in core layout engine for 18 months'
    ],
    codeSnippet: `// Tailored theme configuration...`,
    metrics: [
      { label: 'A11y Score', value: '100/100' },
      { label: 'Adoption', value: '12 Teams' },
      { label: 'Speed Lift', value: '60%' }
    ]
  },
  {
    id: 'pulse-task',
    category: 'in-progress',
    status: 'Developing',
    progress: 65,
    updatedAt: '2 days ago',
    changelog: [
      'Implemented gRPC stream for real-time log tailing',
      'Added circuit breaker pattern to external API calls',
      'Refined worker healthcheck heartbeat interval'
    ],
    title: 'Pulse: Distributed Task Queue',
    impact: 'Targeting 10k jobs/sec with exactly-once delivery',
    tags: ['Go', 'Redis', 'Protobuf', 'gRPC'],
    description: 'A high-performance, fault-tolerant job queue system for orchestrating complex background workflows across microservices.',
    problem: 'Current polling mechanisms are hitting database lock contention.',
    approach: 'Moving to a Pub/Sub model using Redis Streams and gRPC for bidirectional worker communication.',
    outcome: ['Alpha testing shows 3x throughput increase'],
    codeSnippet: `// gRPC worker stream definition...`,
    metrics: [
      { label: 'Latency', value: '<5ms' },
      { label: 'Throughput', value: '10k/s' },
      { label: 'Stability', value: '99.9%' }
    ]
  },
  {
    id: 'refactor-monolith',
    category: 'in-progress',
    status: 'Refactoring',
    progress: 40,
    updatedAt: '6 hours ago',
    changelog: [
      'Separated Auth module into independent service',
      'Decoupled shared database into per-service schemas',
      'Established event-driven sync via RabbitMQ'
    ],
    title: 'Project Phoenix: Monolith Decoupling',
    impact: 'Migrating legacy PHP monolith to Node/Go microservices',
    tags: ['Architecture', 'Migration', 'Docker'],
    description: 'A strategic extraction of critical services from a 10-year-old monolithic application into a modern microservices architecture.',
    problem: 'Monolith deployment takes 45 minutes and is highly fragile.',
    approach: 'Strangler Fig pattern to gradually replace functionality with standalone services.',
    outcome: ['Auth service deployment reduced to 3 minutes'],
    codeSnippet: `// Gateway routing logic...`,
    metrics: [
      { label: 'Deploy Time', value: '-90%' },
      { label: 'Service Count', value: '3/12' },
      { label: 'Uptime', value: '99.99%' }
    ]
  },
  {
    id: 'legacy-viz',
    category: 'archived',
    title: 'CanvasFlow 1.0',
    impact: 'Legacy real-time collaboration engine',
    tags: ['JavaScript', 'Canvas', 'WebSockets'],
    description: 'An early experiment in high-performance browser rendering for collaborative whiteboarding.',
    problem: 'DOM-based rendering struggled with 500+ concurrent objects.',
    approach: 'Custom Canvas 2D engine with spatial indexing for fast collision detection.',
    outcome: ['Handled 2000+ objects at 60fps'],
    codeSnippet: `// Quadtree spatial indexing logic...`,
    metrics: [
      { label: 'FPS', value: '60' },
      { label: 'Objects', value: '2k+' },
      { label: 'Year', value: '2019' }
    ],
    githubUrl: 'https://github.com/dallington/canvasflow-legacy',
    liveUrl: 'https://archive.dallington.dev/canvasflow',
    year: '2019'
  },
  {
    id: 'old-chat-app',
    category: 'archived',
    title: 'Reactive Chat',
    impact: 'Pioneering WebSocket implementation',
    tags: ['React', 'Socket.io', 'Node.js'],
    description: 'One of the first multi-room chat applications built during the early days of React hooks.',
    problem: 'Real-time state synchronization was complex before modern state management.',
    approach: 'Context API and custom hook-based WebSocket management.',
    outcome: ['Supported 500 concurrent connections'],
    codeSnippet: `// useSocket hook implementation...`,
    metrics: [
      { label: 'Year', value: '2018' },
      { label: 'Stack', value: 'React v16' },
      { label: 'Rating', value: '4.8/5' }
    ],
    githubUrl: 'https://github.com/dallington/reactive-chat',
    year: '2018'
  }
];
