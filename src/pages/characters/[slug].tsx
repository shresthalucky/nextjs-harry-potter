import { GetStaticPaths, GetStaticProps } from 'next'

import { getAllCharacters, getCharacter } from '../../helpers/api'
import {
  ICharacter,
  ICharacterIndex,
  ICharacterPaths,
} from '../../types/characters'
import { getCharacterSlug } from '../../helpers/slug'
import { readFile, writeFile } from '../../helpers/fs'

export default function Character({ data }: { data: ICharacter }) {
  return <div>{data.name}</div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const characters: ICharacter[] = await getAllCharacters()

  // const characterPaths: ICharacterPaths[] = characters.map(
  //   (character: ICharacter) => ({
  //     params: {
  //       slug: getCharacterSlug(character.name),
  //     },
  //   }),
  // )

  const characterIndex: ICharacterIndex[] = characters.map(
    (character: ICharacter) => ({
      id: character.id,
      slug: getCharacterSlug(character.name),
    }),
  )

  await writeFile(
    '.characters_index_table',
    JSON.stringify(characterIndex),
    'utf8',
  )

  const characterPaths: ICharacterPaths[] = characterIndex.map(character => ({
    params: {
      slug: character.slug,
    },
  }))

  return {
    paths: characterPaths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await readFile('.characters_index_table', 'utf8')
  const indexTable = JSON.parse(data)

  const { id } = indexTable.find(
    (row: ICharacterIndex) => row.slug === params.slug,
  )

  const characterData = await getCharacter(id)

  return {
    props: {
      data: characterData,
    },
  }
}
