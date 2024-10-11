import request from '@/tools/request'

export function getBanner() {
  return request.get('/banner')
}

export function getRecommendPlayList(limit) {
  return request.get('/personalized', {
    params: {
      limit,
    },
  })
}

export function getNewSong(type) {
  return request.get('/top/song', {
    params: {
      type,
    },
  })
}
