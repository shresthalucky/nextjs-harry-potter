export interface ICharacter {
  id: number
  name: string
  birth: string | null
  death: string | null
  species: string | null
  ancestry: string | null
  gender: string
  hair_color: string | null
  eye_color: string | null
  wand: string | null
  patronus: string | null
  house: string | null
  associated_groups: string[]
  books_featured_in: number[]
}
