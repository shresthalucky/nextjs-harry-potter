import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

export const readFile = promisify(fs.readFile)
export const writeFile = promisify(fs.writeFile)

export const charactersFile = path.resolve('.characters_index_table')
