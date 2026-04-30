export interface Article {
  id: number;
  title: string;
  content: string;
  summary?: string;
  coverImage?: string;
  status: string;
  viewCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  author: {
    id: number;
    username: string;
  };
  categoryId?: number;
  category?: Category;
  tags: {
    tag: Tag;
  }[];
  _count?: {
    comments: number;
  };
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    articles: number;
  };
}

export interface Tag {
  id: number;
  name: string;
  createdAt: string;
  _count?: {
    articles: number;
  };
}

export interface Comment {
  id: number;
  content: string;
  authorName: string;
  authorEmail?: string;
  status: string;
  createdAt: string;
  articleId: number;
}
