import { GetStaticProps } from 'next'
import Link from 'next/link'

import { getAllCharacters } from '../helpers/api'
import { ICharacter } from '../types/characters'
import { getCharacterSlug } from '../helpers/slug'

export default function Characters({ characters }) {
  return characters.map((character: ICharacter) => {
    const slug = getCharacterSlug(character.name)
    return (
      <div key={character.id}>
        <Link href={`/characters/${slug}`}>{character.name}</Link>
      </div>
    )
  })
}

export const getStaticProps: GetStaticProps = async () => {
  const characters: ICharacter[] = await getAllCharacters()

  return {
    props: {
      characters,
    },
  }
}
