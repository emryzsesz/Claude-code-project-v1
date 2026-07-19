export const PORTFOLIO_CATEGORIES = [
  "All",
  "Wix",
  "Squarespace",
  "POS",
  "Author Growth",
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export type PortfolioProject = {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, "All">;
  summary: string;
};

/**
 * Placeholder entries. Every title and summary below is a stand in, swap
 * each one for a real project once Emryz Digital has case studies ready
 * to publish. The PLACEHOLDER badge on each card in PortfolioGrid makes
 * this obvious to site visitors as well, not just in this file.
 */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "wix-1",
    title: "Add your Wix project title",
    category: "Wix",
    summary:
      "Replace with a short description of the business, what was built, and the result.",
  },
  {
    id: "wix-2",
    title: "Add your Wix project title",
    category: "Wix",
    summary:
      "Replace with a short description of the business, what was built, and the result.",
  },
  {
    id: "squarespace-1",
    title: "Add your Squarespace project title",
    category: "Squarespace",
    summary:
      "Replace with a short description of the business, what was built, and the result.",
  },
  {
    id: "squarespace-2",
    title: "Add your Squarespace project title",
    category: "Squarespace",
    summary:
      "Replace with a short description of the business, what was built, and the result.",
  },
  {
    id: "pos-1",
    title: "Add your Toast project title",
    category: "POS",
    summary:
      "Replace with a short description of the business, what was set up, and the result.",
  },
  {
    id: "pos-2",
    title: "Add your Square project title",
    category: "POS",
    summary:
      "Replace with a short description of the business, what was set up, and the result.",
  },
  {
    id: "author-1",
    title: "Add your author client name",
    category: "Author Growth",
    summary:
      "Replace with a short description of the book, the campaign, and the result.",
  },
  {
    id: "author-2",
    title: "Add your author client name",
    category: "Author Growth",
    summary:
      "Replace with a short description of the book, the campaign, and the result.",
  },
];
