import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to cleanly merge Tailwind CSS classes.
 * It uses clsx for conditional classes and tailwind-merge to resolve conflicts.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
