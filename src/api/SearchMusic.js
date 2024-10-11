import request from '@/tools/request'

export function SearchMusic(keyWord, limit, offset, type) {
  return request.get('/cloudsearch', {
    params: {
      keywords: keyWord,
      limit,
      offset,
      type,
    },
  })
}
