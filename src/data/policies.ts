/** CHÍNH SÁCH — nằm trong content/policies.json */
import data from "@content/policies.json";

export interface Policy {
  slug: string;
  title: string;
  summary: string;
  sections: { heading: string; body: string[] }[];
}

export const policies = data.items as Policy[];

export function getPolicy(slug: string) {
  return policies.find((p) => p.slug === slug);
}
