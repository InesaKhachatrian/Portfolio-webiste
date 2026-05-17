export interface Stat {
  n: string;
  label: string;
}

export interface ProcessStep {
  n: string;
  title: string;
  desc: string;
}

export interface Iteration {
  v: string;
  desc: string;
}

export interface Fact {
  key: string;
  value: string;
  accent: string | null;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  featured: boolean;
  num: string;
  year: string;
  category: string;
  tags: string[];
  tile: string;
  mockVariant: string;
  sub: string;
  published: boolean;
  order: number;
  hero: {
    eyebrow: string;
    title: string;
    accentWord: string;
    bannerLabel: string;
  };
  tldr: {
    stats: Stat[];
    summary: string;
  };
  challenge: {
    label: string;
    heading: string;
    lede: string;
    body: string;
    researchLabel: string;
    researchFindings: string;
    affinityLabel: string;
    jtbdLabel: string;
  };
  process: {
    label: string;
    heading: string;
    methodLabel: string;
    steps: ProcessStep[];
    wireframeLabel: string;
    iterations: Iteration[];
    hifiLabel: string;
  };
  impact: {
    label: string;
    heading: string;
    stats: Stat[];
    quote: string;
    quoteAuthor: string;
    takeaways: string[];
    nextMoves: string[];
  };
}

export interface SiteContent {
  splash: {
    headline1: string;
    headline2: string;
    headlineAccent: string;
    headline3: string;
    headline4: string;
    headline5: string;
    lede: string;
    available: string;
    focus: string;
    based: string;
  };
  about: {
    bio: string;
    bio2: string;
    facts: Fact[];
  };
  contact: {
    email: string;
    linkedin: string;
    cta: string;
    copyright: string;
  };
  images: {
    portrait: string | null;
    about: string | null;
    footer: string | null;
  };
}
