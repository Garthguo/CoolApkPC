// @ts-ignore
import Request from './request.js'
const myRequest = new Request()
export const getIndexData = async (data = {}) => {
  return await myRequest.get('/main/indexV8?page=1&firstLaunch=0')
}
export const getDataList = async (data = {}) => {
  return await myRequest.get('/page/dataList', data)
}
export const getArticleInfo = async (data = {}) => {
  return await myRequest.get('/feed/detail', data)
}
export const getReplyList = async (data = {}) => {
  return await myRequest.get('/feed/replyList', data)
}
