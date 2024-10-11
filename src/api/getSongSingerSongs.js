import request from '@/tools/request'

export function getSongSingerSongs(id) {
  return request.get('/playlist/detail', {
    params: {
      id,
    },
  })
}
