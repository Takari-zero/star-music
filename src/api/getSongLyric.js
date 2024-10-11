import request from '@/tools/request'

export function getSongLyric(id) {
  return request.get('/lyric', {
    params: {
      id,
    },
  })
}
