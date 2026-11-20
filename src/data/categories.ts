import data from "@content/categories.json";
import type { Category } from "@/types/product";

export const categories = data.items as Category[];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
