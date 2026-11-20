/**
 * ẢNH CHUNG CỦA WEBSITE (trừ ảnh sản phẩm) — nằm trong content/images.json.
 * `placeholder: true` = ảnh minh họa, sẽ tự gắn nhãn "Ảnh minh họa".
 */
import data from "@content/images.json";
import type { ImageAsset } from "@/types/product";

export const images = data as {
  hero: ImageAsset;
  storyMother: ImageAsset;
  storyHands: ImageAsset;
  storyVillage: ImageAsset;
  storyHero: ImageAsset;
  workshop: ImageAsset[];
  craft: ImageAsset[];
  cultureHero: ImageAsset;
  cultureMeaning: ImageAsset;
  cultureVillage: ImageAsset;
  cultureCare: ImageAsset;
};
