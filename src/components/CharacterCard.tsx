import Link from 'next/link'

type Props = {
  name: string
  link: string
}

const CharacterPill = ({ name, link }: Props) => {
  return (
    <Link href={link} prefetch={false}>
      <a>
        <span className="text-xs inline-block px-3 py-2 m-1 bg-yellow-100 hover:bg-yellow-200">
          {name}
        </span>
      </a>
    </Link>
  )
}

export default CharacterPill
