export interface PostModel {
  title: string;
  slug?: string;
  description: string | null;
  content: string | null;
  created_at?: Date;
  updated_at?: Date | null;
  authorId: string;
  categorySlug: string | null;
  imageUrl: string;
}
