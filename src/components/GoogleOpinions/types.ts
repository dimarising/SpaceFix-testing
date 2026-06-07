export interface Review {
  author: string;
  rating: number;
  text: string;
  date: Date | string;
}

export const GOOGLE_RATING = {
  score: 4.9,
  maxScore: 5,
  reviewCount: 342,
} as const;
