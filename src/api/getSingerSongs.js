import request from '@/tools/request'

export function getSingerSongs(id) {
  return request.get('/artists', {
    params: {
      id,
    },
  })
}
