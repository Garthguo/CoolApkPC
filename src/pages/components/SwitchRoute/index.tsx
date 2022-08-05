import { useLocation } from 'react-router-dom'
import './index.less'
import { useEffect, useState } from 'react'
import ArticleDetail from '../../detail/article-detail'
import PersonDetail from '../../detail/person-detail'
import MainPage from '../../main'
const getCom = (name: string) => {
  switch (name) {
    case 'article-detail':
      return <ArticleDetail></ArticleDetail>
    case 'person-detail':
      return <PersonDetail></PersonDetail>
    case 'main-page':
      return <MainPage></MainPage>
  }
}
const SwitchRoute = (props: any) => {
  const { children } = props
  const location = useLocation()
  const [comName, setComName] = useState<any[]>([])
  useEffect(() => {
    setComName((names) => {
      const name = location.pathname
        .split('/')
        .filter((_) => _ !== '/')
        .filter((_) => _ !== '')
      // console.log(name)
      return name
    })
  }, [location.pathname])
  return (
    <div className="switch-box">
      {getCom(comName[0])}
      <div className="switch-right">{getCom(comName[1])}</div>
    </div>
  )
}
export default SwitchRoute
