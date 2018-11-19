var express = require('express');
var router = express.Router();

//session check
router.use(function (req, res, next) {
  console.log("req.session.nickname : "+req.session.nickname);
  next();
});

router.post('/list', function(req, res, next) {
  nickname = req.body["nickname"];
  console.log(req.body);
  req.session.user = nickname;
  res.render('user_list', { nickname : nickname });
});

module.exports = router;
