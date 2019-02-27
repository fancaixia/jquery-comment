const express = require('express');
const uuid = require('uuid')

const route_talk = express.Router();
route_talk.use((req,res,next)=>{
    
    //解决跨域请求
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    next()

})

//模拟数据库建立两张表，activity_talk(存储评论数据)   activity_reply(存储回复数据)
let activity_talk = [
    {
        id:"d26c014a23074dffbe1e6039a8a20d7c",    //评论ID
        userID:"1",                        //评论人ID
        articleID:"0",                     //文章ID
        content:'测试',                    //评论内容
        //模拟查询用户表数据
        img:"./images/reply.jpg",
        userName:"小财神",
        time:"2017-07-06  12:45",
    },
    {
        id:"7e593d67c2ed46c7afad4d3dff04ee22",    //评论ID
        userID:"1",                        //评论人ID
        articleID:"0",                     //文章ID
        content:'test',                    //评论内容
        //模拟查询用户表数据
        img:"./images/reply.jpg",
        userName:"小财神",
        time:"2017-07-06  12:45",
    }
]
let activity_reply = [
    {
        id:"e23efbc7a0d74b2ca38c1728089c1306",   //此条回复id
        talkID:"d26c014a23074dffbe1e6039a8a20d7c",   //此条回复评论目标id
        content:"测试",   //回复内容
        fromID:"1",   //回复人ID
        toID:"1",     //回复目标人id
        fromImg:'./images/reply_01.jpg',   //模拟查询用户表数据
        fromUser:"小迷糊",
        toUser:"小财神",
        time:"2017-07-06  12:45",
    
    }
]

// 查询评论数据
route_talk.post('/get',(req,res)=>{
    let articleID = req.body.articleID;     //文章id
    let talkID = req.body.talkID;           //评论ID， 如果传入talkID  那么此评论对应回复查询所有，不传返回replyCount对应条数
    let replyCount = req.body.replyCount;   //查询评论对应回复的条数  默认3  查询所有时设置为10000

    let new_activity_talk = [];   //存储查询评论数据
    //遍历评论列表  根据articleID查询评论数据  根据item.id(评论id)查询回复数据
    activity_talk.forEach((item,index)=>{
        
        if(item.articleID == articleID){
            
            let new_activity_reply = [];
            activity_reply.forEach((reply_item,reply_index)=>{
                if(reply_item.talkID == item.id){
                    new_activity_reply.push(reply_item)
                }
            })

            item.child = new_activity_reply;
            new_activity_talk.push(item)

        }

    })

    res.send({code:0,data:new_activity_talk,}).end();

})
//添加评论  
route_talk.post('/add',(req,res)=>{

    const uuid_str = uuid.v4().replace(/-/g,'');
    activity_talk.push(
        {
            id:uuid_str,    //评论ID
            userID:req.body.userID,                        //评论人ID
            articleID:req.body.articleID,                     //文章ID
            content:req.body.content,                    //评论内容
            //模拟查询用户表数据
            img:"./images/reply.jpg",
            userName:"小财神",
            time:"2017-07-06  12:45",
        }
    )
    //添加成功
    res.send({code:0,msg:"添加成功"}).end();

})
//删除评论   首先删除评论对应回复 
route_talk.post('/remove',(req,res)=>{

    activity_reply.forEach((item,index)=>{
        if(item.talkID == req.body.id){
            activity_reply.splice(index,1)
        }
    })

    activity_talk.forEach((item,index)=>{
        if(item.id == req.body.id){
            activity_talk.splice(index,1)
        }
    })

    res.send({code:1,msg:"删除评论成功"}).end();
})
//添加回复
route_talk.post('/addreply',(req,res)=>{

    const uuid_str = uuid.v4().replace(/-/g,'');
    activity_reply.push(
        {
            id:uuid_str,   //此条回复id
            talkID:req.body.talkID,   //此条回复评论目标id
            content:req.body.content,   //回复内容
            fromID:req.body.fromID,   //回复人ID
            toID:req.body.toID,     //回复目标人id
            fromImg:'./images/reply_01.jpg',   //此数据应为前台传入
            fromUser:"小迷糊",
            toUser:"小财神",
            time:"2017-07-06  12:45",
        }
    )
    //添加成功  
    res.send({code:0,msg:"添加成功"}).end();

})
//删除回复
route_talk.post('/removereply',(req,res)=>{

    activity_reply.forEach((item,index)=>{
        if(item.id == req.body.id){
            activity_reply.splice(index,1)
        }
    })

    res.send({code:1,msg:"删除回复成功"}).end();

})

module.exports=route_talk;
