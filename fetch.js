import _ from 'lodash/fp'
import axios from 'axios'
import qs from 'qs'
import { writeJson } from 'fs-extra'
import fixData from './data'

const url = 'https://api.xcdsystem.com/session_json/'
const form = {
  apikey: process.env.XCD_API_KEY,
  ConferenceID: '696',
  FieldIDs: '8235,8242,8236,10113,8229,8239',
  AllAuthors: '1',
}
console.log(form)
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(form),
  responseType: 'json',
  responseEncoding: 'utf8',
  url,
}

axios(options)
  .then(_.get('data'))
  .then(fixData)
  .then(({ data, apiData }) => Promise.all([
    writeJson('data-raw.json', data, { spaces: 2 }),
    writeJson('src/data.json', apiData, { spaces: 2 }),
  ]))
  .then(console.log)
  .catch(console.error)
