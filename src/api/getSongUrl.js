import request from '@/tools/request'

export function getSongUrl(id) {
  return request.get('/song/url/v1', {
    params: {
      id,
      level: 'standard',
    },
  })
}
