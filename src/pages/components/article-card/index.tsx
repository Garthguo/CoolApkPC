import { memo, useState } from 'react'
import { Comment, Avatar, Space, Tag, Image } from '@arco-design/web-react'
import {
  IconThumbUp,
  IconShareInternal,
  IconMessage,
} from '@arco-design/web-react/icon'
import './index.less'
import { useNavigate } from 'react-router-dom'
const iconStyle = { color: '#a3a3a3', fontSize: 20, marginLeft: 7 }
const getTime = (time: number) => {
  const updateTime = new Date(time)
  // console.log(updateTime.getFullYear(), updateTime.getMonth())
  return ''
}
const ArticleCard = (props: any) => {
  // console.log(props)
  const nav = useNavigate()
  const [like, setLike] = useState(true)
  const [star, setStar] = useState(true)
  const actions = [
    <span
      className="custom-comment-action"
      key="heart"
      onClick={() => setLike(!like)}
    >
      <IconThumbUp style={iconStyle} />
      {props.likenum ? props.likenum : ''}
    </span>,
    <span
      className="custom-comment-action"
      key="star"
      onClick={() => setStar(!star)}
    >
      <IconMessage style={iconStyle} />
      {props.replynum ? props.replynum : ''}
    </span>,
    <span className="custom-comment-action" key="reply">
      <IconShareInternal style={iconStyle} />{' '}
      {props.forwardnum ? props.forwardnum : ''}
    </span>,
  ]
  return (
    <div
      className="article-card"
      onClick={() => {
        nav('main-page/article-detail', {
          state: props,
        })
      }}
    >
      <Comment
        actions={''}
        align="right"
        author={<div className="author">{props.username}</div>}
        avatar={
          <Avatar>
            <img alt="avatar" src={props.userAvatar} />
          </Avatar>
        }
        content={
          <div className="sub-title">
            {props.infoHtml || getTime(props.lastupdate)} {props.device_title}
          </div>
        }
        datetime={actions}
      ></Comment>
      <div className="article-content">
        <span
          dangerouslySetInnerHTML={{
            __html: props.message.replaceAll('\n', '<br/>'),
          }}
        ></span>
        {Boolean(props.picArr.length) && props.picArr[0] !== '' && (
          <Space direction="vertical" className="image-list">
            <Image.PreviewGroup infinite>
              {/*<Space>*/}
              {props.picArr.map((src: string, index: number) => (
                <Image
                  key={index}
                  src={src}
                  loading="lazy"
                  width={'33.33%'}
                  style={{ aspectRatio: '1/1' }}
                  alt={`lamp${index + 1}`}
                />
              ))}
              {/*</Space>*/}
            </Image.PreviewGroup>
          </Space>
        )}
      </div>
      {Boolean(props.relationRows.length) ? (
        <Space size="small">
          {props.relationRows.map((_: any) => (
            <Tag>
              <img
                src={_.logo}
                style={{ height: '80%', borderRadius: '20%', marginRight: 5 }}
                alt={_.title}
              />
              {_.title}
            </Tag>
          ))}
        </Space>
      ) : (
        props.targetRow && (
          <Space size="small">
            <Tag>
              <img
                src={props.targetRow.logo}
                style={{ height: '80%', borderRadius: '20%', marginRight: 5 }}
                alt={props.targetRow.title}
              />
              {props.targetRow.title}
            </Tag>
          </Space>
        )
      )}
      {Boolean(props.replyRows.length) && (
        <div className="hot-comment">
          <span className="praise">{props?.replyRows[0]?.likenum}赞</span>
          <div>
            <span className="username">{props?.replyRows[0]?.username}</span>：
            {props?.replyRows[0]?.message}
          </div>
        </div>
      )}
    </div>
  )
}
export default memo(ArticleCard)
