import { memo, useState, useEffect } from 'react'
import './index.less'
import { getDataList } from '../../../../apis/api'
import IconList from '../../../components/icon-list'
import ArticleCard from '../../../components/article-card'
const FastNews = (props: any) => {
  const [headList, setHeadList] = useState<any>([])
  const [articles, setArticles] = useState<any>([])
  const getData = async () => {
    const { data: res } = await getDataList({
      url: '/page?url=V11_HOME_TAB_NEWS',
      title: '快讯',
      subTitle: '',
      page: '1',
    })
    setHeadList(res)
    // console.log(res)
    setArticles(res.filter((_: any) => _.entityType !== 'card'))
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="fast-list">
      <div className="head-img">
        <img alt={headList[0]?.title} src={headList[0]?.pic} />
      </div>
      <div className="news-list">
        {articles.map((_: any, idx: number) => {
          return (
            <div className="news-item news-card">
              <div className="left-content">
                <span className="news-message">{_.editor_title}</span>
                <span className="news-info">
                  {_.username} {_.commentnum}评论
                </span>
              </div>
              {_.pic && <img alt={_.description} src={_.pic} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default memo(FastNews)
