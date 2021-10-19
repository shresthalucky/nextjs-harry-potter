import { GetStaticProps } from 'next'

import { ICharacter } from '../types/characters'

import Layout from '../components/Layout'
import { getAllCharacters } from '../helpers/api'
import { getCharacterSlug } from '../helpers/slug'
import CharacterPill from '../components/CharacterCard'

export default function Characters({ characters }) {
  return (
    <Layout title="Characters">
      {characters.map((character: ICharacter) => {
        const slug = getCharacterSlug(character.name)
        return (
          <CharacterPill
            name={character.name}
            link={`/characters/${slug}`}
            key={character.id}
          />
        )
      })}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const characters: ICharacter[] = await getAllCharacters()

  return {
    props: {
      characters,
    },
  }
}
