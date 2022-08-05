import { memo } from 'react'
import './index.less'
const IconList = (props: any) => {
  const { iconList = [] } = props
  return (
    <div className="icon-list">
      {iconList.map((_: any, index: number) => (
        <div key={index}>
          <img src={_?.pic} style={{ objectFit: 'cover' }} alt={_.title} />
          <span>{_.title}</span>
        </div>
      ))}
    </div>
  )
}
export default memo(IconList)
