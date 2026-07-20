export const PORTFOLIO_CATEGORIES = [
  "Wix",
  "Squarespace",
  "POS",
  "Author Growth",
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export type PortfolioProject = {
  id: string;
  title: string;
  category: PortfolioCategory;
  summary: string;
  isPlaceholder?: boolean;
  image?: string;
  client?: string;
  youtubeId?: string;
};

/**
 * Most entries below are real Emryz Digital client projects. Anything
 * still a placeholder is marked isPlaceholder so the PLACEHOLDER badge
 * in PortfolioScroll only shows where it is still true, swap it for a
 * real case study once it is ready to publish.
 */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "wix-1",
    title: "Proceeds Solution LLC",
    category: "Wix",
    summary:
      "A company that helps homeowners, heirs, and estate representatives recover unclaimed surplus funds after a foreclosure or tax sale. We built a full Wix site that explains the recovery process in plain language, walks visitors through eligibility, and backs every claim with trust signals and an FAQ. The result is a clear path from a visitor asking if they are owed money to a submitted eligibility check.",
    image: "/images/portfolio/wix-1.jpg",
  },
  {
    id: "wix-2",
    title: "Legacy Response",
    category: "Wix",
    summary:
      "A nonprofit software company behind three connected products, aKinder Volunteer, aKinder Wellness, and aKinder Chat, each aimed at strengthening community health and volunteer engagement. We built a Wix Studio site that introduces all three products clearly, backs the mission with a founder quote, and gives nonprofits an easy path to request a demo. The result is a site that turns a broad mission into three understandable offers nonprofits can act on.",
    image: "/images/portfolio/wix-2.jpg",
  },
  {
    id: "squarespace-1",
    title: "Knapsack",
    category: "Squarespace",
    summary:
      "A web design agency that builds Squarespace sites for service based experts like financial advisors and wellness practices. We built their own Squarespace site around a clear growth promise, real client logos, a free guide download, and a nationwide client list. The result is a site that sells the agency the same way it sells its client work, with clear proof and a steady stream of guide downloads and booked calls.",
    image: "/images/portfolio/squarespace-1.jpg",
  },
  {
    id: "squarespace-2",
    title: "The Tour Pals",
    category: "Squarespace",
    summary:
      "A VIP theme park tour company guiding families through Disney, Universal, and Epic Universe parks across Florida and California. We built a vibrant Squarespace site with a free trip planning call, real guest testimonials, and a results strip showing over 500 VIP tours delivered a year, a 98 percent satisfaction rate, and over 200 reviews. The result is a site that turns a big, once in a lifetime trip decision into an easy booked call.",
    image: "/images/portfolio/squarespace-2.jpg",
  },
  {
    id: "pos-1",
    title: "The Wholesale Hair Guy",
    category: "POS",
    summary:
      "An online retailer selling hair extensions, closures, and accessories at wholesale pricing, with a catalog spanning bonnets, clip ins, glue, and HD closures in a full range of textures. We set up their Square account and built out the complete item library, organized into clear reporting categories with real pricing and live stock status for every product. The result is a catalog that is actually running, ready to sell and easy for their team to keep current.",
    image: "/images/portfolio/pos-1.jpg",
  },
  {
    id: "author-1",
    title: "Empires Lost: Cold War Memoir",
    category: "Author Growth",
    client: "Michael G. Bergen",
    summary:
      "An AI generated video ad promoting Empires Lost, a gripping Cold War memoir and Part 4 of The Rutherford Chronicles. A powerful story blending personal experience with world history through firsthand accounts of searching for Soviet submarines, facing Cuban Missile Crisis tensions, witnessing the Berlin Wall, and the fall of the USSR.",
    youtubeId: "RE2gFE6Ozcc",
  },
  {
    id: "author-2",
    title: "Add your author client name",
    category: "Author Growth",
    summary:
      "Replace with a short description of the book, the campaign, and the result.",
    isPlaceholder: true,
  },
];
