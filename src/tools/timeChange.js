import dayjs from 'dayjs'

export function secondToMS(time) {
  let m = parseInt(time / 60)
  let s = parseInt(time % 60)
  if (s < 10) {
    s = `0${s}`
  }
  return `${m}:${s}`
}

export function stringToTime(str) {
  let [m, s] = str.split(':')
  m = +(m[0] === 0 ? m.slice(1) : m) * 60
  s = +(s[0] === 0 ? s.slice(1) : s)
  return m + s
}

export function msToDate(date) {
  return dayjs(date).format('YYYY-MM-DD')
}
