import got from 'got'
import { IBook } from '../types/books'
import { ICharacter } from '../types/characters'

const API_URL = 'https://the-harry-potter-database.herokuapp.com/api/1'

const get = async <T>(path: String): Promise<T> => {
  return await got.get(`${API_URL}${path}`).json()
}

export const getAllBooks = async () => {
  const books = await get<IBook[]>('/books/all')
  return books
}

export const getBook = async (bookId: number) => {
  const book = await get<IBook>(`/books/${bookId}`)
  return book[0]
}

export const getAllCharacters = async () => {
  const characters = await get<ICharacter[]>('/characters/all')
  return characters
}

export const getCharacter = async (characterId: number) => {
  const character = await get<ICharacter>(`/characters/${characterId}`)
  return character[0]
}
