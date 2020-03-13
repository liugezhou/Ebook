import request from '../utils/request'
export function createBook(book) {
  return request({
    url: '/book/create',
    method: 'post',
    data: book
  })
}
export function getBook(fileName) {
  return request({
    url: '/book/getBook',
    method: 'get',
    params: { fileName }
  })
}
export function updateBook(book) {
  return request({
    url: '/book/updateBook',
    method: 'post',
    data: book
  })
}

