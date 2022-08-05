import './index.less'
import { useEffect, useState, memo } from 'react'
import { getDataList } from '../../../../apis/api'
import { Tabs } from '@arco-design/web-react'
import TopicList from './Comt/topic-list'
const TabPane = Tabs.TabPane
const VerticalTopic = () => {
  const [topic, setTopic] = useState<any>([{}])
  const getData = async () => {
    const { data: res } = await getDataList({
      url: '/page?url=V11_VERTICAL_TOPIC',
      title: '话题',
      subTitle: '',
      page: '1',
    })
    setTopic(res)
    // console.log(res)
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div style={{ paddingRight: '15px' }}>
      <Tabs direction="vertical" defaultActiveTab="1">
        {topic[0]?.entities?.map((_: any, index: number) => {
          return (
            <TabPane key={index} title={_.title}>
              <TopicList {..._} />
            </TabPane>
          )
        })}
      </Tabs>
    </div>
  )
}
export default memo(VerticalTopic)
