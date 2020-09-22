import _ from 'lodash/fp'
import { format, parse } from 'date-fns'

export const hourMin = time => format(parse(time), 'HH:mm')
export const startEnd = (start, end) => `${hourMin(start)} - ${hourMin(end)}`

const getTimeSlots = sessions => ({
  sessionStartTime: sessions[0].sessionStartTime,
  sessionEndTime: sessions[0].sessionEndTime,
  sessions,
})
const getSessionDate = dateGroup => ({
  sessionDate: dateGroup[0].sessionDate,
  timeSlots: _.flow(_.groupBy('sessionStartTime'), _.map(getTimeSlots))(dateGroup),
})

const addGrouping = _.flow(
  _.groupBy('sessionDate'),
  _.map(getSessionDate),
)

const getSessions = _.flow(
  _.values,
  _.flatten,
  _.sortBy(['sessionCode', 'position']),
  addGrouping,
)
const getOverviewTracks = _.flow(
  _.groupBy('trackId'),
  _.pick([
    'returnsInvestmentFamilyPlanningDemographicDividend',
    'sexualReproductiveHealthRightsAmongAdolescentsYouth',
    'urbanizationReproductiveHealth',
    'faithFamilyPlanning']),
  _.mapValues(addGrouping),
)
export function buildData(items) {
  const {
    Poster, Workshop, Opening, ...sessions
  } = _.groupBy('sessionType', items)
  const sideEventItems = _.filter(item => !!item.presentations.length, sessions['Side Events'])
  const sideEvents = addGrouping(sessions['Side Events'])
  delete sessions['Side Events']

  const apiData = {
    posters: Poster,
    opening: addGrouping(Opening),
    workshop: addGrouping(Workshop),
    overview: addGrouping(items),
    overviewTracks: getOverviewTracks(items),
    sideEvents,
    sideEventItems: _.map(_.pick(['sessionCode']), sideEventItems),
  }
  delete sessions.Plenary
  apiData.sessions = getSessions(sessions)

  return apiData
}
