export enum IPostListType {
  New = "New",
  User = "User",
  Category = "Category",
  Recommended = "Recommended",
}
export enum IPageType {
  Info = "Info",
  Create = "Create",
}

export type User = {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  contact_info: string;
};

export type Post = {
  id: string;
  title: string;
  book_author: string;
  publication_year: string;
  description: string;
  time: string;
  photo: string;
  createdAt: Date;
  view_id: string[];
  // updatedAt: Date;
  category_id: string[];
  user_id: string;
};
