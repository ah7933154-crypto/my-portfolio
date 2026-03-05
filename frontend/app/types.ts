import { ElementType, ReactNode } from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  color: string;
  icon: ElementType; 
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  icon: any;
  category: 'language' | 'framework' | 'tool';
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
  rating: number;
}