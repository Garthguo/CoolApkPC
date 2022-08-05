import { memo, useEffect, useState } from 'react'
import './index.less'
import { getDataList } from '../../../../apis/api'
import IconBars from '../../../components/icon-bars'
import ArticleCard from '../../../components/article-card'
const TutorialPage = () => {
  const [headList, setHeadList] = useState<any>([])
  const [articles, setArticles] = useState<any>([])
  const getData = async () => {
    const { data: res } = await getDataList({
      url: '/page?url=V11_HOME_TAB_JC',
      title: '教程',
      subTitle: '',
      page: '1',
    })
    setHeadList(res)
    // console.log('教程', res)
    setArticles(res.filter((_: any) => _.entityType !== 'card'))
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="tutorial-page">
      <div className="header-card">
        <img src={headList[0]?.pic} />
        <p>{headList[1]?.description}</p>
      </div>
      <IconBars iconList={headList[2]?.entities} title={headList[2]?.title} />
      <IconBars iconList={headList[3]?.entities} title={headList[3]?.title} />
      <IconBars iconList={headList[4]?.entities} title={headList[4]?.title} />
      <IconBars iconList={headList[5]?.entities} title={headList[5]?.title} />
      {articles?.map((_: any) => (
        <ArticleCard {..._} />
      ))}
    </div>
  )
}
export default memo(TutorialPage)
