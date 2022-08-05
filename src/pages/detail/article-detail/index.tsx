import { useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { getArticleInfo, getReplyList } from '../../../apis/api'
import {
  Avatar,
  Comment,
  Drawer,
  Image,
  Space,
  Tag,
} from '@arco-design/web-react'
import './index.less'
import {
  IconMessage,
  IconShareInternal,
  IconThumbUp,
} from '@arco-design/web-react/icon'
import ReplyDetail from './Comt/reply-detail'
const iconStyle = { color: '#a3a3a3', fontSize: 20, marginLeft: 7 }
const ArticleDetail = (props: any) => {
  const location = useLocation() as any
  const [detail, setDetail] = useState<any>({})
  const [replys, setReplys] = useState<any>([])
  const [visible, setVisible] = useState(false)
  const [replyId, setReplyId] = useState('')
  const refWrapper = useRef(null)
  // const [articles, setArticles] = useState<any>([])
  const getData = async () => {
    const { data: res1 } = await getArticleInfo({
      id: String(location.state.id),
      formApi: `${location.state.extra_fromApi}`,
    })
    const { data: res2 } = await getReplyList({
      id: String(location.state.id),
      page: `1`,
      discussMode: '1',
    })
    setDetail(res1)
    setReplys(res2.filter((_: any) => _.entityType !== 'card'))
    const ele = document.querySelector('.detail-card') as any
    ele.scrollTo(0, 0)
    console.log('detail2', res2)
  }
  useEffect(() => {
    getData()
    setVisible(false)
  }, [location.state.id || ''])
  const actions = [
    <span className="custom-comment-action" key="heart" onClick={() => {}}>
      <IconThumbUp style={iconStyle} />
      {detail?.likenum ? detail?.likenum : ''}
    </span>,
    <span className="custom-comment-action" key="star" onClick={() => {}}>
      <IconMessage style={iconStyle} />
      {detail?.replynum ? detail?.replynum : ''}
    </span>,
    <span className="custom-comment-action" key="reply">
      <IconShareInternal style={iconStyle} />{' '}
      {detail?.forwardnum ? detail?.forwardnum : ''}
    </span>,
  ]
  return (
    <div className="detail-card" ref={refWrapper}>
      <div className="article">
        <Comment
          actions={''}
          align="right"
          author={<div className="author">{detail?.username}</div>}
          avatar={
            <Avatar>
              <img alt="avatar" src={detail?.userAvatar} />
            </Avatar>
          }
          content={
            <div className="sub-title">
              {detail?.infoHtml} {detail?.device_title}
            </div>
          }
          datetime={1}
        ></Comment>
        <div className="article-content">
          <span
            dangerouslySetInnerHTML={{
              __html: detail?.message?.replaceAll('\n', '<br/>'),
            }}
          ></span>
          11
          {Boolean(detail?.picArr?.length) && (
            <Space direction="vertical" className="image-list">
              <Image.PreviewGroup infinite>
                {/*<Space>*/}
                {detail?.picArr?.map((src: string, index: number) => (
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
        {Boolean(detail?.relationRows?.length) ? (
          <Space size="small">
            {detail?.relationRows?.map((_: any) => (
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
          detail?.targetRow && (
            <Space size="small">
              <Tag>
                <img
                  src={detail?.targetRow?.logo}
                  style={{ height: '80%', borderRadius: '20%', marginRight: 5 }}
                  alt={detail?.targetRow.title}
                />
                {detail?.targetRow.title}
              </Tag>
            </Space>
          )
        )}
        {Boolean(detail?.replyRows?.length) && (
          <div className="hot-comment">
            <span className="praise">{detail?.replyRows[0]?.likenum}赞</span>
            <div>
              <span className="username">{detail?.replyRows[0]?.username}</span>
              ：{detail?.replyRows[0]?.message}
            </div>
          </div>
        )}
      </div>
      <div className="reply-content">
        {replys?.map((_: any) => {
          return (
            <Comment
              actions={''}
              align="right"
              author={_.username}
              avatar={
                <Avatar>
                  <img alt="avatar" src={_.userAvatar} />
                </Avatar>
              }
              content={
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: _.message?.replaceAll('\n', '<br/>'),
                    }}
                  ></div>
                  {Boolean(_?.picArr?.length) && (
                    <Space direction="vertical" className="image-list">
                      <Image.PreviewGroup infinite>
                        {_?.picArr?.map((src: string, index: number) => (
                          <Image
                            key={index}
                            src={src}
                            loading="lazy"
                            // width={'50%'}
                            // style={{ aspectRatio: '1/1' }}
                            alt={`lamp${index + 1}`}
                          />
                        ))}
                      </Image.PreviewGroup>
                    </Space>
                  )}
                </div>
              }
              datetime="1 hour"
            >
              {Boolean(_.replyRows.length) && (
                <div className="reply-rows">
                  {_.replyRows.map((row: any) => {
                    return (
                      <div>
                        <span>{row.username}</span>回复
                        <span>{row.rusername}</span>：{row.message}
                      </div>
                    )
                  })}
                  {_.replynum > 5 && (
                    <span
                      onClick={() => {
                        setReplyId(_)
                        setVisible(true)
                      }}
                    >
                      查看更多回复({_.replynum})
                    </span>
                  )}
                </div>
              )}
            </Comment>
          )
        })}
      </div>
      <div className="action-box">{actions}</div>
      <Drawer
        getPopupContainer={() => refWrapper?.current as any}
        width={450}
        height={600}
        title={<span>回复</span>}
        visible={visible}
        placement="bottom"
        footer={null}
        onOk={() => {
          setVisible(false)
        }}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <ReplyDetail data={replyId}></ReplyDetail>
      </Drawer>
    </div>
  )
}
export default ArticleDetail
