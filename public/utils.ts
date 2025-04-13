import { interviewCovers, mappings } from "@/constants"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const techIconBaseURL = "https://cdn.jsdeliver.net/gh/devicons/"
const normalizeTechName = (tech:string) => {
  const key = tech.toLowerCase().replace(/\s+/g, "-")
  return mappings[key as keyof typeof mappings];
};
const covers = [
  '/images/cover1.jpg',
  '/images/cover2.jpg',
  '/images/cover3.jpg'
];

export function getRandomInterviewCover() {
  const randomIndex = Math.floor(Math.random() * covers.length);
  return covers[randomIndex];
}
