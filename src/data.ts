/**
 * SkillBridge - Student Skill Gap Analyzer
 * Benchmark Data, Questions Bank, and Career Roles
 */

import { CareerRole, AssessmentQuestion, SkillItem, Recommendation } from './types';

export const INITIAL_SKILLS: SkillItem[] = [
    { id: 'html', name: 'HTML5 & Web Standards', category: 'technical', currentLevel: 80, targetLevel: 90 },
    { id: 'css', name: 'CSS3, Flexbox & Grid', category: 'technical', currentLevel: 65, targetLevel: 85 },
    { id: 'javascript', name: 'JavaScript & ES6+', category: 'technical', currentLevel: 60, targetLevel: 85 },
    { id: 'typescript', name: 'TypeScript & Type Safety', category: 'technical', currentLevel: 40, targetLevel: 80 },
    { id: 'tailwind', name: 'Tailwind CSS & Utility-First Styling', category: 'technical', currentLevel: 55, targetLevel: 80 },
    { id: 'python', name: 'Python Programming', category: 'technical', currentLevel: 45, targetLevel: 75 },
    { id: 'git', name: 'Git & GitHub Version Control', category: 'technical', currentLevel: 50, targetLevel: 80 },
    { id: 'communication', name: 'Effective Verbal & Written Communication', category: 'soft', currentLevel: 70, targetLevel: 85 },
    { id: 'teamwork', name: 'Team Collaboration & Empathy', category: 'soft', currentLevel: 75, targetLevel: 85 },
    { id: 'time_management', name: 'Time Management & Organization', category: 'soft', currentLevel: 60, targetLevel: 80 },
    { id: 'problem_solving', name: 'Problem Solving & Algorithmic Thinking', category: 'professional', currentLevel: 55, targetLevel: 85 },
    { id: 'project_delivery', name: 'Project Planning & Agile Practices', category: 'professional', currentLevel: 50, targetLevel: 75 }
];

export const CAREER_ROLES: CareerRole[] = [
    {
        id: 'frontend_dev',
        title: 'Frontend Developer',
        description: 'Designs and builds interactive, responsive web user interfaces using modern web technologies.',
        requiredSkills: {
            html: 90,
            css: 85,
            javascript: 85,
            typescript: 80,
            tailwind: 85,
            git: 80,
            problem_solving: 80,
            communication: 75,
            teamwork: 80
        }
    },
    {
        id: 'fullstack_dev',
        title: 'Full-Stack Developer',
        description: 'Builds end-to-end applications spanning user interfaces, backend APIs, and database structures.',
        requiredSkills: {
            html: 85,
            css: 80,
            javascript: 90,
            typescript: 85,
            tailwind: 75,
            python: 80,
            git: 85,
            problem_solving: 85,
            project_delivery: 80
        }
    },
    {
        id: 'data_scientist',
        title: 'Data & AI Analyst',
        description: 'Analyzes structured/unstructured datasets, builds predictive models, and extracts actionable insights.',
        requiredSkills: {
            python: 90,
            problem_solving: 90,
            git: 75,
            communication: 85,
            time_management: 80,
            project_delivery: 75
        }
    },
    {
        id: 'software_engineer',
        title: 'General Software Engineer',
        description: 'Engineers robust software solutions, scalable architecture, and reliable system algorithms.',
        requiredSkills: {
            javascript: 80,
            typescript: 80,
            python: 80,
            problem_solving: 90,
            git: 85,
            teamwork: 85,
            project_delivery: 80
        }
    }
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
    // Technical questions
    {
        id: 'q_js',
        category: 'technical',
        skillId: 'javascript',
        question: 'How comfortably do you work with modern JavaScript (ES6+, Promises, Async/Await)?',
        options: [
            { text: 'I am just starting out with basic syntax and loops', score: 30 },
            { text: 'I can manipulate the DOM and fetch APIs with some guidance', score: 60 },
            { text: 'I comfortably use closures, async/await, and array methods', score: 85 },
            { text: 'Advanced: I understand event loop, prototypes, and performance profiling', score: 100 }
        ]
    },
    {
        id: 'q_ts',
        category: 'technical',
        skillId: 'typescript',
        question: 'What is your experience level with TypeScript & static typing?',
        options: [
            { text: 'Never used TypeScript before', score: 10 },
            { text: 'Basic interfaces and primitives (string, number, boolean)', score: 45 },
            { text: 'Generics, union types, type guards, and configuring tsconfig', score: 80 },
            { text: 'Advanced conditional types, mapped types, and strict type design', score: 95 }
        ]
    },
    {
        id: 'q_css_tw',
        category: 'technical',
        skillId: 'tailwind',
        question: 'How do you approach modern styling (CSS Grid, Flexbox, Tailwind CSS)?',
        options: [
            { text: 'I struggle with layouts and positioning elements', score: 25 },
            { text: 'I use basic regular CSS styles and standard margin/padding', score: 55 },
            { text: 'I build fluid responsive layouts with Tailwind utility classes & CSS Flex/Grid', score: 85 },
            { text: 'I design design-systems, responsive themes, custom plugins and animations', score: 100 }
        ]
    },
    {
        id: 'q_git',
        category: 'technical',
        skillId: 'git',
        question: 'How do you handle source code control and Git workflows?',
        options: [
            { text: 'I upload zip files or only know git clone', score: 20 },
            { text: 'I use git add, commit, push, and pull on main branch', score: 50 },
            { text: 'I create feature branches, handle pull requests, and resolve basic merge conflicts', score: 80 },
            { text: 'I manage rebasing, cherry-picking, interactive workflows, and CI/CD pipelines', score: 95 }
        ]
    },
    // Soft skills
    {
        id: 'q_comm',
        category: 'soft',
        skillId: 'communication',
        question: 'How do you explain technical obstacles or proposals to teammates or non-technical peers?',
        options: [
            { text: 'I find it challenging to explain technical concepts simply', score: 30 },
            { text: 'I can communicate my points with some preparation and diagrams', score: 65 },
            { text: 'I write clear documentation and communicate technical decisions effectively', score: 85 },
            { text: 'I easily tailor technical presentations to any executive or peer audience', score: 95 }
        ]
    },
    {
        id: 'q_team',
        category: 'soft',
        skillId: 'teamwork',
        question: 'When a teammate has a differing approach or review feedback, how do you respond?',
        options: [
            { text: 'I feel defensive or reluctant to change my code', score: 35 },
            { text: 'I accept feedback but sometimes feel uncertain about tradeoffs', score: 65 },
            { text: 'I welcome code reviews, discuss tradeoffs objectively, and support teammates', score: 90 },
            { text: 'I mentor peers, build consensus, and foster collaborative team culture', score: 100 }
        ]
    },
    // Professional skills
    {
        id: 'q_prob',
        category: 'professional',
        skillId: 'problem_solving',
        question: 'When encountering an unfamiliar bug or requirement, how do you proceed?',
        options: [
            { text: 'I get stuck easily and randomly try code snippets', score: 30 },
            { text: 'I search stack overflow and console log until something works', score: 60 },
            { text: 'I break the problem into smaller testable units, read docs, and isolate root causes', score: 85 },
            { text: 'I construct systematic test reproductions, profile bottlenecks, and architect clean solutions', score: 95 }
        ]
    },
    {
        id: 'q_agile',
        category: 'professional',
        skillId: 'project_delivery',
        question: 'How do you organize your project tasks, milestones, and deadlines?',
        options: [
            { text: 'I work with no clear schedule and often scramble before deadlines', score: 25 },
            { text: 'I use simple to-do lists to keep track of tasks', score: 60 },
            { text: 'I break features into milestones, estimate effort, and prioritize deliverables', score: 85 },
            { text: 'I run structured sprints, manage backlogs, track velocity, and ship on time', score: 95 }
        ]
    }
];

export const RECOMMENDATIONS_LIBRARY: Recommendation[] = [
    {
        id: 'rec_ts',
        title: 'Master Modern TypeScript & Type Safety',
        skillName: 'TypeScript',
        category: 'technical',
        type: 'course',
        description: 'Understand interfaces, generics, union types, and strict mode compiler options.',
        url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
        platform: 'Official TypeScript Handbook'
    },
    {
        id: 'rec_tailwind',
        title: 'Modern Responsive Design with Tailwind CSS',
        skillName: 'Tailwind CSS',
        category: 'technical',
        type: 'course',
        description: 'Speed up UI development with utility-first classes, dark mode, responsive breakpoints and animations.',
        url: 'https://tailwindcss.com/docs',
        platform: 'Tailwind CSS Documentation'
    },
    {
        id: 'rec_js',
        title: 'JavaScript: The Hard Parts & Asynchronous Patterns',
        skillName: 'JavaScript',
        category: 'technical',
        type: 'practice',
        description: 'Deep dive into event loop, closures, microtask queues, and modern ES2024 features.',
        url: 'https://javascript.info/',
        platform: 'The Modern JavaScript Tutorial'
    },
    {
        id: 'rec_git',
        title: 'Git Version Control & Open Source Collaboration',
        skillName: 'Git',
        category: 'technical',
        type: 'project',
        description: 'Practice branching strategies, pull requests, conventional commits, and merge conflict resolution.',
        url: 'https://learngitbranching.js.org/',
        platform: 'Learn Git Branching Interactive'
    },
    {
        id: 'rec_python',
        title: 'Python for Data Structures & Problem Solving',
        skillName: 'Python',
        category: 'technical',
        type: 'course',
        description: 'Strengthen core programming concepts, data structures, and automation scripting.',
        url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
        platform: 'freeCodeCamp'
    },
    {
        id: 'rec_comm',
        title: 'Tech Communication & Collaborative Code Reviews',
        skillName: 'Communication',
        category: 'soft',
        type: 'practice',
        description: 'Learn constructive pull request reviews, clear RFC writing, and technical presentation skills.',
        url: 'https://www.coursera.org/learn/effective-communication-for-engineers',
        platform: 'Coursera'
    },
    {
        id: 'rec_problem',
        title: 'Algorithmic Thinking & Systematic Debugging',
        skillName: 'Problem Solving',
        category: 'professional',
        type: 'practice',
        description: 'Tackle structured computational problems and learn step-by-step root-cause analysis.',
        url: 'https://leetcode.com/explore/',
        platform: 'LeetCode / HackerRank'
    }
];
