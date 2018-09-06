import _ from 'lodash/fp'
import axios from 'axios'
import qs from 'qs'
import { writeJson } from 'fs-extra'

const url = 'https://api.xcdsystem.com/session_json/'
const form = {
  apikey: '030437B8-F147-4F1A-9B36-4FB0J6CC9CBE',
  ConferenceID: '696',
  FieldIDs: '8235,8242,8236,10113,8229,8239',
  AllAuthors: '1',
}
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
  .then(data => writeJson('data.json', data, { spaces: 2 }))
  .then(console.log)
  .catch(console.error)
