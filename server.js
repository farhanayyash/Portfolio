'use strict';

const express = require('express');

const server = express();
const PORT = process.env.PORT || 3000 ;

server.listen(PORT,()=>{
  console.log("Hello");
})

server.get('/test',(req,res)=>{
  res.send("my server work");
})
server.use(express.static('./public'));