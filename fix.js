import { writeJson } from 'fs-extra'
import fixData from './data'
import data from './data-raw'

const { apiData } = fixData(data)
writeJson('src/data.json', apiData, { spaces: 2 })
