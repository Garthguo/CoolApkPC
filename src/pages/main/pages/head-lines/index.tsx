import { memo, useEffect, useState } from 'react'
import { getIndexData } from '../../../../apis/api'
import './index.less'
import { Carousel } from '@arco-design/web-react'
import ArticleCard from '../../../components/article-card'
import IconList from '../../../components/icon-list'
const HeadLines = () => {
  const [headList, setHeadList] = useState<any>([])
  const [articles, setArticles] = useState<any>([])
  const getHeadData = async () => {
    const { data: res } = await getIndexData()
    setHeadList(res)
    setArticles(res.filter((_: any) => _.entityType !== 'card'))
    // console.log(res)
    // console.log(articles)
  }
  useEffect(() => {
    getHeadData()
  }, [])
  return (
    <div className="head-lines">
      <div className="header-card">
        <Carousel
          style={{ width: '100%', aspectRatio: '3/1' }}
          autoPlay={true}
          indicatorType="dot"
          moveSpeed={1000}
          showArrow="never"
        >
          {headList[0]?.entities.map((_: any, index: number) => (
            <div key={index}>
              <img
                src={_?.pic}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                alt={_.title}
              />
            </div>
          ))}
        </Carousel>
        <IconList iconList={headList[1]?.entities} />
      </div>
      {articles.map((_: any) => (
        <ArticleCard {..._} />
      ))}
    </div>
  )
}
export default memo(HeadLines)
