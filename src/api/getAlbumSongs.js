import request from '@/tools/request'

export function getAlbumSongs(id) {
  return request.get('/album', {
    params: {
      id,
    },
  })
}
