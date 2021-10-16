import { GetStaticProps } from 'next'
import Link from 'next/link'

import { IBook } from '../types/books'
import { getAllBooks } from '../helpers/api'

export default function Books({ books }: { books: IBook[] }) {
  return books.map((book: IBook) => {
    return (
      <div key={book.id}>
        <Link href={`/books/${book.id}`}>{book.title}</Link>
      </div>
    )
  })
}

export const getStaticProps: GetStaticProps = async () => {
  const books: IBook[] = await getAllBooks()

  return {
    props: {
      books,
    },
  }
}
