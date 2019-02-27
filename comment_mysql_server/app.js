const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');

const activity_talk = require('./route/activity_talk')

const pool=mysql.createPool({user:'xx',password:'xxx',port:'xxx',database:'xxx',host:'localhost'});

const server=express();
server.use(bodyParser.urlencoded({extended:false}))

server.use((req,res,next)=>{
    req.pool = pool;
    next();
})

server.use('/activity_talk',activity_talk)

server.listen(8090)