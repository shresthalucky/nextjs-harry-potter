import Link from 'next/link'

const Header = () => {
  return (
    <div className="px-6 py-8">
      <div className="flex justify-between">
        <div>
          <Link href="/">
            <a>
              <span className="text-base font-bold">Harry Potter</span>
            </a>
          </Link>
        </div>
        <div className="text-base">
          <Link href="/books">
            <a className="mx-6 hover:underline">Books</a>
          </Link>
          <Link href="/characters">
            <a className="hover:underline">Characters</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
