import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'

import { IBook } from '../../types/books'
import { ICharacter } from '../../types/characters'

import Layout from '../../components/Layout'
import { getCharacterSlug } from '../../helpers/slug'
import { getAllBooks, getAllCharacters, getCharacter } from '../../helpers/api'

type Props = {
  characterData: ICharacter
  booksFeatured: IBook[]
}

export default function Character({ characterData, booksFeatured }: Props) {
  const {
    name,
    birth,
    death,
    species,
    ancestry,
    gender,
    hair_color,
    eye_color,
    wand,
    patronus,
    house,
    associated_groups,
  } = characterData
  return (
    <Layout title={name}>
      <div className="p-4 bg-yellow-100 text-xs">
        <h1 className="text-base font-bold pb-4">{name}</h1>
        <table className="table-auto">
          <tbody>
            {birth && (
              <tr>
                <th className="font-bold align-top text-left pr-4">Born</th>
                <td className="align-top">{birth}</td>
              </tr>
            )}
            {death && (
              <tr>
                <th className="font-bold align-top text-left pr-4">Died</th>
                <td className="align-top">{death}</td>
              </tr>
            )}
            {species && (
              <tr>
                <th className="font-bold align-top text-left pr-4">Species</th>
                <td className="align-top">{species}</td>
              </tr>
            )}
            {ancestry && (
              <tr>
                <th className="font-bold align-top text-left pr-4">Ancestry</th>
                <td className="align-top">{ancestry}</td>
              </tr>
            )}
            {gender && (
              <tr>
                <th className="font-bold align-top text-left pr-4">Gender</th>
                <td className="align-top">{gender}</td>
              </tr>
            )}
            {hair_color && (
              <tr>
                <th className="font-bold align-top text-left pr-4">
                  Hair Color
                </th>
                <td className="align-top">{hair_color}</td>
              </tr>
            )}
            {eye_color && (
              <tr>
                <th className="font-bold align-top text-left pr-4">
                  Eye Color
                </th>
                <td className="align-top">{eye_color}</td>
              </tr>
            )}
            {wand && (
              <tr>
                <th className="font-bold align-top text-left pr-4">Wand</th>
                <td className="align-top">{wand}</td>
              </tr>
            )}
            {patronus && (
              <tr>
                <th className="font-bold align-top text-left pr-4">Patronus</th>
                <td className="align-top">{patronus}</td>
              </tr>
            )}
            {house && (
              <tr>
                <th className="font-bold align-top text-left pr-4">House</th>
                <td className="align-top">{house}</td>
              </tr>
            )}
            {Boolean(associated_groups.length) && (
              <tr>
                <th className="font-bold align-top text-left pr-4">
                  Associated Groups
                </th>
                <td className="align-top">
                  <ul>
                    {associated_groups.map((group, index) => (
                      <li key={index}>{group}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
            {Boolean(booksFeatured.length) && (
              <tr>
                <th className="font-bold align-top text-left pr-4">
                  Books featured in
                </th>
                <td className="align-top">
                  <ul>
                    {booksFeatured.map(book => (
                      <li key={book.id}>
                        <Link href={`/books/${book.id}`}>
                          <a className="hover:underline">{book.title}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const characters: ICharacter[] = await getAllCharacters()

  const reqCharacter = characters.find(
    (character: ICharacter) => getCharacterSlug(character.name) === params.slug,
  )

  if (!reqCharacter) {
    return {
      notFound: true,
    }
  }

  const characterData: ICharacter = await getCharacter(reqCharacter.id)
  const books: IBook[] = await getAllBooks()

  const booksFeatured = books.filter(book =>
    characterData.books_featured_in.includes(book.id),
  )

  return {
    props: {
      characterData,
      booksFeatured,
    },
  }
}
