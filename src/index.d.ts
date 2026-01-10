export interface ContentItem {
  id: string;
  type: "image" | "video" | string;
  url: string;
  order: number;
}

export interface Post {
  _id: string;
  slug: string;
  author: string;
  contents: ContentItem[];
  coverImage: string;
  createdAt: string;
  instagramUrl: string;
  title: string;
  updatedAt: string;
}
