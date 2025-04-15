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
  '/covers/adobe.png',
  '/covers/amazon.png',
  '/covers/facebook.png',
  '/covers/hostinger.png',
  '/covers/pinterest.png',
  '/covers/quora.png',
];

export function getRandomInterviewCover() {
  const randomIndex = Math.floor(Math.random() * covers.length);
  return covers[randomIndex];
}
