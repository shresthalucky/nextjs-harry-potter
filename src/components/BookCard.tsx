import Link from 'next/link'
import Image from 'next/image'

type Props = {
  heading: string
  imageUrl: string
  link: string
}

const BookCard = ({ heading, imageUrl, link }: Props) => {
  return (
    <div className="flex py-4">
      <div className="relative w-40 border-2 border-yellow-300 mr-4 p-1">
        <Image src={imageUrl} height="100%" width="100%" layout="responsive" />
      </div>
      <div className="py-4">
        <h2 className="text-base font-bold">{heading}</h2>
        <Link href={link}>
          <a className="text-yellow-500 hover:underline">View</a>
        </Link>
      </div>
    </div>
  )
}

export default BookCard
