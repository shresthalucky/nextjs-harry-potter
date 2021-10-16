import slugify from 'slugify'

export const getCharacterSlug = (name: string): string => {
  return slugify(name, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  })
}
