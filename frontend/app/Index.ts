export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  color: string
  icon: string
  github?: string
  demo?: string
  featured?: boolean
}

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  text: string
  avatar: string
  rating: number
}

export interface Skill {
  name: string
  icon: string
  category: 'language' | 'framework' | 'tool'
}