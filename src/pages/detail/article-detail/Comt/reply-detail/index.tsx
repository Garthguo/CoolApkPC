import { memo, useEffect, useState } from 'react'
import './index.less'
import { getArticleInfo, getReplyList } from '../../../../../apis/api'
import { Avatar, Comment, Image, Space } from '@arco-design/web-react'
const ReplyDetail = (props: any) => {
  console.log(props.id)
  const [_, set_] = useState<any>({})
  const [replys, setReplys] = useState<any>([])
  const getData = async () => {
    const { data: res } = await getReplyList({
      id: String(props.data.id),
      page: `1`,
      feedType: 'feed_reply',
      discussMode: '0',
    })
    setReplys(res)
    // console.log('reply', res)
  }
  useEffect(() => {
    set_(props.data)
    getData()
  }, [props.data.id])
  console.log(_)
  return (
    <div className="reply-detail">
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
            {_.message}
            {Boolean(_?.picArr?.length) && (
              <Space direction="vertical" className="image-list">
                <Image.PreviewGroup infinite>
                  {_?.picArr?.map((src: string, index: number) => (
                    <Image
                      key={index}
                      src={src}
                      loading="lazy"
                      alt={`lamp${index + 1}`}
                    />
                  ))}
                </Image.PreviewGroup>
              </Space>
            )}
          </div>
        }
        datetime="1 hour"
      ></Comment>
      <div className="reply-list">
        {replys.map((_: any, idx: number) => {
          return (
            <Comment
              actions={''}
              align="right"
              author={[
                <span>{_.username}</span>,
                <span className="html">回复</span>,
                <span>{_.rusername}</span>,
              ]}
              avatar={
                <Avatar>
                  <img alt="avatar" src={_.userAvatar} />
                </Avatar>
              }
              content={
                <div>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: _.message?.replaceAll('\n', '<br/>'),
                    }}
                  ></span>
                  {Boolean(_?.picArr?.length) && (
                    <Space direction="vertical" className="image-list">
                      <Image.PreviewGroup infinite>
                        {_?.picArr?.map((src: string, index: number) => (
                          <Image
                            key={index}
                            src={src}
                            loading="lazy"
                            alt={`lamp${index + 1}`}
                          />
                        ))}
                      </Image.PreviewGroup>
                    </Space>
                  )}
                </div>
              }
              datetime="1 hour"
            ></Comment>
          )
        })}
      </div>
    </div>
  )
}
export default memo(ReplyDetail)
