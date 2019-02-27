const express=require('express');
const bodyParser=require('body-parser');

const activity_talk = require('./route/activity_talk')

const server=express();

server.use(bodyParser.urlencoded({extended:false}))

server.use('/activity_talk',activity_talk)

server.listen(8090)