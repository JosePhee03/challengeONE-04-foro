export interface User {
  id: number;
  username: string;
  image: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface AuthUser {
  username: string;
  password: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: string;
}

interface tokenResponse {
  jwt: string;
}

export interface TokenPayload {
  sub: string;
  permissions: string[];
  iss: string;
  id: number;
  exp: number;
  iat: number;
}

export interface CreatePost {
  title: string;
  content: string;
  categories: number[];
}

export interface Post {
  id: number;
  title: string;
  content: string;
  dateCreated: string;
  status: boolean;
  author: User;
  categories: Category[];
  totalComments: number;
}

export interface Page<T> {
  content: T[];
  page: number;
  size: number;
  offset: number;
  last: boolean;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
  total: number;
}

export interface Comment {
  id: number;
  postId: number;
  content: string;
  dateCreated: string;
  author: User;
}

export interface CreateComment {
  postId: number;
  content: string;
}

export interface UpdatePost {
  title: string;
  content: string;
  categories: number[];
  status: boolean;
}
