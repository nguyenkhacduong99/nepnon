/**
 * NỘI DUNG BIÊN TẬP — nằm trong content/story.json và content/articles.json.
 * Những đoạn `draft: true` là NỘI DUNG MẪU — gia đình cần viết lại bằng câu chuyện thật.
 */
import story from "@content/story.json";
import articleData from "@content/articles.json";
import type { ImageAsset } from "@/types/product";

export interface StoryBlock {
  eyebrow: string;
  title: string;
  body: string[];
  draft?: boolean;
}

export interface CraftStep {
  step: number;
  title: string;
  summary: string;
  detail: string;
  image: ImageAsset;
}

export type TrustIcon = "hand" | "scissors" | "package" | "message";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  image: ImageAsset;
  readingTime: string;
  body: string[];
  draft?: boolean;
}

export const homeStory = story.homeStory as StoryBlock[];
export const motherStory = story.motherStory as StoryBlock[];
export const brandPhilosophy = story.brandPhilosophy as { title: string; text: string }[];
export const craftSteps = story.craftSteps as CraftStep[];
export const trustPoints = story.trustPoints as { icon: TrustIcon; title: string; text: string }[];
export const articles = articleData.items as Article[];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
