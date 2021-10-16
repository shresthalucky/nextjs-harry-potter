export interface IBookCovers {
  id: number
  country: string
  edition: string
  artist: string
  URL: string
}

export interface IBook {
  id: number
  title: string
  author: string
  publish_date: Array<{
    UK: Date
    US: Date
  }>
  plot_take_place_years: Array<Date>
  book_covers: Array<IBookCovers>
  characters: Array<number>
}

export interface IBookPath {
  params: {
    id: string
  }
}
