import { memo, useEffect, useState } from 'react'

import './index.less'
import { getDataList } from '../../../../apis/api'
import IconBars from '../../../components/icon-bars'
import ArticleCard from '../../../components/article-card'
const BeautifyPage = () => {
  const [headList, setHeadList] = useState<any>([])
  const [articles, setArticles] = useState<any>([])
  const getData = async () => {
    const { data: res } = await getDataList({
      url: '/page?url=V11_HOME_MEIHUA',
      title: '美化',
      subTitle: '',
      page: '1',
    })
    setHeadList(res)
    // console.log('MEIHUA', res)
    setArticles(res.filter((_: any) => _.entityType !== 'card'))
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="beautify-list">
      <IconBars iconList={headList[0]?.entities} title="话题区" />
      {articles?.map((_: any) => (
        <ArticleCard {..._} />
      ))}
    </div>
  )
}
export default memo(BeautifyPage)
