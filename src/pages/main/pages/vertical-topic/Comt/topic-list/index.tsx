import { memo, useEffect, useState } from 'react'
import { getDataList } from '../../../../../../apis/api'
import './index.less'
const TopicList = (props: any) => {
  const [topics, setTopics] = useState<any>([])
  const getData = async () => {
    const { data: res } = await getDataList({
      url: props.url,
      title: props.title,
      subTitle: '',
      page: '1',
    })
    // console.log(props.title)
    // console.log(res)
    setTopics(res.filter((_: any) => _.entityType !== 'card'))
    // console.log(topics)
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="com-topic-list">
      {topics?.map((_: any, index: number) => {
        return (
          <div className="topic-box">
            <img src={_.logo} />
            <div className="right-box">
              <span className="title">{_.title}</span>
              <span className="info">
                {_.hot_num_txt}热度 {_.commentnum_txt}讨论
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default memo(TopicList)
