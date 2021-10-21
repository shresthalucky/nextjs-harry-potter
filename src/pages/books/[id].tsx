import Image from 'next/image'
import { GetStaticPaths, GetStaticProps } from 'next'

import { IBook, IBookPath } from '../../types/books'
import { ICharacter } from '../../types/characters'

import Layout from '../../components/Layout'
import { getCharacterSlug } from '../../helpers/slug'
import CharacterPill from '../../components/CharacterCard'
import { getAllBooks, getAllCharacters, getBook } from '../../helpers/api'

type Props = {
  bookData: IBook
  charactersData: ICharacter[]
}

export default function Book({ bookData, charactersData }: Props) {
  const { title, plot_take_place_years, author, publish_date, book_covers } =
    bookData

  const publishDate = {
    ...publish_date[0],
    ...publish_date[1],
  }

  return (
    <Layout title={title}>
      <div className="pb-4">
        <h1 className="font-bold">{title}</h1>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="p-4 bg-yellow-100 text-xs">
          {book_covers.map(cover => (
            <div className="mb-4 text-center" key={cover.id}>
              <div className="relative w-80 h-80 mx-auto">
                <Image src={cover.URL} layout="fill" objectFit="contain" />
              </div>
              <div className="text-center">
                Art by {cover.artist} ({cover.country})
              </div>
            </div>
          ))}
          <table>
            <tbody>
              <tr>
                <th className="font-bold align-top text-left pr-4">Author: </th>
                <td>{author}</td>
              </tr>

              <tr>
                <th className="font-bold align-top text-left pr-4">
                  Published Date:{' '}
                </th>
                <td>{`${publishDate.UK} (UK) and ${publishDate.US} (US)`}</td>
              </tr>

              <tr>
                <th className="font-bold align-top text-left pr-4">
                  Plot Taken Place:{' '}
                </th>
                <td>{`${plot_take_place_years[0]} - ${plot_take_place_years[1]}`}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="md:pl-4">
          {charactersData.map((character: ICharacter) => {
            const slug = getCharacterSlug(character.name)
            return (
              <CharacterPill
                name={character.name}
                link={`/characters/${slug}`}
                key={character.id}
              />
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const books: IBook[] = await getAllBooks()
  const bookPaths: IBookPath[] = books.map((book: IBook) => ({
    params: {
      id: String(book.id),
    },
  }))

  return {
    paths: bookPaths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bookData: IBook = await getBook(Number(params.id))

  const characters: ICharacter[] = await getAllCharacters()

  const charactersData: ICharacter[] = characters.filter(
    (character: ICharacter) => bookData.characters.includes(character.id),
  )

  return {
    props: { bookData, charactersData },
  }
}
