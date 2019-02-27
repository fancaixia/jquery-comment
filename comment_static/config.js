
let server = 'http://localhost:8090';       //服务器地址  对应 comment_server/app
let serverApi={
    // 请求接口设置
    addTalk : server+'/activity_talk/add',   //添加评论API
    getTalk : server+'/activity_talk/get',  //获取评论API及相关回复
    removeTalk : server+'/activity_talk/remove',   //删除评论API

    addreply : server+'/activity_talk/addreply',   //添加回复API
    removereply : server+'/activity_talk/removereply',   //删除回复API
}