import { stringToTime } from '@/tools/timeChange'
export function LyricChangeToUse(lrc) {
  return lrc.split('\n').map(i => {
    let [time, text] = i.split(']')
    if (!time) {
      return { time: null, text: '' }
    }
    time = time.slice(1)
    return {
      time: stringToTime(time),
      text,
    }
  })
}
