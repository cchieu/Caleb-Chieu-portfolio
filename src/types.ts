export interface TimelineItem {
  year: string;
  role: string;
  company: string;
}

export interface ServiceItem {
  num: string;
  name: string;
  desc: string;
  tags: string[];
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  role: string;
  bgText: string;
  bgStyle: string; // CSS style or color class for background
  tags: string[];
  desc: string;
  challenges?: string;
  solutions?: string;
  impact?: string;
  imageUrl?: string; // Optional image URL for cover
}

export interface ProcessItem {
  num: string;
  name: string;
  desc: string;
}

export interface StatItem {
  num: string;
  hasPlus: boolean;
  label: string;
}

export interface SkillItem {
  name: string;
  percentage: number;
}

export interface TestimonialItem {
  authorInitials: string;
  authorName: string;
  authorTitle: string;
  text: string;
  rating: number;
}
