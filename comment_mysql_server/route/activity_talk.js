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

// 查询评论数据
route_talk.post('/get',(req,res)=>{
    let articleID = req.body.articleID;
    let talkID = req.body.talkID;
    let replyCount = req.body.replyCount;   //查询评论对应回复的条数  默认3  查询所有时设置为10000
    req.pool.query(`SELECT * FROM comment_list WHERE articleID=${articleID}`,(err,data)=>{
        if(err){
            res.send({code:1,msg:"服务端错误"}).end();
        }else{
            //文章列表查询评论成功后  遍历数组  回复表根根talkID查 回复数据 
            
            function makePromise(item, index) {
                return new Promise((resolve) => {
                    let newitem = JSON.parse(JSON.stringify(item));
                    //如果传入 talkID  那么此评论对应回复查询所有
                    if(talkID && talkID == newitem.id){
                        replyCount = 10000;
                    }else{
                        replyCount = 3;
                    }
                    
                    req.pool.query(`SELECT * FROM reply_list WHERE talkID="${newitem.id}" LIMIT 0,${replyCount}`,(err,replydata)=>{
                        if(err){
                            res.send({code:1,msg:"服务端错误"}).end();
                        }else{
                            //模拟查询用户表数据
                            newitem.img="./images/reply.jpg";
                            newitem.time = "2017-07-06  12:45";
                            newitem.child = JSON.parse(JSON.stringify(replydata));

                            //遍历回复数据  模拟查询用户表  添加用户信息
                            newitem.child.forEach((item,index) => {
                                item.fromImg = './images/reply_01.jpg';   //模拟查询用户表数据
                                item.time = "2017-07-06  12:45";
                            });
                        

                            req.pool.query(`SELECT COUNT(*) AS count FROM reply_list WHERE talkID="${newitem.id}"`,(err,num)=>{
                                if(err){
                                    res.send({code:1,msg:"服务端错误"}).end();
                                }else{
                                    newitem.replytotal = num[0].count;
                                    resolve(newitem)
        
                                }
                            })
                    

                        }
                    })

                });
            }
            
            
            Promise.all(data.map((v, k) => makePromise(v, k))).then(data => {
                res.send({code:0,data,}).end();
            });
            
           
            
        }
    })
})
//添加评论  
route_talk.post('/add',(req,res)=>{

    const uuid_str = uuid.v4().replace(/-/g,'');
    req.pool.query(`insert into comment_list (id,userID,userName,articleID,content) VALUES("${uuid_str}","${req.body.userID}","${req.body.userName}","${req.body.articleID}","${req.body.content}")`,(err,state)=>{
        if(err){
            res.send({code:1,msg:"添加失败"}).end();
        }else{
            //添加成功   返回评论数据
            res.send({code:0,msg:"添加成功"}).end();
        }
    })

})
//删除评论   首先删除评论对应回复  DELETE FROM reply_list WHERE talkID=""
route_talk.post('/remove',(req,res)=>{
    req.pool.query(`delete from reply_list where talkID="${req.body.id}"`,(err,state)=>{
        if(err){
            res.send({code:1,msg:"删除回复失败"}).end();
        }else{
            req.pool.query(`delete from comment_list where id="${req.body.id}"`,(err,data)=>{
                if(err){
                    res.send({code:1,msg:"删除评论失败"}).end();
                }else{
                    res.send({code:0,msg:"ok"}).end();
                }
            })
        }
    })

})
//添加回复
route_talk.post('/addreply',(req,res)=>{

    const uuid_str = uuid.v4().replace(/-/g,'');
    req.pool.query(`insert into reply_list (id,talkID,content,fromID,fromUser,toID,toUser) VALUES("${uuid_str}","${req.body.talkID}","${req.body.content}","${req.body.fromID}","${req.body.fromUser}","${req.body.toID}","${req.body.toUser}")`,(err,state)=>{
        if(err){
            res.send({code:1,msg:"回复失败"}).end();
        }else{
            res.send({code:1,msg:"ok"}).end();

        }
    })

})
//删除回复
route_talk.post('/removereply',(req,res)=>{
    req.pool.query(`delete from reply_list where id="${req.body.id}"`,(err,data)=>{
        if(err){
            res.send({code:1,msg:"删除回复失败"}).end();
        }else{
            res.send({code:1,msg:"删除回复成功"}).end();
        }
    })

})

module.exports = route_talk;