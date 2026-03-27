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
    title: 'Flight Reservation System',
    description: 'A fully functional airline ticket booking system with seat management, passenger records, and real-time availability tracking. Built in C++ with efficient data structures.',
    tags: ['C++', 'OOP', 'Data Structures', 'File I/O'],
    color: '#6e50ff',
    icon: LuPlane, // NO QUOTES HERE
    featured: true,
    github: 'https://github.com/ah7933154-crypto/Flight-reservation-system-C-.git',
    demo: ""
  },
  {
    id: 2,
    title: 'XploreMath',
    description: 'An interactive mathematics learning platform with dynamic visualizations, equation solvers, and concept explanations.',
    tags: ['React', 'JavaScript', 'CSS', 'Math.js'],
    color: '#22d3ee',
    icon: LuCalculator, // NO QUOTES HERE
    featured: true,
    github: 'https://github.com/ah7933154-crypto/XploreMath-learning-app',
    demo: 'https://xplore-math-learning-app.vercel.app/',
  },
  {
    id: 3,
    title: 'Finance Tracker',
    description: 'Personal finance management app with expense tracking, budget planning, visual charts, and monthly reports.',
    tags: ['React', 'JavaScript', 'Chart.js', 'LocalStorage'],
    color: '#4ade80',
    icon: LuWallet, // NO QUOTES HERE
    github: '#',
    demo: '',
  },
  {
    id: 4,
    title: 'Islamabad City Map',
    description: "A C++ console-based city navigation system using graph algorithms (Dijkstra's) to find shortest paths.",
    tags: ['C++', 'Graphs', 'Dijkstra', 'DSA'],
    color: '#f472b6',
    icon: LuMap, // NO QUOTES HERE
    github: 'https://github.com/ah7933154-crypto/Islamabad-city-map-c-data-structures-algorithms/',
  },
  {
    id: 5,
    title: 'Ecommerce Frontend',
    description: 'Professional e-commerce frontend developed during internship at DevelopersHub Corporation.',
    tags: ['React', 'JavaScript', 'Tailwind', 'API'],
    color: '#fb923c',
    icon: LuShoppingCart, // NO QUOTES HERE
    featured: true,
    github: 'https://github.com/ah7933154-crypto/my_ecommerce_frontend_pages',
    demo: '',
  },
  {
    id: 6,
    title: 'This Portfolio',
    description: 'The very portfolio you are viewing — built with Next.js, Three.js, Framer Motion, and Tailwind CSS.',
    tags: ['Next.js', 'Three.js', 'Framer Motion', 'TypeScript'],
    color: '#a78bfa',
    icon: LuPalette, // NO QUOTES HERE
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