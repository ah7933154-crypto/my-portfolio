import React from 'react';
import { Project, Testimonial, Skill } from './types';
import { 
  LuPlane, LuCalculator, LuWallet, LuMap, 
  LuShoppingCart, LuPalette 
} from 'react-icons/lu';
import { VscVscode } from 'react-icons/vsc';
import { 
  SiCplusplus, SiPython, SiOpenjdk, SiJavascript, 
  SiHtml5, SiCss3, SiSqlite, SiReact, 
  SiNextdotjs, SiGithub, SiThreedotjs 
} from 'react-icons/si';

export const projects: Project[] = [
  {
    id: 1,
    title: 'XploreMath',
    description: 'A full-stack, data-driven educational web platform engineered for real-time mathematical operations. Features dynamic asset parsing, secure state management, and optimized mathematical rendering engines for complex user computations.',
    tags: ['React', 'Node.js', 'Express', 'Supabase', 'PostgreSQL', 'Math.js'],
    color: '#22d3ee',
    icon: LuCalculator,
    featured: true,
    github: 'https://github.com/ah7933154-crypto/XploreMath-learning-app',
    demo: 'https://xplore-math-learning-app.vercel.app/',
  },
  {
    id: 2,
    title: 'Commercial E-Commerce Pipeline',
    description: 'Production-grade enterprise storefront interface engineered during a technical software development contract at DevelopersHub Corporation. Developed modular UI components integrated with RESTful endpoints to manage active product cycles and shopping sessions.',
    tags: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'REST APIs', 'Git Workflow'],
    color: '#fb923c',
    icon: LuShoppingCart,
    featured: true,
    github: 'https://github.com/ah7933154-crypto/my_ecommerce_frontend_pages',
    demo: '',
  },
  {
    id: 3,
    title: 'Enterprise Inventory Management System (SamanFlow)',
    description: 'A high-integrity core system built in Java utilizing robust Object-Oriented Programming (OOP) design patterns. Engineered strict business logic validation pipelines to eliminate data race conditions during large-scale commercial asset tracking.',
    tags: ['Java', 'OOP', 'Data Validation', 'Relational Databases', 'System Architecture'],
    color: '#4ade80', // Repurposed your wallet color for this premium asset!
    icon: LuWallet, 
    featured: true,
    github: '#', // Add your SamanFlow repo here when ready!
    demo: '',
  },
  {
    id: 4,
    title: 'High-Concurrency Flight Reservation Engine',
    description: 'A backend architecture simulation designed in C++ optimizing core memory data structures. Features low-latency seat allocation matrices, persistent file storage data streaming, and rigorous edge-case passenger record indexing.',
    tags: ['C++', 'Memory Management', 'Data Structures', 'File I/O Systems'],
    color: '#6e50ff',
    icon: LuPlane,
    featured: false,
    github: 'https://github.com/ah7933154-crypto/Flight-reservation-system-C-.git',
    demo: ""
  },
  {
    id: 5,
    title: 'Autonomous Geospatial Routing Engine',
    description: 'A backend pathfinding application utilizing custom graph data structures to compute optimized travel coordinates. Implemented a strict programmatic adaptation of Dijkstra’s Algorithm to handle real-time spatial node layouts.',
    tags: ['C++', 'Graph Theory', 'Dijkstra Routing', 'Algorithmic Optimization'],
    color: '#f472b6',
    icon: LuMap,
    featured: false,
    github: 'https://github.com/ah7933154-crypto/Islamabad-city-map-c-data-structures-algorithms/',
  },
  {
    id: 6,
    title: 'Interactive 3D Engineering Portfolio',
    description: 'The very software platform you are interacting with. Built utilizing Next.js for server-side optimization, integrated with a Three.js / Framer Motion graphic layer to deliver a highly responsive, modern user layout.',
    tags: ['Next.js', 'Three.js', 'Framer Motion', 'TypeScript', 'Vercel Pipeline'],
    color: '#a78bfa',
    icon: LuPalette,
    github: '#',
    demo: '',
  },
];

export const skills: Skill[] = [
  { name: 'C++', icon: SiCplusplus , category: 'language' },
  { name: 'Python', icon: SiPython , category: 'language' },
  { name: 'Java', icon: SiOpenjdk, category: 'language' },
  { name: 'JavaScript', icon: SiJavascript , category: 'language' },
  { name: 'HTML', icon: SiHtml5 , category: 'language' },
  { name: 'CSS', icon: SiCss3 , category: 'language' },
  { name: 'SQL', icon: SiSqlite , category: 'language' },
  { name: 'React', icon: SiReact , category: 'framework' },
  { name: 'Next.js', icon: SiNextdotjs , category: 'framework' },
  { name: 'VS Code', icon: VscVscode , category: 'tool' },
  { name: 'GitHub', icon: SiGithub , category: 'tool' },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Shehreyar Rashid',
    role: 'Computer Science Professional',
    company: 'FAST-NUCES Islamabad',
    text: 'Ali demonstrated a strong grasp of core computer science principles and a proactive approach to problem-solving in my classes.',
    avatar: 'SR',
    rating: 5,
  },
  {
    id: 2,
    name: 'Dr Hamda Khan',
    role: 'Associate Professor',
    company: 'FAST-NUCES Islamabad',
    text: 'A dedicated student with an impressive ability to translate theoretical concepts into functional, efficient code.',
    avatar: 'HK',
    rating: 5,
  },
  {
    id: 3,
    name: 'Tarhab Abdullah',
    role: 'Collaborative Developer',
    company: 'Project Partner',
    text: 'Working with Ali on our group projects was a great experience; his contributions to the backend logic were crucial to our success.',
    avatar: 'TA',
    rating: 5,
  },
  {
    id: 4,
    name: 'Ibrahim',
    role: 'Full Stack Collaborator',
    company: 'Project Partner',
    text: 'Ali is a reliable teammate who brings great technical insights to our group discussions and development sprints.',
    avatar: 'IB', 
    rating: 5,
  }
];

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];