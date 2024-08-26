import { UserType } from "./userType";

export interface CommentType {
  id: number;
  content: string;
  createdAt: string | number;
  score: number;
  user: UserType;
  replies?: CommentType[];
  parentId?: number;
  replyingTo?: string;
}
