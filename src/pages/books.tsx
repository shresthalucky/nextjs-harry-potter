import { GetStaticProps } from 'next'

import { IBook } from '../types/books'

import Layout from '../components/Layout'
import { getAllBooks } from '../helpers/api'
import BookCard from '../components/BookCard'

export default function Books({ books }: { books: IBook[] }) {
  return (
    <Layout title="Books">
      {books.map((book: IBook) => (
        <div key={book.id}>
          <BookCard
            heading={book.title}
            imageUrl={book.book_covers[1].URL}
            link={`/books/${book.id}`}
          />
        </div>
      ))}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const books: IBook[] = await getAllBooks()

  return {
    props: {
      books,
    },
  }
}
