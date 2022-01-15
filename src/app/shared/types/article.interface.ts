import {ProfileInterface} from './profile.interface'
export interface ArticleInterface {
  id: number
  slug: string
  title: string
  description: string
  body: string
  createdAt: string
  updatedAt: string
  tagList: string[]
  favoritesCount: number
  author: ProfileInterface
  favorited: boolean | null
}
