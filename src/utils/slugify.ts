export const slugify = (text: string): string =>
  text.toLowerCase().replace(/\s+/g, "-");

export const deslugify = (slug: string): string =>
  slug.replace(/-/g, " ").toLowerCase();
