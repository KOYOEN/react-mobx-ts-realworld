export interface User {
  id?: number,
  email: string,
  username?: string,
  bio?: string
  image?: string
  token?: string,
  password?: string,
  createdAt?: string,
  updatedAt?: string,
}

export interface Profile {
  username: string,
  bio: string | null,
  image: string | null,
  following: boolean,
}

export interface SingleArticle {
  slug: string,
  title: string,
  description: string,
  body: string,
  tagList: string[],
  createdAt: string,
  updatedAt: string,
  favorited: boolean,
  favoritesCount: number,
  author: Profile
}

export interface MultipleArticle {
  articles: SingleArticle[],
  articlesCount: number,
}

export interface SingleComment {
  id: number,
  createdAt: string,
  updatedAt: string,
  body: string,
  author: Profile,
}

export interface MultipleComments {
  comments: SingleComment[]
}

export interface TagList {
  tags: string[],
}

export interface Error {
  body: string[]
}

export interface ArticleRequest {
  tag: string,
  author: string,
  favorited: string,
  limit: string,
  offset: string,
}