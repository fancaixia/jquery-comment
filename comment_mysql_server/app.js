const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');

const activity_talk = require('./route/activity_talk')

const pool=mysql.createPool({user:'fcx',password:'123456',port:'3306',database:'ajk_data',host:'localhost'});

const server=express();
server.use(bodyParser.urlencoded({extended:false}))

server.use((req,res,next)=>{
    req.pool = pool;
    next();
})

server.use('/activity_talk',activity_talk)

server.listen(8090)