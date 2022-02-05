export interface Feedback {
  authorId?: string | null;
  author?: string | null;
  createdAt: string;
  provider?: string;
  siteId: string;
  status: string;
  text?: string;
}
