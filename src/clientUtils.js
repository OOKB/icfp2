import { format, parse } from 'date-fns'

export const hourMin = time => format(parse(time), 'HH:mm')
export const startEnd = (start, end) => `${hourMin(start)} - ${hourMin(end)}`
