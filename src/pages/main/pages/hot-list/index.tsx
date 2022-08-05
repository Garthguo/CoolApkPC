import { memo, useEffect, useState } from 'react'
import { getDataList } from '../../../../apis/api'
import IconList from '../../../components/icon-list'
import './index.less'
import ArticleCard from '../../../components/article-card'
const HotList = () => {
  const [headList, setHeadList] = useState<any>([])
  const [articles, setArticles] = useState<any>([])
  const getData = async () => {
    const { data: res } = await getDataList({
      url: '/page?url=V9_HOME_TAB_RANKING',
      title: '热榜',
      subTitle: '',
      page: '1',
    })
    setHeadList(res)
    // console.log('热榜', res)
    setArticles(res.filter((_: any) => _.entityType !== 'card'))
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="hot-list">
      <div className="icon-bar">
        <IconList iconList={headList[1]?.entities} />
      </div>
      {headList[2]?.title !== '酷安热搜' && (
        <div className="icon-bar topic-list">
          <span className="title">话题榜</span>
          {headList[2]?.entities.map((_: any, idx: number) => {
            return (
              <div className="topic-item">
                <img alt={_.description} src={_.logo} />
                <span className="topic-name">{_.title}</span>
              </div>
            )
          })}
        </div>
      )}
      <h3 style={{ color: 'black', marginTop: '20px' }}>今日热门</h3>
      {articles.map((_: any) => (
        <ArticleCard {..._} />
      ))}
    </div>
  )
}
export default memo(HotList)
