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

export function getcategory() {
  return request({
    url: '/book/category',
    method: 'get'
  })
}

export function listBook(listQuery) {
  return request({
    url: '/book/list',
    method: 'get',
    params: listQuery
  })
}

export function deleteBook(fileName) {
  return request({
    url: '/book/delete',
    method: 'get',
    params: { fileName }
  })
}
