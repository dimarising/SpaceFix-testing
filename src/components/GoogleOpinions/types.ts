export interface Review {
  author: string;
  rating: number;
  text: string;
  date: Date | string;
}

export const GOOGLE_RATING = {
  score: 5.0,
  maxScore: 5,
  reviewCount: 400,
} as const;
