'use strict';

require('dotenv').config()
const express = require('express');

var nodemailer = require('nodemailer');


const server = express();
var bodyParser = require('body-parser');

var XOAuth2 = require('xoauth2');


const PORT = process.env.PORT || 3000 ;

server.use(bodyParser.urlencoded({ extended: true })); 

server.listen(PORT,()=>{
  console.log('listening to port:'+PORT);
})
var smtpTransport = nodemailer.createTransport(process.env.DB_USER3+encodeURIComponent(process.env.DB_PASS) + "@smtp.gmail.com:465"); 


// var smtpTransport = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//       xoauth2: xoauth2.createXOAuth2Generator({
//           user: process.env.DB_USER,
//           clientId: process.env.clientId,
//           clientSecret: process.env.clientSecret,
//           refreshToken: process.env.refreshToken
//       })
//   }
// });

// var transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.DB_USER,
//     pass: process.env.DB_PASS
//   }
// });



///////////////////


// var smtpTransport = nodemailer.createTransport("SMTP", {
//   service: "Gmail",
//   auth: {
//     XOAuth2: {
//       user: process.env.DB_USER,                        
//       clientId: process.env.clientId,
//       clientSecret: process.env.clientSecret,
//       refreshToken: process.env.refreshToken
//     }
//   }
// });

server.get('/test',(req,res)=>{
  res.send("my server work");
})
server.use(express.static('./public'));


server.post('/', function(req, res){

  console.log(req.body);
  // res.send("recieved your request!");
  var mforme = "UserName: "+req.body.name+" \nEmail: "+req.body.email+"\nmessage: "+req.body.message;
  var mailOptions  = {
    from: process.env.DB_USER,
    to: process.env.DB_USER2,
    subject: 'Sending Email From My Website',
    text: mforme
  };
  


  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(response);
    }
  });



  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });
  res.redirect('back.html');
});