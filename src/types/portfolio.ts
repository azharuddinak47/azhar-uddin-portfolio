export interface StatItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  link?: string;
  figmaLink?: string;
  featured?: boolean;
  year?: string;
  description?: string;
  tags?: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  highlights?: string[];
}

export interface ToolItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  description?: string;
  level?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface AcademicItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
}

export interface ThoughtItem {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  slug: string;
  tags?: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ProfileConfig {
  name: string;
  role: string;
  heroHeadline: string;
  heroHeadlineHollow: string;
  subHeadline: string;
  bio: string;
  email: string;
  phone: string;
  behanceUrl: string;
  linkedinUrl: string;
  dribbbleUrl?: string;
  twitterUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  statusBadge: string;
  isAvailable: boolean;
  avatarUrl: string;
  resumeUrl?: string;
  location: string;
  languages: string[];
  hobbies: string[];
  expertiseBadges: string[];
  tickerItems: string[];
}

export interface ContactConfig {
  headline: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  budgetOptions: string[];
}

export interface PortfolioData {
  profile: ProfileConfig;
  stats: StatItem[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  tools: ToolItem[];
  certifications: CertificationItem[];
  academics: AcademicItem[];
  thoughts: ThoughtItem[];
  contact: ContactConfig;
  socials: SocialLink[];
}
