import React, { memo, ReactNode } from 'react'
import { Tabs, Typography } from '@arco-design/web-react'
import './index.less'
import Headlines from './pages/head-lines'
import HotList from './pages/hot-list'
import FastNews from './pages/fast-news'
import VerticalTopic from './pages/vertical-topic'
import TutorialPage from './pages/tutorial-page'
import BeautifyPage from './pages/beautify-page'
import { Outlet } from 'react-router-dom'
const TabPane = Tabs.TabPane
const TAG_LIST = [
  {
    tagName: '关注',
  },
  {
    tagName: '头条',
    path: 'head-lines',
  },
  {
    tagName: '热榜',
  },
  {
    tagName: '快讯',
  },
  {
    tagName: '话题',
  },
  {
    tagName: '教程',
  },
  {
    tagName: '美化',
  },

  {
    tagName: '问答',
  },
]

const modules = import.meta.glob('./**')
// const Component = (props: any) => {
//   console.log(modules)
//   const Com = React.lazy(modules[`./pages/${props.path}/index.tsx`] as any)
//   console.log(Com)
//   return <Com />
// }
const MainPage = () => {
  const style = {
    TextAlign: 'center',
    marginTop: 20,
  }
  const renderTitle = (
    tabTitle: ReactNode,
    info: {
      key: string | number
      isActive: boolean
      disabled: boolean
      editable: boolean
    }
  ) => {
    // console.log(tabTitle)
    return tabTitle
  }
  return (
    // <div className="route-box">
    <Tabs
      defaultActiveTab="1"
      renderTabTitle={renderTitle}
      className="tag-area"
    >
      <TabPane key={0} title={TAG_LIST[0].tagName}>
        <Headlines />
      </TabPane>
      <TabPane key={1} title={TAG_LIST[1].tagName}>
        <Headlines />
      </TabPane>
      <TabPane key={2} title={TAG_LIST[2].tagName}>
        <HotList />
      </TabPane>
      <TabPane key={3} title={TAG_LIST[3].tagName}>
        <FastNews />
      </TabPane>
      <TabPane key={4} title={TAG_LIST[4].tagName}>
        <VerticalTopic />
      </TabPane>
      <TabPane key={5} title={TAG_LIST[5].tagName}>
        <TutorialPage />
      </TabPane>
      <TabPane key={6} title={TAG_LIST[6].tagName}>
        <BeautifyPage />
      </TabPane>
      <TabPane key={7} title={TAG_LIST[7].tagName}>
        <Headlines />
      </TabPane>
    </Tabs>
  )
}
export default memo(MainPage)
