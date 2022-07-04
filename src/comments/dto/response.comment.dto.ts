export interface resComment {
  id: number;
  content: string;
  likesCount: number;
  senderId: number;
  postedAt: Date;
}

export interface resFindComment {
  id: number;
  content: string;
  likesCount: number;
  senderId: number;
  postedAt: Date;
  hasLikedByUser: boolean;
}
