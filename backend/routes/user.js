var express = require('express');
var socketEvents = require('../routes/socket.js');
var router = express.Router();

//session check
router.use(function (req, res, next) {
  //console.log(socketEvents.getConnectList());
  console.log("req.session.nickname : "+req.session.nickname);
  if(req.session.nickname){
    next();
  }else{
    res.redirect('/');
  }
});

router.get('/exit', function(req, res, next) {
  if(req.session.nickname){
      req.session.destroy(function(err){
          if(err){
              console.log(err);
          }else{
              res.redirect('/');
          }
      })
  }else{
      res.redirect('/');
  }
});

router.post('/list', function(req, res, next) {
  nickname = req.body["nickname"];
  req.session.user = nickname;
  res.render('user_list', { 
    nickname : nickname
  });
});

module.exports = router;
