import { memo } from 'react'
import './index.less'
const IconBars = (props: any) => {
  const { iconList, title } = props
  return (
    <div className="icon-bar com-topic-list">
      <span className="title">{title}</span>
      {iconList?.map((_: any, idx: number) => {
        return (
          <div className="topic-item">
            <img src={_?.cover_pic || _?.logo} />
            <span className="topic-name">{_?.title}</span>
          </div>
        )
      })}
    </div>
  )
}
export default memo(IconBars)
