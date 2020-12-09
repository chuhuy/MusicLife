export interface Comment {
  comment_id?: number;
  content: string;
  created_at: string;
  display_name: string;
  image_url?: string;
  default_avatar?: number;
  access_token?: string;
}
