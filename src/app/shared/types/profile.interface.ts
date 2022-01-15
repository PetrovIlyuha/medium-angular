export interface ProfileInterface {
  id: number
  email: string | null
  bio: string
  username: string
  image: string
  following?: boolean | null
}
