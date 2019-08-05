# jquery-comment
基于jquery  的评论小插件

github项目地址：https://github.com/fancaixia/jquery-comment


![https://github.com/fancaixia/jquery-comment-/blob/master/pic/comment.png](https://github.com/fancaixia/jquery-comment-/blob/master/pic/comment.png)

案例思路：

- 后台建立三个表:
-- (comment_list)评论表(id,userID,userName,articleID,content)
-- (reply_list)回复表(id,talkID,content,fromID,fromUser,toID,toUser)

[查询评论]
- 后台获取 comment_list 表数据
- 检索 reply_list表中数据,talkID 为 comment_list

[发送评论]
- 前台发送用户id,用户名称, 文章id, 评论内容到后台
- 后台将评论存储到comment_list中

[删除评论]
- 前台发送此条评论ID到后台,
- 后台reply_list判断 talkId == id 进行删除
- 同时查询comment_list判断 id 相等的数据并进行删除

[回复评论]
- 前台发送评论id, 内容, fromID, fromUser, toID, toUser 到后台
- 后台将消息存储到reply_list中

[删除回复]
- 前台发送此条回复ID到后台,
- 后台reply_list判断对应 id 进行删除

[前台判断]
- 根据当前登录用户id判断评论或回复用户是否一致 (不可给自己评论)
- 划过某条评论时判断是不是当前用户的评论，(只能删除自己的评论)



- comment_static    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **前台页面**
- comment_mysql_server   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  **node+mysql数据库查询**

### 项目启动  

 1. cd / comment_mysql_server(需连接数据库mysql)
 2. npm / cnpm install 
 3. npm run dev




 
