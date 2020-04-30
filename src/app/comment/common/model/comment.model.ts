export interface CommentModel {
  _id?: string
  postSlug: string
  authorId: string
  content: string
  created_at?: Date
}
