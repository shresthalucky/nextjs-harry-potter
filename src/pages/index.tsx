import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout title="Home">
      <div className="text-center">
        <p>
          Harry Potter books wiki using{' '}
          <a
            href="https://github.com/theDavidBarton/the-harry-potter-database"
            className="text-yellow-500 hover:underline"
          >
            the-harry-potter-database API
          </a>
          .
        </p>
        <p>
          {' '}
          Navigate to{' '}
          <Link href="/books">
            <a className="text-yellow-500 hover:underline">books</a>
          </Link>{' '}
          and{' '}
          <Link href="/characters">
            <a className="text-yellow-500 hover:underline">characters</a>
          </Link>{' '}
          to explore.
        </p>
      </div>
    </Layout>
  )
}
