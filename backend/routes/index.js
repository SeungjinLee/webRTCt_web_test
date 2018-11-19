var express = require('express');
var router = express.Router();
var socketEvents = require('../routes/socket.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'CallMe' });
});

// 닉네임 중복체크
router.post('/check', function(req, res, next) {
  console.log(socketEvents.getConnectList());
  var pos = socketEvents.getConnectList().findIndex(x => x.nickname === req.body["nickname"]);
  var result = {};
  if(req.body["nickname"]){
    if(pos>=0){
      result["nickname"] = req.body["nickname"];
      result["check"] = 0;
    }else{
      //세션에 닉네임 넣기 
      req.session.nickname = req.body["nickname"];
      result["nickname"] = req.body["nickname"];
      result["check"] = 1;
    }
  }
  res.json(result);
});

module.exports = router;
