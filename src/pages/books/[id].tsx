import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'

import { getAllBooks, getBook } from '../../helpers/api'
import { IBook, IBookPath } from '../../types/books'

export default function Book({ data }: { data: IBook }) {
  return (
    <div>
      {data.book_covers.map(cover => (
        <div style={{ height: '500px', position: 'relative' }} key={cover.id}>
          <Image src={cover.URL} layout="fill" objectFit="contain" />
        </div>
      ))}
    </div>
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
  const bookData = await getBook(Number(params.id))

  return {
    props: {
      data: bookData,
    },
  }
}
