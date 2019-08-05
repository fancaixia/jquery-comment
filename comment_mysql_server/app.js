const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');

const activity_talk = require('./route/activity_talk')

const pool=mysql.createPool({user:'xxx',password:'111',port:'8080',database:'user_data',host:'localhost'});

const server=express();
server.use(bodyParser.urlencoded({extended:false}))

server.use((req,res,next)=>{
    req.pool = pool;
    next();
})

server.use('/activity_talk',activity_talk)

server.listen(8090)
